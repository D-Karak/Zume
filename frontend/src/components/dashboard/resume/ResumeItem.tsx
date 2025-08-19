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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Printer, Trash2 } from "lucide-react";

interface ResumeItemProps {
  resume: any;
onDeleted: (id: string) => void;

}

export default function ResumeItem({ resume,onDeleted }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
    pageStyle: `
    @page {
      size: A4;
      margin: 20mm; /* professional margins for printing */
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact; /* keep background colors */
        print-color-adjust: exact;
      }

      /* Hide floating buttons and UI-only elements */
      button, .no-print, .print:hidden {
        display: none !important;
      }

      /* Print container styling */
      .print-container {
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-height: 100vh !important;
        transform: none !important;
      }

      /* Typography adjustments for printing */
      h1, h2, h3, h4, h5, h6 {
        color: #111 !important;
        font-family: "Helvetica Neue", Arial, sans-serif;
      }

      p, span, li {
        color: #222 !important;
        font-family: "Georgia", serif;
        line-height: 1.5;
      }

      /* Keep background badges visible (like skills) */
      .skill-badge {
        background-color: #e5e7eb !important; /* Tailwind gray-200 */
        color: #111 !important;
        -webkit-print-color-adjust: exact;
      }
    }
  `
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border h-[50vh] overflow-hidden">
      <div className="space-y-3">
        <Link
          href={`/dashboard/resume/editor?resumeId=${resume.id}`}  
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="w-full"
          />
          
          
         <div className="flex flex-col  space-y-2 text-left">
           <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {format(new Date(resume.updatedAt), "MMM d, yyyy h:mm a")}
          </p>
         </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>

      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} onDeleted={onDeleted}/>
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
  onDeleted: (id:string)=>void
}

function MoreMenu({ resumeId, onPrintClick,onDeleted }: MoreMenuProps) {
  const { user, isLoaded } = useUser();
  const clerkId = isLoaded ? user?.id : null;

  if (!clerkId) return null;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
        onDeleted={onDeleted}
      />
    </>
  );
}

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
