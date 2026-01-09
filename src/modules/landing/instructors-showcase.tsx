'use client'

import { instructors } from '@/__mocks__/instructors'
import CustomImage from '../shared/components/custom-image'
import { Award } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../shared/animate-ui/components/radix/hover-card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shared/components/ui/dialog'
import { useIsDesktop } from '../shared/hooks/use-desktop'

/**
 * Instructors Showcase Component
 * 
 * Displays a simple showcase of national and international instructors
 * with minimal design - showing only image, name, and country.
 * Includes a hover card with detailed information.
 */
export default function InstructorsShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Docentes Expertos Nacionales e Internacionales
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Profesionales que comparten su experiencia
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorItem key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  )
}

function InstructorItem({ instructor }: { instructor: (typeof instructors)[0] }) {
  const isDesktop = useIsDesktop()

  const ImageTrigger = (
    <div className="border hover:border-primary hover:shadow-xl transition-[shadow,border-color] duration-500 group relative aspect-square overflow-hidden mb-4 mx-auto size-60 cursor-pointer rounded-full">
      <CustomImage
        src={instructor.foto}
        alt={instructor.nombre_completo}
        fill
        className="object-cover"
      />
    </div>
  )

  const InfoContent = (
    <div className="space-y-3">
      {/* Training Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Capacitación
          </span>
        </div>
        <h4 className="text-sm font-bold leading-tight">
          {instructor.capacitacion.titulo}
        </h4>
      </div>

      {/* Objective */}
      <p className="text-xs leading-relaxed text-muted-foreground">
        {instructor.capacitacion.objetivo_alcanzado}
      </p>
    </div>
  )

  const PersonInfo = (
    <>
      {/* Name */}
      <h3 className="mb-2 text-xl font-bold">{instructor.nombre_completo}</h3>

      {/* Country */}
      <div className="flex items-center justify-center gap-3">
        <img
          src={`https://flagsapi.com/${instructor.bandera_iso.toUpperCase()}/flat/32.png`}
          alt={instructor.pais}
          className="w-8 h-auto"
        />
        <span className="text-sm text-muted-foreground font-medium">
          {instructor.pais}
        </span>
      </div>
    </>
  )

  return (
    <div className="text-center">
      {!isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>{ImageTrigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">{instructor.nombre_completo}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {InfoContent}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>{ImageTrigger}</HoverCardTrigger>
          <HoverCardContent className="w-80" align="center">
            {InfoContent}
          </HoverCardContent>
        </HoverCard>
      )}

      {PersonInfo}
    </div>
  )
}
