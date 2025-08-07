import React from 'react'
import { Card, CardContent } from '../ui/card'
import { BrainCircuit, BarChart3, Link2, Download } from 'lucide-react'
const Features = () => {
    const features = [
    {
      icon: BrainCircuit,
      title: "AI-Based resume builder",
      description:
        "Get tailored job recommendations and optimize your resume content. Improve your job search with AI-powered suggestions.",
    },
    {
      icon: BarChart3,
      title: "Resume Score & Insights",
      description:
        "Get detailed insights about your resume performance. Improve keywords, and ATS compatibility to boost your chances of landing interviews.",
    },
    {
      icon: Link2,
      title: "Custom URL for Sharing",
      description:
        "Get a personalized web link to share your resume online. Perfect for networking, job applications, and social media profiles.",
    },
    {
      icon: Download,
      title: "Free PDF Download",
      description:
        "Export your resume in multiple formats including PDF, Word, and plain text. Always have your resume ready for any application.",
    },
  ]

  return (
    <section id='features' className="py-16 lg:py-24 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Content Side */}
          <div className="flex-1 lg:max-w-md">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get hired fast with a powerful resume</h2>
            <p className="text-lg text-gray-600">Modern design with Essential Features</p>
          </div>

          {/* Features Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features