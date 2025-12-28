import { useState, useEffect } from 'react';
import { ArrowRight, Users, Loader2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JoinWaitingRoomProps {
  gameCode: string;
  onBack: () => void;
  onGameStart: () => void;
}

interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

export function JoinWaitingRoom({ gameCode, onBack, onGameStart }: JoinWaitingRoomProps) {
  const [players, setPlayers] = useState<Player[]>([
    { id: 'host', name: 'صاحب اللعبة', isHost: true },
    { id: 'me', name: 'أنت', isHost: false },
  ]);
  const [waitingDots, setWaitingDots] = useState('.');

  // Simulate players joining
  useEffect(() => {
    const interval = setInterval(() => {
      if (players.length < 4 && Math.random() > 0.7) {
        const newPlayer: Player = {
          id: `player-${players.length}`,
          name: `لاعب ${players.length}`,
          isHost: false,
        };
        setPlayers(prev => [...prev, newPlayer]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [players.length]);

  // Animate waiting dots
  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingDots(prev => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Simulate game start after some time
  useEffect(() => {
    const timeout = setTimeout(() => {
      onGameStart();
    }, 8000);

    return () => clearTimeout(timeout);
  }, [onGameStart]);

  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
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
                  index === 1 && 'ring-2 ring-secondary'
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                    player.isHost ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  {player.name.charAt(0)}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{player.name}</p>
                  {player.isHost && (
                    <span className="text-xs text-primary">صاحب اللعبة</span>
                  )}
                  {index === 1 && !player.isHost && (
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
