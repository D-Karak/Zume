import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { resumeToEdit } from "@/lib/api/resume/resume.new";
import ResumeEditorWrapper from "./resumeEditorWrapper";

export const metadata: Metadata = {
  title: "Design your resume",
};

type PageProps = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const resumeId = typeof params?.resumeId === 'string' ? params.resumeId : '';
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