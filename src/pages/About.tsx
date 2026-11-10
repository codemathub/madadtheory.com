import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Code2,
  Cpu,
  Palette,
  Star,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const GOOGLE_BUSINESS_LINK = "https://share.google/DlannEj2QMIIhqBc6";

export default function About() {
  useEffect(() => {
    document.title = "About Us — Mad Ad Theory";
  }, []);

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="purple">About Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            We Help Brands Scale With <span className="text-purple-600 dark:text-purple-400">Performance Marketing</span> & Technology
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Mad Ad Theory is a performance marketing agency and growth studio based in Delhi. We partner with e-commerce businesses, D2C brands, and modern enterprises to scale customer acquisition and revenue through data-backed advertising, custom web development, and automated workflows.
          </p>

          {/* Google Business Rating Badge */}
          <div className="pt-2 flex items-center gap-4">
            <a
              href={GOOGLE_BUSINESS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 shadow-sm hover:border-purple-500/40 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-heading font-black text-sm text-slate-900 dark:text-white">4.8</span>
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                (27+ Google Reviews)
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
            </a>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-3 bg-white dark:bg-[#120D1D]">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Paid Acquisition
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Meta and Google Ads managed with first-party attribution tracking, audience segmentation, and targeted return on ad spend.
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-white dark:bg-[#120D1D]">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Web & E-Commerce
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Fast custom Shopify themes, Next.js storefronts, and conversion-optimized checkout funnels engineered for high transaction volume.
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-white dark:bg-[#120D1D]">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Workflow Automation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting ad forms, CRM pipelines, and official WhatsApp Business flows so leads are engaged and routed instantly.
            </p>
          </Card>

          <Card className="p-6 space-y-3 bg-white dark:bg-[#120D1D]">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Performance Creative
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Direct-response video hooks, 3D product visuals, and high-CTR banner variations produced weekly to eliminate ad fatigue.
            </p>
          </Card>
        </div>

        {/* Real Location & Contact Info */}
        <div className="rounded-3xl p-8 sm:p-10 bg-slate-50 dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white">
              Headquarters & Physical Office
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Visit us or schedule an in-person strategy discussion at our office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Office Location
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                  C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Phone
                </span>
                <a
                  href="tel:+919953609096"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 mt-1 block"
                >
                  +91 99536 09096
                </a>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                  Mon – Sat, 10:00 AM – 7:00 PM
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:info@nerditia.com"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 mt-1 block"
                >
                  info@nerditia.com
                </a>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                  General & Project Briefs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-heading font-black text-slate-900 dark:text-white">
            Ready to scale your marketing and technology?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-a-quote">
              <Button variant="primary" size="lg">
                Get a Quote <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <a
              href="tel:+919953609096"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-heading font-bold text-sm text-slate-800 dark:text-slate-200 hover:border-purple-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 99536 09096</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
