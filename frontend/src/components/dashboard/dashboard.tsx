"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Send, Clock, XCircle, Eye } from 'lucide-react'
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
  const [loading, setLoading] = useState(true) // default true for loader

  // Fetch jobs + resumes
  useEffect(() => {
    if (!clerkId) return
  
    const run = async () => {
      try {
        setLoading(true)
        const ai= "generate summary from gemini"// Call the AI function to demonstrate functionality
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

  // Stats
  const stats = useMemo(() => {
    const applied = jobs.length
    const processing = jobs.filter(j => j.status === "interview" || j.status === "offer").length
    const rejected = jobs.filter(j => j.status === "rejected").length
    const totalResumes = resumes.length

    return [
      { title: "Total Job Applied", value: applied.toString(), icon: Send, change: `+${applied}`, changeType: "positive" as const },
      { title: "Processing", value: processing.toString(), icon: Clock, change: `${processing}`, changeType: "neutral" as const },
      { title: "Rejected", value: rejected.toString(), icon: XCircle, change: `-${rejected}`, changeType: "negative" as const },
      { title: "Total Resumes", value: totalResumes.toString(), icon: FileText, change: `+${totalResumes}`, changeType: "positive" as const },
    ]
  }, [jobs, resumes])

  // Recent activity (derive from jobs lastUpdate)
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
      }))
  }, [jobs])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your career overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(4)].map((_, i) => (
              <Card key={i}>
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

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions (no loader needed, static links) */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href={"/dashboard/resume/editor"}>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Create New Resume</p>
                    <p className="text-sm text-muted-foreground">Build a professional resume</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"/dashboard/job-apply"}>
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Apply for Jobs</p>
                    <p className="text-sm text-muted-foreground">Find and apply to new positions</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/dashboard/job-tracker">
              <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Track Applications</p>
                    <p className="text-sm text-muted-foreground">Monitor your job applications</p>
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
