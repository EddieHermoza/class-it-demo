'use client'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Input } from '@/modules/shared/components/ui/input'
import { Label } from '@/modules/shared/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'
import { useAuthControllerForgotPasswordMutation } from '@/services/generated/classRoomApi.generated'
import {
  ForgotPasswordSchemaType,
  ForgotPasswordSchema,
} from '@/modules/auth/schemas/forgot-passwordd.schema'
import ErrorMessage from '@/modules/shared/components/ErrorMessage'

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const [forgotPassword, { isLoading }] =
    useAuthControllerForgotPasswordMutation()

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      await forgotPassword(data).unwrap()
      toast.success(
        'Si el correo existe, te enviaremos un enlace de recuperación'
      )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? 'Error al enviar el enlace de recuperación'
      )
    }
  }

  return (
    <div className="relative w-full max-w-4xl">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>¿Olvidaste tu contraseña?</CardTitle>
          <CardDescription>
            Ingresa tu correo registrado y te enviaremos un enlace para
            reestablecerla
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="tu@ejemplo.com"
                {...register('email')}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </Button>
          </form>
        </CardContent>

        <Link
          href="/auth/login"
          className="text-primary flex-center mt-5 gap-3 text-sm hover:underline"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio de sesión
        </Link>
      </Card>
    </div>
  )
}
