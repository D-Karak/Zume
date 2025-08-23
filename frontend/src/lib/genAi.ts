import { GoogleGenAI } from "@google/genai";


interface genSummaryPropValues{
  fistName:string | undefined;
  lastName:string | undefined;
  jobTitle:string | undefined;
  city:string | undefined;
  country:string | undefined;
}


const ai = new GoogleGenAI({ apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function generateSummary( {data}: {data:genSummaryPropValues} ): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write one concise, professional and short resume summary for ${data.fistName} ${data.lastName}, a ${data.jobTitle} based in ${data.city}, ${data.country}.`,
  });
  console.log("AI Response:", response);
  return response?.text || "";
}

interface genWorkDescPropValues{
  position:string | undefined;
  company:string | undefined;
  startDate:string | undefined;
  endDate:string | undefined;
  description:string | undefined;
}
export async function generateWorkDescription( {data}: {data:genWorkDescPropValues} ): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // contents: `Write one concise, professional and short description for a resume based on the following details:
    // Position: ${data.position}
    // Company: ${data.company}
    // Start Date: ${data.startDate}
    // End Date: ${data.endDate}
    // Current Description: ${data.description}
    
    // The description should use maximum of 35 words`,
    contents: (data.description && data.description.trim() !== "") ?
    `Improve following resume description to be more concise and professional, using minimum of 20 words maximum of 35 words(only one)`:
    `Write one concise, professional description for a resume based on the following details:
      Position: ${data.position}
      Company: ${data.company}
      Start Date: ${data.startDate}
      End Date: ${data.endDate}
    
    // The description should use minimum of 20 words maximum of 35 words`,  
  });
  console.log("AI Response:", response);
   return response?.text || "";
}
