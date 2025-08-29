import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { AIGenerateButton } from "@/components/ui/aiGenerateButton";
import { generateSummary } from "@/lib/genAi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/type";
import { personalInfoSchema, PersonalInfoValues, ResumeValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { 
  User, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Globe, 
  Camera,
  Sparkles,
  Info,
  Upload,
  X,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function PersonalInfoForm({resumeData, setResumeData}: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle:  resumeData.jobTitle || "",
      city:  resumeData.city || "",
      country: resumeData.country || "",
      phone:  resumeData.phone || "",
      email:  resumeData.email || "",
      summary: resumeData.summary || "",
      linkedIn: resumeData.linkedIn || "",
      personalWebsite: resumeData.personalWebsite || "",
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  async function handleGenerateSummary() {
    setLoading(true);
    try {
      const generatedSummary = await generateSummary({data: {
        fistName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
        jobTitle: form.getValues("jobTitle"),
        city: form.getValues("city"),
        country: form.getValues("country"),
      }});
      form.setValue("summary", generatedSummary);
      setResumeData({...resumeData, summary: generatedSummary });
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
     

      {/* Form Card */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-900">
        <div className="p-6 sm:p-8">
          <Form {...form}>
            <form className="space-y-6">
              {/* Photo Upload */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium">
                      <Camera className="h-4 w-4 text-[#2F786F]" />
                      Profile Photo
                      <Badge variant="outline" className="text-xs font-normal">
                        Optional
                      </Badge>
                    </FormLabel>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Photo Preview */}
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden group">
                        {photoPreview ? (
                          <>
                            <Image
                              src={photoPreview}
                              alt="Profile preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-white"
                                onClick={() => {
                                  fieldValues.onChange(null);
                                  setPhotoPreview(null);
                                  if (photoInputRef.current) {
                                    photoInputRef.current.value = "";
                                  }
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-xs">Upload Photo</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Controls */}
                      <div className="flex-1 space-y-2">
                        <FormControl>
                          <Input
                            {...fieldValues}
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              fieldValues.onChange(file);
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPhotoPreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            ref={photoInputRef}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Recommended: Square image, at least 400x400px
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#2F786F]" />
                        First Name
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="John"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#2F786F]" />
                        Last Name
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Doe"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-[#2F786F]" />
                      Job Title
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Senior Software Engineer"
                        className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2F786F]" />
                        City
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="San Francisco"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#2F786F]" />
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="United States"
                          className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-[#2F786F]" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#2F786F]" />
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="tel" 
                            placeholder="+1 (555) 123-4567"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#2F786F]" />
                          Email
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            placeholder="john.doe@example.com"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="linkedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-[#2F786F]" />
                          LinkedIn URL
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="linkedin.com/in/johndoe"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                                    <FormField
                    control={form.control}
                    name="personalWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-[#2F786F]" />
                          Personal Website
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="johndoe.com"
                            className="h-11 border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#2F786F]" />
                        Professional Summary
                        <Badge variant="outline" className="text-xs font-normal">
                          AI Available
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4}
                          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
                          className="resize-none border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20"
                        />
                      </FormControl>
                      <FormDescription className="text-xs sm:text-sm flex items-start gap-2">
                        <Info className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>2-3 sentences highlighting your experience and what you bring to potential employers</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* AI Generate Button */}
                <AIGenerateButton
                  loading={loading}  
                  onClick={handleGenerateSummary} 
                  text="Generate summary with AI"
                />
              </div>

              {/* Tips Section */}
              <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-[#2F786F]/5 to-[#245A53]/5 rounded-xl border border-[#2F786F]/20">
                <h4 className="text-sm font-semibold text-[#2F786F] mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2F786F] mt-0.5">•</span>
                    <span>Use a professional email address (avoid nicknames or numbers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2F786F] mt-0.5">•</span>
                    <span>Include your LinkedIn profile to showcase your professional network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2F786F] mt-0.5">•</span>
                    <span>Keep your summary concise and tailored to your target role</span>
                  </li>
                </ul>
              </div>
            </form>
          </Form>
        </div>
      </Card>

      {/* Progress Indicator */}
      <div className="text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Auto-saving as you type
        </p>
      </div>
    </div>
  );
}