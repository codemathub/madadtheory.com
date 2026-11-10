import React from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
            <FileText className="w-4 h-4" />
            <span>Client Agreements</span>
          </div>
          <h1 className="text-4xl font-extrabold text-text-main dark:text-text-main-dark tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm text-text-muted dark:text-text-muted-dark">
            Effective as of November 2026 • Mad Ad Theory
          </p>
        </header>

        <div className="prose prose-purple dark:prose-invert max-w-none text-text-main dark:text-text-main-dark space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Scope of Engagement</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              Mad Ad Theory provides performance marketing, paid media strategy, website engineering, workflow automation, and creative production services governed by individual Statements of Work (SOWs) entered into between Mad Ad Theory and the client organization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Performance Objectives & Ad Spend</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              While our strategies are engineered to achieve target ROAS, CPA, and revenue multiples, all advertising network budgets are disbursed directly by the client to advertising platforms (e.g., Meta Ads, Google Ads). Mad Ad Theory manages campaign execution with rigor and analytical governance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Intellectual Property Rights</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              Upon full settlement of contracted invoices, all bespoke creative assets, ad creatives, custom software source code, and design collateral produced specifically for the client become the exclusive property of the client. Proprietary agency operating models and pre-existing software frameworks remain the property of Mad Ad Theory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Client Approvals and Milestone Sign-off</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              Deliverables submitted through the Mad Ad Theory Client Portal require formal review within five (5) business days. Approval signals authorization for deployment and advancement to subsequent project phases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Governing Law</h2>
            <p className="text-text-muted dark:text-text-muted-dark">
              These terms and all related client agreements are governed by the laws of India, subject to the exclusive jurisdiction of the competent courts in New Delhi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

