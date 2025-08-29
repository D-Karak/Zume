"use client"
import { useState } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import clsx from "clsx"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - Only visible on large screens */}
      <div className={clsx(
        "hidden lg:block transition-all duration-300",
        isCollapsed ? "w-0" : "w-64"
      )}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay - Dark background when sidebar is open */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/50 z-40 lg:hidden  transition-opacity duration-300",
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Sidebar - Slides in from left */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-64 lg:hidden transition-transform duration-300 transform",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar isCollapsed={false} setIsCollapsed={() => setIsMobileOpen(false)} />
      </div>

      {/* Main Content - Always full width on mobile */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Navbar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={(value) => {
            if (window.innerWidth < 1024) {
              setIsMobileOpen(!isMobileOpen)
            } else {
              setIsCollapsed(value)
            }
          }} 
        />


        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children} {/* Like <Outlet /> */}
        </main>
      </div>
    </div>
  )
}
