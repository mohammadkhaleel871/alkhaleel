
import { getAllLessons } from '@/lib/lessons-firestore';
import { AdminDashboard } from '@/components/admin-dashboard';

export default async function AdminPage() {
  const allLessons = await getAllLessons();

  return <AdminDashboard initialLessons={allLessons} />;
}
