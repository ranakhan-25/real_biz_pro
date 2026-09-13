'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  FileSpreadsheet,
  FileDown,
  X
} from 'lucide-react';

interface PlotDistributionItem {
  id: number;
  customerCode: string;
  customerName: string;
  bookingDate: string;
  referenceName: string;
  blockName: string;
  roadNo: string;
  roadSize: string;
  plotNo: string;
  plotLocation: string;
  landArea: number;
  landValue: number;
  bookingMoney: number;
  downPayment: number;
  modeOfPayment: string;
  noOfInstallment: string;
}

const dummyPlotData: PlotDistributionItem[] = [
  {
    id: 1,
    customerCode: 'CUS7515110',
    customerName: 'Sagor kumar',
    bookingDate: '03 Sept 2026',
    referenceName: '-',
    blockName: 'B',
    roadNo: '3/A',
    roadSize: '-',
    plotNo: '2',
    plotLocation: '-',
    landArea: 8,
    landValue: 0,
    bookingMoney: 0,
    downPayment: 0,
    modeOfPayment: 'At a time',
    noOfInstallment: 'At a time'
  },
  {
    id: 2,
    customerCode: 'CUS7515110',
    customerName: 'Sagor kumar',
    bookingDate: '02 Sept 2026',
    referenceName: '-',
    blockName: 'A',
    roadNo: '2/A',
    roadSize: '-',
    plotNo: '56',
    plotLocation: 'Hasnabad, Riverview',
    landArea: 5,
    landValue: 0,
    bookingMoney: 0,
    downPayment: 0,
    modeOfPayment: 'At a time',
    noOfInstallment: 'At a time'
  },
  {
    id: 3,
    customerCode: 'CUS7515111',
    customerName: 'Mr. Raju raz',
    bookingDate: '01 Sept 2026',
    referenceName: 'Broker A',
    blockName: 'C',
    roadNo: '1/B',
    roadSize: '30ft',
    plotNo: '12',
    plotLocation: 'Uttara Sector 1',
    landArea: 3,
    landValue: 4500000,
    bookingMoney: 100000,
    downPayment: 500000,
    modeOfPayment: 'Installment',
    noOfInstallment: '12 Months'
  },
  {
    id: 4,
    customerCode: 'CUS7515112',
    customerName: 'Nasir Uddin',
    bookingDate: '30 Aug 2026',
    referenceName: '-',
    blockName: 'D',
    roadNo: '4/C',
    roadSize: '20ft',
    plotNo: '88',
    plotLocation: 'Bashundhara R/A',
    landArea: 4,
    landValue: 6000000,
    bookingMoney: 200000,
    downPayment: 800000,
    modeOfPayment: 'Installment',
    noOfInstallment: '24 Months'
  },
  {
    id: 5,
    customerCode: 'CUS7515113',
    customerName: 'Sumaiya Akter',
    bookingDate: '28 Aug 2026',
    referenceName: 'Direct',
    blockName: 'A',
    roadNo: '5/A',
    roadSize: '40ft',
    plotNo: '104',
    plotLocation: 'Purbachal Link',
    landArea: 5,
    landValue: 7500000,
    bookingMoney: 150000,
    downPayment: 1000000,
    modeOfPayment: 'Installment',
    noOfInstallment: '36 Months'
  },
  {
    id: 6,
    customerCode: 'CUS7515114',
    customerName: 'Kamal Hossain',
    bookingDate: '25 Aug 2026',
    referenceName: 'Broker B',
    blockName: 'B',
    roadNo: '2/B',
    roadSize: '25ft',
    plotNo: '45',
    plotLocation: 'Keraniganj',
    landArea: 6,
    landValue: 3600000,
    bookingMoney: 50000,
    downPayment: 300000,
    modeOfPayment: 'Installment',
    noOfInstallment: '18 Months'
  },
  {
    id: 7,
    customerCode: 'CUS7515115',
    customerName: 'Tanvir Ahmed',
    bookingDate: '22 Aug 2026',
    referenceName: '-',
    blockName: 'C',
    roadNo: '6/A',
    roadSize: '30ft',
    plotNo: '9',
    plotLocation: 'Savar Model Town',
    landArea: 3,
    landValue: 2700000,
    bookingMoney: 100000,
    downPayment: 400000,
    modeOfPayment: 'At a time',
    noOfInstallment: 'At a time'
  }
];

export default function PlotDistributionReport() {
  const [plotList] = useState<PlotDistributionItem[]>(dummyPlotData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('1 September, 2026 - 30 September, 2026');
  const [salesPerson, setSalesPerson] = useState('Select value');
  const [project, setProject] = useState('Select value');
  const [type, setType] = useState('Booking');
  const [entriesCount, setEntriesCount] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
          <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Plot Distribution Report</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Plot Distribution Report</h1>
      </div>

      {/* Filter Section matching the image */}
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

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Type</label>
          <div className="relative flex items-center">
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
            >
              <option>Booking</option>
              <option>Agreement</option>
              <option>Registry</option>
            </select>
            <button 
              onClick={() => setType('')}
              className="absolute right-6 text-slate-400 hover:text-slate-600"
              title="Clear"
            >
              <X size={13} />
            </button>
          </div>
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
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto rounded-b-lg">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Customer Code</th>
              <th className="py-3 px-3">Customer Name</th>
              <th className="py-3 px-3">Booking Date</th>
              <th className="py-3 px-3">Reference Name</th>
              <th className="py-3 px-3">Block Name</th>
              <th className="py-3 px-3">Road No</th>
              <th className="py-3 px-3">Road Size</th>
              <th className="py-3 px-3">Plot No</th>
              <th className="py-3 px-3">Plot Location</th>
              <th className="py-3 px-3">Land Area</th>
              <th className="py-3 px-3">Land Value</th>
              <th className="py-3 px-3">Booking Money</th>
              <th className="py-3 px-3">Down Payment</th>
              <th className="py-3 px-3">Mode Of Payment</th>
              <th className="py-3 px-3">No. Of Installment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {plotList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3 font-medium text-slate-600">{item.customerCode}</td>
                <td className="py-3 px-3 whitespace-nowrap font-semibold">{item.customerName}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.bookingDate}</td>
                <td className="py-3 px-3">{item.referenceName}</td>
                <td className="py-3 px-3">{item.blockName}</td>
                <td className="py-3 px-3">{item.roadNo}</td>
                <td className="py-3 px-3">{item.roadSize}</td>
                <td className="py-3 px-3 font-bold text-purple-600">{item.plotNo}</td>
                <td className="py-3 px-3">{item.plotLocation}</td>
                <td className="py-3 px-3">{item.landArea}</td>
                <td className="py-3 px-3">{item.landValue}</td>
                <td className="py-3 px-3">{item.bookingMoney}</td>
                <td className="py-3 px-3">{item.downPayment}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.modeOfPayment}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.noOfInstallment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>Showing 1 to {plotList.length} of {plotList.length} entries</div>
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