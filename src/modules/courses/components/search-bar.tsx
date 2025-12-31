'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../shared/components/ui/input-group'
import { Search } from 'lucide-react'
import { useIsMobile } from '../../shared/hooks/use-mobile'

export default function SearchBar() {
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    params.set('page', '1')

    push(`/courses?${params.toString()}`, { scroll: true })
  }

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 500)

  return (
    <>
      <InputGroup className="mx-auto w-full max-w-sm lg:max-w-lg">
        <InputGroupInput
          onChange={(e) => {
            debouncedHandleSearch(e.target.value)
          }}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Buscar cursos..."
          className={isMobile ? 'text-sm' : 'text-base'}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </>
  )
}
