import { useState, useEffect } from 'react';
import { ArrowRight, Users, Play, Crown, Loader2, Copy, Check } from 'lucide-react';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
  onBack: () => void;
  onStartGame: (players: Player[]) => void;
}

export function WaitingRoom({ 
  gameCode, 
  subject, 
  questionCount, 
  maxPlayers, 
  isHost,
  onBack, 
  onStartGame 
}: WaitingRoomProps) {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'أنت', isHost: isHost }
  ]);
  const [copied, setCopied] = useState(false);

  // سيتم إضافة اللاعبين الحقيقيين عند ربط قاعدة البيانات
  // حالياً اللعبة تعمل محلياً فقط

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

  const handleStartGame = () => {
    if (players.length < 2) {
      toast.error('انتظر انضمام لاعب آخر على الأقل');
      return;
    }
    onStartGame(players);
  };

  const canStart = isHost && players.length >= 2;

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
                player.id === '1' ? "gradient-primary text-primary-foreground" : "gradient-secondary text-secondary-foreground"
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
