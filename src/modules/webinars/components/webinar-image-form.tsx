'use client'

import { useEffect, useState, DragEvent } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import ErrorMessage from '@/modules/shared/components/error-message'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/modules/shared/components/ui/card'
import { WebinarFormValues } from '../schemas/webinar-schema'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  defaultImageUrl?: string
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 1 * 1024 * 1024 // 1MB

export default function WebinarImageSection({ defaultImageUrl }: Props) {
  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<WebinarFormValues>()

  const fileValue = useWatch({
    control,
    name: 'file',
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const hasExistingImage = !!defaultImageUrl
  
  // Extraemos el File real de forma segura
  const getFileFromValue = (value: unknown): File | null => {
    if (!value) return null
    if (typeof value === 'string') return null // URL existente
    if (value instanceof File) return value
    if (value instanceof FileList && value.length > 0) return value[0]
    return null
  }

  const currentFile = getFileFromValue(fileValue)

  const hasNewFile = !!currentFile

  const isImageRequired = !hasExistingImage && !hasNewFile

  // Generar preview
  useEffect(() => {
    let objectUrl: string | undefined = undefined

    if (currentFile) {
      objectUrl = URL.createObjectURL(currentFile)
      setPreview(objectUrl)
    } else if (hasExistingImage) {
      setPreview(defaultImageUrl!)
    } else {
      setPreview(null)
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [currentFile, defaultImageUrl, hasExistingImage])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return

    if (!ALLOWED_TYPES.includes(droppedFile.type)) {
      // Puedes usar toast aquí si lo deseas
      return
    }
    if (droppedFile.size > MAX_SIZE) {
      return
    }

    setValue('file', droppedFile, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Imagen de Portada</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-muted flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-6 text-center transition-colors',
            isDragging ? 'bg-primary/10 border-primary' : 'hover:bg-muted/30'
          )}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            {...register('file')}
          />

          {!preview ? (
            <>
              <p className="text-sm font-medium">
                Arrastra y suelta la imagen aquí
              </p>
              <p className="text-muted-foreground text-xs">
                o haz clic para seleccionar
              </p>
            </>
          ) : (
            <Image
              src={preview}
              height={200}
              width={400}
              alt="Vista previa de la imagen del webinar"
              className="max-h-56 w-full rounded-md object-contain"
              draggable={false}
              unoptimized // Necesario si es object URL
            />
          )}
        </div>

        <ErrorMessage message={errors.file?.message as string} />

        {/* Mensaje original de requerimiento no estaba en el form de cursos, pero estaba comentado en mi pensamiento anterior. 
            El form de cursos tiene: 
            {isImageRequired && ( <p ...>Debes subir una imagen para este curso</p> )}
            Voy a mantenerlo si es util, pero el schema ya valida 'required' si fuera necesario. 
            En form de cursos, el schema 'file' es opcional en update pero required en create? 
            CourseSchema tiene file: z.any().optional()...
            Pero en CourseImageSection usa isImageRequired visual text.
            Voy a incluirlo para fidelidad visual.
        */}
        
        {/*
        El schema del webinar tiene file optional pero con validaciones.
        Si queremos el mismo diseño, incluimos la advertencia visual si falta imagen.
        */}
         
        <p className="text-muted-foreground text-xs">
          Formatos permitidos: JPG, PNG, WEBP. Tamaño máximo: 1MB.
        </p>
      </CardContent>
    </Card>
  )
}
