import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

// Public Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import Portfolio from "@/pages/Portfolio";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import GetAQuote from "@/pages/GetAQuote";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CrmLeads from "@/pages/admin/CrmLeads";
import AdminWorkspace from "@/admin/AdminWorkspace";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-main dark:bg-background-dark dark:text-text-main-dark transition-colors duration-200">
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/industries/:slug" element={<SolutionDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/case-studies" element={<Portfolio />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/media" element={<Navigate to="/gallery" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-a-quote" element={<Navigate to="/contact" replace />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          {/* Unified All-in-One Admin Routes */}
          <Route path="/admin" element={<AdminWorkspace />} />
          <Route path="/admin/workspace" element={<AdminWorkspace />} />
          <Route path="/admin/dashboard" element={<AdminWorkspace />} />
          <Route path="/admin/crm" element={<AdminWorkspace />} />
          <Route path="/admin/crm/leads" element={<AdminWorkspace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </div>
  );
}

