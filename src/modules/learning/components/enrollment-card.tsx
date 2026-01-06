'use client'

import { useRouter } from 'next/navigation'
import { Play } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import Link from 'next/link'
import CustomImage from '@/modules/shared/components/custom-image'
import { Enrollment } from './enrollments-container'

interface Props {
  enrollment: Enrollment
}

export function EnrollmentCard({ enrollment }: Props) {
  const { push } = useRouter()
  const progress = enrollment.progress ?? 0

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => push(`/learning/${enrollment.courseId}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          push(`/learning/${enrollment.courseId}`)
        }
      }}
      className="group bg-card hover:border-primary transition-color flex h-32 cursor-pointer flex-col overflow-hidden rounded-none border pt-0 shadow-none duration-300 max-sm:flex-row sm:h-full sm:max-h-90"
    >
      <div className="bg-muted/40 relative aspect-video w-full max-sm:size-32">
        <CustomImage
          src={enrollment.courseImageUrl}
          alt={enrollment.courseTitle}
          fill
          className="object-cover max-sm:object-center"
        />
      </div>

      <div className="flex flex-col gap-5 p-5 max-sm:my-auto max-sm:p-2 w-full">
        <h3 className="text-foreground line-clamp-2 text-base leading-tight font-semibold max-sm:text-xs">
          {enrollment.courseTitle}
        </h3>

        <div className="flex items-center justify-between gap-4 w-full">
          <div className="relative size-12 shrink-0 max-sm:size-10">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted"
                strokeWidth="3.5"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary"
                strokeWidth="3.5"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-primary flex-center absolute inset-0 text-xs">
              {progress}
            </div>
          </div>

          <Button asChild className="gap-3 rounded-none px-3">
            <Link href={`/learning/${enrollment.courseId}`}>
              <Play className="size-4" />
              {progress > 0 ? 'Continuar' : 'Ver curso'}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
