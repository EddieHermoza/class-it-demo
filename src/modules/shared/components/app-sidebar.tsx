'use client'

import clsx from 'clsx'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from './ui/sidebar'
import { NavMain } from './nav-main'
import { CURRENT_ROLE } from '@/modules/shared/constants'
import { ROLE_LINKS } from '@/config/links'
import Logo from './logo'
import { useIsDesktop } from '@/modules/shared/hooks/use-desktop'

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {}

const AppSidebar = ({ ...props }: AppSidebarProps) => {
  const isDesktop = useIsDesktop()

  const linksForRole = ROLE_LINKS[CURRENT_ROLE]

  return (
    <Sidebar
      collapsible={isDesktop ? 'none' : 'offcanvas'}
      {...props}
      className={clsx('border-none', isDesktop && 'h-screen', props.className)}
    >
      <SidebarHeader className="h-[60px] shrink-0 p-0 text-4xl transition-all duration-300">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto">
        <NavMain links={linksForRole} />
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
