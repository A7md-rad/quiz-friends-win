import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check, Star, Clock, Calculator, Atom, FlaskConical, Leaf, BookOpen, Languages, Sparkles, type LucideIcon } from 'lucide-react';
import { Subject, Question, QuizState, Difficulty } from '@/types/app';
import { sampleQuestions, getQuestionsByDifficulty } from '@/data/mockData';
import { shuffleQuestions } from '@/utils/gameUtils';
import { cn } from '@/lib/utils';

interface QuizPageProps {
  subject: Subject;
  questionCount?: number;
  difficulty?: Difficulty;
  timePerQuestion?: number;
  onComplete: (score: number, correctAnswers: number, totalQuestions: number) => void;
  onExit: () => void;
}

const subjectIconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  leaf: Leaf,
  book: BookOpen,
  languages: Languages,
};

export function QuizPage({ subject, questionCount = 10, difficulty = 'medium', timePerQuestion = 15, onComplete, onExit }: QuizPageProps) {
  // فلترة الأسئلة حسب الصعوبة وخلط الخيارات
  const questions = useMemo(() => {
    const filtered = getQuestionsByDifficulty(subject.id, difficulty, questionCount);
    return shuffleQuestions(filtered);
  }, [subject.id, questionCount, difficulty]);

  const [timer, setTimer] = useState(timePerQuestion);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: new Array(questions.length).fill(null),
    isComplete: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = questions[state.currentQuestion];
  const progress = ((state.currentQuestion + 1) / questions.length) * 100;

  const [correctCount, setCorrectCount] = useState(0);

  // Timer effect
  useEffect(() => {
    if (showFeedback) return;
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          // Time's up - auto select wrong answer
          handleTimeUp();
          return timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.currentQuestion, showFeedback]);

  const handleTimeUp = () => {
    if (showFeedback) return;
    setSelectedAnswer(-1); // No answer selected
    setIsCorrect(false);
    setShowFeedback(true);
    
    setTimeout(() => {
      handleNext(false);
    }, 1500);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setState(prev => ({
        ...prev,
        score: prev.score + currentQ.points,
      }));
      setCorrectCount(prev => prev + 1);
    }

    // Auto advance after feedback
    setTimeout(() => {
      handleNext(correct);
    }, 1500);
  };

  const handleNext = (wasCorrect: boolean) => {
    if (state.currentQuestion < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: prev.answers.map((a, i) => i === prev.currentQuestion ? selectedAnswer : a),
      }));
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimer(timePerQuestion);
    } else {
      // Quiz complete - استخدام correctCount المحدث
      const finalScore = state.score + (wasCorrect ? currentQ.points : 0);
      const finalCorrectCount = correctCount + (wasCorrect ? 1 : 0);
      onComplete(finalScore, finalCorrectCount, questions.length);
    }
  };

  const handleExit = () => {
    if (confirm('هل أنت متأكد من إنهاء الاختبار؟')) {
      onExit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-card dotted-bg">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          {/* Timer */}
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            timer <= 5 ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-primary/20 text-primary"
          )}>
            <Clock className="w-5 h-5" />
            <span className="text-xl font-bold">{timer}</span>
          </div>

          {/* Points badge */}
          <div className="flex items-center gap-2 px-5 py-3 rounded-full gradient-secondary">
            <span className="text-lg font-bold text-secondary-foreground">{state.score}</span>
            <Star className="w-5 h-5 text-secondary-foreground fill-secondary-foreground" />
          </div>

          {/* Close button */}
          <button 
            onClick={handleExit}
            className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-muted/50 transition-colors"
          >
            <X className="w-7 h-7 text-muted-foreground" />
          </button>
        </div>

        {/* Progress section */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary font-bold">{state.currentQuestion + 1}/{questions.length}</span>
          <span className="text-muted-foreground">التقدم</span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-5 flex flex-col">
        {/* Question card */}
        <div className="bg-card rounded-3xl p-6 shadow-card mb-6 animate-scale-in">
          <p className="text-xl font-bold text-foreground text-center leading-relaxed">
            {currentQ.text}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQ.correctAnswer;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showWrong = showFeedback && isSelected && !isCorrectAnswer;
            const letter = String.fromCharCode(65 + index);

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  'w-full p-4 rounded-2xl border-2 transition-all duration-300',
                  'flex items-center gap-4',
                  !showFeedback && !isSelected && 'border-border bg-card hover:border-primary/40',
                  !showFeedback && isSelected && 'border-primary bg-primary/5',
                  showCorrect && 'border-success bg-success/10',
                  showWrong && 'border-destructive bg-destructive/10 animate-shake'
                )}
              >
                {/* Option letter */}
                <span className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shrink-0 border-2',
                  !showFeedback && 'border-muted-foreground/30 text-muted-foreground bg-muted',
                  showCorrect && 'border-success bg-success text-success-foreground',
                  showWrong && 'border-destructive bg-destructive text-destructive-foreground'
                )}>
                  {showCorrect ? <Check className="w-5 h-5" /> : 
                   showWrong ? <X className="w-5 h-5" /> : 
                   letter}
                </span>

                {/* Option text */}
                <span className={cn(
                  'font-semibold flex-1 text-right text-lg',
                  !showFeedback && 'text-foreground',
                  showCorrect && 'text-success',
                  showWrong && 'text-destructive'
                )}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback toast */}
        {showFeedback && (
          <div className={cn(
            'fixed bottom-28 left-5 right-5 p-4 rounded-2xl shadow-lg animate-slide-up',
            isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
          )}>
            <div className="flex items-center justify-center gap-2">
              {isCorrect ? (
                <>
                  <Sparkles className="w-5 h-5" />
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
      <div className="p-5">
        <button
          onClick={handleExit}
          className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-colors"
        >
          إنهاء
        </button>
      </div>
    </div>
  );
}
