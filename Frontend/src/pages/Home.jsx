import React from 'react'
import Hero from '../components/Homepage/Hero.jsx'
import FeaturesSection from '../components/Homepage/Features.jsx'
import FAQSection from '../components/Homepage/FAQ.jsx'
import TestimonialsSection from '../components/Homepage/Testimonials.jsx'
import CTASection from '../components/Homepage/CTA.jsx'

const Home = () => {
  return (
    <div>
      
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}

export default Home
