'use client'

import { motion } from 'motion/react'
import CustomImage from '../shared/components/custom-image'
import { Handshake } from 'lucide-react'

/**
 * Alliances Section Component
 * 
 * Displays an elegant showcase of partner organizations with modern design,
 * grayscale-to-color hover effects, and subtle animations.
 */
export default function AlliancesSection() {
  // Alliance logos data
  const alliances = [
    { id: 1, src: '/alliances/hackthony.webp', alt: 'Partner Alliance 1' },
    { id: 2, src: '/alliances/idea.webp', alt: 'Partner Alliance 2' },
    { id: 3, src: '/alliances/atids.webp', alt: 'Partner Alliance 3' },
    { id: 4, src: '/alliances/nexo.webp', alt: 'Partner Alliance 4' },
    { id: 5, src: '/alliances/conecta.webp', alt: 'Partner Alliance 5' },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

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

        {/* Logos Grid */}
        <motion.div
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {alliances.map((alliance) => (
            <motion.div
              key={alliance.id}
              className="group relative"
              variants={itemVariants}
            >
              {/* Logo Container */}
              <motion.div
                className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                whileHover={{ 
                  scale: 1.05,
                  y: -4,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Logo Image */}
                <div className="relative h-full w-full">
                  <CustomImage
                    src={alliance.src}
                    alt={alliance.alt}
                    fill
                    className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

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
