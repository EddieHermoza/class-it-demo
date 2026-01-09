'use client'

import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Pagination from '@/modules/shared/components/ui/pagination'
import { Button } from '@/modules/shared/components/ui/button'
import { Loading } from '@/modules/shared/components'
import { WebinarResponse } from '@/modules/shared/types/webinar.types'
import { useApiFetch } from '../shared/hooks/use-api-fetch'
import WebinarCard from './webinar-card'
import { ITEMS_PER_PAGE } from '../shared/constants'
import { useState } from 'react'
import { DeleteWebinarButton } from './delete-webinar-button'
import { WebinarType } from '../shared/types/webinar.types'

export default function WebinarContainer() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page') || '1')
  const query = searchParams.get('query') || ''
  const categoryId = searchParams.get('categoryId') || ''
  const limit = ITEMS_PER_PAGE

  const hasToken = !!session?.tokens.access

  const { data, isLoading, isValidating, mutate } = useApiFetch<WebinarResponse>(
    '/api/V1/webinars/my-webinars',
    {
      page,
      query,
      categoryId,
      limit,
    },
    session?.tokens.access,
    {},
    hasToken
  )

  const [open, setOpen] = useState(false)
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarType | null>(
    null
  )

  const webinars = data?.data ?? []
  const totalPages = data?.totalPages ?? 0

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (webinars.length === 0 && !isValidating) {
    return (
      <div className="bg-muted/30 flex min-h-[500px] flex-col items-center justify-center rounded-xl px-6 py-16 text-center">
        <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <CalendarIcon className="text-primary h-10 w-10" />
        </div>

        <h2 className="mb-3 text-2xl font-semibold">
          {query || categoryId
            ? 'No se encontraron webinars'
            : 'Aún no tienes webinars'}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {query || categoryId
            ? 'Intenta ajustar tus criterios de búsqueda.'
            : 'Programa tu primera sesión en vivo y conecta con tus estudiantes.'}
        </p>

        {!query && !categoryId && (
          <Link
            href="/my-webinars/create"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 px-5 py-3 font-medium text-white transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            Programar mi primer webinar
          </Link>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="h-full w-full flex-1">
        <div className="container mx-auto flex items-center justify-between">
          <Pagination totalPages={totalPages} />
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-6 py-5 md:grid-cols-2 xl:grid-cols-3">
          {webinars.map((webinar) => (
            <WebinarCard
              key={webinar.id}
              webinar={webinar}
              onDelete={() => {
                setSelectedWebinar(webinar)
                setOpen(true)
              }}
            />
          ))}
        </div>
      </div>
      <DeleteWebinarButton
        token={session?.tokens.access ?? ''}
        open={open}
        handleOpenChange={setOpen}
        webinar={selectedWebinar}
        handleRefresh={mutate}
      />
    </>
  )
}
