
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Library, Map } from 'lucide-react';
import Link from 'next/link';

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="green-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="hsl(158, 80%, 40%)" />
                    <stop offset="100%" stopColor="hsl(158, 95%, 20%)" />
                </linearGradient>
            </defs>
            
            {/* Modern Kufi-inspired "Al-Khalil" */}
            <path 
                d="M165 75V45H155V75H145V45H135V80C135 82.7614 137.239 85 140 85H150C152.761 85 155 82.7614 155 80V75H165ZM125 45H115V85H125V45ZM105 45H95V85H105V45ZM85 75V45H75V80C75 82.7614 77.2386 85 80 85H85V75ZM65 45H55V85H65V45ZM45 45H35V85H45V45Z"
                fill="url(#green-gradient)"
            />

            {/* The "L" extending down to form the pen nib */}
            <path d="M135 80C135 82.7614 132.761 85 130 85H50L60 115H140L135 80Z" fill="#D4AF37"/>
            <path d="M65 108 L70 118" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M75 105 L80 115" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
    )
}

export default function HomePage() {
  const sections = [
    {
      icon: <Map className="w-10 h-10 text-secondary" />,
      title: 'المنهاج الأردني',
      description: 'دروس شاملة من الصف الخامس للتوجيهي.',
      href: '/lessons',
    },
    {
      icon: <BookOpen className="w-10 h-10 text-secondary" />,
      title: 'الدروس العامة',
      description: 'النحو، الصرف، البلاغة، والشعر.',
      href: '/lessons',
    },
    {
      icon: <Library className="w-10 h-10 text-secondary" />,
      title: 'المكتبة',
      description: 'ملخصات، أوراق عمل، ودوسيات.',
      href: '/library',
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-dvh flex items-center justify-center text-center overflow-hidden">
          {/* Background Texture & Overlay */}
          <div
            className="absolute inset-0 bg-background"
            style={{ 
              backgroundImage: 'url(/papyrus-dark.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
             }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-background"></div>
          </div>
        
          {/* Abstract Gold Stroke */}
          <div className="absolute inset-0 z-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-200 400 C 200 100, 1000 100, 1200 700 S 1600 800, 1600 800" stroke="url(#gold-stroke)" strokeWidth="150" strokeLinecap="round"/>
                  <defs>
                      <linearGradient id="gold-stroke" x1="0%" y1="50%" x2="100%" y2="50%">
                          <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0"/>
                          <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.7"/>
                          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0"/>
                      </linearGradient>
                  </defs>
              </svg>
          </div>

          <div className="relative z-10 p-4 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-64 h-40 md:w-80 md:h-48">
              <LogoIcon className="w-full h-full" />
            </div>
            
            <p className="mt-4 text-2xl md:text-3xl font-medium text-white/90">
              بوابتك المتكاملة لإتقان اللغة العربية.
            </p>
            <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg text-white/70">
              دروس منهجية، موارد حصرية، واختبارات تفاعلية. كل ما تحتاجه في مكان واحد.
            </p>
          </div>
        </section>

        {/* Core Sections Quick Access */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((section) => (
                <Link href={section.href} key={section.title} className="group">
                  <div className="relative text-center h-full p-8 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-secondary/50 bg-card hover:shadow-2xl hover:shadow-secondary/10 rounded-xl overflow-hidden">
                     {/* Decorative geometric background */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="geom" patternUnits="userSpaceOnUse" width="40" height="40"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="hsl(var(--secondary))" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#geom)"/></svg>
                    </div>
                    <div className="relative flex flex-col items-center justify-center h-full">
                        <div className="p-4 bg-secondary/10 rounded-full mb-4 group-hover:scale-110 transition-transform border border-secondary/20">
                            {section.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                        <p className="mt-2 text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
       <footer className="bg-card text-muted-foreground py-6 border-t border-border">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center gap-6 mb-4">
                    <Link href="#" className="text-sm hover:text-secondary transition-colors">من نحن</Link>
                    <Link href="#" className="text-sm hover:text-secondary transition-colors">تواصل معنا</Link>
                    <Link href="#" className="text-sm hover:text-secondary transition-colors">سياسة الخصوصية</Link>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} الخليل. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    </div>
  );
}
