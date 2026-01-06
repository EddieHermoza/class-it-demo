'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/shared/components/ui/accordion'
import { formatDuration } from '@/lib/utils'
import { SectionPreview } from '../../types/sections.types'

interface Props {
  sections: SectionPreview[]
}
export function CourseFullContentPreviewAccordion({ sections }: Props) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const selectedLectureId = searchParams.get('lectureId')

  const handleLectureClick = (lectureId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('lectureId', lectureId)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Accordion type="multiple" className="">
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="overflow-hidden rounded-none border-t border-b-0 last:border-b border-x"
        >
          <AccordionTrigger className="hover:bg-secondary rounded-none p-4 hover:no-underline sm:px-6 ">
            <div className="flex w-full justify-between gap-3">
              <span className="text-sm font-semibold sm:text-base">
                {section.title}
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm">
                {section.lecturesCount} clases
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-3">
            <div className="space-y-1.5 pt-2">
              {section.lectures.map((l) => {
                const isSelected = selectedLectureId === l.id

                return (
                  <div
                    key={l.id}
                    onClick={() => handleLectureClick(l.id)}
                    className={`flex cursor-pointer items-center justify-between gap-2 border p-3 transition-all ${
                      isSelected
                        ? 'border-primary/50 bg-primary/10'
                        : 'hover:bg-secondary border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <span
                        className={`truncate text-xs sm:text-sm ${
                          isSelected ? '' : ''
                        }`}
                      >
                        {l.title}
                      </span>
                    </div>

                    <span className="text-muted-foreground min-w-14 rounded-md bg-white/5 px-2 py-1 text-center text-xs">
                      {formatDuration(l.duration)}
                    </span>
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
