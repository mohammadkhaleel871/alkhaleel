'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { grades } from '@/lib/mock-data';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');


function getTitle(pathname: string) {
    if (pathname.startsWith('/admin/insights')) return 'رؤى الأداء';
    if (pathname.startsWith('/admin')) return 'إدارة المناهج';
    if (pathname.startsWith('/grades/')) {
        const parts = pathname.split('/');
        const gradeId = parts[2];
        const grade = grades.find(g => g.id === gradeId);
        if (grade) {
            return `لوحة تحكم: ${grade.name}`;
        }
    }
    if (pathname.startsWith('/grades')) return 'المنهاج الأردني';
    if (pathname.startsWith('/lessons/')) {
        if (pathname.endsWith('/quiz')) {
            return 'الاختبار';
        }
        return 'تفاصيل الدرس';
    }
    if (pathname.startsWith('/lessons')) return 'كل الدروس';
    if (pathname.startsWith('/library')) return 'المكتبة';
    if (pathname.startsWith('/dashboard')) return 'لوحة التحكم';
    if (pathname === '/') return 'منصة الخليل';

    return 'الخليل';
}

export function Header() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:flex hidden" />
      </div>
       <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
       <Link href="/" className="flex items-center gap-2 font-bold text-lg md:hidden">
          <div className="w-6 h-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-base">
              خ
          </div>
          <span>الخليل</span>
        </Link>
      <h1 className="text-lg font-semibold md:text-xl hidden md:block">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint} alt="User" />}
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>حسابي</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>الإعدادات</DropdownMenuItem>
            <DropdownMenuItem>الدعم</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
