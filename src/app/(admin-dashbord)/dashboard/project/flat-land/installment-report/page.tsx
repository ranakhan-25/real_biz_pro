'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar,
  Check
} from 'lucide-react';

interface InstallmentItem {
  id: number;
  project: string;
  flatLand: string;
  customerName: string;
  totalValue: number;
  paid: number;
  due: number;
  installmentDate: string;
  installmentAmount: number;
  recovered: number;
  installmentDue: number;
  salesBy: string;
}

const dummyInstallmentData: InstallmentItem[] = [
  { id: 1, project: 'Sheba Eyecon Tower', flatLand: 'F 3', customerName: 'Sagor kumar', totalValue: 10925000, paid: 122320, due: 10802680, installmentDate: '2026-09-03', installmentAmount: 10802680, recovered: 0, installmentDue: 10802680, salesBy: 'Tazmul Reza' },
  { id: 2, project: 'Lake Garden', flatLand: 'A!', customerName: 'Mr. Raju raz', totalValue: 84200000, paid: 28066666.66, due: 56133333.34, installmentDate: '2026-09-30', installmentAmount: 28066666.66, recovered: 28066666.66, installmentDue: 0, salesBy: 'Mohin Uddin' },
  { id: 3, project: 'Lake Garden', flatLand: 'C-10', customerName: 'Abc', totalValue: 15340000, paid: 2000000, due: 13340000, installmentDate: '2026-09-24', installmentAmount: 277916.67, recovered: 0, installmentDue: 277916.67, salesBy: 'Rifat Hosain' },
  { id: 4, project: 'Estern 19', flatLand: 'B-2', customerName: 'Nasir Uddin', totalValue: 12500000, paid: 2500000, due: 10000000, installmentDate: '2026-10-05', installmentAmount: 1250000, recovered: 500000, installmentDue: 750000, salesBy: 'Tazmul Reza' },
  { id: 5, project: 'Sheba Eyecon Tower', flatLand: 'A-4', customerName: 'Sumaiya Akter', totalValue: 9800000, paid: 1800000, due: 8000000, installmentDate: '2026-10-10', installmentAmount: 980000, recovered: 200000, installmentDue: 780000, salesBy: 'Mohin Uddin' },
  { id: 6, project: 'Lake Garden', flatLand: 'D-5', customerName: 'Kamal Hossain', totalValue: 14200000, paid: 4200000, due: 10000000, installmentDate: '2026-10-15', installmentAmount: 1420000, recovered: 1420000, installmentDue: 0, salesBy: 'Rifat Hosain' },
  { id: 7, project: 'Estern 19', flatLand: 'C-1', customerName: 'Tanvir Ahmed', totalValue: 8900000, paid: 1900000, due: 7000000, installmentDate: '2026-10-20', installmentAmount: 890000, recovered: 0, installmentDue: 890000, salesBy: 'Tazmul Reza' },
  { id: 8, project: 'Sheba Eyecon Tower', flatLand: 'F 5', customerName: 'Farhan Rahman', totalValue: 11200000, paid: 3200000, due: 8000000, installmentDate: '2026-10-25', installmentAmount: 1120000, recovered: 500000, installmentDue: 620000, salesBy: 'Mohin Uddin' },
  { id: 9, project: 'Lake Garden', flatLand: 'B-1', customerName: 'Zubayer Ahmed', totalValue: 9500000, paid: 1500000, due: 8000000, installmentDate: '2026-11-01', installmentAmount: 950000, recovered: 0, installmentDue: 950000, salesBy: 'Rifat Hosain' },
  { id: 10, project: 'Estern 19', flatLand: 'A-2', customerName: 'Nusrat Jahan', totalValue: 7800000, paid: 1800000, due: 6000000, installmentDate: '2026-11-05', installmentAmount: 780000, recovered: 200000, installmentDue: 580000, salesBy: 'Tazmul Reza' }
];

export default function InstallmentReport() {
  const [installmentList] = useState<InstallmentItem[]>(dummyInstallmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('1 September, 2026 - 30 September, 2026');
  const [salesBy, setSalesBy] = useState('Select value');
  const [team, setTeam] = useState('Select value');
  const [project, setProject] = useState('Select value');
  const [entriesCount, setEntriesCount] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Installment Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Installment Report</h1>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <label className="block text-xs font-semibold text-slate-600 mb-1">Sales By</label>
          <select 
            value={salesBy} 
            onChange={(e) => setSalesBy(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Tazmul Reza</option>
            <option>Mohin Uddin</option>
            <option>Rifat Hosain</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Team</label>
          <select 
            value={team} 
            onChange={(e) => setTeam(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Team Alpha</option>
            <option>Team Beta</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Project</label>
          <select 
            value={project} 
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Sheba Eyecon Tower</option>
            <option>Lake Garden</option>
            <option>Estern 19</option>
          </select>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border-t border-x border-slate-200 rounded-t-lg gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
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
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Flat/Land</th>
              <th className="py-3 px-3">Customer Name</th>
              <th className="py-3 px-3">Total Value</th>
              <th className="py-3 px-3">Paid</th>
              <th className="py-3 px-3">Due</th>
              <th className="py-3 px-3">Installment Date</th>
              <th className="py-3 px-3">Installment Amount</th>
              <th className="py-3 px-3">Recovered</th>
              <th className="py-3 px-3">Installment Due</th>
              <th className="py-3 px-3">Sales By</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {installmentList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3">{item.project}</td>
                <td className="py-3 px-3 font-semibold text-purple-600">{item.flatLand}</td>
                <td className="py-3 px-3 whitespace-nowrap font-medium">{item.customerName}</td>
                <td className="py-3 px-3">{item.totalValue.toLocaleString()}</td>
                <td className="py-3 px-3 text-emerald-600 font-medium">{item.paid.toLocaleString()}</td>
                <td className="py-3 px-3 text-rose-600 font-medium">{item.due.toLocaleString()}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.installmentDate}</td>
                <td className="py-3 px-3">{item.installmentAmount.toLocaleString()}</td>
                <td className="py-3 px-3">{item.recovered.toLocaleString()}</td>
                <td className="py-3 px-3">{item.installmentDue.toLocaleString()}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.salesBy}</td>
                <td className="py-3 px-3 text-center">
                  <button 
                    onClick={() => alert(`Action clicked for ID: ${item.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-1.5 rounded shadow-sm transition"
                  >
                    <Check size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {installmentList.length} of {installmentList.length} entries</div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-slate-300'}`}
          >
            1
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 1))}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}