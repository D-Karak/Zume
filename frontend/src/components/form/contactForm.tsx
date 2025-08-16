// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Award, Eye, Download } from 'lucide-react'
// import { useUser } from "@clerk/nextjs"
// import { updateResume } from "@/lib/api/resume/resume.new"


// // // Define the structure of our resume data
// interface ResumeData {
//   personalInfo: {
//     jobTitle: string
//     fullName: string
//     email: string
//     phone: string
//     country: string
//     state: string
//     city: string
//     linkedinUrl?: string
//     personalSite?: string
//     skills?: string[]
//   }
//   }
// export default function ContactForm() {
//     const { user, isLoaded } = useUser()
//     const [resumeData, setResumeData] = useState<ResumeData>({
//         personalInfo: {
//             jobTitle: '',
//             fullName: '',
//             email: '',
//             phone: '',
//             country: '',
//             state: '',
//             city: '',
//             linkedinUrl: '',
//             personalSite: '',
//             skills: []
//         }
//     })
    
//     const [loading, setLoading] = useState(false)
//     const [progress, setProgress] = useState(0)
//     const [error, setError] = useState<string | null>(null)

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ResumeData['personalInfo']) => {
//         setResumeData({
//             ...resumeData,
//             personalInfo: {
//                 ...resumeData.personalInfo,
//                 [field]: e.target.value
//             }
//         })
//     }
   


//     const handleSubmit = async () => {
//   setLoading(true)
//   setError(null)

//   try {
//     if (!isLoaded) return // wait for Clerk to load

//     const clerkId = user?.id
//     if (!clerkId) throw new Error("User not authenticated")

//     const response = await updateResume(clerkId, resumeData)
//     console.log("Resume saved successfully:", response)
//     setProgress(100)
//   } catch (err: any) {
//     console.error("Failed to save resume:", err)
//     setError(err.message || "Failed to save resume")
//   } finally {
//     setLoading(false)
//     setProgress(0)
//   }
// }
//     return (
//         <Card>
//             <CardHeader>    
//                 <CardTitle>Contact Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                     <Input
//                         placeholder="Job Title"
//                         value={resumeData.personalInfo.jobTitle}    
//                         onChange={(e) => handleInputChange(e, 'jobTitle')}
                        
//                     />
//                     <Input
//                         placeholder="Full Name"
//                         value={resumeData.personalInfo.fullName}    
//                         onChange={(e) => handleInputChange(e, 'fullName')}
                        
//                     />
//                     <Input
//                         placeholder="Email"
//                         type="email"
//                         value={resumeData.personalInfo.email}

//                         onChange={(e) => handleInputChange(e, 'email')}
                        
//                     />  
//                     <Input
//                         placeholder="Phone"
//                         type="tel"
//                         value={resumeData.personalInfo.phone}   
//                         onChange={(e) => handleInputChange(e, 'phone')}
                        
//                     />  
//                     <Input
//                         placeholder="Country"
//                         value={resumeData.personalInfo.country}
//                         onChange={(e) => handleInputChange(e, 'country')}
                        
//                     />  
//                     <Input
//                         placeholder="State"
//                         value={resumeData.personalInfo.state}
//                         onChange={(e) => handleInputChange(e, 'state')}
                        
//                     />
//                     <Input
//                         placeholder="City"
//                         value={resumeData.personalInfo.city}
//                         onChange={(e) => handleInputChange(e, 'city')}
                        
//                     />
//                     <Input
//                         placeholder="LinkedIn URL"
//                         value={resumeData.personalInfo.linkedinUrl || ''}
//                         onChange={(e) => handleInputChange(e, 'linkedinUrl')}
                        
//                     />
//                     <Input  
//                         placeholder="Personal Website"
//                         value={resumeData.personalInfo.personalSite || ''}
//                         onChange={(e) => handleInputChange(e, 'personalSite')}
                        
//                     />
//                     <Input
//                         placeholder="Skills (comma separated)"
//                         value={resumeData.personalInfo.skills?.join(', ') || ''}
//                         onChange={(e) => handleInputChange(e, 'skills')}
//                         onBlur={(e) => {
//                             const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
//                             setResumeData({
//                                 ...resumeData,  
//                                 personalInfo: {
//                                     ...resumeData.personalInfo,
//                                     skills: skillsArray
//                                 }
//                             })
//                         }}
//                     />
//                 </div>
//                 <div className="mt-6 flex justify-end space-x-2">
//                     <Button onClick={handleSubmit} disabled={loading}>
//                         {loading ? "Saving..." : "Save Contact Info"}
//                     </Button>
//                     {error && <p className="text-red-500">{error}</p>}
//                     {progress > 0 && <Progress value={progress} />}
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }