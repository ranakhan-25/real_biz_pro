"use client";

import React from "react";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

// =====================================================
// Types
// =====================================================

interface ProjectOverviewReportData {
  projectName: string;
  breadcrumbs: { name: string; href: string }[];
  dateRange: string;
  pdfExportHref: string;

  // Top Metrics
  salesContractAmount: string;
  budgetEstimatedAmount: string;
  income: string;
  expense: string;
  availableAmount: string;
  profitAmount: string;
  billSubmission: string;
  receiveAmount: string;
  due: string;

  // Cash Bank Balance
  cashBankBalances: {
    sl: number;
    account: string;
    balance: string;
  }[];

  // Expense
  expenses: {
    accountsDetails: string;
    subtotal: string;
    total: string;
  }[];

  // Income
  incomes: {
    accountsDetails: string;
    subtotal: string;
    total: string;
  }[];

  // Management Team
  management: string[];

  // Receivable Report
  receivables: {
    sl: number;
    customerName: string;
    openingBalance: string;
    debit: string;
    credit: string;
    balance: string;
  }[];

  // Payable Report
  payables: {
    sl: number;
    supplierName: string;
    openingBalance: string;
    debit: string;
    credit: string;
    balance: string;
  }[];
}

// =====================================================
// Mock Data (Based on image_7d2b11.jpg)
// =====================================================

const reportData: ProjectOverviewReportData = {
  projectName: "Hena Heights",
  breadcrumbs: [
    { name: "Home", href: "/dashboard" },
    { name: "Project", href: "/dashboard/project" },
    { name: "Project Overview Report", href: "#" },
  ],
  dateRange: "September 1, 2026 - September 30, 2026",
  pdfExportHref: "#",

  salesContractAmount: "0.00",
  budgetEstimatedAmount: "0.00",
  income: "0.00",
  expense: "11.00",
  availableAmount: "-11.00",
  profitAmount: "-11.00",
  billSubmission: "0.00",
  receiveAmount: "0.00",
  due: "0.00",

  cashBankBalances: [
    { sl: 1, account: "Cash", balance: "-11" },
  ],

  expenses: [
    { accountsDetails: "Total Expense (-)", subtotal: "0.00", total: "-" },
  ],

  incomes: [
    { accountsDetails: "Total Income (+)", subtotal: "0.00", total: "-" },
  ],

  management: ["User"],

  receivables: [], // No ledger data available

  payables: [], // No supplier data available
};

// =====================================================
// Component
// =====================================================

const ProjectOverviewReportPage = () => {
  const data = reportData;

  return (
    <div className="min-h-screen bg-slate-50/80 font-sans text-slate-900 pb-12">
      {/* =================================================
          Top Breadcrumb & Header Bar
      ================================================= */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          {data.breadcrumbs.map((item, index) => (
            <React.Fragment key={item.name}>
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
              <Link href={item.href} className="hover:text-blue-600 transition-colors">
                {item.name}
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          {data.projectName}
        </h1>

        {/* PDF Export Button */}
        <div>
          <Link
            href={data.pdfExportHref}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </Link>
        </div>
      </div>

      {/* =================================================
          Main Content Container
      ================================================= */}
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Date Filter Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">Select Date</label>
          <div className="w-full max-w-sm bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-medium text-slate-800 shadow-sm">
            {data.dateRange}
          </div>
        </div>

        {/* =================================================
            Top Metrics Banner (9 Cards in a responsive grid)
        ================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {/* Sales/Contract Amount */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Sales/Contract Amount:</p>
            <p className="mt-1 text-sm font-black text-blue-600">{data.salesContractAmount}</p>
          </div>

          {/* Budget/Estimated Amount */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Budget/Estimated Amount:</p>
            <p className="mt-1 text-sm font-black text-indigo-600">{data.budgetEstimatedAmount}</p>
          </div>

          {/* Income */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Income:</p>
            <p className="mt-1 text-sm font-black text-emerald-600">{data.income}</p>
          </div>

          {/* Expense */}
          <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Expense:</p>
            <p className="mt-1 text-sm font-black text-rose-600">{data.expense}</p>
          </div>

          {/* Available Amount */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Available Amount:</p>
            <p className="mt-1 text-sm font-black text-blue-600">{data.availableAmount}</p>
          </div>

          {/* Profit Amount */}
          <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Profit Amount:</p>
            <p className="mt-1 text-sm font-black text-red-500">{data.profitAmount}</p>
          </div>

          {/* Bill Submission */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Bill Submission:</p>
            <p className="mt-1 text-sm font-black text-emerald-600">{data.billSubmission}</p>
          </div>

          {/* Receive Amount */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Receive Amount:</p>
            <p className="mt-1 text-sm font-black text-blue-600">{data.receiveAmount}</p>
          </div>

          {/* Due */}
          <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3 text-center shadow-sm">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">Due:</p>
            <p className="mt-1 text-sm font-black text-blue-600">{data.due}</p>
          </div>
        </div>

        {/* =================================================
            Middle Grid: Cash Bank Balance, Expense, Income, Management
        ================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cash Bank Balance */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Cash Bank Balance</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2 px-3">Cash Bank Balance</th>
                    <th className="py-2 px-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {data.cashBankBalances.map((item) => (
                    <tr key={item.sl} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">{item.sl}</span>
                        <span>{item.account}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{item.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Expense</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2 px-3">Accounts Details</th>
                    <th className="py-2 px-3">Subtotal</th>
                    <th className="py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {data.expenses.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3">{row.accountsDetails}</td>
                      <td className="py-2.5 px-3">{row.subtotal}</td>
                      <td className="py-2.5 px-3">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Income */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Income</h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2 px-3">Accounts Details</th>
                    <th className="py-2 px-3">Subtotal</th>
                    <th className="py-2 px-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {data.incomes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3">{row.accountsDetails}</td>
                      <td className="py-2.5 px-3">{row.subtotal}</td>
                      <td className="py-2.5 px-3">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Management */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Management</h3>
            </div>
            <div className="p-4 space-y-3 flex-1 text-xs font-semibold text-slate-700">
              {data.management.map((person, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{person}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================
            Bottom Grid: Receivable Report & Payable Report
        ================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Receivable Report */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Receivable Report</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2 px-3 w-12">Sl.</th>
                    <th className="py-2 px-3">Customer Name</th>
                    <th className="py-2 px-3">Opening Balance</th>
                    <th className="py-2 px-3">Debit</th>
                    <th className="py-2 px-3">Credit</th>
                    <th className="py-2 px-3">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {data.receivables.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                        No ledger data available.
                      </td>
                    </tr>
                  ) : (
                    data.receivables.map((row) => (
                      <tr key={row.sl} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3">{row.sl}</td>
                        <td className="py-2.5 px-3">{row.customerName}</td>
                        <td className="py-2.5 px-3">{row.openingBalance}</td>
                        <td className="py-2.5 px-3">{row.debit}</td>
                        <td className="py-2.5 px-3">{row.credit}</td>
                        <td className="py-2.5 px-3">{row.balance}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Table Footer Total */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Total</span>
              <div className="flex gap-12 pr-4 font-mono">
                <span>0.00</span>
                <span>0.00</span>
                <span>0.00</span>
                <span>0.00</span>
              </div>
            </div>
          </div>

          {/* Payable Report */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-white border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Payable Report</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2 px-3 w-12">Sl.</th>
                    <th className="py-2 px-3">Supplier Name</th>
                    <th className="py-2 px-3">Opening Balance</th>
                    <th className="py-2 px-3">Debit</th>
                    <th className="py-2 px-3">Credit</th>
                    <th className="py-2 px-3">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {data.payables.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                        No ledger data available.
                      </td>
                    </tr>
                  ) : (
                    data.payables.map((row) => (
                      <tr key={row.sl} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3">{row.sl}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.supplierName}</td>
                        <td className="py-2.5 px-3">{row.openingBalance}</td>
                        <td className="py-2.5 px-3">{row.debit}</td>
                        <td className="py-2.5 px-3">{row.credit}</td>
                        <td className="py-2.5 px-3">{row.balance}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Table Footer Total */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Total :</span>
              <div className="flex gap-12 pr-4 font-mono">
                <span>0.00</span>
                <span>0.00</span>
                <span>0.00</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewReportPage;