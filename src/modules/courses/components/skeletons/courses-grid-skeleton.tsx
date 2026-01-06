import { Skeleton } from '@/modules/shared/components/ui/skeleton'
type Props = {
  items: number
}

export default function CoursesGridSkeleton({ items }: Props) {
  const skeletonItems = Array(items).fill(null)
  return (
    <>
      {skeletonItems.map((_, index) => (
        <Skeleton
          key={index}
          className={`border-border relative w-full max-sm:border h-100 max-sm:max-w-80 mx-auto ${index % 2 == 0 ? 'duration-700' : ''}`}
        ></Skeleton>
      ))}
    </>
  )
}
