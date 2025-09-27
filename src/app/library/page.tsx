import { getAllLessons } from '@/lib/lessons-firestore';
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
import { FileText, Video } from 'lucide-react';
import { BackButton } from '@/components/layout/back-button';

export default async function LibraryPage() {
  const allLessons = await getAllLessons();
  const libraryResources = allLessons.filter(lesson => lesson.category === 'library');

  return (
    <div>
      <BackButton />
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">المكتبة</h1>
            <p className="text-lg text-muted-foreground mt-2">ملخصات، أوراق عمل، ودوسيات.</p>
        </div>
      {libraryResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {libraryResources.map((resource) => {
            const resourceImage = PlaceHolderImages.find(p => p.id === resource.imageId);
            const isVideo = resource.videoUrl && resource.videoUrl.length > 0;
            return (
                <Card key={resource.id} className="flex flex-col">
                <CardHeader>
                    {resourceImage && (
                    <div className="relative aspect-video w-full mb-4">
                        <Image
                        src={resourceImage.imageUrl}
                        alt={resource.title}
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint={resourceImage.imageHint}
                        />
                    </div>
                    )}
                    <CardTitle>{resource.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit mt-2">
                    {isVideo ? <Video className="h-3 w-3 ml-1" /> : <FileText className="h-3 w-3 ml-1" />}
                    {isVideo ? 'فيديو' : 'ملخص'}
                    </Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{resource.summary}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                    <Link href={`/lessons/${resource.id}`}>عرض المصدر</Link>
                    </Button>
                </CardFooter>
                </Card>
            );
            })}
        </div>
      ) : (
         <Card className="text-center p-8">
            <CardTitle>المكتبة فارغة</CardTitle>
            <CardDescription className="mt-2">
                لم تتم إضافة أي موارد إلى المكتبة بعد.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
