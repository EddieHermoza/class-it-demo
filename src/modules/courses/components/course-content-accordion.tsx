'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Eye, Play } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'

interface Lesson {
  id: string
  title: string
  duration: string
  isPreview?: boolean
  type: 'video'
}

interface Section {
  id: string
  title: string
  classesCount: number
  duration: string
  lessons: Lesson[]
}

interface CourseContentAccordionProps {
  sections: Section[]
  onPreviewClick: (lessonId: string) => void
}

export function CourseContentAccordion({
  sections,
  onPreviewClick,
}: CourseContentAccordionProps) {
  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return <Play className="text-primary size-4" />
    }
  }

  return (
    <Accordion type="multiple" className="space-y-3">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="overflow-hidden rounded-xl border backdrop-blur-sm transition-all last:border-b"
        >
          <AccordionTrigger className="cursor-pointer px-6 py-5 hover:no-underline">
            <div className="flex w-full items-center justify-between pr-4">
              <span className="text-left text-base font-semibold">
                {section.title}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm whitespace-nowrap">
                  {section.classesCount} clases
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-1.5 pt-2">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all hover:border-white/5 hover:bg-white/10"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="icon-group hover:bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 transition-colors hover:cursor-pointer">
                      {getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {lesson.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    {lesson.isPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPreviewClick(lesson.id)}
                        className="hover:bg-primary/20 hover:text-primary h-8 border border-transparent px-3 text-xs transition-all"
                      >
                        <Eye className="size-4" />
                        Vista previa
                      </Button>
                    )}
                    <span className="text-muted-foreground min-w-14 rounded-md bg-white/5 px-2 py-1 text-center text-xs font-medium">
                      {lesson.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
