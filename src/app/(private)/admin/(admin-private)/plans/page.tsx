/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/lib/theme";
import PlanCreateModal from "./components/PlanCreateModal";
import PlanEditModal from "./components/PlanEditModal";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  CreditCard,
  Users,
  FolderKanban,
  HardDrive,
  Edit2,
  Trash2,
} from "lucide-react";

// ডামি ডেটা
const DUMMY_PLANS = [
  {
    uuid: "1",
    code: "basic",
    name: "Basic Plan",
    monthly_price: 19,
    yearly_price: 190,
    user_limit: 5,
    project_limit: 2,
    storage_gb: 10,
    status: "active",
    subscribers: 120,
  },
  {
    uuid: "2",
    code: "pro",
    name: "Pro Plan",
    monthly_price: 49,
    yearly_price: 490,
    user_limit: 20,
    project_limit: 10,
    storage_gb: 50,
    status: "active",
    subscribers: 85,
  },
  {
    uuid: "3",
    code: "enterprise",
    name: "Enterprise",
    monthly_price: 199,
    yearly_price: 1990,
    user_limit: 100,
    project_limit: 50,
    storage_gb: 500,
    status: "draft",
    subscribers: 0,
  },
];

const ITEMS_PER_PAGE = 6;

export default function PlanListPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingDummy, setIsUsingDummy] = useState(false);

  const { primaryColor } = useTheme();
  const brandColor = primaryColor || "#2ed573";

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Search, Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // ১. ডেটা ফেচ
  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/plans");
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      if (!data || data.length === 0) {
        setPlans(DUMMY_PLANS);
        setIsUsingDummy(true);
      } else {
        setPlans(data);
        setIsUsingDummy(false);
      }
    } catch (error) {
      setPlans(DUMMY_PLANS);
      setIsUsingDummy(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ২. CRUD
  const handleCreate = async (payload: any) => {
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");
      const newPlan = await res.json();
      setPlans((prev) => [newPlan, ...prev]);
    } catch (error) {
      setPlans((prev) => [
        { ...payload, uuid: Date.now().toString(), subscribers: 0 },
        ...prev,
      ]);
    }
  };

  const handleUpdate = async (uuid: string, payload: any) => {
    try {
      const res = await fetch(`/api/plans/${uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();
      setPlans((prev) => prev.map((p) => (p.uuid === uuid ? updated : p)));
    } catch (error) {
      setPlans((prev) =>
        prev.map((p) => (p.uuid === uuid ? { ...p, ...payload } : p)),
      );
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const res = await fetch(`/api/plans/${uuid}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setPlans((prev) => prev.filter((p) => p.uuid !== uuid));
    } catch (error) {
      setPlans((prev) => prev.filter((p) => p.uuid !== uuid));
    }
  };

  // ৩. Search & Filter Logic
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || plan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [plans, searchQuery, statusFilter]);

  // ৪. Pagination Logic
  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPlans = filteredPlans.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <CreditCard className="h-7 w-7" style={{ color: brandColor }} />
              Subscription Plans
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your pricing tiers, limits, and plan availability.
            </p>
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
            style={{ backgroundColor: brandColor }}
          >
            <Plus className="h-4 w-4" /> Create Plan
          </button>
        </div>

        {isUsingDummy && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>
              API is currently offline. Showing <strong>Demo Data</strong>.
            </span>
          </div>
        )}

        {/* Toolbar: Search & Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by plan name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": `${brandColor}40` } as any}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span>Filters:</span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 appearance-none min-w-[130px]"
              style={{ "--tw-ring-color": `${brandColor}40` } as any}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                  <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedPlans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 py-20 flex flex-col items-center justify-center">
            <CreditCard className="h-12 w-12 text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium text-lg">No plans found.</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPlans.map((plan) => (
              <div
                key={plan.uuid}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden group flex flex-col"
              >
                {/* Card Header */}
                <div className="p-5 pb-4 border-b border-gray-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {plan.code}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        plan.status === "active"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : plan.status === "draft"
                            ? "bg-gray-100 text-gray-700 border border-gray-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          plan.status === "active"
                            ? "bg-green-500"
                            : plan.status === "draft"
                              ? "bg-gray-500"
                              : "bg-red-500"
                        }`}
                      />
                      {plan.status}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="px-5 pt-4 pb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-900">
                      ${plan.monthly_price}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      /mo
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    ${plan.yearly_price} billed yearly
                  </p>
                </div>

                {/* Limits */}
                <div className="px-5 py-3 space-y-2.5 flex-1">
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>
                      <strong className="font-semibold text-gray-800">
                        {plan.user_limit}
                      </strong>{" "}
                      Users
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <FolderKanban className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>
                      <strong className="font-semibold text-gray-800">
                        {plan.project_limit}
                      </strong>{" "}
                      Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <HardDrive className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>
                      <strong className="font-semibold text-gray-800">
                        {plan.storage_gb} GB
                      </strong>{" "}
                      Storage
                    </span>
                  </div>
                </div>

                {/* Footer: Subscribers + Actions */}
                <div className="px-5 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border"
                    style={{
                      backgroundColor: `${brandColor}10`,
                      color: brandColor,
                      borderColor: `${brandColor}20`,
                    }}
                  >
                    {plan.subscribers || 0} subscribers
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsEditOpen(true);
                      }}
                      className="p-2 rounded-lg hover:bg-white text-gray-500 hover:text-gray-800 transition-colors border border-transparent hover:border-gray-200"
                      title="Edit"
                    >
                      <Edit2
                        className="h-4 w-4"
                        style={{ color: brandColor }}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.uuid)}
                      className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredPlans.length > 0 && (
          <div className="mt-8 px-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-gray-900">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredPlans.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900">
                {filteredPlans.length}
              </span>{" "}
              results
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? "text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    style={
                      currentPage === i + 1
                        ? { backgroundColor: brandColor }
                        : {}
                    }
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <PlanCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
      <PlanEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        planData={selectedPlan}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
