import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.email({ message: 'El correo electrónico no es válido' }),

  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  name: z
    .string()
    .min(1, { message: 'El nombre es obligatorio' })
    .max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),

  lastName: z
    .string()
    .min(1, { message: 'El apellido es obligatorio' })
    .max(50, { message: 'El apellido no puede exceder los 50 caracteres' }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
