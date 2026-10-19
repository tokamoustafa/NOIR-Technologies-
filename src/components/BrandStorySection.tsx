import React from 'react';
import { ArrowRight, ArrowLeft, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BrandStorySectionProps {
  onStartInquiry: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onStartInquiry }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black py-24">
      {/* Background Wide Bear Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/noir_bear_focus_1792407107496.jpg"
          alt="NOIR Bear emerging from crimson smoke with glowing red eyes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-125"
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[#450000]/20 mix-blend-multiply pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-[#8B0000] text-xs font-mono uppercase tracking-widest text-[#FF1E2D] shadow-[0_0_20px_rgba(255,30,45,0.3)] backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-[#FF1E2D]" />
          <span>{t.brandStory.eyebrow}</span>
        </div>

        {/* Climax Headline */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {t.brandStory.headlineLine1} <br />
          <span className="text-[#FF1E2D] drop-shadow-[0_0_40px_rgba(255,30,45,0.7)]">
            {t.brandStory.headlineLine2}
          </span> <br />
          {t.brandStory.headlineLine3}
        </h2>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-2xl text-[#E5E5E5] font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {t.brandStory.supportingText}
        </p>

        {/* Climax CTA Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onStartInquiry}
            className="group relative overflow-hidden px-10 py-5 rounded-xl bg-[#FF1E2D] hover:bg-[#8B0000] text-white font-mono text-sm sm:text-base font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,30,45,0.8)] active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <span>{t.brandStory.cta}</span>
            {isRTL ? (
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            ) : (
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Subtle Brand Watermark */}
        <div className="pt-8 text-[11px] font-mono tracking-widest text-[#858585] uppercase">
          {t.brandStory.watermark}
        </div>
      </div>
    </section>
  );
};
