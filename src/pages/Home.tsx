import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Lock,
  Layers,
  Code,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { RadialServiceHub } from "@/components/public/RadialServiceHub";
import { ServiceEcosystem } from "@/components/public/ServiceEcosystem";
import { NumbersThatReflectGrowth } from "@/components/public/NumbersThatReflectGrowth";
import { MembershipPricing } from "@/components/public/MembershipPricing";
import { GoogleReviewsSlider } from "@/components/public/GoogleReviewsSlider";
import { ClientMediaShowcase } from "@/components/public/ClientMediaShowcase";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { servicesData } from "@/lib/servicesData";
import { portfolioData } from "@/lib/portfolioData";
import { useSiteContent } from "@/lib/siteContentStore";

export default function Home() {
  const content = useSiteContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Mad Ad Theory differ from traditional marketing agencies?",
      a: "We are performance-first. We don't report vanity impressions or hide behind jargon. We integrate data tracking, creative testing, custom tech development, and automation directly into your revenue metrics.",
    },
    {
      q: "What is your typical onboarding timeline?",
      a: "Following your initial enquiry and audit, we complete tracking verification, creative briefings, and campaign strategy within 7 business days so campaigns launch with full velocity.",
    },
    {
      q: "Do clients receive real-time access to reports and deliverables?",
      a: "Yes! We provide live tracking dashboards, weekly sprint reports, and direct communication channels with our team so you always know your exact campaign status.",
    },
    {
      q: "Do you require long-term locking contracts?",
      a: "We believe in earning your partnership every month. Most engagements start with an initial 90-day growth sprint to prove targets, followed by flexible ongoing performance sprints.",
    },
  ];

  useEffect(() => {
    document.title = "Mad Ad Theory — Performance Marketing Agency | You Set the Target. We Hit It.";
  }, []);

  return (
    <>
      
      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/30 bg-brand-soft text-brand-primary text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  {content.heroBadge}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-content tracking-tight leading-[1.08]">
                  {content.heroHeadline}
                </h1>

                <p className="text-base sm:text-lg text-content-muted max-w-xl leading-relaxed">
                  {content.heroSubheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>

                  <Link to="/portfolio">
                    <Button variant="outline" size="lg">
                      View Case Studies
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Key Metric Display */}
              <div className="lg:col-span-5">
                <div className="bg-surface-card border border-surface-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-full pointer-events-none" />

                  <span className="text-xs font-black uppercase text-brand-primary tracking-widest block mb-4">
                    Performance Track Record
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-brand-primary">
                        {content.metricRoas}
                      </div>
                      <div className="text-xs font-bold text-content mt-1">Average ROAS</div>
                      <div className="text-[11px] text-content-muted">On Meta & Google Ads</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-emerald-500">
                        {content.metricDataDriven}
                      </div>
                      <div className="text-xs font-bold text-content mt-1">Data-Driven</div>
                      <div className="text-[11px] text-content-muted">Server-Side Tracking</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-content">
                        {content.metricBrandsScaled}
                      </div>
                      <div className="text-xs font-bold text-content mt-1">Brands Scaled</div>
                      <div className="text-[11px] text-content-muted">Across D2C, B2B & Tech</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border">
                      <div className="text-3xl sm:text-4xl font-heading font-black text-brand-primary">
                        24/7
                      </div>
                      <div className="text-xs font-bold text-content mt-1">Automated Systems</div>
                      <div className="text-[11px] text-content-muted">Instant Lead Routing</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-surface-border flex items-center justify-between text-xs">
                    <span className="text-content-muted">Ready to scale your numbers?</span>
                    <Link to="/contact"
                      className="font-bold text-brand-primary hover:underline flex items-center gap-1"
                    >
                      Request Free Audit <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SIGNATURE RADIAL SERVICE HUB */}
        <section className="py-16 bg-surface-subtle border-y border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RadialServiceHub />
          </div>
        </section>

        {/* ─── 4 CORE PILLARS STRIP (Image 3) ─── */}
        <section className="py-8 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-surface-card dark:bg-[#120D1D] shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
                <div className="p-6 sm:p-8 space-y-2">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white block">
                    01
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    Strategy first
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-2">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white block">
                    02
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    Creative thinking
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-2">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white block">
                    03
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    Smart execution
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-2">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white block">
                    04
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    Measurable growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AGENCY POSITIONING & INTRO */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <Badge variant="purple">The Mad Ad Philosophy</Badge>
                <h2 className="text-3xl sm:text-4xl font-heading font-black text-content">
                  We don't do vanity metrics. We drive <span className="text-brand-primary">pipeline revenue</span>.
                </h2>
                <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                  Traditional agencies charge retainers and hand you confusing impressions reports. Mad Ad Theory operates as an embedded growth partner. We align our testing matrices directly with your cash flow and ROAS targets.
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-content">High-Frequency Creative Testing</h4>
                      <p className="text-xs text-content-muted">Fresh video and banner variations every week to prevent ad fatigue.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-content">Full-Stack Tech Infrastructure</h4>
                      <p className="text-xs text-content-muted">Custom Next.js & React web applications and headless checkout funnels.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-content">Automated CRM & Operations</h4>
                      <p className="text-xs text-content-muted">Zero leads dropped. Automated WhatsApp and email flows convert leads instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card hoverEffect className="space-y-2">
                  <Target className="w-8 h-8 text-brand-primary mb-2" />
                  <h3 className="font-heading font-bold text-lg text-content">Paid Acquisition</h3>
                  <p className="text-xs text-content-muted">
                    Engineered search, shopping, and social ads targeting customers with high purchase intent.
                  </p>
                </Card>

                <Card hoverEffect className="space-y-2">
                  <Code className="w-8 h-8 text-brand-primary mb-2" />
                  <h3 className="font-heading font-bold text-lg text-content">Conversion Tech</h3>
                  <p className="text-xs text-content-muted">
                    Sub-second load times and frictionless checkouts that double your baseline landing page conversions.
                  </p>
                </Card>

                <Card hoverEffect className="space-y-2">
                  <Zap className="w-8 h-8 text-brand-primary mb-2" />
                  <h3 className="font-heading font-bold text-lg text-content">Process Automation</h3>
                  <p className="text-xs text-content-muted">
                    Custom pipelines that connect forms, WhatsApp, Slack, and your CRM in real-time.
                  </p>
                </Card>

                <Card hoverEffect className="space-y-2">
                  <Sparkles className="w-8 h-8 text-brand-primary mb-2" />
                  <h3 className="font-heading font-bold text-lg text-content">Performance Creative</h3>
                  <p className="text-xs text-content-muted">
                    Direct-response video hooks, 3D renders, and ad graphics designed for clicks and checkouts.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 4. REAL SERVICE EXECUTION ECOSYSTEM (Replacing static catalogue) */}
        <ServiceEcosystem />

        {/* 5. NUMBERS THAT REFLECT REAL GROWTH (Image 3) */}
        <NumbersThatReflectGrowth />

        {/* 6. MEMBERSHIP PLAN & PARTNERSHIP MODELS (Image 2 & 1) */}
        <MembershipPricing />

        {/* 7. LIVE GOOGLE REVIEWS SLIDER */}
        <GoogleReviewsSlider />

        {/* 8. CLIENT VIDEO TESTIMONIALS & CULTURE SHOWCASE (From futuredesks ref) */}
        <ClientMediaShowcase />

        {/* 6. HOW WE WORK (Image 1) */}
        <section className="py-20 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                  — HOW WE WORK
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
                  A clear process. Better outcomes.
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                Good work comes from asking the right questions, setting clear expectations and staying close to the details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider block">
                  01 / DISCOVER
                </span>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                  Understand
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We learn about your business, audience, challenges and goals.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider block">
                  02 / PLAN
                </span>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                  Build the plan
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We define the approach, scope, priorities and measures of success.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider block">
                  03 / CREATE
                </span>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                  Make it happen
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our team designs, develops, launches and manages the work.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400 tracking-wider block">
                  04 / IMPROVE
                </span>
                <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                  Keep improving
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We review performance, learn and make thoughtful improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 md:py-24 bg-surface-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-14">
              <Badge variant="purple">Frequently Answered</Badge>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-content">
                Questions on Partnerships
              </h2>
              <p className="text-content-muted text-sm">
                Transparent answers about how we collaborate, bill, and scale brands.
              </p>
            </div>

            {/* Interactive Accordion FAQs */}
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden transition-all duration-200 hover:border-purple-500/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-heading font-bold text-base sm:text-lg text-content leading-snug">
                        {faq.q}
                      </h3>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? "bg-purple-600 text-white border-purple-600 rotate-180 shadow-md shadow-purple-600/30"
                            : "bg-surface-subtle text-content-muted border-surface-border hover:border-purple-300"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 animate-fade-in">
                        <p className="text-xs sm:text-sm text-content-muted leading-relaxed border-t border-surface-border/60 pt-4">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 8. HAVE A GOOD PROJECT IN MIND? (Above Footer, Direct to Contact) ─── */}
        <section className="py-20 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-r from-[#0C3E56] via-[#103E73] to-[#1E2568] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
                  Have a good project in mind?
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Tell us what you're building. Let's work out the right next step.
                </p>
              </div>

              <Link to="/contact" className="shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-slate-900 font-heading font-black text-sm hover:bg-white/90 hover:shadow-lg transition-all"
                >
                  <span>Contact Us</span>
                  <span>↗</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

          </>
  );
}
