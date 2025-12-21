'use client'
import { useCategoriesControllerGetCategoriesQuery } from '@/services/generated/classRoomApi.generated'

const HomePage = () => {
  const { data } = useCategoriesControllerGetCategoriesQuery()

  console.log(data)
  return <div>HomePage classroom</div>
}

export default HomePage
