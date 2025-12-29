import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { SubjectSelection } from "@/components/SubjectSelection";
import { SoloSetup } from "@/components/SoloSetup";
import { QuizPage } from "@/components/QuizPage";
import { MultiplayerQuiz } from "@/components/MultiplayerQuiz";
import { QuizResult } from "@/components/QuizResult";
import { FriendsList } from "@/components/FriendsList";
import { ChallengeSetup } from "@/components/ChallengeSetup";
import { GameModeSelection } from "@/components/GameModeSelection";
import { CreateGame } from "@/components/CreateGame";
import { JoinGame } from "@/components/JoinGame";
import { WaitingRoom } from "@/components/WaitingRoom";
import { JoinWaitingRoom } from "@/components/JoinWaitingRoom";
import { AndroidStatusBar } from "@/components/AndroidStatusBar";
import { Screen, Subject, Friend, Difficulty } from "@/types/app";

interface GameSettings {
  code: string;
  subject: Subject | null;
  questionCount: number;
  maxPlayers: number;
  isHost: boolean;
  difficulty: Difficulty;
  timePerQuestion: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [quizResult, setQuizResult] = useState({ score: 0, correct: 0, total: 0 });
  const [isChallenge, setIsChallenge] = useState(false);
  const [quizKey, setQuizKey] = useState(0); // مفتاح لإعادة تحميل الأسئلة
  
  // Game settings for multiplayer
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    code: '',
    subject: null,
    questionCount: 5,
    maxPlayers: 2,
    isHost: false,
    difficulty: 'medium',
    timePerQuestion: 15
  });
  
  // Players from waiting room
  const [gamePlayers, setGamePlayers] = useState<{id: string; name: string; isHost: boolean}[]>([]);
  
  // Solo quiz settings
  const [soloQuestionCount, setSoloQuestionCount] = useState(10);
  const [soloDifficulty, setSoloDifficulty] = useState<Difficulty>('medium');
  const [soloTimePerQuestion, setSoloTimePerQuestion] = useState(15);
  
  // User state
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  const [totalPoints, setTotalPoints] = useState(() => {
    return parseInt(localStorage.getItem('totalPoints') || '0', 10);
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('totalPoints', totalPoints.toString());
  }, [totalPoints]);

  // Navigation handlers
  const goToWelcome = () => {
    setCurrentScreen("welcome");
    setSelectedSubject(null);
    setSelectedFriends([]);
    setIsChallenge(false);
  };

  const goToSubjectSelection = (forChallenge = false) => {
    setSelectedSubject(null);
    setIsChallenge(forChallenge);
    setCurrentScreen("subject-selection");
  };

  const goToSoloSetup = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen("solo-setup");
  };

  const handleSoloStart = (questionCount: number, difficulty: Difficulty, timePerQuestion: number) => {
    setSoloQuestionCount(questionCount);
    setSoloDifficulty(difficulty);
    setSoloTimePerQuestion(timePerQuestion);
    setCurrentScreen("quiz");
  };

  const goToQuiz = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen(isChallenge ? "challenge-quiz" : "solo-setup");
  };

  const goToGameModeSelection = () => {
    setCurrentScreen("game-mode-selection");
  };

  const goToCreateGame = () => {
    setCurrentScreen("create-game");
  };

  const goToJoinGame = () => {
    setCurrentScreen("join-game");
  };

  const handleCreateGameStart = (subject: Subject, questionCount: number, maxPlayers: number, gameCode: string, difficulty: Difficulty, timePerQuestion: number) => {
    setGameSettings({
      code: gameCode,
      subject: subject,
      questionCount: questionCount,
      maxPlayers: maxPlayers,
      isHost: true,
      difficulty: difficulty,
      timePerQuestion: timePerQuestion
    });
    setSelectedSubject(subject);
    setIsChallenge(true);
    setCurrentScreen("waiting-room");
  };

  const handleJoinSuccess = (code: string) => {
    // للمنضم: المضيف يحدد الإعدادات
    setGameSettings({
      code: code,
      subject: null,
      questionCount: 10,
      maxPlayers: 4,
      isHost: false,
      difficulty: 'medium',
      timePerQuestion: 15
    });
    setIsChallenge(true);
    setCurrentScreen("join-waiting-room");
  };

  const handleJoinGameStart = (gameData: any) => {
    // بدء اللعبة مع البيانات من قاعدة البيانات
    const subject: Subject = { 
      id: gameData.subject_id, 
      name: gameData.subject_name, 
      icon: 'book', 
      color: 'primary', 
      questionsCount: 50 
    };
    setSelectedSubject(subject);
    setGameSettings(prev => ({
      ...prev,
      questionCount: gameData.question_count,
      difficulty: gameData.difficulty,
      timePerQuestion: gameData.time_per_question
    }));
    setCurrentScreen("challenge-quiz");
  };
  
  const handleWaitingRoomStart = (players: {id: string; name: string; isHost: boolean}[]) => {
    setGamePlayers(players);
    setCurrentScreen("challenge-quiz");
  };

  const goToFriendsList = () => {
    setCurrentScreen("friends-list");
  };

  const goToChallengeSetup = (friends: Friend[]) => {
    setSelectedFriends(friends);
    setCurrentScreen("challenge-setup");
  };

  const startChallenge = (subject: Subject, _questionCount: number, _difficulty: Difficulty) => {
    setSelectedSubject(subject);
    // يمكن استخدام difficulty لفلترة الأسئلة لاحقاً
    setCurrentScreen("challenge-quiz");
  };

  const handleQuizComplete = (score: number, correctAnswers: number, totalQuestions: number) => {
    setQuizResult({ score, correct: correctAnswers, total: totalQuestions });
    // Add points to total
    setTotalPoints(prev => prev + score);
    setCurrentScreen("quiz-result");
  };

  const handleNameChange = (name: string) => {
    setUserName(name);
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <WelcomeScreen
            onSoloChallenge={() => goToSubjectSelection(false)}
            onFriendsChallenge={goToGameModeSelection}
            userName={userName}
            totalPoints={totalPoints}
            onNameChange={handleNameChange}
          />
        );

      case "game-mode-selection":
        return (
          <GameModeSelection
            onCreateGame={goToCreateGame}
            onJoinGame={goToJoinGame}
            onBack={goToWelcome}
          />
        );

      case "create-game":
        return (
          <CreateGame
            onBack={goToGameModeSelection}
            onStartGame={handleCreateGameStart}
          />
        );

      case "join-game":
        return (
          <JoinGame
            onBack={goToGameModeSelection}
            onJoinSuccess={handleJoinSuccess}
          />
        );

      case "subject-selection":
        return (
          <SubjectSelection
            onSelectSubject={goToQuiz}
            onBack={goToWelcome}
            title={isChallenge ? "اختر مادة التحدي" : "اختر المادة"}
          />
        );

      case "solo-setup":
        return selectedSubject ? (
          <SoloSetup
            subject={selectedSubject}
            onBack={() => setCurrentScreen("subject-selection")}
            onStart={handleSoloStart}
          />
        ) : null;

      case "quiz":
        return selectedSubject ? (
          <QuizPage 
            key={quizKey}
            subject={selectedSubject} 
            questionCount={soloQuestionCount}
            difficulty={soloDifficulty}
            timePerQuestion={soloTimePerQuestion}
            onComplete={handleQuizComplete} 
            onExit={goToWelcome} 
          />
        ) : null;

      case "waiting-room":
        return gameSettings.subject ? (
          <WaitingRoom
            gameCode={gameSettings.code}
            subject={gameSettings.subject}
            questionCount={gameSettings.questionCount}
            maxPlayers={gameSettings.maxPlayers}
            isHost={gameSettings.isHost}
            hostName={userName || 'مضيف'}
            difficulty={gameSettings.difficulty}
            timePerQuestion={gameSettings.timePerQuestion}
            onBack={goToGameModeSelection}
            onStartGame={handleWaitingRoomStart}
          />
        ) : null;

      case "join-waiting-room":
        return (
          <JoinWaitingRoom
            gameCode={gameSettings.code}
            playerName={userName || 'لاعب'}
            onBack={goToGameModeSelection}
            onGameStart={handleJoinGameStart}
          />
        );

      case "challenge-quiz":
        return selectedSubject ? (
          <MultiplayerQuiz
            key={quizKey}
            subject={selectedSubject}
            selectedFriends={selectedFriends}
            questionCount={gameSettings.questionCount}
            maxPlayers={gameSettings.maxPlayers}
            difficulty={gameSettings.difficulty}
            timePerQuestion={gameSettings.timePerQuestion}
            gamePlayers={gamePlayers}
            onComplete={handleQuizComplete}
            onExit={goToWelcome}
          />
        ) : null;

      case "quiz-result":
        return selectedSubject ? (
          <QuizResult
            score={quizResult.score}
            correctAnswers={quizResult.correct}
            totalQuestions={quizResult.total}
            subject={selectedSubject}
            onRetry={() => {
              setQuizKey(prev => prev + 1);
              setCurrentScreen(isChallenge ? "challenge-quiz" : "quiz");
            }}
            onSelectSubject={() => goToSubjectSelection(isChallenge)}
            onHome={goToWelcome}
          />
        ) : null;

      case "friends-list":
        return <FriendsList onBack={goToWelcome} onCreateChallenge={goToChallengeSetup} />;

      case "challenge-setup":
        return (
          <ChallengeSetup
            selectedFriends={selectedFriends}
            onBack={goToFriendsList}
            onStartChallenge={startChallenge}
          />
        );

      default:
        return (
          <WelcomeScreen
            onSoloChallenge={() => goToSubjectSelection(false)}
            onFriendsChallenge={goToGameModeSelection}
            userName={userName}
            totalPoints={totalPoints}
            onNameChange={handleNameChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] font-cairo flex items-center justify-center p-4">
      {/* Android Phone Frame */}
      <div className="w-full max-w-[380px] h-[780px] bg-[#1a1a1a] rounded-[3rem] p-2 shadow-2xl border-4 border-[#333] relative overflow-hidden">
        {/* Inner screen */}
        <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <AndroidStatusBar />

          {/* App Content */}
          <div className="flex-1 overflow-auto">{renderScreen()}</div>

          {/* Android Navigation Bar */}
          <div className="bg-[#1a1a1a] h-1 flex items-center justify-center pb-2 pt-1">
            <div className="w-32 h-1 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
