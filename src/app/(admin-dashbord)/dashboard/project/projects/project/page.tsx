/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
  Home,
  Copy,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
  PhoneCall,
  User,
  Building2,
  MapPin,
  Tag,
  Loader2,
  Check,
} from "lucide-react";

// ---------- Types ----------
interface ProjectItem {
  id: number | string;
  uuid: string;
  code: string;
  name: string;
  projectType: string;
  area: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  durationFrom: string;
  durationTo: string;
  contactPerson: string;
  contactPhone: string;
  clientEmail: string;
  contractor: string;
  projectManager: string;
  budget: string;
  storeys: string;
  progress: number;
  status: string;
}

// ---------- API helpers ----------
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr).slice(0, 10);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(dateStr).slice(0, 10);
  }
}

function toInputDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr).slice(0, 10);
    return d.toISOString().slice(0, 10);
  } catch {
    return String(dateStr).slice(0, 10);
  }
}

async function fetchProjects(): Promise<{ data: ProjectItem[]; meta: any }> {
  const res = await fetch(
    `${API_BASE}/realbizpro/api/v1/project?page=1&limit=100&skip=0&sortBy=createdAt&sortOrder=DESC&withDeleted=false`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
  const json = await res.json();

  const mapped: ProjectItem[] = (json?.data?.data || []).map((item: any) => {
    const statusRaw = (item.status || "ACTIVE").toUpperCase();
    let status = "Active";
    if (statusRaw === "COMPLETED") status = "Completed";
    else if (statusRaw === "PENDING") status = "Pending";
    else if (statusRaw === "INACTIVE" || statusRaw === "CANCELLED")
      status = "Pending";

    return {
      id: Number(item.id) || item.uuid,
      uuid: item.uuid,
      code: item.code || "",
      name: item.name || "",
      projectType: item.projectType || "",
      area: item.areaCategory || "",
      location: item.location || "",
      description: item.description || "",
      startDate: toInputDate(item.startDate),
      endDate: toInputDate(item.endDate),
      durationFrom: formatDate(item.startDate),
      durationTo: formatDate(item.endDate),
      contactPerson: item.contactPersonName || "",
      contactPhone: item.contactPhone || "",
      clientEmail: item.clientEmail || "",
      contractor: item.contractorCompany || "",
      projectManager: item.projectManager || "",
      // GET response uses model field names
      budget: item.totalBudget != null ? String(item.totalBudget) : "",
      storeys: item.numberOfStoreys != null ? String(item.numberOfStoreys) : "",
      progress: Number(item.progressPercentage) || 0,
      status,
    };
  });

  return { data: mapped, meta: json?.data?.meta };
}

async function createProject(payload: Record<string, any>) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Create failed";
    try {
      const body = await res.json();
      msg = body?.message || body?.error || msg;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : String(e));
    }
    throw new Error(msg);
  }
  return res.json();
}

async function updateProject(uuid: string, payload: Record<string, any>) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/project/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Update failed";
    try {
      const body = await res.json();
      msg = body?.message || body?.error || msg;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : String(e));
    }
    throw new Error(msg);
  }
  return res.json();
}

async function softDeleteProject(uuid: string) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/project/${uuid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json().catch(() => ({}));
}

// ---------- Form Modal ----------
function ProjectFormModal({
  title,
  initialData,
  onClose,
  onSubmit,
}: {
  title: string;
  initialData?: ProjectItem;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    code:
      initialData?.code ||
      `PRJ-${new Date().getFullYear()}-${String(
        Math.floor(100 + Math.random() * 900),
      ).padStart(3, "0")}`,
    projectName: initialData?.name || "",
    projectType: initialData?.projectType || "Residential",
    area: initialData?.area || "",
    location: initialData?.location || "",
    budget: initialData?.budget || "",
    contactPerson: initialData?.contactPerson || "",
    contactPhone: initialData?.contactPhone || "",
    clientEmail: initialData?.clientEmail || "",
    contractor: initialData?.contractor || "",
    projectManager: initialData?.projectManager || "",
    storeys: initialData?.storeys || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    progress: initialData?.progress ?? 0,
    description: initialData?.description || "",
    status: initialData?.status || "Active",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-6">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-indigo-600" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 bg-slate-50/30 space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Code
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                disabled={!!initialData}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 font-mono focus:border-indigo-500 focus:outline-none disabled:bg-slate-50 disabled:opacity-70"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Skyline Heights"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Type
              </label>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Office">Office</option>
                <option value="Industrial">Industrial</option>
                <option value="Real Estate">Real Estate</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Area Category
              </label>
              <input
                type="text"
                placeholder="e.g. Uttara, Central"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Location / Address
              </label>
              <input
                type="text"
                placeholder="e.g. Gulshan-2, Dhaka"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Total Budget (৳)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="15000000"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                placeholder="Person Name"
                value={formData.contactPerson}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="+8801XXXXXXXXX"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Client Email
              </label>
              <input
                type="email"
                placeholder="client@domain.com"
                value={formData.clientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, clientEmail: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Contractor Company
              </label>
              <input
                type="text"
                placeholder="Contractor Name"
                value={formData.contractor}
                onChange={(e) =>
                  setFormData({ ...formData, contractor: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Manager
              </label>
              <input
                type="text"
                placeholder="Manager Name"
                value={formData.projectManager}
                onChange={(e) =>
                  setFormData({ ...formData, projectManager: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Number of Storeys
              </label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={formData.storeys}
                onChange={(e) =>
                  setFormData({ ...formData, storeys: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Progress Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    progress: Number(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Project Description
              </label>
              <textarea
                rows={2}
                placeholder="Short description about the project..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-60 transition-all flex items-center gap-1.5"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedArea, setSelectedArea] = useState("All Area");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(
    null,
  );

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (project: ProjectItem) => {
    if (!confirm(`Delete project "${project.name}"?`)) return;
    try {
      if (project.uuid) {
        await softDeleteProject(project.uuid);
      }
      setProjects((prev) => prev.filter((p) => p.uuid !== project.uuid));
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    }
  };

  // ✅ FIXED: DTO field names (budget, storeys, progress)
  const toApiPayload = (data: Record<string, any>) => {
    let status = "ACTIVE";
    if (data.status === "Completed") status = "COMPLETED";
    else if (data.status === "Pending") status = "PENDING";

    return {
      code: data.code || "",
      name: data.projectName || "",
      projectType: data.projectType || null,
      areaCategory: data.area || null,
      location: data.location || null,
      description: data.description || null,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      contactPersonName: data.contactPerson || null,
      contactPhone: data.contactPhone || null,
      clientEmail: data.clientEmail || null,
      contractorCompany: data.contractor || null,
      projectManager: data.projectManager || null,
      status,

      // DTO field names (service maps these → model fields)
      budget: data.budget ? Number(data.budget) : null,
      storeys: data.storeys ? Number(data.storeys) : null,
      progress: Number(data.progress) || 0,
    };
  };

  const filteredProjects = projects.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || item.status === selectedStatus;
    const matchesArea =
      selectedArea === "All Area" || item.area === selectedArea;
    return matchesSearch && matchesStatus && matchesArea;
  });

  const areaOptions = Array.from(
    new Set(projects.map((p) => p.area).filter(Boolean)),
  );

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 font-sans text-slate-800">
      {/* Breadcrumb */}
      <nav className="mb-3 flex items-center text-xs font-medium text-slate-500">
        <a
          href="#"
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
        >
          <Home className="h-3.5 w-3.5" /> Home
        </a>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-indigo-600 font-semibold">
          Projects Management
        </span>
      </nav>

      {/* Top Filter Panel */}
      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Filter by Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Filter by Area
          </label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option>All Area</option>
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Quick Search Across All Fields
          </label>
          <input
            type="text"
            placeholder="Type project name, location, contractor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Action Utility Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3.5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Copy className="h-3 w-3 text-slate-500" /> Copy
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition-all">
            <FileSpreadsheet className="h-3 w-3" /> Export CSV
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Columns
            ({filteredProjects.length} items)
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading projects...
        </div>
      )}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1250px]">
              <thead>
                <tr className="bg-[#58427c] text-white text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-3 font-semibold">ID</th>
                  <th className="py-3 px-3 font-semibold">Code & Name</th>
                  <th className="py-3 px-3 font-semibold">Type & Area</th>
                  <th className="py-3 px-3 font-semibold">Duration & Timeline</th>
                  <th className="py-3 px-3 font-semibold">Location</th>
                  <th className="py-3 px-3 font-semibold">Contact & Client</th>
                  <th className="py-3 px-3 font-semibold">Contractor</th>
                  <th className="py-3 px-3 font-semibold">Budget (৳)</th>
                  <th className="py-3 px-3 font-semibold">Storeys</th>
                  <th className="py-3 px-3 font-semibold">Progress</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((item, index) => (
                    <tr
                      key={item.uuid || item.id}
                      className={`transition-colors hover:bg-indigo-50/40 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                      }`}
                    >
                      <td className="py-3.5 px-3 font-medium text-slate-500">
                        #{index + 1}
                      </td>

                      <td className="py-3.5 px-3">
                        <p className="font-mono text-[10px] text-indigo-600 font-bold">
                          {item.code}
                        </p>
                        <p className="font-semibold text-slate-900 text-xs hover:text-indigo-600 cursor-pointer">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[160px]">
                          {item.description}
                        </p>
                      </td>

                      <td className="py-3.5 px-3">
                        <p className="font-medium text-slate-800 flex items-center gap-1">
                          <Tag className="h-3 w-3 text-indigo-500" />{" "}
                          {item.projectType || "—"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.area || "—"} Area
                        </p>
                      </td>

                      <td className="py-3.5 px-3 text-[11px] text-slate-600 whitespace-nowrap">
                        <p className="flex items-center gap-1 font-medium text-slate-700">
                          <Calendar className="h-3 w-3 text-emerald-600" />{" "}
                          {item.durationFrom || "—"}
                        </p>
                        <p className="text-slate-400 text-[10px]">
                          To: {item.durationTo || "—"}
                        </p>
                      </td>

                      <td className="py-3.5 px-3 text-[11px]">
                        <p className="font-medium text-slate-800 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-rose-500" />{" "}
                          {item.location || "N/A"}
                        </p>
                      </td>

                      <td className="py-3.5 px-3 text-[11px]">
                        <p className="font-medium text-slate-800 flex items-center gap-1">
                          <User className="h-3 w-3 text-indigo-500" />{" "}
                          {item.contactPerson || "N/A"}
                        </p>
                        <p className="text-slate-500 flex items-center gap-1">
                          <PhoneCall className="h-3 w-3 text-emerald-500" />{" "}
                          {item.contactPhone || "N/A"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.clientEmail}
                        </p>
                      </td>

                      <td className="py-3.5 px-3 text-[11px]">
                        <p className="font-medium text-slate-700 flex items-center gap-1">
                          <Building2 className="h-3 w-3 text-amber-600" />{" "}
                          {item.contractor || "N/A"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Mgr: {item.projectManager || "—"}
                        </p>
                      </td>

                      <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {item.budget
                          ? `৳${Number(item.budget).toLocaleString()}`
                          : "—"}
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-700">
                          {item.storeys ? `${item.storeys} Fl` : "—"}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 w-28">
                        <div className="flex items-center justify-between text-[10px] mb-1 font-semibold text-slate-600">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            item.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : item.status === "Completed"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditingProject(item)}
                            className="rounded-md bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                            title="Edit"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="rounded-md bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition-colors shadow-sm"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={12}
                      className="py-12 text-center text-slate-400"
                    >
                      No matching projects found. Try checking your search or
                      filter values.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 bg-slate-50/50">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">1</span> to{" "}
              <span className="font-medium text-slate-700">
                {filteredProjects.length}
              </span>{" "}
              of total entries
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>
              <button className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
                1
              </button>
              <button
                disabled
                className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddOpen && (
        <ProjectFormModal
          title="Add New Project"
          onClose={() => setIsAddOpen(false)}
          onSubmit={async (data) => {
            try {
              await createProject(toApiPayload(data));
              setIsAddOpen(false);
              await loadData();
            } catch (err: any) {
              alert(err.message || "Create failed");
            }
          }}
        />
      )}

      {/* Edit Modal */}
      {editingProject && (
        <ProjectFormModal
          title="Edit Project Details"
          initialData={editingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={async (data) => {
            try {
              await updateProject(
                editingProject.uuid,
                toApiPayload(data),
              );
              setEditingProject(null);
              await loadData();
            } catch (err: any) {
              alert(err.message || "Update failed");
            }
          }}
        />
      )}
    </div>
  );
}