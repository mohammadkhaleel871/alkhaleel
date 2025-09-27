'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Grade } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info } from 'lucide-react';

interface AddLessonFormProps {
  grade: Grade;
  onLessonAdded: () => void;
}

export function AddLessonForm({ grade, onLessonAdded }: AddLessonFormProps) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [unit, setUnit] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !videoUrl || !unit) {
      toast({
        title: 'خطأ',
        description: 'الرجاء ملء جميع الحقول.',
        variant: 'destructive',
      });
      return;
    }
    // In a real application, you would send this data to your server/database.
    console.log({
      title,
      summary,
      videoUrl,
      unit,
      grade: grade.name,
    });
    toast({
      title: 'تمت الإضافة بنجاح',
      description: `تمت إضافة درس "${title}" إلى ${grade.name}.`,
    });
    onLessonAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>ملاحظة</AlertTitle>
        <AlertDescription>
          هذا نموذج تجريبي. الدروس المضافة لن يتم حفظها بشكل دائم.
        </AlertDescription>
      </Alert>
      <div className="space-y-2">
        <Label htmlFor="title">عنوان الدرس</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: مقدمة في الجبر"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">ملخص الدرس</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="اكتب وصفًا موجزًا للدرس..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">رابط الفيديو (Embed URL)</Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/embed/..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="unit">الوحدة</Label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger id="unit">
            <SelectValue placeholder="اختر وحدة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الوحدة الأولى">الوحدة الأولى</SelectItem>
            <SelectItem value="الوحدة الثانية">الوحدة الثانية</SelectItem>
            <SelectItem value="الوحدة الثالثة">الوحدة الثالثة</SelectItem>
            <SelectItem value="الوحدة الرابعة">الوحدة الرابعة</SelectItem>
            <SelectItem value="الوحدة الخامسة">الوحدة الخامسة</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        إضافة الدرس
      </Button>
    </form>
  );
}
