
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookOpen, Library, Map } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-alkhalil');
  const sections = [
    {
      icon: <Map className="w-8 h-8 text-primary" />,
      title: 'المنهاج الأردني',
      description: 'دروس شاملة من الصف الخامس للتوجيهي.',
      href: '/lessons',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: 'الدروس العامة',
      description: 'النحو، الصرف، البلاغة، والشعر.',
      href: '/lessons',
    },
    {
      icon: <Library className="w-8 h-8 text-primary" />,
      title: 'المكتبة',
      description: 'ملخصات، أوراق عمل، ودوسيات.',
      href: '/library',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
             {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt="Al-Khalil bin Ahmed Al-Farahidi"
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
             )}
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              منصة الخليل
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-medium">
              بوابتك المتكاملة لإتقان اللغة العربية.
            </p>
            <p className="mt-2 max-w-2xl mx-auto text-base md:text-lg text-neutral-200">
              دروس منهجية، موارد حصرية، واختبارات تفاعلية. كل ما تحتاجه في مكان واحد.
            </p>
          </div>
        </section>

        {/* Core Sections Quick Access */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Link href={section.href} key={section.title} className="group">
                  <Card className="text-center h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 border-2 border-transparent hover:border-primary">
                    <CardHeader className="items-center">
                      <div className="p-3 bg-primary/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <CardTitle className="text-lg font-bold">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{section.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
       <footer className="bg-muted text-muted-foreground py-6">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center gap-4 mb-4">
                    <Link href="#" className="text-sm hover:text-primary">من نحن</Link>
                    <Link href="#" className="text-sm hover:text-primary">تواصل معنا</Link>
                    <Link href="#" className="text-sm hover:text-primary">سياسة الخصوصية</Link>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} منصة الخليل. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    </div>
  );
}
