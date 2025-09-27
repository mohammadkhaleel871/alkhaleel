'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { grades as staticGrades } from '@/lib/mock-data';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { AddLessonForm } from '@/components/add-lesson-form';
import type { Grade, Lesson } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // State for dialogs
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  useEffect(() => {
    // We can only access localStorage on the client side
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      setAllLessons(JSON.parse(storedLessons));
    }
    setIsMounted(true); // Component is mounted and can safely access localStorage
  }, []);

  const updateLocalStorage = (lessons: Lesson[]) => {
    localStorage.setItem('lessons', JSON.stringify(lessons));
    setAllLessons(lessons);
  };

  const handleAddClick = (grade: Grade) => {
    setSelectedGrade(grade);
    setLessonToEdit(null);
    setIsAddEditDialogOpen(true);
  };

  const handleEditClick = (lesson: Lesson) => {
    const gradeOfLesson = staticGrades.find(g => g.name === lesson.grade);
    setSelectedGrade(gradeOfLesson || null);
    setLessonToEdit(lesson);
    setIsAddEditDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (!lessonToDelete) return;
    const updatedLessons = allLessons.filter(l => l.id !== lessonToDelete.id);
    updateLocalStorage(updatedLessons);
    toast({
      title: 'تم الحذف',
      description: `تم حذف درس "${lessonToDelete.title}".`,
    });
    setLessonToDelete(null);
  }

  const onLessonSubmit = (lessonData: Lesson) => {
     if (lessonToEdit) {
      // Editing existing lesson
      const updatedLessons = allLessons.map(l => l.id === lessonData.id ? lessonData : l);
      updateLocalStorage(updatedLessons);
    } else {
      // Adding new lesson
      const updatedLessons = [...allLessons, lessonData];
      updateLocalStorage(updatedLessons);
    }
    setIsAddEditDialogOpen(false);
    setLessonToEdit(null);
  };
  
  const getLessonsForGrade = (gradeName: string) => {
      return allLessons.filter(lesson => lesson.grade === gradeName);
  }

  if (!isMounted) {
    return <div>جارٍ التحميل...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المناهج</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          إضافة صف جديد
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {staticGrades.map((grade) => (
          <AccordionItem value={`item-${grade.id}`} key={grade.id}>
            <AccordionTrigger className="text-lg font-medium">
              {grade.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 p-2">
                {getLessonsForGrade(grade.name).length > 0 ? (
                  getLessonsForGrade(grade.name).map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{lesson.title}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(lesson)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setLessonToDelete(lesson)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground p-3">
                    لا توجد دروس في هذا الصف.
                  </p>
                )}
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => handleAddClick(grade)}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  إضافة درس جديد إلى {grade.name}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {lessonToEdit ? `تعديل درس: ${lessonToEdit.title}` : `إضافة درس جديد إلى ${selectedGrade?.name}`}
            </DialogTitle>
          </DialogHeader>
          {selectedGrade && <AddLessonForm grade={selectedGrade} onLessonSubmit={onLessonSubmit} existingLesson={lessonToEdit} />}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
       <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف درس "{lessonToDelete?.title}" نهائيًا. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLessonToDelete(null)}>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>متابعة الحذف</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
