/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Check, Search } from "lucide-react";

// ---------- Types ----------
export interface SalaryGradeItem {
  id: string | number;
  uuid: string; // ✅ uuid যোগ করা হলো TypeScript এরর ফিক্সের জন্য
  setupId: string;
  basicSalary: number;
  type: string;
  name: string;
  percent: number | string;
  amount: number | string;
}

export interface MasterSetup {
  uuid: string;
  type: string;
  name: string;
}

// ---------- API helpers ----------
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

async function handleRes(res: Response, action: string) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.message || json?.error || `Failed to ${action} (${res.status})`;
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return json;
}

// ১. মাস্টার ডাটা ফেচ (AllowanceDeductionSetup)
async function fetchMasterSetups(): Promise<MasterSetup[]> {
  const url = `${API_BASE}/realbizpro/api/v1/allowance-deduction-setup?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch setups");
  
  return (json?.data?.data || [])
    .filter((item: any) => !item.deletedAt)
    .map((item: any) => ({
      uuid: item.uuid,
      type: item.type,
      name: item.name,
    }));
}

// ২. Salary Grade Item লিস্ট ফেচ
async function fetchGradeItems(): Promise<SalaryGradeItem[]> {
  const url = `${API_BASE}/realbizpro/api/v1/salary-grade-item?page=1&limit=100&withDeleted=false`;
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const json = await handleRes(res, "fetch salary grade items");

  return (json?.data?.data || [])
    .filter((item: any) => !item.deletedAt)
    .map((item: any) => ({
      id: item.id ?? item.uuid,
      uuid: item.uuid, // ✅ ম্যাপিং-এ uuid যুক্ত করা হলো
      setupId: item.setupId || "",
      basicSalary: Number(item.basicSalary) || 0,
      type: item.type || "",
      name: item.name || "",
      percent: Number(item.percent) || 0,
      amount: Number(item.amount) || 0,
    }));
}

// ৩. Salary Grade Item তৈরি
async function createGradeItem(payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/salary-grade-item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "create salary grade item");
}

// ৪. Salary Grade Item আপডেট
async function updateGradeItem(uuid: string, payload: any) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/salary-grade-item/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await handleRes(res, "update salary grade item");
}

// ৫. Salary Grade Item ডিলিট
async function softDeleteGradeItem(uuid: string) {
  const res = await fetch(`${API_BASE}/realbizpro/api/v1/salary-grade-item/${uuid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return await handleRes(res, "delete salary grade item");
}

// ---------- Form Modal ----------
function GradeItemModal({
  title,
  initialData,
  masterSetups,
  onClose,
  onSubmit,
}: {
  title: string;
  initialData?: SalaryGradeItem;
  masterSetups: MasterSetup[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    basicSalary: initialData?.basicSalary ? String(initialData.basicSalary) : "",
    setupId: initialData?.setupId || "",
    type: initialData?.type || "Allowance",
    percent: initialData?.percent ? String(initialData.percent) : "",
    amount: initialData?.amount ? String(initialData.amount) : "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // মাস্টার ডাটা ফিল্টার
  const filteredSetups = masterSetups.filter(s => s.type === formData.type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return setFormError("Name is required");
    if (!formData.basicSalary) return setFormError("Basic Salary is required");
    if (!formData.setupId) return setFormError("Allowance/Deduction Name is required");

    setSubmitting(true);
    setFormError(null);
    try {
      await onSubmit({
        name: formData.name,
        basicSalary: Number(formData.basicSalary),
        setupId: formData.setupId,
        type: formData.type,
        percent: Number(formData.percent) || 0,
        amount: Number(formData.amount) || 0,
      });
    } catch (err: any) {
      setFormError(err?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-surface rounded-lg shadow-xl w-full max-w-2xl mx-4 border border-border flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded flex items-center justify-center text-ink-muted hover:bg-canvas hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 flex flex-col">
          <div className="px-5 py-4 space-y-4 flex-1">
            
            {/* Name */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">
                Name<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-[12px] text-ink-muted mb-1">
                Basic Salary<span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={formData.basicSalary}
                onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                placeholder="Basic Salary"
                className="w-full border border-border rounded-md px-3 py-2 text-[13px] bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Type, Name (Master), Percent, Amount */}
            <div className="flex gap-2 items-end pt-2">
              <div className="w-1/4">
                <label className="block text-[11px] text-ink-muted mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value, setupId: "" })}
                  className="w-full border border-border rounded-md px-2 py-1.5 text-[12px] bg-surface text-ink focus:outline-none"
                >
                  <option value="Allowance">Allowance</option>
                  <option value="Deduction">Deduction</option>
                </select>
              </div>

              <div className="w-1/3">
                <label className="block text-[11px] text-ink-muted mb-1">Allowance/Deduction</label>
                <select
                  value={formData.setupId}
                  onChange={(e) => setFormData({ ...formData, setupId: e.target.value })}
                  className="w-full border border-border rounded-md px-2 py-1.5 text-[12px] bg-surface text-ink focus:outline-none"
                >
                  <option value="">Select Name</option>
                  {filteredSetups.map((setup) => (
                    <option key={setup.uuid} value={setup.uuid}>{setup.name}</option>
                  ))}
                </select>
              </div>

              <div className="w-1/6">
                <label className="block text-[11px] text-ink-muted mb-1">Percent(%)</label>
                <input
                  type="number"
                  value={formData.percent}
                  onChange={(e) => setFormData({ ...formData, percent: e.target.value })}
                  placeholder="Percent"
                  className="w-full border border-border rounded-md px-2 py-1.5 text-[12px] bg-surface text-ink focus:outline-none"
                />
              </div>

              <div className="w-1/6">
                <label className="block text-[11px] text-ink-muted mb-1">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="Amount"
                  className="w-full border border-border rounded-md px-2 py-1.5 text-[12px] bg-surface text-ink focus:outline-none"
                />
              </div>
            </div>

            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-md text-[13px]">
                {formError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-border bg-surface rounded-b-lg mt-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-1.5 rounded-md border border-border text-[13px] text-ink-muted hover:bg-canvas disabled:opacity-50 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function SalaryGradeItemListPage() {
  const [dataList, setDataList] = useState<SalaryGradeItem[]>([]);
  const [masterSetups, setMasterSetups] = useState<MasterSetup[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SalaryGradeItem | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [itemsRes, setupsRes] = await Promise.all([
        fetchGradeItems(),
        fetchMasterSetups()
      ]);
      
      setDataList(itemsRes);
      setMasterSetups(setupsRes);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = dataList.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      String(item.basicSalary).includes(q) ||
      item.type.toLowerCase().includes(q)
    );
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / entries));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * entries;
  const pageRows = filtered.slice(start, start + entries);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + entries, total);

  const goPage = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)));

  const handleDelete = async (item: SalaryGradeItem) => {
    if (!confirm(`Delete item "${item.name}"?`)) return;

    try {
      setActionLoading(true);
      await softDeleteGradeItem(item.uuid); // ✅ uuid ব্যবহার করা হলো
      
      setDataList((prev) => prev.filter((row) => row.uuid !== item.uuid));
      
      if (pageRows.length === 1 && currentPage > 1) {
        setPage((p) => p - 1);
      }
    } catch (err: any) {
      alert(err?.message || "Failed to delete");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink relative transition-colors duration-200">
      
      {/* Breadcrumb + Add button */}
      <div className="bg-surface border-b border-border px-5 py-2.5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-ink-muted hover:text-ink cursor-pointer transition-colors">Home</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink-muted">HRM</span>
          <span className="text-ink-faint mx-1">›</span>
          <span className="text-ink font-medium">Salary Grade Item List</span>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 text-white text-[13px] font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Salary Grade Item Add
        </button>
      </div>

      <div className="p-4">
        {/* Show + Search */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-[13px] text-ink-muted">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setPage(1);
              }}
              className="border border-border rounded px-2 py-1 text-[13px] bg-surface text-ink focus:outline-none"
            >
              {[5, 10, 25, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span>entries</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-ink-muted">Search:</span>
            <div className="relative">
              <Search className="absolute left-2 top-1.5 w-3.5 h-3.5 text-ink-faint" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="border border-border rounded pl-7 pr-2 py-1 text-[13px] w-48 bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Loading & Error states */}
        {loading && (
          <div className="flex items-center justify-center py-10 text-ink-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading...
          </div>
        )}
        {error && (
          <div className="bg-rose-50 text-rose-700 p-3 rounded-md text-sm mb-4">
            {error} <button onClick={loadData} className="underline ml-2">Retry</button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-surface rounded-lg border border-border shadow-sm shadow-black/6 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12.5px]">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    {["SL", "NAME", "BASIC SALARY", "ACTION"].map((h) => (
                      <th key={h} className="px-3 py-2.5 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-10 text-center text-ink-faint">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row, index) => (
                      <tr key={row.uuid} className="border-b border-border hover:bg-canvas/70 transition-colors">
                        <td className="px-3 py-2.5 text-ink-muted">{start + index + 1}</td>
                        <td className="px-3 py-2.5 text-ink font-medium">{row.name}</td>
                        <td className="px-3 py-2.5 text-ink">{row.basicSalary}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingItem(row)}
                              type="button"
                              className="w-7 h-7 rounded bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(row)}
                              disabled={actionLoading}
                              type="button"
                              className="w-7 h-7 rounded bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 disabled:opacity-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 border-t border-border text-[13px] text-ink-muted">
              <span>
                Showing {from} to {to} of {total} entries
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => goPage(currentPage - 1)}
                  className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goPage(p)}
                    className={`min-w-[32px] px-2 py-1 rounded font-medium transition-colors ${
                      currentPage === p 
                        ? "bg-indigo-600 text-white" 
                        : "text-ink hover:bg-canvas"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => goPage(currentPage + 1)}
                  className="px-2.5 py-1 rounded border border-border hover:bg-canvas disabled:opacity-40 disabled:cursor-not-allowed text-ink transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <GradeItemModal
          title="Salary Grade Item"
          masterSetups={masterSetups}
          onClose={() => setIsAddOpen(false)}
          onSubmit={async (data) => {
            await createGradeItem(data);
            setIsAddOpen(false);
            await loadData();
          }}
        />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <GradeItemModal
          title="Salary Grade Item"
          initialData={editingItem}
          masterSetups={masterSetups}
          onClose={() => setEditingItem(null)}
          onSubmit={async (data) => {
            if (!editingItem.uuid) {
              alert("UUID is missing");
              return;
            }
            await updateGradeItem(editingItem.uuid, data); // ✅ uuid ব্যবহার করা হলো
            setEditingItem(null);
            await loadData();
          }}
        />
      )}
    </div>
  );
}