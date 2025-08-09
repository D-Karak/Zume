"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Edit, Trash2, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Job {
  id: number
  company: string
  position: string
  status: "applied" | "interview" | "offer" | "rejected"
  dateApplied: string
  lastUpdate: string
  salary?: string
  location?: string
}

export function JobTrack() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      company: "Tech Corp",
      position: "Frontend Developer",
      status: "interview",
      dateApplied: "2024-01-15",
      lastUpdate: "2024-01-20",
      salary: "$80,000",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Full Stack Developer",
      status: "applied",
      dateApplied: "2024-01-20",
      lastUpdate: "2024-01-20",
      salary: "$75,000",
      location: "Remote",
    },
    {
      id: 3,
      company: "BigTech",
      position: "React Developer",
      status: "rejected",
      dateApplied: "2024-01-10",
      lastUpdate: "2024-01-18",
      salary: "$90,000",
      location: "New York, NY",
    },
    {
      id: 4,
      company: "InnovateCo",
      position: "Senior Frontend Developer",
      status: "offer",
      dateApplied: "2024-01-05",
      lastUpdate: "2024-01-22",
      salary: "$95,000",
      location: "Austin, TX",
    },
    {
      id: 5,
      company: "DevStudio",
      position: "UI/UX Developer",
      status: "applied",
      dateApplied: "2024-01-22",
      lastUpdate: "2024-01-22",
      salary: "$70,000",
      location: "Remote",
    },
  ])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    // Handle delete logic
    console.log("Delete job:", id)
  }

  const getStatusColor = (status: Job["status"]) => {
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

  const statusCounts = jobs.reduce(
    (acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Tracker</h1>
        <p className="text-muted-foreground">Track all your job applications and their status.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.applied || 0}</div>
            <p className="text-sm text-gray-600">Applied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.interview || 0}</div>
            <p className="text-sm text-gray-600">Interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{statusCounts.offer || 0}</div>
            <p className="text-sm text-gray-600">Offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected || 0}</div>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Applications ({filteredJobs.length})</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies or positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
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
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.dateApplied).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(job.lastUpdate).toLocaleDateString()}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applications found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
