

'use client';

import { useState, useEffect } from "react";
import { BackButton } from "@/components/layout/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { grades } from "@/lib/mock-data";
import { BookOpen, Percent, ClipboardCheck, Activity, Book, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import type { Lesson, StudentProgress } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { getStudentProgress } from "@/lib/firestore";
import { getAllLessons } from "@/lib/lessons-firestore";

export default function GradeDashboardPage() {
  const params = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        const lessons = await getAllLessons();
        setAllLessons(lessons);

        if (user) {
            const progress = await getStudentProgress(user.uid);
            setStudentProgress(progress);
        }
        setIsLoading(false);
    }
    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  const grade = grades.find((g) => g.id === params.id);
  if (!grade) {
    notFound();
  }

  const gradeLessons = allLessons.filter(l => l.grade === grade.name);
  const gradeLessonIds = gradeLessons.map(l => l.id);

  const gradeProgress = studentProgress.filter(p => gradeLessonIds.includes(p.lessonId));
  const hasStartedLearning = gradeProgress.length > 0;

  const completedLessons = gradeProgress.filter(
    (p) => p.completed
  ).length;
  const totalLessons = gradeLessons.length;
  const overallProgress = hasStartedLearning && totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  const relevantProgress = gradeProgress.filter((p) => p.quizScore !== null);
  const averageScore =
    relevantProgress.length > 0
      ? relevantProgress.reduce((acc, p) => acc + p.quizScore!, 0) /
        relevantProgress.length
      : 0;

  const recentActivity = gradeProgress
    .slice()
    .sort((a, b) => (a.lastActivity && b.lastActivity ? new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime() : -1))
    .slice(0, 1);

  const lessonsByUnit = gradeLessons.reduce((acc, lesson) => {
    const unit = lesson.unit || 'وحدات متنوعة';
    if (!acc[unit]) {
      acc[unit] = [];
    }
    acc[unit].push(lesson);
    return acc;
  }, {} as Record<string, typeof gradeLessons>);

  const units = ['الوحدة الأولى', 'الوحدة الثانية', 'الوحدة الثالثة', 'الوحدة الرابعة', 'الوحدة الخامسة'];
  const lessonsForSelectedUnit = selectedUnit ? lessonsByUnit[selectedUnit] || [] : [];
  
  if(isLoading || authLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div>
        <BackButton />
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">لوحة تحكم: {grade.name}</h1>
            <p className="text-muted-foreground">تابع تقدمك في هذا الصف.</p>
        </div>

         <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <Card className="rounded-full w-32 h-32 flex flex-col items-center justify-center text-center p-2">
            <CardHeader className="p-0">
                <BookOpen className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <CardTitle className="text-sm font-medium">
                التقدم العام
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1">
                <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
                {totalLessons > 0 && <p className="text-xs text-muted-foreground">
                  {completedLessons} من {totalLessons}
                </p>}
            </CardContent>
            </Card>
            <Card className="rounded-full w-32 h-32 flex flex-col items-center justify-center text-center p-2">
            <CardHeader className="p-0">
                <Percent className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <CardTitle className="text-sm font-medium">
                متوسط الدرجة
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1">
                <div className="text-2xl font-bold">{averageScore.toFixed(0)}%</div>
            </CardContent>
            </Card>
            <Card className="rounded-full w-32 h-32 flex flex-col items-center justify-center text-center p-2">
            <CardHeader className="p-0">
                <ClipboardCheck className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <CardTitle className="text-sm font-medium">الدروس المكتملة</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1">
                <div className="text-2xl font-bold">+{completedLessons}</div>
            </CardContent>
            </Card>
            <Card className="rounded-full w-32 h-32 flex flex-col items-center justify-center text-center p-2">
            <CardHeader className="p-0">
                <Activity className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                <CardTitle className="text-sm font-medium">
                آخر نشاط
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1">
                <div className="text-sm font-bold truncate w-full px-2">
                {recentActivity.length > 0 ? allLessons.find(l => l.id === recentActivity[0].lessonId)?.title : 'لا يوجد'}
                </div>
                <p className="text-xs text-muted-foreground">
                {recentActivity.length > 0 && recentActivity[0].quizScore !== null ? `الدرجة: ${recentActivity[0].quizScore}` : ''}
                </p>
            </CardContent>
            </Card>
      </div>

        <Card>
          <CardHeader>
            <CardTitle>وحدات {grade.name}</CardTitle>
            <CardDescription>
              {units.length > 0 ? 'اختر وحدة للبدء أو لمراجعة الدروس.' : 'لا توجد وحدات متاحة حاليًا لهذا الصف.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {gradeLessons.length > 0 ? (
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                        {units.map((unit) => (
                             <Card 
                                key={unit} 
                                className={`text-center p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedUnit === unit ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}
                                onClick={() => setSelectedUnit(selectedUnit === unit ? null : unit)}
                            >
                                <Book className="w-8 h-8 text-primary mb-2" />
                                <h3 className="text-sm font-medium">{unit}</h3>
                            </Card>
                        ))}
                    </div>

                    {selectedUnit && (
                        <div>
                             <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">{selectedUnit}</h3>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedUnit(null)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-4 p-2 border rounded-lg">
                                {lessonsForSelectedUnit.length > 0 ? lessonsForSelectedUnit.map((lesson) => {
                                const progress = gradeProgress.find(p => p.lessonId === lesson.id);
                                return (
                                    <div
                                    key={lesson.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">{lesson.title}</span>
                                            {progress ? (
                                                <Badge variant={progress.completed ? 'default' : 'secondary'} className={`w-fit mt-1 ${progress.completed ? 'bg-green-600' : ''}`}>
                                                    {progress.completed ? 'مكتمل' : 'قيد التقدم'}
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="w-fit mt-1">لم تبدأ</Badge>
                                            )}
                                        </div>
                                    <Link href={`/lessons/${lesson.id}`} passHref>
                                        <Button size="sm" variant="outline">
                                        {progress?.completed ? 'مراجعة' : 'ابدأ الدرس'}
                                        </Button>
                                    </Link>
                                    </div>
                                )
                                }) : (
                                    <p className="text-muted-foreground text-center p-4">لا توجد دروس متاحة في هذه الوحدة بعد.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-4">
                    <Book className="w-16 h-16 text-muted-foreground/50" />
                    <p>سيتم إضافة الوحدات والدروس قريبًا.</p>
                </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
