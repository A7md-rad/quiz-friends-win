import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { subjects } from '@/data/mockData';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';

interface SubjectSelectionProps {
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
  title?: string;
}

const colorVariants: Record<string, string> = {
  primary: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/60',
  secondary: 'from-secondary/20 to-secondary/5 border-secondary/30 hover:border-secondary/60',
  accent: 'from-accent/20 to-accent/5 border-accent/30 hover:border-accent/60',
  success: 'from-success/20 to-success/5 border-success/30 hover:border-success/60',
  warning: 'from-warning/20 to-warning/5 border-warning/30 hover:border-warning/60',
};

const iconBgVariants: Record<string, string> = {
  primary: 'bg-primary/20',
  secondary: 'bg-secondary/20',
  accent: 'bg-accent/20',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
};

export function SubjectSelection({ onSelectSubject, onBack, title = 'اختر المادة' }: SubjectSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
          <ArrowRight className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {subjects.map((subject, index) => (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject)}
            className={cn(
              'relative p-5 rounded-2xl border-2 bg-gradient-to-br transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-card-hover active:scale-[0.98]',
              'flex flex-col items-center justify-center gap-3 min-h-[140px]',
              'animate-slide-up',
              colorVariants[subject.color]
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon */}
            <div className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center',
              iconBgVariants[subject.color]
            )}>
              <span className="text-3xl">{subject.icon}</span>
            </div>

            {/* Name */}
            <span className="font-bold text-foreground text-lg">{subject.name}</span>

            {/* Questions count */}
            <span className="text-xs text-muted-foreground">
              {subject.questionsCount} سؤال
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
