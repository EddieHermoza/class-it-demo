'use client'

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useSession, signIn } from 'next-auth/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { ExternalLink, User, Tag, Calendar, LogIn, Clock } from 'lucide-react'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import {
  WebinarResponse,
  WebinarType,
} from '@/modules/shared/types/webinar.types'
import { Loading } from '@/modules/shared/components'
import { Card, CardContent } from '@/modules/shared/components/ui/card'

export function WebinarCalendar() {
  const { data: session, status } = useSession()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute for the calendar, or every second if dialog is open
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(new Date())
      },
      isDialogOpen ? 1000 : 60000
    )
    return () => clearInterval(interval)
  }, [isDialogOpen])

  const { data, isLoading } = useApiFetch<WebinarResponse>(
    '/api/V1/webinars',
    {},
    session?.tokens.access,
    {},
    !!session?.tokens.access
  )

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="border-border/50 bg-muted/30 flex min-h-[400px] items-center justify-center overflow-hidden border-2 border-dashed shadow-none">
        <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
          <div className="bg-primary/10 ring-primary/5 flex h-20 w-20 items-center justify-center rounded-full ring-8">
            <LogIn className="text-primary h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Acceso Restringido
            </h2>
            <p className="text-muted-foreground mx-auto max-w-sm">
              Debes iniciar sesión como instructor o alumno para ver el
              calendario de webinars y unirte a las sesiones.
            </p>
          </div>
          <Button
            onClick={() => signIn()}
            size="lg"
            className="h-12 px-8 font-semibold"
          >
            Iniciar Sesión ahora
          </Button>
        </CardContent>
      </Card>
    )
  }

  const events =
    data?.data.map((webinar: WebinarType) => ({
      id: webinar.id,
      title: webinar.title,
      start: webinar.scheduleAt,
      extendedProps: {
        instructor: 'Instructor', // API returns teacherId, could fetch name if needed but following pattern
        category: 'Webinar', // Category fetching could be added if categoryId is used
        zoomUrl: webinar.linkUrl,
        imageUrl: webinar.imageUrl,
        scheduleAt: webinar.scheduleAt,
      },
    })) || []

  const handleEventClick = (event: unknown) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  // Custom event content renderer
  const renderEventContent = (eventInfo: any) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleEventClick(eventInfo.event)
        }}
        className="w-full h-full px-2 py-1 text-left hover:opacity-90 transition-opacity cursor-pointer bg-primary text-primary-foreground"
      >
        <div className="font-semibold text-xs truncate">
          {eventInfo.event.title}
        </div>
        <div className="text-[10px] opacity-90">
          {eventInfo.timeText}
        </div>
      </button>
    )
  }

  const getCountdown = (scheduledTime: string) => {
    const start = new Date(scheduledTime).getTime()
    const now = currentTime.getTime()
    const diff = start - now

    if (diff <= 0) return null

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    const parts = []
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0 || hours > 0) parts.push(`${minutes}m`)
    parts.push(`${seconds}s`)

    return parts.join(' ')
  }

  const canJoin = selectedEvent
    ? new Date(selectedEvent.extendedProps.scheduleAt) <= currentTime
    : false
  const countdownText = selectedEvent
    ? getCountdown(selectedEvent.extendedProps.scheduleAt)
    : null

  return (
    <div className="bg-card w-full space-y-4 p-4">
      <div className="flex items-center justify-end">
      </div>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
      />

      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <div className="bg-muted relative aspect-video w-full overflow-hidden">
              <img
                src={selectedEvent.extendedProps.imageUrl}
                alt={selectedEvent.title}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 text-white">
                <h2 className="text-2xl leading-tight font-bold drop-shadow-md">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 px-6 pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                    <User className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Instructor
                    </p>
                    <p className="truncate text-sm font-semibold">
                      Sesión en Vivo
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                    <Calendar className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Fecha
                    </p>
                    <p className="truncate text-sm font-semibold">
                      {new Date(
                        selectedEvent.extendedProps.scheduleAt
                      ).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {!canJoin && countdownText ? (
                <div className="flex animate-pulse flex-col items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-amber-600 dark:bg-amber-500/5 dark:text-amber-400">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">
                      El webinar inicia en
                    </span>
                  </div>
                  <span className="text-2xl font-black tabular-nums">
                    {countdownText}
                  </span>
                </div>
              ) : (
                <div className="bg-muted/50 border-border/50 flex flex-col gap-2 rounded-xl border p-4">
                  <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                    Link de acceso
                  </p>
                  <a
                    href={selectedEvent.extendedProps.zoomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center gap-2 text-sm font-medium break-all hover:underline"
                  >
                    <ExternalLink className="size-4 shrink-0" />
                    {selectedEvent.extendedProps.zoomUrl}
                  </a>
                </div>
              )}
            </div>

            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <Button
                className="h-12 w-full text-base font-bold transition-all hover:scale-[1.02]"
                disabled={!canJoin}
                onClick={() =>
                  window.open(selectedEvent.extendedProps.zoomUrl, '_blank')
                }
              >
                {canJoin ? 'Unirse al Webinar ahora' : 'Próximamente...'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
