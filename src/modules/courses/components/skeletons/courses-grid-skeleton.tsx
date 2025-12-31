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
          className={`border-border relative h-44 w-full max-sm:rounded-none max-sm:border sm:h-80 ${index % 2 == 0 ? 'duration-700' : ''}`}
        ></Skeleton>
      ))}
    </>
  )
}
