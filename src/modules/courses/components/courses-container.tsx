'use client'

import { useSearchParams } from 'next/navigation'
import {
  CategoryFilter,
  CourseCard,
  EmptyState,
} from '@/modules/courses/components'
import { ITEMS_PER_PAGE } from '@/modules/shared/constants'
import { fetcher } from '@/lib/http/fetcher'
import { useCallback, useEffect, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'
import CoursesGridSkeleton from './skeletons/courses-grid-skeleton'
import { toast } from 'sonner'
import { API_URL } from '@/config/env'

export type PublishedCourse = {
  id: string
  title: string
  description: string
  shortDescription: string
  level: string
  imageUrl: string
  estimatedDuration: number
  teacherFullName: string
  teacherAvatarUrl: string
  avgRating: number
}

export type GetPublishedCoursesResponse = {
  data: PublishedCourse[]
  total: number
  totalPages: number
}
export default function CoursesContainer() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId') || undefined
  const query = searchParams.get('query') || undefined

  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: GetPublishedCoursesResponse | null
    ) => {
      if (previousPageData && previousPageData.data.length === 0) return null

      const params = new URLSearchParams()

      if (query) params.set('query', query)
      if (categoryId) params.set('categoryId', categoryId)

      params.set('page', String(pageIndex + 1))
      params.set('limit', String(ITEMS_PER_PAGE))

      return `${API_URL}/api/V1/courses/published?${params.toString()}`
    },
    [query, categoryId]
  )

  const { data, error, isLoading, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false, 
      revalidateIfStale: false, 
      revalidateOnReconnect: false,
    }
  )

  const loaderReference = useRef<HTMLDivElement | null>(null)

  const isEnd =
    !!data && (data[data.length - 1]?.data.length ?? 0) < ITEMS_PER_PAGE

  useEffect(() => {
    if (isLoading || isValidating || isEnd) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSize((prev) => prev + 1)
        }
      },
      {
        threshold: 0,
        rootMargin: '200px',
      }
    )

    const element = loaderReference.current
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [isLoading, isValidating, isEnd, setSize])

  const courses: PublishedCourse[] = data
    ? data.flatMap((page) => page.data)
    : []

  if (error) toast.error(error.message)

  return (
    <div className="container mx-auto grid sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
      <CategoryFilter className="col-span-1 flex sm:gap-5 md:col-span-2 lg:col-span-3 lg:justify-center xl:col-span-4" />
      {isLoading && <CoursesGridSkeleton items={12} />}

      {courses.length > 0
        ? courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        : !isLoading && (
            <div className="relative col-span-1 h-96 w-full text-center md:col-span-2 lg:col-span-3 xl:col-span-4">
              <EmptyState />
            </div>
          )}

      <div
        ref={loaderReference}
        className="col-span-1 flex justify-center py-10 sm:gap-5 md:col-span-2 lg:col-span-3 xl:col-span-4"
      >
        {!isEnd && isValidating && <CoursesGridSkeleton items={4} />}
      </div>
    </div>
  )
}
