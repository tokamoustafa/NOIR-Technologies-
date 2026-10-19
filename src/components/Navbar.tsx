import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.services, id: 'services' },
    { label: t.nav.whyNoir, id: 'difference' },
    { label: t.nav.projects, id: 'projects' },
    { label: t.nav.process, id: 'process' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.contact, id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#221214] shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3.5 group text-left rtl:text-right focus:outline-none cursor-pointer"
        >
          {/* Bear emblem SVG */}
          <div className="relative w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#450000] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#FF1E2D] group-hover:shadow-[0_0_15px_rgba(255,30,45,0.4)] shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-[#FF1E2D] transition-transform duration-300 group-hover:scale-110"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3c-4 0-7 2.5-7 6 0 1.5.5 3 1.5 4.2L5 19l4-1.5c1 .5 2 1 3 1s2-.5 3-1.5L19 19l-1.5-5.8C18.5 12 19 10.5 19 9c0-3.5-3-6-7-6z" />
              <circle cx="9.5" cy="9.5" r="1.2" fill="#FF1E2D" />
              <circle cx="14.5" cy="9.5" r="1.2" fill="#FF1E2D" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/20 to-transparent pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold tracking-wider text-xl text-[#F5F5F5] group-hover:text-white transition-colors">
                NOIR
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#FF1E2D] uppercase font-bold border border-[#8B0000]/40 px-1.5 py-0.5 rounded bg-[#450000]/20">
                TECH
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#858585] block">
              {t.nav.tagline}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0A0A0A]/80 border border-[#221214] px-4 py-1.5 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 rounded-full cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#450000]/60 border border-[#FF1E2D]/50 shadow-[0_0_12px_rgba(255,30,45,0.3)]'
                    : 'text-[#858585] hover:text-[#F5F5F5] hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Language Switcher & Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center bg-[#0A0A0A] border border-[#221214] p-1 rounded-lg">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#450000] text-white border border-[#FF1E2D]/40 shadow-[0_0_8px_rgba(255,30,45,0.3)]'
                  : 'text-[#858585] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 text-[11px] font-arabic font-bold rounded transition-colors cursor-pointer ${
                language === 'ar'
                  ? 'bg-[#450000] text-white border border-[#FF1E2D]/40 shadow-[0_0_8px_rgba(255,30,45,0.3)]'
                  : 'text-[#858585] hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#858585]">
            <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping" />
            <span className="text-[#B5B5B5]">{t.nav.systemStatus}</span>
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-[#FF1E2D] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#8B0000] hover:shadow-[0_0_20px_rgba(255,30,45,0.5)] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.nav.letsBuild}</span>
            <ArrowUpRight
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
              } group-hover:-translate-y-0.5`}
            />
          </button>
        </div>

        {/* Mobile menu and Language Toggle trigger */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Quick mobile language toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="px-2.5 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#221214] text-[11px] font-mono text-white flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-[#FF1E2D]" />
            <span>{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0A0A0A] border border-[#221214] text-[#F5F5F5] hover:text-[#FF1E2D] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 border-b border-[#450000]/50 backdrop-blur-xl px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left rtl:text-right px-4 py-3 rounded-lg text-sm font-mono uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'text-white bg-[#450000]/50 border border-[#FF1E2D]/40'
                    : 'text-[#858585] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#221214] mt-2 flex flex-col gap-3">
              <div className="flex items-center justify-between px-2 py-1 text-xs font-mono text-[#858585]">
                <span>LANGUAGE / اللغة:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded text-xs ${
                      language === 'en' ? 'bg-[#FF1E2D] text-white font-bold' : 'text-[#858585]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`px-3 py-1 rounded text-xs font-arabic ${
                      language === 'ar' ? 'bg-[#FF1E2D] text-white font-bold' : 'text-[#858585]'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3 rounded-lg bg-[#FF1E2D] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,30,45,0.4)]"
              >
                <span>{t.nav.letsBuild}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
