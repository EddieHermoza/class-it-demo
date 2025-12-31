import { SearchX, Filter } from 'lucide-react'

export function EmptyState() {
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
    </div>
  )
}
