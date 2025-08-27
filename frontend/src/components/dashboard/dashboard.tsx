"use client"
import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Send, Clock, XCircle, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { getJobs } from "@/lib/api/jobapplication"
import { getAllResumes } from "@/lib/api/resume/resume.new"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

type Job = {
  id: string
  jobTitle: string
  company: string
  position: string
  applyDate: string
  lastUpdate: string
  status: "applied" | "interview" | "offer" | "rejected"
  resumeId?: string | null
}
type Resume = { id: string; title: string }

export default function Dashboard() {
  const { user, isLoaded } = useUser()
  const clerkId = isLoaded ? user?.id : undefined

  const [jobs, setJobs] = useState<Job[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!clerkId) return
  
    const run = async () => {
      try {
        setLoading(true)
        const [jobsRes, resumesRes] = await Promise.all([
          getJobs(clerkId),
          getAllResumes(clerkId),
        ])
        setJobs(jobsRes)
        setResumes(resumesRes.resumes)
      } catch (err) {
        console.error(err)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [clerkId])

  const stats = useMemo(() => {
    const applied = jobs.length
    const processing = jobs.filter(j => j.status === "interview" || j.status === "offer").length
    const rejected = jobs.filter(j => j.status === "rejected").length
    const totalResumes = resumes.length

    return [
      { 
        title: "Total Job Applied", 
        value: applied.toString(), 
        icon: Send, 
        change: `+${applied}`, 
        changeType: "positive" as const,
        gradient: "from-emerald-500 to-teal-600",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600"
      },
      { 
        title: "Processing", 
        value: processing.toString(), 
        icon: Clock, 
        change: `${processing}`, 
        changeType: "neutral" as const,
        gradient: "from-blue-500 to-indigo-600",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600"
      },
      { 
        title: "Rejected", 
        value: rejected.toString(), 
        icon: XCircle, 
        change: `-${rejected}`, 
        changeType: "negative" as const,
        gradient: "from-red-500 to-rose-600",
        iconBg: "bg-red-500/10",
        iconColor: "text-red-600"
      },
      { 
        title: "Total Resumes", 
        value: totalResumes.toString(), 
        icon: FileText, 
        change: `+${totalResumes}`, 
        changeType: "positive" as const,
        gradient: "from-violet-500 to-purple-600",
        iconBg: "bg-violet-500/10",
        iconColor: "text-violet-600"
      },
    ]
  }, [jobs, resumes])

  const recentActivity = useMemo(() => {
    return jobs
      .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
      .slice(0, 5)
      .map((job) => ({
        action: `${job.status === "rejected"
          ? "Application rejected"
          : job.status === "offer"
            ? "Offer received"
            : job.status === "interview"
              ? "Interview scheduled"
              : "Applied"} at ${job.company}`,
        time: formatDistanceToNow(new Date(job.lastUpdate), { addSuffix: true }),
        status: job.status,
        company: job.company
      }))
  }, [jobs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "rejected": return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
      case "offer": return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
      case "interview": return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? [...Array(4)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))
          : stats.map((stat) => {
              const Icon = stat.icon
              const TrendIcon = stat.changeType === "positive" ? TrendingUp : 
                               stat.changeType === "negative" ? TrendingDown : Minus
              return (
                <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          stat.changeType === "positive"
                            ? "default"
                            : stat.changeType === "negative"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs flex items-center gap-1"
                      >
                        <TrendIcon className="h-3 w-3" />
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-muted-foreground">this month</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-2 w-2 rounded-full mt-2" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="relative">
                        <div className="w-2 h-2 bg-[#2F786F] rounded-full mt-2 flex-shrink-0" />
                        {index < recentActivity.length - 1 && (
                          <div className="absolute top-4 left-[3px] w-[2px] h-12 bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>
                      <div className="flex-1 pb-8 last:pb-0">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No recent activity yet.</p>
                    <Link href="/dashboard/job-apply">
                      <Badge className="mt-2 cursor-pointer">Start applying</Badge>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#2F786F]/10 to-[#245A53]/10">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <Link href="/dashboard/resume/editor">
              <div className="p-4 border-2 border-transparent rounded-xl hover:border-[#2F786F]/20 hover:bg-[#2F786F]/5 cursor-pointer transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p
                     className="font-semibold text-sm md:text-base">Create New Resume</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Build a professional resume with AI
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/job-apply">
              <div className="p-4 border-2 border-transparent rounded-xl hover:border-[#2F786F]/20 hover:bg-[#2F786F]/5 cursor-pointer transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    <Send className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base">Apply for Jobs</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Find and apply to new positions
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/dashboard/job-tracker">
              <div className="p-4 border-2 border-transparent rounded-xl hover:border-[#2F786F]/20 hover:bg-[#2F786F]/5 cursor-pointer transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base">Track Applications</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Monitor your job applications
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}