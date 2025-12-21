'use client'

import { useState } from 'react'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Button } from '@/modules/shared/components/ui/button'
import { BarChart3, Users, Star, Play, Dot } from 'lucide-react'
import {
  CourseContentAccordion,
  VideoPreviewModal,
  TeacherSection,
} from '@/modules/courses/components'
import { AppBreadcrumb } from '@/modules/shared/components'
import { courseDetail } from '@/__mocks__'
import { getYouTubeThumbnail } from '@/modules/shared/utils'
import Lottie from 'lottie-react'
import animationData from '@/assets/animation/detail-course.json'

const CourseDetailsPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const previewVideos = courseDetail.sections
    .flatMap((section) =>
      section.lessons.filter(
        (lesson) => lesson.isPreview && lesson.type === 'video'
      )
    )
    .map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      duration: lesson.duration,
      youtubeUrl: lesson.youtubeUrl || '',
      thumbnail: lesson.youtubeUrl
        ? getYouTubeThumbnail(lesson.youtubeUrl) || undefined
        : undefined,
    }))

  return (
    <div className="container mx-auto flex flex-col p-5">
      <AppBreadcrumb
        items={[
          { label: 'Cursos', href: '/courses' },
          { label: courseDetail.title },
        ]}
      />

      <div className="container mx-auto px-4 pt-6 pb-12">
        <div className="w-full">
          <div className="mb-4 flex flex-wrap gap-2">
            {courseDetail.categories.map((category) => (
              <Badge
                key={category}
                className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 border px-2 py-0.5 text-[10px] font-semibold uppercase transition-colors sm:px-3 sm:py-1 sm:text-xs"
              >
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            {courseDetail.title}
          </h1>

          <div className="text-muted-foreground mb-6 flex items-center gap-2">
            <span className="text-sm sm:text-base">Enseña:</span>
            <span className="text-foreground text-sm font-semibold sm:text-base">
              {courseDetail.teacher.name} {courseDetail.teacher.lastName}
            </span>
            <Dot className="size-4" />
            <span className="text-sm sm:text-base">
              {courseDetail.teacher.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <BarChart3 className="text-primary size-4" />
              </div>
              <span className="text-xs font-medium sm:text-sm">
                {courseDetail.level}
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <Users className="text-primary size-4" />
              </div>
              <span className="text-xs font-medium sm:text-sm">
                {courseDetail.studentsCount.toLocaleString()} alumnos
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <Star className="text-primary fill-primary size-4" />
              </div>
              <span className="text-xs font-semibold sm:text-sm">
                {courseDetail.avgRating}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 rounded-lg px-6 py-5 text-sm font-semibold shadow-lg transition-all sm:px-8 sm:py-6 sm:text-base md:text-lg"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            ¡Empezar curso!
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="max-w-4xl flex-1">
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl">
                Descripción del curso online
              </h2>
              <div className="rounded-xl px-0 py-6 backdrop-blur-sm lg:p-6">
                <p className="text-sm leading-relaxed whitespace-pre-line sm:text-base">
                  {courseDetail.description}
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl">
                ¿Qué voy a aprender?
              </h2>
              <div className="rounded-xl px-0 py-6 backdrop-blur-sm lg:p-6">
                <p className="text-sm leading-relaxed sm:text-base">
                  {courseDetail.whatYouWillLearn}
                </p>
              </div>
            </section>

            <div className="mb-12 grid gap-6 md:grid-cols-2">
              <section className="rounded-xl px-0 py-6 backdrop-blur-sm lg:p-6">
                <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl md:text-2xl">
                  ¿A quiénes está dirigido?
                </h2>
                <p className="text-sm leading-relaxed sm:text-base">
                  {courseDetail.targetAudience}
                </p>
              </section>

              <section className="rounded-xl px-0 py-6 backdrop-blur-sm lg:p-6">
                <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl md:text-2xl">
                  Requisitos
                </h2>
                <p className="text-sm leading-relaxed sm:text-base">
                  {courseDetail.requirements}
                </p>
              </section>
            </div>

            <section className="mb-12">
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl">
                  Contenido del curso
                </h2>
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {courseDetail.sections.length}
                    </span>
                    <span>secciones</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">247</span>
                    <span>clases</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {courseDetail.estimatedDuration}
                    </span>
                    <span>de duración total</span>
                  </span>
                </div>
              </div>

              <CourseContentAccordion
                sections={courseDetail.sections}
                onPreviewClick={setSelectedVideo}
              />
            </section>

            <TeacherSection teacher={courseDetail.teacher} />
          </div>
          <div className="flex-1 lg:sticky lg:top-8 lg:self-start">
            <Lottie
              animationData={animationData}
              loop
              className="h-full w-full"
            />
          </div>
        </div>

        <section className="">
          <h2 className="mb-4 text-xl font-bold sm:mb-5 sm:text-2xl md:mb-6 md:text-3xl">
            Certifícate e impulsa tu carrera
          </h2>
          <div className="bg-primary h-[650px] w-full rounded-3xl" />
        </section>
      </div>

      <VideoPreviewModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videos={previewVideos}
        currentVideoId={selectedVideo}
        onVideoChange={setSelectedVideo}
      />
    </div>
  )
}

export default CourseDetailsPage
