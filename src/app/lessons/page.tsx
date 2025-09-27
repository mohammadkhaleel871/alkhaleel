
'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';

export default function LessonsPage() {
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchLessons() {
      setIsLoading(true);
      const lessons = await getAllLessons();
      setAllLessons(lessons);
      setIsLoading(false);
    }
    fetchLessons();
  }, []);

  const generalLessons = useMemo(() => {
    const filteredByCategory = allLessons.filter(lesson => lesson.category === 'general-lessons');

    if (!searchTerm) {
        return filteredByCategory;
    }

    return filteredByCategory.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allLessons, searchTerm]);

  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline">الدروس العامة</h1>
        <p className="text-lg text-muted-foreground mt-2">مواضيع متنوعة في اللغة العربية.</p>
      </div>

       <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="ابحث عن درس..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : generalLessons.length > 0 ? (
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
            <CardTitle>لا توجد نتائج</CardTitle>
            <CardDescription className="mt-2">
                لم نتمكن من العثور على أي دروس تطابق بحثك.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
