import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import ExperienceSection from '@/components/ExperienceSection';
import ToolkitSection from '@/components/ToolkitSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import { getPortfolioData } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const data = getPortfolioData();

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
