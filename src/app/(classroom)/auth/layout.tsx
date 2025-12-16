import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-full items-center justify-center"
      // style={{
      //   backgroundImage: "url('/auth-bg.png')",
      //   backgroundSize: 'cover',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundPosition: 'center',
      //   backgroundBlendMode: 'darken',
      // }}
    >
      {children}
    </div>
  )
}
