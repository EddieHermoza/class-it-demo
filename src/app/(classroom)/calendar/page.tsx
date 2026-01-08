import { WebinarCalendar } from '@/modules/shared/components/calendar/webinar-calendar'

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendario de Webinars</h1>
        <p className="text-muted-foreground mt-2">
          Explora los próximos eventos en vivo y talleres prácticos.
        </p>
      </header>
      
      <WebinarCalendar />
    </div>
  )
}


