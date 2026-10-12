'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  ArrowLeft 
} from 'lucide-react';

interface SiteIncomeRow {
  id: number;
  siteName: string;
  project: string;
  salesContract: number;
  totalIncome: number;
  totalExpense: number;
  profit: number;
  billSubmission: number;
  receiveAmount: number;
  due: number;
}

export default function SiteWiseIncomeReport() {
  const router = useRouter();

  // Filter States
  const [project, setProject] = useState<string>('Select Project');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);

  // Exact Data matching the image
  const rawData: SiteIncomeRow[] = [
    {
      id: 1,
      siteName: 'Abason Project',
      project: '',
      salesContract: 0,
      totalIncome: 0.00,
      totalExpense: 0.00,
      profit: 0.00,
      billSubmission: 0,
      receiveAmount: 0,
      due: 0
    },
    {
      id: 2,
      siteName: 'Admin',
      project: '',
      salesContract: 0,
      totalIncome: 0.00,
      totalExpense: 0.00,
      profit: 0.00,
      billSubmission: 0,
      receiveAmount: 0,
      due: 0
    },
    {
      id: 3,
      siteName: 'HPDL',
      project: '',
      salesContract: 0,
      totalIncome: 0.00,
      totalExpense: 0.00,
      profit: 0.00,
      billSubmission: 0,
      receiveAmount: 0,
      due: 0
    },
    {
      id: 4,
      siteName: 'GV TESTt',
      project: '',
      salesContract: 0,
      totalIncome: 0.00,
      totalExpense: 0.00,
      profit: 0.00,
      billSubmission: 0,
      receiveAmount: 0,
      due: 0
    },
    {
      id: 5,
      siteName: 'GV',
      project: '',
      salesContract: 0,
      totalIncome: 0.00,
      totalExpense: 0.00,
      profit: 0.00,
      billSubmission: 0,
      receiveAmount: 0,
      due: 0
    }
  ];

  // Totals Calculation
  const totalSalesContract = rawData.reduce((acc, curr) => acc + curr.salesContract, 0);
  const totalIncomeSum = rawData.reduce((acc, curr) => acc + curr.totalIncome, 0);
  const totalExpenseSum = rawData.reduce((acc, curr) => acc + curr.totalExpense, 0);
  const totalProfit = rawData.reduce((acc, curr) => acc + curr.profit, 0);
  const totalBillSubmission = rawData.reduce((acc, curr) => acc + curr.billSubmission, 0);
  const totalReceiveAmount = rawData.reduce((acc, curr) => acc + curr.receiveAmount, 0);
  const totalDue = rawData.reduce((acc, curr) => acc + curr.due, 0);

  // Search Filter logic
  const filteredData = rawData.filter(row => 
    row.siteName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans text-slate-800">
      <div className="space-y-6">
        
        {/* Top Header with Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center text-sm text-slate-600 space-x-2">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="hover:text-blue-600 cursor-pointer">Report</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-900">Site wise Income Report</span>
          </div>

          <button 
            onClick={() => router.back()} // ✅ Real working browser history back button
            className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 shadow transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous</span>
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6">
          
          {/* Top Filter & Export Bar */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            
            {/* Project Filter */}
            <div className="w-full sm:w-80 text-sm">
              <label className="block text-slate-600 font-medium mb-1.5">Project*</label>
              <select 
                value={project} 
                onChange={(e) => setProject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 bg-white text-slate-700 focus:outline-none focus:border-purple-500"
              >
                <option value="Select Project">Select Project</option>
                <option value="Abason Project">Abason Project</option>
              </select>
            </div>

            {/* Export PDF & Excel Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => alert('Generating Site wise Income PDF...')}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 shadow transition"
              >
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </button>
              <button 
                onClick={() => alert('Exporting Site wise Income to Excel...')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center space-x-1.5 shadow transition"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Excel</span>
              </button>
            </div>

          </div>

          {/* Entries & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Show</span>
              <select 
                value={entriesPerPage} 
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-purple-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 font-medium">Search:</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search site..."
                className="border border-slate-300 rounded-lg px-4 py-1.5 text-sm w-full sm:w-64 focus:outline-none focus:border-purple-500" 
              />
            </div>
          </div>

          {/* Data Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto border border-[#7b68ee]/40 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-[#6b58e8] text-white font-bold tracking-wide text-center">
                  <th className="p-3 border-r border-purple-400">ID</th>
                  <th className="p-3 border-r border-purple-400 text-left">SITE NAME</th>
                  <th className="p-3 border-r border-purple-400 text-left">PROJECT</th>
                  <th className="p-3 border-r border-purple-400 text-right">SALES/CONTRACT</th>
                  <th className="p-3 border-r border-purple-400 text-right">TOTAL INCOME</th>
                  <th className="p-3 border-r border-purple-400 text-right">TOTAL EXPENSE</th>
                  <th className="p-3 border-r border-purple-400 text-right">PROFIT</th>
                  <th className="p-3 border-r border-purple-400 text-right">BILL SUBMISSION</th>
                  <th className="p-3 border-r border-purple-400 text-right">RECEIVE AMOUNT</th>
                  <th className="p-3 text-right">DUE</th>
                </tr>
              </thead>
              <tbody className="bg-white text-slate-700">
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-slate-200 text-center">{row.id}</td>
                    <td className="p-3 border-r border-slate-200 font-medium text-slate-900">{row.siteName}</td>
                    <td className="p-3 border-r border-slate-200">{row.project}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.salesContract}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.billSubmission}</td>
                    <td className="p-3 border-r border-slate-200 text-right">{row.receiveAmount}</td>
                    <td className="p-3 text-right">{row.due}</td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-3.5 border-r border-slate-200 uppercase" colSpan={3} align="center">TOTAL</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalSalesContract}</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalIncomeSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalExpenseSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalBillSubmission}</td>
                  <td className="p-3.5 border-r border-slate-200 text-right">{totalReceiveAmount}</td>
                  <td className="p-3.5 text-right">{totalDue}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer & Pagination Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-slate-600">
            <div>
              Showing 1 to {filteredData.length} of {rawData.length} entries
            </div>

            <div className="flex items-center space-x-1">
              <button 
                disabled 
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-3.5 py-1.5 bg-[#6b58e8] text-white font-semibold rounded-lg shadow">
                1
              </button>
              <button 
                disabled 
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}