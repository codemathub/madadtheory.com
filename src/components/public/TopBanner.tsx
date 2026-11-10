import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Megaphone, ArrowRight, X } from "lucide-react";
import { useSiteContent } from "@/lib/siteContentStore";

export function TopBanner() {
  const content = useSiteContent();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("mat_banner_dismissed") === "true") {
        setIsDismissed(true);
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("mat_banner_dismissed", "true");
    } catch {}
  };

  const isEnabled = content?.bannerEnabled !== false;
  const message = content?.bannerText || content?.announcementText;
  const link = content?.bannerLink || "/contact";

  if (!isEnabled || !message?.trim() || isDismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative z-50 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white border-b border-purple-500/20 py-2.5 px-4 sm:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px] uppercase tracking-wider border border-purple-500/30">
            <Megaphone className="w-3 h-3 text-purple-400 shrink-0" />
            <span>Announcement</span>
          </span>

          <span className="text-slate-200 font-medium">{message}</span>

          {link && (
            <Link
              to={link}
              className="inline-flex items-center gap-1 font-bold text-purple-300 hover:text-white underline underline-offset-2 hover:underline-offset-4 transition-all ml-1"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default TopBanner;
