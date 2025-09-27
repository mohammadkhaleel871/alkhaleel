import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { grades, lessons } from '@/lib/mock-data';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';

export default function AdminPage() {
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
        {grades.map((grade) => (
          <AccordionItem value={`item-${grade.id}`} key={grade.id}>
            <AccordionTrigger className="text-lg font-medium">
              {grade.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 p-2">
                {grade.lessons.length > 0 ? (
                  grade.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium">{lesson.title}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
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
                 <Button variant="outline" className="mt-4 w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  إضافة درس جديد إلى {grade.name}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
