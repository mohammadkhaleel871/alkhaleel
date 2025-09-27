import type { Lesson, Quiz, Resource, StudentProgress, Grade } from './types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'مقدمة في الجبر',
    grade: 'الصف السابع',
    summary: 'تعلم أساسيات الجبر، بما في ذلك المتغيرات والمعادلات البسيطة. يقدم هذا الدرس المفاهيم الأساسية التي ستبني عليها في دراسات الرياضيات المستقبلية.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q1',
    imageId: 'lesson-algebra'
  },
  {
    id: '2',
    title: 'الشعر الجاهلي',
    grade: 'الصف العاشر',
    summary: 'استكشف عالم الشعر العربي قبل الإسلام. تعرف على أشهر الشعراء والموضوعات والخصائص الفنية للشعر الجاهلي.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q2',
    imageId: 'lesson-literature'
  },
  {
    id: '3',
    title: 'أساسيات الخط العربي',
    grade: 'جميع المستويات',
    summary: 'مقدمة عن فن الخط العربي. تعلم عن الأنماط المختلفة مثل النسخ والثلث والرقعة، وتدرب على كتابة الحروف الأساسية.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q3',
    imageId: 'lesson-calligraphy'
  },
  {
    id: '4',
    title: 'قواعد النحو: الجملة الاسمية',
    grade: 'الصف الثامن',
    summary: 'فهم بنية الجملة الاسمية في اللغة العربية، بما في ذلك المبتدأ والخبر وأنواعهما.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    quizId: 'q4',
    imageId: 'lesson-grammar'
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    lessonId: '1',
    questions: [
      { id: 'q1-1', text: 'ما قيمة س في المعادلة: س + 5 = 12؟', options: ['5', '7', '10', '17'], correctAnswer: '7' },
      { id: 'q1-2', text: 'إذا كانت ص = 3، فما قيمة 4ص؟', options: ['7', '1', '12', '9'], correctAnswer: '12' },
    ],
  },
  {
    id: 'q2',
    lessonId: '2',
    questions: [
      { id: 'q2-1', text: 'من هو صاحب معلقة "قفا نبك من ذكرى حبيب ومنزل"؟', options: ['عنترة بن شداد', 'امرؤ القيس', 'زهير بن أبي سلمى', 'طرفة بن العبد'], correctAnswer: 'امرؤ القيس' },
    ],
  },
  {
    id: 'q3',
    lessonId: '3',
    questions: [
      { id: 'q3-1', text: 'أي من هذه الخطوط يستخدم عادة في كتابة المصاحف؟', options: ['الديواني', 'الرقعة', 'النسخ', 'الكوفي'], correctAnswer: 'النسخ' },
    ],
  },
    {
    id: 'q4',
    lessonId: '4',
    questions: [
      { id: 'q4-1', text: 'ما هو إعراب "السماءُ" في جملة "السماءُ صافيةٌ"؟', options: ['خبر مرفوع', 'مبتدأ مرفوع', 'فاعل مرفوع', 'صفة مرفوعة'], correctAnswer: 'مبتدأ مرفوع' },
    ],
  },
];

export const studentProgress: StudentProgress[] = [
  { lessonId: '1', completed: true, quizScore: 100, lastActivity: '2024-05-20T10:00:00Z' },
  { lessonId: '2', completed: false, quizScore: null, lastActivity: '2024-05-21T11:30:00Z' },
  { lessonId: '4', completed: true, quizScore: 50, lastActivity: '2024-05-22T09:00:00Z' },
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
        id: 'g1',
        name: 'الصف السابع',
        lessons: lessons.filter(l => l.grade === 'الصف السابع')
    },
    {
        id: 'g2',
        name: 'الصف الثامن',
        lessons: lessons.filter(l => l.grade === 'الصف الثامن')
    },
    {
        id: 'g3',
        name: 'الصف العاشر',
        lessons: lessons.filter(l => l.grade === 'الصف العاشر')
    }
]
