import * as React from 'react'

const DESKTOP_BREAKPOINT = 1024 // lg breakpoint

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }

    // Verificar inmediatamente
    checkDesktop()

    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const onChange = () => {
      checkDesktop()
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}
