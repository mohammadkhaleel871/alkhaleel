'use client';

import { useState } from 'react';
import type { Lesson } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { studentProgress } from '@/lib/mock-data';
import { getStudentDifficultyInsights } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Lightbulb, Loader2, ServerCrash, Sparkles } from 'lucide-react';
import type { StudentDifficultyInsightsOutput } from '@/ai/flows/student-difficulty-insights';

export function AdminInsightsClient({ lessons }: { lessons: Lesson[] }) {
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<StudentDifficultyInsightsOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId) {
      setError('Please select a lesson.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);

    const lesson = lessons.find(l => l.id === selectedLessonId);
    if (!lesson) {
      setError('Selected lesson not found.');
      setIsLoading(false);
      return;
    }

    // Mocking student results for the selected lesson
    const mockResults = studentProgress
        .filter(p => p.quizScore !== null)
        .map(p => ({ studentId: `student-${p.lessonId}`, score: p.quizScore! }));

    const response = await getStudentDifficultyInsights({
      lessonName: lesson.title,
      lessonContentSummary: lesson.summary,
      studentQuizResults: mockResults.length > 0 ? mockResults : [{studentId: 'student-0', score: 55}], // Ensure there's at least one result
    });

    if (response.success && response.data) {
        setInsights(response.data);
    } else {
        setError(response.error || 'An unknown error occurred.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Get Lesson Insights</CardTitle>
          <CardDescription>
            Select a lesson to analyze student performance and identify areas of difficulty using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lesson-select">Lesson</Label>
              <Select value={selectedLessonId} onValueChange={setSelectedLessonId}>
                <SelectTrigger id="lesson-select">
                  <SelectValue placeholder="Select a lesson" />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
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
                  Analyzing...
                </>
              ) : (
                 <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Insights
                 </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive">
            <ServerCrash className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {insights && (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Insights for "{lessons.find(l => l.id === selectedLessonId)?.title}"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Lightbulb className="text-yellow-400" /> Key Difficulties</h3>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg">{insights.keyDifficulties}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Sparkles className="text-primary" /> Suggested Improvements</h3>
                    <p className="text-muted-foreground bg-muted p-4 rounded-lg">{insights.suggestedImprovements}</p>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
