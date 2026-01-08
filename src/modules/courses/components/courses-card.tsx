'use client'

import { useRouter } from 'next/navigation'
import { Star, Clock, Plus, Check } from 'lucide-react'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import Link from 'next/link'
import { formatDuration, getCourseLevelLabel } from '@/lib/utils'
import CustomImage from '@/modules/shared/components/custom-image'
import { PublishedCourse } from './courses-container'

interface CourseCardProps {
  course: PublishedCourse
  isInProfile?: boolean
}

export function CourseCard({ course, isInProfile = false }: CourseCardProps) {
  const { push } = useRouter()

  const handleOpenDetails = () => {
    push(`/courses/${course.id}`)
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
      className={`bg-card group relative mx-auto mt-5 w-full cursor-pointer overflow-hidden rounded-none py-0 shadow-none duration-300 max-md:max-w-5/6 ${
        isInProfile
          ? 'border-primary/70 hover:border-primary shadow-primary/10 shadow-lg'
          : 'border-border/50 hover:border-primary/50 hover:shadow-primary/5'
      }`}
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        <CustomImage
          src={course.imageUrl}
          alt={course.title}
          fill
          className=""
        />
        <div
          className={`absolute top-2 ${isInProfile ? 'right-2' : 'right-2'}`}
        >
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            {getCourseLevelLabel(course.level)}
          </span>
        </div>
      </div>

      <CardContent className="space-y-2.5 p-3">
        <h3 className="line-clamp-2 text-base leading-tight font-semibold text-balance transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarImage
                src={course.teacherAvatarUrl}
                alt={course.teacherFullName}
              />
              <AvatarFallback className="bg-primary/80 text-primary-foreground text-xs">
                {course.teacherFullName.split('')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {course.teacherFullName}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-xs">
            {/* <div className="flex items-center gap-0.5">
              <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">
                {course.avgRating.toFixed(1)}
              </span>
            </div> */}
            <div className="text-muted-foreground flex items-center gap-1">
              <Clock className="size-3.5" />
              <span>{formatDuration(course.estimatedDuration)}</span>
            </div>
          </div>
        </div>

        <Button
          asChild
          variant={isInProfile ? 'outline' : 'default'}
          className={`btn-cut w-full rounded-none transition-all ${
            isInProfile
              ? 'border-primary/50 hover:bg-primary/10 hover:border-primary'
              : 'bg-primary hover:bg-primary/90'
          }`}
          size="lg"
        >
          {isInProfile ? (
            <Link href={''}>
              <Check className="mr-1.5 size-3.5" />
              <span className="text-sm">Agregado</span>
            </Link>
          ) : (
            <Link href={`/courses/${course.id}`}>
              <Plus className="mr-1.5 size-3.5" />
              <span className="text-sm">Agregar a mi perfil</span>
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
