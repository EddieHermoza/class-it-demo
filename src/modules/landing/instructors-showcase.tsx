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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../shared/components/ui/carousel'

/**
 * Instructors Showcase Component
 * 
 * Displays a showcase of national and international instructors
 * using a shadcn/ui Carousel with navigation buttons and hover cards.
 */
export default function InstructorsShowcase() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
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

        {/* Carousel Container */}
        <div className="relative w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-12">
              {instructors.map((instructor) => (
                <CarouselItem key={instructor.id} className="pl-12 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <InstructorItem instructor={instructor} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Responsive Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4 md:mt-0">
              <CarouselPrevious className="static h-10 w-10 md:absolute md:-left-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all" />
              <CarouselNext className="static h-10 w-10 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function InstructorItem({ instructor }: { instructor: (typeof instructors)[0] }) {
  const isDesktop = useIsDesktop()

  const ImageTrigger = (
    <div className="relative border hover:border-primary hover:shadow-xl transition-[shadow,border-color] duration-500 group aspect-square overflow-hidden mb-4 mx-auto size-48 cursor-pointer rounded-full bg-muted">
      <CustomImage
        src={instructor.foto}
        alt={instructor.nombre_completo}
        height={224}
        width={224}
        className="w-40 mt-3  mx-auto object-contain object-bottom"
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
      <h3 className="mb-2 text-xl font-bold line-clamp-1">{instructor.nombre_completo}</h3>

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


