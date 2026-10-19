import React, { useState } from 'react';
import { ProjectModal, type ProjectData } from './ProjectModal';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsSectionProps {
  onStartInquiry: (projectName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onStartInquiry }) => {
  const { t, isRTL } = useLanguage();
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  const categories = t.projects.categories;
  const projects = t.projects.items;

  // Filter projects by category index (0 is "All Projects")
  const filteredProjects =
    selectedCategoryIdx === 0
      ? projects
      : projects.filter((_, idx) => {
          // Mapping category indices to project indices
          if (selectedCategoryIdx === 1) return idx === 0; // AI
          if (selectedCategoryIdx === 2) return idx === 1; // SaaS/FinTech
          if (selectedCategoryIdx === 3) return idx === 2; // E-Commerce/3D
          if (selectedCategoryIdx === 4) return idx === 4; // Mobile
          if (selectedCategoryIdx === 5) return idx === 3 || idx === 5; // Enterprise
          return true;
        });

  return (
    <section id="projects" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#221214]">
          <div className="space-y-3 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1E2D]">
              <span className="w-1.5 h-1.5 bg-[#FF1E2D]" />
              {t.projects.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
              {t.projects.titleMain} <span className="text-[#858585]">{t.projects.titleSub}</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left rtl:text-right">
            <span className="inline-block px-3 py-1 rounded bg-[#0A0A0A] border border-[#450000] text-[10px] font-mono text-[#858585] uppercase">
              {t.projects.conceptNote}
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategoryIdx === idx
                  ? 'bg-[#FF1E2D] text-white font-bold shadow-[0_0_15px_rgba(255,30,45,0.4)]'
                  : 'bg-[#0A0A0A] text-[#858585] hover:text-white hover:bg-[#150a0c] border border-[#221214]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-[#0A0A0A] border border-[#221214] hover:border-[#FF1E2D]/60 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,30,45,0.18)] flex flex-col justify-between overflow-hidden text-left rtl:text-right"
            >
              {/* Top Banner & Visual Preview Frame */}
              <div className="relative aspect-[16/10] bg-[#050505] border-b border-[#221214] overflow-hidden p-6 flex flex-col justify-between">
                {/* Visual HUD Graphic */}
                <div className="absolute inset-0 bg-[radial-gradient(#221214_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B0000]/15 rounded-full blur-2xl group-hover:bg-[#FF1E2D]/20 transition-all duration-500" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-black/70 border border-[#450000] text-[10px] font-mono text-[#FF1E2D] uppercase font-bold tracking-wider">
                    {project.codename}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/50 text-[9px] font-mono text-[#858585] uppercase">
                    {t.projects.conceptLab}
                  </span>
                </div>

                {/* Center Visual Motif */}
                <div className="relative z-10 flex items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border-2 border-[#450000] group-hover:border-[#FF1E2D] flex items-center justify-center text-[#FF1E2D] group-hover:shadow-[0_0_20px_rgba(255,30,45,0.4)] transition-all duration-300">
                    <Cpu className="w-8 h-8" />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#858585]">
                  <span>SLA: 99.99%</span>
                  <span className="text-[#FF1E2D] font-bold">{project.impactMetrics[0]?.value}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#858585] uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#F5F5F5] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#858585] group-hover:text-[#B5B5B5] leading-relaxed mb-6 line-clamp-3 transition-colors">
                    {project.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#1C1214] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#450000] group-hover:text-[#FF1E2D] transition-colors uppercase font-bold">
                    {t.projects.fullArchReady}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-[#FF1E2D] transition-colors cursor-pointer"
                  >
                    <span>{t.projects.viewBlueprint}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onStartInquiry={onStartInquiry}
      />
    </section>
  );
};
