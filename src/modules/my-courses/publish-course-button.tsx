'use client'

import { Button } from '../shared/components/ui/button'
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '../shared/components/ui/dialog'
import { useSendRequest } from '../shared/hooks/use-send-request'
import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

interface Props {
  courseId: string
  token: string
}
export default function PublishCourseButton({ courseId, token }: Props) {
  const { push } = useRouter()
  const { sendRequest, loading } = useSendRequest(
    `/api/V1/courses/${courseId}/publish`,
    'PATCH',
    token
  )

  const handlePublish = async () => {
    const { error } = await sendRequest()

    if (error) {
      toast.error(error)
      return
    }

    toast.success('Curso publicado correctamente')
    push('/my-courses')
  }

  return (
    <Dialog>
      <Button asChild className="rounded-none">
        <DialogTrigger>Publicar Curso</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Seguro q desea publicar este curso?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Una vez publicado habrá limitaciones en su modificación
        </DialogDescription>
        <div className="flex w-full items-center justify-between pt-6">
          <Button onClick={handlePublish} disabled={loading}>
            {loading ? (
              <AiOutlineLoading
                size={18}
                className="animate-spin ease-in-out"
              />
            ) : (
              <>Confirmar</>
            )}
          </Button>

          <Button variant={'secondary'} asChild>
            <DialogClose>Cancelar</DialogClose>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
