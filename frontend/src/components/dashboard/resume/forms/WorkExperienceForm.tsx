import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WorkExperienceValues, workExperienceSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { EditorFormProps } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Briefcase, Building2, Calendar, FileText, Sparkles, Info } from 'lucide-react';
import { useEffect } from 'react';
import { AIGenerateButton } from '@/components/ui/aiGenerateButton';
import { generateWorkDescription } from '@/lib/genAi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  
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

  async function genAiDescription(data:dataProp, index:number) {
    try{
      setLoading(true);
      setLoadingIndex(index);
      const genaratedDescription = await generateWorkDescription({data:{
        position: data.position ?? "",
        company: data.company ?? "",
        startDate: data.startDate ?? "",
        endDate: data.endDate ?? "",
        description: data.description ?? "",
      }});
      form.setValue(`workExperiences.${index}.description`, genaratedDescription);
      setResumeData({...resumeData, workExperiences: form.getValues('workExperiences')});
    }
    catch(error){
      console.log("Error generating work description:", error);
    }
    finally{
      setLoading(false);
      setLoadingIndex(null);
    }
  }

  const experiences = form.watch('workExperiences') || [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 ">
      

      <Form {...form}>
        <form className="space-y-4">
          {experiences.map((_, index) => (
            <Card 
              key={index} 
              className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-visible"
            >
              {/* Experience Number Badge */}
              <div className="absolute -top-3 left-4 z-10">
                <Badge className="bg-[#2F786F] text-white border-0 shadow-md">
                  Experience #{index + 1}
                </Badge>
              </div>

              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="p-6 sm:p-8 pt-8 space-y-5">
                {/* Position and Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-[#2F786F]" />
                          Position
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Senior Software Engineer"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-[#2F786F]" />
                          Company
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Tech Company Inc."
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#2F786F]" />
                          Start Date
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`workExperiences.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#2F786F]" />
                          End Date
                          <Badge variant="outline" className="text-xs font-normal ml-2">
                            Leave empty if current
                          </Badge>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field}
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#2F786F]" />
                        Description
                        <Badge variant="outline" className="text-xs font-normal">
                          AI Available
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe your key responsibilities, achievements, and impact..."
                          className="min-h-[120px] resize-none border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm flex items-start gap-2 mt-2">
                        <Info className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>Use action verbs and quantify achievements where possible</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AIGenerateButton
                  loading={loading && loadingIndex === index}
                  onClick={() => genAiDescription(form.getValues(`workExperiences.${index}`), index)}
                  text="Generate Description with AI"
                  
                />
              </div>
            </Card>
          ))}

          {/* Add Experience Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-2 border-dashed border-[#2F786F]/30 hover:border-[#2F786F]/50 hover:bg-[#2F786F]/5 transition-all duration-200 group"
            onClick={addNewExperience}
          >
            <Plus className="mr-2 h-5 w-5 text-[#2F786F] group-hover:scale-110 transition-transform" />
            <span className="text-[#2F786F] font-medium">Add Work Experience</span>
          </Button>
        </form>
      </Form>

      {/* Empty State */}
      {experiences.length === 0 && (
        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#2F786F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-[#2F786F]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No work experience added yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Start building your professional history by adding your work experiences
            </p>
            <Button
              type="button"
              onClick={addNewExperience}
              className="bg-[#2F786F] hover:bg-[#245A53] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Experience
            </Button>
          </div>
        </Card>
      )}

      {/* Tips Section */}
      {experiences.length > 0 && (
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#2F786F]/5 to-[#245A53]/5 rounded-xl border border-[#2F786F]/20">
          <h4 className="text-sm font-semibold text-[#2F786F] mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Pro Tips
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>Start with your most recent position and work backwards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>Use numbers to quantify your achievements (e.g., "Increased sales by 25%")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>Focus on accomplishments rather than just listing duties</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;