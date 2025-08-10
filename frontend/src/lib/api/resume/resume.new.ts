import api from "@/lib/api/axiosinstance";

export interface ResumeFormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  };
  education: {
    school: string;
    degree: string;
    year: string;
  };
  skills: string;
}

export const saveResume = async (data: ResumeFormData, userId: string) => {
  try {
    // Convert nested form data to flat structure
    const resumePayload = {
      ...data.personalInfo,
      ...data.experience,
      ...data.education,
      skills: data.skills.split(',').map(skill => skill.trim())
    };

    console.log('Sending resume data to API:', {
      url: '/resumes/create',
      payload: resumePayload,
      userId
    });

    const response = await api.post('/resumes/create', {
      ...resumePayload,
      userId
    });

    console.log('Resume saved successfully:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to save resume:', {
      status: error.response?.status,
      message: error.response?.data?.error || error.message
    });
    throw new Error(error.response?.data?.error || 'Failed to save resume');
  }
};

export const getUserResume = async(userId: string) => {
  try {
    console.log('Making API request to get user resume:', { 
      url: `/resumes/${userId}`
    });
    const res = await api.get(`/resumes/${userId}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching user resume:", error.response?.data || error.message);
    throw error;
  }
};