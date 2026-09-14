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
  FileSpreadsheet, 
  FileText, 
  Maximize2,
  SlidersHorizontal,
  MapPin
} from 'lucide-react';

interface LandItem {
  sl: number;
  project: string;
  blockName: string;
  roadNo: string;
  site: string;
  plotNo: string;
  size: number;
  unit: string;
  price: number;
  subtotal: number;
  grandTotal: number;
  customer: string;
  status: 'Sold' | 'Unsold';
  roadSize?: string;
  plotLocation?: string;
  facing?: string;
  amenities?: string;
}

const initialLands: LandItem[] = [
  { sl: 1, project: 'Estern 19', blockName: 'B', roadNo: '3/A', site: 'North Block', plotNo: '2', size: 8, unit: 'Katha', price: 500000, subtotal: 4000000, grandTotal: 4000000, customer: 'Sagor kumar', status: 'Sold' },
  { sl: 2, project: 'Estern 19', blockName: 'B', roadNo: '3/A', site: 'North Block', plotNo: '2', size: 8, unit: 'Katha', price: 500000, subtotal: 4000000, grandTotal: 4000000, customer: '', status: 'Unsold' },
  { sl: 3, project: 'Estern 19', blockName: 'A', roadNo: '2/A', site: 'South Block', plotNo: '56', size: 5, unit: 'Katha', price: 500000, subtotal: 2500000, grandTotal: 2500000, customer: 'Sagor kumar', status: 'Sold' },
];

export default function LandListPage() {
  const [lands, setLands] = useState<LandItem[]>(initialLands);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterSite, setFilterSite] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLand, setEditingLand] = useState<LandItem | null>(null);

  // Form Fields State (Matching Image 1)
  const [formData, setFormData] = useState({
    project: '',
    blockName: '',
    roadNo: '',
    roadSize: '',
    plotLocation: '',
    site: '',
    plotNo: '',
    size: '',
    unit: '',
    price: '',
    facing: '',
    amenities: ''
  });

  const handleOpenAdd = () => {
    setEditingLand(null);
    setFormData({
      project: '',
      blockName: '',
      roadNo: '',
      roadSize: '',
      plotLocation: '',
      site: '',
      plotNo: '',
      size: '',
      unit: '',
      price: '',
      facing: '',
      amenities: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: LandItem) => {
    setEditingLand(item);
    setFormData({
      project: item.project,
      blockName: item.blockName,
      roadNo: item.roadNo,
      roadSize: item.roadSize || '',
      plotLocation: item.plotLocation || '',
      site: item.site,
      plotNo: item.plotNo,
      size: item.size.toString(),
      unit: item.unit,
      price: item.price.toString(),
      facing: item.facing || '',
      amenities: item.amenities || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (sl: number) => {
    if (confirm('Are you sure you want to delete this land entry?')) {
      setLands(lands.filter(item => item.sl !== sl));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizeNum = parseFloat(formData.size) || 0;
    const priceNum = parseFloat(formData.price) || 0;
    const sub = sizeNum * priceNum;

    if (editingLand) {
      setLands(lands.map(item => item.sl === editingLand.sl ? {
        ...item,
        project: formData.project || 'Estern 19',
        blockName: formData.blockName || 'A',
        roadNo: formData.roadNo || '1',
        site: formData.site || 'General',
        plotNo: formData.plotNo || '1',
        size: sizeNum,
        unit: formData.unit || 'Katha',
        price: priceNum,
        subtotal: sub,
        grandTotal: sub,
        roadSize: formData.roadSize,
        plotLocation: formData.plotLocation,
        facing: formData.facing,
        amenities: formData.amenities
      } : item));
    } else {
      const newItem: LandItem = {
        sl: lands.length + 1,
        project: formData.project || 'Estern 19',
        blockName: formData.blockName || 'A',
        roadNo: formData.roadNo || '1',
        site: formData.site || 'General',
        plotNo: formData.plotNo || '1',
        size: sizeNum,
        unit: formData.unit || 'Katha',
        price: priceNum,
        subtotal: sub,
        grandTotal: sub,
        customer: 'New Client',
        status: 'Unsold',
        roadSize: formData.roadSize,
        plotLocation: formData.plotLocation,
        facing: formData.facing,
        amenities: formData.amenities
      };
      setLands([newItem, ...lands]);
    }
    setIsModalOpen(false);
  };

  // Filtering Logic
  const filteredLands = lands.filter(item => {
    const matchesSearch = item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.plotNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject ? item.project === filterProject : true;
    const matchesSite = filterSite ? item.site === filterSite : true;
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    return matchesSearch && matchesProject && matchesSite && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/65 text-slate-800 p-4 md:p-6 font-sans">
      
      {/* Top Breadcrumb & Header Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition">
            <Home className="w-4 h-4" /> Home
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="hover:text-indigo-600 cursor-pointer transition">Land</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Land List</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition transform active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" /> Land Add
          </button>
          <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS FORM (Image 2 Top) */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filter Lands</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Project</label>
            <select 
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="">Select value</option>
              <option value="Estern 19">Estern 19</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Site</label>
            <select 
              value={filterSite}
              onChange={(e) => setFilterSite(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="">Select Site</option>
              <option value="North Block">North Block</option>
              <option value="South Block">South Block</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            >
              <option value="">Select Status</option>
              <option value="Sold">Sold</option>
              <option value="Unsold">Unsold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Export Buttons & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
          </button>
          <button className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition">
            <FileText className="w-3.5 h-3.5" /> PDF
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500 ml-4">
            <span>Show</span>
            <select className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium">
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>
      </div>

      {/* LAND LIST TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">SL</th>
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">Block Name</th>
                <th className="py-3 px-3">Road No.</th>
                <th className="py-3 px-3">Site</th>
                <th className="py-3 px-3">Plot No</th>
                <th className="py-3 px-3">Size</th>
                <th className="py-3 px-3">Unit</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Subtotal</th>
                <th className="py-3 px-3">Grand Total</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLands.length > 0 ? (
                filteredLands.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-medium text-slate-500">{item.sl}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{item.project}</td>
                    <td className="py-3 px-3">{item.blockName}</td>
                    <td className="py-3 px-3">{item.roadNo}</td>
                    <td className="py-3 px-3">{item.site}</td>
                    <td className="py-3 px-3 font-bold text-indigo-600">{item.plotNo}</td>
                    <td className="py-3 px-3">{item.size}</td>
                    <td className="py-3 px-3">{item.unit}</td>
                    <td className="py-3 px-3">{item.price}</td>
                    <td className="py-3 px-3">{item.subtotal}</td>
                    <td className="py-3 px-3 font-semibold">{item.grandTotal}</td>
                    <td className="py-3 px-3">{item.customer || '-'}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm ${item.status === 'Sold' ? 'bg-indigo-600' : 'bg-rose-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.sl)}
                          className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="text-center py-10 text-slate-400">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500">
          <div>Showing 1 to {filteredLands.length} of {lands.length} entries</div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Previous</button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm font-semibold">1</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

      {/* LAND ADD / EDIT MODAL FORM (Image 1 Layout) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {editingLand ? 'Edit Land Entry' : 'Land Entry Form'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Grid (Matching Image 1) */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Project */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Project*</label>
                  <select 
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  >
                    <option value="">Select One Option</option>
                    <option value="Estern 19">Estern 19</option>
                  </select>
                </div>

                {/* Block Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Block Name*</label>
                  <select 
                    required
                    value={formData.blockName}
                    onChange={(e) => setFormData({...formData, blockName: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  >
                    <option value="">Select Block</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>

                {/* Road No */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Road No.*</label>
                  <select 
                    required
                    value={formData.roadNo}
                    onChange={(e) => setFormData({...formData, roadNo: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  >
                    <option value="">Select Road</option>
                    <option value="3/A">3/A</option>
                    <option value="2/A">2/A</option>
                  </select>
                </div>

                {/* Road Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Road Size</label>
                  <input 
                    type="text" 
                    placeholder="Road Size" 
                    value={formData.roadSize}
                    onChange={(e) => setFormData({...formData, roadSize: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Plot Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Plot Location</label>
                  <input 
                    type="text" 
                    placeholder="Plot Location" 
                    value={formData.plotLocation}
                    onChange={(e) => setFormData({...formData, plotLocation: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Site */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Site</label>
                  <select 
                    value={formData.site}
                    onChange={(e) => setFormData({...formData, site: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  >
                    <option value="">Select Site</option>
                    <option value="North Block">North Block</option>
                    <option value="South Block">South Block</option>
                  </select>
                </div>

                {/* Plot No */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Plot No</label>
                  <input 
                    type="text" 
                    placeholder="Land No" 
                    value={formData.plotNo}
                    onChange={(e) => setFormData({...formData, plotNo: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Size */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Size</label>
                  <input 
                    type="number" 
                    placeholder="Size" 
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Unit */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Unit</label>
                  <input 
                    type="text" 
                    placeholder="Unit" 
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Price</label>
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Facing */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Facing</label>
                  <input 
                    type="text" 
                    placeholder="Facing" 
                    value={formData.facing}
                    onChange={(e) => setFormData({...formData, facing: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none"
                  />
                </div>

                {/* Amenities */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Amenities</label>
                  <textarea 
                    rows={1}
                    placeholder="Amenities" 
                    value={formData.amenities}
                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none resize-none"
                  />
                </div>

              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-400 hover:bg-slate-500 text-white rounded-xl text-sm font-medium transition"
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-500/25 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}