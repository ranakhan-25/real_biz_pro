'use client';

import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  FileSpreadsheet, 
  FileText, 
  Search, 
  Edit3, 
  Building2, 
  Layers, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  Maximize2
} from 'lucide-react';

interface FlatItem {
  sl: number;
  project: string;
  site: string;
  flatNo: string;
  unit: string;
  bedroom: number;
  bathroom: number;
  size: number;
  price: number;
  subtotal: number;
  parkingCost: number;
  utilityCharge: number;
  grandTotal: number;
  customer: string;
  status: string;
  drawing?: string;
  dining?: string;
  kitchen?: string;
  balcony?: string;
  parking?: string;
  basement?: string;
  facing?: string;
  amenities?: string;
}

const initialData: FlatItem[] = [
  { sl: 1, project: 'Sheba Eyecon Tower', site: 'Block A', flatNo: 'F 4', unit: 'A-1', bedroom: 3, bathroom: 2, size: 1230, price: 60, subtotal: 73800, parkingCost: 0, utilityCharge: 0, grandTotal: 73800, customer: 'Sagor kumar', status: 'Active' },
  { sl: 2, project: 'Sheba Eyecon Tower', site: 'Block A', flatNo: 'F 4', unit: 'A-2', bedroom: 3, bathroom: 2, size: 1230, price: 60, subtotal: 73800, parkingCost: 0, utilityCharge: 0, grandTotal: 73800, customer: '', status: 'Inactive' },
  { sl: 3, project: 'Sheba Eyecon Tower', site: 'Block B', flatNo: 'F 3', unit: 'B-1', bedroom: 3, bathroom: 3, size: 1150, price: 9500, subtotal: 10925000, parkingCost: 0, utilityCharge: 0, grandTotal: 10925000, customer: 'Sagor kumar', status: 'Active' },
  { sl: 4, project: 'Sheba Eyecon Tower', site: 'Block B', flatNo: 'F2', unit: 'B-2', bedroom: 4, bathroom: 3, size: 1230, price: 9000, subtotal: 11070000, parkingCost: 300000, utilityCharge: 200000, grandTotal: 11570000, customer: '', status: 'Inactive' },
  { sl: 5, project: 'Lake Garden', site: 'Phase 1', flatNo: 'E5', unit: 'E', bedroom: 3, bathroom: 3, size: 1480, price: 6000, subtotal: 8880000, parkingCost: 500000, utilityCharge: 300000, grandTotal: 9680000, customer: 'Abul', status: 'Active' },
  { sl: 6, project: 'Lake Garden', site: 'Phase 2', flatNo: 'C-9', unit: 'C', bedroom: 2, bathroom: 3, size: 1230, price: 6000, subtotal: 7380000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 8680000, customer: 'Sagor kumar', status: 'Active' },
  { sl: 7, project: 'Lake Garden', site: 'Phase 2', flatNo: 'C-9', unit: 'C', bedroom: 2, bathroom: 3, size: 1230, price: 6000, subtotal: 7380000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 8680000, customer: '', status: 'Inactive' },
  { sl: 8, project: 'Lake Garden', site: 'Phase 2', flatNo: 'C-10', unit: 'C', bedroom: 3, bathroom: 3, size: 1560, price: 9000, subtotal: 14040000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 15340000, customer: 'Abc', status: 'Active' },
  { sl: 9, project: 'Lake Garden', site: 'Phase 3', flatNo: 'A!', unit: '1', bedroom: 4, bathroom: 3, size: 1200, price: 70000, subtotal: 84000000, parkingCost: 200000, utilityCharge: 0, grandTotal: 84200000, customer: 'Mr. Raju raz', status: 'Active' },
  { sl: 10, project: 'Green Valley', site: 'Tower 1', flatNo: 'G-101', unit: 'G1', bedroom: 3, bathroom: 2, size: 1350, price: 8500, subtotal: 11475000, parkingCost: 300000, utilityCharge: 150000, grandTotal: 11925000, customer: 'Tanvir Ahmed', status: 'Active' },
];

export default function FlatManagementPage() {
  const [data, setData] = useState<FlatItem[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Modal State for Action Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FlatItem | null>(null);

  // Form State matching the reference image exactly
  const [formData, setFormData] = useState({
    project: 'Sheba Eyecon Tower',
    site: '',
    flatNo: 'F 4',
    size: 1230,
    price: 60,
    bedroom: '',
    bathroom: '',
    unit: '',
    drawing: '',
    dining: '',
    kitchen: '',
    balcony: '',
    parking: '',
    parkingCost: '',
    utilityCharge: '',
    basement: '',
    facing: '',
    amenities: '',
    status: 'Active'
  });

  // Open modal for Adding New
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      project: '',
      site: '',
      flatNo: '',
      size: 0,
      price: 0,
      bedroom: '',
      bathroom: '',
      unit: '',
      drawing: '',
      dining: '',
      kitchen: '',
      balcony: '',
      parking: '',
      parkingCost: '',
      utilityCharge: '',
      basement: '',
      facing: '',
      amenities: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  // Open modal for Editing specific row
  const handleOpenEdit = (item: FlatItem) => {
    setEditingItem(item);
    setFormData({
      project: item.project,
      site: item.site,
      flatNo: item.flatNo,
      size: item.size,
      price: item.price,
      bedroom: item.bedroom ? item.bedroom.toString() : '',
      bathroom: item.bathroom ? item.bathroom.toString() : '',
      unit: item.unit,
      drawing: item.drawing || '',
      dining: item.dining || '',
      kitchen: item.kitchen || '',
      balcony: item.balcony || '',
      parking: item.parking || '',
      parkingCost: item.parkingCost ? item.parkingCost.toString() : '',
      utilityCharge: item.utilityCharge ? item.utilityCharge.toString() : '',
      basement: item.basement || '',
      facing: item.facing || '',
      amenities: item.amenities || '',
      status: item.status
    });
    setIsModalOpen(true);
  };

  // Handle Form Submit (Add or Update)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = Number(formData.size) * Number(formData.price);
    const pCost = Number(formData.parkingCost) || 0;
    const uCharge = Number(formData.utilityCharge) || 0;
    const grandTotal = subtotal + pCost + uCharge;

    if (editingItem) {
      const updatedData = data.map(item => {
        if (item.sl === editingItem.sl) {
          return {
            ...item,
            project: formData.project,
            site: formData.site,
            flatNo: formData.flatNo,
            size: Number(formData.size),
            price: Number(formData.price),
            bedroom: Number(formData.bedroom) || 0,
            bathroom: Number(formData.bathroom) || 0,
            unit: formData.unit,
            subtotal,
            parkingCost: pCost,
            utilityCharge: uCharge,
            grandTotal,
            status: formData.status,
            drawing: formData.drawing,
            dining: formData.dining,
            kitchen: formData.kitchen,
            balcony: formData.balcony,
            parking: formData.parking,
            basement: formData.basement,
            facing: formData.facing,
            amenities: formData.amenities
          };
        }
        return item;
      });
      setData(updatedData);
    } else {
      const newItem: FlatItem = {
        sl: data.length + 1,
        project: formData.project || 'New Project',
        site: formData.site || 'Main Site',
        flatNo: formData.flatNo || 'A-1',
        unit: formData.unit,
        bedroom: Number(formData.bedroom) || 0,
        bathroom: Number(formData.bathroom) || 0,
        size: Number(formData.size),
        price: Number(formData.price),
        subtotal,
        parkingCost: pCost,
        utilityCharge: uCharge,
        grandTotal,
        customer: '',
        status: formData.status,
        drawing: formData.drawing,
        dining: formData.dining,
        kitchen: formData.kitchen,
        balcony: formData.balcony,
        parking: formData.parking,
        basement: formData.basement,
        facing: formData.facing,
        amenities: formData.amenities
      };
      setData([newItem, ...data]);
    }

    setIsModalOpen(false);
  };

  // Filter Logic
  const filteredData = data.filter(item => {
    const matchesSearch = item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.flatNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject ? item.project === selectedProject : true;
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 p-4 md:p-6 font-sans">
      
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition">
            <Home className="w-4 h-4" /> Home
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="hover:text-indigo-600 cursor-pointer transition">Flat</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Flat Management</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" /> Flat Add
          </button>
          <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Form Container */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Advanced Filter & Search</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Project</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              >
                <option value="">All Projects</option>
                <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                <option value="Lake Garden">Lake Garden</option>
                <option value="Green Valley">Green Valley</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Site</label>
            <div className="relative">
              <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              >
                <option value="">Select Site</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Phase 1">Phase 1</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Status</label>
            <div className="relative">
              <CheckCircle2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition">
            <FileSpreadsheet className="w-4 h-4" /> Excel
          </button>
          <button className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition">
            <FileText className="w-4 h-4" /> PDF
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500 pl-2 border-l border-slate-200">
            <span>Show</span>
            <select className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search entries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-3">SL</th>
                <th className="py-3.5 px-3">Project</th>
                <th className="py-3.5 px-3">Site</th>
                <th className="py-3.5 px-3">Flat/Land No</th>
                <th className="py-3.5 px-3">Unit</th>
                <th className="py-3.5 px-3">Bed</th>
                <th className="py-3.5 px-3">Bath</th>
                <th className="py-3.5 px-3">Size</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Subtotal</th>
                <th className="py-3.5 px-3">Parking</th>
                <th className="py-3.5 px-3">Utility</th>
                <th className="py-3.5 px-3">Grand Total</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/85 transition group">
                    <td className="py-3 px-3 font-medium text-slate-500">{item.sl}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{item.project}</td>
                    <td className="py-3 px-3 text-slate-600">{item.site}</td>
                    <td className="py-3 px-3 font-bold text-indigo-600">{item.flatNo}</td>
                    <td className="py-3 px-3">{item.unit || '-'}</td>
                    <td className="py-3 px-3">{item.bedroom || '-'}</td>
                    <td className="py-3 px-3">{item.bathroom || '-'}</td>
                    <td className="py-3 px-3">{item.size}</td>
                    <td className="py-3 px-3">{item.price}</td>
                    <td className="py-3 px-3 font-medium">{item.subtotal.toLocaleString()}</td>
                    <td className="py-3 px-3">{item.parkingCost ? item.parkingCost.toLocaleString() : '-'}</td>
                    <td className="py-3 px-3">{item.utilityCharge ? item.utilityCharge.toLocaleString() : '-'}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{item.grandTotal.toLocaleString()}</td>
                    <td className="py-3 px-3">{item.customer || <span className="text-slate-400 italic">No Customer</span>}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg transition shadow-sm"
                        title="Edit Flat"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={16} className="text-center py-8 text-slate-400">No data found matching your query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500">
          <div>Showing 1 to {filteredData.length} of {data.length} entries</div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Previous</button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

      {/* FIXED ACTION FORM MODAL (Reduced height and scrollable) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <h3 className="font-bold text-sm text-slate-800">{editingItem ? 'Edit Flat' : 'Add Flat'}</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-200/60 rounded-xl transition text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form Grid (Two Columns with Scroll) */}
            <form onSubmit={handleSubmitForm} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Project */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Project<span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={formData.project}
                      onChange={(e) => setFormData({...formData, project: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                    />
                  </div>

                  {/* Site */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Site</label>
                    <select 
                      value={formData.site}
                      onChange={(e) => setFormData({...formData, site: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition text-slate-500"
                    >
                      <option value="">Select Site</option>
                      <option value="Block A">Block A</option>
                      <option value="Block B">Block B</option>
                      <option value="Phase 1">Phase 1</option>
                      <option value="Phase 2">Phase 2</option>
                    </select>
                  </div>

                  {/* Flat No */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Flat No<span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={formData.flatNo}
                      onChange={(e) => setFormData({...formData, flatNo: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                    />
                  </div>

                  {/* Size */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Size<span className="text-rose-500">*</span></label>
                    <input 
                      type="number" 
                      required
                      value={formData.size || ''}
                      onChange={(e) => setFormData({...formData, size: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Price</label>
                    <input 
                      type="number" 
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                    />
                  </div>

                  {/* Bedroom */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Bedroom</label>
                    <input 
                      type="text" 
                      placeholder="Bedroom"
                      value={formData.bedroom}
                      onChange={(e) => setFormData({...formData, bedroom: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Bathroom */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Bathroom</label>
                    <input 
                      type="text" 
                      placeholder="Bathroom"
                      value={formData.bathroom}
                      onChange={(e) => setFormData({...formData, bathroom: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Unit */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Unit</label>
                    <input 
                      type="text" 
                      placeholder="Unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Drawing */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Drawing</label>
                    <input 
                      type="text" 
                      placeholder="Drawing"
                      value={formData.drawing}
                      onChange={(e) => setFormData({...formData, drawing: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Dining */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Dining</label>
                    <input 
                      type="text" 
                      placeholder="Dining"
                      value={formData.dining}
                      onChange={(e) => setFormData({...formData, dining: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Kitchen */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Kitchen</label>
                    <input 
                      type="text" 
                      placeholder="Kitchen"
                      value={formData.kitchen}
                      onChange={(e) => setFormData({...formData, kitchen: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Balcony */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Balcony</label>
                    <input 
                      type="text" 
                      placeholder="Balcony"
                      value={formData.balcony}
                      onChange={(e) => setFormData({...formData, balcony: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Parking */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Parking</label>
                    <input 
                      type="text" 
                      placeholder="Parking"
                      value={formData.parking}
                      onChange={(e) => setFormData({...formData, parking: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Parking Cost */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Parking Cost</label>
                    <input 
                      type="text" 
                      placeholder="Parking Cost"
                      value={formData.parkingCost}
                      onChange={(e) => setFormData({...formData, parkingCost: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Utility Charge */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Utility Charge</label>
                    <input 
                      type="text" 
                      placeholder="Utility Charge"
                      value={formData.utilityCharge}
                      onChange={(e) => setFormData({...formData, utilityCharge: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Basement */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Basement</label>
                    <input 
                      type="text" 
                      placeholder="Basement"
                      value={formData.basement}
                      onChange={(e) => setFormData({...formData, basement: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Facing */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Facing</label>
                    <input 
                      type="text" 
                      placeholder="Facing"
                      value={formData.facing}
                      onChange={(e) => setFormData({...formData, facing: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition placeholder:text-slate-400"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition text-slate-700"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-medium transition shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-md shadow-indigo-500/20 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}