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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { lessons, studentProgress } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export default function Dashboard() {
  const completedLessons = studentProgress.filter(
    (p) => p.completed
  ).length;
  const totalLessons = lessons.length;
  const overallProgress = (completedLessons / totalLessons) * 100;
  const averageScore =
    studentProgress
      .filter((p) => p.quizScore !== null)
      .reduce((acc, p) => acc + p.quizScore!, 0) /
      studentProgress.filter((p) => p.quizScore !== null).length || 0;

  const recentActivity = studentProgress
    .slice()
    .sort((a, b) => (a.lastActivity && b.lastActivity ? new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime() : -1))
    .slice(0, 3);
    
  const suggestedLessons = lessons.slice(0, 2);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedLessons} of {totalLessons} lessons completed
            </p>
            <Progress value={overallProgress} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Quiz Score
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all completed quizzes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentActivity.length > 0 ? lessons.find(l => l.id === recentActivity[0].lessonId)?.title : 'No Activity'}
            </div>
            <p className="text-xs text-muted-foreground">
              {recentActivity.length > 0 ? `Score: ${recentActivity[0].quizScore || 'N/A'}` : 'Start a lesson to see your activity'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center">
             <div className="grid gap-2">
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Pick up where you left off or start a new lesson.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/lessons">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lesson</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
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
                          {progress.completed ? 'Completed' : 'In Progress'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Link href={`/lessons/${lesson.id}`} passHref>
                          <Button size="sm" variant="outline">
                            {progress.completed ? 'Review' : 'Start'}
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
        <Card>
           <CardHeader>
            <CardTitle>Suggested For You</CardTitle>
            <CardDescription>
              Lessons picked to expand your knowledge.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
           {suggestedLessons.map(lesson => {
              const lessonImage = PlaceHolderImages.find(p => p.id === lesson.imageId);
              return (
                 <div key={lesson.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-12 w-12 sm:flex rounded-md">
                     {lessonImage && <AvatarImage data-ai-hint={lessonImage.imageHint} src={lessonImage.imageUrl} alt={lesson.title} className="rounded-md"/>}
                    <AvatarFallback className="rounded-md">{lesson.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {lesson.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{lesson.grade}</p>
                  </div>
                  <div className="ml-auto font-medium">
                     <Link href={`/lessons/${lesson.id}`} passHref>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              )
           })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
