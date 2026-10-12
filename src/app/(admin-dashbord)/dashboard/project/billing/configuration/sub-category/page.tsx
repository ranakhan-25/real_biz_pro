/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  Search,
  Plus,
  ChevronRight,
  Home,
  X,
  Save,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Tag,
} from "lucide-react";

// ============================================================
// API CONFIG
// ============================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const API_PREFIX = "/realbizpro/api/v1";

const BILLING_SUB_CATEGORY_ENDPOINT = `${API_BASE_URL}${API_PREFIX}/billing-sub-category`;

const CURRENT_USER = "Rana";

// ============================================================
// TYPES
// ============================================================

export interface CategoryItem {
  id: string;
  uuid: string;
  type: string;
  categoryId: string | null;
  code: string;
  name: string;
  description: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface CategoryMeta {
  total: number;
  page: number;
  limit: number;
  skip: number;
  totalPages: number;
}

interface CategoryListResponse {
  success?: boolean;
  data?: {
    success?: boolean;
    data?: {
      data?: CategoryItem[];
      meta?: CategoryMeta;
    };
  };
  message?: string;
}

interface CategoryFormData {
  type: string;
  code: string;
  name: string;
  description: string;
}

// ============================================================
// API REQUEST HELPER
// ============================================================

async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is missing. Please check .env.local",
    );
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });

    const text = await response.text();

    let body: any = null;

    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = null;
    }

    if (!response.ok) {
      const message =
        body?.message ||
        body?.error ||
        `Request failed with status ${response.status}`;

      throw new Error(Array.isArray(message) ? message.join(", ") : message);
    }

    return body as T;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Failed to fetch. Please check that the backend is running, the API URL is correct, and CORS is configured.",
      );
    }

    throw error;
  }
}

// ============================================================
// EXTRACT LIST RESPONSE
// ============================================================

function extractCategoryList(response: CategoryListResponse) {
  /*
    Your API response:

    response
      └── data
          └── data
              ├── data: [...]
              └── meta: {...}

    So:

    response.data.data.data
    response.data.data.meta
  */

  return {
    rows: response?.data?.data?.data ?? [],
    meta: response?.data?.data?.meta,
  };
}

// ============================================================
// EXTRACT SINGLE CATEGORY
// ============================================================

function extractSingleCategory(response: any): CategoryItem | null {
  /*
    Expected response:

    {
      success: true,
      data: {
        success: true,
        data: {...}
      }
    }

    Actual category:
    response.data.data
  */

  if (response?.data?.data && !Array.isArray(response.data.data)) {
    return response.data.data as CategoryItem;
  }

  if (response?.data && !Array.isArray(response.data)) {
    return response.data as CategoryItem;
  }

  return null;
}

// ============================================================
// COMPONENT
// ============================================================

export default function BillingSubCategoryListModule() {
  // ==========================================================
  // VIEW MODE
  // ==========================================================

  const [viewMode, setViewMode] = useState<"list" | "create">("list");

  // ==========================================================
  // DATA
  // ==========================================================

  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  // ==========================================================
  // FORM
  // ==========================================================

  const [formData, setFormData] = useState<CategoryFormData>({
    type: "Service",
    code: "",
    name: "",
    description: "",
  });

  // ==========================================================
  // MODALS
  // ==========================================================

  const [isViewOpen, setIsViewOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // ==========================================================
  // LOADING / ERROR
  // ==========================================================

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // ==========================================================
  // SEARCH / FILTER
  // ==========================================================

  const [searchQuery, setSearchQuery] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const [entriesPerPage, setEntriesPerPage] = useState(25);

  const [currentPage, setCurrentPage] = useState(1);

  const [meta, setMeta] = useState<CategoryMeta>({
    total: 0,
    page: 1,
    limit: 25,
    skip: 0,
    totalPages: 1,
  });

  // ==========================================================
  // GET ALL BILLING SUB CATEGORIES
  // ==========================================================

  const fetchCategories = useCallback(
    async (pageToLoad: number = currentPage) => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", String(pageToLoad));
        params.set("limit", String(entriesPerPage));

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        if (typeFilter) {
          params.set("type", typeFilter);
        }

        const url = `${BILLING_SUB_CATEGORY_ENDPOINT}?${params.toString()}`;

        const response = await apiRequest<CategoryListResponse>(url);

        const result = extractCategoryList(response);

        setCategories(result.rows);

        if (result.meta) {
          setMeta({
            total: result.meta.total ?? result.rows.length,
            page: result.meta.page ?? pageToLoad,
            limit: result.meta.limit ?? entriesPerPage,
            skip: result.meta.skip ?? (pageToLoad - 1) * entriesPerPage,
            totalPages: result.meta.totalPages ?? 1,
          });
        } else {
          setMeta({
            total: result.rows.length,
            page: pageToLoad,
            limit: entriesPerPage,
            skip: (pageToLoad - 1) * entriesPerPage,
            totalPages: 1,
          });
        }
      } catch (err) {
        console.error("Failed to fetch billing sub categories:", err);

        const message =
          err instanceof Error
            ? err.message
            : "Failed to fetch billing sub categories";

        setError(message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, entriesPerPage, searchQuery, typeFilter],
  );

  // ==========================================================
  // INITIAL LOAD / SEARCH / FILTER
  // ==========================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(currentPage);
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchCategories, currentPage]);

  // ==========================================================
  // FORM CHANGE
  // ==========================================================

  const handleFormChange = (field: keyof CategoryFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================================
  // CREATE BILLING SUB CATEGORY
  // ==========================================================

  const handleAddCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!formData.type.trim()) {
        setError("Billing sub category type is required");
        return;
      }

      if (!formData.code.trim()) {
        setError("Billing sub category code is required");
        return;
      }

      if (!formData.name.trim()) {
        setError("Billing sub category name is required");
        return;
      }

      const payload = {
        type: formData.type.trim(),
        code: formData.code.trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        createdBy: CURRENT_USER,
        updatedBy: CURRENT_USER,
      };

      await apiRequest(BILLING_SUB_CATEGORY_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Reset form
      setFormData({
        type: "Service",
        code: "",
        name: "",
        description: "",
      });

      // Back to list
      setViewMode("list");

      // Go to first page
      setCurrentPage(1);

      // Reload
      await fetchCategories(1);
    } catch (err) {
      console.error("Create billing sub category error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to create billing sub category";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // GET BILLING SUB CATEGORY BY UUID
  // ==========================================================

  const handleView = async (uuid: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiRequest<any>(
        `${BILLING_SUB_CATEGORY_ENDPOINT}/${uuid}`,
        {
          method: "GET",
        },
      );

      const category = extractSingleCategory(response);

      if (!category) {
        throw new Error("Billing sub category data not found");
      }

      setSelectedCategory(category);
      setIsViewOpen(true);
    } catch (err) {
      console.error("Get billing sub category error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to get billing sub category";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // OPEN EDIT
  // ==========================================================

  const handleOpenEdit = (category: CategoryItem) => {
    setSelectedCategory(category);

    setFormData({
      type: category.type || "Service",
      code: category.code || "",
      name: category.name || "",
      description: category.description || "",
    });

    setIsEditOpen(true);
  };

  // ==========================================================
  // UPDATE BILLING SUB CATEGORY
  // ==========================================================

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory?.uuid) {
      setError("Billing sub category UUID is missing");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (!formData.type.trim()) {
        setError("Billing sub category type is required");
        return;
      }

      if (!formData.name.trim()) {
        setError("Billing sub category name is required");
        return;
      }

      const payload = {
        type: formData.type.trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        updatedBy: CURRENT_USER,
      };

      await apiRequest(
        `${BILLING_SUB_CATEGORY_ENDPOINT}/${selectedCategory.uuid}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        },
      );

      setIsEditOpen(false);
      setSelectedCategory(null);

      setFormData({
        type: "Service",
        code: "",
        name: "",
        description: "",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Update billing sub category error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to update billing sub category";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // DELETE BILLING SUB CATEGORY
  // ==========================================================

  const handleDelete = async (category: CategoryItem) => {
    if (!category.uuid) {
      setError("Billing sub category UUID is missing");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await apiRequest(`${BILLING_SUB_CATEGORY_ENDPOINT}/${category.uuid}`, {
        method: "DELETE",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Delete billing sub category error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to delete billing sub category";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // RESTORE
  // ==========================================================

  const handleRestore = async (uuid: string) => {
    try {
      setLoading(true);
      setError("");

      await apiRequest(`${BILLING_SUB_CATEGORY_ENDPOINT}/${uuid}/restore`, {
        method: "PATCH",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Restore billing sub category error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Failed to restore billing sub category";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // ==========================================================
  // TYPE FILTER
  // ==========================================================

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  // ==========================================================
  // ENTRIES PER PAGE
  // ==========================================================

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  const goToPage = (page: number) => {
    if (page < 1 || page > meta.totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const pageNumbers = Array.from(
    {
      length: Math.max(meta.totalPages, 1),
    },
    (_, index) => index + 1,
  );

  // ==========================================================
  // OPEN CREATE
  // ==========================================================

  const handleOpenCreate = () => {
    setError("");

    setFormData({
      type: "Service",
      code: "",
      name: "",
      description: "",
    });

    setViewMode("create");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-between p-2 sm:p-3 font-sans">
      <div className="space-y-3 w-full flex-1 flex flex-col">
        {/* ====================================================
            BREADCRUMB
        ==================================================== */}

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="text-slate-600">Billing</span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="text-indigo-600 font-semibold">
            {viewMode === "list"
              ? "Billing Sub Category List"
              : "Add Billing Sub Category"}
          </span>
        </div>

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" />

              {viewMode === "list"
                ? "Billing Sub Category Management Dashboard"
                : "Create New Billing Sub Category"}
            </h1>

            <p className="text-[11px] text-slate-500">
              Manage all billing sub category records.
            </p>
          </div>

          <div>
            {viewMode === "list" ? (
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                +Add Billing Sub Category
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Previous
              </button>
            )}
          </div>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs text-rose-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-rose-500 hover:text-rose-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ====================================================
            LIST VIEW
        ==================================================== */}

        {viewMode === "list" && (
          <div className="w-full flex-1 flex flex-col space-y-3">
            {/* Filter */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs w-full">
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Type <span className="text-rose-500">*</span>
                </label>

                <select
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select One Option</option>

                  <option value="Product">Product</option>

                  <option value="Service">Service</option>
                </select>
              </div>
            </div>

            {/* Entries + Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-3 rounded-t-lg border-x border-t border-slate-200 w-full">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Show</span>

                <select
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={10}>10</option>

                  <option value={25}>25</option>

                  <option value={50}>50</option>

                  <option value={100}>100</option>
                </select>

                <span>entries</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 font-medium">
                  Search:
                </span>

                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search sub category name, code..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border-x border-b border-slate-200 rounded-b-lg overflow-hidden shadow-xs bg-white w-full flex-1">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                      <th className="py-2.5 px-4 w-16">SL</th>

                      <th className="py-2.5 px-4 w-40">TYPE</th>

                      <th className="py-2.5 px-4 w-48">CODE</th>

                      <th className="py-2.5 px-4">NAME</th>

                      <th className="py-2.5 px-4">DESCRIPTION</th>

                      <th className="py-2.5 px-4 text-center w-36">ACTION</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-12 text-slate-400 font-medium"
                        >
                          Loading billing sub categories...
                        </td>
                      </tr>
                    ) : categories.length > 0 ? (
                      categories.map((item, index) => (
                        <tr
                          key={item.uuid}
                          className="hover:bg-indigo-50/40 transition-colors"
                        >
                          {/* SL */}
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-600">
                            {meta.skip + index + 1}
                          </td>

                          {/* TYPE */}
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                item.type === "Product"
                                  ? "bg-cyan-50 text-cyan-700 border border-cyan-200"
                                  : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                              }`}
                            >
                              {item.type}
                            </span>
                          </td>

                          {/* CODE */}
                          <td className="py-2.5 px-4 font-mono text-slate-700 font-semibold">
                            {item.code}
                          </td>

                          {/* NAME */}
                          <td className="py-2.5 px-4 font-bold text-slate-900">
                            {item.name}
                          </td>

                          {/* DESCRIPTION */}
                          <td className="py-2.5 px-4 text-slate-600 max-w-xs">
                            <div className="truncate">
                              {item.description || "-"}
                            </div>
                          </td>

                          {/* ACTION */}
                          <td className="py-2.5 px-4 text-center">
                            <div className="inline-flex items-center gap-1 justify-center">
                              {/* VIEW */}
                              <button
                                type="button"
                                onClick={() => handleView(item.uuid)}
                                className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* EDIT */}
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(item)}
                                className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded transition-colors cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() => handleDelete(item)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-12 text-slate-400 font-medium"
                        >
                          No billing sub category records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ==================================================
                  PAGINATION
              ================================================== */}

              <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium w-full">
                <div>
                  Showing {meta.total === 0 ? 0 : meta.skip + 1} to{" "}
                  {Math.min(meta.skip + categories.length, meta.total)} of{" "}
                  {meta.total} entries
                </div>

                <div className="inline-flex items-center gap-1">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    disabled={currentPage <= 1 || loading}
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    Previous
                  </button>

                  {/* PAGE NUMBERS */}
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      disabled={loading}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 rounded border ${
                        currentPage === page
                          ? "border-[#5949d6] bg-[#5949d6] text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* NEXT */}
                  <button
                    type="button"
                    disabled={currentPage >= meta.totalPages || loading}
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================
            CREATE VIEW
        ====================================================== */}

        {viewMode === "create" && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 w-full">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              New Billing Sub Category Registration Form
            </h2>

            <form
              onSubmit={handleAddCategorySubmit}
              className="space-y-4 text-xs w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* TYPE */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Billing Sub Category Type{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <select
                    value={formData.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Product">Product</option>

                    <option value="Service">Service</option>
                  </select>
                </div>

                {/* CODE */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Billing Sub Category Code{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => handleFormChange("code", e.target.value)}
                    placeholder="SUB-PROD-001"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 font-mono font-bold text-indigo-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* NAME */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Billing Sub Category Name{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Enter billing sub category name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Description / Notes
                  </label>

                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleFormChange("description", e.target.value)
                    }
                    placeholder="Optional billing sub category details..."
                    className="w-full border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  disabled={saving}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-xs cursor-pointer font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />

                  {saving ? "Saving..." : "Save Billing Sub Category"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ========================================================
          VIEW MODAL
      ======================================================== */}

      {isViewOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            {/* HEADER */}
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-300" />
                Billing Sub Category: {selectedCategory.code}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsViewOpen(false);
                  setSelectedCategory(null);
                }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-3 text-xs">
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {/* NAME */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Name:</span>

                  <span className="font-bold text-slate-900">
                    {selectedCategory.name}
                  </span>
                </div>

                {/* TYPE */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Type:</span>

                  <span className="font-bold text-indigo-700">
                    {selectedCategory.type}
                  </span>
                </div>

                {/* CODE */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Code:</span>

                  <span className="font-mono font-bold text-slate-800">
                    {selectedCategory.code}
                  </span>
                </div>

                {/* CATEGORY ID */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Category ID:
                  </span>

                  <span className="font-mono text-slate-700">
                    {selectedCategory.categoryId || "-"}
                  </span>
                </div>

                {/* CREATED BY */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Created By:
                  </span>

                  <span className="font-semibold text-slate-700">
                    {selectedCategory.createdBy || "-"}
                  </span>
                </div>

                {/* UPDATED BY */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Updated By:
                  </span>

                  <span className="font-semibold text-slate-700">
                    {selectedCategory.updatedBy || "-"}
                  </span>
                </div>

                {/* STATUS */}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Status:</span>

                  <span
                    className={
                      selectedCategory.deletedAt
                        ? "font-bold text-rose-600"
                        : "font-bold text-emerald-600"
                    }
                  >
                    {selectedCategory.deletedAt ? "Deleted" : "Active"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col py-1 gap-1">
                  <span className="text-slate-500 font-medium">
                    Description:
                  </span>

                  <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                    {selectedCategory.description || "-"}
                  </p>
                </div>

                {/* UUID */}
                <div className="flex flex-col py-1 gap-1">
                  <span className="text-slate-500 font-medium">UUID:</span>

                  <p className="font-mono text-[10px] text-slate-600 break-all">
                    {selectedCategory.uuid}
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsViewOpen(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-semibold cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT MODAL
      ======================================================== */}

      {isEditOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            {/* HEADER */}
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-300" />
                Edit Billing Sub Category: {selectedCategory.code}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedCategory(null);
                }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdateSubmit}
              className="p-5 space-y-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* TYPE */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Type <span className="text-rose-500">*</span>
                  </label>

                  <select
                    value={formData.type}
                    onChange={(e) => handleFormChange("type", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Product">Product</option>

                    <option value="Service">Service</option>
                  </select>
                </div>

                {/* CODE */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code
                  </label>

                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 font-mono font-bold text-slate-400 bg-slate-100 cursor-not-allowed"
                  />
                </div>

                {/* NAME */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Name <span className="text-rose-500">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      handleFormChange("description", e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-xs cursor-pointer font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />

                  {saving ? "Updating..." : "Update Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
