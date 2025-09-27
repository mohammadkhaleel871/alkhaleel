
import { BackButton } from '@/components/layout/back-button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { grades } from '@/lib/mock-data';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import type { Lesson } from '@/lib/types';
import { getAllLessons } from '@/lib/lessons-firestore';

export default async function GradesPage() {
    const allLessons = await getAllLessons();

    const getLessonCountForGrade = (gradeName: string) => {
        return allLessons.filter(lesson => lesson.grade === gradeName).length;
    }

  return (
    <div>
      <BackButton />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">المنهاج الأردني</h1>
        <p className="text-lg text-muted-foreground mt-2">اختر صفًا للبدء.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {grades.map((grade) => (
          <Link href={`/grades/${grade.id}/dashboard`} key={grade.id} className="group">
            <Card className="h-full transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-primary/20 group-hover:shadow-lg">
              <CardHeader className="text-center items-center">
                 <div className="p-4 bg-secondary/10 rounded-full mb-4 border border-secondary/20 transition-colors group-hover:bg-secondary/20 group-hover:border-secondary/40">
                    <GraduationCap className="w-10 h-10 text-secondary" />
                </div>
                <CardTitle className="text-xl">{grade.name}</CardTitle>
                <CardDescription>{getLessonCountForGrade(grade.name)} دروس</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
