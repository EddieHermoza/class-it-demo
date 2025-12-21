'use client'

import { SearchX, Filter } from 'lucide-react'
import { Button } from '@/modules/shared/components/ui/button'

interface EmptyStateProps {
  selectedCategory: string
  onResetFilter: () => void
}

export function EmptyState({
  selectedCategory,
  onResetFilter,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-6">
        <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
          <SearchX className="text-primary/60 h-10 w-10" />
        </div>
        <div className="bg-muted absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full">
          <Filter className="text-muted-foreground h-4 w-4" />
        </div>
      </div>

      <h3 className="mb-2 text-center text-2xl font-semibold text-balance">
        No encontramos cursos
      </h3>

      <p className="text-muted-foreground mb-6 max-w-md text-center text-balance">
        No hay cursos disponibles en la categoría{' '}
        <span className="text-foreground font-medium">{selectedCategory}</span>{' '}
        en este momento.
      </p>

      <Button
        onClick={onResetFilter}
        variant="default"
        size="lg"
      >
        Ver todos los cursos
      </Button>
    </div>
  )
}
