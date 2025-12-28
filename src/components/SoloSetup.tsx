import { useState } from 'react';
import { ArrowRight, HelpCircle, Play, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, type LucideIcon } from 'lucide-react';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';

interface SoloSetupProps {
  subject: Subject;
  onBack: () => void;
  onStart: (questionCount: number) => void;
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

export function SoloSetup({ subject, onBack, onStart }: SoloSetupProps) {
  const [questionCount, setQuestionCount] = useState(10);

  const IconComponent = subjectIconMap[subject.icon] || BookOpen;

  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-card shadow-card flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
        >
          <ArrowRight className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">إعداد التحدي</h1>
      </div>

      {/* Selected Subject */}
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6 text-center">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <IconComponent className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{subject.name}</h2>
        <p className="text-muted-foreground">المادة المختارة</p>
      </div>

      {/* Question Count */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          عدد الأسئلة
        </h2>
        <div className="flex gap-3">
          {questionCountOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={cn(
                'flex-1 py-5 rounded-2xl font-bold text-xl transition-all active:scale-95',
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Start Button */}
      <button
        onClick={() => onStart(questionCount)}
        className="w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 gradient-primary text-primary-foreground shadow-glow-primary transition-all active:scale-[0.98]"
      >
        <Play className="w-6 h-6" />
        ابدأ التحدي
      </button>
    </div>
  );
}
