'use client'

import Lottie from 'lottie-react'
import { Dot, BarChart3, Star } from 'lucide-react'
import { TeacherSection } from '../../shared/components/course-details/teacher-section'
import { AppBreadcrumb, Loading } from '../../shared/components'
import { Badge } from '../../shared/components/ui/badge'
import animationData from '@/assets/animation/detail-course.json'
import { formatDuration, getCourseLevelLabel } from '@/lib/utils'
import EnrollCourseButton from './enroll-course-button'
import { CoursePreviewContentAccordion } from '@/modules/shared/components/course-details/course-preview-content-accordion'
import { CourseType } from '../../shared/types/course.types'
import { SectionType } from '../../shared/types/sections.types'
import { TeacherType } from '../../shared/types/teacher.types'
import { useApiFetch } from '../../shared/hooks/use-api-fetch'
import { useMemo } from 'react'
import CourseInfoSection from '../../shared/components/course-details/course-info-section'
import Image from 'next/image'
interface CoursePreviewContent {
  course: CourseType
  sections: SectionType[]
  teacher: TeacherType
}

interface Props {
  courseId: string
}

export default function CoursePreviewContent({ courseId }: Props) {
  const { data, isLoading } = useApiFetch<CoursePreviewContent>(
    `/api/V1/courses/${courseId}/preview-content`
  )
  const sections = useMemo(() => data?.sections ?? [], [data?.sections])

  const totalLectures = useMemo(
    () => sections.reduce((acc, s) => acc + (s.lecturesCount ?? 0), 0),
    [sections]
  )

  if (isLoading) return <Loading />
  if (!data) {
    return <div className="flex-center size-full">No encontrado</div>
  }

  const { course, teacher } = data

  return (
    <div className="container mx-auto flex flex-col py-5 max-sm:px-4">
      <AppBreadcrumb
        items={[{ label: 'Cursos', href: '/courses' }, { label: course.title }]}
      />

      <div className="container mx-auto px-0 pt-6 pb-12">
        <div className="w-full">
          <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 border px-2 py-0.5 text-[10px] font-semibold uppercase transition-colors sm:px-3 sm:py-1 sm:text-xs">
            {course.category}
          </Badge>

          <h1 className="mb-6 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            {course.title}
          </h1>

          <div className="text-muted-foreground mb-6 flex items-center gap-2">
            <span className="text-sm sm:text-base">Enseña:</span>
            <span className="text-foreground text-sm font-semibold sm:text-base">
              {teacher.name} {teacher.lastName}
            </span>
            <Dot className="size-4" />
            <span className="text-sm sm:text-base">{teacher.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 pb-6">
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <BarChart3 className="text-primary size-4" />
              </div>
              <span className="text-xs font-medium sm:text-sm">
                {getCourseLevelLabel(course.level)}
              </span>
            </div>

            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <Star className="text-primary fill-primary size-4" />
              </div>
              <span className="text-xs font-semibold sm:text-sm">
                {course.avgRating}
              </span>
            </div>
          </div>

          <EnrollCourseButton courseId={course.id} />
        </div>
      </div>

      <div className="relative container mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="max-w-4xl flex-1">
            <CourseInfoSection
              description={course.description ?? ''}
              whatYouWillLearn={course.whatYouWillLearn ?? ''}
              targetAudience={course.targetAudience ?? ''}
              requirements={course.requirements ?? []}
            />

            <section className="mb-12">
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl">
                  Contenido del curso
                </h2>

                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {sections.length}
                    </span>
                    <span>secciones</span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {totalLectures}
                    </span>
                    <span>clases</span>
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {formatDuration(course.estimatedDuration)}
                    </span>
                    <span>de duración total</span>
                  </span>
                </div>
              </div>

              <CoursePreviewContentAccordion sections={sections} />
            </section>

            <TeacherSection
              name={teacher.name}
              lastName={teacher.lastName}
              avatarUrl={teacher.avatarUrl ?? ''}
              title={teacher.title ?? ''}
              bio={teacher.bio ?? ''}
            />
          </div>

          <div className="flex-1 lg:sticky lg:top-8 lg:self-start">
            <Lottie animationData={animationData} loop className="size-full" />
          </div>
        </div>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:mb-16 md:text-5xl dark:text-white">
              Certifícate e impulsa tu carrera
            </h2>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xl dark:border-gray-800">
              <Image
                src="/ejemplo-certificado.jpg"
                alt="Ejemplo de certificado profesional"
                width={2000}
                height={990}
                className="h-auto w-full"
                quality={85}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
