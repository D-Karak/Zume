import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GraduationCap, School, Calendar, Award, Sparkles, Info } from "lucide-react";
import { useEffect } from "react";
import { EditorFormProps } from "@/lib/type";
import { ResumeValues, educationSchema } from "@/lib/validation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<ResumeValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      const filteredValues = {
        ...resumeData,
        educations:
          values.educations?.filter(
            (edu): edu is NonNullable<typeof edu> => edu !== undefined
          ) || [],
      } satisfies ResumeValues;
      setResumeData(filteredValues);
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const addNewEducation = () => {
    const currentEducations = form.getValues("educations") || [];
    form.setValue("educations", [
      ...currentEducations,
      {
        university: "",
        degree: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("educations") || [];
    form.setValue(
      "educations",
      currentEducations.filter((_, i) => i !== index)
    );
  };

  const educations = form.watch("educations") || [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Education
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Add your academic qualifications, starting with the most recent
        </p>
        <Badge 
          variant="secondary" 
          className="bg-[#2F786F]/10 text-[#2F786F] border-0"
        >
          Step 4 of 6
        </Badge>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {educations.map((_, index) => (
            <Card 
              key={index} 
              className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-visible"
            >
              {/* Education Number Badge */}
              <div className="absolute -top-3 left-4 z-10">
                <Badge className="bg-[#2F786F] text-white border-0 shadow-md">
                  Education #{index + 1}
                </Badge>
              </div>

              {/* Delete Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="p-6 sm:p-8 pt-8 space-y-5">
                {/* University/School */}
                <FormField
                  control={form.control}
                  name={`educations.${index}.university`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <School className="h-4 w-4 text-[#2F786F]" />
                        School / University
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="e.g., Harvard University"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Degree */}
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-[#2F786F]" />
                        Degree / Qualification
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="e.g., Bachelor of Science in Computer Science"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm flex items-start gap-2 mt-2">
                        <Info className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>Include your major, minor, or specialization if applicable</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`educations.${index}.startDate`}
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
                    name={`educations.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#2F786F]" />
                          End Date
                          <Badge variant="outline" className="text-xs font-normal ml-2">
                            Expected if ongoing
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

                {/* Optional: GPA or Achievements */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-[#2F786F]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Information
                    </span>
                    <Badge variant="outline" className="text-xs">Optional</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    You can add GPA, honors, relevant coursework, or achievements in your resume summary or work experience sections
                  </p>
                </div>
              </div>
            </Card>
          ))}

          {/* Add Education Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-2 border-dashed border-[#2F786F]/30 hover:border-[#2F786F]/50 hover:bg-[#2F786F]/5 transition-all duration-200 group"
            onClick={addNewEducation}
          >
            <Plus className="mr-2 h-5 w-5 text-[#2F786F] group-hover:scale-110 transition-transform" />
            <span className="text-[#2F786F] font-medium">Add Education</span>
          </Button>
        </form>
      </Form>

      {/* Empty State */}
      {educations.length === 0 && (
        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#2F786F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-[#2F786F]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No education added yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add your academic qualifications to showcase your educational background
            </p>
            <Button
              type="button"
              onClick={addNewEducation}
              className="bg-[#2F786F] hover:bg-[#245A53] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Education
            </Button>
          </div>
        </Card>
      )}

      {/* Tips Section */}
      {educations.length > 0 && (
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#2F786F]/5 to-[#245A53]/5 rounded-xl border border-[#2F786F]/20">
          <h4 className="text-sm font-semibold text-[#2F786F] mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Pro Tips
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>List your education in reverse chronological order (most recent first)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>Include relevant certifications or professional development courses</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F786F] mt-0.5">•</span>
              <span>Only include GPA if it's 3.5 or higher and you're a recent graduate</span>
            </li>
          </ul>
        </div>
      )}

  
    </div>
  );
};

export default EducationForm;