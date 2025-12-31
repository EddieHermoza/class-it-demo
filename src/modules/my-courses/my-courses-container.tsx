'use client'

import { toast } from 'sonner'
import MyCourseCard from './my-course-card'
import { Loading } from '../shared/components'
import { BookOpen, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useApiFetch } from '../shared/hooks/use-api-fetch'
import { useState } from 'react'
import { DeleteCourseButton } from './delete-course-button'
import { useSession } from 'next-auth/react'
import Pagination from '../shared/components/ui/pagination'
import { ITEMS_PER_PAGE } from '../shared/constants'
import { ToogleStatus } from './filters/status-filter'

export type CourseResponse = {
  id: string
  title: string
  description: string
  shortDescription: string
  level: string
  imageUrl: string
  estimatedDuration: number // en minutos u horas, según tu lógica
  isPublished: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

type GetCoursesResponse = {
  data: CourseResponse[]
  total: number
  totalPages: number
}

export default function MyCourseContainer() {
  const { data: session } = useSession()
  const accessToken = session?.tokens.access
  const hasToken = !!accessToken

  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId') || undefined
  const status = searchParams.get('status') || undefined
  const page = searchParams.get('page') || 1
  const limit = ITEMS_PER_PAGE
  const { data, isLoading, error, mutate, isValidating } =
    useApiFetch<GetCoursesResponse>(
      '/api/V1/courses/my-courses',
      { categoryId, status, page, limit },
      accessToken,
      {},
      hasToken
    )

  const [open, setOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] =
    useState<CourseResponse | null>(null)

  const courses = data?.data ?? []

  if (isLoading) return <Loading />

  if (error) toast.error(error.message)

  if (courses.length === 0 && !isValidating) {
    return (
      <div className="bg-muted/30 flex min-h-[500px] flex-col items-center justify-center rounded-xl px-6 py-16 text-center">
        <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <BookOpen className="text-primary h-10 w-10" />
        </div>

        <h2 className="mb-3 text-2xl font-semibold">Aún no tienes cursos</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Crea tu primer curso y comienza a compartir tu conocimiento.
        </p>

        <Link
          href="/my-courses/create"
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Crear mi primer curso
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="h-full w-full flex-1">
        <div className="container mx-auto flex items-center justify-between">
          <Pagination totalPages={data?.totalPages ?? 0} />
          <ToogleStatus />
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-6 py-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <MyCourseCard
              key={course.id}
              course={course}
              onDelete={() => {
                setSelectedCourse(course)
                setOpen(true)
              }}
            />
          ))}
        </div>
      </div>
      <DeleteCourseButton
        token={accessToken ?? ''}
        open={open}
        handleOpenChange={setOpen}
        course={selectedCourse}
        handleRefresh={mutate}
      />
    </>
  )
}
