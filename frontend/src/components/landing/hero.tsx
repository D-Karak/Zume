import React from 'react'
import { Button } from '../ui/button'
import {SignInButton} from '@clerk/nextjs'
const Hero = () => {
  return (
    <div>
    {/* Hero Section */}
      <main className="flex items-center justify-between px-6 py-12 lg:px-12 lg:py-20">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            The Best Online Resume Builder
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
            Easily create a resume for any job using our best-in-class resume builder platform.
          </p>
        <SignInButton>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-5 text-lg cursor-pointer"
          >
            Create now
          </Button>
          </SignInButton>
        </div>

        {/* Illustration Area */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            {/* Resume mockups */}
            <div className="relative z-10">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 h-96 mb-4 transform rotate-3">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>

              <div className="absolute top-8 -left-8 bg-white rounded-lg shadow-lg p-4 w-48 h-32 transform -rotate-6">
                <div className="w-full h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded triangle-shape"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Person illustration */}
            <div className="absolute bottom-0 right-8 z-20">
              <div className="w-24 h-32 relative">
                {/* Simple person figure */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  {/* Body */}
                  <div className="w-12 h-20 bg-teal-600 rounded-t-full relative">
                    {/* Head */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full"></div>
                    {/* Hair */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gray-800 rounded-t-full"></div>
                    {/* Arms */}
                    <div className="absolute top-2 -left-3 w-6 h-12 bg-teal-600 rounded-full transform rotate-12"></div>
                    <div className="absolute top-2 -right-3 w-6 h-12 bg-teal-600 rounded-full transform -rotate-12"></div>
                  </div>
                  {/* Legs */}
                  <div className="flex justify-center space-x-1">
                    <div className="w-3 h-12 bg-gray-800 rounded-b-full"></div>
                    <div className="w-3 h-12 bg-gray-800 rounded-b-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
  )
}

export default Hero