export type Screen = 
  | 'welcome' 
  | 'subject-selection' 
  | 'quiz' 
  | 'quiz-result' 
  | 'friends-list' 
  | 'challenge-setup' 
  | 'challenge-quiz'
  | 'leaderboard'
  | 'profile'
  | 'game-mode-selection'
  | 'create-game'
  | 'join-game'
  | 'waiting-room';

export type GameMode = 'create' | 'join';

export interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
}

export interface Friend extends User {
  isOnline?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  questionsCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: (number | null)[];
  isComplete: boolean;
}

export interface ChallengeSetup {
  subject: Subject | null;
  questionCount: number;
  selectedFriends: Friend[];
}

export interface GameSession {
  code: string;
  subject: Subject | null;
  questionCount: number;
  maxPlayers: number;
  hostId: string;
  players: User[];
  status: 'waiting' | 'playing' | 'finished';
}
