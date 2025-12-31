import { z } from 'zod'
import { LectureSchema } from './lecture-schema'

export const SectionSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, 'El título de la sección es muy corto (mínimo 3 caracteres)')
    .max(
      120,
      'El título de la sección es demasiado largo (máximo 120 caracteres)'
    )
    .refine((val) => val.trim().length > 0, {
      message: 'El título de la sección no puede estar vacío',
    }),

  description: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 10, {
      message:
        'La descripción de la sección debe tener al menos 10 caracteres si se proporciona',
    }),

  position: z
    .number({ error: 'La posición debe ser un número' })
    .int({ message: 'La posición debe ser un número entero' })
    .nonnegative({ message: 'La posición no puede ser negativa' }),

  lectures: z
    .array(LectureSchema)
    .min(1, 'Cada sección debe tener al menos una lección')
    .max(50, 'Demasiadas lecciones en una sección (máximo 50 recomendado)'),
})

export type SectionSchemaType = z.infer<typeof SectionSchema>
