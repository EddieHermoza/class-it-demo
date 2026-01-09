/**
 * Webinar Calendar Detail Dialog Component
 * 
 * Displays detailed information for a single webinar event.
 * Shows:
 * - Event banner image with title overlay
 * - Instructor and scheduled date/time
 * - Countdown timer (if event hasn't started)
 * - Join button (enabled when event starts)
 */

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import {
  ExternalLink,
  User,
  Calendar as CalendarIcon,
  Clock,
} from 'lucide-react'
import { getCountdown, canJoinWebinar } from './webinar-calendar-utils'

interface WebinarCalendarDetailDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any
  currentTime: Date
}

export function WebinarCalendarDetailDialog({
  isOpen,
  onOpenChange,
  event,
  currentTime,
}: WebinarCalendarDetailDialogProps) {
  if (!event) return null

  // Calculate join eligibility and countdown
  const canJoin = canJoinWebinar(event.extendedProps?.scheduleAt, currentTime)
  const countdownText = getCountdown(event.extendedProps?.scheduleAt, currentTime)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">{event.title}</DialogTitle>
        </DialogHeader>

        {/* Event Banner Image */}
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded">
          <img
            src={event.extendedProps?.imageUrl}
            alt={event.title}
            className="size-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="drop-shadow-md text-2xl font-bold leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid gap-6 px-6 pt-4 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Instructor Info */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                <User className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Instructor
                </p>
                <p className="truncate text-sm font-semibold">
                  {event.extendedProps?.instructor}
                </p>
              </div>
            </div>

            {/* Date/Time Info */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
                <CalendarIcon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Fecha
                </p>
                <p className="truncate text-sm font-semibold">
                  {new Date(event.extendedProps?.scheduleAt).toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Lima',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Countdown or Join Link */}
          {!canJoin && countdownText ? (
            // Countdown Timer (event hasn't started)
            <div className="bg-primary/10 text-primary dark:bg-primary/5 dark:text-primary-400 border-primary/20 flex animate-pulse flex-col items-center gap-2 rounded-xl border p-4">
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
            // Join Link (event has started or countdown finished)
            <div className="bg-muted/50 border-border/50 flex flex-col gap-2 rounded-xl border p-4">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Link de acceso
              </p>
              <a
                href={event.extendedProps?.zoomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary flex items-center gap-2 break-all text-sm font-medium hover:underline"
              >
                <ExternalLink className="size-4 shrink-0" />
                {event.extendedProps?.zoomUrl}
              </a>
            </div>
          )}
        </div>

        {/* Join Button */}
        <DialogFooter className="px-6 pb-6 sm:justify-start">
          <Button
            className="h-12 w-full text-base font-bold transition-all hover:scale-[1.02]"
            disabled={!canJoin}
            onClick={() => window.open(event.extendedProps?.zoomUrl, '_blank')}
          >
            {canJoin ? 'Unirse al Webinar ahora' : 'Próximamente...'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
