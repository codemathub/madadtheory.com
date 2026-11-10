import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  FolderKanban, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  LogOut,
  ChevronRight,
  Filter,
  BarChart3,
  Layers
} from "lucide-react";
import { leadsStore, LeadItem } from "@/lib/leadsStore";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [adminUser, setAdminUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("mat_admin_session");
    if (!session) {
      navigate("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(session));
    setLeads(leadsStore.getLeads());
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("mat_admin_session");
    localStorage.removeItem("mat_admin_token");
    navigate("/admin/login");
  };

  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => ["Qualified", "Discovery", "Proposal Sent", "Won"].includes(l.stage)).length;
  const newLeads = leads.filter(l => l.stage === "New").length;

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-background-dark text-text-main dark:text-text-main-dark">
      {/* Admin Top Navigation */}
      <header className="border-b border-brand-border dark:border-brand-border-dark bg-surface-card dark:bg-surface-card-dark sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Logo size="sm" />
            </Link>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-purple/10 text-brand-purple">
              Admin Platform
            </span>
            <nav className="hidden md:flex items-center space-x-4 text-xs font-semibold">
              <Link to="/admin/dashboard" className="text-brand-purple border-b-2 border-brand-purple pb-1">
                Overview
              </Link>
              <Link to="/admin/crm/leads" className="text-text-muted hover:text-brand-purple transition-colors">
                CRM Pipeline
              </Link>
              <Link to="/portal/dashboard" className="text-text-muted hover:text-brand-purple transition-colors">
                Client Portal Preview
              </Link>
              <Link to="/" className="text-text-muted hover:text-brand-purple transition-colors">
                Public Website
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none">{adminUser?.name || "Admin"}</p>
              <p className="text-[10px] text-text-muted leading-tight">{adminUser?.role || "Super Admin"}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-xs text-red-500 hover:bg-red-500/10">
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-brand-purple/15 via-brand-purple-secondary/10 to-transparent border border-brand-purple/20">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Agency Operations Overview
            </h1>
            <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark mt-1">
              Performance marketing campaigns, deal progression, and inbound enquiry queues.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/crm/leads">
              <Button size="sm" className="rounded-xl font-bold">
                Open CRM Pipeline
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/get-a-quote">
              <Button variant="outline" size="sm" className="rounded-xl">
                Test Quote Form
              </Button>
            </Link>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Total Enquiries</span>
              <Users className="w-4 h-4 text-brand-purple" />
            </div>
            <div className="text-3xl font-extrabold">{totalLeads}</div>
            <p className="text-[11px] text-emerald-500 font-semibold mt-2 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              Live Inbound Sync
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Qualified Pipeline</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold">{qualifiedLeads}</div>
            <p className="text-[11px] text-text-muted mt-2">
              {newLeads} new leads pending initial review
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Avg Blended ROAS</span>
              <BarChart3 className="w-4 h-4 text-brand-purple-secondary" />
            </div>
            <div className="text-3xl font-extrabold">4.2x</div>
            <p className="text-[11px] text-emerald-500 font-semibold mt-2">
              Across active client accounts
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
            <div className="flex items-center justify-between text-text-muted mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Active Client SOWs</span>
              <FolderKanban className="w-4 h-4 text-brand-purple" />
            </div>
            <div className="text-3xl font-extrabold">14</div>
            <p className="text-[11px] text-text-muted mt-2">
              100% on-track deliverable status
            </p>
          </div>
        </div>

        {/* Live Leads / CRM Quick View */}
        <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Recent Inbound Performance Enquiries</h2>
              <p className="text-xs text-text-muted">Directly captured through the multi-step enquiry engine</p>
            </div>
            <Link to="/admin/crm/leads" className="text-xs font-semibold text-brand-purple hover:underline flex items-center">
              View all in CRM pipeline
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border dark:border-brand-border-dark text-text-muted uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Ref #</th>
                  <th className="pb-3 font-semibold">Lead Contact</th>
                  <th className="pb-3 font-semibold">Company</th>
                  <th className="pb-3 font-semibold">Budget</th>
                  <th className="pb-3 font-semibold">Services Required</th>
                  <th className="pb-3 font-semibold">Stage</th>
                  <th className="pb-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 dark:divide-brand-border-dark/60">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-purple/5 transition-colors">
                    <td className="py-3.5 font-mono text-brand-purple font-semibold">
                      {lead.refNumber}
                    </td>
                    <td className="py-3.5">
                      <div className="font-semibold text-text-main dark:text-text-main-dark">{lead.fullName}</div>
                      <div className="text-[10px] text-text-muted">{lead.email}</div>
                    </td>
                    <td className="py-3.5 font-medium">{lead.companyName}</td>
                    <td className="py-3.5">{lead.approxBudget}</td>
                    <td className="py-3.5">
                      <span className="text-[11px] truncate max-w-[200px] inline-block">
                        {lead.servicesRequired.join(", ")}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.stage === "New" ? "bg-blue-500/10 text-blue-500" :
                        lead.stage === "Qualified" ? "bg-purple-500/10 text-brand-purple" :
                        lead.stage === "Proposal Sent" ? "bg-amber-500/10 text-amber-500" :
                        "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-3.5 text-text-muted">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

