import EnrollmentsContainer from '@/modules/learning/components/enrollments-container'
import { ToogleProgressStatus } from '@/modules/learning/components/enrollments-filter'
import LastWatchedContainer from '@/modules/learning/components/last-watched-container'
import { Suspense } from 'react'

export default function LearningPage() {
  return (
    <div className="container mx-auto flex min-h-full flex-col p-5">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold text-balance lg:text-3xl">
          Mis cursos
        </h1>
        <p className="text-muted-foreground text-base text-balance">
          Gestiona y continúa tu aprendizaje desde donde lo dejaste
        </p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <LastWatchedContainer />
        </section>

        <section className="space-y-6">
          <div className="flex justify-between gap-5 max-sm:flex-col max-sm:items-center">
            <h2 className="text-xl font-semibold lg:text-2xl">
              Todos mis cursos
            </h2>
            <Suspense>
              <ToogleProgressStatus />
            </Suspense>
          </div>
          <Suspense>
            <EnrollmentsContainer />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
