import React from 'react'
import { Button } from '@/components/ui/button';
import { Loader2,Eye,Edit } from 'lucide-react';
import Link from 'next/link';
import { steps } from './step'; // Adjust the import path as necessary
import clsx from 'clsx';
interface FooterProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
    isSaving: boolean;
    preview: boolean;
    setPreview: (preview: boolean) => void;
}
const footer = ({currentStep,setCurrentStep,isSaving,preview,setPreview}:FooterProps) => {

    const previousStep = steps.find(
        (_,index)=>steps[index+1]?.key===currentStep
    )?.key
    const nextStep = steps.find(
        (_,index)=>steps[index-1]?.key===currentStep
    )?.key

  return (
    <footer className="w-full border-t px-3 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button 
            variant={"secondary"}
            onClick={previousStep? () => setCurrentStep(previousStep) : undefined}
            disabled={!previousStep}
            >Previous Step</Button>
            <Button 
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
            >Next Step</Button>
          </div>
          {/* Preview Toggle - Mobile/Tablet */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreview(!preview)}
              className={clsx(
                "lg:hidden w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm",
                "border-gray-200 hover:border-[#2F786F]/30 hover:bg-[#2F786F]/5",
                preview && "bg-[#2F786F]/10 border-[#2F786F]/30"
              )}
            >
              {preview ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button variant={"secondary"} asChild>
              <Link href="/dashboard/resume">Close</Link>
            </Button>
              {/* Saving Indicator */}
              <div className={clsx(
                "flex items-center gap-2 text-sm transition-all duration-300",
                isSaving ? "opacity-100" : "opacity-0 pointer-events-none"
              )}>
                <Loader2 className="h-4 w-4 animate-spin text-[#2F786F]" />
                <span className="text-[#2F786F] font-medium">Saving...</span>
              </div>
        </div>
        </div>
      </footer>
  )
  }

export default footer