import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, Zap, Target, Award, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCareers } from "@/lib/careersStore";

export default function Careers() {
  const roles = useCareers();
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" />
            <span>Join Our Growth Force</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-main dark:text-text-main-dark tracking-tight mb-6">
            Build the future of <span className="text-brand-purple">performance marketing</span>
          </h1>
          <p className="text-lg text-text-muted dark:text-text-muted-dark leading-relaxed">
            We are mathematicians, creative scientists, and engineering obsessives driven by one singular mandate: quantifiable revenue acceleration.
          </p>
        </div>

        {/* Culture / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mb-3">
              Radical Accountability
            </h3>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              We judge results by cash-collected revenue and blended ROAS, not vanity engagement. Every team member has clear ownership.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mb-3">
              Velocity & Experimentation
            </h3>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              Winning brands test faster. We run weekly creative iterations and technical optimizations, rewarding rapid learning.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mb-3">
              Elite Compensation
            </h3>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
              Top-of-market base compensation paired with performance bonuses tied to account scaling milestones.
            </p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-text-main dark:text-text-main-dark mb-8">
            Open Opportunities
          </h2>
          <div className="space-y-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="p-8 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark hover:border-brand-purple/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple">
                      {role.department}
                    </span>
                    <span className="text-xs text-text-muted dark:text-text-muted-dark flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {role.location}
                    </span>
                    <span className="text-xs text-text-muted dark:text-text-muted-dark flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {role.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main dark:text-text-main-dark">
                    {role.title}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <a href={`mailto:careers@madadtheory.com?subject=Application for ${encodeURIComponent(role.title)}`}>
                    <Button className="rounded-xl">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Application */}
        <div className="p-10 rounded-3xl bg-brand-purple/5 border border-brand-purple/20 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-text-main dark:text-text-main-dark mb-3">
            Don't see your specific role?
          </h3>
          <p className="text-text-muted dark:text-text-muted-dark mb-6">
            We are always scouting exceptional performance talent. Send your portfolio and track record directly to our leadership team.
          </p>
          <a href="mailto:careers@madadtheory.com?subject=General Talent Application - Mad Ad Theory">
            <Button variant="outline" className="rounded-xl">
              Send Open Application
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

