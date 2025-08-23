import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WorkExperienceValues, workExperienceSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { EditorFormProps } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import {AIGenerateButton}  from '@/components/ui/aiGenerateButton';
import { generateWorkDescription } from '@/lib/genAi';

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || []
    }
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      const filteredValues = {
        ...values,
        workExperiences: values.workExperiences?.filter((exp): exp is NonNullable<typeof exp> => exp !== undefined) || []
      };
      setResumeData({ ...resumeData, ...filteredValues });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const addNewExperience = () => {
    const currentExperiences = form.getValues('workExperiences') || [];
    form.setValue('workExperiences', [
      ...currentExperiences,
      {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeExperience = (index: number) => {
    const currentExperiences = form.getValues('workExperiences') || [];
    form.setValue('workExperiences', 
      currentExperiences.filter((_, i) => i !== index)
    );
  };
  interface dataProp{
    position?:string;
    company?:string;
    startDate?:string;
    endDate?:string;
    description?:string;
  }

  async function genAiDescription(data:dataProp,index:number) {
    try{
      setLoading(true);
      const genaratedDescription = await generateWorkDescription({data:{
       position: data.position ?? "",
    company: data.company ?? "",
    startDate: data.startDate ?? "",
    endDate: data.endDate ?? "",
    description: data.description ?? "",
      }});
      form.setValue(`workExperiences.${index}.description`,genaratedDescription);
      setResumeData({...resumeData, workExperiences: form.getValues('workExperiences')});
    }
    catch(error){
      console.log("Error generating work description:", error);
    }
    finally{
      setLoading(false);
  }
}

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your professional experience, starting with the most recent position.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {form.watch('workExperiences')?.map((_, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4 relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>

              <FormField
                control={form.control}
                name={`workExperiences.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Software Engineer" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`workExperiences.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Tech Company Inc." />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`workExperiences.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe your key responsibilities and achievements..."
                        className="h-24"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <AIGenerateButton
                loading={loading}
                onClick={() => genAiDescription(form.getValues(`workExperiences.${index}`), index)}
                text={'Generate Description with AI'} />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addNewExperience}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Work Experience
          </Button>
        </form>
      </Form>

      {(!form.watch('workExperiences') || form.watch('workExperiences')?.length === 0) && (
        <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
          No work experience added yet. Click the button above to add your first experience.
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;
