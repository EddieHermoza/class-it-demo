'use client'

import { BadgeCheckIcon, Calendar, ExternalLink, Download } from 'lucide-react'
import { Button } from '../shared/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../shared/components/ui/card'
import { Badge } from '../shared/components/ui/badge'
import { Certificate } from './certificates-container'
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
export default function CertificateCard(cert: Certificate) {
  return (
    <Card key={cert.id} className="overflow-hidden rounded-none p-0">
      <div className="border-border flex-center relative h-48 border-b">
        <img
          src={cert.courseId || '/placeholder.svg'}
          alt={`Certificado de ${cert.courseTitle}`}
          className="size-full object-cover object-top"
        />
        <Badge
          variant="secondary"
          className="absolute top-10 right-5 bg-green-500 text-white dark:bg-green-600"
        >
          <BadgeCheckIcon />
          Completado
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="leading-tight text-balance">
          {cert.courseTitle}
        </CardTitle>
        <CardDescription className="mt-2 flex flex-col gap-1">
          <span className="flex items-center gap-2 text-sm">
            <Calendar className="size-4" />
            Emitido el {formatDate(cert.createdAt)}
          </span>
          <span className="text-sm">Instructor: {cert.teacherFullname}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-2 pb-4">
        <Button asChild className="btn-cut flex-1 gap-2 rounded-none">
          <a href={cert.courseTitle} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="size-4" />
            Ver Certificado
          </a>
        </Button>

        <Button variant="outline" size="icon" asChild>
          <a href={cert.courseTitle} download>
            <Download className="size-4" />
            <span className="sr-only">Descargar certificado</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
