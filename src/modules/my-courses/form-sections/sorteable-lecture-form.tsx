'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, Clock, Video, Link } from 'lucide-react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Image from 'next/image'

import { Input } from '@/modules/shared/components/ui/input'
import { CourseSchemaType } from '../schemas/course-schema'
import { Button } from '@/modules/shared/components/ui/button'
import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import { Label } from '@/modules/shared/components/ui/label'
import ErrorMessage from '@/modules/shared/components/error-message'

interface SortableLectureProps {
  id: string
  sectionIndex: number
  index: number
  onRemove: () => void
}

export function SortableLecture({
  id,
  sectionIndex,
  index,
  onRemove,
}: SortableLectureProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CourseSchemaType>()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  }

  const lectureErrors = errors.sections?.[sectionIndex]?.lectures?.[index]

  // Observamos el videoUrl para generar el thumbnail
  const videoUrl = useWatch({
    control,
    name: `sections.${sectionIndex}.lectures.${index}.videoUrl`,
  })

  // Función para extraer videoId de URLs de YouTube
  const getYoutubeVideoId = (url: string): string | null => {
    if (!url) return null
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = videoUrl ? getYoutubeVideoId(videoUrl) : null
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-card relative flex items-stretch rounded-xl border shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Grip Vertical */}
      <div
        {...attributes}
        {...listeners}
        className="hover:text-primary flex cursor-grab items-center px-3"
      >
        <GripVertical className="text-muted-foreground h-5 w-5" />
      </div>
      {thumbnailUrl && (
        <div className="flex-center pointer-events-none max-xl:hidden">
          <div className="bg-muted relative aspect-video h-20 shadow-sm">
            <Image
              src={thumbnailUrl}
              alt="Miniatura del video"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}
      {/* Contenido principal */}
      <div className="flex-1 py-4 pr-4 pl-4">
        {/* Fila 1: Título + Vista previa (checkbox) */}
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12">
          <div className="md:col-span-9">
            <div className="relative">
              <Video className="text-muted-foreground pointer-events-none absolute top-3 left-3 h-4 w-4" />
              <Input
                placeholder="Título de la lección"
                className="focus-visible:ring-primary/20 h-10 border-0 bg-transparent pl-10 text-base font-medium shadow-none focus-visible:ring-2"
                {...register(
                  `sections.${sectionIndex}.lectures.${index}.title`
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:col-span-3 md:justify-end">
            <Controller
              name={`sections.${sectionIndex}.lectures.${index}.isPreview`}
              render={({ field }) => (
                <Checkbox
                  id={`preview-${sectionIndex}-${index}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary"
                />
              )}
            />
            <Label
              htmlFor={`preview-${sectionIndex}-${index}`}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
              Vista previa
            </Label>
          </div>
        </div>

        {/* Fila 2: URL del video + Duración */}
        {/* Fila 2: URL del video + Duración */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-9">
            <div className="relative">
              {/* Thumbnail pequeño si hay video de YouTube */}

              {/* Ícono de enlace */}
              <Link
                className={`text-muted-foreground pointer-events-none absolute top-3 left-3 size-4 transition-all`}
              />

              <Input
                placeholder="URL del video de YouTube"
                className={`h-10 pl-10 text-sm transition-all`}
                {...register(
                  `sections.${sectionIndex}.lectures.${index}.videoUrl`
                )}
              />
            </div>
          </div>

          {/* Duración */}
          <div className="md:col-span-3">
            <div className="relative">
              <Clock className="text-muted-foreground pointer-events-none absolute top-3 left-3 h-4 w-4" />
              <Input
                type="number"
                placeholder="Duración (min)"
                min={0}
                className="h-10 [appearance:textfield] pl-10 [&::-webkit-outer-spin-button]:appearance-none"
                {...register(
                  `sections.${sectionIndex}.lectures.${index}.duration`,
                  {
                    valueAsNumber: true,
                  }
                )}
              />
            </div>
          </div>
        </div>

        {/* Errores */}
        {(lectureErrors?.title ||
          lectureErrors?.duration ||
          lectureErrors?.videoUrl) && (
          <div className="mt-4 flex flex-wrap gap-4">
            <ErrorMessage message={lectureErrors.title?.message} />
            <ErrorMessage message={lectureErrors.videoUrl?.message} />
            <ErrorMessage message={lectureErrors.duration?.message} />
          </div>
        )}
      </div>

      {/* Botón eliminar */}
      <div className="flex items-center pr-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive h-8 w-8"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
