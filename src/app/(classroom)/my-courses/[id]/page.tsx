'use client'

import { useState } from 'react'
import { AppBreadcrumb } from '@/modules/shared/components'
import { CourseProgressAccordion } from '@/modules/my-courses/components'
import { YouTubeIframePlayer } from '@/modules/shared/components'
import { Separator } from '@/modules/shared/components/ui/separator'
import { courseContent } from '@/__mocks__'

const CourseContentPage = () => {
  const defaultLesson = courseContent.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.youtubeUrl)

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    defaultLesson?.id || ''
  )
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>(
    defaultLesson?.youtubeUrl || ''
  )
  const [selectedLessonTitle, setSelectedLessonTitle] = useState<string>(
    defaultLesson?.title || ''
  )
  const [watchedLessons, setWatchedLessons] = useState<Set<string>>(new Set())

  const handleLessonClick = (lessonId: string) => {
    const lesson = courseContent.sections
      .flatMap((section) => section.lessons)
      .find((l) => l.id === lessonId)

    if (lesson?.youtubeUrl) {
      if (selectedLessonId && selectedLessonId !== lessonId) {
        setWatchedLessons((prev) => new Set(prev).add(selectedLessonId))
      }

      setSelectedLessonId(lessonId)
      setSelectedVideoUrl(lesson.youtubeUrl)
      setSelectedLessonTitle(lesson.title)
    }
  }

  const handleCheckboxClick = (lessonId: string) => {
    setWatchedLessons((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId)
      } else {
        newSet.add(lessonId)
      }
      return newSet
    })
  }

  return (
    <div className="flex min-h-full flex-col [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="container mx-auto flex min-h-full flex-col p-5">
        <div className="pb-6">
          <AppBreadcrumb
            items={[
              { label: 'Mis cursos', href: '/my-courses' },
              { label: courseContent.courseTitle },
            ]}
          />
        </div>

        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-balance lg:text-3xl">
            {courseContent.courseTitle}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm font-medium">
              {courseContent.currentModule}
            </span>
            <span className="text-muted-foreground">-</span>
            <span className="text-muted-foreground text-sm">
              {courseContent.currentCapsule}
            </span>
          </div>
          {selectedLessonTitle && (
            <p className="text-muted-foreground text-base">
              {selectedLessonTitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              {selectedVideoUrl ? (
                <YouTubeIframePlayer
                  videoUrl={selectedVideoUrl}
                  autoplay={false}
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Selecciona una lección para comenzar
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 hidden space-y-6 lg:block">
              <section>
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  Descripción del curso
                </h2>
                <div className="rounded-xl backdrop-blur-sm">
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line sm:text-base">
                    {courseContent.description}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  ¿Qué voy a aprender?
                </h2>
                <div className="rounded-xl backdrop-blur-sm">
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {courseContent.whatYouWillLearn}
                  </p>
                </div>
              </section>

              <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-xl backdrop-blur-sm">
                  <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
                    ¿A quiénes está dirigido?
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {courseContent.targetAudience}
                  </p>
                </section>

                <section className="rounded-xl backdrop-blur-sm">
                  <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
                    Requisitos
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {courseContent.requirements}
                  </p>
                </section>
              </div>

              <section>
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  Sobre el instructor
                </h2>
                <div className="rounded-xl px-0 py-4 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src={courseContent.teacher.avatarUrl}
                      alt={`${courseContent.teacher.name} ${courseContent.teacher.lastName}`}
                      className="size-40 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">
                        {courseContent.teacher.name}{' '}
                        {courseContent.teacher.lastName}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {courseContent.teacher.title}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed whitespace-pre-line">
                        {courseContent.teacher.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-5 max-h-[600px]">
              <div>
                <div className="w-46">
                  <h2 className="mb-4 text-lg font-semibold">
                    Contenido del curso
                    <Separator className="bg-primary w-10 p-0.5" />
                  </h2>
                </div>

                <div className="max-h-[550px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <CourseProgressAccordion
                    sections={courseContent.sections}
                    selectedLessonId={selectedLessonId}
                    watchedLessons={watchedLessons}
                    onLessonClick={handleLessonClick}
                    onCheckboxClick={handleCheckboxClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseContentPage
