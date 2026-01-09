import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { ArrowRight, Clock, Award, CheckCircle2 } from 'lucide-react'
import CategoriesGrid from '@/modules/landing/categories-grid'
import CoursesGrid from '@/modules/landing/courses-grid'
import LearningAnimation from '@/modules/shared/components/lottie/learning-animation'
import WebinarHero from '@/modules/landing/webinar-hero'
import WebinarOverlay from '@/modules/landing/webinar-overlay'
import InstructorsShowcase from '@/modules/landing/instructors-showcase'
import AlliancesSection from '@/modules/landing/alliances-section'
import { Separator } from '@/modules/shared/components/ui/separator'

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-muted/30">
      {/* ================= WEBINAR OVERLAY (First Visit) ================= */}
      <WebinarOverlay />
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <h1 className="text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                Domina las habilidades
                <span className="text-primary block">del futuro digital</span>
              </h1>

              <p className="max-w-lg text-lg md:text-xl">
                Cursos prácticos de Desarrollo, IA, Diseño, Data y más,
                impartidos por expertos de la industria.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="btn-cut w-full rounded-none"
                >
                  <Link href={'/courses'}>
                    Ir a cursos
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <LearningAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WEBINAR HERO ================= */}
      <WebinarHero />

      {/* ================= STATS ================= */}
      {/* <section className="bg-muted/30 border-y py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { value: '1.200+', label: 'Cursos disponibles' },
              { value: '50k+', label: 'Estudiantes inscritos' },
              { value: '300+', label: 'Instructores expertos' },
              { value: '4.8★', label: 'Valoración promedio' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <p className="text-primary text-4xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <CategoriesGrid />

      <CoursesGrid />
      
      {/* ================= INSTRUCTORS ================= */}
      <InstructorsShowcase />

      {/* ================= BENEFITS ================= */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">¿Por qué elegir Class IT?</h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: 'Aprende a tu ritmo',
                desc: 'Acceso ilimitado de por vida. Estudia cuando y donde quieras.',
              },
              {
                icon: Award,
                title: 'Certificado oficial',
                desc: 'Al finalizar recibes un certificado ',
              },
              {
                icon: CheckCircle2,
                title: 'Proyectos reales',
                desc: 'Construye un portafolio profesional con proyectos prácticos.',
              },
            ].map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="space-y-5 text-center">
                  <div className="bg-primary/10 mx-auto flex size-20 items-center justify-center rounded-full">
                    <Icon className="text-primary size-10" />
                  </div>
                  <h3 className="text-2xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground mx-auto max-w-sm text-lg">
                    {benefit.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* ================= ALLIANCES ================= */}
      <AlliancesSection />

      {/* ================= FINAL CTA ================= */}
      <section className="from-primary to-primary/80 bg-gradient-to-r py-24">
        <div className="text-primary-foreground mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-5xl font-bold">
            Tu futuro profesional
            <span className="block">empieza hoy</span>
          </h2>
          <p className="text-primary-foreground mx-auto mb-10 max-w-2xl text-xl">
            Únete a más de 50.000 estudiantes que ya están transformando su
            carrera con Class IT.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="btn-cut w-full rounded-none px-10 py-6 text-lg sm:max-w-80"
            >
              <Link href={'/courses'}>
                Ir cursos
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
<Separator className='my-5 dark:bg-white'/>
          <p className="text-xs sm:text-sm">
            <Link
              href="https://rsu-it.com/"
              target="_blank"
              className="hover:underline"
            >
              Derechos reservados Responsabilidad Social Universitario e
              Integración Tecnológica
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
