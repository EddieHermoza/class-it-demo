'use client'

import { Badge } from '@/modules/shared/components/ui/badge'

interface Category {
  id: string
  label: string
  value: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="my-4 flex flex-wrap gap-3">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value
        return (
          <Badge
            key={category.id}
            variant={isSelected ? 'default' : 'outline'}
            className={`cursor-pointer px-4 py-2 text-sm transition-all ${
              isSelected
                ? 'bg-primary text-primary-foreground scale-105 shadow-md'
                : 'hover:bg-accent hover:text-accent-foreground hover:scale-105'
            } `}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </Badge>
        )
      })}
    </div>
  )
}
