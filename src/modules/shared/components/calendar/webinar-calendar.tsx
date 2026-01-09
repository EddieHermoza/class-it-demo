/**
 * Webinar Calendar Main Component
 * 
 * Main orchestrator component for the webinar calendar.
 * 
 * Responsibilities:
 * - Manages authentication state and redirects unauthenticated users
 * - Fetches webinar data from API with URL-based filters (query, categoryId)
 * - Coordinates state for dialogs (day events, event details)
 * - Configures FullCalendar with Lima timezone
 * - Delegates rendering to specialized subcomponents
 * 
 * State Management:
 * - selectedEvent: Currently selected event for detail view
 * - isDayDialogOpen: Controls multi-event day dialog visibility
 * - dayEvents: Events for the selected day
 * - selectedDayDate: Date of the selected day
 * - currentTime: Updates every second (when detail dialog open) or minute
 */

'use client'

import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import { useIsDesktop } from '@/modules/shared/hooks/use-desktop'
import {
  WebinarResponse,
  WebinarType,
} from '@/modules/shared/types/webinar.types'
import QueryInputFilter from '@/modules/shared/components/filters/query-input-filter'
import CategorySelectFilter from '@/modules/shared/components/filters/category-select-filter'

// Subcomponents
import { WebinarCalendarUnauthenticated } from './webinar-calendar-unauthenticated'
import { WebinarCalendarSkeleton } from './webinar-calendar-skeleton'
import { WebinarCalendarEvent } from './webinar-calendar-event'
import { WebinarCalendarDayDialog } from './webinar-calendar-day-dialog'
import { WebinarCalendarDetailDialog } from './webinar-calendar-detail-dialog'
import { formatDateToISO } from './webinar-calendar-utils'

export function WebinarCalendar() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const isDesktop = useIsDesktop()

  // URL-based filters
  const query = searchParams.get('query') || ''
  const categoryId = searchParams.get('categoryId') || ''

  // Dialog state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dayEvents, setDayEvents] = useState<any[]>([])
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null)

  // Current time for countdown timer (updates every second when detail dialog is open)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentTime(new Date())
      },
      isDialogOpen ? 1000 : 60000
    )
    return () => clearInterval(interval)
  }, [isDialogOpen])

  // Fetch webinar data
  const { data, isLoading } = useApiFetch<WebinarResponse>(
    '/api/V1/webinars',
    {
      query,
      categoryId,
    },
    session?.tokens.access,
    {
      revalidateOnFocus: false,
    },
    !!session?.tokens.access
  )

  // Show login prompt for unauthenticated users
  if (status === 'unauthenticated') {
    return <WebinarCalendarUnauthenticated />
  }

  // Transform API data to FullCalendar event format
  const events =
    data?.data.map((webinar: WebinarType) => ({
      id: webinar.id,
      title: webinar.title,
      start: webinar.scheduleAt,
      extendedProps: {
        instructor: webinar.teacherFullName,
        category: webinar.categoryName,
        zoomUrl: webinar.linkUrl,
        imageUrl: webinar.imageUrl,
        scheduleAt: webinar.scheduleAt,
      },
    })) || []

  /**
   * Handles click on individual event
   * Opens detail dialog and closes day dialog if open
   */
  const handleEventClick = (event: unknown) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
    setIsDayDialogOpen(false)
  }

  /**
   * Handles click on "+X más" link for days with multiple events
   * Filters events for the selected day using robust date comparison
   * 
   * @param info - FullCalendar info object containing the clicked date
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMoreLinkClick = (info: any) => {
    const date = info.date

    // Format cell date as UTC (preserves visual date)
    const targetDateISO = formatDateToISO(date, 'UTC')

    // Filter events that fall on this day (converted to Lima time)
    const daysEvents = events.filter((e) => {
      const eDate = new Date(e.start)
      const eDateISO = formatDateToISO(eDate, 'America/Lima')
      return eDateISO === targetDateISO
    })

    setDayEvents(daysEvents)
    setSelectedDayDate(date)
    setIsDayDialogOpen(true)
    return 'void'
  }

  /**
   * Custom renderer for calendar events
   * Delegates to WebinarCalendarEvent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderEventContent = (eventInfo: any) => {
    return (
      <WebinarCalendarEvent
        eventInfo={eventInfo}
        onClick={handleEventClick}
      />
    )
  }

  return (
    <div className="bg-card w-full space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <QueryInputFilter />
        <CategorySelectFilter />
      </div>

      {/* Calendar or Loading State */}
      {isLoading && (status === 'loading' || status === 'authenticated') ? (
        <WebinarCalendarSkeleton />
      ) : (
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <FullCalendar
            timeZone="America/Lima"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={isDesktop ? 'dayGridMonth' : 'timeGridDay'}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            key={isDesktop ? 'desktop' : 'mobile'}
            events={events}
            eventContent={renderEventContent}
            height="auto"
            locale="es"
            dayMaxEvents={3}
            moreLinkClick={handleMoreLinkClick}
            moreLinkContent={(args) => (
              <div className="px-2 text-muted-foreground cursor-pointer text-xs w-full transition-all duration-200">
                +{args.num} más
              </div>
            )}
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
            }}
          />
        </div>
      )}

      {/* Day Events Dialog - Shows all events for a selected day */}
      <WebinarCalendarDayDialog
        isOpen={isDayDialogOpen}
        onOpenChange={setIsDayDialogOpen}
        selectedDate={selectedDayDate}
        events={dayEvents}
        onEventClick={handleEventClick}
      />

      {/* Event Detail Dialog - Shows full details for a single event */}
      <WebinarCalendarDetailDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        event={selectedEvent}
        currentTime={currentTime}
      />
    </div>
  )
}
