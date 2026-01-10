'use client'

import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Button } from '@/modules/shared/components/ui/button'
import { Badge } from '@/modules/shared/components/ui/badge'
import { IoBookOutline } from 'react-icons/io5'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../shared/components/ui/tooltip'
import { CourseResponse } from './my-courses-container'
interface MyCourseCardProps {
  course: CourseResponse
  onDelete: () => void
}

export default function MyCourseCard({ course, onDelete }: MyCourseCardProps) {
  const { id, title, status, createdAt, updatedAt } = course

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Badge className="bg-green-500 text-white">Publicado</Badge>
      case 'DRAFT':
        return <Badge className="bg-slate-500 text-white">Borrador</Badge>
      case 'READY_FOR_REVIEW':
        return <Badge className="bg-yellow-500 text-white">En Revisión</Badge>
      case 'REJECTED':
        return <Badge className="bg-red-500 text-white">Rechazado</Badge>
      case 'ARCHIVED':
        return <Badge className="bg-gray-500 text-white">Archivado</Badge>
      default:
        return <Badge className="bg-slate-500 text-white">{status}</Badge>
    }
  }

  return (
    <Tooltip>
      <div className="relative border-primary/30 hover:bg-accent hover:border-accent group bg-card h-full flex items-center rounded-md border p-4 duration-200">
        <div className="flex flex-1 flex-col justify-between">
          <h3 className="font-semibold">{title}</h3>

          <div className="absolute bottom-3 left-3">
            {getStatusBadge(status)}
          </div>

          <div className="text-muted-foreground my-3 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>Creado: {formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span>Actualizado: {formatDate(updatedAt)}</span>
            </div>
          </div>

          <div className="flex w-full flex-shrink-0 justify-end gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="destructive" onClick={onDelete}>
                  <FaTrash />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Eliminar curso</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/my-courses/edit/${id}`}>
                    <FaEdit />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar curso</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="sm">
                  <Link href={`/my-courses/preview/${id}`}>
                    <FaEye />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vista previa</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </Tooltip>
  )
}
