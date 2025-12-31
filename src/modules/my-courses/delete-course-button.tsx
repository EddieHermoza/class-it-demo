'use client'
import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'
import { Button } from '@/modules/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'

import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { CourseResponse } from './my-courses-container'

type Props = {
  token: string
  course: CourseResponse | null
  open: boolean
  handleOpenChange: (open: boolean) => void
  handleRefresh: () => void
}

export function DeleteCourseButton({
  open,
  course,
  handleOpenChange,
  handleRefresh,
  token,
}: Props) {
  const { sendRequest, loading } = useSendRequest(
    `/api/V1/courses/${course?.id}`,
    'DELETE',
    token
  )

  const handleDelete = async () => {
    const { error } = await sendRequest()

    if (error) {
      toast.error(error)
      return
    }
    handleOpenChange(false)
    handleRefresh()

    toast.success('Curso Eliminado Correctamente')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">
            Eliminar {course?.title}
          </DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar este curso permanentemente?
          </DialogDescription>
          <div className="flex w-full items-center justify-between pt-6">
            <Button
              variant={'destructive'}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading
                  size={18}
                  className="animate-spin ease-in-out"
                />
              ) : (
                <>Confirmar</>
              )}
            </Button>

            <Button
              variant={'secondary'}
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
