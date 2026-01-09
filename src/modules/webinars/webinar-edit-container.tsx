'use client'

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { WebinarEditForm } from '@/modules/webinars/webinar-edit-form'
import { useApiFetch } from '../shared/hooks/use-api-fetch'
import { WebinarType } from '@/modules/shared/types/webinar.types'
import { Loading } from '@/modules/shared/components'
import { AlertCircle, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'

export default function WebinarEditContainer() {
  const { id } = useParams()
  const { data: session } = useSession()

  const { data, isLoading, error } = useApiFetch<WebinarType>(
    `/api/V1/webinars/${id}`,
    {},
    session?.tokens.access,
    {},
    !!session?.tokens.access
  )

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loading />
        <p className="text-muted-foreground animate-pulse">
          Cargando datos del webinar...
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-destructive/10 border-destructive/20 flex flex-col items-center justify-center rounded-xl border p-12 text-center">
        <div className="bg-destructive/10 text-destructive mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <AlertCircle className="size-8" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Error al cargar el webinar</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          No pudimos encontrar el webinar que intentas editar o no tienes
          permisos suficientes.
        </p>
        <Button asChild variant="outline">
          <Link href="/my-webinars">Volver a mis webinars</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8 flex items-center gap-5">
        <Button asChild variant={'ghost'} className='size-10 rounded-full'>
          <Link href={'/my-webinars'}>
            <ChevronLeftIcon className="size-5" />
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Editar {data.title}
          </h1>
          <p className="text-muted-foreground">
            Actualiza los detalles de tu sesión en vivo.
          </p>
        </div>
      </div>

      <WebinarEditForm webinarId={id as string} initialData={data} />
    </div>
  )
}
