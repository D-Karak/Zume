import { useForm, FormProvider } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ResumeValues } from "@/lib/validation";
import { EditorFormProps } from "@/lib/type";
import { useEffect } from "react";

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


  return (
    <FormProvider {...form}>
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Skills</h2>
          <p className="text-sm text-muted-foreground">
            Add your skills, separated by commas (e.g., JavaScript, React, Node.js)
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            {...form.register("skills")}
            placeholder="Enter your skills, separated by commas (e.g., JavaScript, React, Node.js, Python, AWS)"
            className="min-h-[100px]"
          />
        </div>
      </div>
    </FormProvider>
  );
}