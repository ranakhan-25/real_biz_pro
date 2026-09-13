'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  FileSpreadsheet, 
  FileDown 
} from 'lucide-react';

interface SummaryItem {
  id: number;
  date: string;
  description: string;
  bricks: number;
  rod: number;
  sand: number;
  directCommonCost: number;
  cogs: number;
  adminExpenses: number;
}

const dummySummaryData: SummaryItem[] = [
  { id: 1, date: '2026-09-07', description: '1st Class Brick', bricks: 58000, rod: 0, sand: 0, directCommonCost: 0, cogs: 0, adminExpenses: 0 },
  { id: 2, date: '2026-09-07', description: '16mm Rod', bricks: 0, rod: 10660, sand: 0, directCommonCost: 0, cogs: 0, adminExpenses: 0 },
  { id: 3, date: '2026-09-07', description: '20mm Rod', bricks: 0, rod: 8800, sand: 0, directCommonCost: 0, cogs: 0, adminExpenses: 0 },
  { id: 4, date: '2026-09-07', description: 'Sand (FM 2.50)', bricks: 0, rod: 0, sand: 1500, directCommonCost: 0, cogs: 0, adminExpenses: 0 },
  { id: 5, date: '2026-09-03', description: 'req', bricks: 0, rod: 100, sand: 0, directCommonCost: 0, cogs: 0, adminExpenses: 0 },
  { id: 6, date: '2026-09-07', description: 'Bricks Consumption', bricks: 0, rod: 0, sand: 0, directCommonCost: 0, cogs: 45000, adminExpenses: 0 },
  { id: 7, date: '2026-09-07', description: 'Rod Consumption', bricks: 0, rod: 0, sand: 0, directCommonCost: 0, cogs: 17760, adminExpenses: 0 },
  { id: 8, date: '2026-09-07', description: 'Sand Consumption', bricks: 0, rod: 0, sand: 0, directCommonCost: 0, cogs: 1602, adminExpenses: 0 },
  { id: 9, date: '2026-09-13', description: 'Rod Consumption', bricks: 0, rod: 0, sand: 0, directCommonCost: 0, cogs: 820, adminExpenses: 0 },
  { id: 10, date: '2026-09-15', description: 'Cement Purchase', bricks: 0, rod: 0, sand: 0, directCommonCost: 25000, cogs: 0, adminExpenses: 0 },
  { id: 11, date: '2026-09-18', description: 'Office Stationary', bricks: 0, rod: 0, sand: 0, directCommonCost: 0, cogs: 0, adminExpenses: 12000 },
];

export default function AtAGlanceSummaryReport() {
  const [summaryList] = useState<SummaryItem[]>(dummySummaryData);
  const [selectedDate, setSelectedDate] = useState('September 1, 2026 - September 30, 2026');
  const [company, setCompany] = useState('Select value');
  const [project, setProject] = useState('Select Project');
  const [site, setSite] = useState('Select Site');
  const [task, setTask] = useState('Select Task');

  // Subtotals
  const totalBricks = summaryList.reduce((acc, item) => acc + item.bricks, 0);
  const totalRod = summaryList.reduce((acc, item) => acc + item.rod, 0);
  const totalSand = summaryList.reduce((acc, item) => acc + item.sand, 0);
  const totalDirectCommon = summaryList.reduce((acc, item) => acc + item.directCommonCost, 0);
  const totalCogs = summaryList.reduce((acc, item) => acc + item.cogs, 0);
  const totalAdmin = summaryList.reduce((acc, item) => acc + item.adminExpenses, 0);

  // Category Totals
  const materialTotal = totalBricks + totalRod + totalSand;
  const expenseTotal = totalCogs + totalAdmin; // Or including direct common if applicable
  const grandTotal = materialTotal + totalDirectCommon + expenseTotal;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Project</span> &gt; <span className="text-slate-500">At a Glance Project Summary Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">At a Glance Project Summary Report</h1>
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

      {/* Export Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => alert('Exported to PDF!')}
          className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
        >
          <FileDown size={14} /> PDF
        </button>
        <button 
          onClick={() => alert('Exported to Excel!')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
        >
          <FileSpreadsheet size={14} /> Excel
        </button>
      </div>

      {/* Main Table with Multi-level Header */}
      <div className="bg-white border border-slate-300 shadow-sm overflow-x-auto rounded-t-lg">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            {/* Top Level Group Header */}
            <tr className="text-white text-xs font-bold text-center">
              <th className="bg-purple-600 py-2.5 px-2 border-r border-purple-500 w-12" rowSpan={2}>SL</th>
              <th className="bg-blue-600 py-2.5 px-3 border-r border-blue-500 w-28" rowSpan={2}>Date</th>
              <th className="bg-blue-700 py-2.5 px-4 border-r border-blue-600 w-64" rowSpan={2}>Description</th>
              <th className="bg-red-600 py-2 px-2 border-r border-red-500" colSpan={3}>Material</th>
              <th className="bg-purple-500 py-2.5 px-2 border-r border-purple-400" rowSpan={2}>Direct Common Cost</th>
              <th className="bg-emerald-600 py-2 px-2" colSpan={2}>Expense</th>
            </tr>
            {/* Second Level Sub-Header */}
            <tr className="text-white text-[11px] font-semibold text-center">
              <th className="bg-red-700 py-2 px-2 border-r border-red-600">Bricks</th>
              <th className="bg-red-700 py-2 px-2 border-r border-red-600">Rod</th>
              <th className="bg-red-700 py-2 px-2 border-r border-red-600">Sand</th>
              <th className="bg-emerald-700 py-2 px-2 border-r border-emerald-600">Cost of Goods Sold (COGS)</th>
              <th className="bg-purple-600 py-2 px-2">Admistrative Expences</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {summaryList.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-2 text-center font-medium border-r border-slate-200">{index + 1}.</td>
                <td className="py-2.5 px-3 whitespace-nowrap border-r border-slate-200">{item.date}</td>
                <td className="py-2.5 px-4 border-r border-slate-200">{item.description}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-200">{item.bricks ? item.bricks.toLocaleString() : ''}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-200">{item.rod ? item.rod.toLocaleString() : ''}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-200">{item.sand ? item.sand.toLocaleString() : ''}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-200">{item.directCommonCost ? item.directCommonCost.toLocaleString() : ''}</td>
                <td className="py-2.5 px-2 text-right border-r border-slate-200">{item.cogs ? item.cogs.toLocaleString() : ''}</td>
                <td className="py-2.5 px-2 text-right">{item.adminExpenses ? item.adminExpenses.toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Calculation Footer Rows */}
      <div className="bg-slate-100 border-x border-b border-slate-300 text-xs font-semibold text-slate-800 rounded-b-lg overflow-x-auto">
        
        {/* Sub total row */}
        <div className="flex justify-between items-center py-2 px-4 border-b border-slate-200 min-w-[1200px]">
          <div className="w-1/2 text-right font-bold pr-12">Sub total :</div>
          <div className="grid grid-cols-6 w-1/2 text-right pr-4">
            <div>{totalBricks.toLocaleString()}</div>
            <div>{totalRod.toLocaleString()}</div>
            <div>{totalSand.toLocaleString()}</div>
            <div>{totalDirectCommon.toLocaleString()}</div>
            <div>{totalCogs.toLocaleString()}</div>
            <div>{totalAdmin.toLocaleString()}</div>
          </div>
        </div>

        {/* Total row */}
        <div className="flex justify-between items-center py-2 px-4 border-b border-slate-200 min-w-[1200px]">
          <div className="w-1/2 text-right font-bold pr-12">Total :</div>
          <div className="grid grid-cols-2 w-1/2 text-right pr-4">
            <div>{materialTotal.toLocaleString()}</div>
            <div>{expenseTotal.toLocaleString()}</div>
          </div>
        </div>

        {/* Grand Total row */}
        <div className="flex justify-between items-center py-2.5 px-4 min-w-[1200px] bg-slate-200 font-bold">
          <div className="w-1/2 text-right pr-12">Grand Total :</div>
          <div className="w-1/2 text-right pr-4 text-purple-700 text-sm">
            {grandTotal.toLocaleString()}
          </div>
        </div>

      </div>

    </div>
  );
}