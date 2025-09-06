'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Send, Target, Crown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import clsx from 'clsx'

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "resume", label: "Resume", icon: FileText, href: "/dashboard/resume" },
  { id: "job-apply", label: "Apply for Jobs", icon: Send, href: "/dashboard/job-apply" },
  { id: "job-tracker", label: "Job Tracker", icon: Target, href: "/dashboard/job-tracker" },
]

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, id: string) => {
    if (id === "resume") {
      return pathname.startsWith("/dashboard/resume");
    }
    return pathname === href;
  }

  return (
    <div className={clsx(
      "bg-gradient-to-b from-[#2F786F] to-[#245A53] text-white flex flex-col transition-all duration-300 ease-in-out shadow-xl h-full",
      isCollapsed ? "w-0" : "w-64"
    )}>
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h1 className={clsx(
          "text-2xl font-bold transition-all duration-300 overflow-hidden whitespace-nowrap"
        )}>
          <span className='text-3xl '>Z</span>ume AI
        </h1>
        
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ id, label, icon: Icon, href }) => (
          <Link href={href} key={id}>
            <Button
              variant="ghost"
              className={clsx(
                "w-full justify-start group relative overflow-hidden transition-all duration-300",
                isActive(href, id) 
                  ? "bg-white/20 text-white hover:bg-white/30" 
                  : "text-white/80 hover:bg-white/10 hover:text-white",
                
              )}
            >
              <div className={clsx(
                "absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700",
                isActive(href, id) && "via-white/10"
              )} />
              <Icon className={clsx(
                "h-4 w-4 transition-all duration-200 relative z-10",
                !isCollapsed && "mr-3",
                isActive(href, id) && "scale-110"
              )} />
              <span className={clsx(
                "relative z-10 transition-all duration-300",
              )}>
                {label}
              </span>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                  {label}
                </div>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Subscription Card */}
      <div className={clsx(
        "p-4 border-t border-white/10 transition-all duration-300",
        isCollapsed?"overflow-hidden":"overflow-visible"
        
      )}>
        <Card className={clsx(
          "bg-white/10 border-white/20 text-white backdrop-blur-sm transition-all duration-300 overflow-hidden",
          isCollapsed?"w-0":"w-full"
        )}>
          
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Crown className="h-4 w-4 text-yellow-400 drop-shadow-glow" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Plan</span>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">Free</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Resumes</span>
                  <span className="text-sm font-medium">2/3</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-2 bg-white text-[#2F786F] hover:bg-white/90 font-medium shadow-lg transition-all duration-200 hover:scale-105"
                >
                  Upgrade
                </Button>
              </CardContent>
          
          
        </Card>
      </div>
    </div>
  )
}