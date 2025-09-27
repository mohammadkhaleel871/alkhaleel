
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  Percent,
} from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { lessons, studentProgress } from '@/lib/mock-data';

export default function Dashboard() {
  const hasStartedLearning = studentProgress.length > 0;

  const completedLessons = studentProgress.filter(
    (p) => p.completed
  ).length;
  const totalLessons = lessons.length;
  const overallProgress = hasStartedLearning ? (completedLessons / totalLessons) * 100 : 0;
  
  const relevantProgress = studentProgress.filter((p) => p.quizScore !== null);
  const averageScore =
    relevantProgress.length > 0
      ? relevantProgress.reduce((acc, p) => acc + p.quizScore!, 0) /
        relevantProgress.length
      : 0;

  const recentActivity = studentProgress
    .slice()
    .sort((a, b) => (a.lastActivity && b.lastActivity ? new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime() : -1))
    .slice(0, 3);
    
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <Card className="rounded-full w-28 h-28 flex flex-col items-center justify-center text-center p-2">
          <CardHeader className="p-0">
            <BookOpen className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <CardTitle className="text-xs font-medium">
              التقدم العام
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-1">
            <div className="text-xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedLessons} من {totalLessons}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-full w-28 h-28 flex flex-col items-center justify-center text-center p-2">
          <CardHeader className="p-0">
            <Percent className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <CardTitle className="text-xs font-medium">
              متوسط درجة الاختبار
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-1">
            <div className="text-xl font-bold">{averageScore.toFixed(0)}%</div>
          </CardContent>
        </Card>
        <Card className="rounded-full w-28 h-28 flex flex-col items-center justify-center text-center p-2">
          <CardHeader className="p-0">
            <ClipboardCheck className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <CardTitle className="text-xs font-medium">الدروس المكتملة</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-1">
            <div className="text-xl font-bold">+{completedLessons}</div>
          </CardContent>
        </Card>
         <Card className="rounded-full w-28 h-28 flex flex-col items-center justify-center text-center p-2">
          <CardHeader className="p-0">
            <Activity className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <CardTitle className="text-xs font-medium">
              آخر نشاط
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-1">
            <div className="text-sm font-bold truncate w-full px-2">
              {recentActivity.length > 0 ? lessons.find(l => l.id === recentActivity[0].lessonId)?.title : 'لا يوجد'}
            </div>
            <p className="text-xs text-muted-foreground">
              {recentActivity.length > 0 && recentActivity[0].quizScore !== null ? `الدرجة: ${recentActivity[0].quizScore}` : ''}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8">
       {hasStartedLearning ? (
        <Card>
          <CardHeader className="flex flex-row items-center">
             <div className="grid gap-2">
              <CardTitle>واصل التعلم</CardTitle>
              <CardDescription>
                أكمل من حيث توقفت أو ابدأ درسًا جديدًا.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/lessons">
                عرض الكل
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الدرس</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-right">التقدم</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentProgress.slice(0, 5).map((progress) => {
                  const lesson = lessons.find((l) => l.id === progress.lessonId);
                  if (!lesson) return null;
                  return (
                    <TableRow key={lesson.id}>
                      <TableCell>
                        <div className="font-medium">{lesson.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {lesson.grade}
                        </div>
                      </TableCell>
                      <TableCell>
                         <Badge variant={progress.completed ? 'default' : 'secondary'} className={progress.completed ? 'bg-green-600' : ''}>
                          {progress.completed ? 'مكتمل' : 'قيد التقدم'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Link href={`/lessons/${lesson.id}`} passHref>
                          <Button size="sm" variant="outline">
                            {progress.completed ? 'مراجعة' : 'ابدأ'}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         ) : (
          <Card>
            <CardHeader>
              <CardTitle>ابدأ رحلتك التعليمية</CardTitle>
              <CardDescription>
                لا يوجد لديك أي تقدم حتى الآن. اختر درسًا من المكتبة للبدء.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/lessons">تصفح كل الدروس</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
