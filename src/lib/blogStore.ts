import { useState, useEffect } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  content?: string;
}

export const initialBlogPosts: BlogPost[] = [
  {
    slug: "scaling-meta-ads-3x-roas-playbook",
    title: "How We Scale Meta Ad Accounts Past ₹50 Lakhs Monthly Spend at 4x+ ROAS",
    summary:
      "A step-by-step breakdown of creative testing matrices, cost-cap bidding strategies, and audience consolidation for high-growth brands.",
    category: "Paid Media",
    readTime: "7 min read",
    date: "November 2026",
    author: "Senior Performance Lead",
  },
  {
    slug: "conversions-api-server-side-tracking-guide",
    title: "Why Browser Pixels Are Failing You: The Complete Server-Side CAPI Architecture",
    summary:
      "How browser privacy restrictions are hiding 30% of your conversions and how to set up clean server-side attribution on Meta and Google.",
    category: "Analytics & Tech",
    readTime: "9 min read",
    date: "October 2026",
    author: "Full-Stack Tech Architect",
  },
  {
    slug: "automated-lead-routing-workflows",
    title: "The 45-Second Rule: Why Automated WhatsApp CRM Flows Increase Lead Conversion by 60%",
    summary:
      "Data proves that responding to inbound B2B enquiries within 5 minutes yields 21x higher qualification. Here is the automated Make and WhatsApp pipeline.",
    category: "Automation",
    readTime: "6 min read",
    date: "October 2026",
    author: "Automation Specialist",
  },
];

const STORAGE_KEY = "mat_blog_posts_v1";

export function getBlogPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return initialBlogPosts;
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event("blog_posts_updated"));
  } catch {}
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts);

  useEffect(() => {
    const handleUpdate = () => setPosts(getBlogPosts());
    window.addEventListener("blog_posts_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("blog_posts_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return posts;
}

