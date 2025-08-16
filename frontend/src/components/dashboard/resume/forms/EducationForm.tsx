import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { EditorFormProps } from "@/lib/type";
import { ResumeValues, educationSchema } from "@/lib/validation";

const EducationForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<ResumeValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  // Watch for changes and update parent resumeData
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

  // Add a new blank education entry
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

  // Remove an education entry by index
  const removeEducation = (index: number) => {
    const currentEducations = form.getValues("educations") || [];
    form.setValue(
      "educations",
      currentEducations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your academic qualifications, starting with the most recent.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          {form.watch("educations")?.map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border p-4 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>

              <FormField
                control={form.control}
                name={`educations.${index}.university`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School / University</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Harvard University" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Bachelor of Science" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`educations.${index}.startDate`}
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
                  name={`educations.${index}.endDate`}
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

              
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addNewEducation}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </form>
      </Form>

      {(!form.watch("educations") ||
        form.watch("educations")?.length === 0) && (
        <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
          No education added yet. Click the button above to add your first entry.
        </div>
      )}
    </div>
  );
};

export default EducationForm;
