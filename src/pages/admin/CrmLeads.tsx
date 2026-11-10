import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { leadsStore, LeadItem } from "@/lib/leadsStore";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const STAGES = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Discovery",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

export default function CrmLeads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [activeStage, setActiveStage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("mat_admin_session");
    if (!session) {
      navigate("/admin/login");
      return;
    }
    loadLeads();
    const handleUpdate = () => loadLeads();
    window.addEventListener("leads_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("leads_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [navigate]);

  const loadLeads = () => {
    setLeads(leadsStore.getLeads());
  };

  const handleStageChange = (leadId: string, newStage: any) => {
    leadsStore.updateLeadStage(leadId, newStage);
    loadLeads();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, stage: newStage });
    }
    showToast(`Lead moved to stage: ${newStage}`);
  };

  const handleConvertToProject = (lead: LeadItem) => {
    handleStageChange(lead.id, "Won");
    showToast(`Success! Converted ${lead.companyName} to Active Client Project.`);
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStage = activeStage === "All" || lead.stage === activeStage;
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.refNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface-subtle dark:bg-background-dark text-text-main dark:text-text-main-dark">
      {/* Top Header */}
      <header className="border-b border-brand-border dark:border-brand-border-dark bg-surface-card dark:bg-surface-card-dark sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/dashboard" className="text-xs font-semibold text-brand-purple hover:underline flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Admin Overview
            </Link>
            <span className="text-brand-border">|</span>
            <h1 className="text-sm font-bold">CRM & Inbound Lead Management</h1>
          </div>

          <Link to="/portal/dashboard" className="text-xs font-semibold text-brand-purple hover:underline">
            Go to Client Portal Preview →
          </Link>
        </div>
      </header>

      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-white font-semibold text-xs shadow-2xl flex items-center animate-fade-in">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Controls: Search and Stage Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by company, contact, or ref #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-border dark:border-brand-border-dark bg-surface-card dark:bg-surface-card-dark focus:outline-none focus:border-brand-purple"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs">
            {STAGES.map((st) => (
              <button
                key={st}
                onClick={() => setActiveStage(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeStage === st
                    ? "bg-brand-purple text-white shadow-sm"
                    : "bg-surface-card dark:bg-surface-card-dark text-text-muted hover:text-text-main border border-brand-border dark:border-brand-border-dark"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table + Details Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className={`lg:col-span-2 p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                Pipeline ({filteredLeads.length} Leads)
              </h2>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-xs">
                No performance leads match the current criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-brand-border dark:border-brand-border-dark text-text-muted uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Ref #</th>
                      <th className="pb-3 font-semibold">Company & Contact</th>
                      <th className="pb-3 font-semibold">Budget</th>
                      <th className="pb-3 font-semibold">Current Stage</th>
                      <th className="pb-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60 dark:divide-brand-border-dark/60">
                    {filteredLeads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className={`cursor-pointer hover:bg-brand-purple/5 transition-colors ${
                          selectedLead?.id === lead.id ? "bg-brand-purple/10" : ""
                        }`}
                      >
                        <td className="py-3 font-mono font-bold text-brand-purple">
                          {lead.refNumber}
                        </td>
                        <td className="py-3">
                          <div className="font-bold text-text-main dark:text-text-main-dark">{lead.companyName}</div>
                          <div className="text-[11px] text-text-muted">{lead.fullName} • {lead.email}</div>
                        </td>
                        <td className="py-3 font-medium">
                          {lead.approxBudget}
                        </td>
                        <td className="py-3">
                          <select
                            value={lead.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleStageChange(lead.id, e.target.value)}
                            className="text-[11px] font-bold rounded-lg border border-brand-border dark:border-brand-border-dark bg-surface-card dark:bg-surface-card-dark px-2 py-1 focus:outline-none focus:border-brand-purple"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Discovery">Discovery</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLead(lead);
                            }}
                            className="text-xs text-brand-purple font-semibold hover:underline"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Details Pane */}
          <div className="p-6 rounded-2xl bg-surface-card dark:bg-surface-card-dark border border-brand-border dark:border-brand-border-dark space-y-6">
            {selectedLead ? (
              <>
                <div className="border-b border-brand-border dark:border-brand-border-dark pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-purple uppercase">
                      {selectedLead.refNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple/10 text-brand-purple">
                      {selectedLead.stage}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold">{selectedLead.companyName}</h3>
                  <p className="text-xs text-text-muted mt-1">{selectedLead.fullName}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center text-text-muted">
                    <Mail className="w-3.5 h-3.5 mr-2 text-brand-purple" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline text-text-main dark:text-text-main-dark">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div className="flex items-center text-text-muted">
                    <Phone className="w-3.5 h-3.5 mr-2 text-brand-purple" />
                    <span>{selectedLead.phone}</span>
                  </div>
                  {selectedLead.websiteUrl && (
                    <div className="flex items-center text-text-muted">
                      <Globe className="w-3.5 h-3.5 mr-2 text-brand-purple" />
                      <a href={selectedLead.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline text-brand-purple flex items-center">
                        {selectedLead.websiteUrl}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-text-muted">
                    <DollarSign className="w-3.5 h-3.5 mr-2 text-brand-purple" />
                    <span>Approx Budget: <strong className="text-text-main dark:text-text-main-dark">{selectedLead.approxBudget}</strong></span>
                  </div>
                  <div className="flex items-center text-text-muted">
                    <Clock className="w-3.5 h-3.5 mr-2 text-brand-purple" />
                    <span>Timeline: <strong className="text-text-main dark:text-text-main-dark">{selectedLead.expectedTimeline}</strong></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Services Required
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.servicesRequired.map((svc) => (
                      <span
                        key={svc}
                        className="px-2.5 py-1 rounded-md bg-brand-purple/10 text-brand-purple text-[11px] font-semibold"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Project Goals / Description
                  </label>
                  <p className="text-xs p-3 rounded-xl bg-surface-subtle dark:bg-background-dark text-text-muted leading-relaxed">
                    {selectedLead.projectDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border dark:border-brand-border-dark space-y-3">
                  <Button
                    onClick={() => handleConvertToProject(selectedLead)}
                    className="w-full rounded-xl text-xs font-bold"
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Convert to Active Client & SOW
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-20 text-center text-text-muted text-xs space-y-3">
                <Sparkles className="w-8 h-8 mx-auto text-brand-purple/40" />
                <p>Select any lead from the pipeline table to view complete project requirements and transition stages.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

