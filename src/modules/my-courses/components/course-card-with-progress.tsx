'use client'

import Image from 'next/image'
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
import { CourseInterface } from '@/__mocks__'

interface CourseCardWithProgressProps {
  course: CourseInterface
  progress: number
  buttonText?: string
}

export function CourseCardWithProgress({
  course,
  progress,
  buttonText = 'Continuar viendo',
}: CourseCardWithProgressProps) {
  const router = useRouter()

  const handleOpenDetails = () => {
    router.push(`/my-courses/${course.id}`)
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpenDetails()
        }
      }}
      className="group border-border/50 hover:border-primary/50 hover:shadow-primary/5 cursor-pointer overflow-hidden py-0 transition-all duration-300 hover:shadow-xl"
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        <Image
          src={course.imageUrl || '/placeholder.svg'}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute right-0 bottom-0 left-0">
          <Progress
            value={progress}
            className="*:data-[slot=progress-indicator]:bg-primary h-1.5 *:data-[slot=progress]:bg-black/30"
          />
        </div>
      </div>

      <CardContent className="space-y-2.5 p-3">
        <div className="space-y-1.5">
          <h3 className="group-hover:text-primary line-clamp-2 text-base leading-tight font-semibold text-balance transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Progreso</span>
            <span className="text-primary font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarImage
                src={course.teacher.avatarUrl || '/placeholder.svg'}
                alt={course.teacher.name}
              />
              <AvatarFallback className="text-xs">
                {course.teacher.name[0]}
                {course.teacher.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {course.teacher.name} {course.teacher.lastName}
            </span>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            handleOpenDetails()
          }}
          className="bg-primary hover:bg-primary/90 w-full"
          size="lg"
        >
          <Play className="mr-1.5 h-3.5 w-3.5" />
          <span className="text-sm">{buttonText}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
