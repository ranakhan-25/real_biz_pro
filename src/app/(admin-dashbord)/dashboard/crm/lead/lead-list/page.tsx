"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Mail,
  Send,
  UserCheck,
  ArrowRightLeft,
  XCircle,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Activity,
  X,
  Building,
  Sparkles,
  CheckCircle2,
  Flame,
  ArrowUpRight
} from "lucide-react";

interface Lead {
  uuid: string;
  code: string;
  name: string;
  phone: string;
  email?: string;
  category: "hot" | "warm" | "cold";
  source: string;
  stage: string;
  project: string;
  budget?: number;
  requirement: string;
  assignee: string;
  tags: string[];
  status: "Active" | "Inactive" | "Rejected" | "Converted";
  last_activity: string;
  created_at: string;
}

const mockLeads: Lead[] = [
  {
    uuid: "lead-101",
    code: "LD-2026-001",
    name: "Dr. Tariqul Islam",
    phone: "+8801711223344",
    email: "tariqul@example.com",
    category: "hot",
    source: "Facebook Ads",
    stage: "New",
    project: "Skyline City Tower",
    budget: 15000000,
    requirement: "Looking for 3BR 1800 sqft apartment on higher floor.",
    assignee: "Shamim Khan",
    tags: ["VIP", "Urgent"],
    status: "Active",
    last_activity: "10 mins ago",
    created_at: "2026-10-20"
  },
  {
    uuid: "lead-102",
    code: "LD-2026-002",
    name: "Jannatul Ferdous",
    phone: "+8801899887766",
    email: "jannat@example.com",
    category: "warm",
    source: "Website Inquiry",
    stage: "Site Visit Scheduled",
    project: "Uttara Lake View",
    budget: 8500000,
    requirement: "Plot size 5 katha near main avenue.",
    assignee: "Tanvir Ahmed",
    tags: ["Plot", "Ready"],
    status: "Active",
    last_activity: "2 hours ago",
    created_at: "2026-10-18"
  }
];

export default function LeadListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLeadUuids, setSelectedLeadUuids] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "create" | "detail">("list");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailSubTab, setDetailSubTab] = useState<"activity" | "followups" | "visits" | "offers" | "quotations">("activity");

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<Lead | null>(null);

  // Modals for Actions
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [newAssignee, setNewAssignee] = useState("");

  // Load leads from localStorage on component mount
  useEffect(() => {
    const savedLeads = localStorage.getItem("crm_leads_data");
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(mockLeads);
      }
    } else {
      setLeads(mockLeads);
      localStorage.setItem("crm_leads_data", JSON.stringify(mockLeads));
    }
    setIsLoaded(true);
  }, []);

  // Save leads to localStorage whenever leads state changes
  const updateAndPersistLeads = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem("crm_leads_data", JSON.stringify(updatedLeads));
  };

  // Filters State
  const [filters, setFilters] = useState({
    stage: "all",
    source: "all",
    assignee: "all",
    project: "all",
    status: "all",
    from: "",
    to: "",
    search: ""
  });

  // Create Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "warm",
    source: "Website",
    stage: "New",
    project: "Skyline City Tower",
    budget: "",
    requirement: "",
    assignee: "Shamim Khan",
    tags: "VIP, High Budget"
  });

  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (val: string) => {
    setFormData({ ...formData, phone: val });
    const exists = leads.some((l) => l.phone === val);
    if (exists) {
      setPhoneError("Phone number already exists for another lead!");
    } else {
      setPhoneError("");
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneError) return;

    const newLead: Lead = {
      uuid: `lead-${Date.now()}`,
      code: `LD-2026-00${leads.length + 1}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      category: formData.category as "hot" | "warm" | "cold",
      source: formData.source,
      stage: formData.stage,
      project: formData.project,
      budget: Number(formData.budget) || 0,
      requirement: formData.requirement,
      assignee: formData.assignee,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      status: "Active",
      last_activity: "Just now",
      created_at: new Date().toISOString().slice(0, 10)
    };

    const newLeadsList = [newLead, ...leads];
    updateAndPersistLeads(newLeadsList);
    setActiveTab("list");
    
    // Reset Form
    setFormData({
      name: "",
      phone: "",
      email: "",
      category: "warm",
      source: "Website",
      stage: "New",
      project: "Skyline City Tower",
      budget: "",
      requirement: "",
      assignee: "Shamim Khan",
      tags: ""
    });
  };

  // EDIT ACTION HANDLERS
  const handleOpenEditModal = (lead: Lead) => {
    setEditFormData({ ...lead });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    const updated = leads.map((l) => (l.uuid === editFormData.uuid ? editFormData : l));
    updateAndPersistLeads(updated);
    if (selectedLead?.uuid === editFormData.uuid) {
      setSelectedLead(editFormData);
    }
    setShowEditModal(false);
  };

  // DELETE ACTION HANDLER
  const handleDeleteLead = (uuid: string, leadName: string) => {
    if (confirm(`Are you sure you want to delete lead "${leadName}"?`)) {
      const updated = leads.filter((l) => l.uuid !== uuid);
      updateAndPersistLeads(updated);
      setSelectedLeadUuids((prev) => prev.filter((id) => id !== uuid));
      if (selectedLead?.uuid === uuid) {
        setSelectedLead(null);
        setActiveTab("list");
      }
    }
  };

  // Communication Actions
  const handleCall = () => selectedLead?.phone && window.open(`tel:${selectedLead.phone}`, '_self');
  const handleSMS = () => selectedLead?.phone && window.open(`sms:${selectedLead.phone}`, '_self');
  const handleEmail = () => selectedLead?.email ? window.open(`mailto:${selectedLead.email}`, '_self') : alert("No email address provided.");
  const handleWhatsApp = () => {
    if (selectedLead?.phone) {
      const formattedPhone = selectedLead.phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${formattedPhone}`, '_blank');
    }
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newAssignee) return;
    const updated = leads.map(l => l.uuid === selectedLead.uuid ? { ...l, assignee: newAssignee } : l);
    updateAndPersistLeads(updated);
    setSelectedLead({ ...selectedLead, assignee: newAssignee });
    setShowAssignModal(false);
  };

  const handleConvertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    const updated = leads.map(l => l.uuid === selectedLead.uuid ? { ...l, status: "Converted" as const, stage: "Converted" } : l);
    updateAndPersistLeads(updated);
    setSelectedLead({ ...selectedLead, status: "Converted", stage: "Converted" });
    setShowConvertModal(false);
  };

  const handleReject = () => {
    if (!selectedLead) return;
    if (confirm("Are you sure you want to reject this lead?")) {
      const updated = leads.map(l => l.uuid === selectedLead.uuid ? { ...l, status: "Rejected" as const } : l);
      updateAndPersistLeads(updated);
      setSelectedLead({ ...selectedLead, status: "Rejected" });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedLeadUuids(checked ? filteredLeads.map((l) => l.uuid) : []);
  };

  const handleToggleSelect = (uuid: string) => {
    setSelectedLeadUuids((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.phone.includes(filters.search);

    const matchesStage = filters.stage === "all" || lead.stage === filters.stage;
    const matchesSource = filters.source === "all" || lead.source === filters.source;
    const matchesAssignee = filters.assignee === "all" || lead.assignee === filters.assignee;
    const matchesProject = filters.project === "all" || lead.project === filters.project;
    const matchesStatus = filters.status === "all" || lead.status === filters.status;

    return matchesSearch && matchesStage && matchesSource && matchesAssignee && matchesProject && matchesStatus;
  });

  if (!isLoaded) {
    return <div className="p-8 text-center text-sm font-bold text-muted-foreground">Loading Lead Directory...</div>;
  }

  return (
    <div className="w-full space-y-6 px-4 md:px-8 py-6 text-foreground bg-background">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles size={15} /> CRM Platform Management
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground mt-1">Lead Directory</h1>
          <p className="text-sm text-muted-foreground mt-1 font-medium">Manage prospect lifecycles, monitor agent performance, and track project inquiries.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition ${
              activeTab === "list" ? "bg-indigo-600 text-white shadow-md" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            Directory List
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl flex items-center gap-2 transition ${
              activeTab === "create" ? "bg-indigo-600 text-white shadow-md" : "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/20"
            }`}
          >
            <Plus size={18} /> Add Lead
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      {activeTab === "list" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Total Leads</span>
              <div className="text-3xl font-black font-mono mt-1 text-foreground">{leads.length}</div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <ArrowUpRight size={14} /> +12% this week
              </span>
            </div>
            <div className="p-3.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-500/20">
              <Users size={22} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Hot Leads</span>
              <div className="text-3xl font-black font-mono mt-1 text-foreground">
                {leads.filter(l => l.category === "hot").length}
              </div>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1 mt-1">
                <Flame size={14} /> Priority Follow-up
              </span>
            </div>
            <div className="p-3.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-500/20">
              <Flame size={22} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Site Visits</span>
              <div className="text-3xl font-black font-mono mt-1 text-foreground">
                {leads.filter(l => l.stage === "Site Visit Scheduled").length}
              </div>
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 mt-1">
                <Calendar size={14} /> 2 pending today
              </span>
            </div>
            <div className="p-3.5 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl border border-teal-500/20">
              <Calendar size={22} />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Converted Deals</span>
              <div className="text-3xl font-black font-mono mt-1 text-foreground">
                {leads.filter(l => l.status === "Converted").length}
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <CheckCircle2 size={14} /> High conversion
              </span>
            </div>
            <div className="p-3.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>
      )}

      {/* 1. LEAD LIST VIEW */}
      {activeTab === "list" && (
        <div className="space-y-5">
          
          {/* Advanced Search & Filter Control Bar */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="text-sm font-black flex items-center gap-2 text-foreground">
                <Filter size={18} className="text-indigo-600" /> Advanced Directory Filters
              </span>
              <button
                onClick={() => setFilters({ stage: "all", source: "all", assignee: "all", project: "all", status: "all", from: "", to: "", search: "" })}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-sm font-semibold">
              <div className="col-span-2 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search lead code, client name, phone..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl outline-none bg-background border-border text-sm focus:ring-2 focus:ring-indigo-500/20 font-medium"
                />
              </div>

              <select
                value={filters.stage}
                onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
                className="border rounded-xl px-3 py-2.5 outline-none bg-background border-border font-medium text-sm"
              >
                <option value="all">All Stages</option>
                <option value="New">New</option>
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="Negotiation">Negotiation</option>
              </select>

              <select
                value={filters.source}
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                className="border rounded-xl px-3 py-2.5 outline-none bg-background border-border font-medium text-sm"
              >
                <option value="all">All Sources</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Website Inquiry">Website Inquiry</option>
                <option value="Cold Call">Cold Call</option>
              </select>

              <select
                value={filters.assignee}
                onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                className="border rounded-xl px-3 py-2.5 outline-none bg-background border-border font-medium text-sm"
              >
                <option value="all">All Assignees</option>
                <option value="Shamim Khan">Shamim Khan</option>
                <option value="Tanvir Ahmed">Tanvir Ahmed</option>
              </select>

              <select
                value={filters.project}
                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                className="border rounded-xl px-3 py-2.5 outline-none bg-background border-border font-medium text-sm"
              >
                <option value="all">All Projects</option>
                <option value="Skyline City Tower">Skyline City Tower</option>
                <option value="Uttara Lake View">Uttara Lake View</option>
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="border rounded-xl px-3 py-2.5 outline-none bg-background border-border font-medium text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Converted">Converted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-medium border-t border-border/40">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-muted-foreground text-xs">Date Created:</span>
                <input
                  type="date"
                  value={filters.from}
                  onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                  className="border rounded-xl px-2.5 py-1.5 bg-background border-border font-mono text-xs"
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="date"
                  value={filters.to}
                  onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                  className="border rounded-xl px-2.5 py-1.5 bg-background border-border font-mono text-xs"
                />
              </div>

              <span className="text-muted-foreground font-mono font-bold text-xs">
                Showing {filteredLeads.length} of {leads.length} Leads
              </span>
            </div>
          </div>

          {/* Table with View, Edit, Delete Actions */}
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-extrabold uppercase tracking-wider bg-muted/40">
                    <th className="p-4 w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        checked={selectedLeadUuids.length === filteredLeads.length && filteredLeads.length > 0}
                      />
                    </th>
                    <th className="p-4">Lead Code</th>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4">Project</th>
                    <th className="p-4">Assignee</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-semibold text-foreground">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((l) => (
                      <tr key={l.uuid} className="hover:bg-muted/40 transition">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedLeadUuids.includes(l.uuid)}
                            onChange={() => handleToggleSelect(l.uuid)}
                          />
                        </td>
                        <td className="p-4 font-mono font-black text-indigo-600 dark:text-indigo-400 text-sm">{l.code}</td>
                        <td className="p-4">
                          <div className="font-extrabold text-foreground text-base">{l.name}</div>
                          {l.email && <div className="text-xs text-muted-foreground font-mono mt-0.5">{l.email}</div>}
                        </td>
                        <td className="p-4 font-mono font-bold text-sm">{l.phone}</td>
                        <td className="p-4 text-muted-foreground text-sm">{l.source}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${
                            l.stage === 'New' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' :
                            l.stage === 'Site Visit Scheduled' ? 'bg-teal-500/10 text-teal-600 border-teal-500/20' :
                            'bg-amber-500/10 text-amber-600 border-amber-500/20'
                          }`}>
                            {l.stage}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold">
                          <div className="flex items-center gap-1.5">
                            <Building size={15} className="text-muted-foreground" />
                            <span>{l.project}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-sm">{l.assignee}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                            l.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                            l.status === 'Active' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                            'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                          }`}>
                            {l.status}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-muted-foreground text-xs">{l.last_activity}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* VIEW BUTTON */}
                            <button
                              onClick={() => {
                                setSelectedLead(l);
                                setActiveTab("detail");
                              }}
                              className="p-2 rounded-xl bg-muted hover:bg-indigo-600 hover:text-white transition shadow-sm"
                              title="View Lead Profile"
                            >
                              <Eye size={16} />
                            </button>

                            {/* EDIT BUTTON */}
                            <button
                              onClick={() => handleOpenEditModal(l)}
                              className="p-2 rounded-xl bg-amber-500/10 text-amber-600 hover:bg-amber-600 hover:text-white transition shadow-sm border border-amber-500/20"
                              title="Edit Lead Profile"
                            >
                              <Edit size={16} />
                            </button>

                            {/* DELETE BUTTON */}
                            <button
                              onClick={() => handleDeleteLead(l.uuid, l.name)}
                              className="p-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white transition shadow-sm border border-rose-500/20"
                              title="Delete Lead"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="p-10 text-center text-muted-foreground font-extrabold text-base">
                        No lead profiles match your search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 2. LEAD CREATE FORM */}
      {activeTab === "create" && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
          <div className="border-b border-border/60 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Register New Lead Profile</h2>
              <p className="text-sm text-muted-foreground mt-1">Fill in prospect details, property interest, and sales team assignments.</p>
            </div>
            <button onClick={() => setActiveTab("list")} className="text-sm font-bold text-muted-foreground hover:underline">
              Back to List
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-5 text-sm font-bold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Tariqul Islam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Primary Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+88017XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full border rounded-xl p-3 outline-none bg-background text-sm ${
                    phoneError ? "border-rose-500" : "border-border"
                  }`}
                />
                {phoneError && <p className="text-rose-500 text-xs mt-1 font-bold">{phoneError}</p>}
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Email Address</label>
                <input
                  type="email"
                  placeholder="client@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Category Level *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm capitalize"
                >
                  <option value="hot">Hot (High Priority)</option>
                  <option value="warm">Warm (Moderate)</option>
                  <option value="cold">Cold (Inquiry Only)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Lead Source *</label>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                >
                  <option value="Website">Website</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Call">Cold Call</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Initial Pipeline Stage *</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                >
                  <option value="New">New (Default)</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Negotiation">Negotiation</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Project Interest</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                >
                  <option value="Skyline City Tower">Skyline City Tower</option>
                  <option value="Uttara Lake View">Uttara Lake View</option>
                  <option value="Banani Suite 2A">Banani Suite 2A</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Estimated Budget (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g. 15000000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border font-mono text-sm"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Assign Sales Executive</label>
                <select
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                >
                  <option value="Shamim Khan">Shamim Khan</option>
                  <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-extrabold">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="VIP, Urgent, Ready Buyer"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm"
                />
              </div>

            </div>

            <div>
              <label className="block mb-1.5 text-sm font-extrabold">Requirement Details *</label>
              <textarea
                required
                rows={3}
                placeholder="Specific unit preference, floor requirements, facing..."
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="w-full border rounded-xl p-3 outline-none bg-background border-border text-sm resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 border-t border-border">
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="px-5 py-2.5 rounded-xl bg-muted font-bold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!phoneError}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md disabled:opacity-50"
              >
                Save Lead Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. LEAD DETAIL VIEW */}
      {activeTab === "detail" && selectedLead && (
        <div className="space-y-5">
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-border/60 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-indigo-600">{selectedLead.code}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                    {selectedLead.stage}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-rose-500/10 text-rose-600 border border-rose-500/20">
                    {selectedLead.category}
                  </span>
                </div>
                <h1 className="text-3xl font-black text-foreground mt-1.5">{selectedLead.name}</h1>
                <p className="text-sm text-muted-foreground font-mono mt-0.5">{selectedLead.phone} • {selectedLead.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button onClick={handleCall} className="px-4 py-2.5 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-emerald-500/20">
                  <Phone size={16} /> Call
                </button>

                <button onClick={handleSMS} className="px-4 py-2.5 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-blue-500/20">
                  <MessageSquare size={16} /> SMS
                </button>

                <button onClick={handleEmail} className="px-4 py-2.5 bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-indigo-500/20">
                  <Mail size={16} /> Email
                </button>

                <button onClick={handleWhatsApp} className="px-4 py-2.5 bg-teal-600/10 text-teal-600 hover:bg-teal-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-teal-500/20">
                  <Send size={16} /> WhatsApp
                </button>

                <button onClick={() => { setNewAssignee(selectedLead.assignee); setShowAssignModal(true); }} className="px-4 py-2.5 bg-purple-600/10 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-purple-500/20">
                  <UserCheck size={16} /> Assign
                </button>

                <button onClick={() => setShowConvertModal(true)} className="px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition flex items-center gap-2 text-xs font-bold shadow-md">
                  <ArrowRightLeft size={16} /> Convert
                </button>

                <button onClick={handleReject} className="px-4 py-2.5 bg-rose-600/10 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition flex items-center gap-2 text-xs font-bold border border-rose-500/20">
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-sm font-semibold">
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-extrabold">Project Interest</span>
                <span className="text-foreground text-base font-bold">{selectedLead.project}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-extrabold">Target Budget</span>
                <span className="font-mono font-bold text-emerald-600 text-base">৳{selectedLead.budget?.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-extrabold">Assigned Representative</span>
                <span className="text-foreground text-base font-bold">{selectedLead.assignee}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase font-extrabold">Tags & Category</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedLead.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-muted text-xs rounded-md font-bold">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC EDIT LEAD MODAL */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-black text-lg">Edit Lead Profile ({editFormData.code})</h3>
              <button onClick={() => setShowEditModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4 text-sm font-bold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold mb-1">Stage</label>
                  <select
                    value={editFormData.stage}
                    onChange={(e) => setEditFormData({ ...editFormData, stage: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm"
                  >
                    <option value="New">New</option>
                    <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                    <option value="Negotiation">Negotiation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold mb-1">Assignee</label>
                  <select
                    value={editFormData.assignee}
                    onChange={(e) => setEditFormData({ ...editFormData, assignee: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm"
                  >
                    <option value="Shamim Khan">Shamim Khan</option>
                    <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                    <option value="Rafiqul Islam">Rafiqul Islam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold mb-1">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as any })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Converted">Converted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold mb-1">Budget (BDT)</label>
                  <input
                    type="number"
                    value={editFormData.budget || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, budget: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl bg-background border-border text-sm font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-xl bg-muted font-bold text-sm">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 text-white font-black text-sm shadow-md">
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-black text-base">Assign Sales Representative</h3>
              <button onClick={() => setShowAssignModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAssignSubmit} className="space-y-4 text-sm font-bold">
              <select
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                className="w-full p-3 border rounded-xl bg-background border-border text-sm"
              >
                <option value="Shamim Khan">Shamim Khan</option>
                <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                <option value="Rafiqul Islam">Rafiqul Islam</option>
              </select>
              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowAssignModal(false)} className="px-4 py-2 rounded-xl bg-muted font-bold text-sm">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-black text-sm shadow-md">Save Assignee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONVERT MODAL */}
      {showConvertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-black text-base">Convert Lead to Customer</h3>
              <button onClick={() => setShowConvertModal(false)}><X size={20} /></button>
            </div>
            <p className="text-sm text-muted-foreground font-medium">This action will convert <strong>{selectedLead?.name}</strong> to an official Customer Profile.</p>
            <form onSubmit={handleConvertSubmit} className="space-y-4 text-sm font-bold">
              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowConvertModal(false)} className="px-4 py-2 rounded-xl bg-muted font-bold text-sm">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-md">Confirm Conversion</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}