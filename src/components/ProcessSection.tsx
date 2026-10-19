import React, { useState } from 'react';
import { Search, Compass, Code, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stepIcons = [Search, Compass, Code, Rocket];

export const ProcessSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-28 bg-[#0A0A0A] border-y border-[#221214] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#450000]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b border-[#221214]">
          <div className="space-y-3 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
              <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
              {t.process.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {t.process.titleMain} <span className="text-[#858585]">{t.process.titleSub}</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#858585] max-w-md text-left rtl:text-right">
            {t.process.intro}
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Layout */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-[#450000] via-[#8B0000] to-[#FF1E2D] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {t.process.steps.map((st, idx) => {
              const Icon = stepIcons[idx] || Search;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={st.step}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-300 border flex flex-col justify-between text-left rtl:text-right ${
                    isSelected
                      ? 'bg-[#110507] border-[#FF1E2D] shadow-[0_0_30px_rgba(255,30,45,0.25)] scale-[1.02]'
                      : 'bg-[#050505] border-[#221214] hover:border-[#450000] hover:bg-[#0A0A0A]'
                  }`}
                >
                  <div>
                    {/* Step Number & Icon Circle */}
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FF1E2D] text-white shadow-[0_0_20px_rgba(255,30,45,0.5)]'
                            : 'bg-[#0A0A0A] text-[#858585] border border-[#221214]'
                        }`}
                      >
                        {st.step}
                      </div>

                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#450000] text-[#FF1E2D]'
                            : 'bg-[#050505] text-[#858585] border border-[#221214]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Name & Subtitle */}
                    <div className="text-[11px] font-mono text-[#FF1E2D] uppercase tracking-wider mb-1">
                      {st.subtitle}
                    </div>
                    <h3 className="text-2xl font-display font-black text-white uppercase mb-3">
                      {st.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-[#F5F5F5] font-semibold mb-3">
                      {st.description}
                    </p>

                    {/* Extended Details */}
                    <p className="text-xs text-[#858585] leading-relaxed mb-6">
                      {st.details}
                    </p>
                  </div>

                  {/* Deliverable Badge */}
                  <div className="pt-4 border-t border-[#1C1214]">
                    <div className="text-[10px] font-mono text-[#450000] uppercase font-bold mb-1">
                      {t.process.keyDeliverable}
                    </div>
                    <div className="text-xs font-mono text-[#B5B5B5]">
                      {st.deliverable}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
