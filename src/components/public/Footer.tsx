import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Youtube,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { saveLead } from "@/lib/leadsStore";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (emailToCopy: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailToCopy);
      setCopiedEmail(emailToCopy);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) return;

    setIsSubmitting(true);
    try {
      // 1. Save to client leads store (instant local state + sync)
      saveLead({
        fullName: cleanEmail.split("@")[0],
        email: cleanEmail,
        companyName: "Newsletter Subscriber",
        approxBudget: "Subscriber",
        projectDescription: "Subscribed to marketing insights and growth tips in footer.",
        servicesRequired: ["Newsletter Insights"],
        sourceUrl: window.location.href,
      });

      // 2. Direct API call to backend subscribe endpoint
      await fetch("/api/leads/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, sourceUrl: window.location.href }),
      }).catch(() => {});

      // 3. Save to dedicated subscribers list in localStorage
      try {
        const existing: string[] = JSON.parse(
          localStorage.getItem("mat_newsletter_subscribers") || "[]"
        );
        if (!existing.includes(cleanEmail)) {
          localStorage.setItem(
            "mat_newsletter_subscribers",
            JSON.stringify([cleanEmail, ...existing])
          );
        }
      } catch {}

      setSubscribedEmail(cleanEmail);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setSubscribedEmail(cleanEmail);
      setSubscribed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-slate-50 dark:bg-[#020713] text-slate-800 dark:text-white overflow-hidden mt-auto pt-8 transition-colors duration-200">
      {/* ─── Main Curved Cosmic Footer Card (Both Light & Dark Mode Friendly) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-[36px] sm:rounded-t-[48px] border-t border-x border-slate-200/90 dark:border-[#1E4976]/70 bg-gradient-to-b from-white via-slate-50 to-slate-100/90 dark:from-[#091E42] dark:via-[#05142E] dark:to-[#020A17] p-8 sm:p-12 lg:p-16 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_-25px_60px_rgba(0,100,220,0.15)] relative transition-colors duration-200">
          
          {/* ─── 1. Four Social Media Channels ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@nerditians"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-purple-500/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 group-hover:border-purple-500/50 dark:group-hover:border-cyan-400/50 group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-all shadow-sm">
                <Youtube className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                YouTube
              </span>
              <span className="text-xs text-slate-500 dark:text-blue-200/70 leading-snug">
                Watch Our Growth Stories
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/nerditia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-purple-500/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 group-hover:border-purple-500/50 dark:group-hover:border-cyan-400/50 group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-all shadow-sm">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                Instagram
              </span>
              <span className="text-xs text-slate-500 dark:text-blue-200/70 leading-snug">
                See Our Creative Campaigns
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/nerditia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-purple-500/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 group-hover:border-purple-500/50 dark:group-hover:border-cyan-400/50 group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-all shadow-sm">
                <Linkedin className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                LinkedIn
              </span>
              <span className="text-xs text-slate-500 dark:text-blue-200/70 leading-snug">
                Connect With Our Team
              </span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/nerditia"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-3 rounded-2xl hover:bg-purple-500/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 group-hover:border-purple-500/50 dark:group-hover:border-cyan-400/50 group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-all shadow-sm">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors">
                Facebook
              </span>
              <span className="text-xs text-slate-500 dark:text-blue-200/70 leading-snug">
                Join Our Community
              </span>
            </a>
          </div>

          {/* ─── Divider ─── */}
          <div className="border-t border-slate-200/80 dark:border-[#1E4976]/50 my-10 transition-colors" />

          {/* ─── 2. Contact Options, Direct Phone & Working Hours ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center sm:text-left">
            {/* Email Column with Contact Us Button */}
            <div className="space-y-2">
              <span className="text-xs text-slate-500 dark:text-blue-200/70 font-semibold block">
                Write to us via Email:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5">
                  <a
                    href="mailto:info@nerditia.com"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-cyan-400 transition-colors inline-block"
                  >
                    info@nerditia.com
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleCopyEmail("info@nerditia.com", e)}
                    title="Copy email address"
                    className="p-1 rounded-md text-slate-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {copiedEmail === "info@nerditia.com" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <span className="text-slate-400 dark:text-blue-300/40">/</span>
                <div className="inline-flex items-center gap-1.5">
                  <a
                    href="mailto:hello@madadtheory.com"
                    className="text-xs text-slate-600 dark:text-blue-200/80 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors inline-block"
                  >
                    hello@madadtheory.com
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleCopyEmail("hello@madadtheory.com", e)}
                    title="Copy email address"
                    className="p-1 rounded-md text-slate-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {copiedEmail === "hello@madadtheory.com" ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm shadow-purple-600/20 active:scale-95"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Direct Contact & Location Column */}
            <div className="space-y-1 border-y md:border-y-0 md:border-x border-slate-200 dark:border-[#1E4976]/40 py-4 md:py-0 md:px-8 text-center transition-colors">
              <span className="text-xs text-slate-500 dark:text-blue-200/70 font-semibold block">
                Direct Call & Office Desk:
              </span>
              <a
                href="tel:+919953609096"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-cyan-400 transition-colors inline-block"
              >
                +91 99536 09096
              </a>
            </div>

            {/* Working Hours Column */}
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs text-slate-500 dark:text-blue-200/70 font-semibold block">
                Monday to Friday
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
                10:00 AM to 06:00 PM
              </span>
              <span className="text-[11px] text-slate-400 dark:text-blue-200/60 block">
                New Delhi Standard Time (IST)
              </span>
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="border-t border-slate-200/80 dark:border-[#1E4976]/50 my-10 transition-colors" />

          {/* ─── 3. Agency Overview & Growth Newsletter ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Brand & Exact Mission Copy */}
            <div className="lg:col-span-7 space-y-4">
              {/* Brand Logo Header */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-slate-200 dark:ring-cyan-400/40 shrink-0 bg-white shadow-sm">
                  <img
                    src="/images/logo-raw.jpeg"
                    alt="Mad Ad Theory Emblem"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
                    Mad Ad Theory
                  </span>
                  <span className="text-slate-400 dark:text-blue-300/40 text-sm">/</span>
                  <span className="text-xl font-black text-amber-500 font-mono">
                    !nerditia
                  </span>
                </div>
              </div>

              {/* Exact Description from nerditia.com */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/80 leading-relaxed max-w-xl">
                We are a results-driven performance marketing agency focused on helping brands scale
                through strategic advertising, creative campaigns, data-driven decisions, and
                conversion-focused growth. From social media marketing to paid ads and lead
                generation, we build campaigns that deliver measurable impact.
              </p>

              {/* Office Address Snippet */}
              <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-blue-200/60 pt-1">
                <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India
                </span>
              </div>
            </div>

            {/* Right Column: Newsletter Subscription Box */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                Get marketing insights and growth tips in your inbox!
              </h4>

              {subscribed ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Subscription Confirmed!
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-blue-100/80 block">
                        Weekly growth insights will be sent to{" "}
                        <strong className="font-mono text-purple-600 dark:text-cyan-400">
                          {subscribedEmail}
                        </strong>
                        .
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubscribed(false)}
                    className="text-[11px] text-slate-400 hover:text-purple-600 dark:hover:text-cyan-300 underline pl-1"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="rounded-2xl border border-slate-300 dark:border-[#1E4976] bg-white dark:bg-white/5 backdrop-blur-md p-1.5 flex items-center shadow-sm transition-all focus-within:border-purple-600 dark:focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-purple-600/15">
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      disabled={isSubmitting}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-blue-200/50 text-xs sm:text-sm px-4 py-2.5 focus:outline-none disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-heading font-black text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md shrink-0 active:scale-95 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ─── 4. Bottom Copyright Bar ─── */}
          <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-[#1E4976]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-blue-200/60 transition-colors">
            <div>
              © 2026 Nerditia. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/gallery" className="hover:text-purple-600 dark:hover:text-cyan-300 transition-colors">
                Gallery
              </Link>
              <Link to="/blog" className="hover:text-purple-600 dark:hover:text-cyan-300 transition-colors">
                Blog
              </Link>
              <Link to="/privacy-policy" className="hover:text-purple-600 dark:hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-purple-600 dark:hover:text-cyan-300 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Floating WhatsApp Action Button ─── */}
      <a
        href="https://wa.me/919953609096"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.927l-1.572 5.742 5.897-1.547c1.706.929 3.657 1.464 5.729 1.464 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
      </a>
    </footer>
  );
}
