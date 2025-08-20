"use client"; // 👈 this makes the whole file a client component

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import { getAllResumes } from "@/lib/api/resume/resume.new";
import { useUser } from "@clerk/nextjs";
import ResumeItem from "./ResumeItem";
export default function ResumePage() {
  const { user, isLoaded } = useUser();
  const clerkId = isLoaded ? user?.id : null;

  const [resumes, setResumes] = useState<any[]>([]);
  const [totlalResumes, setTotalResumes] = useState(0);
  useEffect(() => {
    if (!clerkId) return;

    const fetchResumes = async () => {
      try {
        const data = await getAllResumes(clerkId);
        setResumes(data.resumes);
        setTotalResumes(data.totalResumes);
        // console.log("Fetched resumes:", data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, [clerkId]);

  if (!clerkId) {
    return <p className="text-center py-6">Please sign in to view resumes</p>;
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link
          href="/dashboard/resume/editor"
          className="flex items-center gap-2"
        >
          Create New Resume
          <PlusSquare className="size-5" />
        </Link>
      </Button>

      {/* Example of listing resumes */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <p> Total : {totlalResumes}</p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <ResumeItem
              key={resume.id}
              resume={resume}
              onDeleted={(id: string) => {
                setResumes((prev) => prev.filter((r) => r.id !== id));
                setTotalResumes((prev) => prev - 1);
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No resumes found.</p>
        )}
      </div>
    </main>
  );
}
