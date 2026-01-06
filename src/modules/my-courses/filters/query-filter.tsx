'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../shared/components/ui/input-group'
import { Search } from 'lucide-react'

export default function QueryFilter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    const value = term.trim()

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 500)

  return (
    <InputGroup className="w-full max-w-sm rounded-full lg:max-w-2xl">
      <InputGroupInput
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Buscar cursos..."
        className="text-sm"
      />

      <InputGroupAddon className="pointer-events-none">
        <Search className="text-muted-foreground size-4" />
      </InputGroupAddon>
    </InputGroup>
  )
}
