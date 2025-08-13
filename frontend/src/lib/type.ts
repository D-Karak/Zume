import { ResumeValues } from "./validation";
import PersonalInfoForm from "@/components/dashboard/resume/forms/PersonalInfroForm";

export interface EditorFormProps{
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
}
