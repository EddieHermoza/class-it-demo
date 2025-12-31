'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from '@/lib/http/fetcher'
import { API_URL } from '@/config/env'

export function useApiFetch<T = unknown>(
  endpoint: string | null,
  params: Record<string, string | number | boolean | undefined> = {},
  authToken?: string,
  options?: SWRConfiguration,
  enabled: boolean = true
) {

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    )
  )

  const queryString = new URLSearchParams(
    Object.entries(filteredParams).map(([key, value]) => [key, String(value)])
  ).toString()

  const fullUrl = endpoint
    ? `${API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`
    : null

  const { data, error, isLoading, mutate, isValidating } = useSWR<T>(
    enabled && fullUrl ? fullUrl : null,
    (url) => fetcher(url, authToken),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
      ...options,
    }
  )

  return {
    data,
    error,
    isLoading: isLoading || !enabled,
    isValidating,
    mutate,
  }
}
