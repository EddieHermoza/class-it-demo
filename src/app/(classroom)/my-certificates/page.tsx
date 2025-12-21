'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Button } from '@/modules/shared/components/ui/button'
import { Award, Calendar, Download, ExternalLink } from 'lucide-react'

interface Certificate {
  id: string
  courseName: string
  issueDate: string
  instructor: string
  completionRate: number
  certificateUrl: string
  thumbnail: string
}

export default function CertificatesPage() {
  const certificates: Certificate[] = [
    {
      id: '1',
      courseName: 'Fundamentos de React y Next.js',
      issueDate: '2024-03-15',
      instructor: 'Carlos Rodríguez',
      completionRate: 100,
      certificateUrl: '#',
      thumbnail: '/certificados.webp',
    },
    {
      id: '2',
      courseName: 'TypeScript Avanzado para Desarrollo Web',
      issueDate: '2024-02-20',
      instructor: 'Ana Martínez',
      completionRate: 100,
      certificateUrl: '#',
      thumbnail: '/certificados.webp',
    },
    {
      id: '3',
      courseName: 'Diseño UI/UX con Tailwind CSS',
      issueDate: '2024-01-10',
      instructor: 'Luis García',
      completionRate: 100,
      certificateUrl: '#',
      thumbnail: '/certificados.webp',
    },
    {
      id: '4',
      courseName: 'API RESTful con Node.js y Express',
      issueDate: '2023-12-05',
      instructor: 'María López',
      completionRate: 100,
      certificateUrl: '#',
      thumbnail: '/certificados.webp',
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="container p-5 mx-auto">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Mis Certificados</CardTitle>
          <CardDescription>
            Has completado {certificates.length} cursos con éxito
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="flex-center gap-5">
          <div className="bg-chart-1/10 flex-center size-12 rounded-full">
            <Award className="text-primary size-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Certificados</p>
            <p className="text-foreground text-2xl font-bold">
              {certificates.length}
            </p>
          </div>
        </div>
        <div className="flex-center gap-5">
          <div className="bg-chart-1/10 flex-center size-12 rounded-full">
            <Calendar className="text-primary size-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Último Certificado</p>
            <p className="text-lg font-bold">Marzo 2024</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="overflow-hidden"
          >
            <div className="border-border relative flex-center h-48 border-b">
              <img
                src={cert.thumbnail || '/placeholder.svg'}
                alt={`Certificado de ${cert.courseName}`}
                className="size-full object-cover"
              />
              <div className="bg-background/90 text-foreground border-border absolute top-4 right-4 rounded-full border px-4 py-2 backdrop-blur-sm">
                Completado
              </div>
            </div>

            <CardHeader>
              <CardTitle className="leading-tight text-balance">
                {cert.courseName}
              </CardTitle>
              <CardDescription className="mt-2 flex flex-col gap-1">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4" />
                  Emitido el {formatDate(cert.issueDate)}
                </span>
                <span className="text-sm">Instructor: {cert.instructor}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Button asChild className="flex-1 gap-2">
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Ver Certificado
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={cert.certificateUrl} download>
                    <Download className="size-4" />
                    <span className="sr-only">Descargar certificado</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (shown when no certificates) */}
      {certificates.length === 0 && (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
              <Award className="text-muted-foreground h-10 w-10" />
            </div>
            <h3 className="text-foreground mb-2 text-xl font-semibold">
              Aún no tienes certificados
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Completa tus primeros cursos para obtener certificados que validen
              tus conocimientos
            </p>
            <Button size="lg">Explorar Cursos</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
