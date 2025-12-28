import { Question } from '@/types/app';

// توليد كود عشوائي من 4 أرقام
export function generateGameCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// خلط مصفوفة عشوائياً باستخدام Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// خلط الأسئلة مع خياراتها وتتبع الإجابة الصحيحة
export function shuffleQuestions(questions: Question[]): Question[] {
  // خلط ترتيب الأسئلة
  const shuffledQuestions = shuffleArray(questions);
  
  // خلط خيارات كل سؤال مع تتبع الإجابة الصحيحة
  return shuffledQuestions.map(question => {
    const correctAnswerText = question.options[question.correctAnswer];
    const shuffledOptions = shuffleArray(question.options);
    const newCorrectAnswer = shuffledOptions.indexOf(correctAnswerText);
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer,
    };
  });
}

// التحقق من صحة كود اللعبة
export function isValidGameCode(code: string): boolean {
  return /^\d{4}$/.test(code);
}
