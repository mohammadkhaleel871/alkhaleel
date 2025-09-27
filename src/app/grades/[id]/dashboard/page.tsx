
import { GradeDashboardClient } from '@/components/grade-dashboard-client';
import { auth } from '@/lib/firebase';
import { getStudentProgress } from '@/lib/firestore';
import { getAllLessons } from '@/lib/lessons-firestore';
import { grades } from '@/lib/mock-data';
import { getCurrentUser } from '@/lib/get-current-user';
import { notFound } from 'next/navigation';

export default async function GradeDashboardPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const grade = grades.find((g) => g.id === params.id);
  
  if (!grade) {
    notFound();
  }

  // Fetch data on the server
  const allLessons = await getAllLessons();
  const studentProgress = user ? await getStudentProgress(user.uid) : [];

  const gradeLessons = allLessons.filter(l => l.grade === grade.name);

  return (
    <GradeDashboardClient 
      grade={grade} 
      allLessons={allLessons}
      gradeLessons={gradeLessons} 
      initialStudentProgress={studentProgress} 
    />
  );
}
