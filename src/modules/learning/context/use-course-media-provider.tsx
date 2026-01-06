'use client'

import {
  createContext,
  useContext,
  useRef,
  useMemo,
  ReactNode,
  useCallback,
} from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { type MediaPlayerInstance } from '@vidstack/react'
import { ProgressType } from '@/modules/shared/types/progress.types'

/* ====== TYPES ====== */

export interface LectureWithProgress {
  id: string
  videoUrl: string
  title: string
  position: number
  isPreview: boolean
  duration: number
  progress: ProgressType
}

export interface SectionType {
  id: string
  title: string
  description?: string
  position: number
  lecturesCount: number
  duration: number
  lectures: LectureWithProgress[]
}

interface MediaPlayerContextValue {
  playerRef: React.RefObject<MediaPlayerInstance | null>
  sections: SectionType[]
  currentLecture: LectureWithProgress | null

  goToNextLecture: () => void
  goToPrevLecture: () => void
}

/* ====== CONTEXT ====== */

const MediaPlayerContext = createContext<MediaPlayerContextValue | undefined>(
  undefined
)

/* ====== PROVIDER ====== */

export function CourseMediaPlayerProvider({
  children,
  sections,
  lectureId,
}: {
  children: ReactNode
  sections: SectionType[]
  lectureId: string | null
}) {
  const playerRef = useRef<MediaPlayerInstance | null>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /* ====== FLATTEN LECTURES ====== */
  const allLectures = useMemo(() => {
    return sections
      .slice()
      .sort((a, b) => a.position - b.position)
      .flatMap((section) =>
        section.lectures.slice().sort((a, b) => a.position - b.position)
      )
  }, [sections])

  /* ====== CURRENT LECTURE ====== */
  const currentLecture = useMemo(() => {
    if (!lectureId) return allLectures[0] ?? null
    return allLectures.find((l) => l.id === lectureId) ?? null
  }, [allLectures, lectureId])

  /* ====== NAVIGATION ====== */
  const navigateToLecture = useCallback(
    (lectureId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('lectureId', lectureId)
      router.replace(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const goToNextLecture = useCallback(() => {
    if (!currentLecture) return

    const index = allLectures.findIndex((l) => l.id === currentLecture.id)

    const next = allLectures[index + 1]
    if (next) navigateToLecture(next.id)
  }, [allLectures, currentLecture, navigateToLecture])

  const goToPrevLecture = useCallback(() => {
    if (!currentLecture) return

    const index = allLectures.findIndex((l) => l.id === currentLecture.id)

    const prev = allLectures[index - 1]
    if (prev) navigateToLecture(prev.id)
  }, [allLectures, currentLecture, navigateToLecture])

  return (
    <MediaPlayerContext.Provider
      value={{
        playerRef,
        sections,
        currentLecture,
        goToNextLecture,
        goToPrevLecture,
      }}
    >
      {children}
    </MediaPlayerContext.Provider>
  )
}

/* ====== HOOK ====== */

export function useCourseMediaPlayer() {
  const context = useContext(MediaPlayerContext)

  if (!context) {
    throw new Error(
      'useCourseMediaPlayer debe usarse dentro de <CourseMediaPlayerProvider>'
    )
  }

  return context
}
