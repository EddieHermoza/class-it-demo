import { WebinarType } from '@/modules/shared/types/webinar.types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Button } from '@/modules/shared/components/ui/button'
import { formatDate, formatTime } from '@/lib/utils'
import { Copy, Calendar, Clock, Link as LinkIcon, Edit, Tag } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Props {
  webinar: WebinarType
}

export default function WebinarCard({ webinar }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(webinar.linkUrl)
    toast.success('Link copiado al portapapeles')
  }

  return (
    <Card className="border-primary/30 hover:bg-accent hover:border-accent flex h-full flex-col rounded-md duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <CardTitle className="line-clamp-2 text-lg">
              {webinar.title}
            </CardTitle>

          </div>
          <div className="bg-primary text-primary-foreground flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs">
            <Tag className="size-3" />
            {webinar.categoryName}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span className="text-sm">{formatDate(webinar.scheduleAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span className="text-sm">{formatTime(webinar.scheduleAt)}</span>
          </div>
        </div>

        <div className=" flex items-center justify-between gap-2 overflow-hidden rounded-lg p-2">
          <div className="flex items-center gap-2 overflow-hidden h-8 rounded">
            <LinkIcon className="text-primary size-4 shrink-0" />
            <p className="truncate text-sm">{webinar.linkUrl}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded"
            onClick={handleCopy}
            title="Copiar link"
          >
            <Copy className="size-4" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button
          asChild
          variant="outline"
          className="flex-1"
        >
          <Link href={`/my-webinars/edit/${webinar.id}`}>
            <Edit className="mr-2 size-4" />
            Editar
          </Link>
        </Button>
        <Button
          className="flex-1"
          onClick={() => window.open(webinar.linkUrl, '_blank')}
        >
          Unirse
        </Button>
      </CardFooter>
    </Card>
  )
}
