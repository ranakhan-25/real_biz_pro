'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  FileSpreadsheet,
  FileDown
} from 'lucide-react';

interface CollectionItem {
  id: number;
  customerName: string;
  project: string;
  flatLandNo: string;
  totalValue: number;
  totalReceive: number;
  due: number;
  dueForRecovery: number;
  recovered: number;
  salesBy: string;
}

const dummyCollections: CollectionItem[] = [
  { id: 1, customerName: 'Sagor kumar', project: 'Sheba Eyecon Tower', flatLandNo: 'F2', totalValue: 10955000.00, totalReceive: 500000.00, due: 10455000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 2, customerName: 'Sagor kumar', project: 'Sheba Eyecon Tower', flatLandNo: 'F2', totalValue: 11570000.00, totalReceive: 0.00, due: 11570000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 3, customerName: 'Sagor kumar', project: 'Sheba Eyecon Tower', flatLandNo: 'F2', totalValue: 11570000.00, totalReceive: 0.00, due: 11570000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 4, customerName: 'Sagor kumar', project: 'Sheba Eyecon Tower', flatLandNo: 'F 4', totalValue: 11770000.00, totalReceive: 200000.00, due: 11570000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 5, customerName: 'Mr. Raju raz', project: 'Sheba Eyecon Tower', flatLandNo: 'F2', totalValue: 8500000.00, totalReceive: 1500000.00, due: 7000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Mohin Uddin' },
  { id: 6, customerName: 'Nasir Uddin', project: 'Lake Garden', flatLandNo: 'C-9', totalValue: 9200000.00, totalReceive: 2200000.00, due: 7000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 7, customerName: 'Sumaiya Akter', project: 'Sheba Eyecon Tower', flatLandNo: 'F 4', totalValue: 7500000.00, totalReceive: 2500000.00, due: 5000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 8, customerName: 'Kamal Hossain', project: 'Sheba Eyecon Tower', flatLandNo: 'F 4', totalValue: 6800000.00, totalReceive: 1800000.00, due: 5000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Mohin Uddin' },
  { id: 9, customerName: 'Tanvir Ahmed', project: 'Lake Garden', flatLandNo: 'C-9', totalValue: 9400000.00, totalReceive: 3400000.00, due: 6000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Rifat Hosain' },
  { id: 10, customerName: 'Sharmin Sultana', project: 'Estern 19', flatLandNo: '2', totalValue: 5500000.00, totalReceive: 1500000.00, due: 4000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 11, customerName: 'Farhan Rahman', project: 'Sheba Eyecon Tower', flatLandNo: 'A-1', totalValue: 12000000.00, totalReceive: 4000000.00, due: 8000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Mohin Uddin' },
  { id: 12, customerName: 'Zubayer Ahmed', project: 'Lake Garden', flatLandNo: 'B-3', totalValue: 8800000.00, totalReceive: 2800000.00, due: 6000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Rifat Hosain' },
  { id: 13, customerName: 'Nusrat Jahan', project: 'Estern 19', flatLandNo: '5', totalValue: 6200000.00, totalReceive: 1200000.00, due: 5000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Tazmul Reza' },
  { id: 14, customerName: 'Ashikur Zaman', project: 'Sheba Eyecon Tower', flatLandNo: 'C-2', totalValue: 10500000.00, totalReceive: 3500000.00, due: 7000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Mohin Uddin' },
  { id: 15, customerName: 'Morshed Alam', project: 'Lake Garden', flatLandNo: 'D-1', totalValue: 9100000.00, totalReceive: 2100000.00, due: 7000000.00, dueForRecovery: 0, recovered: 0, salesBy: 'Rifat Hosain' }
];

export default function SaleCollectionReportFull() {
  const [collectionList] = useState<CollectionItem[]>(dummyCollections);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('1 September, 2026 - 30 September, 2026');
  const [salesPerson, setSalesPerson] = useState('Select value');
  const [team, setTeam] = useState('Select value');
  const [project, setProject] = useState('Select value');
  const [entriesCount, setEntriesCount] = useState('25');
  const [currentPage, setCurrentPage] = useState(1);

  const totalValueSum = collectionList.reduce((acc, item) => acc + item.totalValue, 0);
  const totalReceiveSum = collectionList.reduce((acc, item) => acc + item.totalReceive, 0);
  const totalDueSum = collectionList.reduce((acc, item) => acc + item.due, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Sale Collection Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sale Collection Report</h1>
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
            value={salesPerson} 
            onChange={(e) => setSalesPerson(e.target.value)}
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
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Customer Name</th>
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Flat/Land No</th>
              <th className="py-3 px-3">Total Value</th>
              <th className="py-3 px-3">Total Receive</th>
              <th className="py-3 px-3">Due</th>
              <th className="py-3 px-3">Due For Recovery</th>
              <th className="py-3 px-3">Recovered</th>
              <th className="py-3 px-3">Sales By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {collectionList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3 whitespace-nowrap font-medium">{item.customerName}</td>
                <td className="py-3 px-3">{item.project}</td>
                <td className="py-3 px-3 font-semibold text-purple-600">{item.flatLandNo}</td>
                <td className="py-3 px-3">{item.totalValue.toFixed(2)}</td>
                <td className="py-3 px-3 text-emerald-600 font-medium">{item.totalReceive.toFixed(2)}</td>
                <td className="py-3 px-3 text-rose-600 font-medium">{item.due.toFixed(2)}</td>
                <td className="py-3 px-3">{item.dueForRecovery}</td>
                <td className="py-3 px-3">{item.recovered}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.salesBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Row */}
      <div className="bg-white border-x border-b border-slate-200 px-4 py-3 text-xs font-bold text-slate-900 rounded-b-lg overflow-x-auto">
        <div className="grid grid-cols-10 gap-2 min-w-[1100px] px-2">
          <div className="col-span-4 text-right pr-12 text-purple-700">TOTAL:</div>
          <div>{totalValueSum.toFixed(2)}</div>
          <div className="text-emerald-600">{totalReceiveSum.toFixed(2)}</div>
          <div className="text-rose-600">{totalDueSum.toFixed(2)}</div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {collectionList.length} of {collectionList.length} entries</div>
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
            onClick={() => setCurrentPage(2)}
            className={`px-3 py-1 border rounded ${currentPage === 2 ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-slate-300'}`}
          >
            2
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 2))}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}