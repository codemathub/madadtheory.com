import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Target,
  Code2,
  Cpu,
  Palette,
  ArrowRight,
  Layers,
} from "lucide-react";
import { ServiceItem } from "@/lib/servicesData";
import { useServicesData } from "@/lib/servicesStore";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

// Category metadata with clean enterprise styling
const categoryMeta: Record<
  string,
  { label: string; icon: React.ElementType; badgeBg: string; textColor: string; iconBg: string }
> = {
  Marketing: {
    label: "Marketing",
    icon: Target,
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    textColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
  },
  Technology: {
    label: "Technology",
    icon: Code2,
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-950/60",
  },
  Automation: {
    label: "Automation",
    icon: Cpu,
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    textColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-950/60",
  },
  Creative: {
    label: "Creative",
    icon: Palette,
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/60",
  },
};

const categoryOrder = ["Marketing", "Technology", "Automation", "Creative"] as const;

export function Navbar() {
  const servicesData = useServicesData();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Smooth scroll listener for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-[#0D0915]/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-purple-900/30 shadow-md shadow-slate-900/5 dark:shadow-black/50 py-2.5"
          : "bg-white dark:bg-[#0D0915] border-b border-slate-200/60 dark:border-white/5 py-4"
      )}
    >
      {/* relative wrapper ensures mega-dropdown centers to this 7xl boundary, never overflowing off screen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-12">
          {/* Real Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <img
                src="/images/logo-raw.jpeg"
                alt="Mad Ad Theory Emblem"
                className={cn(
                  "rounded-xl object-cover ring-1 ring-purple-500/20 shadow-sm transition-all duration-300",
                  scrolled ? "w-9 h-9" : "w-10 h-10"
                )}
              />
            </div>
            <div>
              <span className="block font-heading font-black text-slate-900 dark:text-white text-base leading-tight tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Mad Ad Theory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                isActive("/", true)
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                  : "text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/70 dark:hover:bg-white/5"
              )}
            >
              Home
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-150",
                  isActive("/services") || servicesOpen
                    ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                    : "text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/70 dark:hover:bg-white/5"
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    servicesOpen && "rotate-180 text-purple-600 dark:text-purple-400"
                  )}
                />
              </button>
            </div>

            <Link
              to="/portfolio"
              className={cn(
                "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                isActive("/portfolio")
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                  : "text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/70 dark:hover:bg-white/5"
              )}
            >
              Work
            </Link>

            <Link
              to="/about"
              className={cn(
                "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                isActive("/about")
                  ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
                  : "text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100/70 dark:hover:bg-white/5"
              )}
            >
              About
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />

            <Link to="/contact">
              <button
                type="button"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading font-extrabold text-xs text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-md shadow-purple-600/20 hover:shadow-purple-600/30 transition-all duration-200 active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger & Theme Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-6 h-6 text-purple-600 dark:text-purple-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ─── Mega Menu Dropdown: Centered on screen, 100% Solid Opaque, No Overflow ─── */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute left-4 right-4 top-full pt-3 z-[100] mx-auto max-w-6xl"
            >
              <div className="rounded-2xl bg-white dark:bg-[#120D1D] border border-slate-200 dark:border-purple-500/20 shadow-2xl shadow-slate-900/20 dark:shadow-black/80 overflow-hidden">
                {/* Header bar */}
                <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#171224] border-b border-slate-200/80 dark:border-purple-900/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="font-heading font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      16 Core Disciplines
                    </span>
                  </div>
                  <Link
                    to="/services"
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 inline-flex items-center gap-1 transition-colors"
                  >
                    View All Services
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 4-Column Clean Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-white dark:bg-[#120D1D]">
                  {categoryOrder.map((catKey) => {
                    const meta = categoryMeta[catKey];
                    const CatIcon = meta.icon;
                    const list = servicesData.filter((s) => s.category === catKey);

                    return (
                      <div key={catKey} className="space-y-2.5">
                        {/* Category Header */}
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-md flex items-center justify-center shrink-0",
                              meta.iconBg
                            )}
                          >
                            <CatIcon className={cn("w-3 h-3", meta.textColor)} />
                          </div>
                          <span className="font-heading font-black text-[11px] uppercase tracking-wider text-slate-900 dark:text-white">
                            {meta.label}
                          </span>
                        </div>

                        {/* Service Links */}
                        <div className="space-y-0.5">
                          {list.map((svc: ServiceItem) => (
                            <Link
                              key={svc.slug}
                              to={`/services/${svc.slug}`}
                              className="group block p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-150"
                            >
                              <span className="block font-heading font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                                {svc.title}
                              </span>
                              <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                                {svc.shortSummary}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Mobile Slide-Down Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden border-b border-slate-200 dark:border-purple-900/30 bg-white dark:bg-[#0D0915] shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              <Link
                to="/"
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform duration-200",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-3 pr-2 py-2 space-y-4"
                    >
                      {categoryOrder.map((catKey) => {
                        const meta = categoryMeta[catKey];
                        const list = servicesData.filter((s) => s.category === catKey);
                        return (
                          <div key={catKey} className="space-y-1">
                            <div className="flex items-center gap-1.5 px-3 py-1">
                              <meta.icon className={cn("w-3.5 h-3.5", meta.textColor)} />
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {meta.label}
                              </span>
                            </div>
                            {list.map((svc) => (
                              <Link
                                key={svc.slug}
                                to={`/services/${svc.slug}`}
                                className="block px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30"
                              >
                                {svc.title}
                              </Link>
                            ))}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/portfolio"
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              >
                Work & Case Studies
              </Link>

              <Link
                to="/about"
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              >
                About Us
              </Link>

              <div className="pt-2">
                <Link to="/contact" className="block w-full">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-black text-sm text-white bg-gradient-to-r from-purple-600 to-purple-800 shadow-md shadow-purple-600/25"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
