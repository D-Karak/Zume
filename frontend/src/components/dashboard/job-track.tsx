"use client";

import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";

import { Search, Filter, Edit, Trash2 } from "lucide-react";

// ---- API functions (adjust paths if yours differ) ---------------------------
import { getJobs, updateJob, deleteJob } from "@/lib/api/jobapplication/index";
import { getAllResumes } from "@/lib/api/resume/resume.new"; // should return array of { id, title }
import { jobSchema, JobFormData } from "@/lib/validation";


type Job = {
  id: string;
  jobTitle: string;
  company: string;
  position: string;
  applyDate: string;   // ISO string from backend
  lastUpdate: string;  // ISO string from backend
  status: "applied" | "interview" | "offer" | "rejected";
  resumeId?: string | undefined;
};
type Resume = { id: string; title: string };

export default function JobTrack() {
  const { user, isLoaded } = useUser();
  const clerkId = isLoaded ? user?.id : undefined;

  // UI state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); // confirm save
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // RHF form for edit modal
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
  });

  // Fetch jobs and resumes
  useEffect(() => {
    if (!clerkId) return;
    const run = async () => {
      try {
        setLoading(true);
        const jobsRes = await getJobs(clerkId);
        const resumesRes = await getAllResumes(clerkId);
        setJobs(jobsRes); // depending on your axiosinstance shape
        setResumes(resumesRes.resumes);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load jobs/resumes.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [clerkId]);

  // Helpers
  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-yellow-100 text-yellow-800";
      case "offer":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const statusCounts = useMemo(() => {
    return jobs.reduce(
      (acc, j) => {
        acc[j.status] = (acc[j.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesSearch =
        !s ||
        j.company.toLowerCase().includes(s) ||
        j.position.toLowerCase().includes(s) ||
        j.jobTitle.toLowerCase().includes(s);
      const matchesStatus = statusFilter === "all" || j.status === (statusFilter as Job["status"]);
      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  // Open edit modal with job data
  const onEdit = (job: Job) => {
    setSelectedJob(job);
    form.reset({
      jobTitle: job.jobTitle,
      company: job.company,
      position: job.position,
      applyDate: job.applyDate?.slice(0, 10),  // yyyy-mm-dd (for date input)
      lastUpdate: job.lastUpdate?.slice(0, 10),
      status: job.status,
      resumeId: job.resumeId || "",
    });
    setEditOpen(true);
  };

  // Confirm before actually saving
  const onConfirmSave = () => setConfirmOpen(true);

  // Save changes
  const onSave = async () => {
    if (!clerkId || !selectedJob) return;
    try {
      const values = form.getValues();
      await updateJob(clerkId, selectedJob.id, values);
      toast.success("Job updated");

      // Refresh list
      const jobsRes = await getJobs(clerkId);
      setJobs(jobsRes);

      // Close dialogs
      setConfirmOpen(false);
      setEditOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  // Delete flow
  const onAskDelete = (job: Job) => {
    setSelectedJob(job);
    setDeleteOpen(true);
  };

  const onDelete = async () => {
    if (!clerkId || !selectedJob) return;
    try {
      await deleteJob(clerkId, selectedJob.id);
      toast.success("Job deleted");

      // Refresh
      const jobsRes = await getJobs(clerkId);
      setJobs(jobsRes);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    } finally {
      setDeleteOpen(false);
      setSelectedJob(null);
    }
  };

  if (!clerkId) {
    return <p className="text-center py-6">Please sign in to view jobs</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Tracker</h1>
        <p className="text-muted-foreground">Track all your job applications and their status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><div className="text-2xl font-bold text-blue-600">{statusCounts.applied || 0}</div><p className="text-sm text-gray-600">Applied</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-2xl font-bold text-yellow-600">{statusCounts.interview || 0}</div><p className="text-sm text-gray-600">Interviews</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-2xl font-bold text-green-600">{statusCounts.offer || 0}</div><p className="text-sm text-gray-600">Offers</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-2xl font-bold text-red-600">{statusCounts.rejected || 0}</div><p className="text-sm text-gray-600">Rejected</p></CardContent></Card>
      </div>

      {/* Search + Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>
              All Applications {loading ? "(loading…)" : `(${filteredJobs.length})`}
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search company / position / title…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.jobTitle}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(job.applyDate), "yyyy-MM-dd")}</TableCell>
                  <TableCell>{format(new Date(job.lastUpdate), "yyyy-MM-dd")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(job)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onAskDelete(job)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {!loading && filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applications found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ---- Edit Job Modal (fields identical to Apply) --------------------- */}
      <Dialog open={editOpen} onOpenChange={(o) => { setEditOpen(o); if (!o) setSelectedJob(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
            <DialogDescription>Update and save changes.</DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onConfirmSave(); // open confirmation dialog before saving
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input {...form.register("jobTitle")} />
                <p className="text-xs text-red-500">{form.formState.errors.jobTitle?.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input {...form.register("company")} />
                <p className="text-xs text-red-500">{form.formState.errors.company?.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Position</label>
                <Input {...form.register("position")} />
                <p className="text-xs text-red-500">{form.formState.errors.position?.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  defaultValue={form.getValues("status")}
                  onValueChange={(v) => form.setValue("status", v as JobFormData["status"])}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Apply Date</label>
                <Input type="date" {...form.register("applyDate")} />
                <p className="text-xs text-red-500">{form.formState.errors.applyDate?.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Last Update</label>
                <Input type="date" {...form.register("lastUpdate")} />
                <p className="text-xs text-red-500">{form.formState.errors.lastUpdate?.message}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Select Resume</label>
                <Select
                  value={form.watch("resumeId") || ""}
                  onValueChange={(v) => form.setValue("resumeId", v)}
                >
                  <SelectTrigger><SelectValue placeholder="Choose Resume" /></SelectTrigger>
                  <SelectContent>
                    {resumes?.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title || "Untitled"}
                      </SelectItem>
                    ))}
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ---- Confirm Save Dialog ------------------------------------------- */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save changes?</DialogTitle>
            <DialogDescription>This will update the job application.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={onSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---- Confirm Delete Dialog ----------------------------------------- */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete job application?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
