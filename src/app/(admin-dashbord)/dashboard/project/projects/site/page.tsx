"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Home,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ==============================
// TYPES
// ==============================
interface SiteItem {
  id: string;
  uuid?: string;
  code: string;
  name: string;
  location: string;
  description: string;
  projectType: string;
  projectId: string | number;
  // backend relation pathale ei duto theke project name ney
  project?: { id: string | number; name: string } | null;
}

interface ProjectOption {
  id: string | number;
  name: string;
  projectType: string;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type SortKey = "id" | "code" | "name" | "location";
type SortOrder = "ASC" | "DESC";

interface FormState {
  projectType: string;
  projectId: string;
  code: string;
  name: string;
  description: string;
  location: string;
}

const generateCode = () => "P" + Math.floor(1000000 + Math.random() * 9000000);

// ==============================
// API CONFIG
// .env.local: NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
// ==============================
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const API_PREFIX = `${BASE_URL}/realbizpro/api/v1`;
const SITES_URL = `${API_PREFIX}/project-sites`;
const PROJECTS_URL = `${API_PREFIX}/projects`;
const PROJECT_TYPES_URL = `${API_PREFIX}/project-type`;

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

// array ba { data: [...] } duto-i handle kore
const extractList = (data: any): any[] =>
  Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none";

export default function SiteManagementPage() {
  // ==============================
  // LIST STATE
  // ==============================
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("DESC");

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // debounced

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // DROPDOWN DATA
  // ==============================
  const [projectTypeOptions, setProjectTypeOptions] = useState<string[]>([]);
  const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);

  // ==============================
  // MODAL / FORM
  // ==============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<SiteItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormState>({
    projectType: "",
    projectId: "",
    code: generateCode(),
    name: "",
    description: "",
    location: "",
  });

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // ==============================
  // LOAD DROPDOWNS (project types + projects)
  // ==============================
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [typesRes, projectsRes] = await Promise.all([
          request<{ data: any }>(`${PROJECT_TYPES_URL}?page=1&limit=100`),
          request<{ data: any }>(PROJECTS_URL),
        ]);

        const projects: ProjectOption[] = extractList(projectsRes.data).map(
          (p: any) => ({
            id: p.id,
            name: p.name,
            projectType: p.projectType,
          })
        );
        setProjectOptions(projects);

        const typeNames = extractList(typesRes.data).map((t: any) => t.name);
        // project-type API na pele projects theke type gulo nibe
        const fallback = projects.map((p) => p.projectType).filter(Boolean);
        setProjectTypeOptions(
          Array.from(new Set(typeNames.length ? typeNames : fallback))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dropdown data"
        );
      }
    };
    loadOptions();
  }, []);

  // ==============================
  // SEARCH DEBOUNCE
  // ==============================
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // ==============================
  // FETCH SITES (GET)
  // ==============================
  const fetchSites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(entriesPerPage),
        sortBy,
        sortOrder,
        withDeleted: "false",
      });
      if (searchQuery) params.set("search", searchQuery);

      const json = await request<{
        success: boolean;
        data: { data: SiteItem[]; meta: Meta };
      }>(`${SITES_URL}?${params.toString()}`);

      setSites(json.data.data);
      setMeta(json.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sites");
    } finally {
      setIsLoading(false);
    }
  }, [page, entriesPerPage, sortBy, sortOrder, searchQuery]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  // ==============================
  // HELPERS
  // ==============================
  const projectNameOf = (site: SiteItem) =>
    site.project?.name ||
    projectOptions.find((p) => String(p.id) === String(site.projectId))?.name ||
    (site.projectId ? `#${site.projectId}` : "—");

  const filteredProjectOptions = useMemo(
    () =>
      formData.projectType
        ? projectOptions.filter((p) => p.projectType === formData.projectType)
        : projectOptions,
    [projectOptions, formData.projectType]
  );

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(key);
      setSortOrder("ASC");
    }
    setPage(1);
  };

  const sortIcon = (key: SortKey) =>
    sortBy === key ? (sortOrder === "ASC" ? "↑" : "↓") : "↕";

  // ==============================
  // MODAL HANDLERS
  // ==============================
  const handleOpenAdd = () => {
    setEditingSite(null);
    setFormData({
      projectType: "",
      projectId: "",
      code: generateCode(),
      name: "",
      description: "",
      location: "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (site: SiteItem) => {
    setEditingSite(site);
    setFormData({
      projectType: site.projectType ?? "",
      projectId: String(site.project?.id ?? site.projectId ?? ""),
      code: site.code ?? "",
      name: site.name ?? "",
      description: site.description ?? "",
      location: site.location ?? "",
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSite(null);
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
      code: formData.code.trim(),
      name: formData.name.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      projectType: formData.projectType,
      projectId: Number(formData.projectId),
    };

    try {
      if (editingSite) {
        await request(`${SITES_URL}/${editingSite.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        await request(SITES_URL, {
          method: "POST",
          body: JSON.stringify(body),
        });
        setPage(1);
      }

      handleCloseModal();
      await fetchSites();
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
    if (!window.confirm("Are you sure you want to delete this site?")) return;

    setDeletingId(id);
    setError(null);
    try {
      await request(`${SITES_URL}/${id}`, { method: "DELETE" });

      // last item delete holey ager page e jao
      if (sites.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchSites();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  // ==============================
  // PAGINATION
  // ==============================
  const totalPages = Math.max(1, meta.totalPages);
  const windowStart = Math.max(1, Math.min(page - 2, totalPages - 4));
  const windowEnd = Math.min(totalPages, windowStart + 4);
  const pageNumbers = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  );
  const showingFrom = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const showingTo = (meta.page - 1) * meta.limit + sites.length;

  const sortableTh = (label: string, key: SortKey, extra = "") => (
    <th
      onClick={() => handleSort(key)}
      className={`cursor-pointer select-none py-3 px-4 font-semibold ${extra}`}
    >
      {label} {sortIcon(key)}
    </th>
  );

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 font-sans text-slate-800">
      {/* Breadcrumb Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-slate-200/60">
        <nav className="flex items-center text-xs font-medium text-slate-500">
          <a
            href="#"
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
          >
            <Home className="h-3.5 w-3.5" /> Home
          </a>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-500">Project</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-indigo-600 font-semibold">Site</span>
        </nav>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          <Plus className="h-4 w-4" /> Create Site
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Control Bar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200/60">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Search:</span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#7c3aed] text-white text-[11px] uppercase tracking-wider">
                {sortableTh("ID", "id", "w-16")}
                {sortableTh("Code", "code", "w-32")}
                <th className="py-3 px-4 font-semibold">Project</th>
                {sortableTh("Name", "name")}
                <th className="py-3 px-4 font-semibold">Description</th>
                {sortableTh("Location", "location")}
                <th className="py-3 px-4 font-semibold text-center w-28">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  </td>
                </tr>
              ) : sites.length > 0 ? (
                sites.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-indigo-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600">
                      {item.code}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {projectNameOf(item)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {item.location}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="rounded bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="rounded bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition-all shadow-sm disabled:opacity-60"
                          title="Delete"
                        >
                          {deletingId === item.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 px-4 py-3 bg-slate-50/50 gap-2">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">{showingFrom}</span> to{" "}
            <span className="font-medium text-slate-700">{showingTo}</span> of{" "}
            <span className="font-medium text-slate-700">{meta.total}</span>{" "}
            entries
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                disabled={isLoading}
                className={`rounded-md px-3.5 py-1 text-xs font-medium ${
                  n === page
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                {editingSite ? "Site Edit" : "Site Add"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-5 bg-slate-50/30 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: e.target.value,
                        projectId: "", // type change hole project reset
                      }))
                    }
                    className={inputClass}
                    required
                  >
                    <option value="">Select Project Type</option>
                    {projectTypeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setField("projectId", e.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="">Select Project</option>
                    {filteredProjectOptions.map((p) => (
                      <option key={p.id} value={String(p.id)}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setField("code", e.target.value)}
                    className={`${inputClass} font-mono`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Site Name"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Site Location"
                    value={formData.location}
                    onChange={(e) => setField("location", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {formError && (
                  <p className="text-xs text-red-600 md:col-span-2">
                    {formError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-60"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
                  {editingSite ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}