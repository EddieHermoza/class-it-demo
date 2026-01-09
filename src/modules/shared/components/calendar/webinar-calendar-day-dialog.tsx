/**
 * Webinar Calendar Day Dialog Component
 * 
 * Displays all webinars scheduled for a specific day.
 * Shown when user clicks "+X más" link on a calendar day with multiple events.
 * Each event in the list is clickable to view full details.
 */

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { Clock } from 'lucide-react'
import { formatEventTime } from './webinar-calendar-utils'

interface WebinarCalendarDayDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEventClick: (event: any) => void
}

export function WebinarCalendarDayDialog({
  isOpen,
  onOpenChange,
  selectedDate,
  events,
  onEventClick,
}: WebinarCalendarDayDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Webinars del{' '}
            {selectedDate?.toLocaleDateString('es-PE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              timeZone: 'UTC',
            })}
          </DialogTitle>
        </DialogHeader>

        {/* Events List */}
        <div className="max-h-[60vh] grid gap-2 overflow-y-auto pr-2">
          {events.length > 0 ? (
            events.map((event) => (
              <Button
                key={event.id}
                variant="outline"
                className="hover:bg-primary/5 flex h-auto flex-col items-start gap-1 p-3 text-left transition-all"
                onClick={() => onEventClick(event)}
              >
                {/* Event Title */}
                <div className="w-full truncate font-semibold">
                  {event.title}
                </div>

                {/* Event Time and Instructor */}
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Clock className="size-3" />
                  {formatEventTime(event.start)}
                  <span>•</span>
                  <span>{event.extendedProps.instructor}</span>
                </div>
              </Button>
            ))
          ) : (
            <p className="text-muted-foreground py-4 text-center">
              No se encontraron eventos para este día.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
