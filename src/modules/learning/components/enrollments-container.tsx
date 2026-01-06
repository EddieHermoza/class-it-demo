'use client'

import { Loading } from '@/modules/shared/components'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Award } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { EnrollmentCard } from './enrollment-card'
import Pagination from '@/modules/shared/components/ui/pagination'
import { ITEMS_PER_PAGE } from '@/modules/shared/constants'
import { useSearchParams } from 'next/navigation'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import Link from 'next/link'

export type Enrollment = {
  id: string
  courseId: string
  courseTitle: string
  courseImageUrl: string
  studentId: string
  teacherId: string
  teacherFullName: string
  enrolledAt: string // ISO date string (ej: "2025-12-31T00:57:42.733Z")
  progress: number // porcentaje de avance (0 a 100)
  completed: boolean
  completedAt: string | null // ISO date string o null si no ha completado
}

/**
 * Respuesta paginada del endpoint de inscripciones (mis cursos, etc.)
 */
export type GetEnrollmentsResponse = {
  data: Enrollment[]
  total: number
  totalPages: number
}
export default function EnrollmentsContainer() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || '1')
  const limit = ITEMS_PER_PAGE
  const hasToken = !!session?.tokens.access

  const { data, error, isLoading, isValidating } =
    useApiFetch<GetEnrollmentsResponse>(
      '/api/V1/enrollments/me',
      {
        limit,
        page,
      },
      session?.tokens.access,
      {},
      hasToken
    )
  const enrollments = data?.data ?? []

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loading />
      </div>
    )
  }
  if (error) toast.error(error.message)

  if (enrollments.length === 0 && !isValidating) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader className="py-12 text-center">
          <Award className="text-muted-foreground mx-auto mb-4 size-12" />
          <CardTitle className="text-muted-foreground text-lg">
            No te has inscrito a ningun curso
          </CardTitle>
        </CardHeader>
        <Button
          asChild
          className="btn-cut mx-auto w-full max-w-96 rounded-none"
        >
          <Link href={'/courses'}>Buscar cursos</Link>
        </Button>
      </Card>
    )
  }

  return (
    <>
      <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {enrollments.map((enrollment, i) => (
          <EnrollmentCard key={i} enrollment={enrollment} />
        ))}
      </div>
      <div className="flex-center mt-5 w-full">
        <Pagination totalPages={data?.totalPages ?? 0} />
      </div>
    </>
  )
}
