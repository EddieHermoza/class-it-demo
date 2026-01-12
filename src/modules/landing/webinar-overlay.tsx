'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/modules/shared/components/ui/button'
import { Calendar, Clock, Video, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import CustomImage from '../shared/components/custom-image'
import { useWebinarOverlayStore } from '@/modules/shared/stores/use-webinar-overlay-store'
import { useCountdown } from '../shared/hooks/use-countdown'


import { nextWebinar } from '@/__mocks__/webinar'

/**
 * Webinar Promotional Overlay Component
 *
 * Displays a full-screen overlay promoting the upcoming webinar.
 * Matches the design of the WebinarHero.
 */
export default function WebinarOverlay() {
  const isOpen = useWebinarOverlayStore((state) => state.isOpen)
  const hasSeenOverlay = useWebinarOverlayStore((state) => state.hasSeenOverlay)
  const closeOverlay = useWebinarOverlayStore((state) => state.closeOverlay)


  // Auto-open overlay if user hasn't seen it
  useEffect(() => {
    if (!hasSeenOverlay) {
      useWebinarOverlayStore.setState({ isOpen: true })
    }
  }, [hasSeenOverlay])

  const webinar = nextWebinar

  const handleClose = () => {
    closeOverlay()
  }

  // Animation variants (Dialog only)
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="bg-background/80 absolute inset-0 backdrop-blur-md"
            variants={backdropVariants}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="border-border custom-scrollbar bg-background relative z-10 w-full max-w-6xl overflow-x-hidden max-sm:h-[90svh] overflow-y-auto rounded border shadow-xl max-sm:shadow-sm"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="hover:rotate-90 active:rotate-90 active:text-primary bg-muted/50 hover:bg-muted absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:text-primary"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Subtle background accent */}
            <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-primary/5 absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full blur-3xl" />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 items-center gap-10 p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">
              {/* Content Column */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="border-primary/20 bg-primary/5 text-primary inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-medium">
                    <span className="bg-primary mr-2 flex h-2 w-2 rounded-full"></span>
                    Próximo Evento en Vivo
                  </div>

                  <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-3xl">
                    {webinar.title}
                  </h2>

                  <p className="text-muted-foreground text-lg leading-relaxed max-sm:hidden">
                    {webinar.description}
                  </p>
                </div>

                <div className="border-border flex flex-col gap-6 border-y py-6 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">
                        Fecha
                      </p>
                      <p className="text-sm font-semibold">{webinar.date}</p>
                    </div>
                  </div>

                  <div className="bg-border hidden h-10 w-px sm:block"></div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">
                        Hora
                      </p>
                      <p className="text-sm font-semibold">{webinar.time}</p>
                    </div>
                  </div>
                </div>

                <WebinarJoinButton linkUrl={webinar.linkUrl} onClick={handleClose} />
              </div>

              {/* Image Column */}
              <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[300px] md:max-w-sm">
                {/* Aspect ratio wrapper 766/723 */}
                <div className="ring-border/50 bg-muted/20 relative aspect-[1024/1536] w-full overflow-hidden rounded-2xl shadow-xl ring-1">
                  <CustomImage
                    src={webinar.image}
                    alt={webinar.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Decorative minimalist elements */}
                <div className="bg-primary/10 absolute -bottom-4 -left-4 -z-10 h-16 w-16 rounded-xl" />
                <div className="border-primary/10 absolute -top-4 -right-4 -z-10 h-16 w-16 rounded-full border-2" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function WebinarJoinButton({
  linkUrl,
  onClick,
  requiresValidation = false,
}: {
  linkUrl: string
  onClick?: () => void
  requiresValidation?: boolean
}) {
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
        <Link href={linkUrl} target="_blank" onClick={onClick}>
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