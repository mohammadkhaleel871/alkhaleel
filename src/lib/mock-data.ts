import type { Lesson, Quiz, Resource, StudentProgress, Grade } from './types';

export const lessons: Lesson[] = [
  // Grade 7
  {
    id: 'g7-1',
    title: 'مقدمة في الجبر',
    grade: 'الصف السابع',
    summary: 'تعلم أساسيات الجبر، بما في ذلك المتغيرات والمعادلات البسيطة.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q1',
    imageId: 'lesson-algebra'
  },
   {
    id: 'g7-2',
    title: 'أقسام الكلام',
    grade: 'الصف السابع',
    summary: 'التعرف على الاسم والفعل والحرف وعلامات كل قسم.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q-g7-2',
    imageId: 'lesson-grammar'
  },
  // Grade 8
  {
    id: 'g8-1',
    title: 'الجملة الاسمية',
    grade: 'الصف الثامن',
    summary: 'فهم بنية الجملة الاسمية في اللغة العربية، بما في ذلك المبتدأ والخبر وأنواعهما.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q4',
    imageId: 'lesson-grammar'
  },
   {
    id: 'g8-2',
    title: 'كان وأخواتها',
    grade: 'الصف الثامن',
    summary: 'دراسة الأفعال الناسخة التي تدخل على الجملة الاسمية.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q-g8-2',
    imageId: 'lesson-grammar'
  },
  // Grade 10
  {
    id: 'g10-1',
    title: 'الشعر الجاهلي',
    grade: 'الصف العاشر',
    summary: 'استكشف عالم الشعر العربي قبل الإسلام. تعرف على أشهر الشعراء والموضوعات والخصائص الفنية للشعر الجاهلي.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q2',
    imageId: 'lesson-literature'
  },
   {
    id: 'g10-2',
    title: 'البلاغة: التشبيه',
    grade: 'الصف العاشر',
    summary: 'تعلم أركان التشبيه وأنواعه المختلفة في البلاغة العربية.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q-g10-2',
    imageId: 'lesson-calligraphy'
  },
  // Tawjihi
   {
    id: 'g12-1',
    title: 'قضايا من الشعر في العصر الحديث',
    grade: 'التوجيهي',
    summary: 'تحليل نصوص شعرية حديثة وفهم القضايا التي تطرحها.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q-g12-1',
    imageId: 'lesson-literature'
  },
  {
    id: 'g12-2',
    title: 'الاستثناء',
    grade: 'التوجيهي',
    summary: 'دراسة شاملة لأسلوب الاستثناء وأدواته وحالات المستثنى.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q-g12-2',
    imageId: 'lesson-grammar'
  },
  // General
  {
    id: 'gen-1',
    title: 'أساسيات الخط العربي',
    grade: 'جميع المستويات',
    summary: 'مقدمة عن فن الخط العربي. تعلم عن الأنماط المختلفة مثل النسخ والثلث والرقعة، وتدرب على كتابة الحروف الأساسية.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q3',
    imageId: 'lesson-calligraphy'
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    lessonId: 'g7-1',
    questions: [
      { id: 'q1-1', text: 'ما قيمة س في المعادلة: س + 5 = 12؟', options: ['5', '7', '10', '17'], correctAnswer: '7' },
      { id: 'q1-2', text: 'إذا كانت ص = 3، فما قيمة 4ص؟', options: ['7', '1', '12', '9'], correctAnswer: '12' },
    ],
  },
  {
    id: 'q2',
    lessonId: 'g10-1',
    questions: [
      { id: 'q2-1', text: 'من هو صاحب معلقة "قفا نبك من ذكرى حبيب ومنزل"؟', options: ['عنترة بن شداد', 'امرؤ القيس', 'زهير بن أبي سلمى', 'طرفة بن العبد'], correctAnswer: 'امرؤ القيس' },
    ],
  },
  {
    id: 'q3',
    lessonId: 'gen-1',
    questions: [
      { id: 'q3-1', text: 'أي من هذه الخطوط يستخدم عادة في كتابة المصاحف؟', options: ['الديواني', 'الرقعة', 'النسخ', 'الكوفي'], correctAnswer: 'النسخ' },
    ],
  },
    {
    id: 'q4',
    lessonId: 'g8-1',
    questions: [
      { id: 'q4-1', text: 'ما هو إعراب "السماءُ" في جملة "السماءُ صافيةٌ"؟', options: ['خبر مرفوع', 'مبتدأ مرفوع', 'فاعل مرفوع', 'صفة مرفوعة'], correctAnswer: 'مبتدأ مرفوع' },
    ],
  },
];

export const studentProgress: StudentProgress[] = [
  { lessonId: 'g7-1', completed: true, quizScore: 100, lastActivity: '2024-05-20T10:00:00Z' },
  { lessonId: 'g10-1', completed: false, quizScore: null, lastActivity: '2024-05-21T11:30:00Z' },
  { lessonId: 'g8-1', completed: true, quizScore: 50, lastActivity: '2024-05-22T09:00:00Z' },
  { lessonId: 'g12-2', completed: false, quizScore: 70, lastActivity: '2024-05-23T09:00:00Z' },
];

export const resources: Resource[] = [
    {
        id: 'r1',
        title: 'دليل شامل لقواعد اللغة العربية',
        description: 'ملف PDF يحتوي على ملخص لجميع قواعد النحو والصرف الأساسية.',
        type: 'pdf',
        url: '#',
        imageId: 'resource-guide'
    },
    {
        id: 'r2',
        title: 'فيديو تعليمي: حل المعادلات التربيعية',
        description: 'شرح مفصل لكيفية حل المعادلات التربيعية خطوة بخطوة.',
        type: 'video',
        url: '#',
        imageId: 'resource-video'
    }
];

export const grades: Grade[] = [
    {
        id: 'g5',
        name: 'الصف الخامس',
        lessons: lessons.filter(l => l.grade === 'الصف الخامس')
    },
     {
        id: 'g6',
        name: 'الصف السادس',
        lessons: lessons.filter(l => l.grade === 'الصف السادس')
    },
    {
        id: 'g7',
        name: 'الصف السابع',
        lessons: lessons.filter(l => l.grade === 'الصف السابع')
    },
    {
        id: 'g8',
        name: 'الصف الثامن',
        lessons: lessons.filter(l => l.grade === 'الصف الثامن')
    },
     {
        id: 'g9',
        name: 'الصف التاسع',
        lessons: lessons.filter(l => l.grade === 'الصف التاسع')
    },
    {
        id: 'g10',
        name: 'الصف العاشر',
        lessons: lessons.filter(l => l.grade === 'الصف العاشر')
    },
    {
        id: 'g11',
        name: 'الصف الأول الثانوي',
        lessons: lessons.filter(l => l.grade === 'الصف الأول الثانوي')
    },
     {
        id: 'g12',
        name: 'التوجيهي',
        lessons: lessons.filter(l => l.grade === 'التوجيهي')
    },
]
