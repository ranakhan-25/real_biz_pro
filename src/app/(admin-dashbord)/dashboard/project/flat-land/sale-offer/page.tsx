'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  FileEdit, 
  Copy, 
  Trash2, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Filter
} from 'lucide-react';

interface OfferItem {
  id: number;
  date: string;
  code: string;
  project: string;
  flatPlotNo: string;
  customerName: string;
  rate: number;
  otherCost: number;
  parking: number;
  utilityCharge: number;
  discount: number;
  subtotal: number;
  grandTotal: number;
  paid: number;
  due: number;
  salesBy: string;
  approvalStatus: string;
}

const initialOffers: OfferItem[] = [
  {
    id: 1,
    date: '2026-09-12',
    code: 'SaleOffer-1074184',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F2',
    customerName: 'Sagor kumar',
    rate: 9000,
    otherCost: 0,
    parking: 300000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 11070000,
    grandTotal: 11570000,
    paid: 0,
    due: 11570000,
    salesBy: 'Tazmul Reza',
    approvalStatus: 'Approval Layer has not been set yet.'
  },
  {
    id: 2,
    date: '2026-09-10',
    code: 'SaleOffer-7981177',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F2',
    customerName: 'Sagor kumar',
    rate: 9000,
    otherCost: 0,
    parking: 300000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 11070000,
    grandTotal: 11570000,
    paid: 0,
    due: 11570000,
    salesBy: 'Tazmul Reza',
    approvalStatus: 'Approval Layer has not been set yet.'
  },
  {
    id: 3,
    date: '2026-09-03',
    code: 'SaleOffer-5154844',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F2',
    customerName: 'Mr. Raju raz',
    rate: 9000,
    otherCost: 0,
    parking: 300000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 0,
    grandTotal: 0,
    paid: 0,
    due: 0,
    salesBy: 'Mohin Uddin',
    approvalStatus: 'Approval Layer has not been set yet.'
  }
];

export default function FlatLandSaleOffer() {
  const [offers] = useState<OfferItem[]>(initialOffers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('1 September, 2026 - 30 September, 2026');
  const [salesPerson, setSalesPerson] = useState('Select value');
  const [team, setTeam] = useState('Select value');
  const [project, setProject] = useState('Select Project');
  const [entriesCount, setEntriesCount] = useState('10');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
            <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Flat/Land Sale Offer List</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Flat/Land Sale Offer List</h1>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition">
          <Plus size={16} /> +New Sale Offer
        </button>
      </div>

      {/* Filter Bar */}
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
            <option>Select Project</option>
            <option>Sheba Eyecon Tower</option>
            <option>Lake Garden</option>
            <option>Estern 19</option>
          </select>
        </div>
      </div>

      {/* Table Controls */}
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

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white border border-slate-200 rounded-b-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Code</th>
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Flat/Plot No</th>
              <th className="py-3 px-3">Customer Name</th>
              <th className="py-3 px-3">Rate</th>
              <th className="py-3 px-3">Other Cost</th>
              <th className="py-3 px-3">Parking</th>
              <th className="py-3 px-3">Utility Charge</th>
              <th className="py-3 px-3">Discount</th>
              <th className="py-3 px-3">Subtotal</th>
              <th className="py-3 px-3">Grand Total</th>
              <th className="py-3 px-3">Paid</th>
              <th className="py-3 px-3">Due</th>
              <th className="py-3 px-3">Sales By</th>
              <th className="py-3 px-3">Attachment</th>
              <th className="py-3 px-3">Approve</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{offer.id}</td>
                <td className="py-3 px-3 whitespace-nowrap">{offer.date}</td>
                <td className="py-3 px-3 font-medium text-purple-600">{offer.code}</td>
                <td className="py-3 px-3">{offer.project}</td>
                <td className="py-3 px-3 font-semibold">{offer.flatPlotNo}</td>
                <td className="py-3 px-3 whitespace-nowrap">{offer.customerName}</td>
                <td className="py-3 px-3">{offer.rate.toLocaleString()}</td>
                <td className="py-3 px-3">{offer.otherCost}</td>
                <td className="py-3 px-3">{offer.parking.toLocaleString()}</td>
                <td className="py-3 px-3">{offer.utilityCharge.toLocaleString()}</td>
                <td className="py-3 px-3">{offer.discount}</td>
                <td className="py-3 px-3">{offer.subtotal.toLocaleString()}</td>
                <td className="py-3 px-3 font-bold">{offer.grandTotal.toLocaleString()}</td>
                <td className="py-3 px-3">{offer.paid}</td>
                <td className="py-3 px-3 text-red-600 font-semibold">{offer.due.toLocaleString()}</td>
                <td className="py-3 px-3 whitespace-nowrap">{offer.salesBy}</td>
                <td className="py-3 px-3 text-center">-</td>
                <td className="py-3 px-3 text-red-500 italic text-[11px]">{offer.approvalStatus}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" title="Edit">
                      <FileEdit size={13} />
                    </button>
                    <button className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" title="Copy">
                      <Copy size={13} />
                    </button>
                    <button className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" title="Document">
                      <FileText size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {offers.length} of {offers.length} entries</div>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50" disabled>
            <ChevronLeft size={14} />
          </button>
          <button className="px-3 py-1 bg-purple-600 text-white border border-purple-600 rounded">1</button>
          <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}