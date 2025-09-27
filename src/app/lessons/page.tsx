import { lessons } from '@/lib/mock-data';
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

export default function LessonsPage() {
  return (
    <div>
      <BackButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lessons.map((lesson) => {
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
    </div>
  );
}
