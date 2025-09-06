import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { GenerateInfo, generateInfoScema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EditorFormProps } from '@/lib/type';
import { useUser } from '@clerk/nextjs';
import {  
  Sparkles, 
  Info,
  PenTool,
  FileSignature
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const { user } = useUser();

  const form = useForm<GenerateInfo>({
    resolver: zodResolver(generateInfoScema),
    defaultValues: {
      title: resumeData.title || '',
      description: resumeData.description || ''
    }
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className='w-full max-w-2xl mx-auto space-y-6'>

      {/* Form Card */}
      <Card className='border-0 shadow-xl bg-white dark:bg-gray-900'>
        <div className='p-6 sm:p-8'>
          <Form {...form}>
            <form className='space-y-6'>
              {/* Title Field */}
              <FormField 
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 text-base font-medium'>
                      <FileSignature className='h-4 w-4 text-[#2F786F]' />
                      Resume Title
                      <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input 
                          {...field} 
                          placeholder='e.g., Senior Frontend Developer Resume'
                          className='h-12 pl-4 pr-4 text-base border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20 transition-all duration-200'
                          autoFocus
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                          <span className='text-xs text-gray-400'>
                            {field.value?.length}/100
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className='text-xs sm:text-sm flex items-start gap-2 mt-2'>
                      <Info className='h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0' />
                      <span>Give your resume a memorable title to easily identify it later</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField 
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 text-base font-medium'>
                      <PenTool className='h-4 w-4 text-[#2F786F]' />
                      Description
                      <Badge variant="outline" className='text-xs font-normal'>
                        Optional
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder='e.g., Tailored for tech companies focusing on React and TypeScript expertise'
                        className='min-h-[100px] resize-none text-base border-gray-200 focus:border-[#2F786F] focus:ring-2 focus:ring-[#2F786F]/20 transition-all duration-200'
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription className='text-xs sm:text-sm flex items-start gap-2 mt-2'>
                      <Info className='h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0' />
                      <span>Add notes about the purpose or target job for this resume</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tips Section */}
              <div className='mt-8 p-4 sm:p-5 bg-gradient-to-r from-[#2F786F]/5 to-[#245A53]/5 rounded-xl border border-[#2F786F]/20'>
                <h4 className='text-sm font-semibold text-[#2F786F] mb-3 flex items-center gap-2'>
                  <Sparkles className='h-4 w-4' />
                  Pro Tips
                </h4>
                <ul className='space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                  <li className='flex items-start gap-2'>
                    <span className='text-[#2F786F] mt-0.5'>•</span>
                    <span>Use descriptive titles like &quot;Marketing Manager - Tech Industry&quot; for easy identification</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-[#2F786F] mt-0.5'>•</span>
                    <span>Include the target company or role in your description for better organization</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-[#2F786F] mt-0.5'>•</span>
                    <span>You can create multiple versions of your resume for different opportunities</span>
                  </li>
                </ul>
              </div>
            </form>
          </Form>
        </div>
      </Card>


    </div>
  );
};

export default GeneralInfoForm;