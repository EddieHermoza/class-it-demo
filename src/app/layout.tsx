import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '@vidstack/react/player/styles/base.css'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/modules/shared/components/ui/sonner'
import { NextAuthProvider } from '@/providers/session-provider'
import { plusJakartaSans } from '@/config/fonts'


export const metadata: Metadata = {
  title: 'Class IT',
  description: 'Plataforma de aprendizaje online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="">{children}</div>
          </ThemeProvider>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  )
}
