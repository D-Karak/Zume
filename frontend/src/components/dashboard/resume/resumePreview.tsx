import Image from "next/image";
import { useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import { useReactToPrint } from "react-to-print";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export function ResumePreview({ resumeData,contentRef,className }: ResumePreviewProps) {
  const {
    title,
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    email,
    phone,
    linkedIn,
    personalWebsite,
    summary,
    skills,
    workExperiences,
    educations,
  } = resumeData;

  // const containerRef = useRef<HTMLDivElement>(null);
  // const {width, height} = useDimensions(containerRef)
  // Attach ref for printing
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    removeAfterPrint: true,
    documentTitle: `${title || "Resume"}`,
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
  `,
  });

  return (
    <div className={cn(
      className?className:"hidden w-1/2 md:flex relative"
    )}>
      {/* Floating Download Button */}
      <button
        onClick={handlePrint}
        className={cn(
          "top-4 right-4 z-10 bg-white/70 hover:bg-white/90 backdrop-blur-md shadow-md p-3 rounded-full transition ",
          contentRef? "hidden": "absolute",
          
        )}
      >
        <Download className="w-5 h-5 text-gray-800" />
      </button>

      <div
        className=" aspect-[1/1] w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 border overflow-y-auto" 
      >
        <div
        ref={contentRef?contentRef:componentRef}>
        {/* Header Section */}
        <div className="flex items-center gap-6 border-b pb-6">
          {photo && (
            <div className="relative w-28 h-28 overflow-hidden border rounded-2xl">
              <Image
                src={
                  typeof photo === "string"
                    ? photo
                    : photo instanceof File
                    ? URL.createObjectURL(photo)
                    : "/placeholder-profile.jpg"
                }
                alt="Profile Photo"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl  font-bold">
              {firstName} {lastName}
            </h1>
            <p className="text-lg text-gray-600">{jobTitle}</p>
            <p className="text-sm text-gray-500">
              {city}, {country}
            </p>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{phone}</p>
            {(linkedIn || personalWebsite) && (
              <p className="text-sm">
                {linkedIn}
                {linkedIn && personalWebsite && " | "}
                {personalWebsite}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences && workExperiences.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
            {workExperiences.map((work, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-semibold">
                  {work.position} - {work.company}
                </p>
                <p className="text-sm text-gray-500">
                  {work.startDate} - {work.endDate}
                </p>
                <p className="text-gray-700">{work.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {educations && educations?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {educations.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.university}</p>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills && skills.length>0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(skills) ? skills : skills.split(",")).map(
                (skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                )
              )}
            </div>
          </section>
        )}
      </div>
      </div>
    </div>
  );}