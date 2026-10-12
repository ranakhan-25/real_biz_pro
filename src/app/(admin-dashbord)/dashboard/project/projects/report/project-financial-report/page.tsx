'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  FileSpreadsheet, 
  FileDown 
} from 'lucide-react';

interface ProjectReportItem {
  id: number;
  project: string;
  opening: number;
  debit: number;
  credit: number;
  balance: number;
}

const dummyProjectReportData: ProjectReportItem[] = [
  { id: 1, project: 'Head Office', opening: 0.00, debit: 0.00, credit: 20000.00, balance: -20000.00 },
  { id: 2, project: 'Lake Garden', opening: 0.00, debit: 33217166.66, credit: 820000.00, balance: 32397166.66 },
  { id: 3, project: 'Estern 19', opening: 0.00, debit: 0.00, credit: 0.00, balance: 0.00 },
  { id: 4, project: 'Sheba Eyecon Tower', opening: 0.00, debit: 800000.00, credit: 45170.00, balance: 754830.00 },
  { id: 5, project: 'Hena Heights', opening: 0.00, debit: 0.00, credit: 0.00, balance: 0.00 },
  { id: 6, project: 'Rifat Eyecon City', opening: 0.00, debit: 0.00, credit: 24300.00, balance: -24300.00 },
  { id: 7, project: 'Green Valley', opening: 0.00, debit: 1500000.00, credit: 500000.00, balance: 1000000.00 },
  { id: 8, project: 'Sky View Tower', opening: 0.00, debit: 4200000.00, credit: 1200000.00, balance: 3000000.00 },
  { id: 9, project: 'City Center', opening: 0.00, debit: 950000.00, credit: 150000.00, balance: 800000.00 },
  { id: 10, project: 'Metro Plaza', opening: 0.00, debit: 2300000.00, credit: 300000.00, balance: 2000000.00 }
];

export default function ProjectReport() {
  const [reportList] = useState<ProjectReportItem[]>(dummyProjectReportData);
  const [selectedDate, setSelectedDate] = useState('August 15, 2026 - September 13, 2026');
  const [company, setCompany] = useState('Somikoron IT Ltd');
  const [project, setProject] = useState('Select Project');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Grand Totals calculation
  const totalOpening = reportList.reduce((acc, item) => acc + item.opening, 0);
  const totalDebit = reportList.reduce((acc, item) => acc + item.debit, 0);
  const totalCredit = reportList.reduce((acc, item) => acc + item.credit, 0);
  const totalBalance = reportList.reduce((acc, item) => acc + item.balance, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Project</span> &gt; <span className="text-slate-500">Project Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Report</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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
          <input 
            type="text" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Project</label>
          <select 
            value={project} 
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select Project</option>
            <option>Head Office</option>
            <option>Lake Garden</option>
            <option>Sheba Eyecon Tower</option>
          </select>
        </div>
      </div>

      {/* Export & Search Bar */}
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
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-4 w-20">ID</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4 text-right w-36">Opening</th>
              <th className="py-3 px-4 text-right w-44">Debit</th>
              <th className="py-3 px-4 text-right w-44">Credit</th>
              <th className="py-3 px-4 text-right w-44">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {reportList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-4 font-medium">{item.id}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{item.project}</td>
                <td className="py-3 px-4 text-right">{item.opening.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="py-3 px-4 text-right">{item.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="py-3 px-4 text-right">{item.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className={`py-3 px-4 text-right font-medium ${item.balance < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {item.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total Row */}
      <div className="bg-white border-x border-b border-slate-200 px-4 py-3 text-xs font-bold text-slate-900 rounded-b-lg overflow-x-auto">
        <div className="grid grid-cols-6 gap-2 min-w-[1000px] px-2 items-center">
          <div className="col-span-2 text-right pr-6 text-purple-700 uppercase">Grand Total</div>
          <div className="text-right">{totalOpening.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-right">{totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className="text-right">{totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className={`text-right ${totalBalance < 0 ? 'text-rose-600' : 'text-purple-700'}`}>
            {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
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