import React, { useState, useEffect, useRef } from "react";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GoogleReview {
  id: string;
  author: string;
  role?: string;
  avatarBg: string;
  initials: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified: boolean;
}

export const initialGoogleReviews: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Aman Sharma",
    role: "D2C Brand Founder",
    avatarBg: "bg-blue-600",
    initials: "AS",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Working with the team was an absolute game changer for our store. They restructured our Meta and Google campaigns and noticeably improved our return within the first 6 weeks. Transparent, responsive, and genuinely hands-on.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Pooja Verma",
    role: "Retail Director",
    avatarBg: "bg-purple-600",
    initials: "PV",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Outstanding experience. The team is super prompt on communication, gives clear reports, and produces high-converting video and banner creatives every week. Highly recommended.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Rohan Mehta",
    role: "E-commerce Merchant",
    avatarBg: "bg-emerald-600",
    initials: "RM",
    rating: 5,
    timeAgo: "1 month ago",
    text: "They redesigned our checkout pages and optimized our ad spend. The bounce rate dropped significantly and order volume climbed. Professional team that actually understands unit economics.",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Kavita Singh",
    role: "Operations Head",
    avatarBg: "bg-amber-600",
    initials: "KS",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Exceptional delivery on web development and automated WhatsApp lead routing. Zero leads dropped, fast page speeds, and flawless execution throughout.",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Siddharth Malhotra",
    role: "Tech Entrepreneur",
    avatarBg: "bg-rose-600",
    initials: "SM",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Hands down the most reliable agency partner we've had. Clean technical setups, direct access to the team, and real results without any corporate fluff.",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Neha Gupta",
    role: "Marketing Manager",
    avatarBg: "bg-cyan-600",
    initials: "NG",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Great creative output and solid ad strategy. They test fresh hooks constantly to keep performance consistent. Always available when we need updates.",
    verified: true,
  },
];

const GOOGLE_MAPS_LINK = "https://share.google/DlannEj2QMIIhqBc6";

export function GoogleReviewsSlider() {
  const [reviews, setReviews] = useState<GoogleReview[]>(() => {
    try {
      const saved = localStorage.getItem("mat_google_reviews");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialGoogleReviews;
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem("mat_google_reviews");
        if (saved) {
          setReviews(JSON.parse(saved));
        } else {
          setReviews(initialGoogleReviews);
        }
      } catch {}
    };

    window.addEventListener("google_reviews_updated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("google_reviews_updated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(380);

  // Measure card width and responsive items
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }

      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const t = setTimeout(updateDimensions, 100);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(t);
    };
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  // Fast Auto-Slide every 1.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 1800);

    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="py-20 md:py-24 bg-slate-50/60 dark:bg-[#0E0A16]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar with Google Rating proof (No "Google Business Verified Reviews" text) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
              Real Reviews from Real Clients
            </h2>

            {/* Google Rating Star Badge */}
            <div className="flex items-center gap-3 pt-1">
              <span className="font-heading font-black text-3xl text-slate-900 dark:text-white">
                4.8
              </span>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#151020] text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-purple-500 hover:text-purple-600 transition-colors shadow-sm"
            >
              <span>View on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ─── Smooth Hardware-Accelerated Sliding Track ─── */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + 24)}px)`,
            }}
          >
            {reviews.map((rev, idx) => (
              <div
                key={rev.id}
                ref={idx === 0 ? cardRef : undefined}
                className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl p-6 bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 shadow-md shadow-slate-900/5 hover:border-purple-500/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm shrink-0",
                          rev.avatarBg
                        )}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white leading-tight">
                          {rev.author}
                        </h4>
                        {rev.role && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                            {rev.role}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Google Icon */}
                    <svg className="w-5 h-5 shrink-0 opacity-80" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>

                  {/* Stars and Date */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">•</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {rev.timeAgo}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Client Feedback
                  </span>
                  <span className="font-medium text-slate-400">Delhi, India</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "w-8 bg-purple-600 dark:bg-purple-400"
                  : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
