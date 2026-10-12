'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  FileDown 
} from 'lucide-react';

interface ProgressReportItem {
  id: number;
  projectType: string;
  project: string;
  totalTask: number;
  completeTask: number;
  workingProgress: string;
  budget: number;
  cost: number;
  financialProgress: string;
}

const dummyProgressData: ProgressReportItem[] = [
  { id: 56, projectType: 'Office', project: 'Rifat Eyecon City', totalTask: 0, completeTask: 0, workingProgress: '0.00%', budget: 15000000, cost: 65162, financialProgress: '0.43%' },
  { id: 55, projectType: 'Real Estate', project: 'Hena Heights', totalTask: 1, completeTask: 0, workingProgress: '0.00%', budget: 7430000, cost: 0, financialProgress: '0.00%' },
  { id: 54, projectType: 'Real Estate', project: 'Sheba Eyecon Tower', totalTask: 0, completeTask: 0, workingProgress: '0.00%', budget: 2000000, cost: 45820, financialProgress: '2.29%' },
  { id: 53, projectType: 'Real Estate', project: 'Estern 19', totalTask: 0, completeTask: 0, workingProgress: '0.00%', budget: 0, cost: 82, financialProgress: '0.00%' },
  { id: 52, projectType: 'Real Estate', project: 'Lake Garden', totalTask: 1, completeTask: 0, workingProgress: '0.00%', budget: 759510, cost: 13850, financialProgress: '1.82%' },
  { id: 51, projectType: 'Office', project: 'Head Office', totalTask: 0, completeTask: 0, workingProgress: '0.00%', budget: 0, cost: 21340, financialProgress: '0.00%' }
];

export default function ProjectProgressReport() {
  const [reportList] = useState<ProgressReportItem[]>(dummyProgressData);
  const [projectFilter, setProjectFilter] = useState('Select Project');
  const [entriesCount, setEntriesCount] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Project</span> &gt; <span className="text-slate-500">Project Progress Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Project Progress Report</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full sm:w-1/3 mb-4">
        <label className="block text-xs font-semibold text-slate-600 mb-1">Project</label>
        <select 
          value={projectFilter} 
          onChange={(e) => setProjectFilter(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option>Select Project</option>
          <option>Rifat Eyecon City</option>
          <option>Hena Heights</option>
          <option>Sheba Eyecon Tower</option>
          <option>Lake Garden</option>
          <option>Head Office</option>
        </select>
      </div>

      {/* Action & Search Bar */}
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
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4 w-32">Project Type</th>
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4 text-center w-28">Total Task</th>
              <th className="py-3 px-4 text-center w-28">Complete Task</th>
              <th className="py-3 px-4 text-center w-36">Working Progress</th>
              <th className="py-3 px-4 text-right w-32">Budget</th>
              <th className="py-3 px-4 text-right w-28">Cost</th>
              <th className="py-3 px-4 text-right w-36">Financial Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {reportList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-4 font-medium">{item.id}</td>
                <td className="py-3 px-4">{item.projectType}</td>
                <td className="py-3 px-4 font-medium text-purple-600 hover:underline cursor-pointer">{item.project}</td>
                <td className="py-3 px-4 text-center">{item.totalTask}</td>
                <td className="py-3 px-4 text-center">{item.completeTask}</td>
                <td className="py-3 px-4 text-center font-semibold text-emerald-600">{item.workingProgress}</td>
                <td className="py-3 px-4 text-right">{item.budget.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">{item.cost.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-semibold text-emerald-600">{item.financialProgress}</td>
              </tr>
            ))}
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