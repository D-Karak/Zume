import api from "@/lib/api/axiosinstance";

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;
  company: string;
  position: string;
  duration: string;
  description?: string;
  school: string;
  degree: string;
  year: string;
  skills: string[];
}

export const saveResume = async (resumeData: ResumeData, userId: string) => {
  try {
    console.log('Making API request to save resume:', {
      url: '/resumes/create',
      data: { ...resumeData, userId }
    });
    const res = await api.post("/resumes/create", { ...resumeData, userId });
    return res.data;
  } catch (error: any) {
    console.error("Error saving resume:", error.response?.data || error.message);
    throw error;
  }
};
