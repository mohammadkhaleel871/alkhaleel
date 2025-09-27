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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { grades, lessons as allLessons, studentProgress } from "@/lib/mock-data";
import { BookOpen, Percent, ClipboardCheck, Activity, Book } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function GradeDashboardPage({ params }: { params: { id: string } }) {
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
  const overallProgress = hasStartedLearning ? (completedLessons / totalLessons) * 100 : 0;
  
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
                <p className="text-xs text-muted-foreground">
                {completedLessons} من {totalLessons}
                </p>
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
              {totalLessons > 0 ? 'اختر وحدة للبدء أو لمراجعة الدروس.' : 'لا توجد وحدات متاحة حاليًا لهذا الصف.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalLessons > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                {Object.entries(lessonsByUnit).map(([unit, lessonsInUnit]) => (
                  <AccordionItem value={unit} key={unit}>
                    <AccordionTrigger className="text-lg font-medium">{unit}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4 p-2">
                        {lessonsInUnit.map((lesson) => {
                           const progress = gradeProgress.find(p => p.lessonId === lesson.id);
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
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
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
