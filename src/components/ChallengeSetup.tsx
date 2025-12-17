import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users } from 'lucide-react';
import { subjects } from '@/data/mockData';
import { Subject, Friend } from '@/types/app';
import { cn } from '@/lib/utils';

interface ChallengeSetupProps {
  selectedFriends: Friend[];
  onBack: () => void;
  onStartChallenge: (subject: Subject, questionCount: number) => void;
}

const questionCounts = [5, 10, 15];

export function ChallengeSetup({ selectedFriends, onBack, onStartChallenge }: ChallengeSetupProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedCount, setSelectedCount] = useState(10);

  const handleStart = () => {
    if (selectedSubject) {
      onStartChallenge(selectedSubject, selectedCount);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowRight className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">إعداد التحدي</h1>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8">
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
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30"
              >
                <span className="text-xl">{friend.avatar}</span>
                <span className="font-medium text-foreground">{friend.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject selection */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">اختر المادة</h2>
          <div className="grid grid-cols-3 gap-3">
            {subjects.map(subject => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2',
                  selectedSubject?.id === subject.id
                    ? 'border-primary bg-primary/10 shadow-glow-primary'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <span className="text-2xl">{subject.icon}</span>
                <span className="text-sm font-medium text-foreground">{subject.name}</span>
              </button>
            ))}
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
                  'flex-1 py-4 rounded-xl border-2 font-bold text-xl transition-all duration-300',
                  selectedCount === count
                    ? 'border-secondary bg-secondary/10 text-secondary shadow-glow-secondary'
                    : 'border-border bg-card text-foreground hover:border-secondary/50'
                )}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedSubject && (
          <div className="bg-card rounded-2xl p-5 shadow-card border border-border animate-scale-in">
            <h3 className="font-bold text-foreground mb-4">ملخص التحدي</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المادة</span>
                <span className="font-medium text-foreground">{selectedSubject.icon} {selectedSubject.name}</span>
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
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          disabled={!selectedSubject}
          onClick={handleStart}
        >
          <Play className="ml-2 w-5 h-5" />
          ابدأ التحدي
        </Button>
      </div>
    </div>
  );
}
