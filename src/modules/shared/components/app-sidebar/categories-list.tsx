'use client'

import Link from 'next/link'
import { AiOutlineLoading } from 'react-icons/ai'
import { useGetCategories } from '../../hooks/use-get-categories'

interface Props {
  onCategoryClick?(): void
}

export default function CategoriesList({ onCategoryClick }: Props) {
  const { categories, isLoading } = useGetCategories()
  return (
    <ul className="custom-scrollbar max-h-60 w-full space-y-2 overflow-y-auto">
      {isLoading ? (
        <div className="p-5">
          <AiOutlineLoading className="text-primary m-auto animate-spin" />
        </div>
      ) : (
        <>
          {categories.map((c, i) => (
            <li key={i} className="w-full">
              <Link
                onClick={() => onCategoryClick?.()}
                className="hover:bg-primary/10 hover:text-primary flex p-2 text-sm transition-colors duration-300"
                href={`/courses?categoryId=${c.id}`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </>
      )}
    </ul>
  )
}
