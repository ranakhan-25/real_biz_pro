'use client';

import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Maximize2,
  SlidersHorizontal,
  Calendar,
  UserCheck,
  Building,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Eye,
  Sun,
  Moon
} from 'lucide-react';

interface BookingItem {
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
  attachment: string;
  approveStatus: string[];
}

const initialBookings: BookingItem[] = [
  {
    id: 1,
    date: '2026-09-07',
    code: 'Booking-2902887',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F 4',
    customerName: 'Sagor kumar',
    rate: 9000,
    otherCost: 0,
    parking: 500000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 11070000,
    grandTotal: 11770000,
    paid: 200000,
    due: 11570000,
    salesBy: 'Tazmul Reza',
    attachment: '',
    approveStatus: ['All Approvals Completed', 'Admin']
  },
  {
    id: 2,
    date: '2026-09-03',
    code: 'Booking-9181931',
    project: 'Lake Garden',
    flatPlotNo: 'C-9',
    customerName: 'Sagor kumar',
    rate: 6000,
    otherCost: 0,
    parking: 800000,
    utilityCharge: 500000,
    discount: 0,
    subtotal: 0,
    grandTotal: 0,
    paid: 0,
    due: 0,
    salesBy: 'Tazmul Reza',
    attachment: '',
    approveStatus: ['All Approvals Completed', 'Rifat Hosain', 'Admin']
  },
  {
    id: 3,
    date: '2026-09-03',
    code: 'Booking-0847700',
    project: 'Estern 19',
    flatPlotNo: '2',
    customerName: 'Sagor kumar',
    rate: 500000,
    otherCost: 0,
    parking: 0,
    utilityCharge: 0,
    discount: 0,
    subtotal: 0,
    grandTotal: 0,
    paid: 0,
    due: 0,
    salesBy: 'Tazmul Reza',
    attachment: '',
    approveStatus: ['All Approvals Completed', 'Rifat Hosain', 'Admin']
  },
  {
    id: 4,
    date: '2026-09-03',
    code: 'Booking-693614',
    project: 'Sheba Eyecon Tower',
    flatPlotNo: 'F 3',
    customerName: 'Sagor kumar',
    rate: 9500,
    otherCost: 0,
    parking: 0,
    utilityCharge: 0,
    discount: 0,
    subtotal: 10925000,
    grandTotal: 10925000,
    paid: 122320,
    due: 10802680,
    salesBy: 'Mohin Uddin',
    attachment: '',
    approveStatus: ['All Approvals Completed', 'Admin']
  }
];

export default function FlatLandBookingPage() {
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterSalesBy, setFilterSalesBy] = useState('');

  // Theme State: Default is 'light'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals state management
  const [activeModal, setActiveModal] = useState<'none' | 'add' | 'edit' | 'transfer' | 'details'>('none');
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    project: '',
    flatPlotNo: '',
    customerName: '',
    rate: '',
    parking: '',
    utilityCharge: '',
    salesBy: ''
  });

  const [transferData, setTransferData] = useState({
    newProject: '',
    newFlat: '',
    reason: ''
  });

  const handleOpenAdd = () => {
    setFormData({ project: '', flatPlotNo: '', customerName: '', rate: '', parking: '', utilityCharge: '', salesBy: '' });
    setActiveModal('add');
  };

  const handleOpenEdit = (item: BookingItem) => {
    setSelectedBooking(item);
    setFormData({
      project: item.project,
      flatPlotNo: item.flatPlotNo,
      customerName: item.customerName,
      rate: item.rate.toString(),
      parking: item.parking.toString(),
      utilityCharge: item.utilityCharge.toString(),
      salesBy: item.salesBy
    });
    setActiveModal('edit');
  };

  const handleOpenTransfer = (item: BookingItem) => {
    setSelectedBooking(item);
    setTransferData({ newProject: '', newFlat: '', reason: '' });
    setActiveModal('transfer');
  };

  const handleOpenDetails = (item: BookingItem) => {
    setSelectedBooking(item);
    setActiveModal('details');
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(item => item.id !== id));
    }
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: BookingItem = {
      id: bookings.length + 1,
      date: new Date().toISOString().split('T')[0],
      code: `Booking-${Math.floor(100000 + Math.random() * 900000)}`,
      project: formData.project || 'Estern 19',
      flatPlotNo: formData.flatPlotNo || 'A-1',
      customerName: formData.customerName || 'Customer',
      rate: parseFloat(formData.rate) || 0,
      otherCost: 0,
      parking: parseFloat(formData.parking) || 0,
      utilityCharge: parseFloat(formData.utilityCharge) || 0,
      discount: 0,
      subtotal: 500000,
      grandTotal: 500000,
      paid: 0,
      due: 500000,
      salesBy: formData.salesBy || 'Tazmul Reza',
      attachment: '',
      approveStatus: ['Pending Approval', 'Admin']
    };
    setBookings([newBooking, ...bookings]);
    setActiveModal('none');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setBookings(bookings.map(item => item.id === selectedBooking.id ? {
      ...item,
      project: formData.project,
      flatPlotNo: formData.flatPlotNo,
      customerName: formData.customerName,
      rate: parseFloat(formData.rate) || item.rate,
      parking: parseFloat(formData.parking) || item.parking,
      utilityCharge: parseFloat(formData.utilityCharge) || item.utilityCharge,
      salesBy: formData.salesBy
    } : item));
    setActiveModal('none');
  };

  const handleSaveTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setBookings(bookings.map(item => item.id === selectedBooking.id ? {
      ...item,
      project: transferData.newProject || item.project,
      flatPlotNo: transferData.newFlat || item.flatPlotNo
    } : item));
    setActiveModal('none');
  };

  const filteredBookings = bookings.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject ? item.project === filterProject : true;
    const matchesSales = filterSalesBy ? item.salesBy === filterSalesBy : true;
    return matchesSearch && matchesProject && matchesSales;
  });

  return (
    <div className={`h-screen w-screen overflow-hidden p-3 md:p-4 font-sans flex flex-col justify-between transition-colors duration-200 select-none ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* TOP HEADER SECTION */}
      <div>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-4 py-2.5 rounded-xl border shadow-sm transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer transition">
              <Home className="w-3.5 h-3.5" /> Home
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="hover:text-indigo-500 cursor-pointer transition">Flat/Land</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Flat/Land Booking List</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>

            <button 
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-3.5 py-1.5 rounded-lg font-medium shadow-md shadow-indigo-500/20 transition transform active:scale-95 text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> New Flat/Land Booking
            </button>

            <button className={`p-1.5 rounded-lg border transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* COMPACT FILTERS */}
        <div className={`p-3 rounded-xl border mb-3 grid grid-cols-1 sm:grid-cols-4 gap-2.5 transition-colors ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-50" />
            <input 
              type="text" 
              defaultValue="1 Sept, 2026 - 30 Sept, 2026"
              className={`w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            />
          </div>

          <div className="relative">
            <UserCheck className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-50" />
            <select 
              value={filterSalesBy}
              onChange={(e) => setFilterSalesBy(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              <option value="">All Sales By</option>
              <option value="Tazmul Reza">Tazmul Reza</option>
              <option value="Mohin Uddin">Mohin Uddin</option>
            </select>
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-50" />
            <select className={`w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <option value="">All Teams</option>
              <option value="Team A">Team Alpha</option>
            </select>
          </div>

          <div className="relative">
            <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-50" />
            <select 
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              <option value="">All Projects</option>
              <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
              <option value="Lake Garden">Lake Garden</option>
              <option value="Estern 19">Estern 19</option>
            </select>
          </div>
        </div>

        {/* ENTRIES & SEARCH BAR */}
        <div className="flex items-center justify-between gap-3 mb-2 px-1">
          <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Show</span>
            <select className={`border rounded px-2 py-1 text-xs ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'}`}>
              <option value="10">10</option>
            </select>
            <span>entries</span>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 opacity-50" />
            <input 
              type="text" 
              placeholder="Search booking..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-3 py-1 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'}`}
            />
          </div>
        </div>

        {/* TABLE (NO SCROLLBAR) */}
        <div className={`rounded-xl border overflow-hidden shadow-sm transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse text-[10.5px]">
              <thead className={`uppercase font-semibold tracking-wider border-b ${isDarkMode ? 'bg-indigo-950 text-indigo-200 border-indigo-900' : 'bg-indigo-600 text-white border-indigo-700'}`}>
                <tr>
                  <th className="py-2.5 px-2">ID</th>
                  <th className="py-2.5 px-2">Date</th>
                  <th className="py-2.5 px-2">Code</th>
                  <th className="py-2.5 px-2">Project</th>
                  <th className="py-2.5 px-2">Plot/Flat</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">Rate</th>
                  <th className="py-2.5 px-2">Parking</th>
                  <th className="py-2.5 px-2">Utility</th>
                  <th className="py-2.5 px-2">Subtotal</th>
                  <th className="py-2.5 px-2">Grand Total</th>
                  <th className="py-2.5 px-2">Paid</th>
                  <th className="py-2.5 px-2">Due</th>
                  <th className="py-2.5 px-2">Sales By</th>
                  <th className="py-2.5 px-2">Approve</th>
                  <th className="py-2.5 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y whitespace-nowrap ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((item) => (
                    <tr key={item.id} className={`transition ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                      <td className="py-2 px-2 opacity-60">{item.id}</td>
                      <td className="py-2 px-2">{item.date}</td>
                      <td className="py-2 px-2 font-medium text-indigo-600 dark:text-indigo-400">{item.code}</td>
                      <td className="py-2 px-2 font-semibold">{item.project}</td>
                      <td className="py-2 px-2 text-indigo-600 dark:text-indigo-300 font-bold">{item.flatPlotNo}</td>
                      <td className="py-2 px-2">{item.customerName}</td>
                      <td className="py-2 px-2">{item.rate}</td>
                      <td className="py-2 px-2">{item.parking}</td>
                      <td className="py-2 px-2">{item.utilityCharge}</td>
                      <td className="py-2 px-2">{item.subtotal}</td>
                      <td className="py-2 px-2 font-semibold">{item.grandTotal}</td>
                      <td className="py-2 px-2 text-emerald-600 dark:text-emerald-400 font-medium">{item.paid}</td>
                      <td className="py-2 px-2 text-rose-600 dark:text-rose-400 font-medium">{item.due}</td>
                      <td className="py-2 px-2">{item.salesBy}</td>
                      <td className="py-2 px-2">
                        <div className="flex flex-col gap-0.5 text-[9px] text-emerald-600 dark:text-emerald-400">
                          {item.approveStatus.map((st, i) => (
                            <span key={i} className="flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> {st}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => handleOpenEdit(item)} className="p-1 bg-sky-500 hover:bg-sky-600 text-white rounded transition shadow-sm" title="Edit"><Edit3 className="w-3 h-3" /></button>
                          <button onClick={() => handleOpenTransfer(item)} className="p-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition shadow-sm" title="Transfer"><RefreshCw className="w-3 h-3" /></button>
                          <button onClick={() => handleOpenDetails(item)} className="p-1 bg-violet-500 hover:bg-violet-600 text-white rounded transition shadow-sm" title="Details"><FileText className="w-3 h-3" /></button>
                          <button onClick={() => alert(`Generating PDF for ${item.code}`)} className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition shadow-sm" title="PDF"><FileSpreadsheet className="w-3 h-3" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded transition shadow-sm" title="Delete"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={16} className="text-center py-8 opacity-50">No booking records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER BAR */}
      <div className={`flex items-center justify-between text-[11px] pt-2 border-t ${isDarkMode ? 'text-slate-500 border-slate-900' : 'text-slate-500 border-slate-200'}`}>
        <div>Showing 1 to {filteredBookings.length} of {bookings.length} entries</div>
        <div className="flex items-center gap-1">
          <button className={`px-2 py-1 border rounded transition ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}>Previous</button>
          <button className="px-2.5 py-1 bg-indigo-600 text-white rounded font-medium">1</button>
          <button className={`px-2 py-1 border rounded transition ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}>Next</button>
        </div>
      </div>

      {/* --- MODAL FORMS --- */}

      {/* 1. ADD / EDIT BOOKING MODAL */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${isDarkMode ? 'bg-indigo-950 border-indigo-900 text-indigo-200' : 'bg-indigo-600 text-white'}`}>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                {activeModal === 'add' ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {activeModal === 'add' ? 'New Flat/Land Booking Form' : 'Edit Booking Details'}
              </h3>
              <button onClick={() => setActiveModal('none')} className="opacity-75 hover:opacity-150">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={activeModal === 'add' ? handleSaveAdd : handleSaveEdit} className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Project*</label>
                  <select 
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  >
                    <option value="">Select Project</option>
                    <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                    <option value="Lake Garden">Lake Garden</option>
                    <option value="Estern 19">Estern 19</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Flat/Plot No*</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. F 4"
                    value={formData.flatPlotNo}
                    onChange={(e) => setFormData({...formData, flatPlotNo: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Customer Name*</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Customer Name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Rate</label>
                  <input 
                    type="number" 
                    placeholder="Rate"
                    value={formData.rate}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Parking</label>
                  <input 
                    type="number" 
                    placeholder="Parking Charge"
                    value={formData.parking}
                    onChange={(e) => setFormData({...formData, parking: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium opacity-80">Utility Charge</label>
                  <input 
                    type="number" 
                    placeholder="Utility Charge"
                    value={formData.utilityCharge}
                    onChange={(e) => setFormData({...formData, utilityCharge: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>

                <div className="space-y-1 col-span-2">
                  <label className="text-[11px] font-medium opacity-80">Sales By</label>
                  <input 
                    type="text" 
                    placeholder="Sales Person Name"
                    value={formData.salesBy}
                    onChange={(e) => setFormData({...formData, salesBy: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                  />
                </div>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button 
                  type="button" 
                  onClick={() => setActiveModal('none')}
                  className={`px-3.5 py-1.5 border rounded-lg text-xs transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-md transition"
                >
                  {activeModal === 'add' ? 'Save Booking' : 'Update Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. TRANSFER / SWITCH MODAL */}
      {activeModal === 'transfer' && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${isDarkMode ? 'bg-indigo-950 border-indigo-900 text-indigo-200' : 'bg-indigo-600 text-white'}`}>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Transfer Booking ({selectedBooking.code})
              </h3>
              <button onClick={() => setActiveModal('none')} className="opacity-75 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTransfer} className="p-5 space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium opacity-80">Target Project*</label>
                <select 
                  required
                  value={transferData.newProject}
                  onChange={(e) => setTransferData({...transferData, newProject: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                >
                  <option value="">Select New Project</option>
                  <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                  <option value="Lake Garden">Lake Garden</option>
                  <option value="Estern 19">Estern 19</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium opacity-80">New Flat/Plot No*</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. B-5"
                  value={transferData.newFlat}
                  onChange={(e) => setTransferData({...transferData, newFlat: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium opacity-80">Transfer Reason</label>
                <textarea 
                  rows={2}
                  placeholder="Reason for transfer..."
                  value={transferData.reason}
                  onChange={(e) => setTransferData({...transferData, reason: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'}`}
                />
              </div>

              <div className={`flex items-center justify-end gap-2 pt-3 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                <button type="button" onClick={() => setActiveModal('none')} className={`px-3.5 py-1.5 border rounded-lg text-xs transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow-md transition">
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DETAILS MODAL */}
      {activeModal === 'details' && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${isDarkMode ? 'bg-indigo-950 border-indigo-900 text-indigo-200' : 'bg-indigo-600 text-white'}`}>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" /> Booking Details ({selectedBooking.code})
              </h3>
              <button onClick={() => setActiveModal('none')} className="opacity-75 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div className={`grid grid-cols-2 gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div><span className="opacity-60">Booking Date:</span> <p className="font-medium">{selectedBooking.date}</p></div>
                <div><span className="opacity-60">Customer Name:</span> <p className="font-medium">{selectedBooking.customerName}</p></div>
                <div><span className="opacity-60">Project:</span> <p className="font-medium text-indigo-600 dark:text-indigo-400">{selectedBooking.project}</p></div>
                <div><span className="opacity-60">Flat/Plot No:</span> <p className="font-medium text-indigo-600 dark:text-indigo-400">{selectedBooking.flatPlotNo}</p></div>
                <div><span className="opacity-60">Grand Total:</span> <p className="font-medium">{selectedBooking.grandTotal}</p></div>
                <div><span className="opacity-60">Paid Amount:</span> <p className="font-medium text-emerald-600 dark:text-emerald-400">{selectedBooking.paid}</p></div>
                <div><span className="opacity-60">Due Amount:</span> <p className="font-medium text-rose-600 dark:text-rose-400">{selectedBooking.due}</p></div>
                <div><span className="opacity-60">Sales By:</span> <p className="font-medium">{selectedBooking.salesBy}</p></div>
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={() => setActiveModal('none')} className={`px-4 py-1.5 border rounded-lg text-xs transition ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}