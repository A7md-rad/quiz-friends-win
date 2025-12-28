import { useState, useEffect } from 'react';
import { ArrowRight, Users, Play, Crown, Loader2, Copy, Check } from 'lucide-react';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

interface WaitingRoomProps {
  gameCode: string;
  subject: Subject;
  questionCount: number;
  maxPlayers: number;
  isHost: boolean;
  hostName: string;
  difficulty: string;
  timePerQuestion: number;
  onBack: () => void;
  onStartGame: (players: Player[]) => void;
}

export function WaitingRoom({ 
  gameCode, 
  subject, 
  questionCount, 
  maxPlayers, 
  isHost,
  hostName,
  difficulty,
  timePerQuestion,
  onBack, 
  onStartGame 
}: WaitingRoomProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [copied, setCopied] = useState(false);
  const [gameId, setGameId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // إنشاء اللعبة في قاعدة البيانات عند تحميل الصفحة
  useEffect(() => {
    const createGame = async () => {
      try {
        // تسجيل دخول مجهول للحصول على session_id
        let sessionId: string | undefined;
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
          if (anonError) {
            console.error('Error signing in anonymously:', anonError);
          }
          sessionId = anonData?.user?.id;
        } else {
          sessionId = session.user.id;
        }

        // إنشاء اللعبة
        const { data: game, error: gameError } = await (supabase as any)
          .from('games')
          .insert({
            code: gameCode,
            host_name: hostName,
            subject_id: subject.id,
            subject_name: subject.name,
            question_count: questionCount,
            max_players: maxPlayers,
            difficulty: difficulty,
            time_per_question: timePerQuestion,
            status: 'waiting',
            host_session_id: sessionId
          })
          .select()
          .single();

        if (gameError) {
          console.error('Error creating game:', gameError);
          toast.error('حدث خطأ في إنشاء اللعبة');
          return;
        }

        setGameId(game.id);

        // إضافة المضيف كلاعب
        const { error: playerError } = await (supabase as any)
          .from('game_players')
          .insert({
            game_id: game.id,
            name: hostName,
            is_host: true,
            is_ready: true,
            session_id: sessionId
          });

        if (playerError) {
          console.error('Error adding host as player:', playerError);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in createGame:', error);
        toast.error('حدث خطأ غير متوقع');
        setIsLoading(false);
      }
    };

    createGame();
  }, [gameCode, hostName, subject, questionCount, maxPlayers, difficulty, timePerQuestion]);

  // الاستماع للاعبين في الوقت الحقيقي
  useEffect(() => {
    if (!gameId) return;

    // جلب اللاعبين الحاليين
    const fetchPlayers = async () => {
      const { data, error } = await (supabase as any)
        .from('game_players')
        .select('*')
        .eq('game_id', gameId);

      if (error) {
        console.error('Error fetching players:', error);
        return;
      }

      setPlayers(data.map((p: any) => ({
        id: p.id,
        name: p.name,
        isHost: p.is_host
      })));
    };

    fetchPlayers();

    // الاستماع للتغييرات في الوقت الحقيقي
    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_players',
          filter: `game_id=eq.${gameId}`
        },
        (payload: any) => {
          console.log('Player change:', payload);
          if (payload.eventType === 'INSERT') {
            const newPlayer = payload.new;
            setPlayers(prev => {
              if (prev.some(p => p.id === newPlayer.id)) return prev;
              toast.success(`${newPlayer.name} انضم للعبة!`);
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

    // محاكاة دخول لاعبين عشوائيين للاختبار
    const randomNames = ['أحمد', 'محمد', 'سارة', 'فاطمة', 'علي', 'نور', 'ياسر', 'هدى'];
    const addRandomPlayer = async () => {
      const currentCount = players.length;
      if (currentCount < maxPlayers) {
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        await (supabase as any)
          .from('game_players')
          .insert({
            game_id: gameId,
            name: randomName,
            is_host: false,
            is_ready: true
          });
      }
    };

    // إضافة لاعب عشوائي كل 3 ثواني
    const interval = setInterval(addRandomPlayer, 3000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [gameId, players.length, maxPlayers]);

  // تنظيف عند الخروج
  const handleBack = async () => {
    if (gameId) {
      // حذف اللعبة واللاعبين
      await (supabase as any)
        .from('game_players')
        .delete()
        .eq('game_id', gameId);
      
      await (supabase as any)
        .from('games')
        .delete()
        .eq('id', gameId);
    }
    onBack();
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(gameCode);
      setCopied(true);
      toast.success('تم نسخ الكود!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('فشل نسخ الكود');
    }
  };

  const handleStartGame = async () => {
    if (players.length < 2) {
      toast.error('انتظر انضمام لاعب آخر على الأقل');
      return;
    }

    if (gameId) {
      // تحديث حالة اللعبة إلى "started"
      await (supabase as any)
        .from('games')
        .update({ status: 'started' })
        .eq('id', gameId);
    }

    onStartGame(players);
  };

  const canStart = isHost && players.length >= 2;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 dotted-bg">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-foreground font-bold">جاري إنشاء اللعبة...</p>
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
        <h1 className="text-2xl font-bold text-foreground">غرفة الانتظار</h1>
      </div>

      {/* Game Code */}
      <div className="bg-card rounded-2xl p-4 shadow-card mb-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">كود اللعبة</p>
        <div className="flex items-center justify-center gap-3">
          <div className="flex gap-2">
            {gameCode.split('').map((digit, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground shadow-md"
              >
                {digit}
              </div>
            ))}
          </div>
          <button
            onClick={handleCopyCode}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
        <div className="flex justify-between items-center text-sm">
          <div className="text-center flex-1">
            <p className="text-muted-foreground">المادة</p>
            <p className="font-bold text-foreground">{subject.name}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center flex-1">
            <p className="text-muted-foreground">الأسئلة</p>
            <p className="font-bold text-foreground">{questionCount}</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center flex-1">
            <p className="text-muted-foreground">اللاعبين</p>
            <p className="font-bold text-foreground">{players.length}/{maxPlayers}</p>
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="flex-1">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          اللاعبين المتصلين
        </h2>
        
        <div className="space-y-3">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={cn(
                "bg-card rounded-xl p-4 shadow-card flex items-center gap-3 animate-in slide-in-from-right",
                player.isHost && "border-2 border-primary"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative",
                player.isHost ? "gradient-primary text-primary-foreground" : "gradient-secondary text-secondary-foreground"
              )}>
                {player.name.charAt(0)}
                {player.isHost && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-warning-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-bold text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">
                  {player.isHost ? 'المضيف' : 'لاعب'}
                </p>
              </div>
              
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: maxPlayers - players.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-card/50 rounded-xl p-4 border-2 border-dashed border-border flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
              </div>
              <p className="text-muted-foreground">في انتظار لاعب...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button (Host only) */}
      {isHost ? (
        <button
          onClick={handleStartGame}
          disabled={!canStart}
          className={cn(
            'w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-4',
            canStart
              ? 'gradient-primary text-primary-foreground shadow-glow-primary'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          <Play className="w-6 h-6" />
          ابدأ اللعبة ({players.length}/{maxPlayers})
        </button>
      ) : (
        <div className="bg-card rounded-2xl p-4 shadow-card text-center mt-4">
          <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">في انتظار المضيف لبدء اللعبة...</p>
        </div>
      )}
    </div>
  );
}