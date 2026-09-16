'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import ExperienceSection from '@/components/ExperienceSection';
import ToolkitSection from '@/components/ToolkitSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import { initialPortfolioData } from '@/lib/portfolioData';

export default function Home() {
  const [data, setData] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch dynamic portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#f0f2f5] relative">
      {/* Top Navbar Header */}
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection profile={data.profile} />

        {/* Stats Counter Section */}
        <StatsSection stats={data.stats} />

        {/* About Section */}
        <AboutSection about={data.about} />

        {/* Expertise Cards Section */}
        <ExpertiseSection expertise={data.expertise} />

        {/* Career Experience Timeline */}
        <ExperienceSection experiences={data.experiences} />

        {/* Skills & Certifications Toolkit */}
        <ToolkitSection skills={data.skills} credentials={data.credentials} />

        {/* Colleague Recommendations */}
        <TestimonialsSection testimonials={data.testimonials} />

        {/* Direct Contact & Form */}
        <ContactSection contact={data.contact} profile={data.profile} />
      </main>
    </div>
  );
}
