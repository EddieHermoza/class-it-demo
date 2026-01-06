'use client'

import { Button } from '@/modules/shared/components/ui/button'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { Play, LogIn } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

interface Props {
  courseId: string
  className?: string
}

export default function EnrollCourseButton({ courseId, className }: Props) {
  const { push } = useRouter()
  const {mutate} = useSWRConfig()
  const { data: session, status } = useSession()

  const role = session?.user.role?.toUpperCase()
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
    mutate('/api/V1/enrollments/me',undefined,{revalidate:true})
  }


  if (status === 'loading') return null

  if (!session) {
    return (
      <Button size="lg" onClick={handleEnroll} className="btn-cut rounded-none">
        <LogIn className="mr-2 size-4 transition-transform sm:size-5" />
        Iniciar sesión para inscribirte
      </Button>
    )
  }

  if (role === 'TEACHER') {
    return (
      <Button
        size="lg"
        disabled
        variant="secondary"
        className="rounded-none px-6 py-5 text-sm sm:px-8 sm:py-6 sm:text-base md:text-lg"
      >
        No disponible para instructores
      </Button>
    )
  }


  return (
    <Button
      size="lg"
      onClick={handleEnroll}
      disabled={loading}
      className={`btn-cut rounded-none ${className}`}
    >
      <Play className="mr-2 size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
      {loading ? 'Inscribiendo...' : '¡Empezar curso ahora!'}
    </Button>
  )
}
