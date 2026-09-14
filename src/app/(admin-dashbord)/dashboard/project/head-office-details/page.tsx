'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, FileText } from 'lucide-react';

export default function ProjectOverview() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <button onClick={() => router.push('/dashboard')} className="hover:text-indigo-600">Home</button>
        <ChevronRight size={14} />
        <span className="hover:text-indigo-600 cursor-pointer">Project</span>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">Project Overview Report</span>
      </div>

      {/* Header section with Date and PDF Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Select Date</label>
          <input 
            type="text" 
            readOnly 
            value="September 1, 2026 - September 30, 2026" 
            className="border border-gray-300 rounded px-3 py-1.5 text-xs bg-gray-50 w-72"
          />
        </div>
        <div className="text-xl font-bold tracking-wide text-center flex-1">
          Head Office
        </div>
        <div>
          <button className="bg-rose-500 text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-rose-600 transition flex items-center space-x-1">
            <FileText size={14} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards (9 Cards Row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        <div className="bg-blue-100 p-3 rounded-lg text-center border border-blue-200">
          <div className="text-[11px] text-gray-600 font-medium">Sales/Contract Amount:</div>
          <div className="text-sm font-bold text-blue-700 mt-1">0.00</div>
        </div>

        <div className="bg-indigo-100 p-3 rounded-lg text-center border border-indigo-200">
          <div className="text-[11px] text-gray-600 font-medium">Budget/Estimated Amount:</div>
          <div className="text-sm font-bold text-indigo-700 mt-1">0.00</div>
        </div>

        <div className="bg-emerald-100 p-3 rounded-lg text-center border border-emerald-200">
          <div className="text-[11px] text-gray-600 font-medium">Income:</div>
          <div className="text-sm font-bold text-emerald-700 mt-1">0.00</div>
        </div>

        <div className="bg-rose-100 p-3 rounded-lg text-center border border-rose-200">
          <div className="text-[11px] text-gray-600 font-medium">Expense:</div>
          <div className="text-sm font-bold text-rose-700 mt-1">21,340.00</div>
        </div>

        <div className="bg-amber-100 p-3 rounded-lg text-center border border-amber-200">
          <div className="text-[11px] text-gray-600 font-medium">Available Amount:</div>
          <div className="text-sm font-bold text-amber-700 mt-1">-21,340.00</div>
        </div>

        <div className="bg-purple-100 p-3 rounded-lg text-center border border-purple-200">
          <div className="text-[11px] text-gray-600 font-medium">Profit Amount:</div>
          <div className="text-sm font-bold text-purple-700 mt-1">-21,340.00</div>
        </div>

        <div className="bg-green-100 p-3 rounded-lg text-center border border-green-200">
          <div className="text-[11px] text-gray-600 font-medium">Bill Submission:</div>
          <div className="text-sm font-bold text-green-700 mt-1">0.00</div>
        </div>

        <div className="bg-teal-100 p-3 rounded-lg text-center border border-teal-200">
          <div className="text-[11px] text-gray-600 font-medium">Receive Amount:</div>
          <div className="text-sm font-bold text-teal-700 mt-1">0.00</div>
        </div>

        <div className="bg-orange-100 p-3 rounded-lg text-center border border-orange-200">
          <div className="text-[11px] text-gray-600 font-medium">Due:</div>
          <div className="text-sm font-bold text-orange-700 mt-1">0.00</div>
        </div>
      </div>

      {/* Middle Sections: Cash Bank Balance, Expense, Income, Management */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Cash Bank Balance */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Cash Bank Balance</div>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2 rounded-l">Cash Bank Balance</th>
                <th className="p-2 rounded-r text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-2">1</td>
                <td className="p-2">Cash</td>
                <td className="p-2 text-right text-rose-600">-20,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Expense */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Expense</div>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2 rounded-l">ACCOUNTS DETAILS</th>
                <th className="p-2">SUBTOTAL</th>
                <th className="p-2 rounded-r text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-2">Total Expense (-)</td>
                <td className="p-2">0.00</td>
                <td className="p-2 text-right">-</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-gray-400">Previous</span>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs">1</button>
            <span className="text-xs text-gray-400">Next</span>
          </div>
        </div>

        {/* Income */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Income</div>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-indigo-500 text-white">
                <th className="p-2 rounded-l">ACCOUNTS DETAILS</th>
                <th className="p-2">SUBTOTAL</th>
                <th className="p-2 rounded-r text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-2">Total Income (+)</td>
                <td className="p-2">0.00</td>
                <td className="p-2 text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Management */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Management</div>
          <div className="text-xs space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections: Receivable Report & Payable Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receivable Report */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Receivable Report</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-2 rounded-l">SL.</th>
                  <th className="p-2">CUSTOMER NAME</th>
                  <th className="p-2">OPENING BALANCE</th>
                  <th className="p-2">DEBIT</th>
                  <th className="p-2">CREDIT</th>
                  <th className="p-2 rounded-r">BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Nexus Developers</td>
                  <td className="p-2">82.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">82.00</td>
                </tr>
                <tr className="font-semibold bg-gray-50">
                  <td className="p-2" colSpan={2}>Total</td>
                  <td className="p-2">82.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">82.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payable Report */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3">
          <div className="font-semibold text-gray-700 text-center">Payable Report</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-2 rounded-l">SL.</th>
                  <th className="p-2">SUPPLIER NAME</th>
                  <th className="p-2">OPENING BALANCE</th>
                  <th className="p-2">DEBIT</th>
                  <th className="p-2">CREDIT</th>
                  <th className="p-2 rounded-r">BALANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">Safety First Suppliers</td>
                  <td className="p-2">82.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">82.00</td>
                </tr>
                <tr className="font-semibold bg-gray-50">
                  <td className="p-2" colSpan={2}>Total :</td>
                  <td className="p-2">82.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">0.00</td>
                  <td className="p-2">82.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}