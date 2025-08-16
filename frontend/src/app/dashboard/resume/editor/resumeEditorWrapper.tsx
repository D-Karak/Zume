"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ResumeEditor from "./resumeEditor";
import { resumeToEdit } from "@/lib/api/resume/resume.new";
import { ResumeValues } from "@/lib/validation";

interface Props {
  resumeId: string;
  initialResume: ResumeValues | null;
}

export default function ResumeEditorWrapper({ resumeId, initialResume }: Props) {
  const { user, isLoaded } = useUser();
  const [clerkId, setClerkId] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeValues | null>(initialResume);

  useEffect(() => {
    if (isLoaded && user) {
      setClerkId(user.id);

      if (!initialResume && resumeId) {
        // Only fetch if we didn't get data from server
        resumeToEdit(resumeId, user.id).then((data) => {
          setResumeData(data.resume);
        });
      }
    }
  }, [isLoaded, user, resumeId, initialResume]);

  // if (!resumeData || !clerkId) {
  //   return <div>Loading...</div>;
  // }

  return <ResumeEditor resumetoEdit={resumeData} />;
}
