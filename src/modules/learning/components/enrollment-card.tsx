'use client'

import { useRouter } from 'next/navigation'
import { Play } from 'lucide-react'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { Progress } from '@/modules/shared/components/ui/progress'
import Link from 'next/link'
import CustomImage from '@/modules/shared/components/custom-image'
import { Enrollment } from './enrollments-container'

interface Props {
  enrollment: Enrollment
}

export function EnrollmentCard({ enrollment }: Props) {
  const { push } = useRouter()

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => push(`/learning/${enrollment.courseId}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          push(`/learning/${enrollment.courseId}`)
        }
      }}
      className="group border-border/50 hover:border-primary/50 hover:shadow-primary/5 cursor-pointer overflow-hidden rounded-none py-0 transition-all duration-300 hover:shadow-xl"
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        <CustomImage
          src={enrollment.courseImageUrl}
          alt={enrollment.courseTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <CardContent className="space-y-2.5 p-3">
        <div className="space-y-1.5">
          <h3 className="group-hover:text-primary line-clamp-2 text-base leading-tight font-semibold text-balance transition-colors">
            {enrollment.courseTitle}
          </h3>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Progreso</span>
            <span className="text-primary font-semibold">
              {enrollment.progress}%
            </span>
          </div>
          <Progress value={enrollment.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarImage
                src={enrollment.teacherFullName || '/placeholder.svg'}
                alt={enrollment.teacherFullName}
              />
              <AvatarFallback className="text-xs">
                {enrollment.teacherFullName.split('')[0]}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {enrollment.teacherFullName}
            </span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`learning/${enrollment.courseId}`}>
            <Play className="mr-1.5 h-3.5 w-3.5" />
            <span className="text-sm">Ver Curso</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
