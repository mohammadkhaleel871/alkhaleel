'use client'

import { useState, useEffect } from 'react';
import type { Lesson } from '@/lib/types';
import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BackButton } from '@/components/layout/back-button';

// Helper function to convert YouTube URL to embeddable URL
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
      const videoId = urlObj.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
     if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
      return url;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return url; // Return original url if parsing fails
  }
  return url; // Return original url if it's not a standard watch/short URL
}


export default function LessonDetailPage() {
  const params = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      const allLessons: Lesson[] = JSON.parse(storedLessons);
      const currentLesson = allLessons.find((l) => l.id === params.id);
      if (currentLesson) {
        setLesson(currentLesson);
      }
    }
    setIsLoading(false);
  }, [params.id]);


  if (isLoading) {
    return <div>جارٍ تحميل الدرس...</div>;
  }

  if (!lesson) {
    notFound();
  }
  
  const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video">
            <iframe
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-3xl mb-2 font-headline">{lesson.title}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mb-6">
            {lesson.grade}
          </CardDescription>
          <div className="prose dark:prose-invert max-w-none text-base">
            <p>{lesson.summary}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-center">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={`/lessons/${lesson.id}/quiz`}>
            ابدأ الاختبار
            <ArrowRight className="mr-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
