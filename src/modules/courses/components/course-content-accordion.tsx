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
          <AccordionTrigger className="cursor-pointer px-4 py-4 hover:no-underline sm:px-6 sm:py-5">
            <div className="flex w-full items-center justify-between pr-2 sm:pr-4">
              <span className="text-left text-sm font-semibold sm:text-base">
                {section.title}
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-muted-foreground text-xs whitespace-nowrap sm:text-sm">
                  {section.classesCount} clases
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3 sm:px-6 sm:pb-4">
            <div className="space-y-1.5 pt-2">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 transition-all hover:border-white/5 hover:bg-white/10 sm:px-4 sm:py-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                    <div className="icon-group hover:bg-primary/10 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/5 transition-colors hover:cursor-pointer sm:h-8 sm:w-8">
                      {getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="truncate text-xs font-medium sm:text-sm">
                        {lesson.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    {lesson.isPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPreviewClick(lesson.id)}
                        className="hover:bg-primary/20 hover:text-primary h-7 border border-transparent px-2 text-[10px] transition-all sm:h-8 sm:px-3 sm:text-xs"
                      >
                        <Eye className="size-3 sm:size-4" />
                        <span className="hidden sm:inline">Vista previa</span>
                      </Button>
                    )}
                    <span className="text-muted-foreground min-w-12 rounded-md bg-white/5 px-1.5 py-0.5 text-center text-[10px] font-medium sm:min-w-14 sm:px-2 sm:py-1 sm:text-xs">
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
