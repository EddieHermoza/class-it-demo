/**
 * Webinar Calendar Event Component
 * 
 * Renders an individual event button in the calendar grid.
 * Displays event time (in Lima timezone) and title.
 * Handles click events to show event details.
 */

'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { formatEventTime } from './webinar-calendar-utils'

interface WebinarCalendarEventProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventInfo: any
  onClick: (event: unknown) => void
}

export function WebinarCalendarEvent({ eventInfo, onClick }: WebinarCalendarEventProps) {
  // Format time in Lima timezone
  const timeText = formatEventTime(eventInfo.event.start)

  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(eventInfo.event)
      }}
      className="flex h-auto w-full justify-start gap-1 overflow-hidden px-2 py-1 text-left text-xs"
    >
      {/* Event Time - Hidden on mobile */}
      <span className="opacity-80 md:inline hidden">{timeText}</span>
      
      {/* Event Title - Truncated */}
      <span className="line-clamp-1 flex-1 truncate">{eventInfo.event.title}</span>
    </Button>
  )
}
