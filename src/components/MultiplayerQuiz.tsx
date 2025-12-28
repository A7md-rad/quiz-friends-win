import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Check, Crown, Clock, Volume2, VolumeX } from 'lucide-react';
import { Subject, Question, Friend } from '@/types/app';
import { sampleQuestions } from '@/data/mockData';
import { shuffleQuestions } from '@/utils/gameUtils';
import { cn } from '@/lib/utils';
import { playCountdownBeep, playTimeUpSound, playCorrectSound, playWrongSound } from '@/utils/soundEffects';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  currentAnswer: number | null;
  hasAnswered: boolean;
}

interface MultiplayerQuizProps {
  subject: Subject;
  selectedFriends: Friend[];
  questionCount?: number;
  maxPlayers?: number;
  gamePlayers?: {id: string; name: string; isHost: boolean}[];
  onComplete: (score: number, correctAnswers: number, totalQuestions: number) => void;
  onExit: () => void;
}

export function MultiplayerQuiz({ 
  subject, 
  selectedFriends, 
  questionCount = 10, 
  maxPlayers = 2,
  gamePlayers = [],
  onComplete, 
  onExit 
}: MultiplayerQuizProps) {
  // خلط الأسئلة وتحديد العدد المطلوب
  const questions = useMemo(() => {
    const originalQuestions = sampleQuestions[subject.id] || sampleQuestions.math;
    const shuffled = shuffleQuestions(originalQuestions);
    // أخذ عدد الأسئلة المحدد فقط
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  }, [subject.id, questionCount]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [phase, setPhase] = useState<'answering' | 'results'>('answering');
  const [timer, setTimer] = useState(10);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const lastPlayedSecond = useRef<number>(0);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Initialize players - استخدام اللاعبين من غرفة الانتظار أو إنشاء لاعبين وهميين
  useEffect(() => {
    let allPlayers: Player[];
    
    if (gamePlayers.length > 0) {
      // استخدام اللاعبين من غرفة الانتظار
      allPlayers = gamePlayers.map(p => ({
        id: p.id,
        name: p.name,
        avatar: 'user',
        score: 0,
        currentAnswer: null,
        hasAnswered: false
      }));
    } else if (selectedFriends.length > 0) {
      // استخدام الأصدقاء المحددين
      allPlayers = [
        { id: '1', name: 'أنت', avatar: 'user', score: 0, currentAnswer: null, hasAnswered: false },
        ...selectedFriends.map(f => ({ 
          id: f.id, 
          name: f.name, 
          avatar: f.avatar, 
          score: 0, 
          currentAnswer: null, 
          hasAnswered: false 
        }))
      ];
    } else {
      // إنشاء لاعبين وهميين بناءً على عدد اللاعبين المحدد
      const fakeNames = ['أحمد', 'محمد', 'سارة', 'فاطمة'];
      const fakePlayers = fakeNames.slice(0, maxPlayers - 1).map((name, index) => ({
        id: `fake_${index + 2}`,
        name: name,
        avatar: 'user',
        score: 0,
        currentAnswer: null,
        hasAnswered: false
      }));
      
      allPlayers = [
        { id: '1', name: 'أنت', avatar: 'user', score: 0, currentAnswer: null, hasAnswered: false },
        ...fakePlayers
      ];
    }
    
    setPlayers(allPlayers);
  }, [selectedFriends, gamePlayers, maxPlayers]);

  // Timer countdown with sound effects
  useEffect(() => {
    if (phase !== 'answering') return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        const newTimer = prev - 1;
        
        // تشغيل صوت العد التنازلي
        if (soundEnabled && newTimer <= 3 && newTimer > 0 && newTimer !== lastPlayedSecond.current) {
          lastPlayedSecond.current = newTimer;
          playCountdownBeep(newTimer);
        }
        
        if (newTimer <= 0) {
          // Time's up - show results
          if (soundEnabled) {
            playTimeUpSound();
          }
          handleTimeUp();
          return 10;
        }
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, currentQuestion, soundEnabled]);

  // Reset last played second when question changes
  useEffect(() => {
    lastPlayedSecond.current = 0;
  }, [currentQuestion]);

  // Simulate opponents answering
  useEffect(() => {
    if (phase !== 'answering') return;

    // Get opponent IDs (not the first player which is the user)
    const opponentIds = players.filter(p => p.id !== '1').map(p => p.id);
    
    opponentIds.forEach((opponentId) => {
      const delay = 2000 + Math.random() * 5000; // 2-7 seconds
      const timeout = setTimeout(() => {
        if (phase === 'answering') {
          setPlayers(prev => prev.map(p => {
            if (p.id === opponentId && !p.hasAnswered) {
              // 60% chance to answer correctly
              const answerCorrectly = Math.random() < 0.6;
              const answer = answerCorrectly ? currentQ.correctAnswer : 
                Math.floor(Math.random() * currentQ.options.length);
              return { ...p, currentAnswer: answer, hasAnswered: true };
            }
            return p;
          }));
        }
      }, delay);
      return () => clearTimeout(timeout);
    });
  }, [currentQuestion, phase, players.length]);

  const handleTimeUp = () => {
    // Make sure all players have answered (random for those who haven't)
    setPlayers(prev => prev.map(p => {
      if (!p.hasAnswered && p.id !== '1') {
        const answerCorrectly = Math.random() < 0.5;
        const answer = answerCorrectly ? currentQ.correctAnswer : 
          Math.floor(Math.random() * currentQ.options.length);
        return { ...p, currentAnswer: answer, hasAnswered: true };
      }
      return p;
    }));
    setPhase('results');
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (userAnswer !== null || phase !== 'answering') return;
    
    setUserAnswer(answerIndex);
    setPlayers(prev => prev.map(p => {
      if (p.id === '1') {
        return { ...p, currentAnswer: answerIndex, hasAnswered: true };
      }
      return p;
    }));

    // Check if all players answered
    const allAnswered = players.every(p => p.id === '1' ? true : p.hasAnswered);
    if (allAnswered) {
      setTimeout(() => {
        setPhase('results');
      }, 500);
    }
  };

  // Calculate scores when showing results and play sound
  useEffect(() => {
    if (phase === 'results') {
      setPlayers(prev => prev.map(p => {
        if (p.currentAnswer === currentQ.correctAnswer) {
          return { ...p, score: p.score + currentQ.points };
        }
        return p;
      }));
      
      if (userAnswer === currentQ.correctAnswer) {
        setCorrectCount(prev => prev + 1);
        if (soundEnabled) {
          playCorrectSound();
        }
      } else if (userAnswer !== null) {
        if (soundEnabled) {
          playWrongSound();
        }
      }
    }
  }, [phase]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setPhase('answering');
      setTimer(10);
      setUserAnswer(null);
      setPlayers(prev => prev.map(p => ({ ...p, currentAnswer: null, hasAnswered: false })));
    } else {
      // Quiz complete
      const userPlayer = players.find(p => p.id === '1');
      onComplete(userPlayer?.score || 0, correctCount, questions.length);
    }
  };

  const handleExit = () => {
    if (confirm('هل أنت متأكد من إنهاء المسابقة؟')) {
      onExit();
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const answeredCount = players.filter(p => p.hasAnswered).length;

  return (
    <div className="min-h-screen flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 bg-gradient-to-b from-primary/20 to-transparent">
        <div className="flex items-center justify-between mb-3">
          {/* Timer */}
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            timer <= 3 ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-primary/20 text-primary"
          )}>
            <Clock className="w-5 h-5" />
            <span className="text-xl font-bold">{timer}</span>
          </div>

          {/* Question number */}
          <div className="text-center">
            <span className="text-sm text-muted-foreground">السؤال</span>
            <div className="text-xl font-bold text-primary">{currentQuestion + 1}/{questions.length}</div>
          </div>

          {/* Sound toggle */}
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted/50 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {/* Close button */}
          <button 
            onClick={handleExit}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted/50 transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Players status */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {players.map((player) => (
            <div 
              key={player.id}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                player.hasAnswered && phase === 'answering' && "bg-success/20",
                phase === 'results' && player.currentAnswer === currentQ.correctAnswer && "bg-success/20",
                phase === 'results' && player.currentAnswer !== currentQ.correctAnswer && "bg-destructive/10"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold relative",
                player.id === '1' ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}>
                {player.name.charAt(0)}
                {player.hasAnswered && phase === 'answering' && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-success-foreground" />
                  </div>
                )}
                {phase === 'results' && (
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                    player.currentAnswer === currentQ.correctAnswer ? "bg-success" : "bg-destructive"
                  )}>
                    {player.currentAnswer === currentQ.correctAnswer ? (
                      <Check className="w-3 h-3 text-success-foreground" />
                    ) : (
                      <X className="w-3 h-3 text-destructive-foreground" />
                    )}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-foreground">{player.name}</span>
              <span className="text-xs text-primary font-bold">{player.score}</span>
            </div>
          ))}
        </div>
        
        {phase === 'answering' && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            {answeredCount}/{players.length} أجابوا
          </p>
        )}
      </div>

      {/* Question */}
      <div className="flex-1 px-4 flex flex-col">
        <div className="bg-card rounded-2xl p-5 shadow-card mb-4 border border-border">
          <p className="text-lg font-bold text-foreground text-center leading-relaxed">
            {currentQ.text}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2 flex-1">
          {currentQ.options.map((option, index) => {
            const isSelected = userAnswer === index;
            const isCorrectAnswer = index === currentQ.correctAnswer;
            const showCorrect = phase === 'results' && isCorrectAnswer;
            const showWrong = phase === 'results' && isSelected && !isCorrectAnswer;
            const letter = String.fromCharCode(65 + index);
            
            // Count who answered this option
            const playersWithThisAnswer = phase === 'results' 
              ? players.filter(p => p.currentAnswer === index)
              : [];

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={userAnswer !== null || phase === 'results'}
                className={cn(
                  'w-full p-3 rounded-xl border-2 transition-all duration-300',
                  'flex items-center gap-3',
                  phase === 'answering' && !isSelected && 'border-border bg-card hover:border-primary/40',
                  phase === 'answering' && isSelected && 'border-primary bg-primary/10',
                  showCorrect && 'border-success bg-success/10',
                  showWrong && 'border-destructive bg-destructive/10'
                )}
              >
                <span className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-2',
                  phase === 'answering' && 'border-muted-foreground/30 text-muted-foreground bg-muted',
                  showCorrect && 'border-success bg-success text-success-foreground',
                  showWrong && 'border-destructive bg-destructive text-destructive-foreground'
                )}>
                  {showCorrect ? <Check className="w-4 h-4" /> : 
                   showWrong ? <X className="w-4 h-4" /> : 
                   letter}
                </span>

                <span className={cn(
                  'font-semibold flex-1 text-right',
                  phase === 'answering' && 'text-foreground',
                  showCorrect && 'text-success',
                  showWrong && 'text-destructive'
                )}>
                  {option}
                </span>

                {/* Show who answered this */}
                {phase === 'results' && playersWithThisAnswer.length > 0 && (
                  <div className="flex -space-x-2">
                    {playersWithThisAnswer.map(p => (
                      <div 
                        key={p.id}
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 border-card",
                          p.id === '1' ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {p.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results overlay */}
      {phase === 'results' && (
        <div className="p-4 bg-card border-t border-border">
          {/* Leaderboard mini */}
          <div className="mb-4">
            <h3 className="text-center font-bold text-foreground mb-2">الترتيب الحالي</h3>
            <div className="flex justify-center gap-4">
              {sortedPlayers.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex flex-col items-center">
                  {index === 0 && <Crown className="w-5 h-5 text-warning mb-1" />}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                    player.id === '1' ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  )}>
                    {player.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium">{player.name}</span>
                  <span className="text-sm font-bold text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNextQuestion}
            className="w-full py-6 rounded-xl gradient-primary text-primary-foreground font-bold text-lg"
          >
            {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'عرض النتائج'}
          </Button>
        </div>
      )}
    </div>
  );
}
