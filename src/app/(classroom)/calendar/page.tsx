import { WebinarCalendar } from '@/modules/shared/components/calendar/webinar-calendar'
import { Suspense } from 'react'

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Calendario de Webinars
        </h1>
        <p className="text-muted-foreground mt-2">
          Explora los próximos eventos en vivo y talleres prácticos.
        </p>
      </header>
      <Suspense>
        <WebinarCalendar />
      </Suspense>
    </div>
  )
}
