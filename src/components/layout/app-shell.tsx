
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Home,
  LayoutDashboard,
  Library,
  Settings,
  Shield,
  LogOut,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const menuItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/lessons', label: 'الدروس', icon: BookOpen },
    { href: '/library', label: 'المكتبة', icon: Library },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
             <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <span>الخليل</span>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/admin')}
                  tooltip={'المشرف'}
                >
                  <Link href={'/admin'}>
                    <Shield />
                    <span>{'المشرف'}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            {loading ? (
                <div className="flex items-center gap-3 p-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            ) : user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="w-full justify-start items-center gap-3 p-2 h-auto">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start text-right">
                                <span className="text-sm font-semibold">{user.displayName}</span>
                                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="ml-2 h-4 w-4" />
                            <span>الملف الشخصي</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <Settings className="ml-2 h-4 w-4" />
                            <span>الإعدادات</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="ml-2 h-4 w-4" />
                            <span>تسجيل الخروج</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                 <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>ز</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">زائر</span>
                    </div>
                </div>
            )}
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        {pathname !== '/' && <Header />}
        <main className={pathname !== '/' ? 'p-4 sm:p-6 lg:p-8 flex-1' : 'flex-1'}>{children}</main>
      </div>
    </SidebarProvider>
  );
}
