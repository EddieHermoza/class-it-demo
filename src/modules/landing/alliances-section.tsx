'use client'

import { motion } from 'motion/react'
import CustomImage from '../shared/components/custom-image'
import { Handshake } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../shared/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

/**
 * Alliances Section Component
 * 
 * Displays an elegant showcase of partner organizations with modern design,
 * grayscale-to-color hover effects, and auto-playing carousel.
 */
export default function AlliancesSection() {
  // Alliance logos data
  const alliances = [
    { id: 1, src: '/alliances/hackthony.webp', alt: 'Partner Alliance 1' },
    { id: 2, src: '/alliances/idea.webp', alt: 'Partner Alliance 2' },
    { id: 3, src: '/alliances/atids.png', alt: 'Partner Alliance 3' },
    { id: 4, src: '/alliances/nexo.webp', alt: 'Partner Alliance 4' },
    { id: 5, src: '/alliances/conecta.webp', alt: 'Partner Alliance 5' },
    { id: 6, src: '/alliances/cartagena.webp', alt: 'Partner Alliance 6' },
    { id: 7, src: '/alliances/centro.webp', alt: 'Partner Alliance 7' },
    { id: 8, src: '/alliances/escuela.webp', alt: 'Partner Alliance 8' },
  ]

  // Animation variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-muted/20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
        >
          {/* Badge */}
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Handshake className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Nuestras Alianzas
            </span>
          </motion.div>

          <h2 className="text-3xl font-bold md:text-4xl">
            Trabajamos con las mejores organizaciones
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mx-auto w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-8 py-4 sm:-ml-12">
              {alliances.map((alliance) => (
                <CarouselItem 
                  key={alliance.id} 
                  className="pl-8 sm:pl-12 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <motion.div
                    className="group relative flex h-28 w-full items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 sm:h-32"
                  >
                    <div className="relative h-full w-full opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
                      <CustomImage
                        src={alliance.src}
                        alt={alliance.alt}
                        fill
                        className="pointer-events-none object-contain scale-105"
                      />
                    </div>
                    
                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-center gap-4 md:mt-0">
              <CarouselPrevious className="static h-10 w-10 md:absolute md:-left-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all" />
              <CarouselNext className="static h-10 w-10 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all" />
            </div>
          </Carousel>
        </div>

        {/* Bottom Text */}
        <motion.p
          className="text-muted-foreground mt-12 text-center text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Colaborando para ofrecer la mejor experiencia educativa
        </motion.p>
      </div>
    </section>
  )
}
