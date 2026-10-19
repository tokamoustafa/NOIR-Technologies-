import React, { useState, useEffect } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const { language, isRTL } = useLanguage();
  const [phase, setPhase] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.isEnabled());

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Step sequence timing:
    // Phase 1 (0ms): Pitch black, faint atmospheric red glow
    // Phase 2 (700ms): Glowing red eyes emerge
    // Phase 3 (1400ms): Red scanning beam sweeps across bear silhouette
    // Phase 4 (2100ms): Logo glitched reveal + headline assembly
    // Phase 5 (3000ms): Fade out intro to hero
    const t1 = setTimeout(() => {
      setPhase(2);
      sound.playHover();
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(3);
      sound.playBeam();
    }, 1400);

    const t3 = setTimeout(() => {
      setPhase(4);
      sound.playCyberClick();
    }, 2100);

    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sound.playCyberClick();
    sessionStorage.setItem('noir_intro_viewed', 'true');
    onComplete();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background Red Ambient Glow */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.35)_0%,rgba(5,5,5,0.95)_70%)] transition-opacity duration-1000 ${
          phase >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#160608_1px,transparent_1px),linear-gradient(to_bottom,#160608_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto px-6 text-center">
        {/* The Bear Silhouette with Eyes & Scanning Beam */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-6 flex items-center justify-center">
          {/* Bear Image with Dynamic Lighting Reveal */}
          <div
            className={`relative w-full h-full rounded-2xl overflow-hidden border border-[#450000]/60 transition-all duration-1000 ${
              phase >= 3
                ? 'opacity-90 scale-100 shadow-[0_0_50px_rgba(255,30,45,0.4)]'
                : phase >= 2
                ? 'opacity-30 scale-95'
                : 'opacity-0 scale-90'
            }`}
          >
            <img
              src="/src/assets/images/noir_bear_hero_1792407106900.jpg"
              alt="NOIR Bear Mascot reveal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#450000]/30" />
          </div>

          {/* Glowing Crimson Eyes Overlay Effect */}
          <div
            className={`absolute pointer-events-none transition-all duration-700 ${
              phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ top: '48%', transform: 'translateY(-50%)' }}
          >
            <div className="flex items-center gap-10">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF1E2D] shadow-[0_0_20px_#FF1E2D,0_0_35px_#FF1E2D] animate-pulse" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF1E2D] shadow-[0_0_20px_#FF1E2D,0_0_35px_#FF1E2D] animate-pulse" />
            </div>
          </div>

          {/* Red Horizontal Scanning Beam */}
          {phase === 3 && (
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent shadow-[0_0_15px_#FF1E2D] animate-[scan_1.2s_ease-in-out_infinite] pointer-events-none" />
          )}
        </div>

        {/* Phase 4: Logo Glitch & Headline Assembly */}
        <div
          className={`space-y-3 transition-all duration-700 ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#FF1E2D] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping" />
            <span>NOIR TECHNOLOGIES // INITIATING CODING ENGINE</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-white">
            {language === 'ar' ? (
              <span>نحن لا نتبع المستقبل. <span className="text-[#FF1E2D]">بل نصنعه.</span></span>
            ) : (
              <span>WE DON'T FOLLOW THE FUTURE. <span className="text-[#FF1E2D]">WE BUILD IT.</span></span>
            )}
          </h1>
        </div>
      </div>

      {/* Control Buttons (Skip & Audio Toggle) */}
      <div className="absolute bottom-8 inset-x-0 px-8 flex items-center justify-between z-20 text-xs font-mono">
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#221214] text-[#858585] hover:text-white transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-[#FF1E2D]" />
              <span>SOUND: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#858585]" />
              <span>SOUND: OFF</span>
            </>
          )}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A0A0A] border border-[#450000] text-white hover:border-[#FF1E2D] hover:bg-[#450000]/40 transition-all cursor-pointer font-bold tracking-wider"
        >
          <span>{language === 'ar' ? 'تخطي المقدمة' : 'SKIP INTRO'}</span>
          <FastForward className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Custom keyframes for scanning line */}
      <style>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0.2; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};
