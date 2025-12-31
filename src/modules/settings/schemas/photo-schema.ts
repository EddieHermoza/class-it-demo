import { z } from 'zod'

const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const PhotoSchema = z.object({
  photo: z
    .instanceof(FileList, { message: 'Debes seleccionar una imagen' })
    .refine((files) => files.length > 0, 'Debes seleccionar una imagen')
    .refine(
      (files) => files[0].size <= MAX_FILE_SIZE,
      'La imagen no puede superar 1MB'
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      'Solo se permiten JPG, PNG o WebP'
    ),
})

export type PhotoSchemaType = z.infer<typeof PhotoSchema>
