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
    contentRef:componentRef,
    removeAfterPrint: true,
    documentTitle: `${title}`||` ${firstName} ${lastName} - Resume`,
    pageStyle: `
    @page {
      size: A4;
      margin: 0.5cm;
    }

    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        overflow: hidden !important;
      }

      body > *:not(.print-container) {
        display: none !important;
      }

      button, .no-print {
        display: none !important;
      }

      .print-container {
        box-shadow: none !important;
        border: none !important;
        margin: 0 auto !important;
        padding: 0 !important;
        max-width: 210mm !important; /* A4 width */
        overflow: hidden !important;
        position: relative !important;
        page-break-after: always;
      }

      p, span, li {
        color: #222 !important;
      }

      .skill-badge {
        background-color: #f3f4f6 !important;
        color: #111 !important;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .section-divider {
        border-color: #e5e7eb !important;
      }

      .header-section {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .header-section span,
      .header-section p {
        color: #fff !important;
      }
    }
  `,
  });

  return (
    <div className={cn(
      className ? className : "w-1/2 md:flex relative overflow-y-auto",
      preview ? "block w-full overflow-y-auto" : "hidden md:block"
    )}>
      {/* Floating Download Button */}
      <button
        onClick={handlePrint}
        className={cn(
          "top-4 right-4 z-10 bg-teal-600 hover:bg-teal-700 text-white shadow-lg p-3 rounded-full transition-all duration-200 hover:shadow-xl",
          contentRef ? "hidden" : "absolute",
        )}
      >
        <Download className="w-5 h-5" />
      </button>

      {/* Replace the existing container divs with these new ones */}
      <div className="flex justify-center items-start w-full py-4">
        <div className="w-[95%] max-w-3xl">
          <div className="relative bg-white shadow-xl rounded-none print:shadow-none sm:aspect-[1/1.4142] h-fit">
            <div ref={contentRef ? contentRef : componentRef} className="print-container absolute inset-0 h-full">
          {/* Header Section - Two Column Layout */}
          <div className="header-section bg-gradient-to-r from-slate-800 to-slate-700 text-white p-[3%] min-h-[70px]">
            <div className="flex items-start gap-[3%]">
              {photo && (
                <div className="relative w-[20%] aspect-square overflow-hidden rounded-lg border-2 border-white/20 flex-shrink-0">
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
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl print:text-2xl font-bold tracking-tight mb-[2%]">
                  {firstName} {lastName}
                </h1>
                <p className="text-lg md:text-xl print:text-lg text-slate-200 mb-[3%]">{jobTitle}</p>
                
                {/* Contact Info Grid */}
                <div className="grid grid-cols-2 gap-[2%] text-sm print:text-sm">
                  {(city || country) && (
                    <div className="flex items-center gap-[2%] text-slate-300">
                      <MapPin className="w-[length:clamp(12px,1.8%,16px)] h-[length:clamp(12px,1.8%,16px)] flex-shrink-0" />
                      <span className="truncate">{city}{city && country && ", "}{country}</span>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center gap-[2%] text-slate-300">
                      <Mail className="w-[min(2vw,1rem)] h-[min(2vw,1rem)] flex-shrink-0" />
                      <span className="truncate">{email}</span>
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center gap-[2%] text-slate-300">
                      <Phone className="w-[min(2vw,1rem)] h-[min(2vw,1rem)] flex-shrink-0" />
                      <span className="truncate">{phone}</span>
                    </div>
                  )}
                  {linkedIn && (
                    <div className="flex items-center gap-[2%] text-slate-300">
                      <Linkedin className="w-[min(2vw,1rem)] h-[min(2vw,1rem)] flex-shrink-0" />
                      <span className="truncate">{linkedIn}</span>
                    </div>
                  )}
                  {personalWebsite && (
                    <div className="flex items-center gap-[2%] text-slate-300">
                      <Globe className="w-[min(2vw,1rem)] h-[min(2vw,1rem)] flex-shrink-0" />
                      <span className="truncate">{personalWebsite}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Update the content section styles */}
          <div className="p-[3%] space-y-[3%]">
            {/* Professional Summary */}
            {summary && (
              <section>
                <h2 className="text-[length:clamp(14px,2.8%,24px)] font-bold text-slate-800 mb-[2%] flex items-center gap-[2%]">
                  <div className="w-1 h-[length:clamp(14px,2.8%,24px)] bg-teal-600 rounded-full" />
                  Professional Summary
                </h2>
                <p className="text-[length:clamp(10px,1.8%,14px)] text-gray-700 leading-relaxed pl-[3%]">{summary}</p>
              </section>
            )}

            {/* Work Experience */}
            {workExperiences && workExperiences.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl print:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 md:h-7 print:h-6 bg-teal-600 rounded-full" />
                  Work Experience
                </h2>
                <div className="space-y-4 pl-6">
                  {workExperiences.map((work, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base md:text-lg print:text-base font-semibold text-slate-800">
                            {work.position}
                          </h3>
                          <p className="text-sm md:text-base print:text-sm text-teal-600 font-medium">{work.company}</p>
                        </div>
                        <span className="text-xs md:text-sm print:text-xs text-gray-500 italic whitespace-nowrap">
                          {work.startDate} - {work.endDate}
                        </span>
                      </div>
                      <p className="text-sm md:text-base print:text-sm text-gray-700 leading-relaxed">{work.description}</p>
                      {idx < workExperiences.length - 1 && (
                        <div className="mt-[3%] border-b border-gray-200 section-divider" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {educations && educations.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl print:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 md:h-7 print:h-6 bg-teal-600 rounded-full" />
                  Education
                </h2>
                <div className="space-y-4 pl-6">
                  {educations.map((edu, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base md:text-lg print:text-base font-semibold text-slate-800">
                            {edu.degree}
                          </h3>
                          <p className="text-sm md:text-base print:text-sm text-teal-600 font-medium">{edu.university}</p>
                        </div>
                        <span className="text-xs md:text-sm print:text-xs text-gray-500 italic whitespace-nowrap">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {idx < educations.length - 1 && (
                        <div className="mt-[2%] border-b border-gray-200 section-divider" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl print:text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 md:h-7 print:h-6 bg-teal-600 rounded-full" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2 pl-6">
                  
                    {(Array.isArray(skills) ? skills : typeof skills === 'string' ? (skills as string).split(",") : []).map(
                    (skill: string, idx: number) => (
                      <span
                      key={idx}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm md:text-base print:text-sm font-medium skill-badge hover:bg-slate-200 transition-colors"
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
    </div>
    </div>
    </div>
  );
}