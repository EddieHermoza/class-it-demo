// app/my-courses/edit/[id]/page.tsx  (o donde lo tengas)

import { API_URL } from '@/config/env'
import { authOptions } from '@/modules/auth/auth-options'
import { CourseEditForm } from '@/modules/my-courses/course-edit-form'
import { mapApiCourseToFormData } from '@/modules/my-courses/mappers/api-course-to-form.mapper'
import { Button } from '@/modules/shared/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditCoursePage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const accessToken = session.tokens?.access
  if (!accessToken) notFound()

  const { id } = await params
  if (!id) notFound()

  const res = await fetch(`${API_URL}/api/V1/courses/${id}/full-content-preview`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return notFound()
  }

  const apiData = await res.json()

  const DEFAULT = mapApiCourseToFormData(apiData)

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8 flex items-center gap-5">
        <Button asChild variant="ghost" className="rounded-full size-10">
          <Link href="/my-courses">
            <ChevronLeftIcon className="size-5" />
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Editar {DEFAULT.title}
          </h1>
          <p className="text-muted-foreground">
            Actualiza o modifica la información de tu curso.
          </p>
        </div>
      </div>

      <CourseEditForm courseId={id} defaultValues={DEFAULT} />
    </div>
  )
}
