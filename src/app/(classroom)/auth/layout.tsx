import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex-center h-[calc(100vh-60px)]"
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
