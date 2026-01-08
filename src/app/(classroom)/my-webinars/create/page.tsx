import { WebinarCreateForm } from '@/modules/webinars/webinar-create-form'
import { Button } from '@/modules/shared/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function CreateWebinarPage() {
  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8 flex items-center gap-5">
        <Button asChild variant={'ghost'}>
          <Link href={'/my-webinars'}>
            <ChevronLeftIcon className="size-5" />
          </Link>
        </Button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Programar nuevo webinar
          </h1>
          <p className="text-muted-foreground">
            Completa la información para tu próxima sesión en vivo.
          </p>
        </div>
      </div>
      <WebinarCreateForm />
    </div>
  )
}
