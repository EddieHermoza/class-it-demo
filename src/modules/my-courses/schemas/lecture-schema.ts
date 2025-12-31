import { z } from 'zod'

export const LectureSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, 'El título de la lección es muy corto (mínimo 3 caracteres)')
    .max(
      100,
      'El título de la lección es demasiado largo (máximo 100 caracteres)'
    )
    .refine((val) => val.trim().length > 0, {
      message: 'El título no puede estar vacío',
    }),

  description: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 10, {
      message:
        'La descripción debe tener al menos 10 caracteres si se proporciona',
    }),

  duration: z
    .number({ error: 'La duracion debe ser un número en minutos' })
    .int()
    .min(0, 'La duración no puede ser negativa')
    .max(480, 'La duración máxima recomendada es 480 minutos (8 horas)'),

  videoUrl: z
    .url({ message: 'La URL del video no es válida' })
    .refine((val) => !val || val.length === 0 || val.startsWith('https://'), {
      message: 'La URL del video debe usar HTTPS para mayor seguridad',
    }),

  isPreview: z.boolean({ error: 'isPreview debe ser verdadero o falso' }),
  position: z
    .number({ error: 'La posición debe ser un número' })
    .int({ message: 'La posición debe ser un número entero' })
    .nonnegative({ message: 'La posición no puede ser negativa' }),
})

export type LectureSchemaType = z.infer<typeof LectureSchema>
