'use client'

import Lottie from 'lottie-react'
import { BarChart3, Star } from 'lucide-react'
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

export default function CoursePreviewContentPage({ courseId }: Props) {
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
    <div className="relative flex w-full flex-col px-4 py-5 max-sm:px-4">
      <AppBreadcrumb
        items={[{ label: 'Cursos', href: '/courses' }, { label: course.title }]}
      />

      <div className="relative container mx-auto pt-12 md:pt-16 2xl:pb-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Badge
              variant="outline"
              className="border-border mb-6 text-xs font-medium tracking-wider uppercase"
            >
              {course.category}
            </Badge>

            <h1 className="text-foreground text-2xl leading-[1.12] font-semibold tracking-tight sm:text-3xl lg:text-5xl">
              {course.title}
            </h1>

            <p className="text-muted-foreground mt-6 max-w-3xl text-xl leading-relaxed max-md:text-base">
              {course.shortDescription}
            </p>

            <div className="relative mt-10 w-full">
              <EnrollCourseButton
                courseId={course.id}
                className="btn-cut max-md:w-full"
              />
            </div>
          </div>

          <div className="m-auto max-lg:hidden lg:col-span-5">
            <div className="border-border/50 bg-background/50 overflow-hidden rounded-xl border shadow-sm">
              <Image
                src={course.imageUrl}
                alt={`Dashboard profesional de ${course.title}`}
                width={700}
                height={525}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-center my-10 flex-wrap gap-x-8 gap-y-4 text-base max-sm:text-sm">
        <div className="flex items-center gap-2">
          <Star className="text-primary fill-primary size-4.5" />
          <span className="font-medium">{course.avgRating}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-muted-foreground">Enseña:</span>
          <span className="text-foreground font-semibold">
            {teacher.name} {teacher.lastName}
          </span>
          <span className="text-muted-foreground hidden sm:inline">·</span>
          <span className="text-muted-foreground">{teacher.title}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-primary size-4.5" />
            <span className="text-primary font-semibold">
              {getCourseLevelLabel(course.level)}
            </span>
          </div>
        </div>
      </div>
      <div className="relative container mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="max-w-4xl flex-1">
            <div className="bg-primary my-5 h-1 w-full rounded-full lg:hidden" />
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
