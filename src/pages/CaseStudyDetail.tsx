import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const portfolio = usePortfolio();
  const study = portfolio.find((cs) => cs.slug === slug);

  useEffect(() => {
    if (study) {
      document.title = `${study.headline} — Case Study | Mad Ad Theory`;
    }
  }, [study]);

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <Link to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-content-muted hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Case Studies
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="cyan">{study.industry}</Badge>
              <span className="text-xs font-bold text-content-muted">{study.clientName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-content tracking-tight leading-tight">
              {study.headline}
            </h1>

            <div className="flex flex-wrap gap-2 pt-2">
              {study.servicesUsed.map((svc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-soft text-brand-primary border border-brand-primary/20"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-surface-subtle border border-surface-border">
            {study.results.map((res, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-surface-card border border-surface-border">
                <div className="text-3xl font-heading font-black text-brand-primary">{res.value}</div>
                <div className="text-xs font-bold text-content mt-1">{res.label}</div>
              </div>
            ))}
          </div>

          {/* Narrative: Challenge & Strategy */}
          <div className="space-y-10 pt-4">
            <div className="space-y-3">
              <h2 className="text-2xl font-heading font-black text-content">The Growth Bottleneck</h2>
              <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-heading font-black text-content">The Performance Strategy</h2>
              <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                {study.strategy}
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl mt-12">
            <h3 className="text-2xl font-heading font-black text-content">
              Ready to replicate these numbers?
            </h3>
            <p className="text-xs sm:text-sm text-content-muted max-w-md mx-auto">
              Submit your project brief and let our senior team engineer a tailored roadmap for your revenue goals.
            </p>
            <div className="pt-2">
              <Link to="/get-a-quote">
                <Button variant="primary" size="md">
                  Get a Quote for Your Brand <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

          </>
  );
}
