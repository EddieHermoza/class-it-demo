import { z } from 'zod'

export const RegisterTeacherSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),

  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    .max(50, { message: 'El apellido no puede exceder los 50 caracteres' }),

  email: z
    .email({ message: 'Correo electrónico inválido' })
    .min(5, { message: 'El correo debe tener al menos 5 caracteres' }),
  number: z.string().regex(/^\d{9}$/, {
    message:
      'Debe contener exactamente 9 dígitos numéricos (sin espacios ni guiones)',
  }),

  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(100, { message: 'La contraseña es demasiado larga' }),

  title: z
    .string()
    .min(3, { message: 'El titulo debe tener al menos 3 caracteres' })
    .max(100, {
      message: 'El titulo no puede exceder los 100 caracteres',
    }),

  referenceUrl: z
    .url({ message: 'Debe ser una URL válida' })
    .optional()
    .or(z.literal('')),
})

export type RegisterTeacherSchemaType = z.infer<typeof RegisterTeacherSchema>
