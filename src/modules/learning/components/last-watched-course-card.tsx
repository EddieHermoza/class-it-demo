'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { Progress } from '@/modules/shared/components/ui/progress'
import { Play } from 'lucide-react'
import Link from 'next/link'
import CustomImage from '@/modules/shared/components/custom-image'
import { EnrolledCourse } from './last-watched-container'

interface Props {
  course: EnrolledCourse
}

export default function LastWatchedCourseCard({ course }: Props) {
  return (
    <article
      role="button"
      tabIndex={0}
      className="h-32 group border-border bg-card hover:border-primary/50 relative flex w-full items-center gap-4 border py-3 pr-3 max-sm:pl-3 transition hover:shadow-sm"
    >
      <div className="bg-muted relative h-32 w-32 shrink-0 overflow-hidden max-md:hidden">
        <CustomImage
          src={course.courseImageUrl}
          alt={course.courseTitle}
          fill
          className="object-cover"
        />
      </div>
      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <h3 className="truncate text-sm font-semibold">{course.courseTitle}</h3>

        <p className="text-muted-foreground truncate text-xs">
          Última lección: {course.lastLectureTitle}
        </p>

        <p className="text-muted-foreground text-[11px]">
          {course.teacherFullName}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <Progress value={course.progress} className="h-1.5 flex-1" />
          <span className="text-xs font-medium">{course.progress ?? 0}%</span>
        </div>
      </div>

      {/* CTA */}
      <Button asChild size="sm" className="shrink-0 gap-2 rounded-none">
        <Link
          href={`/learning/${course.courseId}?lectureId=${course.lastLectureId}`}
        >
          <Play className="size-4" />
          <span className="max-sm:hidden">Continuar</span>
        </Link>
      </Button>
    </article>
  )
}
