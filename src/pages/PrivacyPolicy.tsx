import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-brand-purple hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <header className="mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Compliance</span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-main dark:text-text-main-dark tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted dark:text-text-muted-dark">
            Last updated: November 2026 • Mad Ad Theory
          </p>
        </header>

        <div className="prose prose-purple dark:prose-invert max-w-none text-text-main dark:text-text-main-dark space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              When you submit an enquiry, request a quote, or engage with our services, Mad Ad Theory collects information including your full name, work email address, telephone number, company name, website URL, approximate marketing budget, and project requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              We process your information strictly to evaluate project scope, deliver customized performance marketing proposals, communicate project milestones, provide authorized client portal access, and fulfill contractual obligations. We never sell, rent, or lease client data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Attribution and Analytics Data</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              In managing performance campaigns, Mad Ad Theory configures first-party analytics, server-side tracking, and conversion APIs on client properties. All campaign attribution data remains the exclusive property of the respective client and is handled under strict non-disclosure terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Data Security</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              We implement enterprise-grade technical safeguards including TLS 1.3 encryption in transit, AES-256 encryption at rest, role-based access restrictions, and audited session authentication to safeguard client communications and business records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Contact Information</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              For any questions regarding our data practices or to request data deletion, contact our privacy compliance officer at{" "}
              <a href="mailto:privacy@madadtheory.com" className="text-brand-purple font-semibold">
                privacy@madadtheory.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

