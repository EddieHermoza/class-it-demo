'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce'
import { Search } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../shared/components/ui/input-group'

import { useIsMobile } from '../../shared/hooks/use-mobile'
import { useApiFetch } from '@/modules/shared/hooks/use-api-fetch'
import CustomImage from '@/modules/shared/components/custom-image'

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

export default function SearchBar() {
  const isMobile = useIsMobile()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setQuery(value)
    if (value.trim()) {
      setIsOpen(true)
    }
  }, 400)

  const { data, isLoading } = useApiFetch<GetPublishedCoursesResponse>(
    query ? '/api/V1/courses/published' : null,
    {
      page: 1,
      limit: 5,
      query,
    }
  )

  const courses = data?.data ?? []

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="relative mx-auto w-full max-w-sm max-md:hidden md:max-w-sm 2xl:max-w-xl"
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false)
        }
      }}
    >
      <InputGroup className="w-full rounded-full">
        <InputGroupInput
          placeholder="Buscar cursos..."
          className={isMobile ? 'text-xs' : 'text-sm'}
          onChange={(e) => debouncedSetQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true)
            }
          }}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      {/* Dropdown */}
      <div
        className={`bg-popover absolute z-50 mt-[11px] w-full overflow-hidden border transition-all duration-500 ${
          isOpen && query ? 'animate-in fade-in slide-in-from-top-3' : 'hidden'
        } `}
      >
        {isLoading ? (
          <div className="text-muted-foreground p-3 text-xs">
            Buscando cursos...
          </div>
        ) : courses.length > 0 ? (
          <ul className="divide-border divide-y">
            {courses.map((course) => (
              <li key={course.id}>
                <Link
                  href={`/courses/${course.id}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-primary/10 flex items-center gap-3 p-3 text-sm transition-colors"
                >
                  <CustomImage
                    width={80}
                    height={80}
                    src={course.imageUrl}
                    alt=""
                  />
                  <p className="">{course.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground p-3 text-xs">
            No se encontraron cursos
          </div>
        )}
      </div>
    </div>
  )
}
