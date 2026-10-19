import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  Globe,
  Smartphone,
  Layers,
  CloudLightning,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Terminal,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const serviceIcons = [Code2, Cpu, Globe, Smartphone, Layers, CloudLightning];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t, isRTL } = useLanguage();
  const [activeHoverIdx, setActiveHoverIdx] = useState<number>(0);

  return (
    <section id="services" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#450000]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#221214]">
          <div className="space-y-3 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
              <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
              {t.services.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {t.services.titleMain} <span className="text-[#FF1E2D]">{t.services.titleSub}</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left rtl:text-right space-y-1">
            <p className="text-sm font-mono text-[#858585] max-w-md">
              {t.services.intro}
            </p>
            <div className="text-[10px] font-mono text-[#450000] uppercase font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E2D] animate-ping" />
              <span>ACTIVE DISPATCH DESK READY</span>
            </div>
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Row: Two Flagship Featured Services (01 & 02) */}
          {t.services.items.slice(0, 2).map((svc, idx) => {
            const Icon = serviceIcons[idx] || Code2;
            const isHovered = activeHoverIdx === idx;
            return (
              <div
                key={svc.number}
                onMouseEnter={() => {
                  setActiveHoverIdx(idx);
                  sound.playHover();
                }}
                className={`lg:col-span-6 group relative rounded-2xl bg-[#0A0A0A] border p-8 sm:p-10 transition-all duration-500 flex flex-col justify-between text-left rtl:text-right overflow-hidden ${
                  isHovered
                    ? 'border-[#FF1E2D]/70 bg-[#110507] shadow-[0_0_40px_rgba(255,30,45,0.2)]'
                    : 'border-[#221214] hover:border-[#450000]'
                }`}
              >
                {/* Subtle top red glow line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E2D] to-transparent transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Minimal Circuit / Diagram Watermark in background */}
                <div className="absolute top-4 right-4 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                  <Terminal className="w-32 h-32 text-[#FF1E2D]" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#FF1E2D]">
                        {svc.number}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#221214] text-[10px] font-mono text-[#858585] uppercase">
                        FLAGSHIP ENGINE
                      </span>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#050505] border border-[#450000] flex items-center justify-center text-[#FF1E2D] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,30,45,0.4)] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-mono text-[#FF1E2D] uppercase tracking-wider mb-1 font-bold">
                      {svc.subtitle}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white group-hover:text-[#F5F5F5]">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#858585] group-hover:text-[#B5B5B5] leading-relaxed mb-8 transition-colors">
                    {svc.description}
                  </p>

                  {/* Deliverables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 pt-4 border-t border-[#1C1214]">
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-mono text-[#B5B5B5]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1E2D] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.tech.map((techTag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#050505] border border-[#221214] text-[#858585] group-hover:border-[#450000] group-hover:text-white"
                      >
                        {techTag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      sound.playCyberClick();
                      onSelectService(svc.title);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#FF1E2D] hover:bg-[#8B0000] text-xs font-mono font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,30,45,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.services.initScope}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Bottom Row: 4 Specialized Disciplines (03, 04, 05, 06) in cohesive grid tiles */}
          {t.services.items.slice(2, 6).map((svc, sIdx) => {
            const actualIdx = sIdx + 2;
            const Icon = serviceIcons[actualIdx] || Code2;
            const isHovered = activeHoverIdx === actualIdx;
            return (
              <div
                key={svc.number}
                onMouseEnter={() => {
                  setActiveHoverIdx(actualIdx);
                  sound.playHover();
                }}
                className={`lg:col-span-3 group relative rounded-2xl bg-[#0A0A0A] border p-6 transition-all duration-300 flex flex-col justify-between text-left rtl:text-right ${
                  isHovered
                    ? 'border-[#FF1E2D]/60 bg-[#0F0607] shadow-[0_0_25px_rgba(255,30,45,0.15)]'
                    : 'border-[#221214] hover:border-[#450000]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xl font-bold text-[#8B0000] group-hover:text-[#FF1E2D] transition-colors">
                      {svc.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#050505] border border-[#221214] group-hover:border-[#450000] flex items-center justify-center text-[#B5B5B5] group-hover:text-[#FF1E2D] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="text-[10px] font-mono text-[#858585] uppercase tracking-wider">
                      {svc.subtitle}
                    </div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[#F5F5F5] mt-0.5">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#858585] group-hover:text-[#B5B5B5] leading-relaxed mb-4 transition-colors line-clamp-3">
                    {svc.description}
                  </p>

                  <div className="space-y-1.5 mb-6 pt-3 border-t border-[#1C1214]">
                    {svc.deliverables.slice(0, 3).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 text-[11px] font-mono text-[#858585]">
                        <span className="w-1 h-1 rounded-full bg-[#FF1E2D]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      sound.playCyberClick();
                      onSelectService(svc.title);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#050505] border border-[#221214] group-hover:border-[#FF1E2D] group-hover:bg-[#FF1E2D] text-[11px] font-mono font-bold uppercase tracking-wider text-[#B5B5B5] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.services.initScope}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
