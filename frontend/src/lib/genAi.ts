import { GoogleGenAI } from "@google/genai";


interface genPropValues{
  fistName:string | undefined;
  lastName:string | undefined;
  jobTitle:string | undefined;
  city:string | undefined;
  country:string | undefined;
}

const ai = new GoogleGenAI({ apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function genarateSummary( {data}: {data:genPropValues} ): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Write one concise, professional and short resume summary for ${data.fistName} ${data.lastName}, a ${data.jobTitle} based in ${data.city}, ${data.country}.`,
  });
  console.log("AI Response:", response);
   return response?.text || "";
}
