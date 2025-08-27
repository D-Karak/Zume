// app/dashboard/layout.tsx
import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div className="flex h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children} {/* Like <Outlet /> */}
        </main>
      </div>
    </div>
  )
}
