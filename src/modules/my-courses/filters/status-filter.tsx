'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function ToggleStatus() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentStatus = searchParams.get('status') || 'ALL'

  function handleOrder(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('status', term)
    } else {
      params.delete('status')
    }
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select onValueChange={handleOrder} defaultValue={currentStatus}>
      <SelectTrigger className="hover:bg-secondary h-12 w-full max-w-64">
        <span>Estado: </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={0} hideWhenDetached>
        <SelectItem value="ALL">Todos</SelectItem>
        <SelectItem value="DRAFT">Borrador</SelectItem>
        <SelectItem value="READY_FOR_REVIEW">Listo para Revisión</SelectItem>
        <SelectItem value="PUBLISHED">Publicado</SelectItem>
        <SelectItem value="REJECTED">Rechazado</SelectItem>
        <SelectItem value="ARCHIVED">Archivado</SelectItem>
      </SelectContent>
    </Select>
  )
}
