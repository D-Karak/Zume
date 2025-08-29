"use client";
import React from "react";
import { useState } from "react";
import Breadcrumbs from "./breadCrumbs";
import { steps } from "./step";
import { useSearchParams } from "next/navigation";
import Footer from "./footer";
import { ResumeValues,emptyResume } from "@/lib/validation";
import { ResumePreview } from "@/components/dashboard/resume/resumePreview";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import { useAutoSave } from "@/hooks/useAutoSave";
import { mapToResumeValues } from "@/lib/utils";
import clsx from "clsx";

interface ResumeEditorProps {
  resumetoEdit: any | null;
}

const ResumeEditor = ({ resumetoEdit }: ResumeEditorProps) => {
  // console.log("resumetoEdit", resumetoEdit);
  // console.log(mapToResumeValues(resumetoEdit));

  const searchParams = useSearchParams();
  
  // Initialize state with mapped values if resumetoEdit exists, otherwise empty object
  const [resumeData, setResumeData] = useState<ResumeValues>(() => {
    if (!resumetoEdit) return emptyResume;
    try {
      // console.log("mapValue",mapToResumeValues(resumetoEdit));
      return mapToResumeValues(resumetoEdit);
      
    } catch (error) {
      console.error("Error mapping resume data:", error);
      return emptyResume; // Fallback to empty resume if mapping fails
    }
  });
  // console.log("resumetoEdit", resumeData);
  //for preview mode
  const [preview, setPreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSave(resumeData) ?? {
    isSaving: false,
    hasUnsavedChanges: false,
  };

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", key);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }
  const FormComponent =
    steps.find((s) => s.key === currentStep)?.component || steps[0].component;

  return (
    <div className="flex w-full min-h-[150vh] grow flex-col">
      <header className="space-y-1.5 border-b px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Design your Resume
        </h1>
        <p className="text-sm text-muted-foreground">
          Create and customize your professional resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className={clsx(
            preview? "hidden lg:block": "w-full overflow-y-auto p-3 md:w-1/2 space-y-6"
          )}>
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className="grow md:border-r" />

          {/* Right side content, e.g., preview or additional info */}
          <ResumePreview resumeData={resumeData} preview={preview} />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        isSaving={isSaving}
        preview={preview}
        setPreview={setPreview}
      />
    </div>
  );
};

export default ResumeEditor;
