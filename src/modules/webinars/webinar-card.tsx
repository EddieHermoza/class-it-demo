import { WebinarType } from '@/modules/shared/types/webinar.types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Button } from '@/modules/shared/components/ui/button'
import { Calendar, Clock, Link as LinkIcon, Edit, Tag } from 'lucide-react'
import Link from 'next/link'
import { formatDate, formatTime } from '@/lib/utils'

interface Props {
  webinar: WebinarType
}

export default function WebinarCard({ webinar }: Props) {
  return (
    <Card className="hover:bg-accent hover:border-accent flex h-full flex-col rounded-none duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="line-clamp-2 text-lg">
            {webinar.title}
          </CardTitle>
          <div className="bg-primary text-primary-foreground flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs">
            <Tag className="size-3" />
            Webinar
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

        <div className="bg-primary/10 flex items-start gap-2 overflow-hidden rounded-lg p-3">
          <LinkIcon className="text-primary mt-0.5 size-4 shrink-0" />
          <p className="truncate text-sm">{webinar.linkUrl}</p>
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
