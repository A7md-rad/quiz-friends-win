import { ArrowRight, Plus, UserPlus } from 'lucide-react';

interface GameModeSelectionProps {
  onCreateGame: () => void;
  onJoinGame: () => void;
  onBack: () => void;
}

export function GameModeSelection({ onCreateGame, onJoinGame, onBack }: GameModeSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => {
            console.log('Back button clicked');
            onBack();
          }}
          className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <ArrowRight className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">تحدّى أصدقائك</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-16">
        {/* Illustration */}
        <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-glow-primary animate-float">
          <UserPlus className="w-16 h-16 text-primary-foreground" />
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">اختر وضع اللعب</h2>
          <p className="text-muted-foreground">أنشئ لعبة جديدة أو انضم لصديقك</p>
        </div>

        {/* Options */}
        <div className="w-full max-w-sm space-y-4">
          {/* Create Game */}
          <button
            onClick={onCreateGame}
            className="w-full p-6 rounded-2xl bg-card shadow-card border-2 border-primary/20 hover:border-primary/50 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                <Plus className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-bold text-foreground mb-1">إنشاء لعبة</h3>
                <p className="text-sm text-muted-foreground">أنشئ غرفة وشارك الكود مع أصدقائك</p>
              </div>
            </div>
          </button>

          {/* Join Game */}
          <button
            onClick={onJoinGame}
            className="w-full p-6 rounded-2xl bg-card shadow-card border-2 border-secondary/20 hover:border-secondary/50 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-secondary flex items-center justify-center shadow-md">
                <UserPlus className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-lg font-bold text-foreground mb-1">انضمام للعبة</h3>
                <p className="text-sm text-muted-foreground">أدخل كود صديقك للانضمام</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
