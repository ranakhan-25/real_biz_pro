/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Edit,
  Eye,
  Home,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";

// ============================================================
// API CONFIG
// ============================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const API_PREFIX = "/realbizpro/api/v1";

const CATEGORY_ENDPOINT = `${API_BASE_URL}${API_PREFIX}/category`;

const CURRENT_USER = "Rana";

// ============================================================
// TYPES
// ============================================================

export interface CategoryItem {
  id: string;
  uuid: string;
  type: string;
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
  data?: any;
  meta?: CategoryMeta;
  message?: string;
}

interface CategoryFormData {
  type: string;
  code: string;
  name: string;
  description: string;
}

// ============================================================
// API HELPER
// ============================================================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured in .env.local");
  }

  const response = await fetch(endpoint, {
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
}

// ============================================================
// RESPONSE PARSERS
// ============================================================

function extractCategoryList(response: CategoryListResponse) {
  /*
   Your current API response:

   {
     success: true,
     data: {
       success: true,
       data: {
         data: [...],
         meta: {...}
       }
     }
   }

   So actual list is:

   response.data.data.data
  */

  const nestedData = response?.data?.data;

  if (nestedData && Array.isArray(nestedData.data)) {
    return {
      rows: nestedData.data as CategoryItem[],
      meta: nestedData.meta as CategoryMeta,
    };
  }

  // Fallback if backend response wrapper changes
  if (Array.isArray(response?.data?.data)) {
    return {
      rows: response.data.data as CategoryItem[],
      meta: response?.data?.meta as CategoryMeta,
    };
  }

  if (Array.isArray(response?.data)) {
    return {
      rows: response.data as CategoryItem[],
      meta: response?.meta as CategoryMeta,
    };
  }

  return {
    rows: [],
    meta: undefined,
  };
}

function extractCategory(response: any): CategoryItem | null {
  /*
   Handles:

   {
     success: true,
     data: {
       success: true,
       data: {...}
     }
   }

   and simpler response shapes.
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

export default function CategoryComponent() {
  // ----------------------------------------------------------
  // VIEW
  // ----------------------------------------------------------

  const [viewMode, setViewMode] = useState<"list" | "create">("list");

  // ----------------------------------------------------------
  // DATA
  // ----------------------------------------------------------

  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  // ----------------------------------------------------------
  // FORM
  // ----------------------------------------------------------

  const [formData, setFormData] = useState<CategoryFormData>({
    type: "Product",
    code: "",
    name: "",
    description: "",
  });

  // ----------------------------------------------------------
  // UI STATES
  // ----------------------------------------------------------

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // ----------------------------------------------------------
  // SEARCH / FILTER
  // ----------------------------------------------------------

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // ----------------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);

  const [entriesPerPage, setEntriesPerPage] = useState(25);

  const [meta, setMeta] = useState<CategoryMeta>({
    total: 0,
    page: 1,
    limit: 25,
    skip: 0,
    totalPages: 1,
  });

  // ==========================================================
  // GET ALL CATEGORIES
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

        const url = `${CATEGORY_ENDPOINT}?${params.toString()}`;

        const response = await apiRequest<CategoryListResponse>(url);

        const result = extractCategoryList(response);

        setCategories(result.rows);

        if (result.meta) {
          setMeta({
            total: result.meta.total ?? result.rows.length,
            page: result.meta.page ?? pageToLoad,
            limit: result.meta.limit ?? entriesPerPage,
            skip: result.meta.skip ?? 0,
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
        console.error("Failed to fetch categories:", err);

        const message =
          err instanceof Error ? err.message : "Failed to fetch categories";

        setError(message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, entriesPerPage, searchQuery, typeFilter],
  );

  // ==========================================================
  // INITIAL LOAD + SEARCH/FILTER
  // ==========================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories(currentPage);
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchCategories, currentPage]);

  // ==========================================================
  // CREATE FORM CHANGE
  // ==========================================================

  const handleFormChange = (field: keyof CategoryFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================================
  // CREATE CATEGORY
  // ==========================================================

  const handleCreate = async () => {
    try {
      setSaving(true);
      setError("");

      if (!formData.type.trim()) {
        setError("Category type is required");
        return;
      }

      if (!formData.code.trim()) {
        setError("Category code is required");
        return;
      }

      if (!formData.name.trim()) {
        setError("Category name is required");
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

      await apiRequest(`${CATEGORY_ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Reset form
      setFormData({
        type: "Product",
        code: "",
        name: "",
        description: "",
      });

      // Back to list
      setViewMode("list");

      // Reload
      setCurrentPage(1);
      await fetchCategories(1);
    } catch (err) {
      console.error("Create category error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to create category";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // GET CATEGORY BY UUID
  // ==========================================================

  const handleView = async (uuid: string) => {
    try {
      setError("");

      setLoading(true);

      const response = await apiRequest<any>(`${CATEGORY_ENDPOINT}/${uuid}`, {
        method: "GET",
      });

      const category = extractCategory(response);

      if (!category) {
        throw new Error("Category data not found");
      }

      setSelectedCategory(category);
      setIsViewOpen(true);
    } catch (err) {
      console.error("Get category error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to get category";

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
      type: category.type || "Product",
      code: category.code || "",
      name: category.name || "",
      description: category.description || "",
    });

    setIsEditOpen(true);
  };

  // ==========================================================
  // UPDATE CATEGORY
  // ==========================================================

  const handleUpdate = async () => {
    if (!selectedCategory?.uuid) {
      setError("Category UUID is missing");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (!formData.type.trim()) {
        setError("Category type is required");
        return;
      }

      if (!formData.name.trim()) {
        setError("Category name is required");
        return;
      }

      const payload = {
        type: formData.type.trim(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        updatedBy: CURRENT_USER,
      };

      await apiRequest(`${CATEGORY_ENDPOINT}/${selectedCategory.uuid}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      setIsEditOpen(false);
      setSelectedCategory(null);

      setFormData({
        type: "Product",
        code: "",
        name: "",
        description: "",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Update category error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to update category";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // DELETE CATEGORY
  // ==========================================================

  const handleDelete = async (category: CategoryItem) => {
    if (!category.uuid) {
      setError("Category UUID is missing");
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

      await apiRequest(`${CATEGORY_ENDPOINT}/${category.uuid}`, {
        method: "DELETE",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Delete category error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to delete category";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // RESTORE CATEGORY
  // ==========================================================

  const handleRestore = async (uuid: string) => {
    try {
      setLoading(true);
      setError("");

      await apiRequest(`${CATEGORY_ENDPOINT}/${uuid}/restore`, {
        method: "PATCH",
      });

      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Restore category error:", err);

      const message =
        err instanceof Error ? err.message : "Failed to restore category";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // RESET CREATE
  // ==========================================================

  const handleOpenCreate = () => {
    setError("");

    setFormData({
      type: "Product",
      code: "",
      name: "",
      description: "",
    });

    setViewMode("create");
  };

  // ==========================================================
  // BACK TO LIST
  // ==========================================================

  const handleBackToList = () => {
    setError("");
    setViewMode("list");
  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // ==========================================================
  // TYPE FILTER
  // ==========================================================

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  // ==========================================================
  // ENTRIES PER PAGE
  // ==========================================================

  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const goToPage = (page: number) => {
    if (page < 1 || page > meta.totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  // ==========================================================
  // PAGE NUMBERS
  // ==========================================================

  const pageNumbers = Array.from(
    { length: Math.max(meta.totalPages, 1) },
    (_, index) => index + 1,
  );

  // ==========================================================
  // RENDER CREATE
  // ==========================================================

  if (viewMode === "create") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Home size={16} />

            <ChevronRight size={15} />

            <button
              type="button"
              onClick={handleBackToList}
              className="hover:text-gray-900"
            >
              Category
            </button>

            <ChevronRight size={15} />

            <span className="text-gray-900">Create Category</span>
          </div>

          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Create Category
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Create a new product or service category.
              </p>
            </div>

            <button
              type="button"
              onClick={handleBackToList}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>

                <select
                  value={formData.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              {/* Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Code <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleFormChange("code", e.target.value)}
                  placeholder="e.g. SUB-PROD-001"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Enter category name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  placeholder="Enter description"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={handleBackToList}
                disabled={saving}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreate}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />

                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER LIST
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Home size={16} />

          <ChevronRight size={15} />

          <span className="text-gray-900">Category</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Tag size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Category
                </h1>

                <p className="text-sm text-gray-500">
                  Manage your product and service categories.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search category..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={handleTypeFilterChange}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
            </select>

            {/* Entries */}
            <select
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10 entries</option>
              <option value={25}>25 entries</option>
              <option value={50}>50 entries</option>
              <option value={100}>100 entries</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    #
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Code
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Name
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Tag size={35} className="mb-3 text-gray-300" />

                        <p className="text-sm font-medium text-gray-700">
                          No categories found
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Try changing your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map((category, index) => (
                    <tr key={category.uuid} className="hover:bg-gray-50">
                      {/* Number */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {meta.skip + index + 1}
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            category.type === "Product"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {category.type}
                        </span>
                      </td>

                      {/* Code */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {category.code}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {category.name}
                      </td>

                      {/* Description */}
                      <td className="max-w-xs px-5 py-4 text-sm text-gray-500">
                        <div className="truncate">
                          {category.description || "-"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* View */}
                          <button
                            type="button"
                            title="View"
                            onClick={() => handleView(category.uuid)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye size={17} />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit"
                            onClick={() => handleOpenEdit(category)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-yellow-50 hover:text-yellow-600"
                          >
                            <Edit size={17} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete"
                            onClick={() => handleDelete(category)}
                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
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
          <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {meta.total === 0 ? 0 : meta.skip + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-700">
                {Math.min(meta.skip + categories.length, meta.total)}
              </span>{" "}
              of <span className="font-medium text-gray-700">{meta.total}</span>{" "}
              entries
            </p>

            <div className="flex items-center gap-1">
              {/* Previous */}
              <button
                type="button"
                disabled={currentPage <= 1 || loading}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {/* Pages */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  disabled={loading}
                  onClick={() => goToPage(page)}
                  className={`min-w-9 rounded-lg px-3 py-2 text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                type="button"
                disabled={currentPage >= meta.totalPages || loading}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          VIEW MODAL
      ====================================================== */}

      {isViewOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Category Details
                </h2>

                <p className="text-xs text-gray-500">{selectedCategory.uuid}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsViewOpen(false);
                  setSelectedCategory(null);
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Type
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedCategory.type}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Code
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedCategory.code}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedCategory.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Created By
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedCategory.createdBy || "-"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase text-gray-400">
                  Description
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedCategory.description || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Created At
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedCategory.createdAt
                    ? new Date(selectedCategory.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Updated At
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedCategory.updatedAt
                    ? new Date(selectedCategory.updatedAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setIsViewOpen(false);
                  setSelectedCategory(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          EDIT MODAL
      ====================================================== */}

      {isEditOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Category
                </h2>

                <p className="text-xs text-gray-500">{selectedCategory.code}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedCategory(null);
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              {/* Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Type
                </label>

                <select
                  value={formData.type}
                  onChange={(e) => handleFormChange("type", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              {/* Code */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Code
                </label>

                <input
                  type="text"
                  value={formData.code}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm text-gray-500"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedCategory(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleUpdate}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />

                {saving ? "Updating..." : "Update Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
