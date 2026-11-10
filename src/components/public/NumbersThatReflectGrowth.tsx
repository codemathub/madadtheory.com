import React from "react";
import { Sparkles, Users, Layers, Rocket, TrendingUp } from "lucide-react";

export function NumbersThatReflectGrowth() {
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-left space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20">
            KEY FEATURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Numbers that reflect real growth
          </h2>
        </div>

        {/* Scalora Key Feature Container (Image 3) */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#120D1D] p-8 sm:p-12 lg:p-14 shadow-sm relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 items-center relative z-10">
            {/* Left Column: Top-Left (120K+) & Bottom-Left (45%) */}
            <div className="space-y-10 lg:space-y-14">
              {/* Stat 1 */}
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  120K+
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                  Daily Workflows. And reducing manual work across departments.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  45%
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                  Productivity Increase. After consolidating tools into one platform.
                </p>
              </div>
            </div>

            {/* Center Pillar: Glowing Brand Emblem + 5x Card */}
            <div className="flex flex-col items-center justify-center space-y-6 py-6 lg:py-0">
              {/* Center Emblem */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center shadow-xl shadow-purple-600/10 relative group">
                <div className="absolute inset-0 rounded-3xl bg-purple-500/10 animate-ping opacity-25 pointer-events-none" />
                <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              {/* Center Stat Floating Card */}
              <div className="w-full max-w-xs p-6 rounded-2xl bg-slate-50 dark:bg-[#181126] border border-slate-200 dark:border-white/10 shadow-sm text-left space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Annual growth
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-heading font-black text-purple-600 dark:text-purple-400">
                    5x
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    We're a team of creative minds and strategic thinkers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Top-Right (5,000+) & Bottom-Right (32%) */}
            <div className="space-y-10 lg:space-y-14 lg:text-left">
              {/* Stat 3 */}
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  5,000+
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                  Active Teams. Growing their business on Mad Ad Theory.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  32%
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                  Faster Sales Cycles. With connected CRM and automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

