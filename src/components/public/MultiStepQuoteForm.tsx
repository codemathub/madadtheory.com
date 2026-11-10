import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/servicesData";
import { cn } from "@/lib/utils";
import { saveLead } from "@/lib/leadsStore";

interface QuoteFormData {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;
  services: string[];
  industry?: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  consentGiven: boolean;
}

export function MultiStepQuoteForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Performance Marketing"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      budgetRange: "₹1,50,000 – ₹3,00,000 / mo",
      timeline: "Immediate (Within 2 weeks)",
      consentGiven: true,
      services: ["Performance Marketing"],
    },
  });

  const toggleService = (title: string) => {
    let next: string[];
    if (selectedServices.includes(title)) {
      next = selectedServices.filter((s) => s !== title);
    } else {
      next = [...selectedServices, title];
    }
    setSelectedServices(next);
    setValue("services", next);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        websiteUrl: data.websiteUrl,
        services: selectedServices,
        industry: data.industry,
        budgetRange: data.budgetRange,
        timeline: data.timeline,
        projectDescription: data.projectDescription,
        sourceUrl: typeof window !== "undefined" ? window.location.href : "",
      };

      const stored = saveLead(payload);
      setSubmissionSuccess(stored.refNumber);

      // Also attempt backend API if configured
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, consentGiven: data.consentGiven }),
      }).catch(() => {});
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="bg-surface-card border border-surface-border rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-black uppercase text-brand-primary tracking-widest block mb-2">
          Enquiry Received & Registered
        </span>
        <h3 className="text-2xl sm:text-3xl font-heading font-black text-content">
          Your Project Brief is in Good Hands
        </h3>
        <p className="text-content-muted text-sm sm:text-base mt-3 max-w-md mx-auto">
          Our senior performance strategist will analyze your requirements and reach out within 24 business hours.
        </p>

        <div className="mt-8 p-4 rounded-2xl bg-surface-subtle border border-surface-border max-w-xs mx-auto">
          <span className="text-[11px] font-bold text-content-muted block uppercase tracking-wider">
            Unique Reference ID
          </span>
          <span className="text-lg font-mono font-bold text-brand-primary tracking-wider">
            {submissionSuccess}
          </span>
        </div>

        <div className="mt-8">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Submit Another Project Brief
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono",
              step === 1 ? "bg-brand-primary text-white" : "bg-brand-soft text-brand-primary"
            )}
          >
            1
          </div>
          <span className="text-xs font-bold text-content hidden sm:inline">Select Capabilities</span>
        </div>
        <div className="w-10 h-0.5 bg-surface-border" />
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono",
              step === 2 ? "bg-brand-primary text-white" : "bg-surface-subtle text-content-muted"
            )}
          >
            2
          </div>
          <span className="text-xs font-bold text-content hidden sm:inline">Project Scope</span>
        </div>
        <div className="w-10 h-0.5 bg-surface-border" />
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono",
              step === 3 ? "bg-brand-primary text-white" : "bg-surface-subtle text-content-muted"
            )}
          >
            3
          </div>
          <span className="text-xs font-bold text-content hidden sm:inline">Brand Details</span>
        </div>
      </div>

      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-heading font-black text-xl text-content">
                What growth capabilities do you need?
              </h3>
              <p className="text-content-muted text-xs sm:text-sm mt-1">
                Select one or more services to tailor your performance brief.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesData.map((s) => {
                const isSelected = selectedServices.includes(s.title);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleService(s.title)}
                    className={cn(
                      "p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all",
                      isSelected
                        ? "border-brand-primary bg-brand-soft/30 shadow-sm"
                        : "border-surface-border bg-surface hover:border-brand-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 shrink-0",
                        isSelected ? "bg-brand-primary border-brand-primary text-white" : "border-surface-border"
                      )}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-content">{s.title}</div>
                      <div className="text-[11px] text-content-muted line-clamp-1">{s.shortSummary}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="primary"
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
              >
                Continue to Scope <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: BUDGET & TIMELINE */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-heading font-black text-xl text-content">Project Parameters</h3>
              <p className="text-content-muted text-xs sm:text-sm mt-1">
                Help us match your project with the appropriate strategy and senior team capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-content block">Approximate Monthly Budget</label>
                <select
                  {...register("budgetRange")}
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                >
                  <option value="₹75,000 – ₹1,50,000 / mo">₹75,000 – ₹1,50,000 / mo</option>
                  <option value="₹1,50,000 – ₹3,00,000 / mo">₹1,50,000 – ₹3,00,000 / mo</option>
                  <option value="₹3,00,000 – ₹7,00,000 / mo">₹3,00,000 – ₹7,00,000 / mo</option>
                  <option value="₹7,00,000+ / mo (Enterprise Scale)">₹7,00,000+ / mo (Enterprise Scale)</option>
                  <option value="One-Time Fixed Project Scope">One-Time Fixed Project Scope</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-content block">Target Timeline</label>
                <select
                  {...register("timeline")}
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                >
                  <option value="Immediate (Within 2 weeks)">Immediate (Within 2 weeks)</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="1 – 3 Months">1 – 3 Months</option>
                  <option value="Exploring & Planning">Exploring & Planning</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-content block">
                Project Description & Targets <span className="text-brand-primary">*</span>
              </label>
              <textarea
                {...register("projectDescription", {
                  required: "Please describe your project objectives and targets",
                  minLength: { value: 20, message: "Please provide at least 20 characters" },
                })}
                rows={4}
                placeholder="Share your current challenges, target ROAS/sales, platforms, or systems you want built or optimized..."
                className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
              />
              {errors.projectDescription && (
                <span className="text-xs text-rose-500 block">{errors.projectDescription.message}</span>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button type="button" variant="primary" onClick={() => setStep(3)}>
                Continue to Details <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & BRAND DETAILS */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-heading font-black text-xl text-content">Contact & Company Info</h3>
              <p className="text-content-muted text-xs sm:text-sm mt-1">
                Where should we send your preliminary performance audit and proposal?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content block">Full Name *</label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                />
                {errors.fullName && <span className="text-xs text-rose-500">{errors.fullName.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content block">Work Email *</label>
                <input
                  type="email"
                  {...register("email", { required: "Valid work email is required" })}
                  placeholder="rahul@company.com"
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                />
                {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content block">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-content block">Company / Brand Name *</label>
                <input
                  type="text"
                  {...register("companyName", { required: "Company name is required" })}
                  placeholder="e.g. Apex Retail Pvt Ltd"
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                />
                {errors.companyName && (
                  <span className="text-xs text-rose-500">{errors.companyName.message}</span>
                )}
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-content block">Website or Social Profile URL</label>
                <input
                  type="url"
                  {...register("websiteUrl")}
                  placeholder="https://yourbrand.com"
                  className="w-full text-xs p-3 rounded-xl border border-surface-border bg-surface text-content focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consentGiven", {
                    required: "You must consent to our privacy policy to proceed",
                  })}
                  className="mt-0.5 rounded text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-xs text-content-muted">
                  I agree to Mad Ad Theory storing my details for project communication per the{" "}
                  <a href="/privacy-policy" target="_blank" className="text-brand-primary underline">
                    Privacy Policy
                  </a>
                  . We never share or sell client information.
                </span>
              </label>
              {errors.consentGiven && (
                <span className="text-xs text-rose-500 block mt-1">{errors.consentGiven.message}</span>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-surface-border">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                Submit Project Brief <ShieldCheck className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

