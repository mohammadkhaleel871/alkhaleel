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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { grades, lessons as allLessons, studentProgress } from "@/lib/mock-data";
import { BookOpen, ArrowUpRight, Percent, ClipboardCheck, Activity } from "lucide-react";
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
              {totalLessons > 0 ? 'ابدأ درسًا جديدًا أو راجع الدروس المكتملة.' : 'لا توجد دروس متاحة حاليًا لهذا الصف.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalLessons > 0 ? (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>الوحدة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-right">الإجراء</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gradeLessons.map((lesson) => {
                    const progress = gradeProgress.find(p => p.lessonId === lesson.id);
                    return (
                        <TableRow key={lesson.id}>
                        <TableCell>
                            <div className="font-medium">{lesson.title}</div>
                        </TableCell>
                        <TableCell>
                            {progress ? (
                                 <Badge variant={progress.completed ? 'default' : 'secondary'} className={progress.completed ? 'bg-green-600' : ''}>
                                    {progress.completed ? 'مكتمل' : 'قيد التقدم'}
                                </Badge>
                            ) : (
                                <Badge variant="outline">لم تبدأ</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            <Link href={`/lessons/${lesson.id}`} passHref>
                            <Button size="sm" variant="outline">
                                {progress?.completed ? 'مراجعة' : 'ابدأ الدرس'}
                            </Button>
                            </Link>
                        </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            ) : (
                 <div className="text-center text-muted-foreground py-10">
                    <p>سيتم إضافة الدروس قريبًا.</p>
                </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
}
