"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Dipankar Karak",
      text: "I have difficulties that I faced when creating a resume, initially was formatting. Another feature that I've actually found myself using more often than I expected was the professional resume reviews.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Sarah Johnson",
      text: "The AI-powered suggestions completely transformed my resume. I landed three interviews within a week of updating it using this platform. The templates are modern and the interface is incredibly user-friendly.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      text: "As someone who struggled with resume formatting, this tool was a game-changer. The drag-and-drop interface made it so easy to create a professional-looking resume in minutes.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Rodriguez",
      text: "The variety of templates and customization options is impressive. I was able to create a resume that truly represents my personal brand and professional experience.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-300 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What our customers says</h2>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-4xl mx-auto relative">
          {/* Customer Avatars - Positioned around the testimonial */}
          <div className="hidden lg:block">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer transition-all duration-300 ${
                  index === currentTestimonial ? "scale-110 border-yellow-400" : "hover:scale-105"
                }`}
                style={{
                  top: index === 0 ? "10%" : index === 1 ? "20%" : index === 2 ? "70%" : "80%",
                  left: index === 0 ? "5%" : index === 1 ? "85%" : index === 2 ? "10%" : "80%",
                }}
                onClick={() => setCurrentTestimonial(index)}
              >
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl mx-4 lg:mx-16">
            <div className="text-center">
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <div>
                  <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-white border-white hover:bg-gray-50 text-teal-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-white border-white hover:bg-gray-50 text-teal-600"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Avatar Navigation */}
          <div className="flex lg:hidden justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
