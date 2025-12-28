import { User, Friend, Subject, Question } from '@/types/app';

export const currentUser: User = {
  id: '1',
  name: 'يوسف',
  avatar: 'user',
  points: 120,
};

export const friends: Friend[] = [
  { id: '2', name: 'أحمد', avatar: 'user', points: 150, isOnline: true },
  { id: '3', name: 'صالح', avatar: 'user', points: 95, isOnline: true },
  { id: '4', name: 'خالد', avatar: 'user', points: 60, isOnline: false },
];

export const subjects: Subject[] = [
  { id: 'math', name: 'رياضيات', icon: 'calculator', color: 'primary', questionsCount: 50 },
  { id: 'physics', name: 'فيزياء', icon: 'atom', color: 'secondary', questionsCount: 40 },
  { id: 'chemistry', name: 'كيمياء', icon: 'flask', color: 'accent', questionsCount: 35 },
  { id: 'biology', name: 'أحياء', icon: 'leaf', color: 'success', questionsCount: 45 },
  { id: 'arabic', name: 'لغة عربية', icon: 'book', color: 'arabic', questionsCount: 60 },
  { id: 'english', name: 'إنجليزي', icon: 'languages', color: 'warning', questionsCount: 55 },
];

// أسئلة مستوى الأول الثانوي
export const sampleQuestions: Record<string, Question[]> = {
  math: [
    { id: 'm1', text: 'ما قيمة س إذا كان: 2س + 5 = 15 ؟', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
    { id: 'm2', text: 'ما ناتج تحليل: س² - 9 ؟', options: ['(س-3)(س-3)', '(س+3)(س-3)', '(س+3)(س+3)', '(س-9)(س+1)'], correctAnswer: 1, points: 10 },
    { id: 'm3', text: 'إذا كان ظا(45°) = 1، فما قيمة ظا(135°)؟', options: ['1', '-1', '0', 'غير معرف'], correctAnswer: 1, points: 10 },
    { id: 'm4', text: 'ما مجال الدالة د(س) = √(س - 4) ؟', options: ['س ≥ 4', 'س > 4', 'س ≤ 4', 'جميع الأعداد الحقيقية'], correctAnswer: 0, points: 10 },
    { id: 'm5', text: 'ما ميل المستقيم المار بالنقطتين (2,3) و (4,7)؟', options: ['1', '2', '3', '4'], correctAnswer: 1, points: 10 },
    { id: 'm6', text: 'إذا كان جا(أ) = 3/5، فما قيمة جتا(أ)؟', options: ['4/5', '3/4', '5/3', '5/4'], correctAnswer: 0, points: 10 },
    { id: 'm7', text: 'ما قيمة: لو₂(8) ؟', options: ['2', '3', '4', '8'], correctAnswer: 1, points: 10 },
    { id: 'm8', text: 'ما المعادلة التربيعية التي جذراها 2 و -3 ؟', options: ['س²+س-6=0', 'س²-س-6=0', 'س²+س+6=0', 'س²-5س-6=0'], correctAnswer: 0, points: 10 },
    { id: 'm9', text: 'ما قيمة المميز للمعادلة: س² - 4س + 4 = 0 ؟', options: ['0', '4', '8', '16'], correctAnswer: 0, points: 10 },
    { id: 'm10', text: 'إذا كانت ن(أ∪ب) = 20، ن(أ) = 12، ن(ب) = 15، فما ن(أ∩ب)؟', options: ['5', '7', '8', '3'], correctAnswer: 1, points: 10 },
  ],
  physics: [
    { id: 'p1', text: 'جسم يتحرك بسرعة منتظمة 20 م/ث لمدة 5 ث، ما المسافة المقطوعة؟', options: ['50 م', '100 م', '25 م', '4 م'], correctAnswer: 1, points: 10 },
    { id: 'p2', text: 'ما تسارع جسم كتلته 5 كجم تؤثر عليه قوة 20 نيوتن؟', options: ['2 م/ث²', '4 م/ث²', '10 م/ث²', '100 م/ث²'], correctAnswer: 1, points: 10 },
    { id: 'p3', text: 'ما طاقة الوضع لجسم كتلته 2 كجم على ارتفاع 10 م؟ (ع=10 م/ث²)', options: ['20 جول', '200 جول', '2000 جول', '100 جول'], correctAnswer: 1, points: 10 },
    { id: 'p4', text: 'ما القانون الثاني لنيوتن؟', options: ['ق = ك × ع', 'ق = ك × ت', 'ق = ك × س', 'ق = ك × ز'], correctAnswer: 1, points: 10 },
    { id: 'p5', text: 'سيارة تتحرك بسرعة 0 وتصل إلى 20 م/ث خلال 4 ث، ما تسارعها؟', options: ['5 م/ث²', '4 م/ث²', '80 م/ث²', '10 م/ث²'], correctAnswer: 0, points: 10 },
    { id: 'p6', text: 'ما وحدة قياس الشغل في النظام الدولي؟', options: ['نيوتن', 'جول', 'واط', 'باسكال'], correctAnswer: 1, points: 10 },
    { id: 'p7', text: 'ما القوة المحصلة لقوتين متعامدتين 3 نيوتن و 4 نيوتن؟', options: ['7 نيوتن', '1 نيوتن', '5 نيوتن', '12 نيوتن'], correctAnswer: 2, points: 10 },
    { id: 'p8', text: 'ما نوع الطاقة المختزنة في الزنبرك المضغوط؟', options: ['طاقة حركية', 'طاقة وضع مرونية', 'طاقة حرارية', 'طاقة كهربائية'], correctAnswer: 1, points: 10 },
    { id: 'p9', text: 'إذا تضاعفت سرعة جسم، فإن طاقته الحركية تصبح:', options: ['ضعفين', 'ثلاثة أضعاف', 'أربعة أضعاف', 'نصف'], correctAnswer: 2, points: 10 },
    { id: 'p10', text: 'ما العلاقة بين القدرة والشغل والزمن؟', options: ['القدرة = الشغل × الزمن', 'القدرة = الشغل ÷ الزمن', 'القدرة = الزمن ÷ الشغل', 'القدرة = الشغل + الزمن'], correctAnswer: 1, points: 10 },
  ],
  chemistry: [
    { id: 'c1', text: 'ما عدد إلكترونات مستوى التكافؤ في ذرة الكربون؟', options: ['2', '4', '6', '8'], correctAnswer: 1, points: 10 },
    { id: 'c2', text: 'ما نوع الرابطة في جزيء كلوريد الصوديوم NaCl؟', options: ['تساهمية', 'أيونية', 'فلزية', 'هيدروجينية'], correctAnswer: 1, points: 10 },
    { id: 'c3', text: 'أي العناصر التالية من اللافلزات؟', options: ['الصوديوم', 'الحديد', 'الكلور', 'النحاس'], correctAnswer: 2, points: 10 },
    { id: 'c4', text: 'ما عدد البروتونات في نواة ذرة الأكسجين (العدد الذري = 8)؟', options: ['6', '8', '16', '2'], correctAnswer: 1, points: 10 },
    { id: 'c5', text: 'ما الصيغة الكيميائية لحمض الكبريتيك؟', options: ['HCl', 'H₂SO₄', 'HNO₃', 'H₃PO₄'], correctAnswer: 1, points: 10 },
    { id: 'c6', text: 'أي التفاعلات التالية تفاعل أكسدة؟', options: ['فقد إلكترونات', 'اكتساب إلكترونات', 'فقد بروتونات', 'اكتساب نيوترونات'], correctAnswer: 0, points: 10 },
    { id: 'c7', text: 'ما الكتلة المولية للماء H₂O؟', options: ['16 جم/مول', '18 جم/مول', '20 جم/مول', '2 جم/مول'], correctAnswer: 1, points: 10 },
    { id: 'c8', text: 'كم عدد المولات في 44 جم من CO₂؟ (الكتلة المولية = 44 جم/مول)', options: ['0.5 مول', '1 مول', '2 مول', '44 مول'], correctAnswer: 1, points: 10 },
    { id: 'c9', text: 'ما اسم المجموعة الأولى في الجدول الدوري؟', options: ['الهالوجينات', 'الفلزات القلوية', 'الغازات النبيلة', 'الفلزات القلوية الأرضية'], correctAnswer: 1, points: 10 },
    { id: 'c10', text: 'ما الذي يحدد الخواص الكيميائية للعنصر؟', options: ['عدد النيوترونات', 'عدد إلكترونات التكافؤ', 'الكتلة الذرية', 'عدد المستويات'], correctAnswer: 1, points: 10 },
  ],
  biology: [
    { id: 'b1', text: 'أي العضيات مسؤولة عن عملية البناء الضوئي؟', options: ['الميتوكوندريا', 'البلاستيدات الخضراء', 'الريبوسومات', 'جهاز جولجي'], correctAnswer: 1, points: 10 },
    { id: 'b2', text: 'ما ناتج الانقسام المتساوي لخلية تحتوي 46 كروموسوم؟', options: ['خليتين بـ 23 كروموسوم', 'خليتين بـ 46 كروموسوم', '4 خلايا بـ 23 كروموسوم', 'خلية بـ 92 كروموسوم'], correctAnswer: 1, points: 10 },
    { id: 'b3', text: 'ما المادة الوراثية في الخلية؟', options: ['البروتين', 'الكربوهيدرات', 'DNA', 'الدهون'], correctAnswer: 2, points: 10 },
    { id: 'b4', text: 'أين تحدث عملية التنفس الخلوي؟', options: ['النواة', 'الميتوكوندريا', 'البلاستيدات', 'الريبوسومات'], correctAnswer: 1, points: 10 },
    { id: 'b5', text: 'ما الإنزيم المسؤول عن هضم النشا؟', options: ['البيبسين', 'الأميليز', 'الليبيز', 'التربسين'], correctAnswer: 1, points: 10 },
    { id: 'b6', text: 'ما وظيفة الريبوسومات؟', options: ['إنتاج الطاقة', 'تصنيع البروتين', 'الهضم الخلوي', 'تخزين الماء'], correctAnswer: 1, points: 10 },
    { id: 'b7', text: 'أي نوع من الانقسام ينتج الخلايا الجنسية؟', options: ['الانقسام المتساوي', 'الانقسام المنصف', 'الانقسام الثنائي', 'التبرعم'], correctAnswer: 1, points: 10 },
    { id: 'b8', text: 'ما الغاز الناتج من عملية البناء الضوئي؟', options: ['ثاني أكسيد الكربون', 'النيتروجين', 'الأكسجين', 'الهيدروجين'], correctAnswer: 2, points: 10 },
    { id: 'b9', text: 'ما عدد الخلايا الناتجة من الانقسام المنصف؟', options: ['2', '3', '4', '8'], correctAnswer: 2, points: 10 },
    { id: 'b10', text: 'ما الطبقة الخارجية للخلية النباتية؟', options: ['الغشاء البلازمي', 'الجدار الخلوي', 'السيتوبلازم', 'النواة'], correctAnswer: 1, points: 10 },
  ],
  arabic: [
    { id: 'a1', text: 'ما إعراب "الكتابَ" في: قرأتُ الكتابَ؟', options: ['فاعل', 'مفعول به منصوب', 'مبتدأ', 'خبر'], correctAnswer: 1, points: 10 },
    { id: 'a2', text: 'ما نوع الخبر في: العلمُ نورٌ؟', options: ['مفرد', 'جملة فعلية', 'جملة اسمية', 'شبه جملة'], correctAnswer: 0, points: 10 },
    { id: 'a3', text: 'ما علامة جزم الفعل المضارع المعتل الآخر؟', options: ['السكون', 'حذف حرف العلة', 'الفتحة', 'الكسرة'], correctAnswer: 1, points: 10 },
    { id: 'a4', text: 'ما نوع كان في: كان الطقسُ جميلاً؟', options: ['تامة', 'ناقصة', 'زائدة', 'شرطية'], correctAnswer: 1, points: 10 },
    { id: 'a5', text: 'أي الجمل التالية تحتوي على تمييز؟', options: ['اشتريتُ كيلو تفاحاً', 'الطالبُ مجتهدٌ', 'ذهبتُ إلى المدرسةِ', 'الكتابُ مفيدٌ'], correctAnswer: 0, points: 10 },
    { id: 'a6', text: 'ما نوع الاستثناء في: حضر الطلابُ إلا محمداً؟', options: ['استثناء تام موجب', 'استثناء تام منفي', 'استثناء ناقص', 'استثناء مفرغ'], correctAnswer: 0, points: 10 },
    { id: 'a7', text: 'ما إعراب "مجتهداً" في: كان الطالبُ مجتهداً؟', options: ['خبر كان منصوب', 'حال', 'مفعول به', 'نعت'], correctAnswer: 0, points: 10 },
    { id: 'a8', text: 'ما نوع الأسلوب في: لا تؤجل عمل اليوم؟', options: ['أمر', 'نهي', 'استفهام', 'تعجب'], correctAnswer: 1, points: 10 },
    { id: 'a9', text: 'ما الأداة التي تنصب المفعول معه؟', options: ['مع', 'الواو', 'ثم', 'أو'], correctAnswer: 1, points: 10 },
    { id: 'a10', text: 'ما نوع المنادى في: يا طالبُ؟', options: ['مضاف', 'شبيه بالمضاف', 'نكرة مقصودة', 'نكرة غير مقصودة'], correctAnswer: 2, points: 10 },
  ],
  english: [
    { id: 'e1', text: 'Choose the correct tense: "She ___ studying when I called."', options: ['is', 'was', 'were', 'has been'], correctAnswer: 1, points: 10 },
    { id: 'e2', text: 'What is the passive form of: "They build houses"?', options: ['Houses are built', 'Houses were built', 'Houses is built', 'Houses been built'], correctAnswer: 0, points: 10 },
    { id: 'e3', text: 'Choose the correct conditional: "If I ___ rich, I would travel."', options: ['am', 'was', 'were', 'be'], correctAnswer: 2, points: 10 },
    { id: 'e4', text: 'What is the reported speech of: "I am happy"?', options: ['He said he is happy', 'He said he was happy', 'He said I am happy', 'He said I was happy'], correctAnswer: 1, points: 10 },
    { id: 'e5', text: 'Choose the correct relative pronoun: "The book ___ I read was interesting."', options: ['who', 'which', 'whose', 'whom'], correctAnswer: 1, points: 10 },
    { id: 'e6', text: 'What is the correct form: "She suggested ___ early."', options: ['leave', 'to leave', 'leaving', 'left'], correctAnswer: 2, points: 10 },
    { id: 'e7', text: 'Choose the correct article: "___ Nile is the longest river."', options: ['A', 'An', 'The', 'No article'], correctAnswer: 2, points: 10 },
    { id: 'e8', text: 'What is the past participle of "write"?', options: ['wrote', 'written', 'writing', 'writed'], correctAnswer: 1, points: 10 },
    { id: 'e9', text: 'Choose the correct preposition: "He is interested ___ science."', options: ['on', 'at', 'in', 'for'], correctAnswer: 2, points: 10 },
    { id: 'e10', text: 'What type of clause is: "because he was tired"?', options: ['Main clause', 'Adverbial clause', 'Noun clause', 'Relative clause'], correctAnswer: 1, points: 10 },
  ],
};

export const leaderboardData = [
  { ...friends[0], rank: 1 },
  { ...currentUser, rank: 2 },
  { ...friends[1], rank: 3 },
  { ...friends[2], rank: 4 },
];
