import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CinematicIntro } from './components/CinematicIntro';
import { CinematicBackground } from './components/CinematicBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { DifferenceSection } from './components/DifferenceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { BrandStorySection } from './components/BrandStorySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

function NoirMain({ onReplayIntro }: { onReplayIntro: () => void }) {
  const { isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>('Software Development');

  // Track active section during scroll
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'difference', 'projects', 'process', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForInquiry(serviceName);
    scrollToSection('contact');
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#FF1E2D]/40 selection:text-white"
    >
      {/* Full-screen cinematic animated background featuring the mysterious bear mascot */}
      <CinematicBackground />

      {/* Fixed top navigation bar */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Cinematic Hero Section with the Mysterious Bear Mascot */}
        <HeroSection onNavigate={scrollToSection} />

        {/* 2. Services: What We Build */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 3. The NOIR Difference: Built Different. Built to Last */}
        <DifferenceSection />

        {/* 4. Projects & Portfolio: Concept Lab Showcase */}
        <ProjectsSection onStartInquiry={(projName) => handleSelectService(projName)} />

        {/* 5. How We Work: 4-Step Engineering Lifecycle */}
        <ProcessSection />

        {/* 6. Advertising-Style Brand Story: Climax with Bear */}
        <BrandStorySection onStartInquiry={() => scrollToSection('contact')} />

        {/* 7. About NOIR & Live AI Architectural Consultant */}
        <AboutSection />

        {/* 8. Contact & Project Inquiry Desk */}
        <ContactSection initialProjectType={selectedServiceForInquiry} />
      </main>

      {/* Footer with Replay Intro & Closing Eyes */}
      <Footer onNavigate={scrollToSection} onReplayIntro={onReplayIntro} />
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('noir_intro_viewed');
    }
    return true;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('noir_intro_viewed', 'true');
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <LanguageProvider>
      {showIntro ? (
        <CinematicIntro onComplete={handleIntroComplete} />
      ) : (
        <NoirMain onReplayIntro={handleReplayIntro} />
      )}
    </LanguageProvider>
  );
}
