import { useState, useEffect } from 'react';
import { ArrowRight, Copy, Check, Users, HelpCircle, Play, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, type LucideIcon } from 'lucide-react';
import { Subject } from '@/types/app';
import { subjects } from '@/data/mockData';
import { generateGameCode } from '@/utils/gameUtils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CreateGameProps {
  onBack: () => void;
  onStartGame: (subject: Subject, questionCount: number, maxPlayers: number, gameCode: string) => void;
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
const playerCountOptions = [2, 3, 4];

export function CreateGame({ onBack, onStartGame }: CreateGameProps) {
  const [gameCode, setGameCode] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setGameCode(generateGameCode());
  }, []);

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
    if (!selectedSubject) {
      toast.error('اختر مادة أولاً');
      return;
    }
    onStartGame(selectedSubject, questionCount, maxPlayers, gameCode);
  };

  const canStart = selectedSubject !== null;

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
        <h1 className="text-2xl font-bold text-foreground">إنشاء لعبة</h1>
      </div>

      {/* Game Code Display */}
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">شارك هذا الكود مع أصدقائك</p>
        <div className="flex items-center justify-center gap-3">
          <div className="flex gap-2">
            {gameCode.split('').map((digit, index) => (
              <div
                key={index}
                className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-md"
              >
                {digit}
              </div>
            ))}
          </div>
          <button
            onClick={handleCopyCode}
            className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-success" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          اختر المادة
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {subjects.map((subject) => {
            const IconComponent = subjectIconMap[subject.icon] || BookOpen;
            const isSelected = selectedSubject?.id === subject.id;
            
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject)}
                className={cn(
                  'p-4 rounded-xl flex flex-col items-center gap-2 transition-all active:scale-95',
                  isSelected
                    ? 'gradient-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-card shadow-card hover:shadow-md'
                )}
              >
                <IconComponent className={cn(
                  'w-6 h-6',
                  isSelected ? 'text-primary-foreground' : 'text-primary'
                )} />
                <span className={cn(
                  'text-sm font-semibold',
                  isSelected ? 'text-primary-foreground' : 'text-foreground'
                )}>
                  {subject.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Count */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          عدد الأسئلة
        </h2>
        <div className="flex gap-3">
          {questionCountOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={cn(
                'flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95',
                questionCount === count
                  ? 'gradient-secondary text-secondary-foreground shadow-md'
                  : 'bg-card shadow-card hover:shadow-md text-foreground'
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Player Count */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          عدد اللاعبين
        </h2>
        <div className="flex gap-3">
          {playerCountOptions.map((count) => (
            <button
              key={count}
              onClick={() => setMaxPlayers(count)}
              className={cn(
                'flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95',
                maxPlayers === count
                  ? 'gradient-secondary text-secondary-foreground shadow-md'
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
        onClick={handleStartGame}
        disabled={!canStart}
        className={cn(
          'w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]',
          canStart
            ? 'gradient-primary text-primary-foreground shadow-glow-primary'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        <Play className="w-6 h-6" />
        ابدأ التحدي
      </button>
    </div>
  );
}
