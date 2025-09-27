
'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { FileText, Video, Search, Loader2 } from 'lucide-react';
import { BackButton } from '@/components/layout/back-button';
import { Input } from '@/components/ui/input';

export default function LibraryPage() {
  const [allResources, setAllResources] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchResources() {
      setIsLoading(true);
      // Fetch only library resources
      const lessons = await getAllLessons('library');
      setAllResources(lessons);
      setIsLoading(false);
    }
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    if (!searchTerm) {
        return allResources;
    }
    return allResources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allResources, searchTerm]);

  return (
    <div>
      <BackButton />
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">المكتبة</h1>
            <p className="text-lg text-muted-foreground mt-2">ملخصات، أوراق عمل، ودوسيات.</p>
        </div>

        <div className="relative mb-8 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="ابحث في المكتبة..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource) => {
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
            <CardTitle>لا توجد نتائج</CardTitle>
            <CardDescription className="mt-2">
                لم نتمكن من العثور على أي موارد تطابق بحثك.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
