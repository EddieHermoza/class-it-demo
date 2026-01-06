import { Navbar } from '@/modules/shared/components'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-svh w-full overflow-hidden">
      <div className="relative w-full">
        <Suspense>
          <Navbar />
        </Suspense>
        <main className="custom-scrollbar relative h-[calc(100svh-60px)] w-full overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  )
}
