'use client'

import { motion, useAnimation, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import CustomImage from '../shared/components/custom-image'
import { Button } from '../shared/components/ui/button'
import { ChevronLeft, ChevronRight, Handshake } from 'lucide-react'

/**
 * Alliances Section Component
 * 
 * Displays an elegant showcase of partner organizations with modern design,
 * grayscale-to-color hover effects, and subtle animations.
 */
export default function AlliancesSection() {
  const [subsetWidth, setSubsetWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()

  // Alliance logos data
  const alliances = [
    { id: 1, src: '/alliances/hackthony.webp', alt: 'Partner Alliance 1' },
    { id: 2, src: '/alliances/idea.webp', alt: 'Partner Alliance 2' },
    { id: 3, src: '/alliances/atids.webp', alt: 'Partner Alliance 3' },
    { id: 4, src: '/alliances/nexo.webp', alt: 'Partner Alliance 4' },
    { id: 5, src: '/alliances/conecta.webp', alt: 'Partner Alliance 5' },
    { id: 6, src: '/alliances/cartagena.webp', alt: 'Partner Alliance 6' },
    { id: 7, src: '/alliances/centro.webp', alt: 'Partner Alliance 7' },
    { id: 8, src: '/alliances/escuela.webp', alt: 'Partner Alliance 8' },
  ]

  // Triple the list to have [Left Buffer, Middle (Visible), Right Buffer]
  const infiniteAlliances = [...alliances, ...alliances, ...alliances]

  useEffect(() => {
    if (carouselRef.current) {
      // Calculate width of a single set (total width / 3)
      const singleSetWidth = carouselRef.current.scrollWidth / 3
      setSubsetWidth(singleSetWidth)
      
      // Initialize to the middle set (start of 2nd set)
      x.set(-singleSetWidth)
    }
  }, [x])

  useEffect(() => {
    if (subsetWidth === 0) return

    const unsubscribe = x.on('change', (latest: number) => {
      // Limit to ensure we don't jump if width is not calculated yet
      const overflowThreshold = 0
      const underflowThreshold = -2 * subsetWidth

      if (latest >= overflowThreshold) {
        // Dragged too far right (into first set) -> jump to start of middle set
        x.set(latest - subsetWidth)
      } else if (latest <= underflowThreshold) {
        // Dragged too far left (into third set) -> jump to end of middle set
        x.set(latest + subsetWidth)
      }
    })

    return () => unsubscribe()
  }, [x, subsetWidth])

  const slide = (direction: 'left' | 'right') => {
    const currentX = x.get()
    const containerWidth = carouselRef.current?.parentElement?.offsetWidth || 0
    const scrollAmount = containerWidth / 2 

    const newX = direction === 'left' ? currentX - scrollAmount : currentX + scrollAmount

    controls.start({
      x: newX,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
  }

  // Animation variants
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
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="static h-10 w-10 md:absolute md:-left-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all"
              onClick={() => slide('right')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="static h-10 w-10 md:absolute md:-right-12 md:top-1/2 md:-translate-y-1/2 rounded-full border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-all"
              onClick={() => slide('left')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Draggable Area */}
          <motion.div className="cursor-grab overflow-hidden active:cursor-grabbing">
            <motion.div
              ref={carouselRef}
              drag="x"
              // Remove hard constraints to allow infinite feel (logic handles reset)
              dragConstraints={{ left: -100000, right: 100000 }} 
              onDragEnd={() => {
                 // Optional: Snap logic could go here, but free scroll is fine
              }}
              whileTap={{ cursor: 'grabbing' }}
              animate={controls}
              style={{ x }}
              className="flex w-max gap-8 py-4 sm:gap-12"
            >
              {infiniteAlliances.map((alliance, index) => (
                <motion.div
                  key={`${alliance.id}-${index}`}
                  className="group relative flex h-28 w-48 shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 sm:h-32 sm:w-56"
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
              ))}
            </motion.div>
          </motion.div>
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
