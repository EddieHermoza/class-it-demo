'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/http/fetcher'
import { API_URL } from '@/config/env'

export interface Category {
  id: string
  name: string
  description: string
}

export type CategoriesResponse = Category[]
export function useGetCategories() {
  const url = `${API_URL}/api/V1/categories`

  const { data, error, isLoading, mutate } = useSWR<CategoriesResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    categories: data ?? [],
    isLoading,
    error,
    mutate,
  }
}
