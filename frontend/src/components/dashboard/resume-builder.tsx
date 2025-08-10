"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Award, Eye, Download } from 'lucide-react'
import { useAuth } from "@clerk/nextjs"
import { saveResume } from "@/lib/api/resume/resume"
import { PDFDownloadButton } from "./resume-pdf"

// Define the structure of our resume data
interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: {
    company: string
    position: string
    duration: string
    description: string
  }
  education: {
    school: string
    degree: string
    year: string
  }
  skills: string
}

// Define the structure of form errors
interface FormErrors {
  [key: string]: string
}

interface ResumeBuilderProps {
  onBack: () => void
  editingResume?: any
}

export function ResumeBuilder({ onBack, editingResume }: ResumeBuilderProps) {
  // State management for current step and preview mode
  const [currentStep, setCurrentStep] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Authentication hook to get user ID
  const { userId } = useAuth()

  // Main form data state - initialize with empty values
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: {
      company: "",
      position: "",
      duration: "",
      description: "",
    },
    education: {
      school: "",
      degree: "",
      year: "",
    },
    skills: "",
  })

  // Form validation errors state
  const [errors, setErrors] = useState<FormErrors>({})

  // Define the steps configuration
  const steps = [
    { id: "personal", title: "Personal Info", icon: User },
    { id: "experience", title: "Work Experience", icon: Briefcase },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "skills", title: "Skills", icon: Award },
  ]

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100

  /**
   * Generic input change handler
   * Updates nested form data based on the field name path
   */
  const handleInputChange = (section: keyof ResumeData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' ? {
        ...prev[section],
        [field]: value
      } : value
    }))
    
    // Clear error for this field when user starts typing
    const errorKey = `${section}.${field}`
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  /**
   * Validation functions for different field types
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters and check if we have at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '')
    return digitsOnly.length >= 10
  }

  /**
   * Validate current step before proceeding
   * Returns true if validation passes, false otherwise
   */
  const validateCurrentStep = (): boolean => {
    const newErrors: FormErrors = {}

    switch (currentStep) {
      case 0: // Personal Information
        if (!formData.personalInfo.fullName.trim()) {
          newErrors['personalInfo.fullName'] = 'Full name is required'
        }
        if (!formData.personalInfo.email.trim()) {
          newErrors['personalInfo.email'] = 'Email is required'
        } else if (!validateEmail(formData.personalInfo.email)) {
          newErrors['personalInfo.email'] = 'Invalid email address'
        }
        if (!formData.personalInfo.phone.trim()) {
          newErrors['personalInfo.phone'] = 'Phone number is required'
        } else if (!validatePhone(formData.personalInfo.phone)) {
          newErrors['personalInfo.phone'] = 'Invalid phone number'
        }
        if (!formData.personalInfo.location.trim()) {
          newErrors['personalInfo.location'] = 'Location is required'
        }
        if (formData.personalInfo.summary.trim().length < 50) {
          newErrors['personalInfo.summary'] = 'Summary should be at least 50 characters'
        }
        break

      case 1: // Work Experience
        if (!formData.experience.company.trim()) {
          newErrors['experience.company'] = 'Company name is required'
        }
        if (!formData.experience.position.trim()) {
          newErrors['experience.position'] = 'Position is required'
        }
        if (!formData.experience.duration.trim()) {
          newErrors['experience.duration'] = 'Duration is required'
        }
        if (formData.experience.description.trim().length < 20) {
          newErrors['experience.description'] = 'Description should be at least 20 characters'
        }
        break

      case 2: // Education
        if (!formData.education.school.trim()) {
          newErrors['education.school'] = 'School name is required'
        }
        if (!formData.education.degree.trim()) {
          newErrors['education.degree'] = 'Degree is required'
        }
        if (!formData.education.year.trim()) {
          newErrors['education.year'] = 'Year is required'
        }
        break

      case 3: // Skills
        if (formData.skills.trim().length < 10) {
          newErrors['skills'] = 'Skills are required (at least 10 characters)'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Navigate to the next step
   * Validates current step before proceeding
   */
  const nextStep = () => {
    if (!validateCurrentStep()) {
      return // Don't proceed if validation fails
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowPreview(true)
    }
  }

  /**
   * Navigate to the previous step
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  /**
   * Handle form submission
   * This is now only used for the main form flow, not the preview save
   */
  const handleSubmit = async () => {
    console.log('🟢 Form submitted with data:', formData)
    
    // Validate all steps before submitting
    let hasErrors = false
    for (let i = 0; i < steps.length; i++) {
      const originalStep = currentStep
      setCurrentStep(i)
      if (!validateCurrentStep()) {
        hasErrors = true
      }
      setCurrentStep(originalStep)
    }

    if (hasErrors) {
      alert('Please fix all errors before submitting')
      return
    }

    // Proceed to preview instead of saving directly
    setShowPreview(true)
  }

  /**
   * Render error message for a specific field
   */
  const renderError = (fieldPath: string) => {
    const error = errors[fieldPath]
    return error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null
  }

  /**
   * Handle saving the resume
   */
  const handleSaveResume = async () => {
    console.log('💾 Saving resume...')
    setIsSubmitting(true)
    
    try {
      // Transform the data to match the API format
      const resumePayload = {
        ...formData.personalInfo,
        ...formData.experience,
        ...formData.education,
        skills: formData.skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0),
      }
      
      console.log('Processed resume payload:', resumePayload)

      if (typeof userId === "string") {
        const savedResume = await saveResume(resumePayload, userId)
        console.log('Resume saved successfully:', savedResume)
        alert('Resume saved successfully!')
      } else {
        alert('Please sign in to save your resume.')
      }
    } catch (error: any) {
      console.error('Error saving resume:', error)
      alert('Failed to save resume. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handle downloading the resume as PDF
   */
  const handleDownloadPDF = () => {
    console.log('📄 Downloading PDF...')
    // TODO: Implement PDF generation logic
    alert('PDF download functionality coming soon!')
  }

  /**
   * Render the resume preview
   */
  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Industrial Header with Actions */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              {/* Left Section - Back Button and Title */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
                <div className="h-6 w-px bg-gray-300"></div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Resume Preview</h1>
                  <p className="text-sm text-gray-500">Review and save your resume</p>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleSaveResume}
                  disabled={isSubmitting}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save Resume'}
                </Button>
                <Button
                  variant="default"
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                  asChild
                >
                  <PDFDownloadButton data={formData} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto p-6 space-y-6">

          {/* Resume Document */}
          <div className="bg-white shadow-lg border border-gray-200">
            <div className="p-8 space-y-6 min-h-[800px] max-w-[8.5in] mx-auto">
              
              {/* Header Section with Industrial Design */}
              <div className="border-b-2 border-gray-900 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {formData.personalInfo.fullName || "YOUR NAME"}
                </h1>
                <div className="mt-3 text-gray-600 space-y-1">
                  <div className="flex items-center gap-4 text-sm">
                    <span>{formData.personalInfo.email}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{formData.personalInfo.phone}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{formData.personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              {formData.personalInfo.summary && (
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{formData.personalInfo.summary}</p>
                </div>
              )}

              {/* Work Experience */}
              {(formData.experience.company || formData.experience.position) && (
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{formData.experience.position}</h3>
                          <p className="text-gray-600 font-medium">{formData.experience.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                          {formData.experience.duration}
                        </span>
                      </div>
                      {formData.experience.description && (
                        <p className="text-gray-700 leading-relaxed">{formData.experience.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {(formData.education.school || formData.education.degree) && (
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-300 pb-1">
                    Education
                  </h2>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{formData.education.degree}</h3>
                      <p className="text-gray-600 font-medium">{formData.education.school}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                      {formData.education.year}
                    </span>
                  </div>
                </div>
              )}

              {/* Skills */}
              {formData.skills && (
                <div>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b border-gray-300 pb-1">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.split(",").map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-sm border"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    )
  }

  /**
   * Main form render
   */
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {editingResume ? "Edit Resume" : "Create New Resume"}
          </h1>
          <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.id}
                className={`flex items-center gap-1 ${
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Steps */}
      <div className="space-y-6">
        
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    className={errors['personalInfo.fullName'] ? 'border-red-500' : ''}
                  />
                  {renderError('personalInfo.fullName')}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className={errors['personalInfo.email'] ? 'border-red-500' : ''}
                  />
                  {renderError('personalInfo.email')}
                </div>
              </div>

              {/* Phone and Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    placeholder="(555) 123-4567"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className={errors['personalInfo.phone'] ? 'border-red-500' : ''}
                  />
                  {renderError('personalInfo.phone')}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location *</label>
                  <Input
                    placeholder="City, State"
                    value={formData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    className={errors['personalInfo.location'] ? 'border-red-500' : ''}
                  />
                  {renderError('personalInfo.location')}
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <label className="block text-sm font-medium mb-2">Professional Summary *</label>
                <Textarea
                  placeholder="Brief summary of your professional background... (minimum 50 characters)"
                  rows={4}
                  value={formData.personalInfo.summary}
                  onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                  className={errors['personalInfo.summary'] ? 'border-red-500' : ''}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.personalInfo.summary.length}/50 characters minimum
                </p>
                {renderError('personalInfo.summary')}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Work Experience */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Company and Position Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company *</label>
                  <Input
                    placeholder="Company Name"
                    value={formData.experience.company}
                    onChange={(e) => handleInputChange('experience', 'company', e.target.value)}
                    className={errors['experience.company'] ? 'border-red-500' : ''}
                  />
                  {renderError('experience.company')}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Position *</label>
                  <Input
                    placeholder="Job Title"
                    value={formData.experience.position}
                    onChange={(e) => handleInputChange('experience', 'position', e.target.value)}
                    className={errors['experience.position'] ? 'border-red-500' : ''}
                  />
                  {renderError('experience.position')}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-2">Duration *</label>
                <Input
                  placeholder="Jan 2020 - Present"
                  value={formData.experience.duration}
                  onChange={(e) => handleInputChange('experience', 'duration', e.target.value)}
                  className={errors['experience.duration'] ? 'border-red-500' : ''}
                />
                {renderError('experience.duration')}
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <Textarea
                  placeholder="Describe your responsibilities and achievements... (minimum 20 characters)"
                  rows={4}
                  value={formData.experience.description}
                  onChange={(e) => handleInputChange('experience', 'description', e.target.value)}
                  className={errors['experience.description'] ? 'border-red-500' : ''}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.experience.description.length}/20 characters minimum
                </p>
                {renderError('experience.description')}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Education */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div>
                  <label className="block text-sm font-medium mb-2">School *</label>
                  <Input
                    placeholder="University Name"
                    value={formData.education.school}
                    onChange={(e) => handleInputChange('education', 'school', e.target.value)}
                    className={errors['education.school'] ? 'border-red-500' : ''}
                  />
                  {renderError('education.school')}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Degree *</label>
                  <Input
                    placeholder="Bachelor of Science"
                    value={formData.education.degree}
                    onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                    className={errors['education.degree'] ? 'border-red-500' : ''}
                  />
                  {renderError('education.degree')}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Year *</label>
                  <Input
                    placeholder="2020"
                    value={formData.education.year}
                    onChange={(e) => handleInputChange('education', 'year', e.target.value)}
                    className={errors['education.year'] ? 'border-red-500' : ''}
                  />
                  {renderError('education.year')}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Skills */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium mb-2">Skills (comma-separated) *</label>
                <Textarea
                  placeholder="JavaScript, React, Node.js, Python, SQL..."
                  rows={4}
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', '', e.target.value)}
                  className={errors['skills'] ? 'border-red-500' : ''}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas. Example: JavaScript, React, Node.js
                </p>
                {renderError('skills')}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Preview & Save
                <Eye className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={nextStep}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}