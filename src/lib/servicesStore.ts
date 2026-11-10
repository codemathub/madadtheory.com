import { useState, useEffect } from "react";
import { ServiceItem, servicesData as initialServices } from "./servicesData";

const STORAGE_KEY = "mat_services_data_v1";

export function getServicesData(): ServiceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialServices;
}

export function saveServicesData(items: ServiceItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("services_updated"));
  } catch {}
}

export function useServicesData() {
  const [items, setItems] = useState<ServiceItem[]>(getServicesData);

  useEffect(() => {
    const handleUpdate = () => setItems(getServicesData());
    window.addEventListener("services_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("services_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return items;
}

