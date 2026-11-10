import React, { useEffect } from "react";
import { MultiStepQuoteForm } from "@/components/public/MultiStepQuoteForm";
import { Badge } from "@/components/ui/Badge";

export default function GetAQuote() {
  useEffect(() => {
    document.title = "Get a Quote & Project Estimate — Mad Ad Theory";
  }, []);

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="cyan">Interactive Project Brief</Badge>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-content tracking-tight">
              Request a Performance <span className="text-brand-primary">Growth Audit</span>
            </h1>
            <p className="text-content-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Tell us about your brand targets, existing numbers, and timelines. We analyze your requirements and engineer a clear roadmap to hit your goals.
            </p>
          </div>

          <MultiStepQuoteForm />
        </div>
      </main>

          </>
  );
}

