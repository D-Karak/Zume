import GeneralInfoForm from "@/components/dashboard/resume/forms/GeneralInfoForm";
import PersonalInfoForm from "@/components/dashboard/resume/forms/PersonalInfroForm";
import WorkExperienceForm from "@/components/dashboard/resume/forms/WorkExperienceForm";
import EducationForm from "@/components/dashboard/resume/forms/EducationForm";
import SkillsForm from "@/components/dashboard/resume/forms/SkillsForm";
import { EditorFormProps } from "@/lib/type";
import { ResumePreview } from "@/components/dashboard/resume/resumePreview";
export const steps:{
    title: string;  
    component: React.ComponentType<EditorFormProps>;
    key: string;
}[]=[
    {title: 'General Info', component: GeneralInfoForm, key: 'general-info'},
    {title: 'Personal Info', component: PersonalInfoForm, key: 'personal-info'},
    {title: 'Work Experience', component: WorkExperienceForm, key: 'work-experience'},
    {title: 'Education', component: EducationForm, key: 'education'},
    {title: 'Skills', component: SkillsForm, key: 'skills'}
]