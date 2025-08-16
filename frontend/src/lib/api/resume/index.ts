import api from '../axiosinstance';

export interface ResumeData {
  id?: string;
  // Personal Information
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  linkedinUrl: string;
  personalSite: string;
  skills: string[];
  // Work Experience and Education
  workExperience: Array<{
    position: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }>;
  education: Array<{
    degree: string;
    university: string;
    startDate: Date;
    endDate?: Date;
  }>;
}

// Function to create a new resume with initial data
export const createResume = async (clerkId: string, initialData?: Partial<ResumeData>) => {
  try {
    const response = await api.post('/resume/create', { 
      clerkId,
      ...initialData 
    });
    return response.data;
  } catch (error) {
    console.error('Error creating resume:', error);
    throw error;
  }
};

// Function to save or update resume (handles both creation and updates)
export const saveResume = async (data: Partial<ResumeData> & { clerkId: string }) => {
  try {
    // If no resumeId, create new resume
    if (!data.id) {
      return await createResume(data.clerkId, data);
    }
    
    // If resumeId exists, update existing resume
    return await autoSaveResume(data.id, data);
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

// Function to auto-save resume
export const autoSaveResume = async (resumeId: string, data: Partial<ResumeData>) => {
  try {
    const response = await api.patch(`/resume/auto-save/${resumeId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error auto-saving resume:', error);
    throw error;
  }
};

// Function to get a resume by ID
export const getResumeById = async (userId: string, resumeId: string) => {
  try {
    const response = await api.get(`/resume/user/${userId}/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
};

// Function to update resume with debounce support
export const updateResume = async (resumeId: string, data: Partial<ResumeData>) => {
  try {
    const response = await api.patch(`/resume/update/${resumeId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

// Function to add work experience
export const addWorkExperience = async (resumeId: string, data: {
  position: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}) => {
  try {
    const response = await api.post(`/resumes/${resumeId}/work-experience`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding work experience:', error);
    throw error;
  }
};

// Function to add education
export const addEducation = async (resumeId: string, data: {
  degree: string;
  university: string;
  startDate: Date;
  endDate?: Date;
}) => {
  try {
    const response = await api.post(`/resumes/${resumeId}/education`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding education:', error);
    throw error;
  }
};

// Function to get resume by ID
export const getResume = async (resumeId: string) => {
  try {
    const response = await api.get(`/resumes/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
};
