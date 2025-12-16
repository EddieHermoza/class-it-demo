'use client'

import React, { useEffect, useState } from 'react'
import {
  SidebarProvider,
  SidebarTrigger,
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
      <SidebarInset className="flex h-screen flex-col">
        {/* Trigger visible solo en móviles/tablets */}
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4 lg:hidden">
          <SidebarTrigger />
        </div>
        <Navbar />
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
