import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { usePortfolio } from "@/lib/portfolioStore";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Portfolio() {
  const portfolioData = usePortfolio();
  useEffect(() => {
    document.title = "Client Results & Case Studies — Mad Ad Theory";
  }, []);

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="cyan">Case Studies</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-content">
              Real Brands. Real Results.
            </h1>
            <p className="text-content-muted text-base sm:text-lg leading-relaxed">
              Explore our recent work across paid advertising, web development, and campaign scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.map((study) => (
              <Card key={study.id} hoverEffect className="flex flex-col justify-between p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-primary">{study.industry}</span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
                      ROAS Result
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-content leading-snug">
                    {study.headline}
                  </h3>

                  <p className="text-xs text-content-muted leading-relaxed line-clamp-3">
                    {study.challenge}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-surface-border">
                    {study.results.map((r, i) => (
                      <div key={i} className="text-center p-2.5 rounded-xl bg-surface-subtle">
                        <div className="text-lg font-black text-brand-primary">{r.value}</div>
                        <div className="text-[10px] text-content-muted font-medium">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-border">
                  <Link to={`/case-studies/${study.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-content hover:text-brand-primary transition-colors"
                  >
                    <span>Inspect Strategy & Metrics</span>
                    <ChevronRight className="w-4 h-4 text-brand-primary" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-content">
              Want These Results for Your Brand?
            </h3>
            <p className="text-content-muted text-sm max-w-lg mx-auto">
              Schedule a preliminary performance review and let us evaluate what ROAS target your brand can sustainably achieve.
            </p>
            <div className="pt-2">
              <Link to="/get-a-quote">
                <Button variant="primary" size="lg">
                  Submit Your Brief <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

          </>
  );
}
