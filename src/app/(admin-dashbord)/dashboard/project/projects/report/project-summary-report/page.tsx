'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  FileSpreadsheet, 
  FileText, 
  ArrowLeft, 
  X 
} from 'lucide-react';

interface SummaryRow {
  sl: string | number;
  description: string;
  quantity: number | string;
  amount: number | string;
}

export default function ProjectSummaryReport() {
  const router = useRouter();

  // Filter States
  const [selectDate, setSelectDate] = useState<string>('September 1, 2026 - September 30, 2026');
  const [company, setCompany] = useState<string>('Select value');
  const [selectProject, setSelectProject] = useState<string>('Select Project');
  const [site, setSite] = useState<string>('Select Site');
  const [task, setTask] = useState<string>('Select Task');
  const [category, setCategory] = useState<string>('Search Service/Work');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans text-slate-800">
      <div className="space-y-6">
        
        {/* Top Header with Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center text-sm text-slate-600 space-x-2">
            <span className="hover:text-blue-600 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="hover:text-blue-600 cursor-pointer">Project</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-900">Project Summary Report</span>
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
          
          {/* Top Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-sm">
            
            {/* Select Date */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5">Select Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={selectDate} 
                  onChange={(e) => setSelectDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500 pr-8"
                />
                <button 
                  onClick={() => setSelectDate('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5">Company</label>
              <select 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select value">Select value</option>
                <option value="Somikoron IT Ltd">Somikoron IT Ltd</option>
              </select>
            </div>

            {/* Select Project */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5">Select Project</label>
              <select 
                value={selectProject} 
                onChange={(e) => setSelectProject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Project">Select Project</option>
                <option value="Rifat Eyecon City">Rifat Eyecon City</option>
              </select>
            </div>

            {/* Site */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5">Site</label>
              <select 
                value={site} 
                onChange={(e) => setSite(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Site">Select Site</option>
                <option value="Abason Site">Abason Site</option>
              </select>
            </div>

            {/* Task */}
            <div>
              <label className="block text-slate-600 font-medium mb-1.5">Task</label>
              <select 
                value={task} 
                onChange={(e) => setTask(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500"
              >
                <option value="Select Task">Select Task</option>
                <option value="General Task">General Task</option>
              </select>
            </div>

          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-1/3 text-sm">
            <label className="block text-slate-600 font-medium mb-1.5">Category</label>
            <div className="relative">
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 text-xs focus:outline-none focus:border-purple-500 pr-8"
              />
              <button 
                onClick={() => setCategory('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Export & Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            
            {/* Excel & PDF Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => alert('Exporting to Excel...')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Excel</span>
              </button>
              <button 
                onClick={() => alert('Generating PDF...')}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 pl-4">
                <span>Show</span>
                <select 
                  value={entriesPerPage} 
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-purple-500 text-xs"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 font-medium">Search:</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=""
                className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm w-full sm:w-64 focus:outline-none focus:border-purple-500" 
              />
            </div>
          </div>

          {/* Data Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto border border-[#7b68ee]/40 rounded-xl shadow-sm">
            <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
              <thead>
                <tr className="bg-[#6b58e8] text-white font-bold tracking-wide">
                  <th className="p-3 border-r border-purple-400 w-32">SL NO.</th>
                  <th className="p-3 border-r border-purple-400">DESCRIPTION</th>
                  <th className="p-3 border-r border-purple-400 w-44 text-right">QUANTITY</th>
                  <th className="p-3 w-44 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="bg-white text-slate-700">
                
                {/* Materials Section */}
                <tr className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200" colSpan={4}>Materials</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5"></td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-b border-slate-300">
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={2}>Total</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">0</td>
                  <td className="p-2.5 text-right">0.00</td>
                </tr>

                {/* Services Section */}
                <tr className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200" colSpan={4}>Services</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5"></td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-b border-slate-300">
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={2}>Total</td>
                  <td className="p-2.5 border-r border-slate-200 text-right">0</td>
                  <td className="p-2.5 text-right">0.00</td>
                </tr>

                {/* Expenses Section */}
                <tr className="bg-slate-100 font-bold text-slate-900 border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200" colSpan={4}>Expenses</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5 border-r border-slate-200"></td>
                  <td className="p-2.5"></td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-b border-slate-300">
                  <td className="p-2.5 border-r border-slate-200 text-right" colSpan={3}>Total</td>
                  <td className="p-2.5 text-right">0.00</td>
                </tr>

                {/* Grand Total Row */}
                <tr className="bg-slate-200 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="p-3 border-r border-slate-300 text-right" colSpan={2}>Grand Total</td>
                  <td className="p-3 border-r border-slate-300 text-right">0</td>
                  <td className="p-3 text-right">0.00</td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Footer & Pagination Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-sm text-slate-600">
            <div>
              Showing 1 to 7 of 7 entries
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