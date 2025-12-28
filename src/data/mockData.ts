import { Subject, Question, Difficulty } from '@/types/app';

export const subjects: Subject[] = [
  { id: 'math', name: 'رياضيات', icon: 'calculator', color: 'primary', questionsCount: 50 },
  { id: 'physics', name: 'فيزياء', icon: 'atom', color: 'secondary', questionsCount: 40 },
  { id: 'chemistry', name: 'كيمياء', icon: 'flask', color: 'accent', questionsCount: 35 },
  { id: 'biology', name: 'أحياء', icon: 'leaf', color: 'success', questionsCount: 45 },
  { id: 'arabic', name: 'لغة عربية', icon: 'book', color: 'arabic', questionsCount: 60 },
  { id: 'english', name: 'إنجليزي', icon: 'languages', color: 'warning', questionsCount: 55 },
];

// أسئلة حسب مستوى الصعوبة
export const sampleQuestions: Record<string, Question[]> = {
  math: [
    // سهل
    { id: 'm1', text: 'ما ناتج: 5 + 7 ؟', options: ['10', '12', '13', '11'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'm2', text: 'ما ناتج: 8 × 3 ؟', options: ['21', '24', '27', '18'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'm3', text: 'ما قيمة: 100 ÷ 4 ؟', options: ['20', '25', '30', '15'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'm4', text: 'ما ناتج: 15 - 9 ؟', options: ['4', '5', '6', '7'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'm5', text: 'ما عدد أضلاع المربع؟', options: ['3', '4', '5', '6'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'm6', text: 'ما قيمة س إذا كان: 3س + 5 = 20 ؟', options: ['3', '5', '7', '15'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'm7', text: 'ما ناتج: (2³)² ؟', options: ['32', '64', '128', '16'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'm8', text: 'إذا كان محيط مربع 36 سم، فما طول ضلعه؟', options: ['6 سم', '9 سم', '12 سم', '18 سم'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'm9', text: 'ما قيمة: √144 + √81 ؟', options: ['21', '23', '25', '27'], correctAnswer: 0, points: 10, difficulty: 'medium' },
    { id: 'm10', text: 'إذا كان أ = 3، ب = 4، فما قيمة أ² + ب² ؟', options: ['7', '12', '25', '49'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'm11', text: 'ما الحد التالي في المتتالية: 2، 6، 18، 54، ... ؟', options: ['108', '162', '72', '216'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'm12', text: 'حل المعادلة: x² - 5x + 6 = 0', options: ['x=1, x=6', 'x=2, x=3', 'x=-2, x=-3', 'x=0, x=5'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'm13', text: 'ما قيمة: log₂(64) ؟', options: ['4', '5', '6', '8'], correctAnswer: 2, points: 15, difficulty: 'hard' },
    { id: 'm14', text: 'إذا كان sin(θ) = 0.5، فما قيمة θ؟', options: ['30°', '45°', '60°', '90°'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'm15', text: 'ما مساحة دائرة نصف قطرها 7 سم؟ (π = 22/7)', options: ['154 سم²', '44 سم²', '77 سم²', '308 سم²'], correctAnswer: 0, points: 15, difficulty: 'hard' },
  ],
  physics: [
    // سهل
    { id: 'p1', text: 'ما وحدة قياس الطول؟', options: ['كيلوجرام', 'متر', 'ثانية', 'أمبير'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'p2', text: 'ما الجهاز المستخدم لقياس درجة الحرارة؟', options: ['الباروميتر', 'الثرمومتر', 'الفولتميتر', 'الأميتر'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'p3', text: 'ما لون الضوء الذي ينكسر أكثر في المنشور؟', options: ['الأحمر', 'الأخضر', 'الأزرق', 'البنفسجي'], correctAnswer: 3, points: 5, difficulty: 'easy' },
    { id: 'p4', text: 'ما حالة الماء عند 100°C؟', options: ['صلبة', 'سائلة', 'غازية', 'بلازما'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'p5', text: 'ما نوع الطاقة في البطارية؟', options: ['حركية', 'حرارية', 'كيميائية', 'نووية'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'p6', text: 'إذا تحرك جسم بسرعة 20 م/ث لمدة 15 ثانية، فما المسافة المقطوعة؟', options: ['200 م', '300 م', '400 م', '35 م'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'p7', text: 'ما وحدة قياس القوة في النظام الدولي؟', options: ['جول', 'واط', 'نيوتن', 'باسكال'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'p8', text: 'جسم كتلته 10 كجم، ما وزنه على سطح الأرض؟ (جـ = 10 م/ث²)', options: ['10 نيوتن', '50 نيوتن', '100 نيوتن', '1000 نيوتن'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'p9', text: 'ما نوع الطاقة المختزنة في الزنبرك المضغوط؟', options: ['حركية', 'حرارية', 'وضع مرونية', 'كهربائية'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'p10', text: 'ما العلاقة بين التسارع والقوة حسب قانون نيوتن الثاني؟', options: ['عكسية', 'طردية', 'لا علاقة', 'تربيعية'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'p11', text: 'جسم يسقط من ارتفاع 80 م، كم يستغرق للوصول؟ (جـ=10)', options: ['2 ث', '4 ث', '6 ث', '8 ث'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'p12', text: 'ما تردد موجة طولها 2م وسرعتها 340 م/ث؟', options: ['170 Hz', '680 Hz', '85 Hz', '340 Hz'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'p13', text: 'إذا كانت القدرة 500W والزمن 2 دقيقة، فما الشغل؟', options: ['1000 J', '60000 J', '250 J', '30000 J'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'p14', text: 'ما طاقة فوتون تردده 5×10¹⁴ Hz؟ (h=6.6×10⁻³⁴)', options: ['3.3×10⁻¹⁹ J', '1.32×10⁻²⁰ J', '6.6×10⁻²⁰ J', '3.3×10⁻²⁰ J'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'p15', text: 'في دائرة كهربائية، المقاومة 5Ω والتيار 3A، ما الجهد؟', options: ['8 V', '15 V', '1.67 V', '2 V'], correctAnswer: 1, points: 15, difficulty: 'hard' },
  ],
  chemistry: [
    // سهل
    { id: 'c1', text: 'ما رمز عنصر الأكسجين؟', options: ['O', 'Ox', 'Ok', 'Os'], correctAnswer: 0, points: 5, difficulty: 'easy' },
    { id: 'c2', text: 'ما الصيغة الكيميائية للماء؟', options: ['HO', 'H₂O', 'H₂O₂', 'OH'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'c3', text: 'ما لون غاز الكلور؟', options: ['عديم اللون', 'أخضر مصفر', 'أزرق', 'بني'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'c4', text: 'أي مما يلي فلز؟', options: ['الكربون', 'الحديد', 'الكبريت', 'النيتروجين'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'c5', text: 'ما الغاز الذي نتنفسه؟', options: ['النيتروجين', 'الأكسجين', 'الهيدروجين', 'الأرجون'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'c6', text: 'ما عدد إلكترونات ذرة الكربون؟', options: ['4', '6', '8', '12'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'c7', text: 'ما نوع الرابطة في جزيء كلوريد الصوديوم NaCl؟', options: ['تساهمية', 'أيونية', 'فلزية', 'هيدروجينية'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'c8', text: 'ما الرقم الهيدروجيني pH للماء النقي؟', options: ['0', '7', '14', '1'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'c9', text: 'ما الغاز الناتج من تفاعل الحمض مع الفلز؟', options: ['أكسجين', 'هيدروجين', 'نيتروجين', 'كلور'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'c10', text: 'ما عدد الروابط التي يمكن للكربون تكوينها؟', options: ['2', '3', '4', '6'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'c11', text: 'ما التركيب الإلكتروني للصوديوم (Z=11)؟', options: ['2,8,1', '2,8,2', '2,9', '2,8,8,1'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'c12', text: 'في التفاعل: 2H₂ + O₂ → 2H₂O، كم مول H₂ يتفاعل مع 2 مول O₂؟', options: ['2', '4', '1', '8'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'c13', text: 'ما عدد مولات 36g من الماء؟ (M=18)', options: ['0.5', '1', '2', '4'], correctAnswer: 2, points: 15, difficulty: 'hard' },
    { id: 'c14', text: 'ما نوع التهجين في جزيء الميثان CH₄؟', options: ['sp', 'sp²', 'sp³', 'sp³d'], correctAnswer: 2, points: 15, difficulty: 'hard' },
    { id: 'c15', text: 'ما الجهد القياسي لخلية زنك-نحاس؟ (Zn=-0.76V, Cu=+0.34V)', options: ['+0.42 V', '+1.10 V', '-0.42 V', '-1.10 V'], correctAnswer: 1, points: 15, difficulty: 'hard' },
  ],
  biology: [
    // سهل
    { id: 'b1', text: 'ما أكبر عضو في جسم الإنسان؟', options: ['الكبد', 'القلب', 'الجلد', 'الرئة'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'b2', text: 'كم عدد أسنان الإنسان البالغ؟', options: ['28', '30', '32', '34'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'b3', text: 'ما العضو المسؤول عن ضخ الدم؟', options: ['الكبد', 'القلب', 'الكلى', 'الرئة'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'b4', text: 'أين يتم هضم الطعام بشكل رئيسي؟', options: ['الفم', 'المعدة', 'الأمعاء الدقيقة', 'القولون'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'b5', text: 'ما الغاز الذي تطلقه النباتات أثناء البناء الضوئي؟', options: ['CO₂', 'O₂', 'N₂', 'H₂'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'b6', text: 'ما العضية المسؤولة عن إنتاج الطاقة في الخلية؟', options: ['النواة', 'الريبوسومات', 'الميتوكوندريا', 'الجولجي'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'b7', text: 'ما الحمض النووي الذي يحمل المعلومات الوراثية؟', options: ['RNA', 'DNA', 'ATP', 'ADP'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'b8', text: 'كم عدد كروموسومات الإنسان الطبيعي؟', options: ['23', '44', '46', '48'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'b9', text: 'ما نوع التنفس الذي لا يحتاج أكسجين؟', options: ['الهوائي', 'اللاهوائي', 'الخلوي', 'الرئوي'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'b10', text: 'ما الهرمون المسؤول عن تنظيم السكر في الدم؟', options: ['الأدرينالين', 'الثيروكسين', 'الأنسولين', 'التستوستيرون'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'b11', text: 'ما مراحل دورة كربس؟', options: ['4', '6', '8', '10'], correctAnswer: 2, points: 15, difficulty: 'hard' },
    { id: 'b12', text: 'ما عدد جزيئات ATP الناتجة من التنفس الهوائي لجزيء جلوكوز؟', options: ['2', '36-38', '18', '4'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'b13', text: 'ما الإنزيم الذي يفك الحلزون المزدوج لـ DNA؟', options: ['DNA Polymerase', 'Helicase', 'Ligase', 'Primase'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'b14', text: 'في أي مرحلة من الانقسام المنصف يحدث العبور؟', options: ['الطور التمهيدي I', 'الطور الانفصالي I', 'الطور التمهيدي II', 'الطور النهائي II'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'b15', text: 'ما نسبة الفصل في قانون مندل الأول للهجين الأحادي؟', options: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correctAnswer: 1, points: 15, difficulty: 'hard' },
  ],
  arabic: [
    // سهل
    { id: 'a1', text: 'ما جمع كلمة "كتاب"؟', options: ['كتابات', 'كتب', 'كتّاب', 'مكاتب'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'a2', text: 'ما ضد كلمة "طويل"؟', options: ['كبير', 'صغير', 'قصير', 'عريض'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'a3', text: 'ما نوع الكلمة: "محمد"؟', options: ['فعل', 'اسم', 'حرف', 'ضمير'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'a4', text: 'كم عدد حروف الجر؟', options: ['10', '15', '20', '25'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'a5', text: 'ما مفرد كلمة "علماء"؟', options: ['علم', 'عالم', 'معلم', 'علوم'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'a6', text: 'ما إعراب كلمة "الطالبُ" في جملة "الطالبُ مجتهدٌ"؟', options: ['خبر مرفوع', 'مبتدأ مرفوع', 'فاعل مرفوع', 'نائب فاعل'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'a7', text: 'ما نوع الفعل "يكتب"؟', options: ['ماضي', 'مضارع', 'أمر', 'لازم'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'a8', text: 'ما علامة نصب جمع المؤنث السالم؟', options: ['الفتحة', 'الكسرة', 'الياء', 'الألف'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'a9', text: 'أي الجمل التالية تحتوي على فعل متعدٍ؟', options: ['نام الطفل', 'ذهب أحمد', 'كتب الطالب الدرس', 'جلس المعلم'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'a10', text: 'ما نوع المفعول في "سافرتُ صباحاً"؟', options: ['مفعول به', 'مفعول فيه', 'مفعول لأجله', 'مفعول معه'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'a11', text: 'ما إعراب "الكتابَ" في "إنَّ الكتابَ مفيدٌ"؟', options: ['مبتدأ', 'خبر إنّ', 'اسم إنّ منصوب', 'فاعل'], correctAnswer: 2, points: 15, difficulty: 'hard' },
    { id: 'a12', text: 'ما نوع الاستثناء في "حضر الطلاب إلا طالباً"؟', options: ['تام مثبت', 'تام منفي', 'ناقص منفي', 'مفرغ'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'a13', text: 'ما وزن كلمة "استغفار"؟', options: ['افتعال', 'استفعال', 'انفعال', 'تفاعل'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'a14', text: 'أي الجمل التالية بها توكيد معنوي؟', options: ['جاء الطلاب أنفسهم', 'جاء جاء', 'الطالب الطالب مجتهد', 'نعم نعم'], correctAnswer: 0, points: 15, difficulty: 'hard' },
    { id: 'a15', text: 'ما نوع "لا" في "لا طالبَ مهملٌ"؟', options: ['نافية للجنس', 'نافية', 'ناهية', 'عاطفة'], correctAnswer: 0, points: 15, difficulty: 'hard' },
  ],
  english: [
    // سهل
    { id: 'e1', text: 'What is the plural of "child"?', options: ['childs', 'childes', 'children', 'child'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'e2', text: 'What is the opposite of "hot"?', options: ['warm', 'cold', 'cool', 'heat'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'e3', text: 'Choose the correct: "She ___ to school every day."', options: ['go', 'goes', 'going', 'gone'], correctAnswer: 1, points: 5, difficulty: 'easy' },
    { id: 'e4', text: 'What color is the sky?', options: ['green', 'red', 'blue', 'yellow'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    { id: 'e5', text: 'How many days are in a week?', options: ['5', '6', '7', '8'], correctAnswer: 2, points: 5, difficulty: 'easy' },
    // متوسط
    { id: 'e6', text: 'Choose the correct form: "If I ___ rich, I would travel."', options: ['am', 'was', 'were', 'be'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'e7', text: 'What is the past participle of "write"?', options: ['wrote', 'written', 'writing', 'writes'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'e8', text: 'Which sentence is in passive voice?', options: ['She writes a letter', 'The letter was written', 'She is writing', 'She wrote it'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    { id: 'e9', text: '"She has been studying for 3 hours." What tense is this?', options: ['Present Perfect', 'Past Perfect', 'Present Perfect Continuous', 'Past Continuous'], correctAnswer: 2, points: 10, difficulty: 'medium' },
    { id: 'e10', text: 'Choose the correct relative pronoun: "The man ___ called is my uncle."', options: ['which', 'who', 'whom', 'whose'], correctAnswer: 1, points: 10, difficulty: 'medium' },
    // صعب
    { id: 'e11', text: 'What is the subjunctive form: "I suggest that he ___ early."', options: ['leaves', 'leave', 'left', 'leaving'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'e12', text: 'Identify the error: "Each of the students have their own book."', options: ['Each', 'have', 'their', 'book'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'e13', text: 'What type of clause is: "Although it was raining"?', options: ['Independent', 'Dependent', 'Relative', 'Noun'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'e14', text: 'Choose: "Neither the teacher nor the students ___ present."', options: ['was', 'were', 'is', 'has been'], correctAnswer: 1, points: 15, difficulty: 'hard' },
    { id: 'e15', text: 'What is the gerund: "Swimming is good exercise."', options: ['is', 'Swimming', 'good', 'exercise'], correctAnswer: 1, points: 15, difficulty: 'hard' },
  ],
};

// دالة لفلترة الأسئلة حسب الصعوبة
export const getQuestionsByDifficulty = (
  subjectId: string, 
  difficulty: Difficulty,
  count: number
): Question[] => {
  const allQuestions = sampleQuestions[subjectId] || [];
  const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
  
  // خلط الأسئلة
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count);
};
