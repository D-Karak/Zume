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
  // Work Experience and Education will be handled separately
}

// Function to create an empty resume and get its ID
export const createEmptyResume = async (clerkId: string) => {
  try {
    const response = await api.post('/resume/create', { clerkId });
    return response.data;
  } catch (error) {
    console.error('Error creating empty resume:', error);
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
