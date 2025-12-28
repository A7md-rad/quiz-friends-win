import { useState, useEffect } from 'react';
import { ArrowRight, Users, Loader2, Clock, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface JoinWaitingRoomProps {
  gameCode: string;
  playerName: string;
  onBack: () => void;
  onGameStart: (gameData: any) => void;
}

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

interface GameData {
  id: string;
  subject_id: string;
  subject_name: string;
  question_count: number;
  max_players: number;
  difficulty: string;
  time_per_question: number;
  status: string;
}

export function JoinWaitingRoom({ gameCode, playerName, onBack, onGameStart }: JoinWaitingRoomProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [waitingDots, setWaitingDots] = useState('.');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Animate waiting dots
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingDots(prev => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // الانضمام للعبة عند تحميل الصفحة
  useEffect(() => {
    const joinGame = async () => {
      try {
        // البحث عن اللعبة
        const { data: game, error: gameError } = await (supabase as any)
          .from('games')
          .select('*')
          .eq('code', gameCode)
          .eq('status', 'waiting')
          .maybeSingle();

        if (gameError || !game) {
          console.error('Game not found:', gameError);
          toast.error('اللعبة غير موجودة أو بدأت بالفعل');
          onBack();
          return;
        }

        setGameData(game);

        // التحقق من عدد اللاعبين
        const { data: existingPlayers, error: playersError } = await (supabase as any)
          .from('game_players')
          .select('*')
          .eq('game_id', game.id);

        if (playersError) {
          console.error('Error fetching players:', playersError);
          toast.error('حدث خطأ في جلب اللاعبين');
          onBack();
          return;
        }

        if (existingPlayers.length >= game.max_players) {
          toast.error('اللعبة ممتلئة!');
          onBack();
          return;
        }

        // إضافة اللاعب الجديد
        const { data: newPlayer, error: joinError } = await (supabase as any)
          .from('game_players')
          .insert({
            game_id: game.id,
            name: playerName,
            is_host: false,
            is_ready: true
          })
          .select()
          .single();

        if (joinError) {
          console.error('Error joining game:', joinError);
          toast.error('حدث خطأ في الانضمام للعبة');
          onBack();
          return;
        }

        setPlayerId(newPlayer.id);

        // تحديث قائمة اللاعبين
        setPlayers(existingPlayers.map((p: any) => ({
          id: p.id,
          name: p.name,
          isHost: p.is_host
        })).concat({
          id: newPlayer.id,
          name: playerName,
          isHost: false
        }));

        setIsLoading(false);
      } catch (error) {
        console.error('Error in joinGame:', error);
        toast.error('حدث خطأ غير متوقع');
        onBack();
      }
    };

    joinGame();
  }, [gameCode, playerName, onBack]);

  // الاستماع للتغييرات في الوقت الحقيقي
  useEffect(() => {
    if (!gameData) return;

    // الاستماع لتغييرات اللاعبين
    const playersChannel = supabase
      .channel(`game-players-${gameData.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_players',
          filter: `game_id=eq.${gameData.id}`
        },
        (payload: any) => {
          console.log('Player change:', payload);
          if (payload.eventType === 'INSERT') {
            const newPlayer = payload.new;
            setPlayers(prev => {
              if (prev.some(p => p.id === newPlayer.id)) return prev;
              return [...prev, {
                id: newPlayer.id,
                name: newPlayer.name,
                isHost: newPlayer.is_host
              }];
            });
          } else if (payload.eventType === 'DELETE') {
            setPlayers(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // الاستماع لبدء اللعبة
    const gameChannel = supabase
      .channel(`game-status-${gameData.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${gameData.id}`
        },
        (payload: any) => {
          console.log('Game update:', payload);
          if (payload.new.status === 'started') {
            toast.success('اللعبة بدأت!');
            onGameStart(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(playersChannel);
      supabase.removeChannel(gameChannel);
    };
  }, [gameData, onGameStart]);

  // تنظيف عند الخروج
  const handleBack = async () => {
    if (playerId && gameData) {
      await (supabase as any)
        .from('game_players')
        .delete()
        .eq('id', playerId);
    }
    onBack();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 dotted-bg">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-foreground font-bold">جاري الانضمام للعبة...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <ArrowRight className="w-6 h-6 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">غرفة الانتظار</h1>
          <p className="text-sm text-muted-foreground">كود اللعبة: {gameCode}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-8">
        {/* Waiting Animation */}
        <div className="w-24 h-24 rounded-full gradient-secondary flex items-center justify-center shadow-glow-secondary mb-6 animate-pulse">
          <Clock className="w-12 h-12 text-secondary-foreground" />
        </div>

        {/* Status */}
        <h2 className="text-xl font-bold text-foreground mb-2">
          في انتظار بدء اللعبة{waitingDots}
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          صاحب اللعبة سيبدأ اللعبة قريباً
        </p>

        {/* Game Info */}
        {gameData && (
          <div className="w-full max-w-sm bg-card rounded-2xl shadow-card p-4 mb-4">
            <div className="flex justify-between items-center text-sm">
              <div className="text-center flex-1">
                <p className="text-muted-foreground">المادة</p>
                <p className="font-bold text-foreground">{gameData.subject_name}</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center flex-1">
                <p className="text-muted-foreground">الأسئلة</p>
                <p className="font-bold text-foreground">{gameData.question_count}</p>
              </div>
            </div>
          </div>
        )}

        {/* Players Card */}
        <div className="w-full max-w-sm bg-card rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">اللاعبون ({players.length})</h3>
          </div>

          <div className="space-y-3">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl transition-all',
                  player.isHost ? 'bg-primary/10' : 'bg-muted/50',
                  player.id === playerId && 'ring-2 ring-secondary'
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold relative',
                    player.isHost ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  {player.name.charAt(0)}
                  {player.isHost && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                      <Crown className="w-2.5 h-2.5 text-warning-foreground" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{player.name}</p>
                  {player.isHost && (
                    <span className="text-xs text-primary">صاحب اللعبة</span>
                  )}
                  {player.id === playerId && !player.isHost && (
                    <span className="text-xs text-secondary">أنت</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">متصل</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>في انتظار صاحب اللعبة لبدء التحدي</span>
        </div>
      </div>
    </div>
  );
}