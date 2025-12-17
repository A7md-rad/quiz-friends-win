import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, type LucideIcon } from 'lucide-react';
import { subjects } from '@/data/mockData';
import { Subject } from '@/types/app';
import { cn } from '@/lib/utils';

interface SubjectSelectionProps {
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
  title?: string;
}

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  book: BookOpen,
  languages: Languages,
};

const colorClasses: Record<string, { bg: string; icon: string }> = {
  primary: { bg: 'gradient-primary', icon: 'text-primary-foreground' },
  secondary: { bg: 'gradient-physics', icon: 'text-physics-foreground' },
  accent: { bg: 'gradient-accent', icon: 'text-accent-foreground' },
  success: { bg: 'gradient-success', icon: 'text-success-foreground' },
  warning: { bg: 'gradient-secondary', icon: 'text-secondary-foreground' },
  arabic: { bg: 'gradient-arabic', icon: 'text-arabic-foreground' },
};

export function SubjectSelection({ onSelectSubject, onBack, title = 'اختر المادة' }: SubjectSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col p-6 dotted-bg">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-10 pt-4">
        <button 
          onClick={onBack} 
          className="absolute right-6 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card/50 transition-colors"
        >
          <ArrowRight className="w-7 h-7 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>

      {/* Subject grid */}
      <div className="grid grid-cols-2 gap-4 flex-1 max-w-lg mx-auto w-full">
        {subjects.map((subject, index) => {
          const Icon = iconMap[subject.icon];
          const colors = colorClasses[subject.color] || colorClasses.primary;
          
          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              className={cn(
                'bg-card rounded-3xl p-6 shadow-card transition-all duration-300',
                'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
                'flex flex-col items-center justify-center gap-4 min-h-[160px]',
                'animate-slide-up border-2 border-transparent',
                'focus:border-primary/50'
              )}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Icon container */}
              <div className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center',
                colors.bg
              )}>
                {Icon && <Icon className={cn('w-8 h-8', colors.icon)} />}
              </div>

              {/* Name */}
              <span className="font-bold text-foreground text-lg">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
