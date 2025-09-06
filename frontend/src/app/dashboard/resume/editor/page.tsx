import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { resumeToEdit } from "@/lib/api/resume/resume.new";
import ResumeEditorWrapper from "./resumeEditorWrapper";


export const metadata: Metadata = {
  title: "Design your resume",
};

interface SearchParams {
  resumeId?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
const resumeId = searchParams?.resumeId ?? '';
const user = await currentUser(); // Clerk user ID (server-side)

if (!user) {
  throw new Error('Unauthorized: Please sign in to continue.');
}

const serverData = await resumeToEdit(resumeId, user.id);

  return (
    <ResumeEditorWrapper
      resumeId={resumeId}
      initialResume={serverData?.resume ?? null}
    />
  );
}
