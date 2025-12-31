import { z } from 'zod'
import { SectionSchema } from './section-schema'

const MAX_IMAGE_SIZE = 1 * 1024 * 1024 // 1MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const CourseSchema = z.object({
  title: z
    .string()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder los 100 caracteres'),

  description: z
    .string()
    .min(
      50,
      'La descripción completa debe tener al menos 50 caracteres para ser útil'
    )
    .max(2000, 'La descripción es demasiado larga (máximo 2000 caracteres)'),

  shortDescription: z
    .string()
    .min(20, 'La descripción corta debe tener al menos 20 caracteres')
    .max(
      160,
      'La descripción corta no puede exceder los 160 caracteres (ideal para SEO y tarjetas)'
    ),

  whatYouWillLearn: z
    .string()
    .min(
      30,
      'Explica al menos 30 caracteres sobre lo que aprenderán los estudiantes'
    )
    .max(1000, 'Este campo es demasiado largo'),
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
            ALLOWED_IMAGE_TYPES.includes(val.type) &&
            val.size <= MAX_IMAGE_SIZE
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
    }),
  targetAudience: z
    .string()
    .min(20, 'Describe al menos con 20 caracteres a quién va dirigido el curso')
    .max(500, 'El público objetivo es demasiado extenso'),

  requirements: z
    .array(z.string().min(5, 'Cada requisito debe tener al menos 5 caracteres'))
    .min(1, 'Agrega al menos un requisito para el curso')
    .max(10, 'Máximo 10 requisitos recomendados'),

  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS'], {
    error: 'Debes seleccionar el nivel del curso',
  }),
  categoryId: z.uuidv4({ error: 'Debe ser una categoria válida' }),

  sections: z
    .array(SectionSchema)
    .min(1, 'El curso debe tener al menos una sección')
    .max(50, 'Máximo 50 secciones por curso'),
})

export type CourseSchemaType = z.infer<typeof CourseSchema>
