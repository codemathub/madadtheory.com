export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string;
  industry: string;
  servicesUsed: string[];
  headline: string;
  challenge: string;
  strategy: string;
  results: { label: string; value: string }[];
  featuredImage?: string;
}

export const portfolioData: CaseStudy[] = [
  {
    id: "cs-1",
    slug: "d2c-apparel-scaling",
    clientName: "Velocity Apparel (D2C)",
    industry: "E-commerce & Fashion",
    servicesUsed: ["Performance Marketing", "E-commerce Development", "Video & Content"],
    headline: "Scaling From ₹15L to ₹65L Monthly Revenue at a Sustained 4.6x ROAS",
    challenge:
      "The brand suffered from ad creative fatigue and rising customer acquisition costs (CAC) on Meta Ads, capping their revenue at an unprofitable 1.9x ROAS.",
    strategy:
      "We deployed a structured creative testing matrix with 15+ weekly hook variations, upgraded their Shopify checkout speed, and implemented server-side Conversions API for precise attribution.",
    results: [
      { label: "Average ROAS", value: "4.6x" },
      { label: "Revenue Growth", value: "+330%" },
      { label: "CAC Reduction", value: "-42%" },
    ],
  },
  {
    id: "cs-2",
    slug: "fintech-pipeline-engine",
    clientName: "PayScale Technologies",
    industry: "B2B SaaS & Financial Tools",
    servicesUsed: ["Performance Marketing", "Website Development", "CRM Integration"],
    headline: "Generating 420+ Enterprise Sales Demos via High-Intent Search & Custom Landing Pages",
    challenge:
      "Enterprise software sales were stalling due to slow generic landing pages and high bounce rates on competitive Google Ads search keywords.",
    strategy:
      "We engineered high-speed Next.js conversion landing pages with sub-second load times and targeted commercial-intent search terms with dedicated dynamic headline matching.",
    results: [
      { label: "Demo Bookings", value: "420+" },
      { label: "Cost Per Demo", value: "-54%" },
      { label: "Lighthouse Score", value: "98/100" },
    ],
  },
  {
    id: "cs-3",
    slug: "automated-lead-engine",
    clientName: "Metro Logistics & Warehousing",
    industry: "Logistics & Supply Chain",
    servicesUsed: ["Workflow Automation", "Chatbots & WhatsApp", "CRM Integration"],
    headline: "Automating 24/7 Lead Response: Slashing Qualification Time from 4 Hours to 45 Seconds",
    challenge:
      "High-value freight enquiries arriving after business hours were slipping away before the sales team could respond the next morning.",
    strategy:
      "We engineered automated WhatsApp Business webhook flows and Make automation pipelines that immediately qualify customer tonnage requirements and schedule calls directly in Zoho CRM.",
    results: [
      { label: "Response Time", value: "< 45 sec" },
      { label: "Lead Conversion Rate", value: "+68%" },
      { label: "Manual Hours Saved", value: "120 hrs/mo" },
    ],
  },
];

