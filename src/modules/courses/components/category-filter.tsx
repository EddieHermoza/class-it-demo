'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/modules/shared/components/ui/badge'
import { cn } from '@/lib/utils'
import { useGetCategories } from '@/modules/shared/hooks/use-get-categories'

interface Props {
  className?: string
}
export function CategoryFilter({ className }: Props) {
  const { categories, isLoading } = useGetCategories()
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('categoryId') ?? 'all'

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId === 'all') {
      params.delete('categoryId')
    } else {
      params.set('categoryId', categoryId)
    }

    params.delete('page')

    push(`?${params.toString()}`)
  }

  return (
    <div
      className={cn(
        'bg-background custom-scrollbar sticky top-0 z-50 inline-flex h-20 w-full gap-3 overflow-x-auto border-t px-3 py-5',
        className
      )}
    >
      <Badge
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        className={`cursor-pointer px-4 py-2 text-sm transition-colors duration-300 max-sm:text-xs ${
          selectedCategory === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent hover:text-accent-foreground hover:border-accent'
        }`}
        onClick={() => handleCategoryChange('all')}
      >
        Todos
      </Badge>

      {!isLoading &&
        categories.map((category) => {
          const isSelected = selectedCategory === category.id

          return (
            <Badge
              key={category.id}
              variant={isSelected ? 'default' : 'outline'}
              className={`cursor-pointer px-4 py-2 text-sm transition-colors duration-300 max-sm:text-xs ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground hover:border-accent'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          )
        })}
    </div>
  )
}
