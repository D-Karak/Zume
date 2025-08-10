"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs"; // To get Clerk userId
import api from "@/lib/api/axiosinstance"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Download, Edit } from 'lucide-react';
import { ResumeBuilder } from "./resume-builder";

interface Resume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: "draft" | "completed";
}

export function Resume() {
  const { userId } = useAuth(); // Clerk userId
  const [view, setView] = useState<"list" | "create">("list");
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch resumes for this user
  useEffect(() => {
    if (!userId) return; // Wait until Clerk loads the user

    const fetchResumes = async () => {
      try {
        const res = await api.get(`resumes/user/${userId}`);
        console.log('Fetched resumes:', res.data);
        setResumes(res.data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [userId]);

  const handleCreateNew = () => {
    setEditingResume(null);
    setView("create");
  };

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setView("create");
  };

  const handleBack = () => {
    setView("list");
    setEditingResume(null);
  };

  if (view === "create") {
    return <ResumeBuilder onBack={handleBack} editingResume={editingResume} />;
  }

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

      {/* Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{resume.name}</CardTitle>
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
                  <Button size="sm" onClick={() => handleEdit(resume)}>
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

      {/* Empty State */}
      {resumes.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first professional resume to get started.
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Resume
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
