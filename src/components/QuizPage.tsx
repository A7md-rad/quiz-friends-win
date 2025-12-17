import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Check, Trophy, Calculator, Zap, FlaskConical, Leaf, BookOpen, Languages, User, Sparkles, type LucideIcon } from 'lucide-react';
import { Subject, Question, QuizState } from '@/types/app';
import { sampleQuestions, currentUser, friends } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface QuizPageProps {
  subject: Subject;
  onComplete: (score: number, correctAnswers: number, totalQuestions: number) => void;
  onExit: () => void;
  isChallenge?: boolean;
  opponent?: typeof friends[0];
}

const subjectIconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  zap: Zap,
  flask: FlaskConical,
  leaf: Leaf,
  book: BookOpen,
  languages: Languages,
};

export function QuizPage({ subject, onComplete, onExit, isChallenge = false, opponent }: QuizPageProps) {
  const questions = sampleQuestions[subject.id] || sampleQuestions.math;
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: new Array(questions.length).fill(null),
    isComplete: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);

  const currentQ = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;
  const SubjectIcon = subjectIconMap[subject.icon] || BookOpen;

  // Simulate opponent score in challenge mode
  useEffect(() => {
    if (isChallenge && opponent) {
      const interval = setInterval(() => {
        setOpponentScore(prev => {
          if (prev < state.score + 20) {
            return prev + Math.floor(Math.random() * 15);
          }
          return prev;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isChallenge, opponent, state.score]);

  const handleSelectAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setState(prev => ({
        ...prev,
        score: prev.score + currentQ.points,
      }));
    }

    // Auto advance after feedback
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: prev.answers.map((a, i) => i === prev.currentQuestion ? selectedAnswer : a),
      }));
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const correctAnswers = state.answers.filter((a, i) => 
        a === questions[i]?.correctAnswer
      ).length + (selectedAnswer === currentQ.correctAnswer ? 1 : 0);
      
      onComplete(state.score + (isCorrect ? currentQ.points : 0), correctAnswers, questions.length);
    }
  };

  const handleExit = () => {
    if (confirm('هل أنت متأكد من إنهاء الاختبار؟')) {
      onExit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" size="icon" onClick={handleExit}>
            <X className="w-5 h-5" />
          </Button>

          {/* Score display */}
          <div className="flex items-center gap-4">
            {isChallenge && opponent && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{opponentScore}</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground">
              <Trophy className="w-4 h-4" />
              <span className="font-bold">{state.score}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 right-0 gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {state.currentQuestion + 1} / {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {/* Subject badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-2">
              <SubjectIcon className="w-4 h-4" />
              {subject.name}
            </span>
          </div>

          {/* Question text */}
          <div className="bg-card rounded-2xl p-6 shadow-card mb-8 animate-scale-in">
            <p className="text-xl font-bold text-foreground text-center leading-relaxed">
              {currentQ.text}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correctAnswer;
              const showCorrect = showFeedback && isCorrectAnswer;
              const showWrong = showFeedback && isSelected && !isCorrectAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-right transition-all duration-300',
                    'flex items-center gap-3',
                    !showFeedback && !isSelected && 'border-border bg-card hover:border-primary/50 hover:bg-primary/5',
                    !showFeedback && isSelected && 'border-primary bg-primary/10',
                    showCorrect && 'border-success bg-success/10 animate-celebrate',
                    showWrong && 'border-destructive bg-destructive/10 animate-shake'
                  )}
                >
                  {/* Option letter */}
                  <span className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0',
                    !showFeedback && 'bg-muted text-muted-foreground',
                    showCorrect && 'bg-success text-success-foreground',
                    showWrong && 'bg-destructive text-destructive-foreground'
                  )}>
                    {showCorrect ? <Check className="w-5 h-5" /> : 
                     showWrong ? <X className="w-5 h-5" /> : 
                     String.fromCharCode(65 + index)}
                  </span>

                  {/* Option text */}
                  <span className={cn(
                    'font-medium flex-1',
                    showCorrect && 'text-success',
                    showWrong && 'text-destructive'
                  )}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback toast */}
        {showFeedback && (
          <div className={cn(
            'fixed bottom-24 left-4 right-4 p-4 rounded-xl shadow-lg animate-slide-up',
            isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
          )}>
            <div className="flex items-center justify-center gap-2">
              {isCorrect ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse-slow" />
                  <span className="font-bold">إجابة صحيحة! +{currentQ.points}</span>
                </>
              ) : (
                <>
                  <X className="w-5 h-5" />
                  <span className="font-bold">إجابة غير صحيحة</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleExit}
          >
            إنهاء
          </Button>
          <Button
            variant="default"
            className="flex-1"
            onClick={handleNext}
            disabled={selectedAnswer === null && !showFeedback}
          >
            {state.currentQuestion < questions.length - 1 ? (
              <>
                التالي
                <ArrowLeft className="mr-2 w-4 h-4" />
              </>
            ) : (
              'إنهاء الاختبار'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
