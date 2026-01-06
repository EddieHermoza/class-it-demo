import EnrollmentsContainer from '@/modules/learning/components/enrollments-container'
import { ToogleProgressStatus } from '@/modules/learning/components/enrollments-filter'
import LastWatchedContainer from '@/modules/learning/components/last-watched-container'
import { Clock } from 'lucide-react'
import { Suspense } from 'react'

export default function LearningPage() {
  return (
    <div className="relative container mx-auto flex h-full flex-col p-5 max-sm:px-2">
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold">Aprendizaje</h1>
        <p className="text-muted-foreground">
          Gestiona y continúa tu aprendizaje desde donde lo dejaste
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <section className="space-y-5">
          <header className="flex items-center gap-3">
            <Clock className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Continúa donde lo dejaste</h2>
          </header>
          <LastWatchedContainer />
        </section>

        <section className="space-y-5 my-10">
          <div className="flex justify-between gap-5 max-sm:flex-col max-sm:items-center">
            <h2 className="text-xl font-semibold">Todos mis cursos</h2>
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
