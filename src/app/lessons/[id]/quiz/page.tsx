'use client';

import { useState, useEffect } from 'react';
import type { Lesson, Quiz } from '@/lib/types';
import { quizzes } from '@/lib/mock-data';
import { notFound, useParams } from 'next/navigation';
import { QuizClient } from '@/components/quiz-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/layout/back-button';

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLessons = localStorage.getItem('lessons');
    let currentLesson: Lesson | undefined;
    if (storedLessons) {
        const allLessons: Lesson[] = JSON.parse(storedLessons);
        currentLesson = allLessons.find((l) => l.id === params.id);
        if (currentLesson) {
            setLesson(currentLesson);
            const currentQuiz = quizzes.find((q) => q.lessonId === currentLesson?.id.split('-')[0]);
            setQuiz(currentQuiz || null);
        }
    }
    
    // Fallback for mock data that might not be in localstorage yet
    if (!currentLesson) {
        const { lessons: mockLessons } = require('@/lib/mock-data');
        currentLesson = mockLessons.find((l: Lesson) => l.id === params.id);
         if (currentLesson) {
            setLesson(currentLesson);
             const currentQuiz = quizzes.find((q) => q.lessonId === currentLesson?.id);
             setQuiz(currentQuiz || null);
        }
    }

    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return <div>جارٍ تحميل الاختبار...</div>;
  }
  
  if (!lesson) {
    notFound();
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-start h-full">
         <BackButton />
        <div className="flex items-center justify-center w-full flex-grow">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle>الاختبار غير موجود</CardTitle>
                    <CardDescription>عذراً، لم نتمكن من العثور على اختبار لهذا الدرس.</CardDescription>
                </CardHeader>
            </Card>
        </div>
      </div>
    );
  }

  return (
      <div>
        <BackButton />
        <QuizClient lesson={lesson} quiz={quiz} />
      </div>
  );
}
