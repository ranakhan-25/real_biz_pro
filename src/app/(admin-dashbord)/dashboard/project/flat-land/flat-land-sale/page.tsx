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
  X
} from 'lucide-react';

interface SaleItem {
  id: number;
  date: string;
  code: string;
  bookingNo: string;
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
  attachment: string;
}

const dummySales: SaleItem[] = [
  {
    id: 1,
    date: '2026-09-12',
    code: 'SALE-94812',
    bookingNo: 'BKG-5541',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'A-3',
    customerName: 'Md. Rahim Mia',
    rate: 6500,
    otherCost: 25000,
    parking: 300000,
    utilityCharge: 150000,
    discount: 50000,
    subtotal: 6500000,
    grandTotal: 6925000,
    paid: 2000000,
    due: 4925000,
    salesBy: 'Tazmul Reza',
    attachment: 'file.pdf'
  },
  {
    id: 2,
    date: '2026-09-10',
    code: 'SALE-94813',
    bookingNo: 'BKG-5542',
    project: 'Lake Garden',
    flatPlotNo: 'C-9',
    customerName: 'Nasir Uddin',
    rate: 7000,
    otherCost: 30000,
    parking: 350000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 7000000,
    grandTotal: 7580000,
    paid: 3000000,
    due: 4580000,
    salesBy: 'Mohin Uddin',
    attachment: 'file.pdf'
  },
  {
    id: 3,
    date: '2026-09-08',
    code: 'SALE-94814',
    bookingNo: 'BKG-5543',
    project: 'Estern 19',
    flatPlotNo: 'B-2',
    customerName: 'Sumaiya Akter',
    rate: 5500,
    otherCost: 15000,
    parking: 250000,
    utilityCharge: 100000,
    discount: 25000,
    subtotal: 5500000,
    grandTotal: 5840000,
    paid: 1500000,
    due: 4340000,
    salesBy: 'Rifat Hosain',
    attachment: 'file.pdf'
  },
  {
    id: 4,
    date: '2026-09-05',
    code: 'SALE-94815',
    bookingNo: 'BKG-5544',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F-4',
    customerName: 'Kamal Hossain',
    rate: 8000,
    otherCost: 40000,
    parking: 400000,
    utilityCharge: 250000,
    discount: 100000,
    subtotal: 8000000,
    grandTotal: 8590000,
    paid: 4000000,
    due: 4590000,
    salesBy: 'Tazmul Reza',
    attachment: 'file.pdf'
  }
];

export default function FlatLandSaleList() {
  const [salesList] = useState<SaleItem[]>(dummySales);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('1 September, 2026 - 30 September, 2026');
  const [salesPerson, setSalesPerson] = useState('Select value');
  const [team, setTeam] = useState('Select value');
  const [project, setProject] = useState('Select Project');
  const [customerName, setCustomerName] = useState('Select value');
  
  // Form Modal State for Add/Action
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('Add New Flat/Land Sale');

  const handleOpenForm = (title = 'Add New Flat/Land Sale') => {
    setFormTitle(title);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
            <span>Home</span> &gt; <span>Flat/Land</span> &gt; <span className="text-slate-500">Flat/Land Sale List</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Flat/Land Sale List</h1>
        </div>
        <button 
          onClick={() => handleOpenForm('Add New Flat/Land Sale')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition"
        >
          <Plus size={16} /> +New Flat/Land Sale
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Customer Name</label>
          <select 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Md. Rahim Mia</option>
            <option>Nasir Uddin</option>
            <option>Sumaiya Akter</option>
            <option>Kamal Hossain</option>
          </select>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border-t border-x border-slate-200 rounded-t-lg gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-600">Search:</span>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-white border border-slate-200 rounded-b-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Code</th>
              <th className="py-3 px-3">Booking No</th>
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
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {salesList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.date}</td>
                <td className="py-3 px-3 font-medium text-purple-600">{item.code}</td>
                <td className="py-3 px-3 font-medium text-slate-600">{item.bookingNo}</td>
                <td className="py-3 px-3">{item.project}</td>
                <td className="py-3 px-3 font-semibold">{item.flatPlotNo}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.customerName}</td>
                <td className="py-3 px-3">{item.rate.toLocaleString()}</td>
                <td className="py-3 px-3">{item.otherCost.toLocaleString()}</td>
                <td className="py-3 px-3">{item.parking.toLocaleString()}</td>
                <td className="py-3 px-3">{item.utilityCharge.toLocaleString()}</td>
                <td className="py-3 px-3">{item.discount.toLocaleString()}</td>
                <td className="py-3 px-3">{item.subtotal.toLocaleString()}</td>
                <td className="py-3 px-3 font-bold">{item.grandTotal.toLocaleString()}</td>
                <td className="py-3 px-3 text-green-600 font-semibold">{item.paid.toLocaleString()}</td>
                <td className="py-3 px-3 text-red-600 font-semibold">{item.due.toLocaleString()}</td>
                <td className="py-3 px-3 whitespace-nowrap">{item.salesBy}</td>
                <td className="py-3 px-3 text-purple-600 underline cursor-pointer">{item.attachment}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center justify-center gap-1">
                    <button 
                      onClick={() => handleOpenForm('Edit Flat/Land Sale')}
                      className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" 
                      title="Edit"
                    >
                      <FileEdit size={13} />
                    </button>
                    <button 
                      onClick={() => handleOpenForm('Clone Sale Offer')}
                      className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" 
                      title="Copy"
                    >
                      <Copy size={13} />
                    </button>
                    <button 
                      onClick={() => handleOpenForm('View Details')}
                      className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded shadow-sm transition" 
                      title="Document"
                    >
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
        <div>Showing 1 to {salesList.length} of {salesList.length} entries</div>
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

      {/* Action / Add Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-base">{formTitle}</h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-white hover:bg-purple-700 p-1 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Project</option>
                  <option>Sheba Eyecon Tower</option>
                  <option>Lake Garden</option>
                  <option>Estern 19</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Booking No *</label>
                <input type="text" placeholder="Enter Booking No" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Name *</label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Customer</option>
                  <option>Md. Rahim Mia</option>
                  <option>Nasir Uddin</option>
                  <option>Sumaiya Akter</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Flat / Plot No *</label>
                <input type="text" placeholder="e.g. A-3" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rate *</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Other Cost</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Parking Charge</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Utility Charge</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Discount</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grand Total</label>
                <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-md p-2 bg-slate-100 font-bold" readOnly />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Sales By *</label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Person</option>
                  <option>Tazmul Reza</option>
                  <option>Mohin Uddin</option>
                  <option>Rifat Hosain</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment</label>
                <input type="file" className="w-full border border-slate-300 rounded-md p-1.5 text-xs bg-white" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-3 flex justify-end gap-2 border-t border-slate-200">
              <button 
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Form Submitted Successfully!');
                  setIsFormOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-xs font-medium hover:bg-purple-700 transition"
              >
                Save Sale
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}