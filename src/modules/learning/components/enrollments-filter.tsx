'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export function ToogleProgressStatus() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentProgressStatus = searchParams.get('status') || 'all'

  function handleChange(term: string) {
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
    <Select onValueChange={handleChange} defaultValue={currentProgressStatus}>
      <SelectTrigger className="h-12 w-full max-w-64 cursor-pointer rounded-none hover:bg-secondary">
        <span>Estado: </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className='rounded-none' position="popper" hideWhenDetached>
        <SelectItem value="all">Todos</SelectItem>
        <SelectItem value="not-started">No empezados</SelectItem>
        <SelectItem value="in-progress">En progreso</SelectItem>
      </SelectContent>
    </Select>
  )
}
