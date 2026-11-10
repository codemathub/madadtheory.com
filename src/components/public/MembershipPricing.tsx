import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone, Sparkles, Shield, Clock, Layers, Users, Zap } from "lucide-react";

interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  pricePeriod: string;
  badge?: string;
  commitment: string;
  features: { title: string; desc: string }[];
  tagline: string;
  imageBg: string;
  mockTitle: string;
}

const MEMBERSHIP_PLANS: PlanItem[] = [
  {
    id: "starter",
    name: "Starter Plan",
    subtitle: "Ideal for landing pages, quick design tasks, early-stage ideas.",
    price: "$1,499",
    pricePeriod: "/Monthly",
    commitment: "*Minimum commitment — 1 month",
    tagline: "Essential growth foundation",
    imageBg: "from-amber-500/20 via-orange-500/10 to-transparent",
    mockTitle: "Starter Plan",
    features: [
      {
        title: "First Mockup in 96hrs",
        desc: "Initial design concepts delivered four days with quality focused execution.",
      },
      {
        title: "Single Project Queue",
        desc: "Dedicated queue ensuring focused attention on your active project.",
      },
      {
        title: "Basic Design Iterations",
        desc: "Two rounds of refinements to achieve your design outcomes.",
      },
      {
        title: "Assigned Designer",
        desc: "A skilled designer assigned to handle your project requirements effectively.",
      },
    ],
  },
  {
    id: "growth",
    name: "Growth Plan",
    subtitle: "Perfect for scaling brands that need rapid execution and continuous testing.",
    price: "$2,999",
    pricePeriod: "/Monthly",
    badge: "Popular",
    commitment: "*Minimum commitment — 1 month",
    tagline: "High-velocity production",
    imageBg: "from-purple-500/20 via-indigo-500/10 to-transparent",
    mockTitle: "Growth Plan",
    features: [
      {
        title: "Fast Delivery in 48hrs",
        desc: "Rapid delivery on campaigns, landing pages, and creative batches.",
      },
      {
        title: "Double Project Queue",
        desc: "Two active initiatives engineered and delivered in parallel.",
      },
      {
        title: "Unlimited Iterations",
        desc: "Continuous creative testing and weekly sprint optimizations.",
      },
      {
        title: "Senior Growth Strategist",
        desc: "Senior performance marketer and full-stack engineer embedded in your team.",
      },
    ],
  },
  {
    id: "scale",
    name: "Scale Plan",
    subtitle: "Engineered for high-volume enterprise teams requiring full squad deployment.",
    price: "$4,999",
    pricePeriod: "/Monthly",
    commitment: "*Minimum commitment — 1 month",
    tagline: "Enterprise squad power",
    imageBg: "from-blue-500/20 via-cyan-500/10 to-transparent",
    mockTitle: "Scale Plan",
    features: [
      {
        title: "Priority Delivery in 24hrs",
        desc: "Same-day response and immediate priority deployment on urgent assets.",
      },
      {
        title: "Multi-Project Queue",
        desc: "Full squad execution across paid ads, custom software, CRM, and creative.",
      },
      {
        title: "Full Attribution Matrix",
        desc: "Server-side CAPI tracking, dynamic creative testing, and weekly sprints.",
      },
      {
        title: "Dedicated Growth Director",
        desc: "Direct executive line, daily war-room syncs, and custom Slack channel.",
      },
    ],
  },
];

const PARTNERSHIP_MODELS: PlanItem[] = [
  {
    id: "fixed-price",
    name: "Fixed Price Model",
    subtitle:
      "Best for projects with clearly defined scope, timeline, and budget. This model gives you cost clarity, milestone-based execution, and predictable delivery from start to finish.",
    price: "Milestone",
    pricePeriod: "Based",
    badge: "Popular",
    commitment: "*Project-scoped milestone contract",
    tagline: "Predictable delivery",
    imageBg: "from-emerald-500/20 via-teal-500/10 to-transparent",
    mockTitle: "Fixed Price",
    features: [
      {
        title: "Fixed budget and timeline",
        desc: "Pre-agreed milestones ensure zero budget surprises.",
      },
      {
        title: "Clear scope and deliverables",
        desc: "Granular technical architecture and design specifications upfront.",
      },
      {
        title: "Ideal for well-planned projects",
        desc: "Structured roadmap with defined phases from discovery to launch.",
      },
      {
        title: "Milestone-based sign-offs",
        desc: "You review and approve each phase before subsequent billing.",
      },
    ],
  },
  {
    id: "hire-dedicated",
    name: "Hire Dedicated Model",
    subtitle:
      "Perfect for long-term projects where you need a dedicated team and full flexibility. Our developers work closely with you, adapt to evolving requirements, and provide continuous support for faster growth.",
    price: "Dedicated",
    pricePeriod: "Monthly",
    badge: "Flexible",
    commitment: "*Scalable ongoing monthly agreement",
    tagline: "Full team extension",
    imageBg: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    mockTitle: "Dedicated Team",
    features: [
      {
        title: "Dedicated team for your project",
        desc: "Direct allocation of full-time growth strategists and developers.",
      },
      {
        title: "Scalable resources anytime",
        desc: "Easily scale up team bandwidth during high-demand marketing sprints.",
      },
      {
        title: "Continuous support for faster growth",
        desc: "Ongoing optimization, tracking, and feature development.",
      },
      {
        title: "Direct daily communication",
        desc: "Integrated seamlessly into your company Slack and daily standups.",
      },
    ],
  },
  {
    id: "on-site",
    name: "On Site Development Model",
    subtitle:
      "A strong choice for businesses that require close collaboration, real-time communication, and direct involvement. Our team works from your location to ensure smooth coordination and faster decision-making.",
    price: "Enterprise",
    pricePeriod: "Custom",
    commitment: "*On-site embedded team sprint",
    tagline: "In-person execution",
    imageBg: "from-blue-500/20 via-indigo-500/10 to-transparent",
    mockTitle: "On-Site Team",
    features: [
      {
        title: "Direct on-site collaboration",
        desc: "Senior specialists work side-by-side with your internal stakeholders.",
      },
      {
        title: "Faster communication flow",
        desc: "Zero timezone lag or remote friction; instant decisions on site.",
      },
      {
        title: "Great for enterprise projects",
        desc: "Ideal for mission-critical launches, data migrations, and large campaigns.",
      },
      {
        title: "Physical office integration",
        desc: "Team deployed directly to your Delhi NCR or regional headquarters.",
      },
    ],
  },
];

export function MembershipPricing() {
  const [activeCategory, setActiveCategory] = useState<"membership" | "partnership">("membership");
  const [activePlanIndex, setActivePlanIndex] = useState<number>(0);

  const plans = activeCategory === "membership" ? MEMBERSHIP_PLANS : PARTNERSHIP_MODELS;
  const currentPlan = plans[activePlanIndex] || plans[0];

  const handleCategorySwitch = (category: "membership" | "partnership") => {
    setActiveCategory(category);
    setActivePlanIndex(0);
  };

  return (
    <section className="py-20 md:py-28 bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header (Image 2 style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20">
              PRICING & ENGAGEMENT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              {activeCategory === "membership" ? "Membership Plan" : "Partnership Models"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Transparent, scalable models built for predictable performance. Choose an ongoing monthly membership or a dedicated partnership framework.
            </p>
          </div>

          {/* Toggle between Membership Plans and Partnership Models */}
          <div className="p-1.5 rounded-2xl bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleCategorySwitch("membership")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "membership"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Membership Plans
            </button>
            <button
              type="button"
              onClick={() => handleCategorySwitch("partnership")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "partnership"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Partnership Models
            </button>
          </div>
        </div>

        {/* Plan Selectors Tabs (Image 2 style) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 shadow-sm gap-1 sm:gap-2">
            {plans.map((p, idx) => {
              const isSelected = activePlanIndex === idx;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlanIndex(idx)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{p.name}</span>
                  {p.badge && (
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                      {p.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Plan Detail Container (Image 2 exact 3-column layout) */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#120D1D] p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Column 1 (45%): Deliverables & Features Checklist */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                Included Deliverables
              </span>

              <div className="space-y-5">
                {currentPlan.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-heading font-black text-sm text-slate-900 dark:text-white">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 (30%): Pricing & Action Buttons */}
            <div className="lg:col-span-4 p-8 rounded-2xl bg-slate-50 dark:bg-[#181126] border border-slate-200 dark:border-white/10 space-y-6 text-center lg:text-left flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentPlan.subtitle}
                </p>

                <div className="pt-2">
                  <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    <span className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                      {currentPlan.price}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold">
                      {currentPlan.pricePeriod}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
                    {currentPlan.commitment}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/contact">
                  <button
                    type="button"
                    className="w-full py-3.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-heading font-black text-xs uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>SELECT PLAN</span>
                    <span className="text-xs">▶</span>
                  </button>
                </Link>

                <a
                  href="tel:+919953609096"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:underline w-full py-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>QUICK CALL (+91 99536 09096)</span>
                </a>
              </div>
            </div>

            {/* Column 3 (25%): Image / Visual Preview Card (Image 2 style) */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-full max-w-[280px] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1E1730] dark:to-[#120D1D] p-5 border border-slate-200 dark:border-white/10 shadow-lg space-y-4">
                <div
                  className={`w-full h-44 rounded-xl bg-gradient-to-br ${currentPlan.imageBg} border border-white/20 dark:border-white/5 flex flex-col items-center justify-center p-4 text-center space-y-2`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#120D1D] shadow-md flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-heading font-black text-base text-slate-900 dark:text-white block">
                    {currentPlan.mockTitle}
                  </span>
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold block">
                    {currentPlan.tagline}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span className="font-medium">Direct Slack Channel</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">● Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

