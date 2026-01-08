import type { Metadata } from 'next'
import '@vidstack/react/player/styles/base.css'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { NextAuthProvider } from '@/providers/session-provider'
import { primaryFont } from '@/config/fonts'
import { Toaster } from '@/modules/shared/components/ui/sonner'
import { META_DATA } from '@/config/metadata'

export const metadata: Metadata = META_DATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${primaryFont.className} antialiased`}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="">{children}</div>
            <Toaster richColors duration={3000} visibleToasts={3} />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
