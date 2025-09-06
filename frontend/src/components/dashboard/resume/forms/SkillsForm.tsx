import { useForm, FormProvider } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeValues } from "@/lib/validation";
import { EditorFormProps } from "@/lib/type";
import { useEffect } from "react";
import { Sparkles, Plus, Tag } from "lucide-react";

export default function SkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<ResumeValues>({
    defaultValues: resumeData,
  });

  useEffect(() => {
    form.reset(resumeData);
  }, [resumeData, form]);

  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const updatedData = {
        ...resumeData,
        skills: values.skills,
      };
      setResumeData(updatedData);
    });

    return () => subscription.unsubscribe();
  }, [form, setResumeData, resumeData]);

  const skills = form.watch("skills");
  
  // Helper function to convert skills to array
  const getSkillsArray = (skills: string | string[] | undefined): string[] => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills.filter(s => s.trim());
    if (typeof skills === 'string') return skills.split(",").filter(s => s.trim());
    return [];
  };

  // Helper function to convert skills to string for textarea
  const getSkillsString = (skills: string | string[] | undefined): string => {
    if (!skills) return '';
    if (Array.isArray(skills)) return skills.join(", ");
    if (typeof skills === 'string') return skills;
    return '';
  };

  const skillsArray = getSkillsArray(skills);
  const skillCount = skillsArray.length;

  return (
    <FormProvider {...form}>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header Section with enhanced styling */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 shadow-sm border border-teal-200/50">
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-teal-400/20 to-teal-600/20 blur-2xl" />
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 shadow-md">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Add your skills, separated by commas (e.g., JavaScript, React, Node.js)
            </p>
          </div>
        </div>

        {/* Skills Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <Tag className="h-4 w-4 text-teal-600/60" />
            </div>
            <Textarea
              {...form.register("skills")}
              value={getSkillsString(skills)}
              onChange={(e) => {
                 // @ts-expect-ignore
                form.setValue("skills", e.target.value);
              }}
              placeholder="Enter your skills, separated by commas (e.g., JavaScript, React, Node.js, Python, AWS)"
              className="min-h-[120px] pl-10 pr-4 py-3 resize-none border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400"
              style={{
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
            {skillCount > 0 && (
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                  {skillCount} skill{skillCount !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Helpful Tips */}
          <div className="flex items-start gap-2 p-4 bg-teal-50/50 rounded-lg border border-teal-200/50">
            <Plus className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-medium text-teal-700">Pro tip</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Include both technical skills and soft skills. Be specific about your proficiency levels when relevant.
              </p>
            </div>
          </div>

          {/* Preview of parsed skills */}
          {skillsArray.length > 0 && (
            <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
              <p className="text-xs font-medium text-gray-600 mb-2">Preview</p>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-teal-700 bg-teal-100 rounded-full border border-teal-200"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}