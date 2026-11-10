import { useState, useEffect } from "react";

export interface SiteContentData {
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  metricRoas: string;
  metricDataDriven: string;
  metricBrandsScaled: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  footerNotice: string;
  copyrightText: string;
  announcementText: string;
  logoUrl?: string;
  bannerEnabled?: boolean;
  bannerLink?: string;
  bannerText?: string;
  updatedAt?: string;
}

const DEFAULT_CONTENT: SiteContentData = {
  heroHeadline: "You set the target. We hit it.",
  heroSubheadline:
    "Data-engineered paid advertising, custom web technology, and automated business workflows designed to scale brands profitably.",
  heroBadge: "Performance Marketing Agency",
  metricRoas: "3x–5x",
  metricDataDriven: "100%",
  metricBrandsScaled: "60+",
  contactEmail: "info@nerditia.com",
  contactPhone: "+91 99536 09096",
  officeAddress:
    "C-7/307, Ground Floor, Lawrence Road, Keshav Puram, New Delhi, Delhi 110035, India",
  footerNotice:
    "Mad Ad Theory — Performance marketing agency delivering measurable growth across paid media and custom web platforms.",
  copyrightText: "© 2026 Mad Ad Theory. All rights reserved.",
  announcementText:
    "Now onboarding select performance ad accounts for the upcoming growth cycle.",
  logoUrl: "/images/logo-raw.jpeg",
  bannerEnabled: true,
  bannerLink: "/contact",
  bannerText:
    "Now onboarding select performance ad accounts for the upcoming growth cycle.",
};

const STORAGE_KEY = "mat_site_content_cache";

// In-memory active content
let activeContent: SiteContentData = (() => {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return { ...DEFAULT_CONTENT, ...JSON.parse(cached) };
    } catch {}
  }
  return DEFAULT_CONTENT;
})();

const listeners = new Set<(content: SiteContentData) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener(activeContent));
}

// Fetch from backend API
export async function syncContentFromApi(): Promise<SiteContentData> {
  try {
    const res = await fetch("/api/content");
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.content) {
        activeContent = { ...DEFAULT_CONTENT, ...data.content };
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(activeContent));
        }
        notifyListeners();
      }
    }
  } catch (err) {
    // Graceful offline fallback
  }
  return activeContent;
}

// Update content from Admin CMS
export async function updateSiteContent(
  updates: Partial<SiteContentData>
): Promise<SiteContentData> {
  activeContent = { ...activeContent, ...updates };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeContent));
  }
  notifyListeners();

  try {
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.content) {
        activeContent = { ...activeContent, ...data.content };
        notifyListeners();
      }
    }
  } catch (err) {
    // Keep local changes if offline
  }

  return activeContent;
}

// React Hook to access live content in any component
export function useSiteContent() {
  const [content, setContent] = useState<SiteContentData>(activeContent);

  useEffect(() => {
    // Subscribe to updates
    const listener = (newContent: SiteContentData) => {
      setContent({ ...newContent });
    };
    listeners.add(listener);

    // Initial sync
    syncContentFromApi();

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return content;
}
