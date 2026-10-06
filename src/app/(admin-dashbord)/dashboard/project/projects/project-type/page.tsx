"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";

// ==============================
// TYPES
// ==============================
interface ProjectType {
  id: string;
  uuid: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type ColumnKey = "id" | "code" | "name" | "action";
type SortKey = "id" | "code" | "name";
type SortOrder = "ASC" | "DESC";

// ==============================
// API CONFIG
// ==============================
const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, ""); 
console.log("Base URL:", BASE_URL);
const API_URL = `${BASE_URL}/realbizpro/api/v1/project-type`;

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // যদি টোকেন বা অন্য কোনো হেডার প্রয়োজন হয়, এখানে যুক্ত করতে পারেন
      // "Authorization": `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // empty body (যেমন 204 No Content রেসপন্সের ক্ষেত্রে)
  }

  if (!res.ok || json?.success === false) {
    const msg = Array.isArray(json?.message)
      ? json.message.join(", ")
      : json?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return (json ?? {}) as T;
}

const PAGE_LIMIT = 10;

export default function ProjectTypePage() {
  // ==============================
  // DATA
  // ==============================
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: PAGE_LIMIT,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // ==============================
  // MODAL / FORM
  // ==============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ==============================
  // COLUMN DROPDOWN
  // ==============================
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>({
    id: true,
    code: true,
    name: true,
    action: true,
  });

  // ==============================
  // FETCH LIST (GET)
  // ==============================
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_LIMIT),
        sortBy,
        sortOrder,
        withDeleted: "false",
      });

      const json = await request<{
        success: boolean;
        data: { data: ProjectType[]; meta: Meta };
      }>(`${API_URL}?${params.toString()}`);

      setProjects(json.data.data);
      setMeta(json.data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project types");
    } finally {
      setIsLoading(false);
    }
  }, [page, sortBy, sortOrder]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ==============================
  // CLOSE COLUMN MENU OUTSIDE CLICK
  // ==============================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnMenuRef.current &&
        !columnMenuRef.current.contains(event.target as Node)
      ) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==============================
  // SEARCH
  // ==============================
  const filteredProjects = projects.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==============================
  // SORT
  // ==============================
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
  // COLUMN TOGGLE
  // ==============================
  const toggleColumn = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const selectAllColumns = () =>
    setVisibleColumns({ id: true, code: true, name: true, action: true });

  const clearAllColumns = () =>
    setVisibleColumns({ id: false, code: false, name: false, action: false });

  // ==============================
  // MODAL HANDLERS
  // ==============================
  const handleOpenAdd = () => {
    setEditingProjectId(null);
    setNewCode("");
    setNewName("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: ProjectType) => {
    setEditingProjectId(project.id);
    setNewCode(project.code);
    setNewName(project.name);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCode("");
    setNewName("");
    setEditingProjectId(null);
    setFormError(null);
  };

  // ==============================
  // SUBMIT (POST) / UPDATE (PATCH)
  // ==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = newCode.trim();
    const name = newName.trim();
    if (!code || !name) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      if (editingProjectId !== null) {
        await request(`${API_URL}/${editingProjectId}`, {
          method: "PATCH",
          body: JSON.stringify({ code, name }),
        });
      } else {
        await request(API_URL, {
          method: "POST",
          body: JSON.stringify({ code, name }),
        });
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
  // DELETE (Soft Delete) - Fixed
  // ==============================
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project type?")) {
      return;
    }

    setDeletingId(id);
    setError(null);
    
    try {
      // সঠিক URL এবং DELETE মেথড নিশ্চিত করা হয়েছে
      console.log(`Deleting item with ID: ${id} at URL: ${API_URL}/${id}`);
      
      await request(`${API_URL}/${id}`, { 
        method: "DELETE" 
      });

      // ডাটা রিলোড বা পেজ অ্যাডজাস্ট করা
      if (projects.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchProjects();
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  // ==============================
  // PAGINATION
  // ==============================
  const pageNumbers = Array.from({ length: meta.totalPages }, (_, i) => i + 1);
  const visibleColumnCount = Object.values(visibleColumns).filter(Boolean).length || 1;

  const columnOptions: { key: ColumnKey; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "code", label: "Code" },
    { key: "name", label: "Name" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* BREADCRUMB */}
      <nav className="flex items-center px-4 pt-4 pb-3 text-[12px] font-medium text-slate-500">
        <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          Home
        </a>
        <ChevronRight className="mx-2 h-3 w-3 text-slate-300" />
        <span className="cursor-pointer hover:text-indigo-600">Project</span>
        <ChevronRight className="mx-2 h-3 w-3 text-slate-300" />
        <span className="text-slate-700">Project Type</span>
      </nav>

      {/* TOP CREATE BUTTON */}
      <div className="mb-3 flex items-center justify-end px-4">
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-md bg-[#6755d9] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-[#5847c7]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create Project Type
        </button>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="mx-4 mb-3 flex items-center justify-between rounded border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* TABLE AREA */}
      <div className="px-4">
        <div className="relative">
          {/* SELECT COLUMNS */}
          <div ref={columnMenuRef} className="absolute left-0 top-0 z-30">
            <button
              onClick={() => setIsColumnMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-md border border-[#6655d8] bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#5847c7] transition-all hover:bg-indigo-50"
            >
              Select Columns
              <ChevronRight
                className={`h-3 w-3 transition-transform ${
                  isColumnMenuOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isColumnMenuOpen && (
              <div className="absolute left-0 top-8 w-[165px] rounded-md border border-slate-200 bg-white shadow-lg">
                {columnOptions.map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[key]}
                      onChange={() => toggleColumn(key)}
                      className="h-3 w-3 accent-[#6755d9]"
                    />
                    <span className="text-[11px] text-slate-700">{label}</span>
                  </label>
                ))}

                <div className="flex items-center gap-1 border-t border-slate-100 p-2">
                  <button
                    onClick={clearAllColumns}
                    className="rounded bg-cyan-500 px-2.5 py-1 text-[9px] font-semibold text-white hover:bg-cyan-600"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={selectAllColumns}
                    className="rounded bg-cyan-500 px-2.5 py-1 text-[9px] font-semibold text-white hover:bg-cyan-600"
                  >
                    Select All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SEARCH */}
          <div className="mb-3 flex justify-end">
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-slate-700">Search:</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 w-[138px] rounded border border-slate-300 bg-white px-2 text-[11px] outline-none focus:border-[#6755d9]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#7464e5] text-[10px] uppercase text-white">
                  {(["id", "code", "name"] as SortKey[]).map(
                    (key) =>
                      visibleColumns[key] && (
                        <th
                          key={key}
                          onClick={() => handleSort(key)}
                          className="cursor-pointer select-none border-r border-white/10 px-5 py-1.5 font-semibold"
                        >
                          <div className="flex items-center gap-1">
                            {key}
                            <span className="text-white/60">{sortIcon(key)}</span>
                          </div>
                        </th>
                      )
                  )}

                  {visibleColumns.action && (
                    <th className="px-5 py-1.5 text-center font-semibold">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="text-[11px] text-slate-700">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={visibleColumnCount}
                      className="py-10 text-center text-xs text-slate-400"
                    >
                      <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                    </td>
                  </tr>
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((item, index) => {
                    console.log(`Item at index ${index}:`, item);
                    return (
                      <tr
                        key={item.id}
                        className={`border-b border-slate-200 transition-colors hover:bg-indigo-50/30 ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                        }`}
                      >
                        {visibleColumns.id && (
                          <td className="px-5 py-1.5">{item.id}</td>
                        )}

                        {visibleColumns.code && (
                          <td className="px-5 py-1.5 font-medium text-slate-700">
                            {item.code}
                          </td>
                        )}

                        {visibleColumns.name && (
                          <td className="px-5 py-1.5">{item.name}</td>
                        )}

                        {visibleColumns.action && (
                          <td className="px-5 py-1.5">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="flex h-7 w-8 items-center justify-center rounded bg-[#7564e7] text-white transition-colors hover:bg-[#6251d0]"
                                title="Edit"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>

                              <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deletingId === item.id}
                                className="flex h-7 w-8 items-center justify-center rounded bg-[#f45b5b] text-white transition-colors hover:bg-[#df4848] disabled:opacity-60"
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
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumnCount}
                      className="py-10 text-center text-xs text-slate-400"
                    >
                      No matching project types found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-between py-3">
            <span className="text-[10px] text-slate-500">
              Total: {meta.total}
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <ChevronLeft className="h-3 w-3" />
                Previous
              </button>

              {pageNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  disabled={isLoading}
                  className={`rounded px-2.5 py-1 text-[10px] font-semibold ${
                    n === meta.page
                      ? "bg-[#6755d9] text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                disabled={page >= meta.totalPages || isLoading}
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/20">
          <div className="relative mt-0 w-full max-w-[860px] overflow-hidden rounded-b-md bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex h-10 items-center justify-between bg-[#e7eaed] px-4">
              <h2 className="text-[12px] font-medium text-slate-800">
                {editingProjectId !== null ? "Project Edit" : "Project Add"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="flex h-6 w-6 items-center justify-center text-slate-500 transition-colors hover:text-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* BODY */}
              <div className="grid grid-cols-1 gap-4 bg-[#e9ecef] px-5 py-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-slate-700">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="P4773027"
                    className="h-7 w-full rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-700 outline-none transition focus:border-[#6755d9] focus:ring-1 focus:ring-[#6755d9]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Office"
                    className="h-7 w-full rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-700 outline-none transition focus:border-[#6755d9] focus:ring-1 focus:ring-[#6755d9]/20"
                  />
                </div>

                {formError && (
                  <p className="text-[11px] text-red-600 md:col-span-2">
                    {formError}
                  </p>
                )}
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-5 py-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="rounded-md bg-[#a5a8ac] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#909398] disabled:opacity-60"
                >
                  Close
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-md bg-[#6755d9] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#5847c7] disabled:opacity-60"
                >
                  {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
                  {editingProjectId !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}