import { useState } from 'react';
import { ArrowRight, HelpCircle, Play, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, Zap, Clock, type LucideIcon } from 'lucide-react';
import { Subject, Difficulty } from '@/types/app';
import { cn } from '@/lib/utils';

interface SoloSetupProps {
  subject: Subject;
  onBack: () => void;
  onStart: (questionCount: number, difficulty: Difficulty, timePerQuestion: number) => void;
}

const subjectIconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  book: BookOpen,
  languages: Languages,
};

const questionCountOptions = [5, 10, 15];
const timeOptions = [10, 15, 20, 30];

const difficultyOptions: { value: Difficulty; label: string; color: string }[] = [
  { value: 'easy', label: 'سهل', color: 'bg-green-500' },
  { value: 'medium', label: 'متوسط', color: 'bg-yellow-500' },
  { value: 'hard', label: 'صعب', color: 'bg-red-500' },
];

export function SoloSetup({ subject, onBack, onStart }: SoloSetupProps) {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timePerQuestion, setTimePerQuestion] = useState(15);

  const IconComponent = subjectIconMap[subject.icon] || BookOpen;

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
        <h1 className="text-2xl font-bold text-foreground">إعداد التحدي</h1>
      </div>

      {/* Selected Subject */}
      <div className="bg-card rounded-2xl p-4 shadow-card mb-4 text-center">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-2">
          <IconComponent className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">{subject.name}</h2>
      </div>

      {/* Question Count */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          عدد الأسئلة
        </h2>
        <div className="flex gap-2">
          {questionCountOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={cn(
                'flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95',
                questionCount === count
                  ? 'gradient-secondary text-secondary-foreground shadow-glow-secondary'
                  : 'bg-card shadow-card hover:shadow-md text-foreground'
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Time Per Question */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          الوقت لكل سؤال (ثانية)
        </h2>
        <div className="flex gap-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => setTimePerQuestion(time)}
              className={cn(
                'flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95',
                timePerQuestion === time
                  ? 'gradient-secondary text-secondary-foreground shadow-glow-secondary'
                  : 'bg-card shadow-card hover:shadow-md text-foreground'
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          مستوى الصعوبة
        </h2>
        <div className="flex gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setDifficulty(option.value)}
              className={cn(
                'flex-1 py-4 rounded-xl font-bold text-base transition-all active:scale-95 flex flex-col items-center gap-1',
                difficulty === option.value
                  ? 'gradient-primary text-primary-foreground shadow-glow-primary'
                  : 'bg-card shadow-card hover:shadow-md text-foreground'
              )}
            >
              <div className={cn('w-3 h-3 rounded-full', option.color)} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Start Button */}
      <button
        onClick={() => onStart(questionCount, difficulty, timePerQuestion)}
        className="w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 gradient-primary text-primary-foreground shadow-glow-primary transition-all active:scale-[0.98]"
      >
        <Play className="w-6 h-6" />
        ابدأ التحدي
      </button>
    </div>
  );
}
