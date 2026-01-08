import { z } from 'zod'

const MAX_IMAGE_SIZE = 1 * 1024 * 1024 // 1MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const webinarSchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder los 100 caracteres'),
  date: z.string().min(1, 'La fecha es requerida'),
  time: z.string().min(1, 'La hora es requerida'),
  categoryId: z.uuid('La categoría es requerida'),
  linkUrl: z.url('Debe ser una URL válida'),
  file: z
    .any() // Aceptamos cualquier cosa (string URL, File, FileList, undefined)
    .optional()
    .refine(
      (val) => {
        // Si no hay valor → válido (opcional)
        if (!val) return true

        // Si es string (URL existente) → válido
        if (typeof val === 'string') return true

        // Si es File → validar tipo y tamaño
        if (val instanceof File) {
          return (
            ALLOWED_IMAGE_TYPES.includes(val.type) && val.size <= MAX_IMAGE_SIZE
          )
        }

        // Si es FileList → validar el primer archivo
        if (val instanceof FileList) {
          if (val.length === 0) return true // vacío es válido (opcional)
          const firstFile = val[0]
          return (
            ALLOWED_IMAGE_TYPES.includes(firstFile.type) &&
            firstFile.size <= MAX_IMAGE_SIZE
          )
        }

        return false
      },
      {
        message: 'Formato no permitido (JPG, PNG, WebP) o tamaño superior a 1MB',
      }
    )
    .transform((val) => {
      // Normalizamos siempre a File | string | undefined
      if (!val) return undefined
      if (typeof val === 'string') return val
      if (val instanceof File) return val
      if (val instanceof FileList && val.length > 0) return val[0]
      return undefined
    })
    .optional(),
})

export type WebinarFormValues = z.infer<typeof webinarSchema>
