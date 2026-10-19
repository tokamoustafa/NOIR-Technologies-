import React, { useState } from 'react';
import { Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AIArchitectResponse {
  architectureOverview: string;
  recommendedTechStack: { layer: string; technology: string; rationale: string }[];
  phaseEstimates: { phase: string; weeks: string; deliverables: string }[];
  keyEngineeringChallenges: string[];
  noirAdvantage: string;
}

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [ideaInput, setIdeaInput] = useState('');
  const [projectType, setProjectType] = useState('AI & Machine Learning');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<AIArchitectResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim() || ideaInput.trim().length < 5) {
      setError(
        language === 'ar'
          ? 'يرجى تقديم 5 أحرف على الأقل لوصف فكرتك أو التحدي التقني.'
          : 'Please provide at least 5 characters describing your idea or technical challenge.'
      );
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: ideaInput,
          projectType,
          targetTimeline: '8-12 weeks',
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || (language === 'ar' ? 'فشل في توليد المخطط التقني.' : 'Failed to generate technical blueprint.')
        );
      }
      setBlueprint(data.blueprint);
    } catch (err: any) {
      setError(err.message || (language === 'ar' ? 'خطأ في النظام. يرجى المحاولة لاحقاً.' : 'System error. Please retry.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="about" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#221214]">
          <div className="space-y-3 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
              <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
              {t.about.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {t.about.titleMain} <span className="text-[#858585]">{t.about.titleSub}</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-[#858585] max-w-md text-left rtl:text-right">
            {t.about.intro}
          </p>
        </div>

        {/* Brand Mission & Portrait Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column: Mission & 4 Pillars */}
          <div className="lg:col-span-7 space-y-8 text-left rtl:text-right">
            {/* The Mission Statement Callout */}
            <div className="p-8 rounded-2xl bg-[#0A0A0A] border-l-4 rtl:border-l-0 rtl:border-r-4 border-l-[#FF1E2D] rtl:border-r-[#FF1E2D] border-y border-r rtl:border-l border-[#221214] shadow-[0_0_30px_rgba(255,30,45,0.1)]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF1E2D] block mb-2 font-bold">
                {t.about.missionEyebrow}
              </span>
              <p className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                {t.about.missionText}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.about.pillars.map((pil, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#0A0A0A] border border-[#221214] space-y-2">
                  <span className="text-xs font-mono text-[#FF1E2D] uppercase font-bold">
                    {pil.step}
                  </span>
                  <h4 className="text-base font-display font-bold text-white">{pil.title}</h4>
                  <p className="text-xs text-[#858585] leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bear Portrait & Mascot Symbolism */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-[#450000] shadow-[0_0_50px_rgba(139,0,0,0.3)] group text-left rtl:text-right">
              <img
                src="/src/assets/images/noir_bear_portrait_1792407107262.jpg"
                alt="NOIR Bear Mascot close-up portrait with glowing neon red eyes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 border border-[#8B0000]/80 backdrop-blur-md">
                <div className="text-xs font-display font-bold uppercase tracking-wider text-white">
                  {t.about.mascotTitle}
                </div>
                <p className="text-[11px] font-mono text-[#B5B5B5] mt-1">
                  {t.about.mascotDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature: AI Architectural Consultation Console */}
        <div className="rounded-2xl bg-[#0A0A0A] border-2 border-[#450000] p-8 sm:p-10 shadow-[0_0_40px_rgba(139,0,0,0.2)]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#110507] border border-[#FF1E2D]/40 text-xs font-mono text-[#FF1E2D] uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.about.aiTitleEyebrow}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white">
              {t.about.aiHeadline}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#858585]">
              {t.about.aiIntro}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerateBlueprint} className="max-w-2xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={ideaInput}
                onChange={(e) => setIdeaInput(e.target.value)}
                placeholder={t.about.aiPlaceholder}
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#050505] border border-[#221214] text-white text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors placeholder:text-[#858585] text-left rtl:text-right"
              />

              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-[#050505] border border-[#221214] text-[#B5B5B5] text-xs font-mono focus:outline-none focus:border-[#FF1E2D] transition-colors text-left rtl:text-right"
              >
                <option value="AI & Machine Learning">
                  {language === 'ar' ? 'الذكاء الاصطناعي وتعلم الآلة' : 'AI & Machine Learning'}
                </option>
                <option value="Software Development">
                  {language === 'ar' ? 'تطوير البرمجيات' : 'Software Development'}
                </option>
                <option value="Web Platform">
                  {language === 'ar' ? 'منصات الويب المتطورة' : 'Web Platform'}
                </option>
                <option value="Mobile Application">
                  {language === 'ar' ? 'تطبيقات الجوال' : 'Mobile Application'}
                </option>
                <option value="Cloud Infrastructure">
                  {language === 'ar' ? 'البنية السحابية' : 'Cloud Infrastructure'}
                </option>
              </select>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E2D] text-left rtl:text-right">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#FF1E2D] hover:bg-[#8B0000] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,30,45,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.about.aiSubmitting}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.about.aiSubmitButton}</span>
                </>
              )}
            </button>
          </form>

          {/* Blueprint Results Display */}
          {blueprint && (
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-[#050505] border border-[#FF1E2D]/50 text-left rtl:text-right space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-[#221214]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E2D] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping" />
                  <span>
                    {language === 'ar' ? 'المواصفات المعمارية الناتجة' : 'GENERATED ARCHITECTURE SPECIFICATION'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#858585] uppercase">
                  {t.about.aiPoweredBy}
                </span>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-1 font-bold">
                  {t.about.aiExecVision}
                </h5>
                <p className="text-sm font-sans text-white leading-relaxed">
                  {blueprint.architectureOverview}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-3 font-bold">
                  {t.about.aiTechStack}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {blueprint.recommendedTechStack.map((tech, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#0A0A0A] border border-[#221214] space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#858585]">{tech.layer}</span>
                        <span className="text-white font-bold">{tech.technology}</span>
                      </div>
                      <p className="text-[11px] font-sans text-[#B5B5B5] leading-relaxed">
                        {tech.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#110507] border border-[#450000]">
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#FF1E2D] font-bold mb-1">
                  {t.about.aiAdvantage}
                </h5>
                <p className="text-xs font-sans text-[#F5F5F5] leading-relaxed">
                  {blueprint.noirAdvantage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
