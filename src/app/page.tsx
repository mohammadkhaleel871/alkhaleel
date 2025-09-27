
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Library, Map } from 'lucide-react';
import Link from 'next/link';

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gold-gradient-pen" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" />
                    <stop offset="50%" stopColor="#F5B92D" />
                    <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="green-gradient-text" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
            </defs>

            {/* "الخليل" text with Amiri font */}
            <text x="100" y="50" fontFamily="'PT Sans', sans-serif" fontSize="56" fill="url(#green-gradient-text)" textAnchor="middle" dominantBaseline="middle">
                الخليل
            </text>
            
            {/* Golden Pen base */}
            <g fill="url(#gold-gradient-pen)">
                <path d="M45 75 H175 L165 85 H55 L45 75 Z" />
                <path d="M55 87 H165 L158 95 H62 L55 87 Z" />
                <path d="M95 97 L125 97 L110 112 L95 97 Z" />
            </g>
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
        {/* Hero and Sections Container */}
        <section className="relative w-full h-auto pt-0 pb-8 md:pb-12">
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

          <div className="relative flex flex-col items-center text-center p-4 pt-16 md:pt-24 max-w-4xl mx-auto z-10 min-h-[50vh] md:min-h-[65vh]">
            <div className="w-40 h-28 md:w-80 md:h-64">
              <LogoIcon className="w-full h-full" />
            </div>
            
            <p className="mt-4 text-3xl md:text-8xl font-medium text-white/90 font-headline">
              بوابتك المتكاملة لإتقان اللغة العربية.
            </p>
            <p className="mt-3 max-w-2xl mx-auto text-lg md:text-5xl text-white/70">
              دروس منهجية، موارد حصرية، واختبارات تفاعلية. كل ما تحتاجه في مكان واحد.
            </p>
          </div>

           {/* Core Sections Quick Access */}
          <div className="relative container mx-auto px-4 z-10 md:transform md:-translate-y-32">
            <div className="grid grid-cols-3 gap-2">
              {sections.map((section) => (
                <Link href={section.href} key={section.title} className="group">
                  <div className="relative text-center h-full p-4 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-secondary/50 bg-card hover:shadow-2xl hover:shadow-secondary/10 rounded-xl overflow-hidden">
                     {/* Decorative geometric background */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="geom" patternUnits="userSpaceOnUse" width="40" height="40"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="hsl(var(--secondary))" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#geom)"/></svg>
                    </div>
                    <div className="relative flex flex-col items-center justify-center h-full">
                        <div className="p-4 bg-secondary/10 rounded-full group-hover:scale-110 transition-transform border border-secondary/20">
                            {section.icon}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mt-4">{section.title}</h3>
                        <p className="mt-2 text-sm md:text-base text-muted-foreground">{section.description}</p>
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
