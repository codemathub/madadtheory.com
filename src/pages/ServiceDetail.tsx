import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";
import { MultiStepQuoteForm } from "@/components/public/MultiStepQuoteForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useServicesData } from "@/lib/servicesStore";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const services = useServicesData();
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} — Performance Marketing Agency | Mad Ad Theory`;
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <>
      
      <main className="flex-1">
        {/* Hero Header */}
        <section className="py-16 md:py-24 bg-surface-subtle border-b border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-5">
              <div className="flex items-center gap-2">
                <Link to="/services" className="text-xs font-bold text-content-muted hover:text-brand-primary">
                  Services
                </Link>
                <span className="text-content-muted text-xs">/</span>
                <Badge variant="purple">{service.category}</Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl font-heading font-black text-content tracking-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-content-muted leading-relaxed">
                {service.shortSummary}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a href="#brief">
                  <Button variant="primary" size="lg">
                    Build Project Brief <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Full Overview & Deliverables */}
              <div className="lg:col-span-7 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-content">
                    Strategic Execution & Approach
                  </h2>
                  <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                    {service.fullOverview}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-surface-border">
                  <h3 className="text-xl font-heading font-bold text-content">
                    Core Deliverables Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.deliverables.map((item, idx) => (
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

                {/* Service FAQs */}
                {service.faqs && service.faqs.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-surface-border">
                    <h3 className="text-xl font-heading font-bold text-content">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {service.faqs.map((faq, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-surface-subtle border border-surface-border space-y-1.5">
                          <h4 className="font-heading font-bold text-sm text-content flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-brand-primary" />
                            {faq.question}
                          </h4>
                          <p className="text-xs text-content-muted leading-relaxed pl-6">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Commitment Card */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-8 space-y-6 bg-surface-card">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
                    Performance Standards
                  </span>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-xs shrink-0">
                        ROAS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-content">Revenue Focused Targets</div>
                        <div className="text-[11px] text-content-muted">Targeting 3x–5x performance returns</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">
                        100%
                      </div>
                      <div>
                        <div className="text-xs font-bold text-content">Server-Side Tracking</div>
                        <div className="text-[11px] text-content-muted">Uncorrupted attribution modeling</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-xs shrink-0">
                        IP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-content">100% Client IP Ownership</div>
                        <div className="text-[11px] text-content-muted">Code, assets and accounts belong to you</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border">
                    <a href="#brief" className="w-full">
                      <Button variant="primary" size="md" className="w-full">
                        Engage {service.title} <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Project Brief Section */}
        <section id="brief" className="py-20 bg-surface-subtle border-t border-surface-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <Badge variant="cyan">Request Scope & Estimate</Badge>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-content">
                Get Started with {service.title}
              </h2>
              <p className="text-content-muted text-xs sm:text-sm">
                Provide your requirements below and receive an audit and roadmap from our senior strategy team.
              </p>
            </div>

            <MultiStepQuoteForm />
          </div>
        </section>
      </main>

          </>
  );
}
