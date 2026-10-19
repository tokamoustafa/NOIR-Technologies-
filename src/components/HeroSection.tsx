import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Zap, Shield, ChevronDown, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scanBeamActive, setScanBeamActive] = useState(false);

  // Periodic subtle scanning beam effect across the hero
  useEffect(() => {
    const interval = setInterval(() => {
      setScanBeamActive(true);
      setTimeout(() => setScanBeamActive(false), 2400);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-transparent"
    >
      {/* Subtle Local Ambient Accents that complement the master CinematicBackground */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#8B0000]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Cyber Grid Lines Overlay with subtle pulse */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#140507_1px,transparent_1px),linear-gradient(to_bottom,#140507_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Periodic Scanning Beam across entire hero */}
      {scanBeamActive && (
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent shadow-[0_0_20px_#FF1E2D] animate-[hero_scan_2.4s_ease-in-out] pointer-events-none z-20" />
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
        {/* Left Column: Bold Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-7 text-left rtl:text-right">
          {/* Eyebrow & System Identifier Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A] border border-[#450000]/80 shadow-[0_0_15px_rgba(255,30,45,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#F5F5F5]">
                {t.hero.eyebrow}
              </span>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#221214] text-[10px] font-mono text-[#858585] uppercase">
              NOIR SYSTEMS // 001
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl leading-[1.0] tracking-tight uppercase text-white">
              {t.hero.headlineLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-[#858585]">
                {t.hero.headlineLine2}
              </span> <br />
              <span className="relative inline-block text-[#FF1E2D] drop-shadow-[0_0_35px_rgba(255,30,45,0.6)]">
                {t.hero.headlineLine3}
              </span>
            </h1>

            {/* Secondary Tagline */}
            <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#FF1E2D] font-bold pt-1 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#FF1E2D]" />
              <span>{t.hero.secondaryTagline}</span>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#B5B5B5] max-w-xl font-sans font-normal leading-relaxed">
            {t.hero.supportingText}
          </p>

          {/* Technical Status Callout */}
          <div className="inline-flex items-center gap-3 text-[11px] font-mono text-[#858585]">
            <Terminal className="w-3.5 h-3.5 text-[#FF1E2D]" />
            <span>STATUS: BUILDING THE FUTURE</span>
            <span className="text-[#333]">//</span>
            <span>ENGINEERING THE NEXT GENERATION</span>
          </div>

          {/* CTA Button Group with Magnetic Feel and Red Glow Borders */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playCyberClick();
                onNavigate('contact');
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden px-8 py-4 rounded-xl bg-[#FF1E2D] text-white font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#8B0000] hover:shadow-[0_0_35px_rgba(255,30,45,0.6)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>{t.hero.primaryCta}</span>
              {isRTL ? (
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
              ) : (
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <button
              onClick={() => {
                sound.playCyberClick();
                onNavigate('projects');
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative px-8 py-4 rounded-xl bg-[#0A0A0A] hover:bg-[#150a0c] text-[#F5F5F5] hover:text-white border border-[#450000] hover:border-[#FF1E2D]/80 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,0,0,0.35)] flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{t.hero.secondaryCta}</span>
              <div className="absolute -inset-[1px] rounded-xl border border-transparent group-hover:border-[#FF1E2D]/40 transition-colors pointer-events-none" />
            </button>
          </div>

          {/* Key Engineering Pillars Banner */}
          <div className="pt-6 border-t border-[#221214] grid grid-cols-3 gap-4 text-left rtl:text-right">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                {t.hero.stats.stat1Value}
              </div>
              <div className="text-[11px] font-mono text-[#858585] tracking-wider uppercase mt-0.5">
                {t.hero.stats.stat1Label}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-[#FF1E2D] flex items-center gap-1">
                {t.hero.stats.stat2Value}
              </div>
              <div className="text-[11px] font-mono text-[#858585] tracking-wider uppercase mt-0.5">
                {t.hero.stats.stat2Label}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-black text-white">
                {t.hero.stats.stat3Value}
              </div>
              <div className="text-[11px] font-mono text-[#858585] tracking-wider uppercase mt-0.5">
                {t.hero.stats.stat3Label}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Mysterious Bear Mascot Visual */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div
            className="relative w-full max-w-lg lg:max-w-none aspect-[4/4.5] sm:aspect-[4/4] rounded-2xl overflow-hidden border border-[#450000]/60 shadow-[0_0_60px_rgba(139,0,0,0.35)] transition-transform duration-300 ease-out group"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg)`,
            }}
          >
            {/* Holographic HUD Viewfinder Framing the Living Background Bear */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#450000]/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.4)_100%)] pointer-events-none" />

            {/* Central Precision Cyber Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
              <div className="w-24 h-24 rounded-full border border-[#FF1E2D]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#FF1E2D]/40" />
                <div className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FF1E2D]/30 to-transparent" />
                <div className="absolute h-32 w-[1px] bg-gradient-to-b from-transparent via-[#FF1E2D]/30 to-transparent" />
              </div>
            </div>

            {/* Scan Beam on Viewfinder */}
            <div className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent shadow-[0_0_15px_#FF1E2D] animate-[bear_scan_3.5s_ease-in-out_infinite] pointer-events-none" />

            {/* HUD / Telemetry Watermark */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#F5F5F5]/70 pointer-events-none">
              <span className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded border border-[#450000]/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E2D] animate-ping" />
                {t.hero.mascotIdent}
              </span>
              <span className="bg-black/60 px-2 py-1 rounded border border-[#450000]/50 backdrop-blur-sm">
                {t.hero.neuralLink}
              </span>
            </div>

            {/* Cyberpunk Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF1E2D]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF1E2D]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF1E2D]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF1E2D]" />

            {/* Bottom HUD Badge */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0A0A0A]/85 border border-[#8B0000]/60 backdrop-blur-md flex items-center justify-between text-left rtl:text-right">
              <div>
                <div className="text-xs font-display font-bold uppercase tracking-wider text-white">
                  {t.hero.mascotTagline}
                </div>
                <div className="text-[10px] font-mono text-[#858585]">
                  {t.hero.mascotDesc}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#450000]/40 border border-[#FF1E2D]/40 flex items-center justify-center text-[#FF1E2D]">
                <Zap className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator at Bottom */}
      <button
        onClick={() => {
          sound.playCyberClick();
          onNavigate('services');
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] font-mono text-[#858585] hover:text-[#FF1E2D] transition-colors cursor-pointer group"
      >
        <span className="uppercase tracking-widest group-hover:text-white">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#FF1E2D]" />
      </button>

      <style>{`
        @keyframes hero_scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bear_scan {
          0% { top: 5%; opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { top: 95%; opacity: 0.1; }
        }
      `}</style>
    </section>
  );
};
