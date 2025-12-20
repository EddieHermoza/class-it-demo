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
import AppBreadcrumb from '@/modules/shared/components/app-breadcrumb'
import { courseDetail } from '@/__mocks__'
import Lottie from 'lottie-react'
import animationData from '@/assets/animation/detail-course.json'

const CourseDetailsPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const previewVideos = courseDetail.sections.flatMap((section) =>
    section.lessons.filter(
      (lesson) => lesson.isPreview && lesson.type === 'video'
    )
  )

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
                className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 border px-3 py-1 text-xs font-semibold uppercase transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            {courseDetail.title}
          </h1>

          <div className="text-muted-foreground mb-6 flex items-center gap-2">
            <span className="text-base">Enseña:</span>
            <span className="text-foreground font-semibold">
              {courseDetail.teacher.name} {courseDetail.teacher.lastName}
            </span>
            <Dot className="size-4" />
            <span className="text-base">{courseDetail.teacher.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-b border-white/10 pb-6">
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <BarChart3 className="text-primary size-4" />
              </div>
              <span className="text-sm font-medium">{courseDetail.level}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <Users className="text-primary size-4" />
              </div>
              <span className="text-sm font-medium">
                {courseDetail.studentsCount.toLocaleString()} alumnos
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 transition-colors hover:bg-white/10">
              <div className="bg-primary/20 rounded-md p-1.5">
                <Star className="text-primary fill-primary size-4" />
              </div>
              <span className="text-sm font-semibold">
                {courseDetail.avgRating}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 rounded-lg px-8 py-6 text-lg font-semibold shadow-lg transition-all"
          >
            <Play className="mr-2 h-5 w-5" />
            ¡Empezar curso!
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="max-w-4xl flex-1">
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold">
                Descripción del curso online
              </h2>
              <div className="rounded-xl p-6 backdrop-blur-sm">
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {courseDetail.description}
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold">¿Qué voy a aprender?</h2>
              <div className="rounded-xl p-6 backdrop-blur-sm">
                <p className="text-base leading-relaxed">
                  {courseDetail.whatYouWillLearn}
                </p>
              </div>
            </section>

            <div className="mb-12 grid gap-6 md:grid-cols-2">
              <section className="rounded-xl p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-bold">
                  ¿A quiénes está dirigido?
                </h2>
                <p className="text-base leading-relaxed">
                  {courseDetail.targetAudience}
                </p>
              </section>

              <section className="rounded-xl p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-2xl font-bold">Requisitos</h2>
                <p className="text-base leading-relaxed">
                  {courseDetail.requirements}
                </p>
              </section>
            </div>

            <section className="mb-12">
              <div className="mb-6">
                <h2 className="mb-3 text-3xl font-bold">Contenido del curso</h2>
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">
                      {courseDetail.sections.length}
                    </span>
                    <span>secciones</span>
                  </span>
                  <Dot className="size-4" />
                  <span className="flex items-center gap-1.5">
                    <span className="text-foreground font-semibold">247</span>
                    <span>clases</span>
                  </span>
                  <Dot className="size-4" />
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
          <h2 className="mb-6 text-3xl font-bold">
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
