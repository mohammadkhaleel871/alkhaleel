import type { Metadata } from 'next';
import { PT_Sans, Amiri } from 'next/font/google';
import { AppShell } from '@/components/layout/app-shell';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'الخليل',
  description: 'منصة تعليمية تفاعلية',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head />
      <body className={`${ptSans.variable} ${amiri.variable} font-body antialiased`}>
        <AuthProvider>
            <AppShell>{children}</AppShell>
            <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
