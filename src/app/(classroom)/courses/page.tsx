import CoursesContainer from '@/modules/courses/components/courses-container'
import { Suspense } from 'react'

export default function CoursesPage() {
  return (
    <main className="relative size-full">
      <div className="container mx-auto space-y-4 p-5">
        <h1 className="text-2xl font-bold text-balance lg:text-3xl">
          Explora nuestros cursos
        </h1>
        <p className="text-muted-foreground text-base">
          Aprende con los mejores instructores y transforma tu carrera
          profesional
        </p>
      </div>
      <Suspense>
        <CoursesContainer />
      </Suspense>
    </main>
  )
}
