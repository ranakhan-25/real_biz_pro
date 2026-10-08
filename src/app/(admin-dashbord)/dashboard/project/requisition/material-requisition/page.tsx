/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  Home,
  X,
  Save,
  FileSpreadsheet,
  FileText,
  ArrowRightLeft,
  Layers,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Paperclip,
  Calendar,
  Building,
  Loader2,
} from "lucide-react";

// ==================== TYPES ====================
export interface RequisitionItem {
  id: string;
  uuid?: string;
  select: boolean;
  projectType: string;
  projectName: string;
  titleOrNameOfWork: string;
  code: string;
  referenceNumber: string;
  date: string;
  demandDate: string;
  addedBy: string;
  approvalLayer: string;
  approvedByUsers: string[];
  attachmentUrl: string | null;
  company?: string;
  supplier?: string;
  status?: string;
}

// ==================== API HELPERS ====================
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002";

const formatDisplayDate = (d: string | null | undefined) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
};

const generateCode = () =>
  `REQ-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, "0")}`;

async function fetchRequisitions(params?: {
  page?: number;
  limit?: number;
}): Promise<{ data: RequisitionItem[]; meta: any }> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 100;

  const url = `${API_BASE}/realbizpro/api/v1/material-requisition?page=${page}&limit=${limit}&skip=0&sortBy=createdAt&sortOrder=DESC&withDeleted=false`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch requisitions: ${res.status}`);
  }

  const json = await res.json();

  const mapped: RequisitionItem[] = (json?.data?.data || []).map(
    (item: any) => ({
      id: String(item.id ?? item.uuid),
      uuid: item.uuid,
      select: false,
      projectType: item.projectType || "",
      projectName: item.projectName || item.project || "",
      titleOrNameOfWork: item.titleOrNameOfWork || "",
      code: item.code || "",
      referenceNumber: item.referenceNumber || item.ref || "",
      date: formatDisplayDate(item.createdAt || item.date),
      demandDate: formatDisplayDate(item.demandDate),
      addedBy: item.addedBy || "—",
      approvalLayer: item.approvalLayer || "PENDING",
      approvedByUsers: Array.isArray(item.approvedByUsers)
        ? item.approvedByUsers
        : [],
      attachmentUrl: item.attachmentUrl || item.attachment || null,
      company: item.company || "",
      supplier: item.supplier || "",
      status: item.status || "pending",
    }),
  );

  return { data: mapped, meta: json?.data?.meta };
}

async function createRequisition(payload: Record<string, any>) {
  const res = await fetch(
    `${API_BASE}/realbizpro/api/v1/material-requisition`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Create failed");
  }
  return res.json();
}

async function updateRequisition(uuid: string, payload: Record<string, any>) {
  const res = await fetch(
    `${API_BASE}/realbizpro/api/v1/material-requisition/${uuid}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Update failed");
  }
  return res.json();
}

async function softDeleteRequisition(uuid: string) {
  const res = await fetch(
    `${API_BASE}/realbizpro/api/v1/material-requisition/${uuid}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
  );
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
}

// Exact API payload
const toApiPayload = (data: {
  projectType: string;
  projectName: string;
  titleOrNameOfWork: string;
  code?: string;
  referenceNumber: string;
  demandDate: string;
  addedBy?: string;
  approvalLayer?: string;
  attachmentUrl?: string | null;
  company?: string;
  supplier?: string;
  status?: string;
}) => {
  const toYMD = (val?: string) => {
    if (!val) return undefined;
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    try {
      return new Date(val).toISOString().slice(0, 10);
    } catch {
      return val;
    }
  };

  const code =
    data.code && data.code.trim() ? data.code.trim() : generateCode();

  return {
    projectType: data.projectType,
    projectName: data.projectName,
    titleOrNameOfWork: data.titleOrNameOfWork,
    code,
    referenceNumber: data.referenceNumber,
    demandDate: toYMD(data.demandDate),
    company: data.company || "",
    supplier: data.supplier || "",
    attachmentUrl:
      data.attachmentUrl && data.attachmentUrl.trim()
        ? data.attachmentUrl.trim()
        : null,
    addedBy: data.addedBy || "user-uuid-123",
    approvalLayer: data.approvalLayer || "PENDING",
    status: data.status || "pending",
    // createdBy: "user-uuid-123",
    // updatedBy: "user-uuid-123",
  };
};

// ==================== MAIN PAGE ====================
export default function MaterialRequisitionPage() {
  const [requisitions, setRequisitions] = useState<RequisitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);

  const [dateFilter, setDateFilter] = useState(
    "1 September, 2026 - 30 September, 2026",
  );
  const [companyFilter, setCompanyFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RequisitionItem | null>(
    null,
  );

  const [formData, setFormData] = useState({
    projectType: "Real Estate",
    projectName: "Main Office Building Project",
    titleOrNameOfWork: "",
    demandDate: new Date().toISOString().slice(0, 10),
    referenceNumber: "REF-2026-001",
    code: generateCode(),
    addedBy: "user-uuid-123",
    company: "",
    supplier: "",
    attachmentUrl: "",
  });

  const loadRequisitions = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchRequisitions({ page: 1, limit: 100 });
      setRequisitions(data);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to load material requisitions";
      console.error(e);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequisitions();
  }, []);

  const handleSelectAll = () => {
    const updated = !selectAll;
    setSelectAll(updated);
    setRequisitions(
      requisitions.map((item) => ({ ...item, select: updated })),
    );
  };

  const handleRowSelect = (id: string) => {
    setRequisitions(
      requisitions.map((item) =>
        item.id === id ? { ...item, select: !item.select } : item,
      ),
    );
  };

  const filteredData = requisitions.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.projectName.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.titleOrNameOfWork.toLowerCase().includes(q) ||
      item.addedBy.toLowerCase().includes(q);

    const matchesProject = projectFilter
      ? item.projectName === projectFilter
      : true;
    const matchesTitle = titleFilter
      ? item.titleOrNameOfWork === titleFilter
      : true;

    return matchesSearch && matchesProject && matchesTitle;
  });

  const resetForm = () => {
    setFormData({
      projectType: "Real Estate",
      projectName: "Main Office Building Project",
      titleOrNameOfWork: "",
      demandDate: new Date().toISOString().slice(0, 10),
      referenceNumber: `REF-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      code: generateCode(),
      addedBy: "user-uuid-123",
      company: "",
      supplier: "",
      attachmentUrl: "",
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await createRequisition(
        toApiPayload({
          ...formData,
          approvalLayer: "PENDING",
          status: "pending",
        }),
      );
      await loadRequisitions();
      setIsAddOpen(false);
      resetForm();
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Create failed. Please try again.";
      console.error(e);
      alert(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem?.uuid) return;
    try {
      setActionLoading(true);
      await updateRequisition(
        selectedItem.uuid,
        toApiPayload({
          ...formData,
          approvalLayer: selectedItem.approvalLayer,
          status: selectedItem.status,
        }),
      );
      await loadRequisitions();
      setIsEditOpen(false);
      setSelectedItem(null);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Update failed. Please try again.";
      console.error(e);
      alert(message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (item: RequisitionItem) => {
    if (!confirm(`Delete requisition "${item.code}"?`)) return;
    try {
      setActionLoading(true);
      if (item.uuid) {
        await softDeleteRequisition(item.uuid);
      }
      setRequisitions((prev) => prev.filter((r) => r.id !== item.id));
      setActiveDropdown(null);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Delete failed. Please try again.";
      console.error(e);
      alert(message);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (item: RequisitionItem) => {
    setSelectedItem(item);

    let demandYMD = "";
    try {
      const d = new Date(item.demandDate);
      if (!isNaN(d.getTime())) {
        demandYMD = d.toISOString().slice(0, 10);
      }
    } catch {
      // ignore
    }

    setFormData({
      projectType: item.projectType || "Real Estate",
      projectName: item.projectName || "",
      titleOrNameOfWork: item.titleOrNameOfWork || "",
      demandDate: demandYMD,
      referenceNumber: item.referenceNumber || "",
      code: item.code || generateCode(),
      addedBy: item.addedBy || "user-uuid-123",
      company: item.company || "",
      supplier: item.supplier || "",
      attachmentUrl: item.attachmentUrl || "",
    });
    setIsEditOpen(true);
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Requisition</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">
            Material Requisition List
          </span>
        </div>

        {/* Top Header */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Material
              Requisition Dashboard
            </h1>
            <p className="text-[11px] text-slate-500">
              Manage, convert, and track all construction & office material
              requisitions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Multiple PO Convert
            </button>
            <button className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> Multiple RFQ Convert
            </button>
            <button className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Multiple Purchase
              Convert
            </button>
            <button
              onClick={() => {
                resetForm();
                setIsAddOpen(true);
              }}
              className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> +New Material Requisition
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Company
            </label>
            <div className="relative">
              <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                placeholder="Company UUID / name"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Supplier
            </label>
            <input
              type="text"
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              placeholder="Supplier UUID"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Project
            </label>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select value</option>
              <option value="Main Office Building Project">
                Main Office Building Project
              </option>
              <option value="Hena Heights">Hena Heights</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block font-semibold text-slate-600 mb-1">
              Title/Name of Work
            </label>
            <input
              type="text"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Filter by title..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Entries & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-600 font-medium">Search:</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project, code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading material requisitions...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={loadRequisitions}
              className="underline text-xs font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
            <div className="overflow-x-auto min-h-[350px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                    <th className="py-3 px-3 w-12">ID</th>
                    <th className="py-3 px-3 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-white/40 cursor-pointer accent-indigo-700 w-3.5 h-3.5"
                      />
                    </th>
                    <th className="py-3 px-3">PROJECT TYPE</th>
                    <th className="py-3 px-3">PROJECT</th>
                    <th className="py-3 px-3">TITLE/NAME OF WORK</th>
                    <th className="py-3 px-3">CODE</th>
                    <th className="py-3 px-3">REF</th>
                    <th className="py-3 px-3">DATE</th>
                    <th className="py-3 px-3">DEMAND DATE</th>
                    <th className="py-3 px-3">ADDED BY</th>
                    <th className="py-3 px-3">APPROVAL LAYER</th>
                    <th className="py-3 px-3 text-center">ATTACHMENT</th>
                    <th className="py-3 px-3 text-center w-28">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.slice(0, entriesPerPage).map((item, index) => (
                      <tr
                        key={item.uuid || item.id}
                        className="hover:bg-indigo-50/30 transition-colors"
                      >
                        <td className="py-3 px-3 font-mono font-bold text-slate-600">
                          {index + 1}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={item.select}
                            onChange={() => handleRowSelect(item.id)}
                            className="rounded border-slate-300 cursor-pointer accent-indigo-600 w-3.5 h-3.5"
                          />
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-700">
                          {item.projectType}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {item.projectName}
                        </td>
                        <td className="py-3 px-3 text-slate-600 italic">
                          {item.titleOrNameOfWork || "N/A"}
                        </td>
                        <td className="py-3 px-3 font-mono text-indigo-700 font-semibold">
                          {item.code}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {item.referenceNumber}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {item.date}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {item.demandDate}
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-700">
                          {item.addedBy}
                        </td>
                        <td className="py-3 px-3">
                          <div className="space-y-0.5 text-[11px]">
                            <div
                              className={`font-semibold ${
                                item.approvalLayer
                                  ?.toLowerCase()
                                  .includes("completed") ||
                                item.approvalLayer === "APPROVED"
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {item.approvalLayer}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          {item.attachmentUrl ? (
                            <a
                              href={item.attachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-1 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 hover:bg-indigo-100"
                              title={item.attachmentUrl}
                            >
                              <Paperclip className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center relative">
                          <div className="relative inline-block text-left">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === item.id ? null : item.id,
                                )
                              }
                              className="inline-flex items-center gap-1 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-3 py-1.5 rounded shadow-2xs transition-colors cursor-pointer"
                            >
                              Action <ChevronDown className="w-3 h-3" />
                            </button>

                            {activeDropdown === item.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 text-left text-xs">
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setIsViewModalOpen(true);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full px-3 py-1.5 text-slate-700 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer font-medium"
                                >
                                  <Eye className="w-3.5 h-3.5 text-indigo-600" />{" "}
                                  View Details
                                </button>
                                <button
                                  onClick={() => openEditModal(item)}
                                  className="w-full px-3 py-1.5 text-slate-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer font-medium"
                                >
                                  <Edit className="w-3.5 h-3.5 text-amber-600" />{" "}
                                  Edit Record
                                </button>
                                <button
                                  onClick={() => handleDelete(item)}
                                  disabled={actionLoading}
                                  className="w-full px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium disabled:opacity-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />{" "}
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={13}
                        className="text-center py-12 text-slate-400 font-medium"
                      >
                        No requisition data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
              <div>
                Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
              <div className="inline-flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded border border-[#5949d6] bg-[#5949d6] text-white font-semibold"
                >
                  1
                </button>
                <button
                  type="button"
                  disabled
                  className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= ADD MODAL ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create New Material Requisition
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Office">Office</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    placeholder="e.g. Main Office Building Project"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Title / Name of Work *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleOrNameOfWork}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        titleOrNameOfWork: e.target.value,
                      })
                    }
                    placeholder="e.g. Construction of Main Office Building"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    placeholder="e.g. REQ-2026-0001"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.referenceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referenceNumber: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Demand Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.demandDate}
                    onChange={(e) =>
                      setFormData({ ...formData, demandDate: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company (UUID)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="company-uuid-123"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Supplier (UUID)
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    placeholder="supplier-uuid-123"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Attachment URL
                  </label>
                  <input
                    type="url"
                    value={formData.attachmentUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attachmentUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/files/requisition.pdf"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Edit className="w-4 h-4" /> Edit Material Requisition
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedItem(null);
                }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Office">Office</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) =>
                      setFormData({ ...formData, projectName: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Title / Name of Work *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleOrNameOfWork}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        titleOrNameOfWork: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.referenceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referenceNumber: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Demand Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.demandDate}
                    onChange={(e) =>
                      setFormData({ ...formData, demandDate: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Company (UUID)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Supplier (UUID)
                  </label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Attachment URL
                  </label>
                  <input
                    type="url"
                    value={formData.attachmentUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attachmentUrl: e.target.value,
                      })
                    }
                    placeholder="https://example.com/files/requisition.pdf"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedItem(null);
                  }}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Update Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW DETAILS MODAL ================= */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" /> Requisition Details:{" "}
                {selectedItem.code}
              </h3>
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Project Name:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.projectName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Project Type:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.projectType}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Title of Work:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.titleOrNameOfWork}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Code:</span>
                  <span className="font-mono font-bold text-indigo-700">
                    {selectedItem.code}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference:</span>
                  <span className="font-mono font-bold text-indigo-700">
                    {selectedItem.referenceNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Demand Date:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.demandDate}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Added By:</span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.addedBy}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Company:</span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.company || "—"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Supplier:</span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.supplier || "—"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Attachment:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedItem.attachmentUrl ? (
                      <a
                        href={selectedItem.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline"
                      >
                        View File
                      </a>
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">
                    Approval Status:
                  </span>
                  <span className="font-bold text-emerald-600">
                    {selectedItem.approvalLayer}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}