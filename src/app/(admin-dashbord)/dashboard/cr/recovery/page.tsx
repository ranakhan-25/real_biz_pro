/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Phone,
  Mail,
  Scale,
  UserCheck,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  X,
  FileSpreadsheet,
  RefreshCw,
  Building2,
  FileText,
} from "lucide-react";
import { crApi } from "@/lib/crApi";
import { showAlert } from "@/lib/swal";

const ACTION_TYPE_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  phone_call: { label: "Phone Call", icon: Phone, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300" },
  reminder_letter_1: { label: "1st Reminder", icon: Mail, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300" },
  reminder_letter_2: { label: "2nd Reminder", icon: Mail, color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300" },
  legal_notice: { label: "Legal Notice", icon: Scale, color: "text-rose-600 bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300" },
  in_person_visit: { label: "Field Visit", icon: UserCheck, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300" },
};

const OUTCOME_CONFIG: Record<string, { label: string; color: string }> = {
  promised: { label: "Payment Promised", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  resolved: { label: "Resolved", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  disputed: { label: "Disputed", color: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300" },
  unreachable: { label: "Unreachable", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
};

export default function RecoveryLedgerPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recoveryLogs, setRecoveryLogs] = useState<any[]>([]);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<any | null>(null);

  // Form Fields
  const [saleAgreementId, setSaleAgreementId] = useState<number | string>("");
  const [actionType, setActionType] = useState("phone_call");
  const [actionDate, setActionDate] = useState(new Date().toISOString().slice(0, 16));
  const [officerName, setOfficerName] = useState("S. M. Faruk (Recovery Officer)");
  const [promisedPaymentDate, setPromisedPaymentDate] = useState("");
  const [promisedAmount, setPromisedAmount] = useState<number | string>("");
  const [outcomeStatus, setOutcomeStatus] = useState("promised");
  const [customerResponse, setCustomerResponse] = useState("");
  const [legalNoticeRef, setLegalNoticeRef] = useState("");
  const [remarks, setRemarks] = useState("");
  const [nextFollowupDate, setNextFollowupDate] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [logs, agrs] = await Promise.all([
        crApi.getRecoveryLogs(),
        crApi.getAgreements(),
      ]);
      setRecoveryLogs(logs || []);
      setAgreements(agrs || []);
      if (!saleAgreementId && agrs?.length) {
        setSaleAgreementId(agrs[0].id);
      }
    } catch (err) {
      console.error("Failed to load recovery logs:", err);
    } finally {
      setLoading(false);
    }
  }, [saleAgreementId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredLogs = useMemo(() => {
    if (!search.trim()) return recoveryLogs;
    const q = search.toLowerCase();
    return recoveryLogs.filter(
      (r) =>
        r.officer_name?.toLowerCase().includes(q) ||
        r.action_type?.toLowerCase().includes(q) ||
        r.outcome_status?.toLowerCase().includes(q) ||
        r.sale_agreement?.customer_name?.toLowerCase().includes(q) ||
        r.sale_agreement?.agreement_number?.toLowerCase().includes(q) ||
        r.customer_response?.toLowerCase().includes(q)
    );
  }, [search, recoveryLogs]);

  const handleOpenCreateModal = () => {
    setEditingLog(null);
    if (agreements.length > 0) setSaleAgreementId(agreements[0].id);
    setActionType("phone_call");
    setActionDate(new Date().toISOString().slice(0, 16));
    setOfficerName("S. M. Faruk (Recovery Officer)");
    setPromisedPaymentDate("");
    setPromisedAmount("");
    setOutcomeStatus("promised");
    setCustomerResponse("");
    setLegalNoticeRef("");
    setRemarks("");
    setNextFollowupDate("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingLog(item);
    setSaleAgreementId(item.sale_agreement_id || (agreements[0]?.id ?? ""));
    setActionType(item.action_type || "phone_call");
    setActionDate(item.action_date ? item.action_date.slice(0, 16) : new Date().toISOString().slice(0, 16));
    setOfficerName(item.officer_name || "");
    setPromisedPaymentDate(item.promised_payment_date ? item.promised_payment_date.slice(0, 10) : "");
    setPromisedAmount(item.promised_amount || "");
    setOutcomeStatus(item.outcome_status || "promised");
    setCustomerResponse(item.customer_response || "");
    setLegalNoticeRef(item.legal_notice_ref || "");
    setRemarks(item.remarks || "");
    setNextFollowupDate(item.next_followup_date ? item.next_followup_date.slice(0, 10) : "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!saleAgreementId) {
      showAlert.warning("Agreement Required", "Please select a target Sale Agreement.");
      return;
    }
    if (!officerName.trim()) {
      showAlert.warning("Officer Required", "Please provide the name of the Recovery Officer.");
      return;
    }

    setSubmitting(true);
    try {
      const selectedAgreement = agreements.find((a) => Number(a.id) === Number(saleAgreementId));

      const payload: any = {
        sale_agreement_id: Number(saleAgreementId),
        customer_id: selectedAgreement?.customer_id || undefined,
        action_type: actionType,
        action_date: actionDate ? new Date(actionDate).toISOString() : new Date().toISOString(),
        officer_name: officerName.trim(),
        promised_payment_date: promisedPaymentDate || undefined,
        promised_amount: promisedAmount !== "" ? Number(promisedAmount) : undefined,
        outcome_status: outcomeStatus,
        customer_response: customerResponse.trim() || undefined,
        legal_notice_ref: legalNoticeRef.trim() || undefined,
        remarks: remarks.trim() || undefined,
        next_followup_date: nextFollowupDate || undefined,
      };

      if (editingLog) {
        await crApi.updateRecoveryLog(editingLog.uuid, payload);
      } else {
        await crApi.createRecoveryLog(payload);
      }

      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const exportCSV = () => {
    if (!filteredLogs.length) return;
    const headers = [
      "Action Date",
      "Agreement No",
      "Customer",
      "Action Type",
      "Officer",
      "Outcome",
      "Promised Amount",
      "Promised Date",
      "Next Followup",
    ];
    const rows = filteredLogs.map((r) => [
      r.action_date?.slice(0, 10) || "",
      r.sale_agreement?.agreement_number || "",
      `"${(r.sale_agreement?.customer_name || "").replace(/"/g, '""')}"`,
      r.action_type,
      `"${r.officer_name?.replace(/"/g, '""')}"`,
      r.outcome_status,
      r.promised_amount || 0,
      r.promised_payment_date?.slice(0, 10) || "",
      r.next_followup_date?.slice(0, 10) || "",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cr_recovery_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="w-7 h-7 text-primary" />
            Credit Recovery Actions & Follow-up Ledger
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track phone calls, reminder notices, customer payment promises, and escalation workflow for overdue installments.
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
            Log Action
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Actions</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{recoveryLogs.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Communications & notices recorded</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Promised Commitments</span>
            <CheckCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {recoveryLogs
              .reduce((sum, r) => sum + Number(r.promised_amount || 0), 0)
              .toLocaleString()}{" "}
            <span className="text-xs font-normal">BDT</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Amount pledged for payment</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Upcoming Follow-ups</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {recoveryLogs.filter((r) => r.next_followup_date && new Date(r.next_followup_date) >= new Date()).length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Pending action reminders scheduled</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved Recoveries</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {recoveryLogs.filter((r) => r.outcome_status === "resolved").length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Accounts brought current</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
        {/* Table Filters */}
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

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search officer, customer, status..."
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Action Date & Type</th>
                <th className="py-3 px-4">Customer & Agreement</th>
                <th className="py-3 px-4">Officer</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Promised Pmt</th>
                <th className="py-3 px-4">Customer Response</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary mb-2" />
                    Loading recovery action logs...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No recovery records found. Click <strong>&quot;Log Action&quot;</strong> to record follow-up.
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, entries).map((item) => {
                  const typeCfg = ACTION_TYPE_CONFIG[item.action_type] || {
                    label: item.action_type,
                    icon: AlertCircle,
                    color: "bg-muted text-muted-foreground",
                  };
                  const Icon = typeCfg.icon;
                  const outcomeCfg = OUTCOME_CONFIG[item.outcome_status] || {
                    label: item.outcome_status,
                    color: "bg-muted text-muted-foreground",
                  };

                  return (
                    <tr key={item.uuid || item.id} className="hover:bg-muted/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground">
                          {item.action_date ? String(item.action_date).slice(0, 10) : "—"}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold mt-1 ${typeCfg.color}`}>
                          <Icon className="w-3 h-3" />
                          {typeCfg.label}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">
                          {item.sale_agreement?.customer_name || "Client"}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground">
                          {item.sale_agreement?.agreement_number || "—"} ({item.sale_agreement?.unit_identifier || "Unit"})
                        </div>
                      </td>

                      <td className="py-3 px-4 text-foreground font-medium">
                        {item.officer_name}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${outcomeCfg.color}`}>
                          {outcomeCfg.label}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {item.promised_amount ? (
                          <>
                            <div className="font-bold text-foreground">
                              {Number(item.promised_amount).toLocaleString()} <span className="text-xs font-normal">BDT</span>
                            </div>
                            {item.promised_payment_date && (
                              <div className="text-xs text-muted-foreground">
                                Due: {String(item.promised_payment_date).slice(0, 10)}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-xs text-foreground line-clamp-2">
                          {item.customer_response || item.remarks || "—"}
                        </div>
                        {item.next_followup_date && (
                          <div className="text-xs text-amber-600 dark:text-amber-400 mt-0.5 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Next: {String(item.next_followup_date).slice(0, 10)}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-md hover:bg-muted text-amber-500 transition"
                            title="Edit Recovery Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-card text-card-foreground border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <h3 className="text-lg font-bold">
                {editingLog ? "Edit Recovery Follow-up" : "Log Credit Recovery Action"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Target Sale Agreement *
                </label>
                <select
                  value={saleAgreementId}
                  onChange={(e) => setSaleAgreementId(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>Select an agreement...</option>
                  {agreements.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.agreement_number} - {a.customer_name} ({a.unit_identifier})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Action Type *
                  </label>
                  <select
                    value={actionType}
                    onChange={(e) => setActionType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="phone_call">Phone Call</option>
                    <option value="reminder_letter_1">1st Reminder Notice</option>
                    <option value="reminder_letter_2">2nd Reminder Notice</option>
                    <option value="legal_notice">Legal Notice</option>
                    <option value="in_person_visit">In-Person Field Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Action Timestamp *
                  </label>
                  <input
                    type="datetime-local"
                    value={actionDate}
                    onChange={(e) => setActionDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Officer In Charge *
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Outcome Status *
                  </label>
                  <select
                    value={outcomeStatus}
                    onChange={(e) => setOutcomeStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  >
                    <option value="promised">Payment Promised</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved / Paid</option>
                    <option value="disputed">Disputed</option>
                    <option value="unreachable">Unreachable / No Answer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Promised Payment Date
                  </label>
                  <input
                    type="date"
                    value={promisedPaymentDate}
                    onChange={(e) => setPromisedPaymentDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Promised Amount (BDT)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={promisedAmount}
                    onChange={(e) => setPromisedAmount(e.target.value)}
                    placeholder="e.g. 150000"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {actionType === "legal_notice" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Legal Notice Reference No
                  </label>
                  <input
                    type="text"
                    value={legalNoticeRef}
                    onChange={(e) => setLegalNoticeRef(e.target.value)}
                    placeholder="e.g. LN-2026/OCT/044"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Customer Response & Commitment Details
                </label>
                <textarea
                  rows={2}
                  value={customerResponse}
                  onChange={(e) => setCustomerResponse(e.target.value)}
                  placeholder="Record customer's remarks, reasons for delay, or specific conditions agreed upon..."
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Next Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={nextFollowupDate}
                    onChange={(e) => setNextFollowupDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Officer Internal Remarks
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Internal notes or next steps..."
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
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
                  {editingLog ? "Save Changes" : "Record Action"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
