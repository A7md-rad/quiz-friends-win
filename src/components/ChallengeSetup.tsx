import { useState } from 'react';
import { ArrowRight, Play, Users, User, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, Zap, type LucideIcon } from 'lucide-react';
import { subjects } from '@/data/mockData';
import { Subject, Friend, Difficulty } from '@/types/app';
import { cn } from '@/lib/utils';

interface ChallengeSetupProps {
  selectedFriends: Friend[];
  onBack: () => void;
  onStartChallenge: (subject: Subject, questionCount: number, difficulty: Difficulty) => void;
}

const questionCounts = [5, 10, 15];

const difficultyOptions: { value: Difficulty; label: string; color: string }[] = [
  { value: 'easy', label: 'سهل', color: 'bg-green-500' },
  { value: 'medium', label: 'متوسط', color: 'bg-yellow-500' },
  { value: 'hard', label: 'صعب', color: 'bg-red-500' },
];

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

export function ChallengeSetup({ selectedFriends, onBack, onStartChallenge }: ChallengeSetupProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedCount, setSelectedCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const handleStart = () => {
    if (selectedSubject) {
      onStartChallenge(selectedSubject, selectedCount, difficulty);
    }
  };

  return (
    <div className="min-h-screen flex flex-col dotted-bg">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="absolute right-5 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-card/50 transition-colors"
          >
            <ArrowRight className="w-7 h-7 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">إعداد التحدي</h1>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-8">
        {/* Selected friends */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            المنافسون
          </h2>
          <div className="flex gap-3 flex-wrap">
            {selectedFriends.map(friend => (
              <div 
                key={friend.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary" />
                </div>
                <span className="font-medium text-foreground">{friend.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject selection */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">اختر المادة</h2>
          <div className="grid grid-cols-3 gap-3">
            {subjects.map(subject => {
              const Icon = iconMap[subject.icon];
              const colors = colorClasses[subject.color] || colorClasses.primary;
              const isSelected = selectedSubject?.id === subject.id;
              
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className={cn(
                    'p-4 rounded-2xl bg-card shadow-card transition-all duration-300 flex flex-col items-center gap-3',
                    isSelected ? 'ring-2 ring-primary scale-[1.02]' : 'hover:shadow-md'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    colors.bg
                  )}>
                    {Icon && <Icon className={cn('w-6 h-6', colors.icon)} />}
                  </div>
                  <span className="text-sm font-medium text-foreground">{subject.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question count */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">عدد الأسئلة</h2>
          <div className="flex gap-3">
            {questionCounts.map(count => (
              <button
                key={count}
                onClick={() => setSelectedCount(count)}
                className={cn(
                  'flex-1 py-4 rounded-2xl font-bold text-xl transition-all duration-300',
                  selectedCount === count
                    ? 'gradient-secondary text-secondary-foreground shadow-glow-secondary'
                    : 'bg-card shadow-card text-foreground hover:shadow-md'
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            مستوى الصعوبة
          </h2>
          <div className="flex gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDifficulty(option.value)}
                className={cn(
                  'flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex flex-col items-center gap-2',
                  difficulty === option.value
                    ? 'gradient-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-card shadow-card text-foreground hover:shadow-md'
                )}
              >
                <div className={cn('w-3 h-3 rounded-full', option.color)} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedSubject && (
          <div className="bg-card rounded-3xl p-5 shadow-card animate-scale-in">
            <h3 className="font-bold text-foreground mb-4">ملخص التحدي</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المادة</span>
                <span className="font-medium text-foreground">{selectedSubject.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">عدد الأسئلة</span>
                <span className="font-medium text-foreground">{selectedCount} سؤال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المنافسون</span>
                <span className="font-medium text-foreground">{selectedFriends.length} صديق</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5">
        <button
          disabled={!selectedSubject}
          onClick={handleStart}
          className={cn(
            'w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]',
            selectedSubject
              ? 'gradient-primary text-primary-foreground shadow-glow-primary'
              : 'bg-muted text-muted-foreground'
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            ابدأ التحدي
          </div>
        </button>
      </div>
    </div>
  );
}
