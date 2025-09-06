import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { resumeToEdit } from "@/lib/api/resume/resume.new";
import ResumeEditorWrapper from "./resumeEditorWrapper";
import { PageProps } from "next/types";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page({
  searchParams,
}: PageProps) {
  const resumeId = searchParams?.resumeId ?? '';
  const user = await currentUser();

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