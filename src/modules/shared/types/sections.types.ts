import { LectureType, lectureWithProgress } from './lectures.types'

export interface SectionType {
  id: string
  title: string
  description?: string
  position: number
  lecturesCount: number
  duration: number
  lectures: lectureWithProgress[]
}

export interface SectionPreview {
  id: string
  title: string
  description?: string
  position: number
  lecturesCount: number
  duration: number
  lectures: LectureType[]
}
