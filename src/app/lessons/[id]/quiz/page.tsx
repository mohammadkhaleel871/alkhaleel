
'use client';

import { useState, useEffect } from 'react';
import type { Lesson, Quiz } from '@/lib/types';
import { quizzes } from '@/lib/mock-data';
import { notFound, useParams } from 'next/navigation';
import { QuizClient } from '@/components/quiz-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/layout/back-button';
import { getAllLessons } from '@/lib/lessons-firestore';
import { Loader2 } from 'lucide-react';

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLessonAndQuiz() {
      const allLessons: Lesson[] = await getAllLessons();
      const currentLesson = allLessons.find((l) => l.id === params.id);
      
      if (currentLesson) {
        setLesson(currentLesson);
        const currentQuiz = quizzes.find((q) => q.lessonId === currentLesson?.id.split('-')[0] || q.lessonId === currentLesson?.id);
        setQuiz(currentQuiz || null);
      }
      setIsLoading(false);
    }

    if (params.id) {
      fetchLessonAndQuiz();
    }
  }, [params.id]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
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
