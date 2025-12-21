'use client'

import React, { useState } from 'react'
import { continueWatchingCourses, allMyCourses } from '@/__mocks__/my-courses'
import { CourseCardWithProgress } from '@/modules/my-courses/components'
import { Loading, Pagination } from '@/modules/shared/components'

const ITEMS_PER_PAGE_CONTINUE_WATCHING = 4
const ITEMS_PER_PAGE_ALL_COURSES = 8

const MyCoursesPage = () => {
  const [isLoading] = useState(false)
  const [continueWatchingPage, setContinueWatchingPage] = useState(1)
  const [allCoursesPage, setAllCoursesPage] = useState(1)

  const continueWatchingTotalPages = Math.ceil(
    continueWatchingCourses.length / ITEMS_PER_PAGE_CONTINUE_WATCHING
  )
  const continueWatchingStartIndex =
    (continueWatchingPage - 1) * ITEMS_PER_PAGE_CONTINUE_WATCHING
  const paginatedContinueWatching = continueWatchingCourses.slice(
    continueWatchingStartIndex,
    continueWatchingStartIndex + ITEMS_PER_PAGE_CONTINUE_WATCHING
  )

  const allCoursesTotalPages = Math.ceil(
    allMyCourses.length / ITEMS_PER_PAGE_ALL_COURSES
  )
  const allCoursesStartIndex = (allCoursesPage - 1) * ITEMS_PER_PAGE_ALL_COURSES
  const paginatedAllCourses = allMyCourses.slice(
    allCoursesStartIndex,
    allCoursesStartIndex + ITEMS_PER_PAGE_ALL_COURSES
  )

  return (
    <div className="flex min-h-full flex-col">
      <div className="container mx-auto flex min-h-full flex-col p-5">
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl font-bold text-balance lg:text-3xl">
            Mis cursos
          </h1>
          <p className="text-muted-foreground text-base text-balance">
            Gestiona y continúa tu aprendizaje desde donde lo dejaste
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="space-y-12">
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold lg:text-2xl">
                  Continuar viendo
                </h2>
              </div>

              {paginatedContinueWatching.length === 0 ? (
                <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">
                    No tienes cursos en progreso
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {paginatedContinueWatching.map(({ course, progress }) => (
                      <CourseCardWithProgress
                        key={course.id}
                        course={course}
                        progress={progress}
                        buttonText="Continuar viendo"
                      />
                    ))}
                  </div>

                  {continueWatchingTotalPages >= 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={continueWatchingPage}
                        totalPages={continueWatchingTotalPages}
                        onPageChange={setContinueWatchingPage}
                      />
                    </div>
                  )}
                </>
              )}
            </section>

            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold lg:text-2xl">
                  Todos mis cursos
                </h2>
              </div>

              {paginatedAllCourses.length === 0 ? (
                <div className="border-border bg-muted/50 rounded-lg border border-dashed p-12 text-center">
                  <p className="text-muted-foreground">
                    No tienes cursos disponibles
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedAllCourses.map(({ course, progress }) => (
                      <CourseCardWithProgress
                        key={course.id}
                        course={course}
                        progress={progress}
                        buttonText="Empezar a ver"
                      />
                    ))}
                  </div>

                  {allCoursesTotalPages > 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        currentPage={allCoursesPage}
                        totalPages={allCoursesTotalPages}
                        onPageChange={setAllCoursesPage}
                      />
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCoursesPage
