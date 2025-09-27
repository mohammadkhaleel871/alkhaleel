'use client';

import { useState } from 'react';
import type { Lesson, Quiz } from '@/lib/types';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle2, Film, FileText, Sparkles, XCircle } from 'lucide-react';
import { getLearningContentSuggestions } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Link from 'next/link';
import type { SuggestLearningContentOutput } from '@/ai/flows/suggest-learning-content';

type QuizState = 'in-progress' | 'completed';

export function QuizClient({ lesson, quiz }: { lesson: Lesson; quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizState, setQuizState] = useState<QuizState>('in-progress');
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<SuggestLearningContentOutput | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz
      let correctAnswers = 0;
      quiz.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctAnswers++;
        }
      });
      const finalScore = (correctAnswers / quiz.questions.length) * 100;
      setScore(finalScore);
      setQuizState('completed');
    }
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    const performanceSummary = `Student scored ${score.toFixed(0)}% on the quiz for "${lesson.title}". Areas of difficulty can be inferred from incorrect answers.`;
    const response = await getLearningContentSuggestions({
      quizPerformance: performanceSummary,
      lessonTopic: lesson.title,
      studentId: 'student-123', // Mock student ID
    });
    if(response.success && response.data){
        setSuggestions(response.data);
    }
    setIsLoadingSuggestions(false);
  };

  if (quizState === 'completed') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-fit p-4 rounded-full bg-primary/10 mb-4">
              {score > 70 ? (
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              ) : (
                <AlertCircle className="h-12 w-12 text-yellow-500" />
              )}
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>You have completed the quiz for "{lesson.title}".</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">{score.toFixed(0)}%</p>
            <p className="text-muted-foreground">Your Score</p>

            {suggestions && (
              <Alert className="mt-6 text-left">
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Personalized Suggestions</AlertTitle>
                <AlertDescription>
                  <p className="mb-4">{suggestions.reasoning}</p>
                   <div className="space-y-3">
                        {suggestions.suggestedVideos.length > 0 && (
                            <div>
                                <h4 className="font-semibold flex items-center gap-2"><Film className="h-4 w-4" /> Suggested Videos</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {suggestions.suggestedVideos.map((video, i) => <li key={i}><a href={video} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{video}</a></li>)}
                                </ul>
                            </div>
                        )}
                        {suggestions.suggestedSummaries.length > 0 && (
                             <div>
                                <h4 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4" /> Suggested Summaries</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {suggestions.suggestedSummaries.map((summary, i) => <li key={i}><a href={summary} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{summary}</a></li>)}
                                </ul>
                            </div>
                        )}
                   </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            {!suggestions && (
                 <Button onClick={handleGetSuggestions} disabled={isLoadingSuggestions} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {isLoadingSuggestions ? "Getting Suggestions..." : "Get Content Suggestions"}
                    <Sparkles className="ml-2 h-4 w-4"/>
                </Button>
            )}
            <Button asChild variant="outline" className="w-full">
                <Link href="/lessons">Back to Lessons</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-xl leading-relaxed">{currentQuestion.text}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              variant="outline"
              size="lg"
              className={cn(
                'justify-start h-auto py-3 text-wrap',
                selectedAnswers[currentQuestion.id] === option &&
                  'bg-primary/10 border-primary ring-2 ring-primary'
              )}
              onClick={() => handleAnswerSelect(currentQuestion.id, option)}
            >
              {option}
            </Button>
          ))}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
            className="w-full"
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish Quiz'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
