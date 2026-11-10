import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, ShoppingBag, Briefcase, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const solutionsList = [
  {
    slug: "startups",
    title: "Scaling Startups",
    icon: Rocket,
    tagline: "Rapid Customer Acquisition & Product-Market Fit Validation",
    description:
      "We build agile paid testing funnels and custom landing pages to find low-CAC acquisition loops and prove scalable unit economics.",
    services: ["Performance Marketing", "Website Development", "Brand Identity"],
  },
  {
    slug: "ecommerce-brands",
    title: "D2C E-commerce Brands",
    icon: ShoppingBag,
    tagline: "Scale to 8-Figures with Sustained 3x–5x ROAS",
    description:
      "Full-funnel Meta and Google Ads, checkout acceleration, automated post-purchase flows, and creative testing sprints that combat fatigue.",
    services: ["Performance Marketing", "E-commerce Development", "Video & Content"],
  },
  {
    slug: "b2b-enterprises",
    title: "B2B Enterprises & SaaS",
    icon: Briefcase,
    tagline: "High-Intent Lead Pipelines & Automated CRM Qualification",
    description:
      "Target decision-makers with high-intent Google Search campaigns, conversational qualification bots, and automated CRM meeting booking.",
    services: ["SEO & Organic Growth", "Workflow Automation", "CRM Integration"],
  },
  {
    slug: "local-businesses",
    title: "Local & Regional Businesses",
    icon: MapPin,
    tagline: "Dominant Local Map Pack Rankings & Inbound Call Volume",
    description:
      "Hyper-local Google Ads, local SEO schema, WhatsApp click-to-chat flows, and automated customer review generation.",
    services: ["SEO & Organic Growth", "Chatbots & WhatsApp", "Performance Marketing"],
  },
];

export default function Solutions() {
  useEffect(() => {
    document.title = "Industry & Business Solutions — Mad Ad Theory";
  }, []);

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="cyan">Tailored Ecosystems</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-content tracking-tight">
              Growth Solutions for Your <span className="text-brand-primary">Exact Business Model</span>
            </h1>
            <p className="text-content-muted text-base sm:text-lg leading-relaxed">
              Every business model demands a different acquisition velocity. Explore our packaged systems engineered for specific industry verticals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionsList.map((sol) => {
              const Icon = sol.icon;
              return (
                <Card key={sol.slug} hoverEffect className="p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="font-heading font-black text-2xl text-content">{sol.title}</h3>
                      <p className="text-xs font-bold text-brand-primary mt-1">{sol.tagline}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-content-muted leading-relaxed">
                      {sol.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {sol.services.map((svc, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-subtle text-content border border-surface-border"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border">
                    <Link to={`/solutions/${sol.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:underline"
                    >
                      Explore Solution Roadmap <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

          </>
  );
}
