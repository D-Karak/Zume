"use client";
import React from "react";
import { useState } from "react";
import ResumeForm from "@/components/dashboard/resume/ResumeForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Breadcrumbs from "./breadCrumbs";
import { steps } from "./step"; // Adjust the import path as necessary
import { useSearchParams } from "next/navigation";
import Footer from "./footer";
import { ResumeValues } from "@/lib/validation";
const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>({})
  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("step", key);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent =
    steps.find((s) => s.key === currentStep)?.component || steps[0].component;

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col">
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
          <div className="w-full overflow-y-auto p-3 md:w-1/2 space-y-6">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && <FormComponent 
            resumeData={resumeData}
            setResumeData={setResumeData}
            />}
          </div>
          <div className="grow md:border-r"/>
        <div className="hidden w-1/2 md:flex">
          {/* Right side content, e.g., preview or additional info */}
          
          <pre>
            {JSON.stringify(resumeData, null, 2)}
          </pre>
        </div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
};

export default ResumeEditor;
