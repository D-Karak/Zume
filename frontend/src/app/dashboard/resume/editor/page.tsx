import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { resumeToEdit } from "@/lib/api/resume/resume.new";
import ResumeEditorWrapper from "./resumeEditorWrapper";

export const metadata: Metadata = {
  title: "Design your resume",
};

export default async function Page(props: unknown) {
  // Accept Next.js props as unknown and narrow them here to avoid
  // conflicting with Next's generated PageProps type.
  const { searchParams } = (props as { searchParams?: { resumeId?: string | string[] } }) || {};
  const resumeId = typeof searchParams?.resumeId === 'string' ? searchParams.resumeId : '';
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
