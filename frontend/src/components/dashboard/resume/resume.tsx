/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquare, FileText, Sparkles } from "lucide-react";
import { getAllResumes } from "@/lib/api/resume/resume.new";
import { useUser } from "@clerk/nextjs";
import ResumeItem from "./ResumeItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  const { user, isLoaded } = useUser();
  const clerkId = isLoaded ? user?.id : null;
  //ts-expect-ignore
  const [resumes, setResumes] = useState<any[]>([]);
  const [totalResumes, setTotalResumes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clerkId) return;

    const fetchResumes = async () => {
      try {
        setLoading(true);
        const data = await getAllResumes(clerkId);
        setResumes(data.resumes);
        setTotalResumes(data.totalResumes);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [clerkId]);

  if (!clerkId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center space-y-4">
          <FileText className="h-16 w-16 text-gray-300 mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-700">Sign in Required</h2>
          <p className="text-gray-500 max-w-md">
            Please sign in to view and manage your resumes
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Section with Gradient Background */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2F786F] via-[#3A8B82] to-[#245A53] p-6 sm:p-8 text-white dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-card">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2">
                Your Resumes
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
              </h1>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 text-sm sm:text-base"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {totalResumes} {totalResumes === 1 ? 'Resume' : 'Resumes'}
                </Badge>
                {/* <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white border-white/30 text-sm sm:text-base"
                >
                  {3 - totalResumes} slots remaining
                </Badge> */}
              </div>
            </div>
            
            <Button 
              asChild 
              size="lg"
              className="dark:text-card bg-white text-[#2F786F] hover:bg-white/90 font-semibold shadow-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            >
              <Link
                href="/dashboard/resume/editor"
                className="flex items-center justify-center gap-2"
              >
                <PlusSquare className="h-5 w-5" />
                Create New Resume
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -right-10 -top-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 sm:w-60 sm:h-60 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Resumes Grid */}
      <div className="space-y-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 sm:h-56 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-flow-col gap-4 sm:gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <ResumeItem
                  resume={resume}
                  onDeleted={(id: string) => {
                    setResumes((prev) => prev.filter((r) => r.id !== id));
                    setTotalResumes((prev) => prev - 1);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center space-y-4 max-w-md">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                No resumes yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Create your first resume to get started on your job search journey
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      {resumes.length > 0 && (
        <div className="dark:bg-gradient-to-r from-card to-card dark:border-accent  mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#2F786F]/10 to-[#245A53]/10 rounded-lg sm:rounded-xl border border-[#2F786F]/20">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#2F786F]">
            💡 Pro Tips
          </h3>
          <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
            <li>• Keep multiple versions of your resume for different job types</li>
            <li>• Update your resume regularly with new skills and experiences</li>
            <li>• Tailor each resume to match specific job requirements</li>
          </ul>
        </div>
      )}
    </main>
  );
}