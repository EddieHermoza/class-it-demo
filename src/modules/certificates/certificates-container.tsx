'use client'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Button } from '@/modules/shared/components/ui/button'

import { Award } from 'lucide-react'
import { Loading } from '@/modules/shared/components'
import { useSession } from 'next-auth/react'
import CertificateCard from './certificate-card'
import { toast } from 'sonner'
import Pagination from '../shared/components/ui/pagination'
import Link from 'next/link'
import { useApiFetch } from '../shared/hooks/use-api-fetch'

interface Props {
  page: number
  limit: number
}

export type Certificate = {
  id: string
  studentId: string
  studentFullname: string
  courseId: string
  courseTitle: string
  teacherId: string
  teacherFullname: string
  createdAt: string
}

export type GetCertificatesResponse = {
  data: Certificate[]
  total: number
  totalPages: number
}

export default function CertificatesContainer({ page, limit }: Props) {
  const { data: session } = useSession()
  const hasToken = !!session?.tokens.access
  const { data, error, isLoading, isValidating } =
    useApiFetch<GetCertificatesResponse>(
      '/api/V1/certificates/me',
      { page, limit },
      session?.tokens.access,
      {},
      hasToken
    )
  const certificates = data?.data ?? []

  if (isLoading) {
    return <Loading />
  }
  if (error) toast.error(error.message)

  if (certificates.length === 0 && !isValidating) {
    return (
      <Card className="border-none shadow-none">
        <CardContent className="flex-center flex-col py-16 text-center">
          <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <Award className="text-muted-foreground h-10 w-10" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            Aún no tienes certificados
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Completa tus primeros cursos inscritos para obtener certificados que validen
            tus conocimientos
          </p>
          <Button size="lg" asChild>
            <Link href={'/learning'}>Ir a mi aprendizje</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Se ha completado un total de {data?.total} cursos
        </span>
        <Pagination totalPages={data?.totalPages ?? 1} />
      </div>
      <div className="grid gap-6 pt-0 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <CertificateCard key={i} {...cert} />
        ))}
      </div>
    </div>
  )
}
