import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeValues } from "@/lib/validation";
import { University } from "lucide-react";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

function formatDateForInput(date?: string | Date | null) {
  if (!date) return "";
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch {
    return "";
  }
}

export function mapToResumeValues(data: any): ResumeValues {
  return {
    id: data?.id || undefined,
    title: data?.title || "",
    description: data?.description || "",
    photo: data?.photoUrl || null,
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    jobTitle: data?.jobTitle || "",
    city: data?.city || "",
    country: data?.country || "",
    email: data?.email || "",
    phone: data?.phone || "",
    summary: data?.summary || "",
    linkedIn: data?.linkedIn || "",
    personalWebsite: data?.personalWebsite || "",
    skills: Array.isArray(data?.skills)
      ? data.skills.join(", ")
      : (typeof data?.skills === 'string' ? data.skills : ""),
    workExperiences: Array.isArray(data?.workExperiences)
      ? data.workExperiences.map((exp: any) => ({
          position: exp?.position || "",
          company: exp?.company || "",
          startDate: formatDateForInput(exp?.startDate),
          endDate: formatDateForInput(exp?.endDate),
          description: exp?.description || "",
        }))
      : [],
    educations: Array.isArray(data?.educations)
      ? data.educations.map((edu: any) => ({
          university: edu?.university || "",
          degree: edu?.degree || "",
          fieldOfStudy: edu?.fieldOfStudy || "",
          startDate: formatDateForInput(edu?.startDate),
          endDate: formatDateForInput(edu?.endDate),
          grade: edu?.grade || "",
          description: edu?.description || "",
        }))
      : [],
  };
}
