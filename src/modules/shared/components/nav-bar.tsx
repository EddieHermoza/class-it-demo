'use client'

import { Button } from './ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { Search, Moon, Sun } from 'lucide-react'
import { SidebarTrigger } from './ui/sidebar'
import { useIsMobile } from '../hooks/use-mobile'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const isMobile = useIsMobile()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-sidebar w-full px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 lg:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 justify-center px-4">
          <div className="w-full max-w-md lg:max-w-lg">
            <InputGroup>
              <InputGroupInput
                placeholder="Buscar cursos..."
                className={isMobile ? 'text-sm' : 'text-base'}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            aria-label="Cambiar tema"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="link" onClick={() => router.push('/auth/login')}>
            {isMobile ? 'Iniciar' : 'Iniciar sesión'}
          </Button>
          <Button
            className="hidden lg:inline-flex"
            onClick={() => router.push('/auth/register')}
          >
            Registrarse
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
