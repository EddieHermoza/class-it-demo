'use client'

import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Calendar, Clock, ArrowRight, Video } from 'lucide-react'
import { useCountdown } from '../shared/hooks/use-countdown'
import CustomImage from '../shared/components/custom-image'
import { cn } from '@/lib/utils'

import { nextWebinar } from '@/__mocks__/webinar'

/**
 * Webinar Hero Section Component
 *
 * Displays a static, predefined webinar presentation section.
 * Redesigned for a modern, elegant, and static look.
 */
export default function WebinarHero() {
  const webinar = nextWebinar

  return (
    <section className=" relative w-full overflow-hidden py-20 lg:py-32">
      {/* Subtle background accent */}
      <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Column */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="border-primary/20 bg-primary/5 text-primary inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                <span className="bg-primary mr-2 flex h-2 w-2 rounded-full"></span>
                Próximo Evento en Vivo
              </div>

              <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl xl:text-4xl">
                {webinar.title}
              </h1>

              <p className="text-muted-foreground max-w-[600px] text-lg leading-relaxed">
                {webinar.description}
              </p>
            </div>

            <div className="border-border flex flex-col gap-6 border-y py-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Fecha
                  </p>
                  <p className="font-semibold">{webinar.date}</p>
                </div>
              </div>

              <div className="bg-border hidden w-px sm:block"></div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Hora
                  </p>
                  <p className="font-semibold">{webinar.time}</p>
                </div>
              </div>
            </div>

            <WebinarJoinButton linkUrl={webinar.linkUrl} />
          </div>

          {/* Image Column */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[400px]">
            {/* Aspect ratio wrapper 766/723 ~= 1.06 */}
            <div className="ring-border/50 bg-muted/20 relative aspect-[1024/1536] w-full overflow-hidden rounded-2xl shadow-2xl ring-1">
              <CustomImage
                src={webinar.image}
                alt={webinar.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative minimalist elements */}
            <div className="bg-primary/10 absolute -bottom-6 -left-6 -z-10 h-24 w-24 rounded-xl" />
            <div className="border-primary/10 absolute -top-6 -right-6 -z-10 h-24 w-24 rounded-full border-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Isolated join button with countdown to prevent flickering
 * in the parent component.
 */
function WebinarJoinButton({
  linkUrl,
  requiresValidation = false,
}: {
  linkUrl: string
  requiresValidation?: boolean
}) {
  // Target: Jan 9, 2026, 21:00 (9:00 PM)
  const targetDate = new Date(2026, 0, 9, 21, 0, 0)
  const { hours, minutes, seconds, isFinished } = useCountdown(targetDate)

  const canJoin = isFinished || !requiresValidation

  return (
    <Button
      asChild={canJoin}
      disabled={!canJoin}
      size="lg"
      className={cn(
        'btn-cut h-14 w-full rounded-none px-8 text-lg font-bold transition-all',
        !canJoin && 'cursor-not-allowed opacity-70'
      )}
    >
      {canJoin ? (
        <Link href={linkUrl} target="_blank">
          <Video className="mr-2 h-5 w-5" />
          Unirse
        </Link>
      ) : (
        <span className="flex items-center">
          <Clock className="mr-2 h-5 w-5 animate-pulse" />
          Unirse en {hours}:{minutes}:{seconds}
        </span>
      )}
    </Button>
  )
}
