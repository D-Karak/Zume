import { useForm } from 'react-hook-form';
import { GenerateInfo, generateInfoScema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form,FormField, FormItem, FormLabel, FormControl, FormDescription} from '@/components/ui/form';
import { EditorFormProps } from '@/lib/type';
const GeneralInfoForm = ({resumeData,setResumeData}:EditorFormProps) => {
  const form = useForm<GenerateInfo>({
    resolver: zodResolver(generateInfoScema),
    defaultValues:{
      title: resumeData.title || '',
      description:resumeData.description || ''
    }
  })
  return (
    <div className='max-w-xl max-auto space-y-6'>
      <div className='space-y-1.5 text-center'>
        <h2 className='text-2xl font-semibold'>General info</h2>
        <p className='text-sm text-muted-foreground'>
          This information will be used to generate your resume. You can edit it later.
        </p>
      </div>
      <Form {...form}>
        <form className='space-y-3'>
          <FormField 
              control={form.control}
              name='title'
              render={({field})=>(
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <input {...field} placeholder='My cool resume' autoFocus/>
                  </FormControl>
                </FormItem>
              )}/>
          <FormField 
              control={form.control}
              name='description'
              render={({field})=>(
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <input {...field} placeholder='A resume for my next job' autoFocus/>
                  </FormControl>
                  <FormDescription>
                    Describe what this resume is about.
                  </FormDescription>
                </FormItem>
              )}/>
        </form>
      </Form>
    </div>
)
}
export default GeneralInfoForm