'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loading } from '@/modules/shared/components'
import { Separator } from '@/modules/shared/components/ui/separator'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { CourseType } from '@/modules/shared/types/course.types'
import { SectionType } from '@/modules/shared/types/sections.types'
import { TeacherType } from '@/modules/shared/types/teacher.types'
import { CourseFullContentAccordion } from '@/modules/shared/components/course-details/course-full-content-accordion'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import CourseVideoPlayer from '@/modules/shared/components/course-details/custom-video-player'
import { TeacherSection } from '@/modules/shared/components/course-details/teacher-section'
import CourseInfoSection from '@/modules/shared/components/course-details/course-info-section'
import { CourseMediaPlayerProvider } from '../context/use-course-media-provider'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'
import Link from 'next/link'
interface CourseFullContent {
  course: CourseType
  sections: SectionType[]
  teacher: TeacherType
}

interface Props {
  courseId: string
}

export default function CourseFullContentProgressPage({ courseId }: Props) {
  const { data: session } = useSession()
  const accessToken = session?.tokens.access
  const hasToken = !!accessToken

  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const selectedLectureId = searchParams.get('lectureId')

  const { data, isLoading, error } = useApiFetch<CourseFullContent>(
    `/api/V1/courses/${courseId}/full-content-progress`,
    {},
    accessToken,
    {},
    hasToken
  )

  const course = data?.course ?? null
  const teacher = data?.teacher ?? null
  const sections = useMemo(() => data?.sections ?? [], [data?.sections])

  useEffect(() => {
    if (selectedLectureId || sections.length === 0) return

    const firstLecture = sections[0]?.lectures[0]
    if (!firstLecture) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('lectureId', firstLecture.id)
    replace(`${pathname}?${params.toString()}`)
  }, [sections, selectedLectureId, searchParams, pathname, replace])

  if (isLoading) return <Loading />

  if (error) toast.error(error.message || 'Error al cargar el curso')

  if (!data) {
    return (
      <div className="container mx-auto p-5 text-center">
        <p className="text-muted-foreground text-lg">Curso no encontrado</p>
      </div>
    )
  }

  return (
    <>
      <CourseMediaPlayerProvider
        sections={sections}
        lectureId={selectedLectureId}
      >
        <div className="flex items-center gap-5 p-4">
          <Button asChild variant={'ghost'}>
            <Link href={'/learning'}>
              <ChevronLeft />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{course?.title}</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* PLAYER + INFO */}
          <div className="lg:col-span-2">
            <div className="aspect-video overflow-hidden bg-black">
              <CourseVideoPlayer />
            </div>

            <section className="px-5 pt-5 max-xl:hidden">
              <CourseInfoSection
                description={course?.description ?? ''}
                whatYouWillLearn={course?.whatYouWillLearn ?? ''}
                targetAudience={course?.targetAudience ?? ''}
                requirements={course?.requirements ?? []}
              />

              <TeacherSection
                name={teacher?.name ?? ''}
                lastName={teacher?.lastName ?? ''}
                avatarUrl={teacher?.avatarUrl ?? ''}
                title={teacher?.title ?? ''}
                bio={teacher?.bio ?? ''}
              />
            </section>
          </div>

          <aside className="max-xl:px-4 xl:sticky xl:top-5 xl:h-fit">
            <h2 className="mb-4 text-lg font-semibold">
              Contenido del curso
              <Separator className="bg-primary mt-1 h-0.5 w-10" />
            </h2>

            <CourseFullContentAccordion />
          </aside>
        </div>
      </CourseMediaPlayerProvider>
    </>
  )
}
