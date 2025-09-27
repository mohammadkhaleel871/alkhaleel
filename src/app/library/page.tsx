import { resources } from '@/lib/mock-data';
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

export default function LibraryPage() {
  return (
    <div>
      <BackButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => {
          const resourceImage = PlaceHolderImages.find(p => p.id === resource.imageId);
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
                  {resource.type === 'pdf' && <FileText className="h-3 w-3 ml-1" />}
                  {resource.type === 'video' && <Video className="h-3 w-3 ml-1" />}
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={resource.url} target="_blank">عرض المصدر</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
