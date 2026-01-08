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
import animationData from '@/assets/animation/login.json'

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
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      if (!res?.ok) {
        throw {
          message: res?.error || 'Error en la solicitud',
        }
      }
      toast.success('Inicio de sesión exitoso')
    } catch (error: unknown) {
      const errorMessage = (error as Error).message
      toast.error(errorMessage)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleRedirect = async () => {
      if (session?.user?.role) {
        const role = session.user.role
        if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') redirect('/')
      }
    }
    handleRedirect()
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
              className="h-11 w-full text-base font-medium"
              size="lg"
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
{/* 
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="border-border w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  O continúa con
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="h-11 w-full bg-transparent"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button> */}

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
