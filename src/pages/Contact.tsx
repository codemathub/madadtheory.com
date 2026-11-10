import React, { useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Star, ExternalLink } from "lucide-react";
import { MultiStepQuoteForm } from "@/components/public/MultiStepQuoteForm";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const GOOGLE_BUSINESS_LINK = "https://share.google/DlannEj2QMIIhqBc6";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us — Mad Ad Theory";
  }, []);

  return (
    <main className="flex-1 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="purple">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
            Let's Talk About Your <span className="text-purple-600 dark:text-purple-400">Growth Targets</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Reach out directly by phone, email, or brief submission. You can also visit our physical office in Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-8 space-y-6 bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 shadow-lg">
              <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                Contact Details
              </h3>

              <div className="space-y-5">
                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      Office Address
                    </span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 leading-snug">
                      C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India
                    </p>
                    <a
                      href={GOOGLE_BUSINESS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline mt-1.5"
                    >
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      Phone Number
                    </span>
                    <a
                      href="tel:+919953609096"
                      className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 block mt-0.5"
                    >
                      +91 99536 09096
                    </a>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Available Mon – Sat for direct calls
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:info@nerditia.com"
                      className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 block mt-0.5"
                    >
                      info@nerditia.com
                    </a>
                    <a
                      href="mailto:hello@madadtheory.com"
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-purple-600 block mt-0.5"
                    >
                      hello@madadtheory.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      Working Hours
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      Monday – Saturday: 10:00 AM – 7:00 PM
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      Sunday: Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Business Rating Strip */}
              <div className="pt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    4.8 / 5.0
                  </span>
                </div>
                <a
                  href={GOOGLE_BUSINESS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <span>Google Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <MultiStepQuoteForm />
          </div>
        </div>
      </div>
    </main>
  );
}
