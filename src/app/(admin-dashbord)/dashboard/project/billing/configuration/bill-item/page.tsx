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
  Package
} from 'lucide-react';

export interface ItemRecord {
  id: string;
  code: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  description: string;
  category: string;
  unit: string;
  brand: string;
}

const initialItemData: ItemRecord[] = [
  { id: '1', code: 'P0006', name: 'cbv', purchasePrice: 450, salePrice: 550, description: 'Standard Grade Sand', category: 'Sand', unit: 'Set', brand: 'ABC' },
  { id: '2', code: 'P0005', name: 'hhh', purchasePrice: 520, salePrice: 600, description: 'Composite Cement Bag', category: 'Cement', unit: 'Rft', brand: 'ABC' },
  { id: '3', code: 'P0004', name: 'purch', purchasePrice: 75000, salePrice: 82000, description: 'Deformed Steel Rod 500W', category: 'Rod', unit: 'Rft', brand: 'BSRM' },
  { id: '4', code: 'P0003', name: 'purchase', purchasePrice: 72000, salePrice: 79000, description: 'High Yield Strength Rod', category: 'Rod', unit: 'Sft', brand: 'BSRM' },
  { id: '5', code: 'P0002', name: 'grfg', purchasePrice: 480, salePrice: 530, description: 'Ordinary Portland Cement', category: 'Cement', unit: 'Rft', brand: 'BBH' },
  { id: '6', code: 'P0001', name: 'test', purchasePrice: 500, salePrice: 580, description: 'Premium Quality Cement', category: 'Cement', unit: 'Bag', brand: 'Seven Rings' },
  { id: '7', code: 'P0007', name: 'Fine Sand Pro', purchasePrice: 600, salePrice: 700, description: 'Washed and sifted fine sand', category: 'Sand', unit: 'CFT', brand: 'Sylhet Sand' },
  { id: '8', code: 'P0008', name: 'Red Bricks 1st Class', purchasePrice: 12, salePrice: 15, description: 'Kiln burnt clay bricks', category: 'Bricks', unit: 'Pcs', brand: 'Local kiln' },
  { id: '9', code: 'P0009', name: 'White Marble Slab', purchasePrice: 350, salePrice: 450, description: 'Imported flooring marble', category: 'Marble', unit: 'Sft', brand: 'Italian' },
  { id: '10', code: 'P0010', name: 'PVC Pipe 4 inch', purchasePrice: 320, salePrice: 390, description: 'Heavy duty drainage pipe', category: 'Plumbing', unit: 'Pcs', brand: 'RFL' },
  { id: '11', code: 'P0011', name: 'Electrical Wire 2.5mm', purchasePrice: 1800, salePrice: 2100, description: 'Copper flexible wire roll', category: 'Electrical', unit: 'Coil', brand: 'BRB' },
  { id: '12', code: 'P0012', name: 'Asian Paint Apex', purchasePrice: 2400, salePrice: 2800, description: 'Exterior weather shield paint', category: 'Paint', unit: 'Gallon', brand: 'Asian Paints' }
];

export default function ItemListModule() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [items, setItems] = useState<ItemRecord[]>(initialItemData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(25);

  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: 'P00' + (items.length + 1),
    name: '',
    purchasePrice: '',
    salePrice: '',
    description: '',
    category: 'Cement',
    unit: 'Bag',
    brand: 'Seven Rings'
  });

  const filteredData = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ItemRecord = {
      id: Date.now().toString(),
      code: formData.code,
      name: formData.name,
      purchasePrice: Number(formData.purchasePrice) || 0,
      salePrice: Number(formData.salePrice) || 0,
      description: formData.description || 'No description provided',
      category: formData.category,
      unit: formData.unit,
      brand: formData.brand
    };
    setItems([newItem, ...items]);
    setViewMode('list');
    setFormData({
      code: 'P00' + (items.length + 2),
      name: '',
      purchasePrice: '',
      salePrice: '',
      description: '',
      category: 'Cement',
      unit: 'Bag',
      brand: 'Seven Rings'
    });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setItems(items.map(it => it.id === selectedItem.id ? {
      ...it,
      name: formData.name,
      purchasePrice: Number(formData.purchasePrice) || 0,
      salePrice: Number(formData.salePrice) || 0,
      description: formData.description,
      category: formData.category,
      unit: formData.unit,
      brand: formData.brand
    } : it));
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
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
            {viewMode === 'list' ? 'Item List' : 'Bill Item Add Form'}
          </span>
        </div>

        {/* Top Header & Actions Bar */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" /> 
              {viewMode === 'list' ? 'Billing Item Inventory Management' : 'Add New Billing Item'}
            </h1>
            <p className="text-[11px] text-slate-500">Manage billing stock items, pricing, and inventory specifications across full screen width.</p>
          </div>

          <div>
            {viewMode === 'list' ? (
              <button
                onClick={() => setViewMode('create')}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +Bill Item Add
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

        {/* ================= VIEW 1: ITEM LIST TABLE ================= */}
        {viewMode === 'list' && (
          <div className="w-full flex-1 flex flex-col space-y-3">
            
            {/* Entries & Search Bar Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-3 rounded-t-lg border-x border-t border-slate-200 w-full shadow-xs">
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
                    placeholder="Search name, code, category, brand..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Full Width Table */}
            <div className="border-x border-b border-slate-200 rounded-b-lg overflow-hidden shadow-xs bg-white w-full flex-1">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                      <th className="py-2.5 px-3 w-12">ID</th>
                      <th className="py-2.5 px-3 w-24">CODE</th>
                      <th className="py-2.5 px-3">NAME</th>
                      <th className="py-2.5 px-3 text-right">PURCHASE PRICE</th>
                      <th className="py-2.5 px-3 text-right">SALE PRICE</th>
                      <th className="py-2.5 px-3">DESCRIPTION</th>
                      <th className="py-2.5 px-3">CATEGORY</th>
                      <th className="py-2.5 px-3 w-20">UNIT</th>
                      <th className="py-2.5 px-3 w-28">BRAND</th>
                      <th className="py-2.5 px-3 text-center w-28">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, entriesPerPage).map((item, index) => (
                        <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{index + 1}</td>
                          <td className="py-2.5 px-3 font-mono text-indigo-700 font-semibold">{item.code}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{item.name}</td>
                          <td className="py-2.5 px-3 text-right font-medium text-slate-700">৳{item.purchasePrice}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-emerald-600">৳{item.salePrice}</td>
                          <td className="py-2.5 px-3 text-slate-500 truncate max-w-xs">{item.description}</td>
                          <td className="py-2.5 px-3 font-medium text-indigo-600">{item.category}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-600">{item.unit}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{item.brand}</td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="inline-flex items-center gap-1 justify-center">
                              <button
                                type="button"
                                onClick={() => { setSelectedItem(item); setIsViewOpen(true); }}
                                className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => { 
                                  setSelectedItem(item); 
                                  setFormData({
                                    code: item.code,
                                    name: item.name,
                                    purchasePrice: String(item.purchasePrice),
                                    salePrice: String(item.salePrice),
                                    description: item.description,
                                    category: item.category,
                                    unit: item.unit,
                                    brand: item.brand
                                  });
                                  setIsEditOpen(true); 
                                }}
                                className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded transition-colors cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
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
                        <td colSpan={10} className="text-center py-12 text-slate-400 font-medium">
                          No matching billing items found
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

        {/* ================= VIEW 2: BILL ITEM ADD FORM ================= */}
        {viewMode === 'create' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 w-full">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> New Bill Item Entry Form
            </h2>
            <form onSubmit={handleAddItemSubmit} className="space-y-4 text-xs w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Item Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 font-mono font-bold text-indigo-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter item name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Purchase Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    placeholder="0"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sale Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="0"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Cement">Cement</option>
                    <option value="Sand">Sand</option>
                    <option value="Rod">Rod</option>
                    <option value="Bricks">Bricks</option>
                    <option value="Marble">Marble</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Paint">Paint</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Bag">Bag</option>
                    <option value="Rft">Rft</option>
                    <option value="Sft">Sft</option>
                    <option value="Set">Set</option>
                    <option value="CFT">CFT</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Coil">Coil</option>
                    <option value="Gallon">Gallon</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Enter brand name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">Description / Notes</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter item description..."
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
                  <Save className="w-4 h-4" /> Save Bill Item
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ================= MODAL: VIEW DETAILS ================= */}
      {isViewOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-300" /> Item Details: {selectedItem.code}
              </h3>
              <button type="button" onClick={() => setIsViewOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Item Name:</span>
                  <span className="font-bold text-slate-900">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Item Code:</span>
                  <span className="font-mono font-bold text-indigo-700">{selectedItem.code}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Purchase Price:</span>
                  <span className="font-bold text-slate-800">৳{selectedItem.purchasePrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Sale Price:</span>
                  <span className="font-bold text-emerald-600">৳{selectedItem.salePrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Category / Unit:</span>
                  <span className="font-bold text-indigo-600">{selectedItem.category} ({selectedItem.unit})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Brand:</span>
                  <span className="font-bold text-slate-800">{selectedItem.brand}</span>
                </div>
                <div className="flex flex-col py-1 gap-1">
                  <span className="text-slate-500 font-medium">Description:</span>
                  <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200">{selectedItem.description}</p>
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
      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-300" /> Edit Item: {selectedItem.code}
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Item Code</label>
                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 font-mono font-bold text-slate-400 bg-slate-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Purchase Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sale Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Cement">Cement</option>
                    <option value="Sand">Sand</option>
                    <option value="Rod">Rod</option>
                    <option value="Bricks">Bricks</option>
                    <option value="Marble">Marble</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Paint">Paint</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Bag">Bag</option>
                    <option value="Rft">Rft</option>
                    <option value="Sft">Sft</option>
                    <option value="Set">Set</option>
                    <option value="CFT">CFT</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Coil">Coil</option>
                    <option value="Gallon">Gallon</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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