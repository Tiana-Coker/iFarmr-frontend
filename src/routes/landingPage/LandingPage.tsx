import React from 'react';

// import Hero from '../../components/landingPage/hero/Hero';
import Hero from '../../components/landingPage/hero/Hero';
import Navbar from '../../components/landingPage/navbar/Navbar';
import About from '../../components/landingPage/about/About';
import Features from '../../components/landingPage/features/Features';
// import Testimonials from '../../components/landingPage/testimonials/Testimonials';
import Insights from '../../components/landingPage/insights/Insights';
import Footer from '../../components/landingPage/footer/Footer';

export default function LandingPage() {
  return (
    <div className='bg-[#F0F0F0]'>
        <header className='' >
            <Navbar />
            <Hero />
        </header>
        <About />
        <Features />
        {/* <Testimonials /> */}
        <Insights />
        <Footer />
    </div>
  )
}
