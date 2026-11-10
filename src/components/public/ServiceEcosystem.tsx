import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Code,
  Zap,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Globe,
  ChevronRight,
} from "lucide-react";
import {
  useEcosystemProjects,
  initialCategories,
  EcosystemCategory,
  EcosystemProject,
} from "@/lib/ecosystemStore";

const ICON_MAP = {
  Target,
  Code,
  Zap,
  Sparkles,
};

export function ServiceEcosystem() {
  const allProjects = useEcosystemProjects();
  const [activeCategoryId, setActiveCategoryId] = useState<
    "performance-marketing" | "software-tech" | "automation-crm" | "influencer-creative"
  >("performance-marketing");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

  // Filter projects by active category
  const categoryProjects = allProjects.filter((p) => p.categoryId === activeCategoryId);
  const activeProject =
    categoryProjects[activeProjectIndex] || categoryProjects[0] || allProjects[0];

  const handleCategoryChange = (catId: typeof activeCategoryId) => {
    setActiveCategoryId(catId);
    setActiveProjectIndex(0);
  };

  // Extract clean domain for display (e.g., "nerditia.com" from "https://nerditia.com/services")
  const displayDomain = activeProject.liveUrl
    ? activeProject.liveUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    : "madadtheory.com";

  return (
    <section className="py-20 md:py-28 bg-slate-50/50 dark:bg-[#0A0612] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ─── 1. Section Header (Balanced & Proper) ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20">
              CLIENT WORK & DEPLOYMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              Explore Our Working Systems
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Real client deployments, verified performance metrics, and direct live project links.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/services">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all shadow-sm"
              >
                <span>All Disciplines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link to="/contact">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-600/25 active:scale-95"
              >
                <span>Deploy System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* ─── 2. Top Category Tabs (Symmetrical 4-Column Grid) ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {initialCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Target;
            const isActive = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border flex items-center gap-3.5 group relative overflow-hidden ${
                  isActive
                    ? "bg-white dark:bg-[#161024] border-purple-600 shadow-md shadow-purple-600/10 ring-1 ring-purple-600/50"
                    : "bg-white/60 dark:bg-[#100B1B]/70 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:bg-white dark:hover:bg-[#140E20]"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-indigo-600" />
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h3
                    className={`font-heading font-black text-sm leading-tight truncate transition-colors ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white"
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {cat.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── 3. Clean Project Selector Pills (Cleanly Aligned) ─── */}
        <div className="bg-white/80 dark:bg-[#120D1D]/90 p-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categoryProjects.map((proj, idx) => {
            const isSelected = activeProjectIndex === idx;

            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveProjectIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0 ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25"
                    : "bg-slate-50 dark:bg-white/5 border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-500/30 hover:bg-white dark:hover:bg-white/10"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{proj.number}</span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* ─── 4. Real Master Showcase Card (No Laptop Mockup, Real Image & Details) ─── */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#130E1F] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Real Image Uploaded by Admin / High-Res Preview */}
            <div className="lg:col-span-7 space-y-3">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${activeProject.title} live in new tab`}
                className="block group rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-900 shadow-lg relative aspect-[16/10] cursor-pointer"
              >
                <img
                  src={activeProject.imageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"}
                  alt={activeProject.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {activeProject.status}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-white/90 border border-white/20 shadow-sm">
                    {activeProject.shortTag}
                  </span>
                </div>

                {/* Bottom Live Link Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white shadow-lg group-hover:border-purple-400/50 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-mono font-medium truncate text-slate-200">
                      {activeProject.liveUrl}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600 text-white text-xs font-bold shadow-md shrink-0 group-hover:bg-purple-500 transition-colors">
                    <span>Visit Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            </div>

            {/* Right Column: Real Project Details, Key Metrics & Actions */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Category & Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Project {activeProject.number}
                  </span>
                  <span className="text-slate-300 dark:text-white/20">•</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {activeProject.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Project Detail / Summary */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeProject.summary}
              </p>

              {/* Clickable Live Project URL Chip */}
              <div className="pt-1">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold transition-all border border-purple-500/20 group/link"
                >
                  <Globe className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate max-w-xs">{activeProject.liveUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>

              {/* 4 Clean Key Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeProject.kpis.map((kpi, kIdx) => (
                  <div
                    key={kIdx}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 space-y-1 shadow-sm"
                  >
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                      {kpi.label}
                    </span>
                    <div className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white">
                      {kpi.value}
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block truncate">
                      {kpi.note}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
