export interface CourseType {
  id: string
  title: string
  categoryId: string
  category: string
  level: string
  avgRating: number
  estimatedDuration: number
  description: string
  whatYouWillLearn: string
  targetAudience: string
  requirements: string[]
}
