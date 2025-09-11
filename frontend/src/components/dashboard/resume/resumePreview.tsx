import Image from "next/image";
import { useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import { useReactToPrint } from "react-to-print";
import { Download, Mail, Phone, Globe, Linkedin, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  preview?: boolean;
}

export function ResumePreview({ resumeData, contentRef, className, preview }: ResumePreviewProps) {
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

  const componentRef = useRef<HTMLDivElement>(null);
   const handlePrint = useReactToPrint({
      // @ts-expect-error - react-to-print types don't match current API

    contentRef: componentRef,
    removeAfterPrint: true,
    documentTitle: `${title || "Resume"}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          forced-color-adjust: exact !important;
        }
        body * {
          visibility: hidden;
        }
        #resume-print-container,
        #resume-print-container * {
          visibility: visible;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        #resume-print-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .header-section {
          background-color: #1f2937 !important;
          color: white !important;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        button, .no-print {
          display: none !important;
        }
        .text-resume-xl { font-size: 18pt !important; }
        .text-resume-lg { font-size: 14pt !important; }
        .text-resume-base { font-size: 12pt !important; }
        .text-resume-sm { font-size: 11pt !important; }
        .text-resume-xs { font-size: 10pt !important; }
      }
    `,
  });

  return (
    <div
      className={cn(
        className ? className : "w-1/2 overflow-y-auto hidden md:block",
        preview ? "w-full block" : "hidden"
      )}
    >
      {/* ✅ Attach ref here */}
      <div
        id="resume-print-container"
        ref={contentRef?contentRef:componentRef}
        className="print-container w-full grow bg-white relative"
      >
        {/* Floating Download Button */}
        <button
          onClick={handlePrint}
          className={cn(
            "top-4 right-4 z-10 bg-teal-600 hover:bg-teal-700 text-white shadow-lg p-3 rounded-full transition-all duration-200 hover:shadow-xl print:hidden no-print",
            "absolute"
          )}
        >
          <Download className="w-5 h-5" />
        </button>
      {/* Header Section */}
     <div className="header-section w-full min-h-[70px] max-h-[25%] bg-gray-800 text-white p-6 flex gap-5 sm:gap-4 justify-center items-center">
  {/* Profile Image */}
  {photo && (
    <div className="rounded-2xl border-[.3vw] border-white/20 w-[clamp(30px,100px,130px)] h-[clamp(30px,100px,130px)] overflow-hidden flex-shrink-0">
      <Image
        src={
          typeof photo === "string"
            ? photo
            : photo instanceof File
            ? URL.createObjectURL(photo)
            : ""
        }
        width={100}
        height={100}
        alt="Profile Photo"
        className="object-cover object-center w-full h-full"
      />
    </div>
  )}

  {/* Right Section (Name + Job + Contact) */}
  <div className="flex flex-col justify-between w-full">
    {/* Name + Job Title */}
    <div>
      <h1 className="text-resume-xl">{firstName} {lastName}</h1>
      <p className="text-resume-lg text-teal-400">{jobTitle}</p>
    </div>

    {/* Contact Info */}
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-resume-sm">
      {(city || country) && (
        <li className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {city}{city && country && ", "}{country}
        </li>
      )}
      {email && (
        <li className="flex items-center gap-2">
          <Mail className="w-6 h-6" />
          {email}
        </li>
      )}
      {phone && (
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {phone}
        </li>
      )}
      {linkedIn && (
        <li className="flex items-center gap-2">
          <Linkedin className="w-4 h-4" />
          {linkedIn}
        </li>
      )}
      {personalWebsite && (
        <li className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {personalWebsite}
        </li>
      )}
    </ul>
  </div>
</div>


      {/* Details Section */}
      <div className="p-8 space-y-6 h-[75%]">
        {/* Professional Summary */}
        {summary && (
          <section>
            <h2 className="text-resume-lg text-slate-800 mb-2">Professional Summary</h2>
            <p className="text-resume-base text-gray-700">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperiences?.length > 0 && (
          <section>
            <h2 className="text-resume-lg text-slate-800 mb-1">Work Experience</h2>
            {workExperiences.map((work, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="text-resume-base font-semibold">{work.position}</h3>
               <div className="flex items-center justify-between mb-1">
                 <p className="text-resume-sm text-teal-600">{work.company}</p>
                <span className="text-resume-xs italic text-gray-500">{work.startDate} - {work.endDate}</span>
               </div>
                <p className="text-resume-base text-gray-700">{work.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <section>
            <h2 className="text-resume-lg text-slate-800 mb-2">Education</h2>
            {educations.map((edu, idx) => (
              <div key={idx} className="mb-3">
                  <h3 className="text-resume-base font-semibold">{edu.degree}</h3>
                <div className="flex items-center justify-between mb-1">
                <p className="text-resume-sm text-teal-600">{edu.university}</p>
                <span className="text-resume-xs italic text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-resume-lg text-slate-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(skills) ? skills : typeof skills === "string" ? (skills as string).split(",") : []).map(
              (skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-resume-sm font-medium"
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

  );
}