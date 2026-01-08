'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'

import { useGetCategories } from '@/modules/shared/hooks/use-get-categories'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function CategorySelectFilter() {
  const { categories = [], isLoading } = useGetCategories()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentCategory = searchParams.get('categoryId') || 'all'

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams)

    if (value === 'all') {
      params.delete('categoryId')
    } else {
      params.set('categoryId', value)
    }

    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={currentCategory} onValueChange={handleChange}>
      <SelectTrigger className="hover:bg-secondary h-12 w-full max-w-64">
        <span>Categoría: </span>
        <SelectValue placeholder="Categoría" />
      </SelectTrigger>

      <SelectContent position="popper" className="max-h-64 overflow-y-auto">
        <SelectItem value="all">
          <span className="text-muted-foreground">Todas</span>
        </SelectItem>

        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
