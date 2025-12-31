'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { Play, LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
  courseId: string
}

export default function EnrollCourseButton({ courseId }: Props) {
  const { push } = useRouter()
  const { data: session, status } = useSession()

  const role = session?.user.role?.toUpperCase() // Normalizamos para comparar
  const accessToken = session?.tokens.access

  const { sendRequest, loading } = useSendRequest(
    `/api/V1/courses/${courseId}/enroll`,
    'POST',
    accessToken
  )

  const handleEnroll = async () => {
    if (!session) {
      toast.info('Debes iniciar sesión para inscribirte en el curso')
      push('/auth/login')
      return
    }

    if (role === 'TEACHER') {
      toast.info('Los instructores no pueden inscribirse como estudiantes')
      return
    }

    const { error } = await sendRequest()

    if (error) {
      toast.error(error ?? 'Error al inscribir al curso')
      return
    }

    toast.success('¡Te has inscrito correctamente!')
    push('/learning')
  }

  // Mientras carga la sesión, no mostramos nada (evita flash)
  if (status === 'loading') return null

  // Usuario no autenticado
  if (!session) {
    return (
      <Button size="lg" onClick={handleEnroll} variant="default">
        <LogIn className="mr-2 size-4 transition-transform sm:size-5" />
        Iniciar sesión para inscribirte
      </Button>
    )
  }

  // Usuario autenticado pero es instructor
  if (role === 'TEACHER') {
    return (
      <Button
        size="lg"
        disabled
        variant="secondary"
        className="px-6 py-5 text-sm sm:px-8 sm:py-6 sm:text-base md:text-lg"
      >
        No disponible para instructores
      </Button>
    )
  }

  // Usuario autenticado y estudiante: botón principal
  return (
    <Button size="lg" onClick={handleEnroll} disabled={loading}>
      <Play className="mr-2 size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
      {loading ? 'Inscribiendo...' : '¡Empezar curso ahora!'}
    </Button>
  )
}
