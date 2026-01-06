import { ProgressType } from './progress.types'

export interface LectureType {
  id: string
  videoUrl: string
  title: string
  position: number
  isPreview: boolean
  duration: number
}

export interface lectureWithProgress {
  id: string
  videoUrl: string
  title: string
  position: number
  isPreview: boolean
  duration: number
  progress: ProgressType
}
