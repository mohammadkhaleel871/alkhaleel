
'use client';

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { grades as staticGrades } from '@/lib/mock-data';
import { Edit, PlusCircle, Trash2, BookOpen, Library, GraduationCap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AddLessonForm } from '@/components/add-lesson-form';
import type { Grade, Lesson } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { BackButton } from '@/components/layout/back-button';
import { addLesson, deleteLesson, getAllLessons, updateLesson } from '@/lib/lessons-firestore';
import { Loader2 } from 'lucide-react';

// A dummy grade object for non-curriculum categories
const nonCurriculumGrade: Grade = { id: 'general', name: 'عام' };

export function AdminDashboard({ initialLessons }: { initialLessons: Lesson[] }) {
  const { toast } = useToast();
  const [allLessons, setAllLessons] = useState<Lesson[]>(initialLessons);
  const [isLoading, setIsLoading] = useState(true);

  // State for dialogs
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState<Lesson['category']>('jordanian-curriculum');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    setIsLoading(true);
    try {
      // Fetch all lessons from all categories in parallel
      const [curriculumLessons, generalLessons, libraryLessons] = await Promise.all([
        getAllLessons('jordanian-curriculum'),
        getAllLessons('general-lessons'),
        getAllLessons('library')
      ]);
      setAllLessons([...curriculumLessons, ...generalLessons, ...libraryLessons]);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
      toast({
        title: 'خطأ في جلب البيانات',
        description: 'لا يمكن الوصول إلى قاعدة البيانات حاليًا. قد تكون هناك مشكلة في الاتصال.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddClick = (grade: Grade, category: Lesson['category']) => {
    setSelectedGrade(grade);
    setLessonToEdit(null);
    setDefaultCategory(category);
    setIsAddEditDialogOpen(true);
  };

  const handleEditClick = (lesson: Lesson) => {
    const gradeOfLesson = staticGrades.find(g => g.name === lesson.grade) || nonCurriculumGrade;
    setSelectedGrade(gradeOfLesson);
    setLessonToEdit(lesson);
    setDefaultCategory(lesson.category);
    setIsAddEditDialogOpen(true);
  };
  
  const handleDeleteClick = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setIsDeleteAlertOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return;
    try {
        await deleteLesson(lessonToDelete.id);
        toast({
        title: 'تم الحذف',
        description: `تم حذف "${lessonToDelete.title}".`,
        });
        fetchLessons(); // Refetch lessons
    } catch(e) {
         toast({
            title: 'خطأ',
            description: 'فشل حذف الدرس.',
            variant: 'destructive',
        });
    }
    setLessonToDelete(null);
    setIsDeleteAlertOpen(false);
  }

  const onLessonSubmit = async (lessonData: Lesson, isEditing: boolean) => {
    if (lessonData.category !== 'jordanian-curriculum') {
        lessonData.grade = 'عام';
    }

    try {
        if (isEditing) {
            await updateLesson(lessonData);
        } else {
            await addLesson(lessonData);
        }
        await fetchLessons(); 
    } catch (e) {
        toast({
            title: 'خطأ',
            description: 'فشل حفظ الدرس.',
            variant: 'destructive',
        });
    } finally {
        setIsAddEditDialogOpen(false);
        setLessonToEdit(null);
    }
  };
  
  const getLessonsForCategory = (category: Lesson['category']) => {
      return allLessons.filter(lesson => lesson.category === category);
  }

  const getLessonsForGrade = (gradeName: string) => {
      return allLessons.filter(lesson => lesson.grade === gradeName && lesson.category === 'jordanian-curriculum');
  }

  const renderLessonList = (lessons: Lesson[]) => {
      if (lessons.length === 0 && !isLoading) {
          return <p className="text-muted-foreground p-3">لا يوجد محتوى في هذا القسم.</p>;
      }
      return lessons.map((lesson) => (
            <div
                key={lesson.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
                <span className="font-medium">{lesson.title}</span>
                <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditClick(lesson)}>
                    <Edit className="h-4 w-4" />
                </Button>
                
                    <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteClick(lesson)}
                    >
                    <Trash2 className="h-4 w-4" />
                    </Button>
                
                </div>
            </div>
        ));
  }


  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
      </div>

      <Accordion type="multiple" className="w-full space-y-4" defaultValue={['item-curriculum']}>
        {/* Jordanian Curriculum Section */}
        <AccordionItem value="item-curriculum" className="border rounded-lg">
            <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary"/>
                    المنهاج الأردني
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-2">
                <Accordion type="single" collapsible className="w-full">
                    {staticGrades.map((grade) => (
                    <AccordionItem value={`item-${grade.id}`} key={grade.id}>
                        <AccordionTrigger className="font-medium">
                        {grade.name}
                        </AccordionTrigger>
                        <AccordionContent>
                        <div className="flex flex-col gap-4 p-2">
                            {renderLessonList(getLessonsForGrade(grade.name))}
                            <Button
                                variant="outline"
                                className="mt-4 w-full"
                                onClick={() => handleAddClick(grade, 'jordanian-curriculum')}
                            >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            إضافة درس جديد إلى {grade.name}
                            </Button>
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </AccordionContent>
        </AccordionItem>
        
        {/* General Lessons Section */}
        <AccordionItem value="item-general" className="border rounded-lg">
            <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline">
                 <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary"/>
                    الدروس العامة
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col gap-4 p-4">
                    {renderLessonList(getLessonsForCategory('general-lessons'))}
                    <Button
                        variant="outline"
                        className="mt-4 w-full"
                        onClick={() => handleAddClick(nonCurriculumGrade, 'general-lessons')}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        إضافة درس عام جديد
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* Library Section */}
         <AccordionItem value="item-library" className="border rounded-lg">
            <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline">
                 <div className="flex items-center gap-3">
                    <Library className="h-6 w-6 text-primary"/>
                    المكتبة
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-col gap-4 p-4">
                    {renderLessonList(getLessonsForCategory('library'))}
                    <Button
                        variant="outline"
                        className="mt-4 w-full"
                        onClick={() => handleAddClick(nonCurriculumGrade, 'library')}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        إضافة مورد جديد للمكتبة
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {lessonToEdit ? `تعديل: ${lessonToEdit.title}` : `إضافة محتوى جديد`}
            </DialogTitle>
          </DialogHeader>
          {selectedGrade && <AddLessonForm grade={selectedGrade} onLessonSubmit={onLessonSubmit} existingLesson={lessonToEdit} defaultCategory={defaultCategory} />}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
       <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف "{lessonToDelete?.title}" نهائيًا. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>متابعة الحذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

    