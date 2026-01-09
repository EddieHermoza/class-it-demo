export type WebinarType = {
  id: string
  title: string
  scheduleAt: string
  linkUrl: string
  imageUrl: string
  imageId: string
  categoryId: string
  categoryName: string
  teacherId: string
  teacherFullName: string
  teacherAvatarUrl: string
  createdAt: string
  updatedAt: string
}

export type WebinarResponse = {
  data: WebinarType[]
  total: number
  totalPages: number
}

export type WebinarFilters = {
  limit?: number
  page?: number
  query?: string
  categoryId?: string
}
