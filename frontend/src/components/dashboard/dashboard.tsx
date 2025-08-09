"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Send, Clock, XCircle, TrendingUp, Eye } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: "Total Job Applied",
      value: "24",
      icon: Send,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Processing",
      value: "8",
      icon: Clock,
      change: "+3",
      changeType: "neutral" as const,
    },
    {
      title: "Rejected",
      value: "12",
      icon: XCircle,
      change: "-2",
      changeType: "negative" as const,
    },
    {
      title: "Total Resumes",
      value: "3",
      icon: FileText,
      change: "+1",
      changeType: "positive" as const,
    },
  ]

  const recentActivity = [
    { action: "Applied to Frontend Developer at Tech Corp", time: "2 hours ago" },
    { action: "Resume viewed by StartupXYZ", time: "4 hours ago" },
    { action: "Interview scheduled with InnovateCo", time: "1 day ago" },
    { action: "Application rejected by BigTech", time: "2 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your career overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Badge 
                    variant={
                      stat.changeType === "positive" 
                        ? "default" 
                        : stat.changeType === "negative" 
                        ? "destructive" 
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Create New Resume</p>
                  <p className="text-sm text-muted-foreground">Build a professional resume</p>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Apply for Jobs</p>
                  <p className="text-sm text-muted-foreground">Find and apply to new positions</p>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Track Applications</p>
                  <p className="text-sm text-muted-foreground">Monitor your job applications</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
