import { useState, useEffect } from "react";
import { CaseStudy, portfolioData as initialPortfolio } from "./portfolioData";

const STORAGE_KEY = "mat_portfolio_case_studies_v1";

export function getPortfolio(): CaseStudy[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialPortfolio;
}

export function savePortfolio(items: CaseStudy[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("portfolio_updated"));
  } catch {}
}

export function usePortfolio() {
  const [items, setItems] = useState<CaseStudy[]>(getPortfolio);

  useEffect(() => {
    const handleUpdate = () => setItems(getPortfolio());
    window.addEventListener("portfolio_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return items;
}

