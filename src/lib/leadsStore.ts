import { generateRefNumber } from "./utils";

export interface LeadItem {
  id: string;
  _id?: string;
  refNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  websiteUrl?: string;
  servicesRequired: string[];
  services?: string[];
  industry?: string;
  approxBudget: string;
  budgetRange?: string;
  expectedTimeline: string;
  timeline?: string;
  projectDescription: string;
  stage:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Discovery"
    | "Proposal Sent"
    | "Negotiation"
    | "Won"
    | "Lost"
    | string;
  sourceUrl?: string;
  createdAt: string;
}

const STORAGE_KEY = "mat_leads_store";

const initialSeedLeads: LeadItem[] = [
  {
    id: "lead-seed-1",
    _id: "lead-seed-1",
    refNumber: "MAT-20261105-8841",
    fullName: "Aarav Sharma",
    email: "aarav@zestapparel.com",
    phone: "+91 98112 34567",
    companyName: "Zest Apparel DTC",
    websiteUrl: "https://zestapparel.com",
    servicesRequired: ["Performance Marketing", "Social Media Marketing", "Creative Strategy"],
    services: ["Performance Marketing", "Social Media Marketing", "Creative Strategy"],
    industry: "E-commerce & Retail",
    approxBudget: "₹3,00,000 – ₹7,00,000 / mo",
    budgetRange: "₹3,00,000 – ₹7,00,000 / mo",
    expectedTimeline: "Immediate (Within 2 weeks)",
    timeline: "Immediate (Within 2 weeks)",
    projectDescription:
      "Looking to scale Meta and Google Ad spend from ₹1,50,000 to ₹6,00,000/month while holding a minimum 3.8x ROAS.",
    stage: "Qualified",
    createdAt: new Date("2026-11-04T10:30:00Z").toISOString(),
  },
  {
    id: "lead-seed-2",
    _id: "lead-seed-2",
    refNumber: "MAT-20261104-1290",
    fullName: "Priya Nair",
    email: "priya@zenithsaas.io",
    phone: "+91 99201 88721",
    companyName: "Zenith B2B Cloud",
    websiteUrl: "https://zenithsaas.io",
    servicesRequired: ["Performance Marketing", "Website Development", "Workflow Automation"],
    services: ["Performance Marketing", "Website Development", "Workflow Automation"],
    industry: "SaaS & Technology",
    approxBudget: "₹1,50,000 – ₹3,00,000 / mo",
    budgetRange: "₹1,50,000 – ₹3,00,000 / mo",
    expectedTimeline: "Within 1 Month",
    timeline: "Within 1 Month",
    projectDescription:
      "B2B pipeline generation via LinkedIn and Google Search. Need CRM sync to HubSpot and high-converting landing pages.",
    stage: "New",
    createdAt: new Date("2026-11-05T08:15:00Z").toISOString(),
  },
];

export function getLeads(): LeadItem[] {
  if (typeof window === "undefined") return initialSeedLeads;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedLeads));
      return initialSeedLeads;
    }
    const parsed = JSON.parse(raw);
    return parsed.map((item: any) => ({
      ...item,
      id: item.id || item._id,
      approxBudget: item.approxBudget || item.budgetRange || "Flexible",
      expectedTimeline: item.expectedTimeline || item.timeline || "Immediate",
      servicesRequired: item.servicesRequired || item.services || [],
    }));
  } catch {
    return initialSeedLeads;
  }
}

export function saveLead(data: any): LeadItem {
  const current = getLeads();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const refNumber = `MAT-${dateStr}-${randomSuffix}`;
  
  const id = `lead_${Date.now()}`;
  const services = data.servicesRequired || data.services || [];
  const budget = data.approxBudget || data.budgetRange || "Flexible";
  const timeline = data.expectedTimeline || data.timeline || "Immediate";

  const newLead: LeadItem = {
    id,
    _id: id,
    refNumber,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || "",
    companyName: data.companyName,
    websiteUrl: data.websiteUrl || "",
    servicesRequired: services,
    services,
    industry: data.industry || "General",
    approxBudget: budget,
    budgetRange: budget,
    expectedTimeline: timeline,
    timeline,
    projectDescription: data.projectDescription,
    stage: "New",
    sourceUrl: data.sourceUrl || "",
    createdAt: new Date().toISOString(),
  };

  const updated = [newLead, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("leads_updated"));
  }

  // Also POST to the Node.js / MongoDB backend endpoint
  fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLead),
  }).catch((err) => {
    console.warn("Backend API sync notice:", err.message);
  });

  return newLead;
}

export function updateLeadStage(id: string, stage: string): void {
  const current = getLeads();
  const updated = current.map((l) =>
    l.id === id || l._id === id || l.refNumber === id ? { ...l, stage } : l
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("leads_updated"));
  }

  // Also PATCH backend API
  fetch(`/api/leads/${id}/stage`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stage }),
  }).catch(() => {});
}

export const leadsStore = {
  getLeads,
  saveLead,
  updateLeadStage,
};
