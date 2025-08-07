import React from 'react'
import {Card} from '../ui/card'
const About = () => {
   return (
    <section id='about' className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Illustration Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Main Dashboard/Screen */}
              <Card className="bg-white p-6 shadow-lg">
                <div className="bg-gray-100 rounded-t-lg p-3 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-48 bg-gray-50 rounded-lg p-4 flex items-end justify-center space-x-2">
                  <div className="w-8 h-16 bg-teal-400 rounded-t"></div>
                  <div className="w-8 h-24 bg-teal-500 rounded-t"></div>
                  <div className="w-8 h-20 bg-teal-600 rounded-t"></div>
                  <div className="w-8 h-32 bg-teal-500 rounded-t"></div>
                  <div className="w-8 h-28 bg-teal-400 rounded-t"></div>
                  <div className="w-8 h-36 bg-teal-600 rounded-t"></div>
                </div>
              </Card>

              {/* Person 1 - Left side with document */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                <div className="relative">
                  {/* Person figure */}
                  <div className="w-16 h-20 relative">
                    {/* Head */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full"></div>
                    {/* Hair */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded-t-full"></div>
                    {/* Body */}
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-purple-600 rounded-t-full"></div>
                    {/* Arms */}
                    <div className="absolute top-7 left-0 w-4 h-8 bg-purple-600 rounded-full transform rotate-45"></div>
                    <div className="absolute top-7 right-0 w-4 h-8 bg-purple-600 rounded-full transform -rotate-12"></div>
                    {/* Legs */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                      <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                    </div>
                  </div>
                  {/* Document */}
                  <div className="absolute -top-2 -right-4 w-8 h-10 bg-teal-400 rounded transform rotate-12 shadow-md"></div>
                </div>
              </div>

              {/* Person 2 - Center, pointing at screen */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-20 relative">
                  {/* Head */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full"></div>
                  {/* Hair */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded-t-full"></div>
                  {/* Body */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-700 rounded-t-full"></div>
                  {/* Arms - one pointing */}
                  <div className="absolute top-7 left-0 w-4 h-8 bg-gray-700 rounded-full transform rotate-45"></div>
                  <div className="absolute top-6 right-1 w-4 h-6 bg-gray-700 rounded-full transform -rotate-45"></div>
                  {/* Legs */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                    <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                  </div>
                </div>
              </div>

              {/* Person 3 - Right side with tablet */}
              <div className="absolute -right-8 bottom-4">
                <div className="relative">
                  {/* Person figure */}
                  <div className="w-16 h-20 relative">
                    {/* Head */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-100 rounded-full"></div>
                    {/* Hair */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-800 rounded-t-full"></div>
                    {/* Body */}
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-blue-600 rounded-t-full"></div>
                    {/* Arms */}
                    <div className="absolute top-7 left-1 w-4 h-8 bg-blue-600 rounded-full transform rotate-12"></div>
                    <div className="absolute top-7 right-1 w-4 h-8 bg-blue-600 rounded-full transform -rotate-12"></div>
                    {/* Legs */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                      <div className="w-2 h-8 bg-gray-800 rounded-b-full"></div>
                    </div>
                  </div>
                  {/* Tablet/Device */}
                  <div className="absolute top-8 -left-2 w-6 h-8 bg-gray-800 rounded shadow-md">
                    <div className="w-full h-2 bg-teal-400 rounded-t mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Build Your Resume Effortlessly</h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Create a job-winning resume in minutes with 200+ modern templates and AI-powered suggestions. Whether
              you're a recent graduate or seasoned professional, our intuitive builder helps you stand out from the
              crowd. No design skills required - just add your info, customize, and download in multiple formats.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About