
import type { Lesson } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/layout/back-button';
import { getAllLessons } from '@/lib/lessons-firestore';

export default async function LessonsPage() {
    const allLessons = await getAllLessons();
    const generalLessons = allLessons.filter(lesson => lesson.category === 'general-lessons');

  return (
    <div>
      <BackButton />
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">الدروس العامة</h1>
        <p className="text-lg text-muted-foreground mt-2">مواضيع متنوعة في اللغة العربية.</p>
      </div>
      {generalLessons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {generalLessons.map((lesson) => {
            const lessonImage = PlaceHolderImages.find(p => p.id === lesson.imageId);
            return (
                <Card key={lesson.id} className="flex flex-col">
                    <CardHeader>
                        {lessonImage && (
                        <div className="relative aspect-video w-full mb-4">
                            <Image
                            src={lessonImage.imageUrl}
                            alt={lesson.title}
                            fill
                            className="rounded-lg object-cover"
                            data-ai-hint={lessonImage.imageHint}
                            />
                        </div>
                        )}
                        <CardTitle>{lesson.title}</CardTitle>
                        <Badge variant="secondary" className="w-fit">{lesson.grade}</Badge>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{lesson.summary}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                        <Link href={`/lessons/${lesson.id}`}>ابدأ الدرس</Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
            })}
        </div>
      ) : (
        <Card className="text-center p-8">
            <CardTitle>لا توجد دروس</CardTitle>
            <CardDescription className="mt-2">
                لم تتم إضافة أي دروس عامة بعد.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
