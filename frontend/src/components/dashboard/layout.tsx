// app/dashboard/layout.tsx
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children} {/* Like <Outlet /> */}
        </main>
      </div>
    </div>
  )
}
