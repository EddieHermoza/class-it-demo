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
  lastViewedAt: string
}

interface GetEnrolledCourses {
  data: EnrolledCourse[]
}

export default function LastWatchedContainer() {
  const { data: session, status } = useSession()
  const accessToken = session?.tokens?.access as string | undefined
  const isAuthenticated = status === 'authenticated' && !!accessToken

  const { data, error, isLoading, isValidating } =
    useApiFetch<GetEnrolledCourses>(
      '/api/V1/enrollments/last-watched',
      {},
      accessToken,
      {},
      isAuthenticated
    )

  const courses = data?.data ?? []

  if (isLoading) {
    return <LastWatchedSkeleton />
  }

  if (error) {
    toast.error(error.message || 'Error al cargar tus cursos recientes')
  }

  if (courses.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {courses.map((course) => (
        <LastWatchedCourseCard key={course.courseId} course={course} />
      ))}
    </div>
  )
}

function LastWatchedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-muted/50 border-border/80 h-32 animate-pulse"
        />
      ))}
    </div>
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
