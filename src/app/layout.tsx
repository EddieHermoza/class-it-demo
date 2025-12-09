import type { Metadata } from 'next'
import { Aldrich } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

const aldrich = Aldrich({ subsets: ['latin'], weight: ['400'] })

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
      <body className={`${aldrich.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
