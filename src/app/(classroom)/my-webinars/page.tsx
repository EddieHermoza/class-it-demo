import { authOptions } from '@/modules/auth/auth-options'
import WebinarContainer from '@/modules/webinars/webinar-container'
import { Button } from '@/modules/shared/components/ui/button'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { FiPlus } from 'react-icons/fi'
import QueryInputFilter from '@/modules/shared/components/filters/query-input-filter'
import CategorySelectFilter from '@/modules/shared/components/filters/category-select-filter'

export default async function MyWebinarsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login')
  }
  return (
    <div className="py-5 max-md:px-3">
      <div className="container mx-auto mb-5 flex w-full items-end justify-between gap-5 p-5 max-sm:flex-col">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-balance lg:text-3xl">
            Mis Webinars
          </h1>
          <p className="text-muted-foreground">
            Administra y programa tus sesiones en vivo
          </p>
        </div>
        <Button
          asChild
          className="flex-center gap-3 rounded-none max-sm:w-full"
        >
          <Link href={'/my-webinars/create'}>
            <FiPlus className="size-4" />
            Programar Webinar
          </Link>
        </Button>
      </div>
      <Suspense>
        <div className="container mx-auto mb-5 flex items-center justify-between gap-5 max-md:flex-col max-md:items-start">
          <QueryInputFilter />
          <CategorySelectFilter />
        </div>
        <WebinarContainer />
      </Suspense>
    </div>
  )
}
