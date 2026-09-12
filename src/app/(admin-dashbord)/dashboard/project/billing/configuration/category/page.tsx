'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Home, 
  X, 
  Save, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Tag
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  type: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

const initialCategoryData: CategoryItem[] = [
  { id: '1', type: 'Product', code: 'C939604', name: 'category', description: 'General merchandise category', status: 'Active' },
  { id: '2', type: 'Service', code: 'C939605', name: 'Wiring', description: 'Electrical wiring and conduit fitting', status: 'Active' },
  { id: '3', type: 'Service', code: 'C939606', name: 'Tiles Work', description: 'Floor and wall ceramic tiling', status: 'Active' },
  { id: '4', type: 'Service', code: 'C939607', name: 'Fiting', description: 'Sanitary and hardware fittings', status: 'Active' },
  { id: '5', type: 'Service', code: 'C939608', name: 'Roof', description: 'Roof casting and waterproofing', status: 'Active' },
  { id: '6', type: 'Service', code: 'C939609', name: 'Earth Remove', description: 'Site excavation and soil removal', status: 'Active' },
  { id: '7', type: 'Service', code: 'C939610', name: 'Day labour', description: 'Daily wage construction workers', status: 'Active' },
  { id: '8', type: 'Service', code: 'C939611', name: 'Rmc', description: 'Ready mix concrete supply', status: 'Active' },
  { id: '9', type: 'Service', code: 'C939612', name: 'Dia', description: 'Diameter core cutting and drilling', status: 'Active' },
  { id: '10', type: 'Service', code: 'C939613', name: 'Paint Work', description: 'Interior and exterior wall painting', status: 'Active' },
  { id: '11', type: 'Product', code: 'C939614', name: 'Cement & Rod', description: 'Primary structural raw materials', status: 'Active' },
  { id: '12', type: 'Product', code: 'C939615', name: 'PVC Pipes', description: 'Plumbing and drainage pipes', status: 'Active' },
  { id: '13', type: 'Service', code: 'C939616', name: 'Scaffolding', description: 'Temporary framework for construction', status: 'Active' },
  { id: '14', type: 'Service', code: 'C939617', name: 'Security Guard', description: 'Site surveillance and gate security', status: 'Active' },
  { id: '15', type: 'Product', code: 'C939618', name: 'Safety Equipment', description: 'Helmets, boots, and harnesses', status: 'Active' },
  { id: '16', type: 'Service', code: 'C939619', name: 'Heavy Transport', description: 'Material shifting and truck rentals', status: 'Active' },
  { id: '17', type: 'Service', code: 'C939620', name: 'Interior Design', description: 'Office and home interior planning', status: 'Active' }
];

export default function CategoryListModule() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategoryData);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    type: 'Service',
    code: 'C939621',
    name: '',
    description: ''
  });

  const filteredData = categories.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? item.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: CategoryItem = {
      id: Date.now().toString(),
      type: formData.type,
      code: formData.code || `C939${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      description: formData.description || 'Newly added category record',
      status: 'Active'
    };
    setCategories([newItem, ...categories]);
    setViewMode('list');
    setFormData({ type: 'Service', code: 'C939622', name: '', description: '' });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    setCategories(categories.map(cat => cat.id === selectedCategory.id ? {
      ...cat,
      type: formData.type,
      name: formData.name,
      description: formData.description
    } : cat));
    setIsEditOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-between p-2 sm:p-3 font-sans">
      <div className="space-y-3 w-full flex-1 flex flex-col">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Billing</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">
            {viewMode === 'list' ? 'Category List' : 'Add Category Form'}
          </span>
        </div>

        {/* Top Header & Actions Bar */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" /> 
              {viewMode === 'list' ? 'Category Management Dashboard' : 'Create New Category Entry'}
            </h1>
            <p className="text-[11px] text-slate-500">Manage all records seamlessly across full width screen space.</p>
          </div>

          <div>
            {viewMode === 'list' ? (
              <button
                onClick={() => setViewMode('create')}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +Add Category
              </button>
            ) : (
              <button
                onClick={() => setViewMode('list')}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Previous
              </button>
            )}
          </div>
        </div>

        {/* ================= VIEW 1: CATEGORY LIST & FULL TABLE ================= */}
        {viewMode === 'list' && (
          <div className="w-full flex-1 flex flex-col space-y-3">
            {/* Filter Section */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs w-full">
              <div className="w-full sm:w-1/3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type <span className="text-rose-500">*</span></label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select One Option</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>
            </div>

            {/* Entries & Search Bar Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-3 rounded-t-lg border-x border-t border-slate-200 w-full">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 font-medium">Search:</span>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search category name, code..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Full Width Table Content with Zero Gaps */}
            <div className="border-x border-b border-slate-200 rounded-b-lg overflow-hidden shadow-xs bg-white w-full flex-1">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                      <th className="py-2.5 px-4 w-16">SL</th>
                      <th className="py-2.5 px-4 w-40">TYPE</th>
                      <th className="py-2.5 px-4 w-48">CODE</th>
                      <th className="py-2.5 px-4">NAME</th>
                      <th className="py-2.5 px-4 text-center w-36">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, entriesPerPage).map((item, index) => (
                        <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-600">{index + 1}</td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${item.type === 'Product' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-mono text-slate-700 font-semibold">{item.code}</td>
                          <td className="py-2.5 px-4 font-bold text-slate-900">{item.name}</td>
                          <td className="py-2.5 px-4 text-center">
                            <div className="inline-flex items-center gap-1 justify-center">
                              {/* View Profile Icon */}
                              <button
                                type="button"
                                onClick={() => { setSelectedCategory(item); setIsViewOpen(true); }}
                                className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              {/* Edit Icon */}
                              <button
                                type="button"
                                onClick={() => { setSelectedCategory(item); setFormData({ type: item.type, code: item.code, name: item.name, description: item.description }); setIsEditOpen(true); }}
                                className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded transition-colors cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              {/* Delete Icon */}
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-slate-400 font-medium">
                          No category records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium w-full">
                <div>Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries</div>
                <div className="inline-flex items-center gap-1">
                  <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
                  <button type="button" className="px-3 py-1 rounded border border-[#5949d6] bg-[#5949d6] text-white font-semibold">1</button>
                  <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: ADD CATEGORY FORM ================= */}
        {viewMode === 'create' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 w-full">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> New Category Registration Form
            </h2>
            <form onSubmit={handleAddCategorySubmit} className="space-y-4 text-xs w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 font-mono font-bold text-indigo-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Description / Notes</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Optional category details..."
                    className="w-full border border-slate-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-xs cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Category
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ================= MODAL: VIEW DETAILS ================= */}
      {isViewOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-300" /> Category Profile: {selectedCategory.code}
              </h3>
              <button type="button" onClick={() => setIsViewOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Category Name:</span>
                  <span className="font-bold text-slate-900">{selectedCategory.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Category Type:</span>
                  <span className="font-bold text-indigo-700">{selectedCategory.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">System Code:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedCategory.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <span className="font-bold text-emerald-600">{selectedCategory.status}</span>
                </div>
                <div className="flex flex-col py-1 gap-1">
                  <span className="text-slate-500 font-medium">Description:</span>
                  <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200">{selectedCategory.description}</p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setIsViewOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-semibold cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT FORM ================= */}
      {isEditOpen && selectedCategory && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-300" /> Edit Category: {selectedCategory.code}
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category Code</label>
                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 font-mono font-bold text-slate-400 bg-slate-100 cursor-not-allowed"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-xs cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}