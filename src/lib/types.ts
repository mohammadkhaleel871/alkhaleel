export interface Lesson {
  id: string;
  title: string;
  grade: string;
  summary: string;
  videoUrl: string;
  quizId: string;
  imageId: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'article';
  url: string;
  imageId: string;
}

export interface StudentProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  lastActivity?: string;
}

export interface Grade {
    id: string;
    name: string;
    lessons: Lesson[];
}
