"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"
import { createJob } from "@/lib/api/jobapplication/index"
import { getAllResumes } from "@/lib/api/resume/resume.new" // assume resume api exists
import { toast } from "sonner"
import { jobSchema, JobFormData } from "@/lib/validation" 

export function JobApply() {
  const { user,isLoaded } = useUser()
  
  const clerkId = isLoaded ? user?.id : null;
  const [resumes, setResumes] = useState<any[]>([])

  useEffect(() => {
      if (!clerkId) return;
  
      const fetchResumes = async () => {
        try {
          const data = await getAllResumes(clerkId);
          setResumes(data.resumes);
          // console.log("Fetched resumes:", data);
        } catch (error) {
          console.error("Error fetching resumes:", error);
        }
      };
  
      fetchResumes();
    }, [clerkId]);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      position: "",
      applyDate: "",
      lastUpdate: "",
      status: "applied",
      resumeId: "",
    },
  })

  const onSubmit = async (data: JobFormData) => {
    if (!user) return
    await createJob(user.id, data)
    toast.success("Job application added!")
    form.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Job Application</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="jobTitle" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="position" render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="applyDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Apply Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="lastUpdate" render={({ field }) => (
              <FormItem>
                <FormLabel>Last Update</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="resumeId" render={({ field }) => (
              <FormItem>
                <FormLabel>Select Resume</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Choose Resume" /></SelectTrigger>
                  <SelectContent>
                    {resumes?.map(r => (
                      <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}/>
              </div>
            <Button type="submit" className="w-full">Add Job Application</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
