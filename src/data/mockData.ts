import { User, Friend, Subject, Question } from '@/types/app';

export const currentUser: User = {
  id: '1',
  name: 'يوسف',
  avatar: '👨‍🎓',
  points: 120,
};

export const friends: Friend[] = [
  { id: '2', name: 'أحمد', avatar: '👦', points: 150, isOnline: true },
  { id: '3', name: 'صالح', avatar: '🧑', points: 95, isOnline: true },
  { id: '4', name: 'خالد', avatar: '👨', points: 60, isOnline: false },
];

export const subjects: Subject[] = [
  { id: 'math', name: 'رياضيات', icon: '📐', color: 'primary', questionsCount: 50 },
  { id: 'physics', name: 'فيزياء', icon: '⚡', color: 'secondary', questionsCount: 40 },
  { id: 'chemistry', name: 'كيمياء', icon: '🧪', color: 'accent', questionsCount: 35 },
  { id: 'biology', name: 'أحياء', icon: '🌿', color: 'success', questionsCount: 45 },
  { id: 'arabic', name: 'لغة عربية', icon: '📖', color: 'warning', questionsCount: 60 },
  { id: 'english', name: 'إنجليزي', icon: '🔤', color: 'primary', questionsCount: 55 },
];

export const sampleQuestions: Record<string, Question[]> = {
  math: [
    { id: 'm1', text: 'ما ناتج 2 + 5 ؟', options: ['5', '6', '7', '8'], correctAnswer: 2, points: 10 },
    { id: 'm2', text: 'ما ناتج 8 × 7 ؟', options: ['54', '56', '58', '64'], correctAnswer: 1, points: 10 },
    { id: 'm3', text: 'ما الجذر التربيعي للعدد 81 ؟', options: ['7', '8', '9', '10'], correctAnswer: 2, points: 10 },
    { id: 'm4', text: 'ما ناتج 15 ÷ 3 ؟', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
    { id: 'm5', text: 'ما قيمة س إذا كان: س + 7 = 12 ؟', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
  ],
  physics: [
    { id: 'p1', text: 'ما وحدة قياس القوة؟', options: ['جول', 'نيوتن', 'واط', 'أمبير'], correctAnswer: 1, points: 10 },
    { id: 'p2', text: 'ما سرعة الضوء تقريباً؟', options: ['300 كم/ث', '300,000 كم/ث', '30,000 كم/ث', '3,000 كم/ث'], correctAnswer: 1, points: 10 },
    { id: 'p3', text: 'ما القانون الأول لنيوتن؟', options: ['قانون القصور الذاتي', 'قانون التسارع', 'قانون الفعل ورد الفعل', 'قانون الجاذبية'], correctAnswer: 0, points: 10 },
    { id: 'p4', text: 'ما وحدة قياس الطاقة؟', options: ['نيوتن', 'جول', 'واط', 'فولت'], correctAnswer: 1, points: 10 },
    { id: 'p5', text: 'ما نوع الشحنة الكهربائية للإلكترون؟', options: ['موجبة', 'سالبة', 'متعادلة', 'لا يوجد'], correctAnswer: 1, points: 10 },
  ],
  chemistry: [
    { id: 'c1', text: 'ما الرمز الكيميائي للماء؟', options: ['H2O', 'CO2', 'O2', 'H2'], correctAnswer: 0, points: 10 },
    { id: 'c2', text: 'ما العدد الذري للكربون؟', options: ['4', '6', '8', '12'], correctAnswer: 1, points: 10 },
    { id: 'c3', text: 'ما الغاز الأكثر وفرة في الغلاف الجوي؟', options: ['الأكسجين', 'ثاني أكسيد الكربون', 'النيتروجين', 'الهيدروجين'], correctAnswer: 2, points: 10 },
    { id: 'c4', text: 'ما الرقم الهيدروجيني للماء النقي؟', options: ['5', '6', '7', '8'], correctAnswer: 2, points: 10 },
    { id: 'c5', text: 'ما نوع الرابطة في جزيء الماء؟', options: ['أيونية', 'تساهمية', 'فلزية', 'هيدروجينية'], correctAnswer: 1, points: 10 },
  ],
  biology: [
    { id: 'b1', text: 'ما العضية المسؤولة عن إنتاج الطاقة في الخلية؟', options: ['النواة', 'الميتوكوندريا', 'الريبوسوم', 'جهاز جولجي'], correctAnswer: 1, points: 10 },
    { id: 'b2', text: 'ما عدد كروموسومات الإنسان؟', options: ['23', '46', '44', '48'], correctAnswer: 1, points: 10 },
    { id: 'b3', text: 'ما الوحدة الأساسية للكائنات الحية؟', options: ['الذرة', 'الجزيء', 'الخلية', 'النسيج'], correctAnswer: 2, points: 10 },
    { id: 'b4', text: 'ما العملية التي تحول النباتات بها الضوء إلى طاقة؟', options: ['التنفس', 'البناء الضوئي', 'الهضم', 'الإخراج'], correctAnswer: 1, points: 10 },
    { id: 'b5', text: 'ما الحمض النووي الذي يحمل المعلومات الوراثية؟', options: ['RNA', 'DNA', 'ATP', 'ADP'], correctAnswer: 1, points: 10 },
  ],
  arabic: [
    { id: 'a1', text: 'ما إعراب كلمة "الطالبُ" في: جاء الطالبُ؟', options: ['مبتدأ مرفوع', 'فاعل مرفوع', 'خبر مرفوع', 'مفعول به'], correctAnswer: 1, points: 10 },
    { id: 'a2', text: 'ما جمع كلمة "كتاب"؟', options: ['كتابات', 'كُتُب', 'كتابون', 'أكتاب'], correctAnswer: 1, points: 10 },
    { id: 'a3', text: 'ما نوع الفعل "يدرس"؟', options: ['ماضٍ', 'مضارع', 'أمر', 'لازم'], correctAnswer: 1, points: 10 },
    { id: 'a4', text: 'ما علامة نصب جمع المؤنث السالم؟', options: ['الفتحة', 'الكسرة', 'الضمة', 'السكون'], correctAnswer: 1, points: 10 },
    { id: 'a5', text: 'ما مرادف كلمة "الجليل"؟', options: ['الصغير', 'العظيم', 'السريع', 'البطيء'], correctAnswer: 1, points: 10 },
  ],
  english: [
    { id: 'e1', text: 'What is the past tense of "go"?', options: ['goed', 'went', 'gone', 'going'], correctAnswer: 1, points: 10 },
    { id: 'e2', text: 'Choose the correct: "She ___ to school every day"', options: ['go', 'goes', 'going', 'went'], correctAnswer: 1, points: 10 },
    { id: 'e3', text: 'What is the plural of "child"?', options: ['childs', 'childes', 'children', 'child'], correctAnswer: 2, points: 10 },
    { id: 'e4', text: 'Which is a noun?', options: ['beautiful', 'quickly', 'happiness', 'run'], correctAnswer: 2, points: 10 },
    { id: 'e5', text: 'What does "enormous" mean?', options: ['tiny', 'huge', 'fast', 'slow'], correctAnswer: 1, points: 10 },
  ],
};

export const leaderboardData = [
  { ...friends[0], rank: 1 },
  { ...currentUser, rank: 2 },
  { ...friends[1], rank: 3 },
  { ...friends[2], rank: 4 },
];
