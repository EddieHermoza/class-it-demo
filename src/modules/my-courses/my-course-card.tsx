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
  const { id, title, isPublished, createdAt, updatedAt } = course

  return (
    <Tooltip>
      <div className="group bg-card hover:border-primary/50 relative flex w-full items-center gap-5 border p-4 transition-colors duration-300">
        <div className="flex-shrink-0 pr-3">
          <IoBookOutline className="text-primary size-10" />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <h3 className="font-semibold">{title}</h3>

          <div className="absolute bottom-3 left-3">
            {isPublished ? (
              <Badge className="bg-green-500 text-white">Publicado</Badge>
            ) : (
              <Badge className="bg-red-500 text-white">Borrador</Badge>
            )}
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
                <Button asChild size="sm" variant="secondary">
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
