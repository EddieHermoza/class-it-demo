'use client'

import { Checkbox } from '@/modules/shared/components/ui/checkbox'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCourseMediaPlayer } from '../context/use-course-media-provider'
import { useMediaState } from '@vidstack/react'
import { useParams } from 'next/navigation'

interface Props {
  lectureId: string
  completed?: boolean
}

export default function CompleteLectureCheckBox({
  lectureId,
  completed = false,
}: Props) {
  const { playerRef, currentLecture, goToNextLecture } = useCourseMediaPlayer()
  const ended = useMediaState('ended', playerRef)
  const params = useParams()
  const { data: session } = useSession()
  const [isChecked, setIsChecked] = useState(completed)

  useEffect(() => {
    setIsChecked(completed)
  }, [completed])

  const { sendRequest, loading: isLoading } = useSendRequest(
    `/api/V1/courses/${params.id}/lectures/${lectureId}/watched`,
    'POST',
    session?.tokens.access
  )

  useEffect(() => {
    if (!ended) return
    if (isChecked) return
    if (currentLecture?.id !== lectureId) return

    setIsChecked(true)

    sendRequest().then(({ error }) => {
      if (error) {
        setIsChecked(false)
        toast.error(error ?? 'Error al actualizar el progreso')
        return
      }

      toast.success('Lección marcada como completada')
      goToNextLecture()
    })
  }, [
    ended,
    currentLecture?.id,
    lectureId,
    isChecked,
    sendRequest,
    goToNextLecture,
  ])

  const handleCheckChange = async (checked: boolean) => {
    if (isChecked) return

    setIsChecked(checked)

    const { error } = await sendRequest()

    if (error) {
      setIsChecked(!checked)
      toast.error(error ?? 'Error al actualizar el progreso')
      return
    }

    toast.success(
      checked
        ? 'Lección marcada como completada'
        : 'Lección marcada como no completada'
    )
  }

  return (
    <Checkbox
      className="cursor-pointer rounded-none"
      checked={isChecked}
      disabled={isLoading}
      onCheckedChange={(state) => {
        const newChecked = state === true
        handleCheckChange(newChecked)
      }}
    />
  )
}
