'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar,
  FileSpreadsheet,
  FileDown
} from 'lucide-react';

interface AgingItem {
  id: number;
  customer: string;
  invoiceNo: string;
  invoiceDate: string;
  amount: number;
  d0_30: number;
  d31_60: number;
  d61_90: number;
  d91_120: number;
  d120_plus: number;
  note: string;
}

const dummyAgingData: AgingItem[] = [
  { id: 1, customer: '', invoiceNo: '', invoiceDate: '', amount: 0, d0_30: 3278166.66, d31_60: 3278166.66, d61_90: 3278166.66, d91_120: 964166.66, d120_plus: 12341333.36, note: '' },
  { id: 2, customer: 'Abul', invoiceNo: 'Booking-1015817', invoiceDate: '2026-08-24', amount: 9680000, d0_30: 0, d31_60: 1066666.66, d61_90: 1066666.66, d91_120: 1066666.66, d120_plus: 6400000.02, note: '' },
  { id: 3, customer: 'Abc', invoiceNo: 'Sale1750755', invoiceDate: '2026-08-24', amount: 15340000, d0_30: 277916.67, d31_60: 277916.67, d61_90: 277916.67, d91_120: 277916.67, d120_plus: 12228333.48, note: '' },
  { id: 4, customer: 'Mr. Raju raz', invoiceNo: 'Booking-1468040', invoiceDate: '2026-08-30', amount: 84200000, d0_30: 28066666.66, d31_60: 28066666.66, d61_90: 28066666.68, d91_120: 0, d120_plus: 0, note: '' },
  { id: 5, customer: 'Sagor kumar', invoiceNo: 'Booking-2902887', invoiceDate: '2026-09-07', amount: 11770000, d0_30: 964166.66, d31_60: 964166.66, d61_90: 964166.66, d91_120: 964166.66, d120_plus: 7713333.36, note: '' },
  { id: 6, customer: 'Sagor kumar', invoiceNo: 'Booking-8181711', invoiceDate: '2026-09-13', amount: 10955000, d0_30: 290416.66, d31_60: 0, d61_90: 290416.66, d91_120: 290416.66, d120_plus: 9583750.02, note: '' },
  { id: 7, customer: 'Nasir Uddin', invoiceNo: 'Booking-4451201', invoiceDate: '2026-08-15', amount: 12500000, d0_30: 1200000.00, d31_60: 1500000.00, d61_90: 2000000.00, d91_120: 800000.00, d120_plus: 7000000.00, note: 'Pending approval' },
  { id: 8, customer: 'Sumaiya Akter', invoiceNo: 'Sale9982314', invoiceDate: '2026-08-10', amount: 9800000, d0_30: 800000.00, d31_60: 1000000.00, d61_90: 1000000.00, d91_120: 1000000.00, d120_plus: 6000000.00, note: '' },
  { id: 9, customer: 'Kamal Hossain', invoiceNo: 'Booking-3321455', invoiceDate: '2026-07-28', amount: 14200000, d0_30: 2200000.00, d31_60: 2000000.00, d61_90: 1500000.00, d91_120: 1000000.00, d120_plus: 7500000.00, note: 'First installment paid' },
  { id: 10, customer: 'Tanvir Ahmed', invoiceNo: 'Sale5567812', invoiceDate: '2026-07-20', amount: 8900000, d0_30: 900000.00, d31_60: 900000.00, d61_90: 800000.00, d91_120: 800000.00, d120_plus: 5500000.00, note: '' }
];

export default function AgingReport() {
  const [agingList] = useState<AgingItem[]>(dummyAgingData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('13/09/2026');
  const [company, setCompany] = useState('Select value');
  const [project, setProject] = useState('Select value');
  const [site, setSite] = useState('Select Site');
  const [salesBy, setSalesBy] = useState('Select value');
  const [team, setTeam] = useState('Select value');
  const [entriesCount, setEntriesCount] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  // Grand Total calculations
  const totalAmount = agingList.reduce((acc, item) => acc + item.amount, 0);
  const totalD0_30 = agingList.reduce((acc, item) => acc + item.d0_30, 0);
  const totalD31_60 = agingList.reduce((acc, item) => acc + item.d31_60, 0);
  const totalD61_90 = agingList.reduce((acc, item) => acc + item.d61_90, 0);
  const totalD91_120 = agingList.reduce((acc, item) => acc + item.d91_120, 0);
  const totalD120_plus = agingList.reduce((acc, item) => acc + item.d120_plus, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Aging Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Aging Report</h1>
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
          <label className="block text-xs font-semibold text-slate-600 mb-1">Project</label>
          <select 
            value={project} 
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
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
          <label className="block text-xs font-semibold text-slate-600 mb-1">Sales By</label>
          <select 
            value={salesBy} 
            onChange={(e) => setSalesBy(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Tazmul Reza</option>
            <option>Mohin Uddin</option>
          </select>
        </div>
      </div>

      {/* Team Filter Row */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full sm:w-1/5 mb-6">
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
        <table className="w-full text-left border-collapse min-w-[1300px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Invoice No</th>
              <th className="py-3 px-3">Invoice Date</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">0-30 Days</th>
              <th className="py-3 px-3">31-60 Days</th>
              <th className="py-3 px-3">61-90 Days</th>
              <th className="py-3 px-3">91-120 Days</th>
              <th className="py-3 px-3">120+ Days</th>
              <th className="py-3 px-3">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {agingList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3 whitespace-nowrap font-medium">{item.customer}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.invoiceNo}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.invoiceDate}</td>
                <td className="py-3 px-3 font-medium">{item.amount ? item.amount.toFixed(2) : ''}</td>
                <td className="py-3 px-3">{item.d0_30.toFixed(2)}</td>
                <td className="py-3 px-3">{item.d31_60.toFixed(2)}</td>
                <td className="py-3 px-3">{item.d61_90.toFixed(2)}</td>
                <td className="py-3 px-3">{item.d91_120.toFixed(2)}</td>
                <td className="py-3 px-3">{item.d120_plus.toFixed(2)}</td>
                <td className="py-3 px-3">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total Row */}
      <div className="bg-white border-x border-b border-slate-200 px-4 py-3 text-xs font-bold text-slate-900 rounded-b-lg overflow-x-auto">
        <div className="grid grid-cols-11 gap-2 min-w-[1300px] px-2 items-center">
          <div className="col-span-4 text-right pr-6 text-purple-700 uppercase">Grand Total:</div>
          <div>{totalAmount.toFixed(2)}</div>
          <div>{totalD0_30.toFixed(2)}</div>
          <div>{totalD31_60.toFixed(2)}</div>
          <div>{totalD61_90.toFixed(2)}</div>
          <div>{totalD91_120.toFixed(2)}</div>
          <div>{totalD120_plus.toFixed(2)}</div>
          <div></div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {agingList.length} of {agingList.length} entries</div>
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