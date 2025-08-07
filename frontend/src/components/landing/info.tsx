import React from 'react'


  export function Info() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content Side */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Built for Simplicity</h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our resume builder is designed for everyone—from those just starting their careers to seasoned
              professionals. With a clean interface, guided prompts, and smart suggestions, creating a professional
              resume has never been this simple. No learning curve. Just results.
            </p>
          </div>

          {/* Illustration Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Person with laptop */}
              <div className="relative z-10">
                {/* Laptop/Screen */}
                <div className="w-80 h-48 bg-gray-800 rounded-lg shadow-xl p-4">
                  {/* Screen content */}
                  <div className="w-full h-full bg-gray-900 rounded p-4">
                    {/* Chart/Graph lines */}
                    <div className="relative h-full">
                      <svg className="w-full h-full" viewBox="0 0 300 150">
                        {/* Grid lines */}
                        <defs>
                          <pattern id="grid" width="30" height="15" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 15" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Chart lines */}
                        <path
                          d="M 20 120 Q 80 100 120 80 T 200 60 T 280 40"
                          fill="none"
                          stroke="#14b8a6"
                          strokeWidth="3"
                          className="drop-shadow-sm"
                        />
                        <path
                          d="M 20 100 Q 60 90 100 70 T 180 50 T 280 30"
                          fill="none"
                          stroke="#06d6a0"
                          strokeWidth="2"
                          className="drop-shadow-sm"
                        />
                        <path
                          d="M 20 110 Q 90 95 140 85 T 220 65 T 280 50"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="2"
                          className="drop-shadow-sm"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Person figure */}
                <div className="absolute -bottom-8 -left-16 z-20">
                  <div className="relative">
                    {/* Body */}
                    <div className="w-20 h-24 relative">
                      {/* Head */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full"></div>

                      {/* Hair */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-amber-800 rounded-t-full"></div>

                      {/* Glasses */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 border border-gray-600 rounded-full bg-transparent"></div>

                      {/* Torso */}
                      <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gray-600 rounded-t-full"></div>

                      {/* Arms */}
                      <div className="absolute top-9 left-0 w-5 h-10 bg-gray-600 rounded-full transform rotate-12"></div>
                      <div className="absolute top-9 right-0 w-5 h-10 bg-gray-600 rounded-full transform -rotate-12"></div>

                      {/* Legs (sitting position) */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        <div className="w-3 h-8 bg-blue-800 rounded-full transform rotate-45"></div>
                        <div className="w-3 h-8 bg-blue-800 rounded-full transform -rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-teal-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-8 w-4 h-4 bg-rose-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -left-8 w-3 h-3 bg-orange-400 rounded-full opacity-60 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Info