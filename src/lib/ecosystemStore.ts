import { useState, useEffect } from "react";

export interface EcosystemProject {
  id: string;
  categoryId: "performance-marketing" | "software-tech" | "automation-crm" | "influencer-creative";
  number: string;
  title: string;
  shortTag: string;
  summary: string;
  liveUrl: string;
  imageUrl?: string;
  serviceSlug: string;
  status: "Active & Scaling" | "Production Live" | "100% Operational" | "Delivered & Live";
  kpis: { label: string; value: string; note: string }[];
  techStack: string[];
}

export interface EcosystemCategory {
  id: "performance-marketing" | "software-tech" | "automation-crm" | "influencer-creative";
  title: string;
  subtitle: string;
  iconName: "Target" | "Code" | "Zap" | "Sparkles";
}

export const initialCategories: EcosystemCategory[] = [
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    subtitle: "Paid Meta & Google Ads, ROAS Scaling",
    iconName: "Target",
  },
  {
    id: "software-tech",
    title: "Web & Software",
    subtitle: "Next.js Platforms & Fast Checkout",
    iconName: "Code",
  },
  {
    id: "automation-crm",
    title: "Workflow Automation",
    subtitle: "CRM Sync & WhatsApp Pipelines",
    iconName: "Zap",
  },
  {
    id: "influencer-creative",
    title: "Influencer & Creative",
    subtitle: "Direct-Response UGC & Creator Roster",
    iconName: "Sparkles",
  },
];

export const initialEcosystemProjects: EcosystemProject[] = [
  // --- Performance Marketing ---
  {
    id: "pm-1",
    categoryId: "performance-marketing",
    number: "01",
    title: "D2C Fashion ROAS Sprint",
    shortTag: "4.82x ROAS",
    summary: "Full-funnel Meta and Google Shopping acquisition engine with CAPI server-side tracking, scaling ad spend profitably.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "performance-marketing",
    status: "Active & Scaling",
    kpis: [
      { label: "Blended ROAS", value: "4.82x", note: "Meta & Google Ads" },
      { label: "Monthly Volume", value: "₹1.35 Cr", note: "Attributed Revenue" },
      { label: "Blended CAC", value: "₹420", note: "34% Lower Cost" },
      { label: "Attribution", value: "100%", note: "Zero Signal Loss" },
    ],
    techStack: ["Meta CAPI", "Google Ads", "Shopify Plus", "Klaviyo"],
  },
  {
    id: "pm-2",
    categoryId: "performance-marketing",
    number: "02",
    title: "B2B SaaS Inbound Pipeline",
    shortTag: "148 Demos / mo",
    summary: "High-intent Google Search and LinkedIn InMail acquisition driving sales-qualified enterprise demos.",
    liveUrl: "https://nerditia.com/services",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "performance-marketing",
    status: "Active & Scaling",
    kpis: [
      { label: "Qualified Demos", value: "148 / mo", note: "Sales Accepted" },
      { label: "Cost Per Demo", value: "₹2,850", note: "42% Reduction" },
      { label: "Pipeline Value", value: "₹3.8 Cr", note: "Active Pipeline" },
      { label: "Demo Close Rate", value: "24.6%", note: "High Intent" },
    ],
    techStack: ["Google Search", "LinkedIn Ads", "HubSpot CRM", "Next.js"],
  },
  {
    id: "pm-3",
    categoryId: "performance-marketing",
    number: "03",
    title: "High-Ticket E-com Retargeting",
    shortTag: "6.40x ROAS",
    summary: "Sequential multi-touch retargeting for luxury lifestyle products with 7–14 day customer decision journeys.",
    liveUrl: "https://nerditia.com/portfolio",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "performance-marketing",
    status: "Active & Scaling",
    kpis: [
      { label: "Retargeting ROAS", value: "6.40x", note: "Warm Audiences" },
      { label: "Average Order Value", value: "₹18,400", note: "Cross-Sell Bundles" },
      { label: "Cart Recovery", value: "31.2%", note: "WhatsApp Followup" },
      { label: "Frequency Cap", value: "2.4x / wk", note: "Zero Ad Fatigue" },
    ],
    techStack: ["Meta Ads", "WhatsApp Cloud", "Shopify", "Triple Whale"],
  },
  {
    id: "pm-4",
    categoryId: "performance-marketing",
    number: "04",
    title: "Google Shopping & PMax",
    shortTag: "5.15x ROAS",
    summary: "Automated Merchant Center feed optimization and tiered ROAS bidding across 12,000+ commercial SKUs.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "performance-marketing",
    status: "Active & Scaling",
    kpis: [
      { label: "PMax ROAS", value: "5.15x", note: "High Margin SKUs" },
      { label: "Impression Share", value: "76.4%", note: "#1 Niche Rank" },
      { label: "CTR Improvement", value: "+62%", note: "Feed Engineered" },
      { label: "Avg CPC", value: "₹14.20", note: "Negative Scrubbed" },
    ],
    techStack: ["Google Merchant", "PMax", "Looker Studio", "Feedonomics"],
  },

  // --- Web & Software ---
  {
    id: "st-1",
    categoryId: "software-tech",
    number: "01",
    title: "Headless Next.js Storefront",
    shortTag: "140ms TTFB",
    summary: "Sub-second React 19 and Next.js custom storefront with 1-click express checkout and 99/100 Lighthouse score.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "website-development",
    status: "Production Live",
    kpis: [
      { label: "Response Speed", value: "140ms", note: "Global Edge CDN" },
      { label: "Lighthouse Score", value: "99 / 100", note: "Core Web Vitals" },
      { label: "Mobile CVR", value: "4.65%", note: "+42% Conversion" },
      { label: "Cart Abandonment", value: "-28%", note: "Instant Checkout" },
    ],
    techStack: ["Next.js 14", "React 19", "Tailwind CSS", "Shopify Plus", "Cloudflare"],
  },
  {
    id: "st-2",
    categoryId: "software-tech",
    number: "02",
    title: "Custom SaaS Web Platform",
    shortTag: "99.98% Uptime",
    summary: "Multi-tenant web application with role-based access, Stripe billing, and high-frequency real-time WebSocket state.",
    liveUrl: "https://madadtheory.com",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "web-applications",
    status: "Production Live",
    kpis: [
      { label: "System Uptime", value: "99.98%", note: "Enterprise SLA" },
      { label: "API Latency", value: "45ms", note: "Indexed Queries" },
      { label: "Active Seats", value: "12,400+", note: "Daily Users" },
      { label: "Security Audit", value: "A+ Passed", note: "OWASP Top 10" },
    ],
    techStack: ["React 19", "Node.js", "Express", "MongoDB", "Redis", "TypeScript"],
  },
  {
    id: "st-3",
    categoryId: "software-tech",
    number: "03",
    title: "High-Converting Ad Funnel",
    shortTag: "14.8% Opt-In",
    summary: "Custom engineered landing page funnel with dynamic UTM keyword replacement and sub-second load times.",
    liveUrl: "https://nerditia.com/services",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "website-development",
    status: "Production Live",
    kpis: [
      { label: "Opt-In Conversion", value: "14.8%", note: "Top 1% Industry" },
      { label: "Bounce Rate", value: "26.4%", note: "High Dwell Time" },
      { label: "Page Load Time", value: "0.68s", note: "Under 1s Mobile" },
      { label: "Scroll Depth", value: "82%", note: "High Intent" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel Edge"],
  },
  {
    id: "st-4",
    categoryId: "software-tech",
    number: "04",
    title: "Interactive 3D WebGL Engine",
    shortTag: "60 FPS 3D",
    summary: "Real-time Three.js product visualizer allowing customers to inspect materials, shaders, and geometry in browser.",
    liveUrl: "https://madadtheory.com",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "website-development",
    status: "Production Live",
    kpis: [
      { label: "Session Time", value: "3m 42s", note: "+180% Dwell" },
      { label: "Add-To-Cart", value: "+32%", note: "Direct Lift" },
      { label: "Return Rate", value: "-45%", note: "Clear Expectation" },
      { label: "FPS Performance", value: "60 FPS", note: "Mobile Hardware Accel" },
    ],
    techStack: ["Three.js", "WebGL", "React Three Fiber", "GLTF"],
  },

  // --- Automation & CRM ---
  {
    id: "ac-1",
    categoryId: "automation-crm",
    number: "01",
    title: "WhatsApp Lead Qualification Bot",
    shortTag: "< 4.2s Reply",
    summary: "Automated WhatsApp Cloud API flow triggering in under 5 seconds of form submission with interactive calendar booking.",
    liveUrl: "https://nerditia.com/contact",
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "chatbots-whatsapp",
    status: "100% Operational",
    kpis: [
      { label: "Response Speed", value: "< 4.2s", note: "Instant Ping" },
      { label: "Qualification Rate", value: "68.4%", note: "Completed Flow" },
      { label: "Booked Calls", value: "+44%", note: "Direct Cal.com" },
      { label: "Dropped Leads", value: "0.0%", note: "100% Captured" },
    ],
    techStack: ["WhatsApp Cloud API", "Make.com", "HubSpot", "Node.js Webhook"],
  },
  {
    id: "ac-2",
    categoryId: "automation-crm",
    number: "02",
    title: "HubSpot & Zoho CRM Auto-Sync",
    shortTag: "Zero Duplicates",
    summary: "Unified CRM pipeline syncing deals, contacts, pipeline stages, and marketing UTM attribution in real time.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "crm-integration",
    status: "100% Operational",
    kpis: [
      { label: "Match Rate", value: "100%", note: "Zero Duplicates" },
      { label: "Sync Latency", value: "< 1.5s", note: "Bi-directional" },
      { label: "Attributed Revenue", value: "100%", note: "UTM to Deal" },
      { label: "Rep Hours Saved", value: "18 hrs / wk", note: "Zero Manual Entry" },
    ],
    techStack: ["HubSpot API", "Zoho CRM", "Zapier Enterprise", "PostgreSQL"],
  },
  {
    id: "ac-3",
    categoryId: "automation-crm",
    number: "03",
    title: "Stripe & Razorpay Billing Pipeline",
    shortTag: "GST Invoices",
    summary: "Automated billing pipeline generating verified GST tax invoices, provisioning user accounts, and firing onboarding.",
    liveUrl: "https://madadtheory.com",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "workflow-automation",
    status: "100% Operational",
    kpis: [
      { label: "Invoice Time", value: "< 2s", note: "Automated PDF" },
      { label: "Billing Disputes", value: "0.02%", note: "Verified Webhooks" },
      { label: "Account Setup", value: "Instant", note: "Zero Friction" },
      { label: "Admin Saved", value: "24 hrs / wk", note: "Freed Up" },
    ],
    techStack: ["Stripe API", "Razorpay", "PDFKit", "SendGrid"],
  },
  {
    id: "ac-4",
    categoryId: "automation-crm",
    number: "04",
    title: "Slack Deal War-Room Alerts",
    shortTag: "< 800ms Ping",
    summary: "Live notification pipeline streaming high-ticket sales, new leads, and key client milestones into Slack.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "workflow-automation",
    status: "100% Operational",
    kpis: [
      { label: "Alert Latency", value: "< 800ms", note: "Real-Time Ping" },
      { label: "Response Time", value: "3.2m", note: "Fast Followup" },
      { label: "High-Ticket Won", value: "100%", note: "Team Celebrated" },
      { label: "Slack Actions", value: "1-Click", note: "Claim in Chat" },
    ],
    techStack: ["Slack API", "Block Kit", "Node.js", "Express"],
  },

  // --- Influencer & Creative ---
  {
    id: "ic-1",
    categoryId: "influencer-creative",
    number: "01",
    title: "D2C Viral UGC Hook Matrix",
    shortTag: "48.6% Hook Rate",
    summary: "High-volume creator sourcing and script testing delivering 20+ bespoke ad creatives monthly for thumb-stopping ads.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "influencer-marketing",
    status: "Delivered & Live",
    kpis: [
      { label: "3-Sec Hook Rate", value: "48.6%", note: "Thumb-Stop Rate" },
      { label: "CTR Improvement", value: "+62%", note: "Vs Static Ads" },
      { label: "Video Cost", value: "₹4,500", note: "Pre-Negotiated" },
      { label: "Creative Fatigue", value: "0 Days", note: "Weekly Fresh Batches" },
    ],
    techStack: ["CapCut Pro", "Premiere Pro", "Frame.io", "Meta Creative Hub"],
  },
  {
    id: "ic-2",
    categoryId: "influencer-creative",
    number: "02",
    title: "Creator Whitelisting Ads",
    shortTag: "4.45x ROAS",
    summary: "Running paid Meta and TikTok ads directly through verified creator handles for organic credibility and cheaper CPMs.",
    liveUrl: "https://nerditia.com/portfolio",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "influencer-marketing",
    status: "Delivered & Live",
    kpis: [
      { label: "CPM Reduction", value: "-28%", note: "Cheaper Reach" },
      { label: "Blended ROAS", value: "4.45x", note: "Dark-Post Attribution" },
      { label: "Engagement Lift", value: "+240%", note: "Authentic Comments" },
      { label: "Active Handles", value: "12 Creators", note: "Permanent Roster" },
    ],
    techStack: ["Meta Partnership Ads", "TikTok Spark", "GRIN", "Shopify"],
  },
  {
    id: "ic-3",
    categoryId: "influencer-creative",
    number: "03",
    title: "Founder Authority Content Engine",
    shortTag: "1.8M Reach",
    summary: "Executive ghostwriting and visual slide carousels positioning startup founders as top voices on LinkedIn and X.",
    liveUrl: "https://nerditia.com",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "social-media-marketing",
    status: "Delivered & Live",
    kpis: [
      { label: "Organic Reach", value: "1.8M / mo", note: "Viral Impression" },
      { label: "Inbound Leads", value: "38 / mo", note: "Direct Messages" },
      { label: "Follower Growth", value: "+14,200", note: "Verified Founders" },
      { label: "Founder Time", value: "45m / wk", note: "Voice Briefing" },
    ],
    techStack: ["LinkedIn API", "Figma", "Notion", "Descript"],
  },
  {
    id: "ic-4",
    categoryId: "influencer-creative",
    number: "04",
    title: "Brand Visual Design System",
    shortTag: "420+ Tokens",
    summary: "Complete Figma design system, accessible WCAG color scales, vector typography, and master pitch deck collateral.",
    liveUrl: "https://madadtheory.com",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80",
    serviceSlug: "brand-identity",
    status: "Delivered & Live",
    kpis: [
      { label: "Design Consistency", value: "100%", note: "Figma Tokens" },
      { label: "Component Kit", value: "420+ Items", note: "Ready to Use" },
      { label: "Pitch Win Rate", value: "+35%", note: "Investor Decks" },
      { label: "Brand Recall", value: "+80%", note: "Distinctive Assets" },
    ],
    techStack: ["Figma", "Adobe Illustrator", "Tokens Studio"],
  },
];

const STORAGE_KEY = "mat_ecosystem_projects_v2";

export function getEcosystemProjects(): EcosystemProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p: EcosystemProject) => {
          if (!p.imageUrl) {
            const initial = initialEcosystemProjects.find((ip) => ip.id === p.id);
            if (initial?.imageUrl) {
              return { ...p, imageUrl: initial.imageUrl };
            }
          }
          return p;
        });
      }
    }
  } catch {}
  return initialEcosystemProjects;
}

export function saveEcosystemProjects(projects: EcosystemProject[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("ecosystem_updated"));
  } catch (err) {
    console.error("Failed to save ecosystem projects to localStorage", err);
  }
}

export function resetEcosystemProjects(): EcosystemProject[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("ecosystem_updated"));
  } catch {}
  return initialEcosystemProjects;
}

export function useEcosystemProjects() {
  const [projects, setProjects] = useState<EcosystemProject[]>(getEcosystemProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getEcosystemProjects());
    };
    window.addEventListener("ecosystem_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("ecosystem_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return projects;
}

