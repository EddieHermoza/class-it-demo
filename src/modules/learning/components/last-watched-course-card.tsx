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
    <div
      role="button"
      tabIndex={0}
      className="bg-card group border-border/50 hover:border-primary/50 hover:shadow-primary/5 relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-tl rounded-bl border duration-200"
      key={course.courseId}
    >
      <div className="bg-muted relative aspect-video h-32 overflow-hidden">
        <CustomImage
          src={course.courseImageUrl ?? ''}
          alt={course.courseTitle}
          fill
          className="object-cover duration-200 group-hover:scale-110"
        />
      </div>
      <div className="relative flex w-full items-center gap-4 p-2 sm:justify-between">
        <div className="relative w-full">
          <span className="font-semibold max-sm:text-xs">
            {course.courseTitle}
          </span>
          <div className="relative w-full">
            <span className="text-xs">{course.progress ?? 0}% completado</span>
            <Progress value={course.progress} className="w-full" />
          </div>
        </div>
        <Button
          asChild
          className="btn-cut flex-center gap-2 rounded-none max-sm:hidden"
        >
          <Link href={`/learning/${course.courseId}`}>
            <Play />
            Continuar
          </Link>
        </Button>
      </div>
    </div>
  )
}
