import { lessons, quizzes } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { QuizClient } from '@/components/quiz-client';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage({ params }: { params: { id: string } }) {
  const lesson = lessons.find((l) => l.id === params.id);
  if (!lesson) {
    notFound();
  }

  const quiz = quizzes.find((q) => q.lessonId === lesson.id);
  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle>Quiz Not Found</CardTitle>
                <CardDescription>Sorry, we couldn't find a quiz for this lesson.</CardDescription>
            </CardHeader>
        </Card>
      </div>
    );
  }

  return <QuizClient lesson={lesson} quiz={quiz} />;
}
