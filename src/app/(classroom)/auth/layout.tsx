export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex-center h-[calc(100vh-60px)]">{children}</div>
}
