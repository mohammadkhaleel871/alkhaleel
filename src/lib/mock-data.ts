import type { Lesson, Quiz, Resource, StudentProgress, Grade } from './types';

export const lessons: Lesson[] = [
    {
        id: 'g7-1',
        title: 'مقدمة في الجبر',
        grade: 'الصف السابع',
        unit: 'الوحدة الأولى',
        summary: 'تعلم أساسيات الجبر والمتغيرات والمعادلات البسيطة.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        quizId: 'q1',
        imageId: 'lesson-algebra'
    },
    {
        id: 'g10-1',
        title: 'المعلقات السبع',
        grade: 'الصف العاشر',
        unit: 'الوحدة الثانية',
        summary: 'استكشاف أشهر قصائد الشعر الجاهلي وأصحابها.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        quizId: 'q2',
        imageId: 'lesson-literature'
    },
    {
        id: 'g8-1',
        title: 'أساسيات الإعراب',
        grade: 'الصف الثامن',
        unit: 'الوحدة الأولى',
        summary: 'فهم دور الكلمات في الجملة العربية وكيفية إعرابها.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        quizId: 'q4',
        imageId: 'lesson-grammar'
    }
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
