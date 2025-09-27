

import type { Lesson, Quiz } from '@/lib/types';
import { quizzes } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { QuizClient } from '@/components/quiz-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/layout/back-button';
import { getAllLessons } from '@/lib/lessons-firestore';

export default async function QuizPage({ params }: { params: { id: string } }) {
  const allLessons: Lesson[] = await getAllLessons();
  const lesson = allLessons.find((l) => l.id === params.id);
  
  if (!lesson) {
    notFound();
  }

  const quiz = quizzes.find((q) => q.lessonId === lesson?.id.split('-')[0] || q.lessonId === lesson?.id);

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
