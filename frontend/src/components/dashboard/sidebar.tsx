// components/sidebar.tsx
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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Zume AI</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ id, label, icon: Icon, href }) => (
          <Link href={href} key={id}>
            <Button
              variant={pathname === href ? "default" : "ghost"}
              className={clsx("w-full justify-start")}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Subscription Card */}
      <div className="p-4 border-t">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-500" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan</span>
              <Badge variant="secondary">Free</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Resumes</span>
              <span className="text-sm">2/3</span>
            </div>
            <Button size="sm" className="w-full mt-2">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
