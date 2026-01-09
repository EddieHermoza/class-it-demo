'use client'

import { useEffect, useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import {
  LoginSchema,
  LoginSchemaType,
} from '@/modules/auth/schemas/login-schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import ErrorMessage from '@/modules/shared/components/error-message'
import { AiOutlineLoading } from 'react-icons/ai'
import Lottie from 'lottie-react'
import animationData from '@/assets/animation/forgot-password.json'
import { API_URL } from '@/config/env' // Asegúrate de tener esta constante

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    setLoading(true)

    try {
      // 1. Llamada directa al backend NestJS
      const res = await fetch(`${API_URL}/api/v1/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (!res.ok) {
        // Siempre es 401 en tu caso, pero extraemos el message del JSON
        let errorMessage = 'Error desconocido'

        try {
          const errorData = await res.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Si no es JSON, fallback
          errorMessage = await res.text().catch(() => errorMessage)
        }

        throw new Error(errorMessage)
      }

      // 2. Si OK → obtenemos los datos del usuario (para referencia)
      const userData = await res.json()

      // 3. Creamos la sesión en NextAuth
      const signInRes = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (!signInRes?.ok) {
        throw new Error(signInRes?.error || 'Error al crear la sesión')
      }

      toast.success('Inicio de sesión exitoso')

    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error inesperado'
      console.error('Login error:', error)
      toast.error(errorMessage) // Muestra el message exacto del backend
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user?.role) {
      const role = session.user.role
      if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        redirect('/')
      }
    }
  }, [session])

  return (
    <div className="relative grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
      <div className="hidden bg-transparent lg:flex">
        <Lottie animationData={animationData} loop />
      </div>

      <span className="bg-primary absolute left-1/2 h-full w-0.5 -translate-x-1/2 max-lg:hidden"></span>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-foreground text-3xl font-bold">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                {...register('email')}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-primary text-sm hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-none"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading
                  size={18}
                  className="animate-spin ease-in-out"
                />
              ) : (
                <>Iniciar Sesión</>
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                ¿No tienes una cuenta?{' '}
              </span>
              <Link
                href="/auth/register"
                className="text-primary hover:underline"
              >
                Regístrate gratis
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}