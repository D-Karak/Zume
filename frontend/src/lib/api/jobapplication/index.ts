import api from "../axiosinstance";
import { JobFormData } from "@/lib/validation";
// Create
export const createJob = async (clerkId: string, jobData: JobFormData) =>{
  if (!clerkId) {
    throw new Error("User not authenticated");
  }
  try{
    const response= await api.post(`/job/${clerkId}`, jobData);
  // console.log("Job created:", response.data);
  return response.data;
  }
  catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

// Get
export const getJobs = async (clerkId: string) =>{
  if (!clerkId) {
    throw new Error("User not authenticated");
  }
  try{
    const resopnse=await api.get(`/job/${clerkId}`);
    // console.log("Fetched jobs:", resopnse.data);
    return resopnse.data;
  }catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

// Update
export const updateJob = async (clerkId: string, jobId: string, jobData: JobFormData) =>{
  if (!clerkId || !jobId) {
    throw new Error("Clerk ID and Job ID are required");
  }
  try {
    const response=await api.put(`/job/${clerkId}/${jobId}`, jobData);
    // console.log("Job updated:", response.data);
    return response.data;
  }catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}

// Delete
export const deleteJob = async (clerkId: string, jobId: string) =>{
  if (!clerkId || !jobId) {
    throw new Error("Clerk ID and Job ID are required");
  }
  try{
    const response= await api.delete(`/job/${clerkId}/${jobId}`);
    // console.log("Job deleted:", response.data);
    return response.data;
  }catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}
