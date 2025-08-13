import api from "@/lib/api/axiosinstance";

export interface ResumeData {
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  linkedinUrl?: string;
  personalSite?: string;
  skills: string[];
}

export interface WorkExperience {
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  degree?: string;
  school?: string;
  startDate?: string;
  endDate?: string;
}

export const saveResume = async (
  clerkId: string,
  resumeData: ResumeData | "",
  workExperiences: WorkExperience[] | [],
  educations: Education[] | []
) => {
  try {
    const response = await api.post("/resume/create", {
      clerkId,
      resumeData,
      workExperiences,
      educations,
    });

    console.log("Resume saved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to save resume:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to save resume");
  }
};

export const getUserResumes = async (clerkId: string) => {
  try {
    const res = await api.get(`/resume/user/${clerkId}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching resumes:", error.response?.data || error.message);
    throw error;
  }
};

export const getResumeById = async (clerkId: string, resumeId: string) => {
  try {
    const res = await api.get(`/resume/user/${clerkId}/${resumeId}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching resume:", error.response?.data || error.message);
    throw error;
  }
};

export const updateResume = async (
  resumeId?: string,
  data?:{}
) => {
  try {
    const res = await api.put(`/resume/update/${resumeId}`, {...data});
    return res.data;
  } catch (error: any) {
    console.error("Error updating resume:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteResume = async (resumeId: string) => {
  try {
    const res = await api.delete(`/resume/delete/${resumeId}`);  
    return res.data;
  } catch (error: any) {
    console.error("Error deleting resume:", error.response?.data || error.message);
    throw error;
  }}