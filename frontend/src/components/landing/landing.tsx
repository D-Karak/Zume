"use client"
import React from 'react'
import Nav from './nav'
import Hero from './hero'
import About from './about'
import Features from './features'
import Info from './info'
import PricingSection from './pricing-section'
import TestimonialsSection from './testimonials'
import FooterSection from './footer'
const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-300">
      <Nav/>
      <Hero />
      <About/>
      <Features/>
      <Info/>
      <PricingSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  )
}
export default Landing