import api from "@/lib/api/axiosinstance";
import { resumeSchema, ResumeValues } from "@/lib/validation";



const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export const saveResume = async (values: ResumeValues, clerkId:string|null) => {
  if(clerkId === null) {
    throw new Error("User not authenticated");
  }
  const {id}= values;
  const {
    photo,
    workExperiences,
    educations,
    ...resumeData
  }=resumeSchema.parse(values);
  // console.log(values);
  // Convert photo to base64 if it's a File object
  const base64Photo = photo instanceof File ? await fileToBase64(photo) : undefined;
  if (!clerkId) {
    throw new Error("User not authenticated");
  }
  const response = await api.post('/resume/create', {
    clerkId,
    resumeId:id,
    photo: base64Photo,
    workExperiences,
    educations,
    ...resumeData
  });
  console.log("resumeId",id)
  console.log({workExperiences, educations, photo,...resumeData });
    console.log("User ID:", clerkId);
  
  return response.data;
  }

  export const resumeToEdit = async (resumeId: string, clerkId: string) => {
    console.log(resumeId,clerkId)
    if (!clerkId) {
      throw new Error("User not authenticated");
    }

    try {
      if(resumeId && clerkId){
        const response = await api.get(`/resume/user/${clerkId}/${resumeId}`);
        console.log("Fetched resume data:", response.data);
      return response.data;
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw error;
    }
  };
