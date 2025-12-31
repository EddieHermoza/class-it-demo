import { z } from 'zod'
export const ProfileSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  title: z.string().optional(),
  bio: z.string().max(500).optional(),
})

export type ProfileSchemaType = z.infer<typeof ProfileSchema>
