import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/modules/shared/components/ui/sonner'
import { StoreProvider } from '@/modules/shared/store'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400'],
})
export const metadata: Metadata = {
  title: 'Hackatony LMS',
  description: 'Plataforma de aprendizaje online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div>
            <main className="flex-1">
              <StoreProvider>
                {children}
              </StoreProvider>
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
