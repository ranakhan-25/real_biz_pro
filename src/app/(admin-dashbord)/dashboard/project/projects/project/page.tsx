/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

// ==============================
// TYPES
// ==============================
interface ProjectItem {
  id: string;
  uuid: string;
  code: string;
  name: string;
  projectType: string;
  areaCategory: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  contactPersonName: string;
  contactPhone: string;
  clientEmail: string;
  contractorCompany: string;
  projectManager: string;
  budget: string; // API returns "50000.00"
  storeys: number;
  progress: number;
  status: string;
}

interface FormState {
  code: string;
  name: string;
  projectType: string;
  areaCategory: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  contactPersonName: string;
  contactPhone: string;
  clientEmail: string;
  contractorCompany: string;
  projectManager: string;
  budget: string;
  storeys: string;
  progress: number;
  status: string;
}

const emptyForm: FormState = {
  code: "",
  name: "",
  projectType: "",
  areaCategory: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  contactPersonName: "",
  contactPhone: "",
  clientEmail: "",
  contractorCompany: "",
  projectManager: "",
  budget: "",
  storeys: "",
  progress: 0,
  status: "Active",
};

// ==============================
// API CONFIG
// .env.local:
//   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
//   NEXT_PUBLIC_DEFAULT_USER_ID=<createdBy er jonno user id>   (optional)
// ==============================
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const API_URL = `${BASE_URL}/realbizpro/api/v1/projects`;
const DEFAULT_USER_ID =
  process.env.NEXT_PUBLIC_DEFAULT_USER_ID ??
  "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // empty body
  }

  if (!res.ok || json?.success === false) {
    const msg = Array.isArray(json?.message)
      ? json.message.join(", ")
      : json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return json as T;
}

const PAGE_LIMIT = 10;

// ==============================
// SMALL FORM FIELD HELPER
// ==============================
const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ProjectsPage() {
  // ==============================
  // DATA
  // ==============================
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedArea, setSelectedArea] = useState("All Area");
  const [page, setPage] = useState(1);

  // ==============================
  // MODAL / FORM
  // ==============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // ==============================
  // FETCH LIST (GET)
  // ==============================
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await request<{ success: boolean; data: any }>(API_URL);

      // data direct array ba { data: [...] } duto-i handle kore
      const list: ProjectItem[] = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json.data?.data)
        ? json.data.data
        : [];

      setProjects(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ==============================
  // MODAL HANDLERS
  // ==============================
  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      code: String(project.code ?? ""),
      name: project.name ?? "",
      projectType: project.projectType ?? "",
      areaCategory: project.areaCategory ?? "",
      location: project.location ?? "",
      description: project.description ?? "",
      startDate: (project.startDate ?? "").slice(0, 10),
      endDate: (project.endDate ?? "").slice(0, 10),
      contactPersonName: project.contactPersonName ?? "",
      contactPhone: project.contactPhone ?? "",
      clientEmail: project.clientEmail ?? "",
      contractorCompany: project.contractorCompany ?? "",
      projectManager: project.projectManager ?? "",
      budget: project.budget ? String(Number(project.budget)) : "",
      storeys: project.storeys != null ? String(project.storeys) : "",
      progress: Number(project.progress ?? 0),
      status: project.status ?? "Active",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormError(null);
  };

  // ==============================
  // SUBMIT (POST) / UPDATE (PATCH)
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    const body = {
      code: Number(formData.code), // swagger e code number
      name: formData.name.trim(),
      projectType: formData.projectType.trim(),
      areaCategory: formData.areaCategory.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      contactPersonName: formData.contactPersonName.trim(),
      contactPhone: formData.contactPhone.trim(),
      clientEmail: formData.clientEmail.trim(),
      contractorCompany: formData.contractorCompany.trim(),
      projectManager: formData.projectManager.trim(),
      budget: Number(formData.budget) || 0,
      storeys: Number(formData.storeys) || 0,
      progress: Number(formData.progress) || 0,
      status: formData.status,
    };

    try {
      if (editingProject) {
        await request(`${API_URL}/${editingProject.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        await request(API_URL, {
          method: "POST",
          body: JSON.stringify({ ...body, createdBy: DEFAULT_USER_ID }),
        });
        setPage(1);
      }

      handleCloseModal();
      await fetchProjects();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==============================
  // DELETE (soft delete)
  // ==============================
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    setError(null);
    try {
      await request(`${API_URL}/${id}`, { method: "DELETE" });
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  // ==============================
  // FILTER + PAGINATION (client-side)
  // ==============================
  const areaOptions = useMemo(
    () =>
      Array.from(new Set(projects.map((p) => p.areaCategory).filter(Boolean))),
    [projects]
  );

  const filteredProjects = projects.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (item.name ?? "").toLowerCase().includes(q) ||
      String(item.code ?? "").toLowerCase().includes(q) ||
      (item.location ?? "").toLowerCase().includes(q) ||
      (item.contractorCompany ?? "").toLowerCase().includes(q) ||
      (item.contactPersonName ?? "").toLowerCase().includes(q);
    const matchesStatus =
      selectedStatus === "All Status" || item.status === selectedStatus;
    const matchesArea =
      selectedArea === "All Area" || item.areaCategory === selectedArea;
    return matchesSearch && matchesStatus && matchesArea;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_LIMIT));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_LIMIT;
  const pagedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PAGE_LIMIT
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

      {/* Error banner */}
      {error && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Top Filter Panel */}
      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Filter by Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
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
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option>All Area</option>
            {areaOptions.map((a) => (
              <option key={a}>{a}</option>
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
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
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Columns (
            {filteredProjects.length} items)
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </button>
        </div>
      </div>

      {/* Main Table */}
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
              {isLoading ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  </td>
                </tr>
              ) : pagedProjects.length > 0 ? (
                pagedProjects.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-indigo-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="py-3.5 px-3 font-medium text-slate-500">
                      #{item.id}
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
                        {item.projectType}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {item.areaCategory} Area
                      </p>
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-slate-600 whitespace-nowrap">
                      <p className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar className="h-3 w-3 text-emerald-600" />{" "}
                        {item.startDate}
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        To: {item.endDate}
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
                        {item.contactPersonName || "N/A"}
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
                        {item.contractorCompany || "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Mgr: {item.projectManager || "N/A"}
                      </p>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {item.budget ? `৳${Number(item.budget).toLocaleString()}` : "—"}
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
                        ></div>
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
                          onClick={() => handleOpenEdit(item)}
                          className="rounded-md bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="rounded-md bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-60"
                          title="Delete"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    No matching projects found. Try checking your search or filter
                    values.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filteredProjects.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-700">
              {startIndex + pagedProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {filteredProjects.length}
            </span>{" "}
            entries
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
              className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`rounded-md px-3 py-1 text-xs font-medium ${
                  n === currentPage
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-6">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                {editingProject ? "Edit Project Details" : "Add New Project"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
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

            <form
              onSubmit={handleSubmit}
              className="p-5 bg-slate-50/30 space-y-3.5"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Project Code (number)">
                  <input
                    type="number"
                    required
                    placeholder="101"
                    value={formData.code}
                    onChange={(e) => setField("code", e.target.value)}
                    className={`${inputClass} font-mono`}
                  />
                </Field>

                <Field label="Project Name">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Heights"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Project Type">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commercial"
                    value={formData.projectType}
                    onChange={(e) => setField("projectType", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Area Category">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Urban"
                    value={formData.areaCategory}
                    onChange={(e) => setField("areaCategory", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Location / Address">
                  <input
                    type="text"
                    placeholder="e.g. Gulshan-2, Dhaka"
                    value={formData.location}
                    onChange={(e) => setField("location", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Total Budget (৳)">
                  <input
                    type="number"
                    min="0"
                    placeholder="15000000"
                    value={formData.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Contact Person Name">
                  <input
                    type="text"
                    placeholder="Person Name"
                    value={formData.contactPersonName}
                    onChange={(e) => setField("contactPersonName", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Contact Phone">
                  <input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    value={formData.contactPhone}
                    onChange={(e) => setField("contactPhone", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Client Email">
                  <input
                    type="email"
                    placeholder="client@domain.com"
                    value={formData.clientEmail}
                    onChange={(e) => setField("clientEmail", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Contractor Company">
                  <input
                    type="text"
                    placeholder="Contractor Name"
                    value={formData.contractorCompany}
                    onChange={(e) => setField("contractorCompany", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Project Manager">
                  <input
                    type="text"
                    placeholder="Manager Name"
                    value={formData.projectManager}
                    onChange={(e) => setField("projectManager", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Number of Storeys">
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 10"
                    value={formData.storeys}
                    onChange={(e) => setField("storeys", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Start Date">
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setField("startDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="End Date">
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setField("endDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="Status">
                  <select
                    value={formData.status}
                    onChange={(e) => setField("status", e.target.value)}
                    className={inputClass}
                  >
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                  </select>
                </Field>

                <Field label="Progress Percentage (%)">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setField("progress", Number(e.target.value))}
                    className={inputClass}
                  />
                </Field>

                <Field label="Project Description" className="md:col-span-3">
                  <textarea
                    rows={2}
                    placeholder="Short description about the project..."
                    value={formData.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className={inputClass}
                  ></textarea>
                </Field>

                {formError && (
                  <p className="text-xs text-red-600 md:col-span-3">{formError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
                  {editingProject ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}