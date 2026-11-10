export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "Marketing" | "Technology" | "Automation" | "Creative";
  shortSummary: string;
  fullOverview: string;
  deliverables: string[];
  radialIndex?: number; // 0 to 7
  icon: string;
  faqs: { question: string; answer: string }[];
}

export const servicesData: ServiceItem[] = [
  // --- MARKETING ---
  {
    id: "perf-mkt",
    slug: "performance-marketing",
    title: "Performance Marketing",
    category: "Marketing",
    shortSummary: "Data-engineered paid ad campaigns on Meta, Google, and Amazon built to hit 3x–5x ROAS targets.",
    fullOverview:
      "We build conversion funnels engineered around return-on-ad-spend. From creative testing matrices and audience segmentation to real-time attribution modeling, every rupee spent is tracked directly against pipeline revenue.",
    deliverables: [
      "Meta Ads & Google Ads Management",
      "Full-Funnel ROAS Optimization (Target 3x–5x)",
      "Ad Creative Iteration & Testing Matrices",
      "Conversion Tracking & Server-Side Tracking",
    ],
    radialIndex: 0,
    icon: "Target",
    faqs: [
      {
        question: "What platforms do you manage?",
        answer: "We actively run and scale campaigns across Meta (Instagram/Facebook), Google Search, Google Display, YouTube, and Amazon Ads.",
      },
      {
        question: "How do you track performance and ROAS?",
        answer: "We deploy server-side Conversions API (CAPI) and Google Analytics 4 with custom attribution models so you see real customer acquisition costs.",
      },
    ],
  },
  {
    id: "social-mkt",
    slug: "social-media-marketing",
    title: "Social & Creator Marketing",
    category: "Marketing",
    shortSummary: "High-impact social media management, influencer collaborations, and organic content strategies.",
    fullOverview:
      "Turn passive scrollers into loyal advocates. We engineer high-retention social strategies, manage creator partnerships, and orchestrate UGC campaigns that build genuine brand equity.",
    deliverables: [
      "Creator & Influencer Partnership Management",
      "User Generated Content (UGC) Sourcing & Direction",
      "Content Calendar & Distribution Strategy",
      "Community Growth & Engagement Monitoring",
    ],
    radialIndex: 7,
    icon: "Users",
    faqs: [
      {
        question: "Do you handle influencer negotiation and payouts?",
        answer: "Yes, our team curates relevant talent, coordinates briefs, ensures timely deliverables, and handles performance tracking.",
      },
    ],
  },
  {
    id: "seo-growth",
    slug: "seo",
    title: "SEO & Organic Growth",
    category: "Marketing",
    shortSummary: "Technical audits, authoritative link architecture, and search rankings that drive compounding inbound leads.",
    fullOverview:
      "Search visibility that drives actual revenue. We address technical crawlability, Core Web Vitals, keyword intent mapping, and high-value content hubs that outrank your competitors organically.",
    deliverables: [
      "Full Technical SEO Audit & Core Web Vitals Fixes",
      "Commercial-Intent Keyword Mapping",
      "On-Page Optimization & Schema Architecture",
      "Monthly Keyword & Search Visibility Dashboards",
    ],
    radialIndex: 6,
    icon: "Search",
    faqs: [
      {
        question: "How long does SEO take to produce measurable results?",
        answer: "Technical fixes often show improvements within 4–6 weeks, while competitive ranking compounding typically accelerates significantly in months 3 through 6.",
      },
    ],
  },
  {
    id: "influencer-campaigns",
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    category: "Marketing",
    shortSummary: "End-to-end influencer sourcing, contracting, creative direction, and campaign ROI reporting.",
    fullOverview:
      "Scale word-of-mouth with data-backed influencer strategies. We match your brand with verified niche creators whose audience aligns with your exact buyer persona.",
    deliverables: [
      "Vetted Creator Discovery & Outreach",
      "Briefing & Scripting Guidelines",
      "Usage Rights & Contract Oversight",
      "Campaign Attribution & Sales Impact Reports",
    ],
    icon: "Sparkles",
    faqs: [
      {
        question: "How do you vet creators for authenticity?",
        answer: "We audit follower credibility, historical engagement rates, audience demographics, and past campaign benchmarks before sending proposals.",
      },
    ],
  },

  // --- TECHNOLOGY ---
  {
    id: "web-dev",
    slug: "website-development",
    title: "Website Development",
    category: "Technology",
    shortSummary: "Blazing fast, conversion-optimized Next.js and custom web platforms designed to turn visitors into buyers.",
    fullOverview:
      "We design and build bespoke web platforms with clean code, sub-second load times, and responsive elegance. Every page is crafted to maximize conversions while maintaining enterprise security.",
    deliverables: [
      "Modern Next.js & TypeScript Architecture",
      "Tailwind CSS Responsive Design System",
      "Interactive Radial Animations & Micro-Interactions",
      "Speed Optimization & Lighthouse 95+ Targets",
    ],
    radialIndex: 1,
    icon: "Code",
    faqs: [
      {
        question: "Do you build custom websites or use templates?",
        answer: "Every website we engineer is custom-designed and coded from scratch to match your exact brand identity and conversion goals.",
      },
    ],
  },
  {
    id: "ecom-dev",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "Technology",
    shortSummary: "High-volume Shopify and headless commerce architectures built for rapid checkout and maximum average order value.",
    fullOverview:
      "Engineered for high-volume transactions and seamless shopping. We optimize conversion checkout flows, implement 1-click upsells, integrate ERPs, and ensure zero downtime during traffic spikes.",
    deliverables: [
      "Custom Shopify Theme & App Development",
      "Headless E-commerce & Storefront Speed Tuning",
      "Payment Gateway & Local Indian Logistics Sync",
      "AOV Optimization & Post-Purchase Funnels",
    ],
    radialIndex: 2,
    icon: "ShoppingCart",
    faqs: [
      {
        question: "Can you migrate our existing store without losing SEO?",
        answer: "Yes, we execute 301 URL redirect maps, schema retention, and customer data migration with zero SEO loss or catalog downtime.",
      },
    ],
  },
  {
    id: "web-apps",
    slug: "web-applications",
    title: "Web Applications",
    category: "Technology",
    shortSummary: "Full-stack SaaS platforms, portals, and cloud web applications engineered with Node.js and React.",
    fullOverview:
      "From client portals to internal CRM dashboards, we build scalable web applications with robust role-based authentication, MongoDB databases, and clean RESTful APIs.",
    deliverables: [
      "Multi-Tenant SaaS Architectures",
      "Secure Role-Based Access Control (RBAC)",
      "RESTful API & Webhook Integrations",
      "Cloud Infrastructure & CI/CD Pipelines",
    ],
    icon: "Layers",
    faqs: [
      {
        question: "How do you ensure data security in web applications?",
        answer: "We implement encryption at rest, secure HttpOnly sessions, token rotation, and object-level authorization across every endpoint.",
      },
    ],
  },
  {
    id: "custom-sw",
    slug: "custom-software",
    title: "Custom Software",
    category: "Technology",
    shortSummary: "Tailored internal business tools, data pipelines, and proprietary operational systems.",
    fullOverview:
      "When off-the-shelf software doesn't fit, we engineer dedicated business tools, data processors, and inventory tools that eliminate bottlenecks and scale operations.",
    deliverables: [
      "Internal Business Tool Portals",
      "Automated Reporting & ETL Pipelines",
      "Third-Party API Wrappers",
      "Legacy Code Modernization",
    ],
    icon: "Cpu",
    faqs: [
      {
        question: "Do we own the source code?",
        answer: "Yes, 100% of intellectual property, code repositories, and credentials belong to your organization upon project completion.",
      },
    ],
  },

  // --- AUTOMATION ---
  {
    id: "workflow-auto",
    slug: "workflow-automation",
    title: "Workflow Automation",
    category: "Automation",
    shortSummary: "Seamless Zapier, Make, and custom webhook flows that eliminate manual busywork and route leads instantly.",
    fullOverview:
      "Automate repetitive tasks across your team. We link your lead capture forms, CRM pipelines, accounting software, and internal Slack/WhatsApp alerts to trigger in real time with zero manual input.",
    deliverables: [
      "Make & Zapier Multi-Branch Integrations",
      "Automated Lead Notification & Team Alerts",
      "Customer Onboarding Sequences",
      "Data Sync Between Disparate Tools",
    ],
    radialIndex: 3,
    icon: "Zap",
    faqs: [
      {
        question: "What tools can you connect?",
        answer: "We connect virtually any system with an API or webhook: CRMs, Google Sheets, WhatsApp, Slack, payment gateways, and databases.",
      },
    ],
  },
  {
    id: "crm-integ",
    slug: "crm-integration",
    title: "CRM Integration",
    category: "Automation",
    shortSummary: "HubSpot, Zoho, and custom pipeline setups that prevent leads from falling through the cracks.",
    fullOverview:
      "A CRM is only valuable when your team actually uses it. We configure clean sales stages, automated task reminders, lead qualification triggers, and attribution reports tailored to your sales process.",
    deliverables: [
      "Custom Pipeline Architecture & Stage Mapping",
      "Automated Email Sequences & Task Creation",
      "Lead Scoring & Routing Rules",
      "Team Onboarding & Sales Playbooks",
    ],
    icon: "GitFork",
    faqs: [
      {
        question: "Can you clean up our existing messy CRM database?",
        answer: "Yes, we deduplicate records, normalize contact fields, and set up ongoing validation to maintain clean pipeline data.",
      },
    ],
  },
  {
    id: "chatbots-ai",
    slug: "chatbots",
    title: "Chatbots & WhatsApp",
    category: "Automation",
    shortSummary: "24/7 automated qualification bots and WhatsApp Business flows that book meetings while you sleep.",
    fullOverview:
      "Engage high-intent prospects within seconds of landing on your page. Our conversational flows qualify budget, answer common questions, and book sales calls straight into your calendar.",
    deliverables: [
      "Official WhatsApp Business API Setup",
      "Interactive Website Lead Qualification Bot",
      "Automated Booking & Meeting Reminders",
      "CRM Activity Sync for Every Conversation",
    ],
    icon: "MessageSquare",
    faqs: [
      {
        question: "Does WhatsApp automation require official API verification?",
        answer: "Yes, we handle Meta Business verification and template message approvals to ensure compliant, high-deliverability messaging.",
      },
    ],
  },
  {
    id: "business-systems",
    slug: "business-systems",
    title: "Business Systems",
    category: "Automation",
    shortSummary: "Unified operations sync connecting inventory, billing, support tickets, and performance dashboards.",
    fullOverview:
      "Bring harmony to fragmented operations. We build unified bridges between your invoicing, support desk, and warehouse systems to maintain a single source of operational truth.",
    deliverables: [
      "Billing & Invoicing Automation",
      "Support Ticket Routing & SLAs",
      "Inventory & Order Status Syncing",
      "Executive Operational Dashboards",
    ],
    icon: "Settings",
    faqs: [
      {
        question: "How do you handle error recovery in automated systems?",
        answer: "All automated flows feature automated retries, failover alerting, and error logs to ensure no operational data is dropped.",
      },
    ],
  },

  // --- CREATIVE ---
  {
    id: "brand-identity",
    slug: "brand-identity",
    title: "Brand Identity",
    category: "Creative",
    shortSummary: "Distinctive logo systems, monograms, typography, and brand guidelines that command respect and memorability.",
    fullOverview:
      "A great brand inspires trust before a customer ever reads your sales pitch. We develop cohesive visual identities, color palettes, and typographic systems built to shine across ad creatives and packaging.",
    deliverables: [
      "Logo & Emblem Design System",
      "Color Tokens & Typography Selection",
      "Brand Guidelines Manual",
      "Social & Collateral Design Templates",
    ],
    radialIndex: 4,
    icon: "Feather",
    faqs: [
      {
        question: "What files do you deliver for brand identity?",
        answer: "We supply vector SVGs, print-ready AI/EPS/PDF files, web formats (PNG/WebP), and a complete brand identity book.",
      },
    ],
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Creative",
    shortSummary: "High-converting ad banners, pitch decks, infographics, and promotional collateral that demand attention.",
    fullOverview:
      "Design that directly powers your performance marketing. We produce rapid ad creative variations, deck designs, and visual marketing assets formatted for all social and display formats.",
    deliverables: [
      "Performance Ad Creative Variations (1:1, 9:16, 16:9)",
      "Sales Pitch Decks & Presentations",
      "Brochures, Catalogues & Print Assets",
      "Infographics & Visual Asset Kits",
    ],
    icon: "PenTool",
    faqs: [
      {
        question: "Can your team deliver recurring ad creatives every month?",
        answer: "Yes, our creative sprints produce fresh ad variations every week to combat creative fatigue in paid campaigns.",
      },
    ],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "Creative",
    shortSummary: "Data-informed wireframes, interactive Figma prototypes, and design systems focused on friction-free user journeys.",
    fullOverview:
      "We design web interfaces rooted in behavioral psychology. Every button placement, spacing choice, and navigation hierarchy is tested to minimize bounce rates and maximize user conversion.",
    deliverables: [
      "User Journey Mapping & Wireframes",
      "High-Fidelity Figma Clickable Prototypes",
      "Complete UI Design Tokens & Component Kit",
      "Usability Testing & Design Review Sprints",
    ],
    icon: "Layout",
    faqs: [
      {
        question: "Do you design for mobile-first?",
        answer: "Absolutely. Over 75% of your audience browses on mobile; every layout is perfected on mobile screens before scaling to desktop.",
      },
    ],
  },
  {
    id: "video-content",
    slug: "video-content-production",
    title: "Video & Content Production",
    category: "Creative",
    shortSummary: "Viral short-form reels, high-definition promotional ads, motion graphics, and post-production editing.",
    fullOverview:
      "Video is the highest-converting medium in performance marketing. We write scripts, edit dynamic hooks, animate motion graphics, and optimize captions to keep viewers glued to your ad.",
    deliverables: [
      "Short-Form Video Editing (Reels, TikTok, Shorts)",
      "High-Impact Performance Video Ad Creatives",
      "2D/3D Motion Graphics & Logo Reveals",
      "Sound Design, Captions & Hook Variations",
    ],
    radialIndex: 5,
    icon: "Video",
    faqs: [
      {
        question: "What is the turnaround time for video ad batches?",
        answer: "Standard video sprints deliver edited hook variations and final renders within 3 to 5 business days from raw footage receipt.",
      },
    ],
  },
];
