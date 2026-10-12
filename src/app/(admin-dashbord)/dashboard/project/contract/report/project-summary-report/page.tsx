'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  FileSpreadsheet, 
  FileDown 
} from 'lucide-react';

interface ReportItem {
  id: number;
  category: 'Materials' | 'Services' | 'Expenses';
  sl: number;
  description: string;
  quantity: number;
  amount: number;
}

const dummyReportData: ReportItem[] = [
  // Materials
  { id: 1, category: 'Materials', sl: 1, description: 'Rod', quantity: 10, amount: 820.00 },
  { id: 2, category: 'Materials', sl: 2, description: '1st Class Brick', quantity: 5000, amount: 58000.00 },
  { id: 3, category: 'Materials', sl: 3, description: 'Sand (FM 2.50)', quantity: 1500, amount: 45000.00 },

  // Services
  { id: 4, category: 'Services', sl: 1, description: 'Transport Cost', quantity: 2, amount: 5000.00 },
  { id: 5, category: 'Services', sl: 2, description: 'Equipment Rental', quantity: 1, amount: 12000.00 },

  // Expenses
  { id: 6, category: 'Expenses', sl: 1, description: 'Rod Consumption', quantity: 10, amount: 820.00 },
  { id: 7, category: 'Expenses', sl: 2, description: 'Brick Consumption', quantity: 1000, amount: 11600.00 },
  { id: 8, category: 'Expenses', sl: 3, description: 'Office Stationary', quantity: 1, amount: 3500.00 }
];

export default function ProjectSummaryReport() {
  const [reportList] = useState<ReportItem[]>(dummyReportData);
  const [selectedDate, setSelectedDate] = useState('September 1, 2026 - September 30, 2026');
  const [company, setCompany] = useState('Select value');
  const [project, setProject] = useState('Select Project');
  const [site, setSite] = useState('Select Site');
  const [task, setTask] = useState('Select Task');
  const [categoryFilter, setCategoryFilter] = useState('Search Service/Work');
  const [entriesCount, setEntriesCount] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter items based on category or search if needed
  const categories: ('Materials' | 'Services' | 'Expenses')[] = ['Materials', 'Services', 'Expenses'];

  // Grand Totals
  const grandTotalQty = reportList.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotalAmount = reportList.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Project</span> &gt; <span className="text-slate-500">Project Summary Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Summary Report</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Date</label>
          <div className="relative">
            <input 
              type="text" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Calendar size={14} className="absolute right-3 top-2.5 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Company</label>
          <select 
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Company A</option>
            <option>Company B</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Project</label>
          <select 
            value={project} 
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select Project</option>
            <option>Sheba Eyecon Tower</option>
            <option>Lake Garden</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Site</label>
          <select 
            value={site} 
            onChange={(e) => setSite(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select Site</option>
            <option>Site 1</option>
            <option>Site 2</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Task</label>
          <select 
            value={task} 
            onChange={(e) => setTask(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select Task</option>
            <option>Task 1</option>
            <option>Task 2</option>
          </select>
        </div>
      </div>

      {/* Category Filter Row */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full sm:w-1/4 mb-6">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option>Search Service/Work</option>
          <option>Materials</option>
          <option>Services</option>
          <option>Expenses</option>
        </select>
      </div>

      {/* Export & Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border-t border-x border-slate-200 rounded-t-lg gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Exported to Excel!')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
          >
            <FileSpreadsheet size={14} /> Excel
          </button>
          <button 
            onClick={() => alert('Exported to PDF!')}
            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
          >
            <FileDown size={14} /> PDF
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-600 ml-4">
            <span>Show</span>
            <select 
              value={entriesCount} 
              onChange={(e) => setEntriesCount(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-600">Search:</span>
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto rounded-b-lg">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-4 w-24">SL NO.</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-right w-40">Quantity</th>
              <th className="py-3 px-4 text-right w-44">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {categories.map((cat) => {
              const catItems = reportList.filter(item => item.category === cat);
              const catTotalQty = catItems.reduce((acc, item) => acc + item.quantity, 0);
              const catTotalAmount = catItems.reduce((acc, item) => acc + item.amount, 0);

              return (
                <React.Fragment key={cat}>
                  {/* Category Section Header Row */}
                  <tr className="bg-slate-100 font-bold text-slate-900 text-center">
                    <td colSpan={4} className="py-2 px-4 tracking-wide">{cat}</td>
                  </tr>

                  {/* Category Items */}
                  {catItems.length > 0 ? (
                    catItems.map((item) => (
                      <tr key={item.id} className="hover:bg-purple-50/40 transition">
                        <td className="py-2.5 px-4 font-medium">{item.sl}</td>
                        <td className="py-2.5 px-4">{item.description}</td>
                        <td className="py-2.5 px-4 text-right">{item.quantity.toLocaleString()}</td>
                        <td className="py-2.5 px-4 text-right font-medium">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-2.5 px-4 text-center text-slate-400">No records found</td>
                    </tr>
                  )}

                  {/* Sub Total Row */}
                  <tr className="bg-slate-50 font-semibold text-slate-900 border-t border-slate-200">
                    <td colSpan={2} className="py-2 px-4 text-right">Total</td>
                    <td className="py-2 px-4 text-right">{catTotalQty.toLocaleString()}</td>
                    <td className="py-2 px-4 text-right">{catTotalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                </React.Fragment>
              );
            })}

            {/* Grand Total Row */}
            <tr className="bg-slate-200 font-bold text-slate-900 border-t-2 border-slate-300">
              <td colSpan={2} className="py-3 px-4 text-right uppercase">Grand Total</td>
              <td className="py-3 px-4 text-right">{grandTotalQty.toLocaleString()}</td>
              <td className="py-3 px-4 text-right text-purple-700">{grandTotalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {reportList.length} of {reportList.length} entries</div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            className="px-3 py-1 bg-purple-600 text-white border border-purple-600 rounded"
          >
            1
          </button>
          <button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}