"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Download, Edit } from "lucide-react";
import { getUserResumes, saveResume } from "@/lib/api/resume/resume.new";

interface Resume {
  id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "completed";
}

export function Resume() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  const {user,isLoaded}= useUser();
  const clerkId = user?.id
  console.log("Clerk ID:", clerkId);

  useEffect(() => {
    if(!isLoaded || !clerkId) return;
    
    const fetchResumes = async () => {
      try {
        const res = await getUserResumes(clerkId);
        setResumes(res);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [clerkId,isLoaded]);

  const handleCreateNew = async () => {
    if(!isLoaded || !clerkId) return;
    try {
      const res = await saveResume(clerkId,'', [], []);
      const newResumeId = res.resume.id;
      router.push(`/dashboard/resume/${newResumeId}/`);
    } catch (err) {
      console.error("Error creating resume:", err);
    }
  };

  if (loading) {
    return <p>Loading resumes...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground">
            Create and manage your professional resumes.
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{resume.fullName || "Untitled Resume"}</CardTitle>
                </div>
                <Badge
                  variant={resume.status === "completed" ? "default" : "secondary"}
                >
                  {resume.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => router.push(`/dashboard/resume/${resume.id}/contact`)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
