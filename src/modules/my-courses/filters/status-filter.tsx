'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function ToogleStatus() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentStatus = searchParams.get('status') || 'all'

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
      <SelectContent position="popper" sideOffset={10} hideWhenDetached>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="draft">Borradores</SelectItem>
        <SelectItem value="published">Publicados</SelectItem>
      </SelectContent>
    </Select>
  )
}
