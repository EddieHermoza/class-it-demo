'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ProfileSchema, ProfileSchemaType } from '../schemas/profile-schema'
import { Input } from '@/modules/shared/components/ui/input'
import { Textarea } from '@/modules/shared/components/ui/textarea'
import { Button } from '@/modules/shared/components/ui/button'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { UpdateProfileType } from '../types/profile.types'

interface Props {
  session: Session
}
export default function ProfileForm({ session }: Props) {
  const { update } = useSession()
  const role = session?.user.role?.toLowerCase() as
    | 'student'
    | 'teacher'
    | undefined
  const roleId = session?.user.id

  const endpoint = role && roleId ? `/api/V1/${role}s/${roleId}` : null

  const { sendRequest } = useSendRequest<UpdateProfileType>(
    endpoint ?? '',
    'PATCH',
    session?.tokens.access
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: session.user.name,
      lastName: session.user.lastName,
    },
  })

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
    if (!endpoint) {
      toast.error(
        'No se pudo determinar tu rol. Por favor, inicia sesión nuevamente.'
      )
      return
    }

    const { error, data: response } = await sendRequest(data)

    if (error) {
      toast.error(error ?? 'Error al actualizar el perfil')
      return
    }

    toast.success('Perfil actualizado correctamente')
    await update({
      user: {
        ...session.user,
        name: response?.name,
        lastName: response?.name,
        title: response?.title,
        bio: response?.bio,
      },
    })
    reset(data)
  }

  if (!session || !role || !roleId) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          Debes iniciar sesión para editar tu perfil.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Nombre</span>
          <Input
            id="name"
            {...register('name')}
            placeholder="Tu nombre"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Apellidos</span>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Tus apellidos"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p className="text-destructive text-sm">
              {errors.lastName.message}
            </p>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Título profesional</span>
        <Input
          id="title"
          {...register('title')}
          placeholder="Ej: Desarrollador Full Stack, Diseñador UX..."
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Biografía</span>
        <Textarea
          {...register('bio')}
          rows={6}
          placeholder="Cuéntanos un poco sobre ti..."
          disabled={isSubmitting}
        />
        {errors.bio && (
          <p className="text-destructive text-sm">{errors.bio.message}</p>
        )}
      </label>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Guardar cambios
        </Button>
      </div>
    </form>
  )
}
