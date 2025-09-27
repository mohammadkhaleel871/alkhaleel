
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
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');


export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/lessons', label: 'الدروس', icon: BookOpen },
    { href: '/library', label: 'المكتبة', icon: Library },
    { href: '/admin', label: 'المشرف', icon: Shield },
  ];

  const isHomePage = pathname === '/';
  // Always show app shell for a more consistent experience
  // if (isHomePage) {
  //   return <main>{children}</main>;
  // }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              خ
            </div>
            <span className="text-lg font-semibold">الخليل</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
                <Avatar className="h-10 w-10">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint} alt="User" />}
                    <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">الاستاذ خليل</span>
                    <span className="text-xs text-muted-foreground">khalil@example.com</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {isHomePage ? null : <Header />}
        <main className={isHomePage ? '' : "p-4 sm:p-6 lg:p-8"}>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
