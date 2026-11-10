import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useServicesData } from "@/lib/servicesStore";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Services() {
  const servicesData = useServicesData();
  useEffect(() => {
    document.title = "Performance Capabilities & Services — Mad Ad Theory";
  }, []);

  const categories = ["Marketing", "Technology", "Automation", "Creative"] as const;

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="purple">Performance Directory</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-content">
              Engineered Capabilities Built for <span className="text-brand-primary">Measurable Scale</span>
            </h1>
            <p className="text-content-muted text-base sm:text-lg leading-relaxed">
              We provide 16 connected disciplines across paid advertising, web engineering, workflow automation, and creative production. Every service is measured against revenue impact.
            </p>
          </div>

          {categories.map((category) => {
            const list = servicesData.filter((s) => s.category === category);
            return (
              <section key={category} className="space-y-6 pt-6 border-t border-surface-border">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black uppercase text-brand-primary tracking-widest">
                    {category} Division
                  </span>
                  <div className="h-0.5 flex-1 bg-surface-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {list.map((service) => (
                    <Card key={service.id} hoverEffect className="flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-content-muted uppercase">
                          {service.category}
                        </span>
                        <h3 className="font-heading font-bold text-lg text-content">{service.title}</h3>
                        <p className="text-xs text-content-muted leading-relaxed line-clamp-3">
                          {service.shortSummary}
                        </p>
                      </div>

                      <div className="pt-5 mt-5 border-t border-surface-border">
                        <Link to={`/services/${service.slug}`}
                          className="inline-flex items-center justify-between w-full text-xs font-bold text-brand-primary group"
                        >
                          <span>Explore Deliverables</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-content">
              Need a Customized Growth Strategy?
            </h3>
            <p className="text-content-muted text-sm max-w-lg mx-auto">
              Our strategists can audit your existing funnels and assemble the exact combination of services required to meet your targets.
            </p>
            <div className="pt-2">
              <Link to="/get-a-quote">
                <Button variant="primary" size="lg">
                  Request Custom Strategy <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

          </>
  );
}
