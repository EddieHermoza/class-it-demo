'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'
import { Label } from '@/modules/shared/components/ui/label'
import { Input } from '@/modules/shared/components/ui/input'
import { Button } from '@/modules/shared/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import animationData from '@/assets/animation/forgot-password.json'
import Lottie from 'lottie-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  RegisterSchema,
  RegisterSchemaType,
} from '@/modules/auth/schemas/register-schema'
import { toast } from 'sonner'
import ErrorMessage from '@/modules/shared/components/error-message'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { sendRequest } = useSendRequest('/api/V1/auth/register', 'POST')
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error(error ?? 'Error al crear la cuenta')
      return
    }
    toast.success('Cuenta creada correctamente')
    reset()
  }

  return (
    <div className="relative grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
      <div className="hidden bg-transparent lg:flex">
        <Lottie animationData={animationData} loop />
      </div>

      <span className="bg-primary absolute left-1/2 h-full w-0.5 -translate-x-1/2 max-lg:hidden" />

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-foreground text-3xl font-bold">
            Crear Cuenta
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex gap-2">
              <div className="w-full space-y-2">
                <Label>Nombres</Label>
                <Input {...register('name')} placeholder="John" />
                {errors.name && <ErrorMessage message={errors.name.message} />}
              </div>

              <div className="w-full space-y-2">
                <Label>Apellidos</Label>
                <Input {...register('lastName')} placeholder="Doe" />
                {errors.lastName && (
                  <ErrorMessage message={errors.lastName.message} />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                placeholder="tu@ejemplo.com"
                {...register('email')}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>

            <Button
              type="submit"
              className="h-11 w-full text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrarse'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
              </span>
              <Link href="/auth/login" className="text-primary hover:underline">
                Inicia Sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
