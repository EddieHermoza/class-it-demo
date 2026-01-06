'use client'

import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { Star, Clock, ArrowRight } from 'lucide-react'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import CustomImage from '../shared/components/custom-image'
import { formatDuration, getCourseLevelLabel } from '@/lib/utils'

export type PublishedCourseResponseDto = {
  id: string
  title: string
  description: string
  shortDescription: string
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS'
  imageUrl: string
  estimatedDuration: number
  teacherFullName: string
  teacherAvatarUrl: string
  avgRating: number
}

interface GetCoursesResponse {
  data: PublishedCourseResponseDto[]
  total: number
  totalPages: number
}

interface CoursesGridProps {
  maxVisible?: number
  title?: string
  subtitle?: string
}

export default function CoursesGrid({
  maxVisible = 9,
  title = 'Cursos más populares',
  subtitle = 'Lo que miles de estudiantes están aprendiendo ahora',
}: CoursesGridProps = {}) {
  const { data, isLoading, error } = useApiFetch<GetCoursesResponse>(
    '/api/V1/courses/published',
    { page: 1, limit: maxVisible + 3 }
  )

  const courses = data?.data ?? []
  const totalCourses = data?.total ?? 0
  const visibleCourses = courses.slice(0, maxVisible)
  const hasMore = totalCourses > maxVisible

  if (isLoading) {
    return <CoursesGridSkeleton />
  }

  if (error || courses.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30 py-20">
      <div className="max-w-8xl mx-auto px-6">
        {/* Título y subtítulo */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
        </div>

        {/* Bento Grid con Tailwind CSS Grid */}
        <div className="grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCourses.map((course, index) => {
            // Asignamos spans diferentes según el índice para crear variedad visual (típico de bento)
            let gridClass = ''
            if (index === 0)
              gridClass = 'lg:col-span-2 lg:row-span-2' // Card grande destacado
            else if (index === 1 || index === 4) gridClass = 'lg:col-span-2'
            else if (index === 2 || index === 5) gridClass = 'lg:row-span-2'
            else gridClass = 'lg:col-span-1 lg:row-span-1'

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={`group bg-card hover:border-primary/50 flex flex-col overflow-hidden border transition-all ${gridClass}`}
              >
                {/* Imagen - ajustada para ocupar más espacio en cards grandes */}
                <div className="relative h-48 min-h-48 lg:h-full">
                  <CustomImage
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-bottom-left"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      {getCourseLevelLabel(course.level)}
                    </span>
                  </div>
                </div>

                {/* Contenido - flexible para adaptarse al tamaño */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <h3 className="group-hover:text-primary line-clamp-2 text-xl font-bold transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {course.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < Math.floor(course.avgRating)
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">
                          {course.avgRating.toFixed(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Clock className="text-muted-foreground size-4" />
                        <span>{formatDuration(course.estimatedDuration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={course.teacherAvatarUrl}
                        alt={course.teacherFullName}
                      />
                      <AvatarFallback>
                        {course.teacherFullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {course.teacherFullName}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Instructor
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}

          {/* Botón "Ver más cursos" integrado como una card del bento */}
          {hasMore && (
            <div className="bg-card flex items-center justify-center border p-8 lg:col-span-2 lg:row-span-1">
              <Button
                asChild
                size="lg"
                className="h-20 w-full text-lg font-medium"
              >
                <Link
                  href="/courses"
                  className="flex items-center justify-center gap-3"
                >
                  Ver todos los cursos ({totalCourses})
                  <ArrowRight className="size-6" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CoursesGridSkeleton() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-12 w-96" />
          <Skeleton className="mx-auto mt-4 h-6 w-80" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(9)].map((_, i) => {
            let gridClass = ''
            if (i === 0) gridClass = 'lg:col-span-2 lg:row-span-2'
            else if (i === 1 || i === 4) gridClass = 'lg:col-span-2'
            else gridClass = 'lg:col-span-1'

            return (
              <div key={i} className={`bg-card border ${gridClass}`}>
                <Skeleton className="h-48 w-full lg:h-full" />
                <div className="space-y-4 p-6">
                  <Skeleton className="h-8 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-1 h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
