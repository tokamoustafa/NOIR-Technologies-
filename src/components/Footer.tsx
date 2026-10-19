import React from 'react';
import { ArrowUp, Terminal, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const { t, language } = useLanguage();
  const [soundEnabled, setSoundEnabled] = React.useState(sound.isEnabled());

  const scrollToTop = () => {
    sound.playCyberClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#221214] pt-20 pb-12 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#FF1E2D]/5 blur-[120px] pointer-events-none" />

      {/* Thin Animated Red Horizon Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1A1A1A]">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#450000] flex items-center justify-center overflow-hidden shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-7 h-7 text-[#FF1E2D]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3c-4 0-7 2.5-7 6 0 1.5.5 3 1.5 4.2L5 19l4-1.5c1 .5 2 1 3 1s2-.5 3-1.5L19 19l-1.5-5.8C18.5 12 19 10.5 19 9c0-3.5-3-6-7-6z" />
                  <circle cx="9.5" cy="9.5" r="1.3" fill="#FF1E2D" />
                  <circle cx="14.5" cy="9.5" r="1.3" fill="#FF1E2D" />
                </svg>
              </div>

              <div>
                <span className="font-display font-black tracking-wider text-2xl text-white">
                  NOIR TECHNOLOGIES
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#858585] block">
                  {t.footer.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#858585] max-w-sm font-sans leading-relaxed">
              {t.footer.desc}
            </p>

            {/* Quick interactive utility buttons (Replay Intro & Audio Toggle) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={toggleSound}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#221214] text-[11px] font-mono text-[#858585] hover:text-white transition-colors cursor-pointer"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#FF1E2D]" />
                    <span>{t.nav.sound}: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#858585]" />
                    <span>{t.nav.sound}: OFF</span>
                  </>
                )}
              </button>

              {onReplayIntro && (
                <button
                  onClick={() => {
                    sound.playCyberClick();
                    onReplayIntro();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#221214] hover:border-[#450000] text-[11px] font-mono text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-[#FF1E2D]" />
                  <span>{t.nav.replayIntro}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#858585]">
              <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping" />
              <span>{t.footer.status}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4 text-left rtl:text-right">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF1E2D] font-bold">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('difference')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.whyNoir}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.process}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#858585] hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-4 space-y-4 text-left rtl:text-right">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF1E2D] font-bold">
              {t.footer.disciplinesTitle}
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#858585]">
              {t.footer.disciplines.map((disc, idx) => (
                <li key={idx}>{disc}</li>
              ))}
            </ul>

            {/* Social Links (Configurable placeholders) */}
            <div className="pt-4 border-t border-[#1C1214]">
              <span className="text-[10px] font-mono text-[#858585] uppercase tracking-wider block mb-2">
                DEVELOPER ECOSYSTEM
              </span>
              <div className="flex items-center gap-3 text-xs font-mono text-[#858585]">
                <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">X // Twitter</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Bear Eyes Closing Detail & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#858585]">
          <div className="text-center sm:text-left rtl:sm:text-right flex items-center gap-3">
            {/* The Bear's Glowing Eyes Signature Closing Detail */}
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#0A0A0A] border border-[#450000] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E2D] shadow-[0_0_8px_#FF1E2D] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E2D] shadow-[0_0_8px_#FF1E2D] animate-pulse" />
            </div>

            <div>
              {t.footer.copyright}
              <span className="block sm:inline sm:ml-2 rtl:sm:mr-2 text-[10px] text-[#555555]">
                {t.footer.disclaimer}
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#221214] hover:border-[#FF1E2D] text-[#858585] hover:text-white transition-colors cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
