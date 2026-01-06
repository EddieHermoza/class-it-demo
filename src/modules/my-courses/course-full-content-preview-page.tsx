'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loading } from '@/modules/shared/components'
import { Separator } from '@/modules/shared/components/ui/separator'
import { useApiFetch } from '../shared/hooks/use-api-fetch'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { CourseType } from '../shared/types/course.types'
import { TeacherType } from '../shared/types/teacher.types'
import { Button } from '../shared/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { TeacherSection } from '../shared/components/course-details/teacher-section'
import CourseInfoSection from '../shared/components/course-details/course-info-section'
import VideoPlayer from '../shared/components/video-player'
import { SectionPreview } from '../shared/types/sections.types'
import { CourseFullContentPreviewAccordion } from '../shared/components/course-details/full-course-preview-accordion'

interface CourseFullContent {
  course: CourseType
  sections: SectionPreview[]
  teacher: TeacherType
}

interface Props {
  courseId: string
}

export default function CourseFullContentPreviewPage({ courseId }: Props) {
  const { data: session } = useSession()
  const accessToken = session?.tokens.access
  const hasToken = !!accessToken

  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const selectedLectureId = searchParams.get('lectureId')

  const { data, isLoading, error } = useApiFetch<CourseFullContent>(
    `/api/V1/courses/${courseId}/full-content-preview`,
    {},
    accessToken,
    {},
    hasToken
  )

  const course = data?.course ?? null
  const teacher = data?.teacher ?? null
  const sections = useMemo(() => data?.sections ?? [], [data?.sections])

  const selectedLecture = useMemo(() => {
    if (!selectedLectureId || sections.length === 0) return null

    for (const section of sections) {
      const lecture = section.lectures.find((l) => l.id === selectedLectureId)
      if (lecture) return lecture
    }
    return null
  }, [sections, selectedLectureId])

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
      <div className="flex items-center gap-5 p-4">
        <Button asChild variant={'ghost'}>
          <Link href={'/my-courses'}>
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">{course?.title}</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {selectedLecture && (
            <div className="overflow-hidden">
              <VideoPlayer
                videoUrl={selectedLecture.videoUrl ?? ''}
                title={selectedLecture.title ?? ''}
              />
            </div>
          )}

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

        <aside className="px-4 xl:sticky xl:top-6 xl:h-fit">
          <h2 className="mb-4 text-lg font-semibold">
            Contenido del curso
            <Separator className="bg-primary mt-1 h-0.5 w-10" />
          </h2>
          <CourseFullContentPreviewAccordion sections={sections} />
        </aside>
      </div>
    </>
  )
}
