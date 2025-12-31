'use client'

import ErrorMessage from '@/modules/shared/components/error-message'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/shared/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { CiUser } from 'react-icons/ci'
import { PhotoSchema, PhotoSchemaType } from '../schemas/photo-schema'
import { Session } from 'next-auth'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { UpdateProfileType } from '../types/profile.types'

interface Props {
  session: Session
}

export default function PhotoForm({ session }: Props) {
  const { update } = useSession()
  const role = session?.user.role?.toLowerCase() as 'student' | 'teacher'
  const roleId = session?.user.id
  const currentPhotoUrl = session?.user.avatarUrl ?? null

  const endpoint = role && roleId ? `/api/V1/${role}s/${roleId}/photo` : null

  const { sendRequest, loading: isLoading } = useSendRequest<UpdateProfileType>(
    endpoint ?? '',
    'PATCH',
    session?.tokens.access,
    true
  )

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PhotoSchemaType>({
    resolver: zodResolver(PhotoSchema),
  })

  // ← CORRECCIÓN AQUÍ: obtenemos el File real
  const fileList = useWatch({ control, name: 'photo' })
  const selectedFile = fileList && fileList.length > 0 ? fileList[0] : null

  const [preview, setPreview] = useState<string | null>(currentPhotoUrl)

  useEffect(() => {
    if (selectedFile) {
      if (typeof window !== 'undefined') {
        const url = URL.createObjectURL(selectedFile)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
      }
    } else {
      setPreview(currentPhotoUrl)
    }
  }, [selectedFile, currentPhotoUrl])

  const onSubmit: SubmitHandler<PhotoSchemaType> = async (data) => {
    // data.photo es FileList, usamos [0]
    if (!data.photo || data.photo.length === 0) return

    const formData = new FormData()
    formData.append('file', data.photo[0])

    const { error, data: response } =
      await sendRequest(formData)

    if (error) {
      toast.error(error ?? 'Error al guardar la foto')
      return
    }

    toast.success('¡Foto actualizada correctamente!')
    await update({
      user: {
        ...session.user,
        avatarUrl: response?.avatarUrl,
      },
    })
    reset()
  }

  const hasNewFile = !!selectedFile

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-8"
    >
      {/* Vista previa */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium">Foto de perfil</p>
        <Avatar className="ring-background h-48 w-48 shadow-lg ring-4">
          <AvatarImage src={preview || undefined} alt="Vista previa" />
          <AvatarFallback className="bg-muted">
            <CiUser size={80} />
          </AvatarFallback>
        </Avatar>
        {hasNewFile && (
          <p className="text-muted-foreground text-xs">
            Nueva imagen seleccionada
          </p>
        )}
      </div>

      {/* Área de selección de archivo */}
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        {...register('photo')}
        className="hover:bg-secondary cursor-pointer duration-200"
      />

      {errors.photo && <ErrorMessage message={errors.photo.message} />}

      {hasNewFile && selectedFile && (
        <p className="text-muted-foreground text-center text-xs">
          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
        </p>
      )}

      {/* Botón de envío */}
      <Button
        type="submit"
        disabled={isSubmitting || isLoading || !hasNewFile}
        className="w-full"
      >
        {hasNewFile ? 'Guardar foto' : 'Selecciona una imagen'}
      </Button>
    </form>
  )
}
