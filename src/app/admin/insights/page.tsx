
'use client';

import { useState, useEffect } from 'react';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStudentDifficultyInsights } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, ServerCrash, Sparkles } from 'lucide-react';
import type { StudentDifficultyInsightsOutput } from '@/ai/flows/student-difficulty-insights';
import { BackButton } from '@/components/layout/back-button';
import { getAllLessons } from '@/lib/lessons-firestore';

export default function AdminInsightsPage() {
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
    const [selectedLessonId, setSelectedLessonId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingLessons, setIsLoadingLessons] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [insights, setInsights] = useState<StudentDifficultyInsightsOutput | null>(null);
    
    useEffect(() => {
        async function fetchLessons() {
            const lessons = await getAllLessons();
            setAllLessons(lessons);
            setIsLoadingLessons(false);
        }
        fetchLessons();
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId) {
      setError('الرجاء اختيار درس.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);

    const lesson = allLessons.find(l => l.id === selectedLessonId);
    if (!lesson) {
      setError('الدرس المختار غير موجود.');
      setIsLoading(false);
      return;
    }

    // In a real app, you would fetch real student results from your database (e.g., Firestore)
    // For now, we use mock scores, but this is where you'd query for all users' progress on this lesson.
    const mockResults = Array.from({ length: 20 }, (_, i) => ({
        studentId: `student-${i}`,
        score: Math.floor(Math.random() * 60) + 40, // Scores between 40 and 100
    }));

    const response = await getStudentDifficultyInsights({
      lessonName: lesson.title,
      lessonContentSummary: lesson.summary,
      studentQuizResults: mockResults,
    });

    if (response.success && response.data) {
        setInsights(response.data);
    } else {
        setError(response.error || 'حدث خطأ غير معروف.');
    }
    
    setIsLoading(false);
  };
  
    if (isLoadingLessons) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle>الحصول على رؤى حول الدرس</CardTitle>
          <CardDescription>
            اختر درسًا لتحليل أداء الطلاب وتحديد مجالات الصعوبة باستخدام الذكاء الاصطناعي.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-select">الدرس</Label>
              <Select value={selectedLessonId} onValueChange={setSelectedLessonId}>
                <SelectTrigger id="lesson-select">
                  <SelectValue placeholder="اختر درسًا" />
                </SelectTrigger>
                <SelectContent>
                  {allLessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading || !selectedLessonId} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارٍ التحليل...
                </>
              ) : (
                 <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  إنشاء رؤى
                 </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive">
            <ServerCrash className="h-4 w-4" />
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <Card>
            <CardHeader>
                <CardTitle>رؤى مدعومة بالذكاء الاصطناعي لـ "{allLessons.find(l => l.id === selectedLessonId)?.title}"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Lightbulb className="text-yellow-400" /> الصعوبات الرئيسية</h3>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg">{insights.keyDifficulties}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Sparkles className="text-primary" /> تحسينات مقترحة</h3>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg">{insights.suggestedImprovements}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
