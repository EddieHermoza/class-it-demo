import { LectureType } from './lectures.types'

export interface SectionType {
  id: string
  title: string
  description?: string
  position: number
  lecturesCount: number
  duration: number
  lectures: LectureType[]
}
