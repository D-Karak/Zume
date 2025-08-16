import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveResume } from "@/lib/api/resume/resume.new";
import { useUser } from "@clerk/nextjs";
import { fileReplacer } from "@/lib/utils";
export const useAutoSave = (resumeData: ResumeValues) => {
  const { user, isLoaded } = useUser();
  const [clerkId, setClerkId] = useState<string | null>(null);

useEffect(() => {
  if (isLoaded && user) {
    setClerkId(user.id);
  }
}, [isLoaded, user]);

  const searchParam = useSearchParams();

  const debouncedValue = useDebounce(resumeData, 2000);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastsavedData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );

  const [isSaving, setIsSaving] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedValue]);

  useEffect(() => {
    async function autoSave() {
      // setIsSaving(true);
      // // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      // saveResume(debouncedValue, clerkId)
      // setLastSavedData(structuredClone(debouncedValue));
      // setIsSaving(false);
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedValue);

        const updateResume = await saveResume(
          {
            ...newData,
             ...(JSON.stringify(lastsavedData.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
            id: resumeId,
          },
          clerkId
        );
        setResumeId(updateResume.id);
        setLastSavedData(newData);
        if (searchParam.get("resumeId") !== updateResume.id) {
          const newSearchParams = new URLSearchParams(searchParam);
          newSearchParams.set("resumeId", updateResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
        toast.success("Resume saved successfully");
      } catch (error: any) {
        console.error("Failed to save resume:", error);
        setIsError(true);
        toast.error(error.response?.data?.error || "Failed to save resume");
      } finally {
        setIsSaving(false);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedValue) !== JSON.stringify(lastsavedData);
    if (hasUnsavedChanges && debouncedValue && !isSaving && !isError) {
      autoSave();
    }
  }, [debouncedValue, isSaving, lastsavedData, isError, resumeId, searchParam, toast]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(debouncedValue) !== JSON.stringify(lastsavedData),
  };
};
