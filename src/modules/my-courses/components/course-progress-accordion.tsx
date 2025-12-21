'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { Checkbox } from '@/modules/shared/components/ui/checkbox'

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

interface CourseProgressAccordionProps {
  sections: Section[]
  selectedLessonId?: string
  watchedLessons?: Set<string>
  onLessonClick: (lessonId: string) => void
  onCheckboxClick?: (lessonId: string) => void
}

export function CourseProgressAccordion({
  sections,
  selectedLessonId,
  watchedLessons = new Set(),
  onLessonClick,
  onCheckboxClick,
}: CourseProgressAccordionProps) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="overflow-hidden rounded-xl border backdrop-blur-sm transition-all last:border-b"
        >
          <AccordionTrigger className="cursor-pointer px-4 py-4 hover:no-underline sm:px-6 sm:py-5">
            <div className="flex w-full items-start justify-between gap-3 pr-2 sm:pr-4">
              <span className="text-left text-sm leading-snug font-semibold sm:text-base">
                {section.title}
              </span>
              <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap sm:text-sm">
                {section.classesCount} clases
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3 sm:px-6 sm:pb-4">
            <div className="space-y-1.5 pt-2">
              {section.lessons.map((lesson) => {
                const isSelected = selectedLessonId === lesson.id
                const isWatched = watchedLessons.has(lesson.id)

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onLessonClick(lesson.id)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2.5 transition-all sm:px-4 sm:py-3 ${
                      isSelected
                        ? 'border-primary/50 bg-primary/10 shadow-primary/10 shadow-md'
                        : 'border-transparent hover:border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8">
                        <Checkbox
                          checked={isWatched}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onCheckboxClick) {
                              onCheckboxClick(lesson.id)
                            }
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <span
                          className={`truncate text-xs font-medium sm:text-sm ${
                            isSelected
                              ? 'text-primary font-semibold'
                              : isWatched
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {lesson.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                      <span className="text-muted-foreground min-w-12 rounded-md bg-white/5 px-1.5 py-0.5 text-center text-[10px] font-medium sm:min-w-14 sm:px-2 sm:py-1 sm:text-xs">
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
