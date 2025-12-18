import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex-center h-full"
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
