import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, BookOpen, Home, Share2, Star } from 'lucide-react';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';

interface QuizResultProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  subject: Subject;
  onRetry: () => void;
  onSelectSubject: () => void;
  onHome: () => void;
}

export function QuizResult({ 
  score, 
  correctAnswers, 
  totalQuestions, 
  subject,
  onRetry, 
  onSelectSubject, 
  onHome 
}: QuizResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60 && percentage < 80;
  const isPoor = percentage < 60;

  const getMessage = () => {
    if (isExcellent) return { text: 'ممتاز! 🎉', emoji: '🏆' };
    if (isGood) return { text: 'جيد جداً! 👏', emoji: '⭐' };
    return { text: 'حاول مرة أخرى! 💪', emoji: '📚' };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background celebration */}
      {isExcellent && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 15}px`,
              }}
            >
              {['⭐', '🎉', '✨', '🏆'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-md text-center">
        {/* Trophy icon */}
        <div className={cn(
          'w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 animate-celebrate',
          isExcellent && 'gradient-primary shadow-glow-primary',
          isGood && 'gradient-secondary shadow-glow-secondary',
          isPoor && 'bg-muted'
        )}>
          <span className="text-6xl">{message.emoji}</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          {message.text}
        </h1>

        {/* Subject */}
        <p className="text-muted-foreground mb-8">
          {subject.icon} {subject.name}
        </p>

        {/* Score card */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-8 animate-scale-in">
          {/* Main score */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="text-5xl font-extrabold text-gradient-primary">{score}</span>
            </div>
            <p className="text-muted-foreground">نقطة</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-success/10">
              <p className="text-3xl font-bold text-success">{correctAnswers}</p>
              <p className="text-sm text-muted-foreground">إجابة صحيحة</p>
            </div>
            <div className="p-4 rounded-xl bg-destructive/10">
              <p className="text-3xl font-bold text-destructive">{totalQuestions - correctAnswers}</p>
              <p className="text-sm text-muted-foreground">إجابة خاطئة</p>
            </div>
          </div>

          {/* Percentage bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">النسبة</span>
              <span className={cn(
                'font-bold',
                isExcellent && 'text-success',
                isGood && 'text-secondary',
                isPoor && 'text-destructive'
              )}>
                {percentage}%
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  'h-full rounded-full transition-all duration-1000',
                  isExcellent && 'gradient-success',
                  isGood && 'gradient-secondary',
                  isPoor && 'bg-destructive'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Stars rating */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-8 h-8 transition-all duration-300',
                  i < Math.ceil(percentage / 40) 
                    ? 'text-warning fill-warning animate-celebrate' 
                    : 'text-muted'
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={onRetry}
          >
            <RotateCcw className="ml-2 w-5 h-5" />
            إعادة المحاولة
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={onSelectSubject}
          >
            <BookOpen className="ml-2 w-5 h-5" />
            اختيار مادة أخرى
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={onHome}
          >
            <Home className="ml-2 w-5 h-5" />
            العودة للرئيسية
          </Button>
        </div>

        {/* Share button */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-6 text-muted-foreground"
        >
          <Share2 className="ml-1 w-4 h-4" />
          مشاركة النتيجة
        </Button>
      </div>
    </div>
  );
}
