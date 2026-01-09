/**
 * Webinar Calendar Loading Skeleton Component
 * 
 * Displays a skeleton UI while calendar data is being fetched.
 * Mimics the structure of the actual calendar with header and grid.
 */

'use client'

import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function WebinarCalendarSkeleton() {
  return (
    <div className="min-h-[600px] w-full space-y-6 rounded-lg border p-6">
      {/* Calendar Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      {/* Day Headers Skeleton */}
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>

      {/* Calendar Grid Skeleton (5 weeks x 7 days) */}
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}
