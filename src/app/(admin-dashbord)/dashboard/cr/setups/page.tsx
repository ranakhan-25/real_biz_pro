/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Percent,
  Clock,
  Layers,
  CheckCircle,
  XCircle,
  Loader2,
  X,
  FileSpreadsheet,
  RefreshCw,
} from "lucide-react";
import { crApi } from "@/lib/crApi";
import { showAlert } from "@/lib/swal";

export default function InstallmentSetupsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [setups, setSetups] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSetup, setEditingSetup] = useState<any | null>(null);

  // Form Fields
  const [planCode, setPlanCode] = useState("");
  const [planName, setPlanName] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState(12);
  const [frequency, setFrequency] = useState("monthly");
  const [penaltyRate, setPenaltyRate] = useState(2.0);
  const [gracePeriodDays, setGracePeriodDays] = useState(7);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await crApi.getSetups();
      setSetups(data || []);
    } catch (err) {
      console.error("Failed to load installment policy setups:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredSetups = useMemo(() => {
    if (!search.trim()) return setups;
    const q = search.toLowerCase();
    return setups.filter(
      (s) =>
        s.plan_code?.toLowerCase().includes(q) ||
        s.plan_name?.toLowerCase().includes(q) ||
        s.frequency?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q)
    );
  }, [search, setups]);

  const handleOpenCreateModal = () => {
    setEditingSetup(null);
    setPlanCode(`PLAN-${Date.now().toString().slice(-4)}`);
    setPlanName("");
    setNumberOfInstallments(12);
    setFrequency("monthly");
    setPenaltyRate(2.0);
    setGracePeriodDays(7);
    setDescription("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingSetup(item);
    setPlanCode(item.plan_code || "");
    setPlanName(item.plan_name || "");
    setNumberOfInstallments(item.number_of_installments || 12);
    setFrequency(item.frequency || "monthly");
    setPenaltyRate(Number(item.penalty_rate_percentage || 0));
    setGracePeriodDays(Number(item.grace_period_days || 0));
    setDescription(item.description || "");
    setIsActive(item.is_active ?? true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!planCode.trim()) {
      showAlert.warning("Plan Code Required", "Please specify a unique plan code identifier.");
      return;
    }
    if (!planName.trim()) {
      showAlert.warning("Plan Name Required", "Please specify a friendly title for the policy plan.");
      return;
    }
    if (numberOfInstallments <= 0) {
      showAlert.warning("Invalid Installments", "Number of installments must be at least 1.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        plan_code: planCode.trim(),
        plan_name: planName.trim(),
        number_of_installments: Number(numberOfInstallments),
        frequency,
        penalty_rate_percentage: Number(penaltyRate),
        grace_period_days: Number(gracePeriodDays),
        description: description.trim(),
        is_active: isActive,
      };

      if (editingSetup) {
        await crApi.updateSetup(editingSetup.uuid, payload);
      } else {
        await crApi.createSetup(payload);
      }

      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: any) => {
    const confirmed = await showAlert.confirm(
      "Delete Policy Plan",
      `Are you sure you want to delete "${item.plan_name}" (${item.plan_code})?`
    );
    if (!confirmed) return;

    try {
      await crApi.deleteSetup(item.uuid);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (!filteredSetups.length) return;
    const headers = ["Plan Code", "Plan Name", "Installments", "Frequency", "Penalty %", "Grace Days", "Status"];
    const rows = filteredSetups.map((s) => [
      s.plan_code,
      `"${s.plan_name?.replace(/"/g, '""')}"`,
      s.number_of_installments,
      s.frequency,
      s.penalty_rate_percentage,
      s.grace_period_days,
      s.is_active ? "Active" : "Inactive",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cr_installment_setups_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="w-7 h-7 text-primary" />
            Installment Setups & Policies
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure installment amortization schemes, frequency schedules, grace periods, and overdue penalty rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export CSV
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            New Policy Plan
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Policy Plans</span>
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{setups.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Active plans configured in system</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Status</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {setups.filter((s) => s.is_active).length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Available for new sale agreements</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Grace Period</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold">
            {setups.length
              ? Math.round(
                  setups.reduce((sum, s) => sum + Number(s.grace_period_days || 0), 0) / setups.length
                )
              : 0}{" "}
            Days
          </div>
          <p className="text-xs text-muted-foreground mt-1">Default allowance before penalty accrual</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Penalty Rate</span>
            <Percent className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold">
            {setups.length
              ? (
                  setups.reduce((sum, s) => sum + Number(s.penalty_rate_percentage || 0), 0) /
                  setups.length
                ).toFixed(1)
              : "0.0"}
            %
          </div>
          <p className="text-xs text-muted-foreground mt-1">Monthly late payment rate</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground w-full sm:w-auto">
            <span>Show</span>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-border rounded px-2 py-1 bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plan code, name..."
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Plan Code</th>
                <th className="py-3 px-4">Plan Name</th>
                <th className="py-3 px-4 text-center">Tenure (Installments)</th>
                <th className="py-3 px-4 text-center">Frequency</th>
                <th className="py-3 px-4 text-center">Penalty %</th>
                <th className="py-3 px-4 text-center">Grace Period</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                    Loading installment policy setups...
                  </td>
                </tr>
              ) : filteredSetups.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No installment policy plans found. Click <strong>&quot;New Policy Plan&quot;</strong> to create one.
                  </td>
                </tr>
              ) : (
                filteredSetups.slice(0, entries).map((item) => (
                  <tr key={item.uuid || item.id} className="hover:bg-muted/30 transition">
                    <td className="py-3 px-4 font-mono font-medium text-primary">
                      {item.plan_code}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      <div>{item.plan_name}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground truncate max-w-xs">
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">
                      {item.number_of_installments} Periods
                    </td>
                    <td className="py-3 px-4 text-center capitalize">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {item.frequency || "monthly"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-rose-600">
                      {Number(item.penalty_rate_percentage || 0)}%
                    </td>
                    <td className="py-3 px-4 text-center text-muted-foreground">
                      {item.grace_period_days || 0} Days
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition"
                          title="Edit Plan"
                        >
                          <Edit className="w-4 h-4 text-amber-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-rose-600 transition"
                          title="Delete Plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <h3 className="text-lg font-bold">
                {editingSetup ? "Edit Installment Policy Plan" : "Create New Installment Policy"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Plan Code *
                  </label>
                  <input
                    type="text"
                    value={planCode}
                    onChange={(e) => setPlanCode(e.target.value)}
                    required
                    placeholder="e.g. PLAN-24M-STD"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Installment Count *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={numberOfInstallments}
                    onChange={(e) => setNumberOfInstallments(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Plan Friendly Title *
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  required
                  placeholder="e.g. 24-Month Standard Commercial Plot Plan"
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semi_annual">Semi-Annual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Penalty Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={penaltyRate}
                    onChange={(e) => setPenaltyRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Grace (Days)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={gracePeriodDays}
                    onChange={(e) => setGracePeriodDays(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Description & Remarks
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Policy terms, target project categories or customer criteria..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <label htmlFor="isActiveToggle" className="text-sm font-medium text-foreground cursor-pointer">
                  Active policy plan (available when generating new sale agreements)
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingSetup ? "Save Changes" : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
