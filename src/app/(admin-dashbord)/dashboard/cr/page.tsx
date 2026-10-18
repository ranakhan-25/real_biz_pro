/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2,
  Layers,
  Scale,
  Receipt,
  AlertTriangle,
  FileSpreadsheet,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Clock,
  ShieldAlert,
  CheckCircle,
  RefreshCw,
  Loader2,
  Calendar,
} from "lucide-react";
import { crApi } from "@/lib/crApi";

export default function CreditRealizationOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [aging, setAging] = useState<any>(null);
  const [recentOverdue, setRecentOverdue] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sumData, agingData, overdueData] = await Promise.all([
        crApi.getRealizationSummary(),
        crApi.getAgingAnalysis(),
        crApi.getOverdueInstallments(),
      ]);

      setSummary(sumData || {});
      setAging(agingData || {});
      setRecentOverdue((overdueData || []).slice(0, 5));
    } catch (err) {
      console.error("Failed to load credit realization overview:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const buckets = aging?.buckets || {};

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            Credit Realization (CR) Executive Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time portfolio amortization, collection metrics, delinquency aging analysis, and recovery pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/dashboard/cr/receipt-voucher"
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition"
          >
            <Receipt className="w-4 h-4" />
            Record Payment Voucher
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Sales Agreed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold">
            {Number(summary?.total_contract_value || 0).toLocaleString()} <span className="text-xs font-normal">BDT</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <span className="font-semibold text-foreground">{summary?.total_sale_agreements || 0}</span> agreements executed
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Realized Collection</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {Number(summary?.total_collected || 0).toLocaleString()} <span className="text-xs font-normal">BDT</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            Recovery Rate: <span className="font-semibold text-emerald-600">{summary?.recovery_rate || "0%"}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Overdue Principal</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {Number(summary?.total_overdue_principal || 0).toLocaleString()} <span className="text-xs font-normal">BDT</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Late Penalty Accrued: <span className="font-medium text-rose-500">{Number(summary?.total_accrued_penalty || 0).toLocaleString()} BDT</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card text-card-foreground shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Delinquent Accounts</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {aging?.total_overdue_accounts || 0}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Active overdue installment plans requiring recovery
          </div>
        </div>
      </div>

      {/* Aging Analysis Breakdown */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Delinquency Aging Analysis</h2>
            <p className="text-xs text-muted-foreground">Portfolio exposure segmented by overdue aging brackets</p>
          </div>
          <Link
            href="/dashboard/cr/reports/aging-report"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Full Aging Report <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { key: "0_30_days", label: "0 - 30 Days", color: "border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20" },
            { key: "31_60_days", label: "31 - 60 Days", color: "border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20" },
            { key: "61_90_days", label: "61 - 90 Days", color: "border-orange-500/40 bg-orange-50/50 dark:bg-orange-950/20" },
            { key: "91_120_days", label: "91 - 120 Days", color: "border-rose-400/40 bg-rose-50/50 dark:bg-rose-950/20" },
            { key: "over_120_days", label: "120+ Days", color: "border-rose-600/40 bg-rose-100/50 dark:bg-rose-900/30" },
          ].map((b) => {
            const bucket = buckets[b.key] || { count: 0, total_due: 0 };
            return (
              <div key={b.key} className={`p-4 rounded-xl border ${b.color}`}>
                <div className="text-xs font-semibold text-muted-foreground">{b.label}</div>
                <div className="text-lg font-bold text-foreground mt-1">
                  {Number(bucket.total_due || 0).toLocaleString()} <span className="text-[10px] font-normal">BDT</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {bucket.count} installments
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Quick Nav Hub */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3">Credit Realization Modules & Workflows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/dashboard/cr/agreements"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <Building2 className="w-6 h-6 text-primary group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Sale Agreements & Plot Allocation</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Register sales contracts, auto-generate amortization schedules, and allocate surveyed plots.
            </p>
          </Link>

          <Link
            href="/dashboard/cr/setups"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Installment Policies & Setups</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Configure installment tenures, frequency models, grace days, and overdue penalty rates.
            </p>
          </Link>

          <Link
            href="/dashboard/cr/recovery"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <Scale className="w-6 h-6 text-amber-600 group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Recovery Actions Ledger</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Log customer calls, reminder notices, legal letters, and payment commitment follow-ups.
            </p>
          </Link>

          <Link
            href="/dashboard/cr/receipt-voucher"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <Receipt className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Receipt Vouchers & Collections</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Record customer installment collections with bank, cheque, or cash payment verification.
            </p>
          </Link>

          <Link
            href="/dashboard/cr/overdue-list"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldAlert className="w-6 h-6 text-rose-600 group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Overdue Installments & Penalties</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Live overdue accounts, penalty calculation engine, and authorized penalty waiver workflows.
            </p>
          </Link>

          <Link
            href="/dashboard/cr/reports/realization-summary-report"
            className="p-5 rounded-2xl border border-border bg-card hover:border-primary hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <FileSpreadsheet className="w-6 h-6 text-teal-600 group-hover:scale-110 transition" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
            </div>
            <h3 className="font-bold text-foreground">Financial & Realization Reports</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Export comprehensive realization summary, sale collection, aging, and installment ledgers.
            </p>
          </Link>
        </div>
      </div>

      {/* Critical Overdue Watchlist */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Critical Overdue Watchlist</h2>
            <p className="text-xs text-muted-foreground">Highest priority overdue installments requiring officer intervention</p>
          </div>
          <Link
            href="/dashboard/cr/overdue-list"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View All Overdue <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOverdue.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-primary" /> : "No critical overdue accounts pending."}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOverdue.map((p) => (
              <div key={p.uuid || p.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-medium text-foreground">{p.sale_agreement?.customer_name || "Customer"}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.sale_agreement?.unit_identifier} • Due Date: {p.due_date}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-rose-600">
                      {Number(p.due_amount || 0).toLocaleString()} BDT
                    </div>
                    {p.penalty_amount > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Penalty: +{Number(p.penalty_amount).toLocaleString()} BDT
                      </div>
                    )}
                  </div>
                  <Link
                    href="/dashboard/cr/overdue-list"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100 transition"
                  >
                    Action
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
