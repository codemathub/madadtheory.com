import { useState, useEffect } from "react";

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: "Open" | "Closed";
}

export const initialCareers: CareerRole[] = [
  {
    id: "job-1",
    title: "Senior Performance Media Buyer",
    department: "Paid Acquisition",
    location: "Remote / Hybrid (New Delhi)",
    type: "Full-Time",
    experience: "3-5 Years",
    description:
      "Manage and scale high-budget Meta & Google Ad accounts (₹50L+/month). Responsible for creative testing strategies, account structuring, and ROAS delivery.",
    status: "Open",
  },
  {
    id: "job-2",
    title: "Senior Fullstack Engineer (React & Node)",
    department: "Technology",
    location: "Remote",
    type: "Full-Time",
    experience: "4+ Years",
    description:
      "Build bespoke web applications, high-converting e-commerce experiences, and proprietary analytics dashboards for our enterprise clients.",
    status: "Open",
  },
  {
    id: "job-3",
    title: "Creative Strategist & Video Director",
    department: "Creative Studio",
    location: "Hybrid (New Delhi)",
    type: "Full-Time",
    experience: "2-4 Years",
    description:
      "Script, conceptualize, and produce high-converting direct-response video hooks and UGC frameworks that lower customer acquisition costs.",
    status: "Open",
  },
  {
    id: "job-4",
    title: "Marketing Automation Architect",
    department: "Automation & Systems",
    location: "Remote",
    type: "Full-Time",
    experience: "3+ Years",
    description:
      "Design multi-platform retention workflows, CRM pipelines, webhook integrations, and lead scoring architectures across HubSpot, Make, and custom APIs.",
    status: "Open",
  },
];

const STORAGE_KEY = "mat_careers_roles_v1";

export function getCareers(): CareerRole[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialCareers;
}

export function saveCareers(roles: CareerRole[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    window.dispatchEvent(new Event("careers_updated"));
  } catch {}
}

export function useCareers() {
  const [roles, setRoles] = useState<CareerRole[]>(getCareers);

  useEffect(() => {
    const handleUpdate = () => setRoles(getCareers());
    window.addEventListener("careers_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("careers_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return roles;
}

