// components/landing/categories-grid.tsx
'use client'

import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { ArrowRight } from 'lucide-react'
import { useGetCategories } from '../shared/hooks/use-get-categories'

export default function CategoriesGrid() {
  const { categories, isLoading, error } = useGetCategories()

  // Máximo de categorías visibles en la landing
  const maxVisible = 6
  const visibleCategories = categories.slice(0, maxVisible)
  const hasMore = categories.length > maxVisible

  if (isLoading) {
    return <CategoriesGridSkeleton />
  }

  if (error) {
    return null 
  }

  if (categories.length === 0) {
    return null 
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Explora por categorías</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Encuentra el camino perfecto para tu carrera
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {/* Categorías visibles */}
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              href={`/courses?categoryId=${category.id}`} 
              className="group flex-center group bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border p-8 text-center transition-all"
            >
              <div className="flex-center relative">
                <h3 className="group-hover:text-primary text-lg font-semibold duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}

          {/* Botón "Ver todas" si hay más de 6 */}
          {hasMore && (
            <div className="col-span-2 mt-6 flex items-center justify-center sm:col-span-3 lg:col-span-4 xl:col-span-6">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full max-w-md"
              >
                <Link
                  href="/courses"
                  className="flex items-center justify-center gap-3 text-base"
                >
                  Ver todas las categorías ({categories.length})
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CategoriesGridSkeleton() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-12 w-96" />
          <Skeleton className="mx-auto mt-4 h-6 w-80" />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-8">
              <CardContent className="flex flex-col items-center gap-4 p-0">
                <Skeleton className="size-16 rounded-lg" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
