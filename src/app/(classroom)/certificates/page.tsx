import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'

import CertificatesContainer from '@/modules/certificates/certificates-container'
import { ITEMS_PER_PAGE } from '@/modules/shared/constants'

type SearchParams = {
  page?: string
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}
export default async function CertificatesPage({ searchParams }: Props) {
  const { page } = await searchParams
  const pageValue = Number(page) || 1
  return (
    <div className="relative container mx-auto h-full p-5">
      <Card className="flex-1 border-none bg-transparent shadow-none h-full">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Mis Certificados</CardTitle>
        </CardHeader>
        <CardContent className='h-full'>
          <CertificatesContainer page={pageValue} limit={ITEMS_PER_PAGE} />
        </CardContent>
      </Card>
    </div>
  )
}
