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
import { AddLessonForm } from '@/components/add-lesson-form';
import type { Grade, Lesson } from '@/lib/types';

export default function AdminPage() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    // We can only access localStorage on the client side
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      setAllLessons(JSON.parse(storedLessons));
    }
  }, []);
  
  const handleAddLessonClick = (grade: Grade) => {
    setSelectedGrade(grade);
    setIsDialogOpen(true);
  };

  const onLessonAdded = (newLesson: Lesson) => {
    const updatedLessons = [...allLessons, newLesson];
    setAllLessons(updatedLessons);
    localStorage.setItem('lessons', JSON.stringify(updatedLessons));
    setIsDialogOpen(false);
  };
  
  const getLessonsForGrade = (gradeName: string) => {
      return allLessons.filter(lesson => lesson.grade === gradeName);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                    onClick={() => handleAddLessonClick(grade)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    إضافة درس جديد إلى {grade.name}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة درس جديد إلى {selectedGrade?.name}</DialogTitle>
          </DialogHeader>
          {selectedGrade && <AddLessonForm grade={selectedGrade} onLessonAdded={onLessonAdded} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
