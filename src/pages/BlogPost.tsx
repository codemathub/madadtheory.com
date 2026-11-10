import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBlogPosts } from "@/lib/blogStore";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const posts = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Mad Ad Theory Insights`;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Growth Insights
        </Link>

        {/* Article Header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[11px] border border-purple-500/20">
              {post.category}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.summary}
          </p>
        </header>

        {/* Featured Visual Banner */}
        <div className="w-full h-64 sm:h-80 rounded-3xl bg-gradient-to-br from-purple-900/30 via-slate-900/40 to-black/80 border border-slate-200 dark:border-white/10 mb-12 flex items-center justify-center p-8 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-lg space-y-2">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold block">
              Performance Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {post.category} & Systematic Growth
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-purple dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-6 leading-relaxed">
          {post.content ? (
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {post.content}
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-8 mb-4">
                1. Algorithmic Liquidity vs Creative Exhaustion
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                When scaling performance ad spend from ₹5,00,000 to ₹50,00,000 monthly, standard micro-segmentation breaks down. Modern ad auction engines thrive on consolidated account structures, broad contextual targeting, and high creative velocity rather than hyper-segmented audiences.
              </p>

              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-8 mb-4">
                2. Creative as the Primary Targeting Lever
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                In current advertising dynamics, your creative asset is the targeting filter. A direct-response video hook crafted specifically for a high-intent segment will naturally attract and convert that exact audience cohort. Structured testing of 15–25 modular creative variations weekly prevents ad fatigue from stalling acquisition.
              </p>

              <div className="my-8 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                <h3 className="text-base font-bold text-purple-600 dark:text-purple-400 mb-2">
                  Key Metric Benchmark
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Brands scaling sustainably maintain a blended Customer Acquisition Cost (CAC) within 35% of their 60-day Lifetime Value (LTV), backed by server-side Conversions API attribution.
                </p>
              </div>

              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-8 mb-4">
                3. Server-Side Attribution & Signal Recovery
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Reliance on standard browser pixels introduces up to 30% signal loss. Direct Meta Conversions API (CAPI) and Google Enhanced Conversions restore lost purchase events, feeding bidding models the deterministic data required to maintain efficiency at scale.
              </p>
            </>
          )}
        </article>

        {/* Next Step CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#120D1D] border border-slate-200 dark:border-white/10 text-center space-y-4 shadow-md">
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
            Ready to audit your growth architecture?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Get an in-depth performance audit from our media buyers covering account structure, creative velocity, and tracking accuracy.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button size="lg" className="rounded-xl">
                Claim Your Performance Audit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

