'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
      <ArrowRight className="h-4 w-4 ml-2" />
      رجوع
    </Button>
  );
}
