import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { MultiStepQuoteForm } from "@/components/public/MultiStepQuoteForm";
import { Badge } from "@/components/ui/Badge";

const solutionsDetailData: Record<
  string,
  {
    title: string;
    headline: string;
    overview: string;
    keyDeliverables: string[];
    metrics: { label: string; value: string }[];
  }
> = {
  startups: {
    title: "Scaling Startups",
    headline: "Aggressive Go-to-Market & Product-Market Fit Funnels",
    overview:
      "For seed and Series A ventures needing fast, measurable traction. We build rapid paid acquisition sprints and high-speed conversion pages to prove your customer acquisition cost and validate scalable revenue.",
    keyDeliverables: [
      "Rapid MVP Conversion Landing Pages",
      "Audience Hypothesis Testing on Meta & Google",
      "Event Tracking & Product Analytics Setup",
      "Unit Economics & LTV:CAC Optimization",
    ],
    metrics: [
      { label: "Audit Turnaround", value: "48 Hours" },
      { label: "Target CAC Reduction", value: "-35%" },
      { label: "Launch Speed", value: "7 Days" },
    ],
  },
  "ecommerce-brands": {
    title: "D2C E-commerce Brands",
    headline: "Scale to 8-Figures with Sustained 3x–5x ROAS",
    overview:
      "For consumer brands ready to graduate from stagnant revenue plateaus. We optimize full-funnel paid media, deploy high-frequency creative variation batches, and upgrade checkout speed to unlock predictable scaling.",
    keyDeliverables: [
      "Meta Ads & Google Shopping Feed Scaling",
      "Shopify Checkout Optimization & 1-Click Upsells",
      "Server-Side Conversions API (CAPI) Integration",
      "Weekly Direct-Response Video Ad Sprints",
    ],
    metrics: [
      { label: "Average ROAS", value: "3x–5x" },
      { label: "Revenue Scale", value: "+240%" },
      { label: "Checkout Drop-off", value: "-45%" },
    ],
  },
  "b2b-enterprises": {
    title: "B2B Enterprises & SaaS",
    headline: "High-Intent Demo Pipelines & Automated CRM Qualification",
    overview:
      "For enterprise software and services firms targeting high-ticket deals. We capture commercial-intent search traffic and route qualified prospects into automated sales appointment calendars in seconds.",
    keyDeliverables: [
      "Google Search Commercial Intent Campaigns",
      "24/7 Automated WhatsApp & Chatbot Qualification",
      "HubSpot & Zoho CRM Pipeline Automation",
      "Executive Sales Deck & Collateral Design",
    ],
    metrics: [
      { label: "Qualified Demos", value: "400+" },
      { label: "Sales Cycle Time", value: "-28%" },
      { label: "Lead Response Time", value: "< 1 Min" },
    ],
  },
  "local-businesses": {
    title: "Local & Regional Businesses",
    headline: "Dominant Local Map Pack Rankings & Inbound Call Volume",
    overview:
      "For clinics, high-end real estate, showrooms, and local service providers. We capture customers searching within your immediate geographic radius and convert them into inbound phone calls and visits.",
    keyDeliverables: [
      "Local Map Pack Ranking & Schema Optimization",
      "Hyper-Targeted Geo-Fenced Google Ads",
      "WhatsApp Instant Booking Sequences",
      "Automated Google Review Generation",
    ],
    metrics: [
      { label: "Local Calls", value: "+180%" },
      { label: "Map Impressions", value: "10x" },
      { label: "Booking Rate", value: "42%" },
    ],
  },
};

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const sol = slug ? solutionsDetailData[slug] : null;

  useEffect(() => {
    if (sol) {
      document.title = `${sol.title} Solutions — Mad Ad Theory`;
    }
  }, [sol]);

  if (!sol) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Link to="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-content-muted hover:text-brand-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Solutions
          </Link>

          <div className="space-y-4">
            <Badge variant="cyan">{sol.title}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-content tracking-tight">
              {sol.headline}
            </h1>
            <p className="text-base sm:text-lg text-content-muted leading-relaxed">
              {sol.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-surface-subtle border border-surface-border">
            {sol.metrics.map((m, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-surface-card border border-surface-border">
                <div className="text-3xl font-heading font-black text-brand-primary">{m.value}</div>
                <div className="text-xs font-bold text-content mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-surface-border">
            <h2 className="text-2xl font-heading font-bold text-content">Key Strategic Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sol.keyDeliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-surface-border bg-surface-card"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-content">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
              <h3 className="text-2xl font-heading font-black text-content">
                Ready to Implement this Solution?
              </h3>
              <p className="text-xs sm:text-sm text-content-muted">
                Submit your details below and our lead strategist will contact you with a tailored scope.
              </p>
            </div>

            <MultiStepQuoteForm />
          </div>
        </div>
      </main>

          </>
  );
}
