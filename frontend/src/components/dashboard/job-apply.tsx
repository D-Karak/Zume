"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@clerk/nextjs"
import { createJob } from "@/lib/api/jobapplication/index"
import { getAllResumes } from "@/lib/api/resume/resume.new"
import { toast } from "sonner"
import { jobSchema, JobFormData } from "@/lib/validation"
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  FileText, 
  Send, 
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export function JobApply() {
  const { user, isLoaded } = useUser()
  const clerkId = isLoaded ? user?.id : null
  // @ts-expect-ignore
  const [resumes, setResumes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!clerkId) return

    const fetchResumes = async () => {
      try {
        setLoading(true)
        const data = await getAllResumes(clerkId)
        setResumes(data.resumes)
      } catch (error) {
        console.error("Error fetching resumes:", error)
        toast.error("Failed to load resumes")
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [clerkId])

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      position: "",
      applyDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      status: "applied",
      resumeId: "",
    },
  })

  const onSubmit = async (data: JobFormData) => {
    if (!user) return
    
    try {
      setSubmitting(true)
      await createJob(user.id, data)
      toast.success("Job application added successfully! 🎉")
      form.reset({
        jobTitle: "",
        company: "",
        position: "",
        applyDate: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0],
        status: "applied",
        resumeId: "",
      })
    } catch (Error) {
      toast.error("Failed to add job application")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2F786F] via-[#3A8B82] to-[#245A53] p-6 sm:p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Send className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Apply for Jobs
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl">
            Track your job applications and stay organized in your job search journey
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -right-10 -top-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 sm:w-60 sm:h-60 bg-white/5 rounded-full blur-3xl" />
        <Sparkles className="absolute right-6 top-6 h-6 w-6 text-yellow-300 opacity-70" />
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2F786F]/10 rounded-lg">
              <Briefcase className="h-5 w-5 text-[#2F786F]" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl">New Job Application</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Fill in the details to track your application
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Job Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-[2px] bg-[#2F786F]" />
                  Job Details
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField 
                    control={form.control} 
                    name="jobTitle" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          Job Title
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g. Frontend Developer"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20"
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          Company
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g. Tech Corp"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20"
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          Position Type
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g. Full-time, Remote"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField 
                    control={form.control} 
                    name="resumeId" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          Resume Used
                        </FormLabel>
                        {loading ? (
                          <Skeleton className="h-11 w-full" />
                        ) : (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20">
                                <SelectValue placeholder="Select a resume" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {resumes.length > 0 ? (
                                resumes.map(r => (
                                  <SelectItem key={r.id} value={r.id}>
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      {r.title || "Untitled Resume"}
                                    </div>
                                  </SelectItem>
                                ))
                              ) : (
                                <div className="p-2 text-sm text-gray-500 text-center">
                                  No resumes found. Create one first.
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="w-8 h-[2px] bg-[#2F786F]" />
                  Timeline
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <FormField 
                    control={form.control} 
                    name="applyDate" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          Application Date
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20"
                          />
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
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          Last Update
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Application will be marked as <Badge className="ml-1 bg-blue-600">Applied</Badge>
                </span>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={submitting || resumes.length === 0}
                className="w-full h-12 bg-[#2F786F] hover:bg-[#245A53] text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Adding Application...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Add Job Application
                  </>
                )}
              </Button>

              {resumes.length === 0 && !loading && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    You need to create a resume first before applying for jobs.
                  </p>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-[#2F786F]/5 to-[#245A53]/5">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-[#2F786F]">
            💡 Application Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-1">•</span>
              Keep your application details updated to track progress effectively
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-1">•</span>
              Use specific resumes tailored for different job types
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-1">•</span>
              Set reminders for follow-ups on applications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-1">•</span>
              Regularly review and update your resume to reflect new skills and experiences
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
