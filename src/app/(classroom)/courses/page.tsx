'use client'
import { courses, categories } from '@/__mocks__'
import {
  CourseCard,
  CategoryFilter,
  EmptyState,
} from '@/modules/courses/components'
import { useEffect, useMemo, useState } from 'react'
import { ITEMS_PER_PAGE } from '@/modules/shared/constants'
import { Loading, Pagination } from '@/modules/shared/components'

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [coursesInProfile, setCoursesInProfile] = useState<Set<string>>(
    new Set(['course_003', 'course_007', 'course_015'])
  )

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') return courses.data
    return courses.data.filter(
      (course) => course.categoryId === selectedCategory
    )
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleResetFilter = () => {
    setSelectedCategory('all')
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleToggleProfile = (courseId: string) => {
    setCoursesInProfile((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }

  // simulador de carga de datos
  useEffect(() => {
    setIsLoading(true)

    const timeoutId = window.setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [selectedCategory, currentPage])

  return (
    <div className="container mx-auto flex min-h-full flex-col p-5">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-balance lg:text-3xl">
          Explora nuestros cursos
        </h1>
        <p className="text-muted-foreground text-base text-balance">
          Aprende con los mejores instructores y transforma tu carrera
          profesional
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loading />
        </div>
      ) : paginatedCourses.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            selectedCategory={
              categories.find((cat) => cat.id === selectedCategory)?.label ||
              selectedCategory
            }
            onResetFilter={handleResetFilter}
          />
        </div>
      ) : (
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isInProfile={coursesInProfile.has(course.id)}
              onToggleProfile={handleToggleProfile}
            />
          ))}
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default CoursesPage
