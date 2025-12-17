import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { SubjectSelection } from '@/components/SubjectSelection';
import { QuizPage } from '@/components/QuizPage';
import { MultiplayerQuiz } from '@/components/MultiplayerQuiz';
import { QuizResult } from '@/components/QuizResult';
import { FriendsList } from '@/components/FriendsList';
import { ChallengeSetup } from '@/components/ChallengeSetup';
import { Leaderboard } from '@/components/Leaderboard';
import { ProfilePage } from '@/components/ProfilePage';
import { AndroidStatusBar } from '@/components/AndroidStatusBar';
import { Screen, Subject, Friend } from '@/types/app';
import { friends } from '@/data/mockData';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [quizResult, setQuizResult] = useState({ score: 0, correct: 0, total: 0 });
  const [isChallenge, setIsChallenge] = useState(false);

  // Navigation handlers
  const goToWelcome = () => {
    setCurrentScreen('welcome');
    setSelectedSubject(null);
    setSelectedFriends([]);
    setIsChallenge(false);
  };

  const goToSubjectSelection = (forChallenge = false) => {
    setIsChallenge(forChallenge);
    setCurrentScreen('subject-selection');
  };

  const goToQuiz = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen(isChallenge ? 'challenge-quiz' : 'quiz');
  };

  const goToFriendsList = () => {
    setCurrentScreen('friends-list');
  };

  const goToChallengeSetup = (friends: Friend[]) => {
    setSelectedFriends(friends);
    setCurrentScreen('challenge-setup');
  };

  const startChallenge = (subject: Subject, _questionCount: number) => {
    setSelectedSubject(subject);
    setCurrentScreen('challenge-quiz');
  };

  const handleQuizComplete = (score: number, correctAnswers: number, totalQuestions: number) => {
    setQuizResult({ score, correct: correctAnswers, total: totalQuestions });
    if (isChallenge) {
      setCurrentScreen('leaderboard');
    } else {
      setCurrentScreen('quiz-result');
    }
  };

  const goToProfile = () => {
    setCurrentScreen('profile');
  };

  const goToLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onSoloChallenge={() => goToSubjectSelection(false)}
            onFriendsChallenge={goToFriendsList}
            onProfile={goToProfile}
            onLeaderboard={goToLeaderboard}
          />
        );

      case 'subject-selection':
        return (
          <SubjectSelection
            onSelectSubject={goToQuiz}
            onBack={goToWelcome}
            title={isChallenge ? 'اختر مادة التحدي' : 'اختر المادة'}
          />
        );

      case 'quiz':
        return selectedSubject ? (
          <QuizPage
            subject={selectedSubject}
            onComplete={handleQuizComplete}
            onExit={goToWelcome}
          />
        ) : null;

      case 'challenge-quiz':
        return selectedSubject ? (
          <MultiplayerQuiz
            subject={selectedSubject}
            selectedFriends={selectedFriends.length > 0 ? selectedFriends : friends.slice(0, 2)}
            onComplete={handleQuizComplete}
            onExit={goToWelcome}
          />
        ) : null;

      case 'quiz-result':
        return selectedSubject ? (
          <QuizResult
            score={quizResult.score}
            correctAnswers={quizResult.correct}
            totalQuestions={quizResult.total}
            subject={selectedSubject}
            onRetry={() => setCurrentScreen('quiz')}
            onSelectSubject={() => goToSubjectSelection(false)}
            onHome={goToWelcome}
          />
        ) : null;

      case 'friends-list':
        return (
          <FriendsList
            onBack={goToWelcome}
            onCreateChallenge={goToChallengeSetup}
          />
        );

      case 'challenge-setup':
        return (
          <ChallengeSetup
            selectedFriends={selectedFriends}
            onBack={goToFriendsList}
            onStartChallenge={startChallenge}
          />
        );

      case 'leaderboard':
        return (
          <Leaderboard
            userScore={quizResult.score || 160}
            onNewChallenge={goToFriendsList}
            onHome={goToWelcome}
          />
        );

      case 'profile':
        return (
          <ProfilePage
            onBack={goToWelcome}
          />
        );

      default:
        return <WelcomeScreen onSoloChallenge={() => goToSubjectSelection(false)} onFriendsChallenge={goToFriendsList} onProfile={goToProfile} onLeaderboard={goToLeaderboard} />;
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
          <div className="flex-1 overflow-auto">
            {renderScreen()}
          </div>
          
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
