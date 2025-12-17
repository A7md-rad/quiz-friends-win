import { Trophy, RotateCcw, BookOpen, Home, Share2, Star, CheckCircle, XCircle, Calculator, Atom, FlaskConical, Leaf, Languages, type LucideIcon } from 'lucide-react';
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

const subjectIconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  book: BookOpen,
  languages: Languages,
};

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

  const SubjectIcon = subjectIconMap[subject.icon] || BookOpen;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 dotted-bg relative overflow-hidden">
      {/* Background celebration */}
      {isExcellent && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-warning fill-warning animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${Math.random() * 16 + 12}px`,
                height: `${Math.random() * 16 + 12}px`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-md text-center">
        {/* Trophy icon */}
        <div className={cn(
          'w-28 h-28 mx-auto rounded-[2rem] flex items-center justify-center mb-6 animate-celebrate',
          isExcellent && 'gradient-primary shadow-glow-primary',
          isGood && 'gradient-secondary shadow-glow-secondary',
          isPoor && 'bg-muted'
        )}>
          {isExcellent && <Trophy className="w-14 h-14 text-primary-foreground" />}
          {isGood && <Star className="w-14 h-14 text-secondary-foreground" />}
          {isPoor && <BookOpen className="w-14 h-14 text-muted-foreground" />}
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          {isExcellent && 'ممتاز!'}
          {isGood && 'جيد جداً!'}
          {isPoor && 'حاول مرة أخرى!'}
        </h1>

        {/* Subject */}
        <p className="text-muted-foreground mb-8 flex items-center justify-center gap-2">
          <SubjectIcon className="w-5 h-5 text-primary" />
          {subject.name}
        </p>

        {/* Score card */}
        <div className="bg-card rounded-3xl p-6 shadow-card mb-8 animate-scale-in">
          {/* Main score */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-primary" />
              <span className="text-5xl font-extrabold text-primary">{score}</span>
            </div>
            <p className="text-muted-foreground">نقطة</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-success/10 flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-success mb-1" />
              <p className="text-3xl font-bold text-success">{correctAnswers}</p>
              <p className="text-sm text-muted-foreground">صحيحة</p>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/10 flex flex-col items-center">
              <XCircle className="w-8 h-8 text-destructive mb-1" />
              <p className="text-3xl font-bold text-destructive">{totalQuestions - correctAnswers}</p>
              <p className="text-sm text-muted-foreground">خاطئة</p>
            </div>
          </div>

          {/* Stars rating */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-10 h-10 transition-all duration-300',
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
          <button
            onClick={onRetry}
            className="w-full py-4 px-8 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg shadow-glow-primary hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            إعادة المحاولة
          </button>

          <button
            onClick={onSelectSubject}
            className="w-full py-4 px-8 rounded-2xl gradient-secondary text-secondary-foreground font-bold text-lg shadow-glow-secondary hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            اختيار مادة أخرى
          </button>

          <button
            onClick={onHome}
            className="w-full py-4 px-8 rounded-2xl border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-colors active:scale-[0.98]"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
