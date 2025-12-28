import { useState, useEffect } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { SubjectSelection } from "@/components/SubjectSelection";
import { QuizPage } from "@/components/QuizPage";
import { MultiplayerQuiz } from "@/components/MultiplayerQuiz";
import { QuizResult } from "@/components/QuizResult";
import { FriendsList } from "@/components/FriendsList";
import { ChallengeSetup } from "@/components/ChallengeSetup";
import { GameModeSelection } from "@/components/GameModeSelection";
import { CreateGame } from "@/components/CreateGame";
import { JoinGame } from "@/components/JoinGame";
import { AndroidStatusBar } from "@/components/AndroidStatusBar";
import { Screen, Subject, Friend } from "@/types/app";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [quizResult, setQuizResult] = useState({ score: 0, correct: 0, total: 0 });
  const [isChallenge, setIsChallenge] = useState(false);
  
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
    setIsChallenge(forChallenge);
    setCurrentScreen("subject-selection");
  };

  const goToQuiz = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen(isChallenge ? "challenge-quiz" : "quiz");
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

  const handleCreateGameStart = (subject: Subject, questionCount: number) => {
    setSelectedSubject(subject);
    setIsChallenge(true);
    setSelectedFriends([]);
    setCurrentScreen("challenge-quiz");
  };

  const handleJoinSuccess = (code: string) => {
    setIsChallenge(true);
    setSelectedFriends([]);
    setCurrentScreen("subject-selection");
  };

  const goToFriendsList = () => {
    setCurrentScreen("friends-list");
  };

  const goToChallengeSetup = (friends: Friend[]) => {
    setSelectedFriends(friends);
    setCurrentScreen("challenge-setup");
  };

  const startChallenge = (subject: Subject, _questionCount: number) => {
    setSelectedSubject(subject);
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

      case "quiz":
        return selectedSubject ? (
          <QuizPage subject={selectedSubject} onComplete={handleQuizComplete} onExit={goToWelcome} />
        ) : null;

      case "challenge-quiz":
        return selectedSubject ? (
          <MultiplayerQuiz
            subject={selectedSubject}
            selectedFriends={selectedFriends}
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
            onRetry={() => setCurrentScreen("quiz")}
            onSelectSubject={() => goToSubjectSelection(false)}
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
