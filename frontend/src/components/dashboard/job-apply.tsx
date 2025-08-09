"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Calendar, Building, MapPin } from 'lucide-react'

const jobApplicationSchema = z.object({
  jobTitle: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  applyDate: z.string().min(1, "Apply date is required"),
  lastUpdate: z.string().min(1, "Last update is required"),
  resume: z.string().optional(),
})

type JobApplicationData = z.infer<typeof jobApplicationSchema>

interface RecentApplication {
  id: string
  jobTitle: string
  company: string
  position: string
  applyDate: string
  status: "applied" | "interview" | "offer" | "rejected"
}

export function JobApply() {
  const [recentApplications] = useState<RecentApplication[]>([
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Corp",
      position: "Frontend Developer",
      applyDate: "2024-01-20",
      status: "interview",
    },
    {
      id: "2",
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      applyDate: "2024-01-18",
      status: "applied",
    },
    {
      id: "3",
      jobTitle: "React Developer",
      company: "InnovateCo",
      position: "React Developer",
      applyDate: "2024-01-15",
      status: "rejected",
    },
  ])

  const form = useForm<JobApplicationData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      position: "",
      applyDate: "",
      lastUpdate: "",
      resume: "",
    },
  })

  const onSubmit = (data: JobApplicationData) => {
    console.log("Job application data:", data)
    // Handle form submission
    form.reset()
  }

  const getStatusColor = (status: RecentApplication["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-yellow-100 text-yellow-800"
      case "offer":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Apply for Jobs</h1>
        <p className="text-muted-foreground">Track your job applications and apply to new positions.</p>
      </div>

      {/* Job Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>New Job Application</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Tech Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applyDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apply Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastUpdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Update</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label>Attach Resume</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Job Application
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{application.jobTitle}</h4>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Applied {new Date(application.applyDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
