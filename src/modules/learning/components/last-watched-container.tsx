'use client'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import LastWatchedCourseCard from './last-watched-course-card'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { BookOpen, Clock } from 'lucide-react'

export type EnrolledCourse = {
  courseId: string
  courseTitle: string
  courseImageUrl: string
  progress: number
  lastLectureId: string
  lastLectureTitle: string
  teacherFullName: string
  lastViewedAt: string // ISO 8601
}

export default function LastWatchedContainer() {
  const { data: session, status } = useSession()
  const accessToken = session?.tokens?.access as string | undefined
  const isAuthenticated = status === 'authenticated' && !!accessToken

  const { data, error, isLoading, isValidating } = useApiFetch<
    EnrolledCourse[]
  >(
    '/api/V1/enrollments/last-watched',
    {},
    accessToken,
    { revalidateOnFocus: false },
    isAuthenticated
  )

  const courses = data ?? []
  const hasCourses = courses.length > 0

  if (isLoading || (isValidating && !hasCourses)) {
    return <LastWatchedSkeleton />
  }

  if (error) {
    toast.error(error.message || 'Error al cargar tus cursos recientes')
  }

  if (!hasCourses) {
    return <EmptyState />
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center gap-3">
        <Clock className="text-primary size-6" />
        <h2 className="text-2xl font-bold tracking-tight">
          Continúa donde lo dejaste
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <LastWatchedCourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  )
}

function LastWatchedSkeleton() {
  return (
    <section className="space-y-6">
      <header className="flex items-center gap-3">
        <Clock className="text-primary size-6" />
        <h2 className="text-2xl font-bold tracking-tight">
          Continúa donde lo dejaste
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-muted/50 h-32 animate-pulse border-border/80"
          />
        ))}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="py-12 text-center">
        <BookOpen className="text-muted-foreground mx-auto mb-4 size-12" />
        <CardTitle className="text-muted-foreground text-lg">
          Aún no has comenzado ningún curso
        </CardTitle>
        <p className="text-muted-foreground mt-2 text-xs">
          Explora el catálogo y comienza a aprender hoy mismo.
        </p>
      </CardHeader>
    </Card>
  )
}
