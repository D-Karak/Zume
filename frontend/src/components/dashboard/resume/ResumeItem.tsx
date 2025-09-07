/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { ResumePreview } from "@/components/dashboard/resume/resumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { deleteResume } from "@/lib/api/resume/resume.new";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Printer, Trash2, Clock, Edit, FileText } from "lucide-react";

interface ResumeItemProps {
  // @ts-expect-ignore
  resume: any;
  onDeleted: (id: string) => void;
}

export default function ResumeItem({ resume, onDeleted }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  const reactToPrintFn = useReactToPrint({
    // @ts-expect-error - react-to-print types don't match current API
    contentRef: componentRef,
    removeAfterPrint: true,
    documentTitle: `${resume.title || "Resume"}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }

      @media print {
        html, body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        button, .no-print {
          display: none !important;
        }

        .print-container {
          box-shadow: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 210mm !important;
          min-height: 297mm !important;
        }

        p, span, li {
          color: #222 !important;
        }

        .skill-badge {
          background-color: #f3f4f6 !important;
          color: #111 !important;
        }

        .section-divider {
          border-color: #e5e7eb !important;
        }
        
        .header-section span,.header-section p {
          color: #fff !important;
        }
      }
    `,
  });

 

 return (
    <>
      <div className="group relative">
        <Link href={`/dashboard/resume/editor?resumeId=${resume.id}`}>
          <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Resume Preview Container */}
            <div className="relative h-[280px] overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
              <div className="absolute inset-0 p-4 hover:blur-2xl">
                <div className="transform scale-[0.35] sm:scale-[0.4] origin-top-left w-[285%] sm:w-[250%]">
                  <ResumePreview
                    resumeData={mapToResumeValues(resume)}
                    contentRef={contentRef}
                    className="shadow-none"
                  />
                </div>
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-900 dark:via-gray-900/90" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#2F786F]/0 group-hover:bg-[#2F786F]/5 transition-colors duration-300" />
            </div>

            {/* Resume Info */}
            <div className="p-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base">
                    {resume.title || "Untitled Resume"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {wasUpdated ? "Updated" : "Created"} {format(new Date(resume.updatedAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-[#2F786F]/10 text-[#2F786F] dark:bg-[#2F786F]/20 dark:text-[#3A8B82] border-0 text-xs"
                >
                  <FileText className="h-3 w-3 mr-1" />
                  PDF
                </Badge>
              </div>

              {/* Action Buttons - Mobile Friendly */}
              <div className="flex items-center gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs sm:text-sm border-[#2F786F]/20 text-[#2F786F] hover:bg-[#2F786F]/5 hover:border-[#2F786F]/30 cursor-pointer"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.preventDefault();
                    reactToPrintFn();
                  }}
                  className="flex-1 text-xs sm:text-sm border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <Printer className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                  Print
                </Button>
              </div>
              <div className="w-full">
                <button 
                  className="w-full flex items-center justify-center text-xs sm:text-sm text-red-600 border border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900 rounded-md px-2 py-1 sm:py-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteConfirmation(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Add the DeleteConfirmationDialog here */}
      <DeleteConfirmationDialog
        resumeId={resume.id}
        open={deleteConfirmation}
        onOpenChange={setDeleteConfirmation}
        onDeleted={onDeleted}
      />
    </>
  );
}

{/* Delete Dialog */}
interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted:(id:string)=>void
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
  onDeleted
}: DeleteConfirmationDialogProps) {
  const { user, isLoaded } = useUser();
  const clerkId = isLoaded ? user?.id : null;

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    if (!clerkId) return;

    startTransition(async () => {
      try {
        
        await deleteResume(clerkId, resumeId);
        toast.success("Resume deleted successfully");
        onDeleted(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong, please try again later");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}