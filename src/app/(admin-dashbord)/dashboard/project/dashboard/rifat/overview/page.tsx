"use client";

import React, { useState } from "react";
import { FileText, ChevronRight } from "lucide-react";

export default function ProjectOverviewPage() {
  const [dateRange, setDateRange] = useState("October 1, 2026 - October 31, 2026");

  return (
    <div className="p-6 space-y-6 max-w-[1700px] mx-auto text-slate-900 bg-[#f5f7fa] min-h-screen">
      
      {/* Breadcrumb Header */}
      <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
        <span>Home</span>
        <ChevronRight size={12} />
        <span>Project</span>
        <ChevronRight size={12} />
        <span className="text-slate-800 font-semibold">Project Overview Report</span>
      </div>

      {/* Top Section: Date selector, Title, PDF Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-full md:w-80 space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Date</label>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight text-center flex-1">
          Rifat Eyecon City
        </h2>

        <button className="flex items-center gap-1 px-3.5 py-1.5 bg-rose-600 text-white text-xs font-bold rounded hover:bg-rose-700 transition-colors shadow-sm">
          <FileText className="h-3.5 w-3.5" /> PDF
        </button>
      </div>

      {/* Summary Cards Grid (9 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        
        {/* Card 1 */}
        <div className="bg-blue-50/70 border border-blue-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Sales/Contract Amount:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Budget/Estimated Amount:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 3 */}
        <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Income:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 4 */}
        <div className="bg-rose-50/70 border border-rose-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Expense:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 5 */}
        <div className="bg-amber-50/70 border border-amber-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Available Amount:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 6 */}
        <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Profit Amount:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 7 */}
        <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Bill Submission:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 8 */}
        <div className="bg-purple-50/70 border border-purple-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Receive Amount:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

        {/* Card 9 */}
        <div className="bg-yellow-50/70 border border-yellow-100 p-3.5 rounded-xl shadow-sm text-center flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-600">Due:</span>
          <span className="text-base font-bold text-slate-900 mt-2">0.00</span>
        </div>

      </div>

      {/* Middle Sections: Cash Bank Balance, Expense, Income, Management */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Cash Bank Balance */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-800">Cash Bank Balance</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#655bea] text-white font-bold text-[11px]">
                  <th className="px-4 py-2.5">Cash Bank Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-4 py-3 flex justify-between items-center">
                    <span>Cash</span>
                    <span className="font-bold">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-3 border-t border-slate-100 text-xs text-slate-600">1</div>
          </div>
        </div>

        {/* Expense */}
        <div className="space-y-3 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-800">Expense</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#655bea] text-white font-bold text-[11px]">
                  <th className="px-4 py-2.5">ACCOUNTS DETAILS</th>
                  <th className="px-4 py-2.5 text-right">SUBTOTAL</th>
                  <th className="px-4 py-2.5 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-4 py-3 font-semibold">Total Expense (-)</td>
                  <td className="px-4 py-3 text-right">0.00</td>
                  <td className="px-4 py-3 text-right">-</td>
                </tr>
              </tbody>
            </table>
            <div className="p-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 bg-slate-50">
              <span>Showing 1 to 1 of 1 entries</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 border border-slate-200 rounded bg-white text-slate-400">Previous</button>
                <button className="px-2.5 py-1 border border-slate-200 rounded bg-[#655bea] text-white font-semibold">1</button>
                <button className="px-2.5 py-1 border border-slate-200 rounded bg-white text-slate-600">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Income & Management */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Income</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#655bea] text-white font-bold text-[11px]">
                    <th className="px-4 py-2.5">ACCOUNTS DETAILS</th>
                    <th className="px-4 py-2.5 text-right">SUBTOTAL</th>
                    <th className="px-4 py-2.5 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="px-4 py-3 font-semibold">Total Income (+)</td>
                    <td className="px-4 py-3 text-right">0.00</td>
                    <td className="px-4 py-3 text-right">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Management</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-xs text-slate-500">
              Management overview data...
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Reports: Receivable Report & Payable Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Receivable Report */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-800">Receivable Report</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#655bea] text-white font-bold text-[11px]">
                  <th className="px-3 py-2.5">SL.</th>
                  <th className="px-3 py-2.5">CUSTOMER NAME</th>
                  <th className="px-3.5 py-2.5 text-right">OPENING BALANCE</th>
                  <th className="px-3.5 py-2.5 text-right">DEBIT</th>
                  <th className="px-3.5 py-2.5 text-right">CREDIT</th>
                  <th className="px-3.5 py-2.5 text-right">BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-400 italic">
                    No ledger data available.
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="px-4 py-2.5 text-right">Total</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payable Report */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-800">Payable Report</h3>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#655bea] text-white font-bold text-[11px]">
                  <th className="px-3 py-2.5">SL.</th>
                  <th className="px-3 py-2.5">SUPPLIER NAME</th>
                  <th className="px-3.5 py-2.5 text-right">OPENING BALANCE</th>
                  <th className="px-3.5 py-2.5 text-right">DEBIT</th>
                  <th className="px-3.5 py-2.5 text-right">CREDIT</th>
                  <th className="px-3.5 py-2.5 text-right">BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="px-4 py-2.5 text-right">Total :</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                  <td className="px-3.5 py-2.5 text-right">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}