import React from 'react';
import { Target, Terminal, Lock, GitBranch, Zap, Users, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';

const principleIcons = [Target, Terminal, Lock, GitBranch, Zap, Users, Cpu];

export const DifferenceSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="difference" className="relative py-28 bg-[#0A0A0A] border-y border-[#221214] overflow-hidden">
      {/* Background Bear Silhouette Watermark that subtly reveals on scroll */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-5 mix-blend-screen filter contrast-200">
        <img
          src="/src/assets/images/noir_bear_portrait_1792407107262.jpg"
          alt="Bear silhouette background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#8B0000]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#150608_1px,transparent_1px),linear-gradient(to_bottom,#150608_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
            <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
            {t.difference.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
            {t.difference.titleMain} <br />
            <span className="text-[#FF1E2D]">{t.difference.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-[#858585] leading-relaxed font-sans">
            {t.difference.intro}
          </p>
        </div>

        {/* Comparison Showcase: Generic Agency vs NOIR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Generic Agency */}
          <div className="rounded-2xl bg-[#050505] border border-[#221214] p-8 opacity-75 text-left rtl:text-right">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]">
              <div>
                <span className="text-xs font-mono text-[#858585] uppercase tracking-wider block">
                  {t.difference.agencySubtitle}
                </span>
                <h3 className="text-lg font-display font-bold text-[#858585]">
                  {t.difference.agencyTitle}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#221214] text-[10px] font-mono text-[#858585] uppercase">
                {t.difference.agencyTag}
              </span>
            </div>

            <ul className="space-y-4 text-xs font-mono text-[#737373]">
              {t.difference.agencyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#858585] font-bold shrink-0">—</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOIR Standard */}
          <div className="rounded-2xl bg-[#110507] border-2 border-[#8B0000] p-8 shadow-[0_0_35px_rgba(139,0,0,0.25)] relative overflow-hidden text-left rtl:text-right">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1E2D]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#450000]">
              <div>
                <span className="text-xs font-mono text-[#FF1E2D] uppercase tracking-wider block font-bold">
                  {t.difference.noirSubtitle}
                </span>
                <h3 className="text-lg font-display font-bold text-white">
                  {t.difference.noirTitle}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#450000] text-[10px] font-mono text-[#FF1E2D] uppercase font-bold border border-[#FF1E2D]/50 shadow-[0_0_10px_rgba(255,30,45,0.3)]">
                {t.difference.noirTag}
              </span>
            </div>

            <ul className="space-y-4 text-xs font-mono text-[#F5F5F5]">
              {t.difference.noirPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#FF1E2D] font-bold shrink-0">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 7 Engineering Principles Grid with Connecting Fine Red Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.difference.principles.map((p, idx) => {
            const Icon = principleIcons[idx] || Target;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="p-6 rounded-xl bg-[#050505] border border-[#221214] hover:border-[#FF1E2D]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,30,45,0.15)] flex flex-col justify-between group text-left rtl:text-right"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#450000] flex items-center justify-center text-[#FF1E2D] group-hover:bg-[#FF1E2D] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#858585] uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-base font-display font-bold text-white mb-2 group-hover:text-[#F5F5F5]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#858585] leading-relaxed mb-4">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1C1214] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#450000] group-hover:text-[#FF1E2D] transition-colors font-bold uppercase">
                    METRIC
                  </span>
                  <span className="text-[#F5F5F5] font-semibold">{p.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
