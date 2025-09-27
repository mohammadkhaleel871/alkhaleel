
'use client';

import { useEffect, useState } from 'react';
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
import type { Grade, Lesson } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { grades } from '@/lib/mock-data';

interface AddLessonFormProps {
  grade: Grade; // Can be the real grade or a dummy one for non-curriculum
  onLessonSubmit: (lesson: Lesson, isEditing: boolean) => void;
  existingLesson?: Lesson | null;
}

export function AddLessonForm({ grade, onLessonSubmit, existingLesson }: AddLessonFormProps) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState<Lesson['category']>('jordanian-curriculum');
  const [selectedGradeName, setSelectedGradeName] = useState(grade.name);

  const { toast } = useToast();

  const isEditing = !!existingLesson;

  useEffect(() => {
    if (existingLesson) {
      setTitle(existingLesson.title);
      setSummary(existingLesson.summary);
      setVideoUrl(existingLesson.videoUrl);
      setUnit(existingLesson.unit);
      setCategory(existingLesson.category || 'jordanian-curriculum');
      setSelectedGradeName(existingLesson.grade);
    } else {
        // Reset form when adding a new lesson
        setTitle('');
        setSummary('');
        setVideoUrl('');
        setUnit('');
        setCategory(grade.id === 'general' ? 'general-lessons' : 'jordanian-curriculum'); // Pre-select category based on where 'add' was clicked
        setSelectedGradeName(grade.name);
    }
  }, [existingLesson, grade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !category) {
      toast({
        title: 'خطأ',
        description: 'الرجاء ملء الحقول المطلوبة (العنوان، الملخص، الفئة).',
        variant: 'destructive',
      });
      return;
    }
    
    if (category === 'jordanian-curriculum' && selectedGradeName === 'عام') {
         toast({
            title: 'خطأ',
            description: 'الرجاء اختيار صف دراسي صحيح لمحتوى المنهاج الأردني.',
            variant: 'destructive',
         });
         return;
    }

    const lessonData: Lesson = {
      id: existingLesson?.id || `lesson-${Date.now()}`,
      title,
      summary,
      videoUrl,
      unit: category === 'jordanian-curriculum' ? unit : '',
      grade: category === 'jordanian-curriculum' ? selectedGradeName : 'عام',
      quizId: existingLesson?.quizId || `q-${Date.now()}`,
      imageId: existingLesson?.imageId || 'lesson-algebra',
      category,
    };

    onLessonSubmit(lessonData, isEditing);
    
    toast({
      title: isEditing ? 'تم التعديل بنجاح' : 'تمت الإضافة بنجاح',
      description: isEditing ? `تم تعديل "${title}".` : `تمت إضافة "${title}".`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">الفئة</Label>
        <Select value={category} onValueChange={(value) => setCategory(value as Lesson['category'])}>
          <SelectTrigger id="category">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jordanian-curriculum">المنهاج الأردني</SelectItem>
            <SelectItem value="general-lessons">الدروس العامة</SelectItem>
            <SelectItem value="library">المكتبة</SelectItem>
          </SelectContent>
        </Select>
      </div>
       <div className="space-y-2">
        <Label htmlFor="title">العنوان</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="مثال: مقدمة في الشعر الجاهلي"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">الملخص</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="اكتب وصفًا موجزًا للمحتوى..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videoUrl">رابط الفيديو (اختياري)</Label>
        <Input
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/embed/..."
        />
      </div>
      {category === 'jordanian-curriculum' && (
        <>
            <div className="space-y-2">
                <Label htmlFor="grade-select">الصف</Label>
                <Select value={selectedGradeName} onValueChange={setSelectedGradeName} required>
                    <SelectTrigger id="grade-select">
                        <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                        {grades.map(g => (
                            <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="unit">الوحدة (اختياري)</Label>
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
                     <SelectItem value="الوحدة السادسة">الوحدة السادسة</SelectItem>
                    <SelectItem value="الوحدة السابعة">الوحدة السابعة</SelectItem>
                    <SelectItem value="الوحدة الثامنة">الوحدة الثامنة</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </>
      )}
      <Button type="submit" className="w-full">
        {existingLesson ? 'حفظ التعديلات' : 'إضافة المحتوى'}
      </Button>
    </form>
  );
}

    