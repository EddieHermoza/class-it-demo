'use client'

import type React from 'react'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, Clock, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { CourseInterface } from '@/__mocks__'
import { Spinner } from '@/modules/shared/components/ui/spinner'

interface CourseCardProps {
  course: CourseInterface
  isInProfile?: boolean
  onToggleProfile?: (courseId: string) => void
}

const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Principiante',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
}

export function CourseCard({
  course,
  isInProfile = false,
  onToggleProfile,
}: CourseCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenDetails = () => {
    router.push(`/courses/${course.id}`)
  }

  const handleToggleProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    const wasInProfile = isInProfile

    setTimeout(() => {
      onToggleProfile?.(course.id)
      setIsLoading(false)

      if (wasInProfile) {
        toast.warning('Curso eliminado exitosamente', {
          description: `${course.title} ha sido eliminado de tu perfil`,
        })
      } else {
        toast.success('Curso agregado exitosamente', {
          description: `${course.title} ha sido agregado a tu perfil`,
        })
      }
    }, 1000)
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
      className={`group cursor-pointer overflow-hidden py-0 transition-all duration-300 hover:shadow-xl ${
        isInProfile
          ? 'border-primary/70 hover:border-primary shadow-primary/10 shadow-lg'
          : 'border-border/50 hover:border-primary/50 hover:shadow-primary/5'
      }`}
    >
      <div className="bg-muted relative aspect-video overflow-hidden">
        <Image
          src={course.imageUrl || '/placeholder.svg'}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute top-2 ${isInProfile ? 'right-2' : 'right-2'}`}
        >
          <Badge
            variant="secondary"
            className="bg-background/90 py-0.5 text-xs shadow-lg backdrop-blur-sm"
          >
            {LEVEL_LABELS[course.level] || course.level}
          </Badge>
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

          <div className="flex shrink-0 items-center gap-3 text-xs">
            <div className="flex items-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
              <span className="font-semibold">
                {course.avgRating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({course.reviewsCount})
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.estimatedDuration}h</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleToggleProfile}
          variant={isInProfile ? 'outline' : 'default'}
          disabled={isLoading}
          className={`w-full transition-all ${
            isInProfile
              ? 'border-primary/50 hover:bg-primary/10 hover:border-primary'
              : 'bg-primary hover:bg-primary/90'
          }`}
          size="lg"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-sm">
                {isInProfile ? 'Eliminando curso...' : 'Agregando curso...'}
              </span>
            </>
          ) : isInProfile ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-sm">Agregado</span>
            </>
          ) : (
            <>
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              <span className="text-sm">Agregar a mi perfil</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
