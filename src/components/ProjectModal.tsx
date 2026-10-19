import React, { useState } from 'react';
import { X, ExternalLink, Terminal, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ProjectData {
  id: string;
  title: string;
  codename: string;
  category: string;
  headline: string;
  description: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  architectureStack: { layer: string; tech: string }[];
  accentColor?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onStartInquiry: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onStartInquiry }) => {
  const { t, isRTL } = useLanguage();
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);

  if (!project) return null;

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimLog([
      isRTL
        ? `[النظام] جاري تهيئة بيئة الاختبار المعمارية لمشروع ${project.codename}...`
        : `[SYSTEM] Initializing sandbox test harness for ${project.codename}...`,
    ]);

    setTimeout(() => {
      setSimLog((prev) => [
        ...prev,
        isRTL
          ? `[النواة] بدء تشغيل مثيلات الحاويات السحابية... استجابة SLA تبلغ 14 مللي ثانية`
          : `[KERNEL] Spawning container instances... SLA response 14ms`,
        isRTL
          ? `[الأمان] التحقق من التوقيعات التشفيرية... تم الاجتياز بنجاح (Ed25519)`
          : `[SECURITY] Verifying cryptographic signatures... PASSED (Ed25519)`,
      ]);
    }, 600);

    setTimeout(() => {
      setSimLog((prev) => [
        ...prev,
        isRTL
          ? `[الذكاء الاصطناعي] تدقيق عقود البيانات التخطيطية... توافق بنسبة 100%`
          : `[INTELLIGENCE] Evaluating schema contracts... 100% compliance`,
        isRTL
          ? `[الفحص القياسي] تم التحقق من معدل الإنتاجية عند ذروة الحمل. صفر تسريبات في الذاكرة.`
          : `[BENCHMARK] Throughput verified at peak load test. Zero memory leaks detected.`,
        isRTL
          ? `[الحالة] حالة النظام: مثالية ومستعدة للنشر الإنتاجي المباشر`
          : `[STATUS] System state: NOMINAL & READY FOR DEPLOYMENT`,
      ]);
      setSimulationRunning(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0A0A0A] border-2 border-[#8B0000]/80 shadow-[0_0_60px_rgba(255,30,45,0.25)] text-left rtl:text-right">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#050505]/95 border-b border-[#221214] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF1E2D] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF1E2D]">
              {project.codename}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#221214] text-[10px] font-mono text-[#858585] uppercase">
              {t.projects.modal.conceptProject}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0A0A0A] border border-[#450000] text-[#858585] hover:text-white hover:border-[#FF1E2D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <div className="text-xs font-mono text-[#858585] uppercase tracking-wider mb-1">
              {t.projects.modal.categoryLabel} {project.category}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              {project.title}
            </h2>
            <p className="text-base font-mono text-[#FF1E2D] mt-2">
              {project.headline}
            </p>
          </div>

          {/* Description */}
          <div className="p-5 rounded-xl bg-[#050505] border border-[#221214]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-2 font-bold">
              {t.projects.modal.execSummary}
            </h4>
            <p className="text-sm text-[#F5F5F5] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#050505] border border-[#221214]">
              <div className="text-xs font-mono text-[#8B0000] uppercase tracking-wider font-bold mb-2">
                {t.projects.modal.challengeTitle}
              </div>
              <p className="text-xs text-[#B5B5B5] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#110507] border border-[#450000]">
              <div className="text-xs font-mono text-[#FF1E2D] uppercase tracking-wider font-bold mb-2">
                {t.projects.modal.solutionTitle}
              </div>
              <p className="text-xs text-[#F5F5F5] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Impact Benchmarks */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-4 font-bold">
              {t.projects.modal.performanceBenchmarks}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#050505] border border-[#221214] text-center">
                  <div className="text-xl sm:text-2xl font-display font-black text-[#FF1E2D]">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#858585] uppercase mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Stack Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-3 font-bold">
              {t.projects.modal.systemStack}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architectureStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#050505] border border-[#221214] text-xs font-mono"
                >
                  <span className="text-[#858585]">{stack.layer}</span>
                  <span className="text-white font-bold">{stack.tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Harness Test Simulator */}
          <div className="p-5 rounded-xl bg-[#050505] border border-[#450000]/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <Terminal className="w-4 h-4 text-[#FF1E2D]" />
                <span>{t.projects.modal.harnessTitle}</span>
              </div>
              <button
                onClick={runSimulation}
                disabled={simulationRunning}
                className="px-3 py-1.5 rounded bg-[#450000] hover:bg-[#8B0000] text-white text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{simulationRunning ? t.projects.modal.harnessTesting : t.projects.modal.harnessButton}</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-black font-mono text-[11px] text-[#B5B5B5] space-y-1 min-h-[90px] border border-[#221214]">
              {simLog.length === 0 ? (
                <span className="text-[#858585] italic">
                  {t.projects.modal.harnessPrompt}
                </span>
              ) : (
                simLog.map((line, idx) => (
                  <div key={idx} className={line.includes('NOMINAL') || line.includes('مثالية') ? 'text-[#FF1E2D] font-bold' : ''}>
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-4 border-t border-[#221214] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#858585]">
              {t.projects.modal.footerNote}
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onStartInquiry(project.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#FF1E2D] hover:bg-[#8B0000] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,30,45,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.projects.modal.buildSimilar}</span>
                <ExternalLink className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
