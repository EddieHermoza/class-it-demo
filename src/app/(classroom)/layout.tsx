'use client'

import React, { useEffect, useState } from 'react'
import {
  SidebarProvider,
  SidebarInset,
} from '@/modules/shared/components/ui/sidebar'
import AppSidebar from '@/modules/shared/components/app-sidebar'
import { useIsDesktop } from '@/modules/shared/hooks/use-desktop'
import Navbar from '@/modules/shared/components/nav-bar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useIsDesktop()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(isDesktop)
  }, [isDesktop])

  return (
    <SidebarProvider
      defaultOpen={sidebarOpen}
      open={isDesktop ? true : sidebarOpen}
      onOpenChange={(open) => {
        if (!isDesktop) {
          setSidebarOpen(open)
        }
      }}
      className="flex h-screen"
    >
      <AppSidebar />
      <SidebarInset className="flex h-screen flex-1 flex-col overflow-hidden">
        <Navbar />
        <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto bg-linear-to-br bg-size-[300%_300%] dark:from-violet-950/30 dark:via-black dark:to-black">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
