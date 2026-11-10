import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useBlogPosts } from "@/lib/blogStore";

export default function Blog() {
  const blogPosts = useBlogPosts();
  useEffect(() => {
    document.title = "Performance Marketing Insights & Growth Playbooks — Mad Ad Theory";
  }, []);

  return (
    <>
      
      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <Badge variant="purple">Performance Insights</Badge>
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-content tracking-tight">
              Actionable Playbooks for <span className="text-brand-primary">Ambitious Brands</span>
            </h1>
            <p className="text-content-muted text-base sm:text-lg leading-relaxed">
              Tactical breakdowns, ROAS benchmarks, and engineering guides straight from our client delivery trenches. No generic fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} hoverEffect className="p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-content-muted">
                    <span className="font-bold text-brand-primary">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-content leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-content-muted leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-border flex items-center justify-between">
                  <span className="text-[11px] text-content-muted">{post.date}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                  >
                    Read Playbook <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

          </>
  );
}

