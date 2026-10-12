'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Home, 
  X, 
  Save, 
  Edit, 
  Trash2, 
  ArrowLeft,
  FileText
} from 'lucide-react';

export interface BoqTitleRecord {
  id: string;
  projectType: string;
  title: string;
}

const initialBoqData: BoqTitleRecord[] = [
  { id: '1', projectType: 'Building Construction', title: 'Design Cost' },
  { id: '2', projectType: 'Building Construction', title: 'Project Overhead' },
  { id: '3', projectType: 'Civil Works', title: 'Indirect Common Cost' },
  { id: '4', projectType: 'Civil Works', title: 'Direct Common Cost' },
  { id: '5', projectType: 'Interior Fitout', title: 'Paints Works' },
  { id: '6', projectType: 'Plumbing & Sanitary', title: 'Sanitary Works' },
  { id: '7', projectType: 'Interior Fitout', title: 'Thai & Glass Works' },
  { id: '8', projectType: 'Electrical', title: 'Electric Works' },
  { id: '9', projectType: 'Civil Works', title: 'Tiles & Marble Works' },
  { id: '10', projectType: 'Metal Fabrication', title: 'MS & SS Works' },
  { id: '11', projectType: 'Electrical', title: 'Substation & Generator Installation' },
  { id: '12', projectType: 'HVAC', title: 'Central AC Ducting Work' },
  { id: '13', projectType: 'Plumbing & Sanitary', title: 'Firefighting System Setup' },
  { id: '14', projectType: 'Building Construction', title: 'Piling & Foundation Work' },
  { id: '15', projectType: 'Interior Fitout', title: 'False Ceiling & Partitions' },
  { id: '16', projectType: 'Security', title: 'CCTV & Networking Setup' }
];

export default function BoqTitleListModule() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [boqList, setBoqList] = useState<BoqTitleRecord[]>(initialBoqData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State for Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BoqTitleRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    projectType: 'Building Construction',
    title: ''
  });

  const filteredData = boqList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.projectType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentTableData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: BoqTitleRecord = {
      id: Date.now().toString(),
      projectType: formData.projectType,
      title: formData.title
    };
    setBoqList([newItem, ...boqList]);
    setViewMode('list');
    setFormData({ projectType: 'Building Construction', title: '' });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setBoqList(boqList.map(item => item.id === selectedItem.id ? {
      ...item,
      projectType: formData.projectType,
      title: formData.title
    } : item));
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this BOQ title?')) {
      setBoqList(boqList.filter(item => item.id !== id));
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
          <span className="text-slate-600">Accounts</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">
            {viewMode === 'list' ? 'Boq Title List' : 'Boq Title Add'}
          </span>
        </div>

        {/* Top Header & Actions Bar */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> 
              {viewMode === 'list' ? 'Bill of Quantities (BOQ) Title Management' : 'Create New BOQ Title'}
            </h1>
            <p className="text-[11px] text-slate-500">Manage project estimate titles and cost categories across full screen layout.</p>
          </div>

          <div>
            {viewMode === 'list' ? (
              <button
                onClick={() => setViewMode('create')}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +Title Add
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

        {/* ================= VIEW 1: BOQ TITLE LIST TABLE ================= */}
        {viewMode === 'list' && (
          <div className="w-full flex-1 flex flex-col space-y-3">
            
            {/* Entries & Search Bar Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-3 rounded-t-lg border-x border-t border-slate-200 w-full shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
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
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search titles or project types..."
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
                      <th className="py-2.5 px-3 w-16">SL</th>
                      <th className="py-2.5 px-3">PROJECT TYPE</th>
                      <th className="py-2.5 px-3">TITLE</th>
                      <th className="py-2.5 px-3 text-center w-28">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentTableData.length > 0 ? (
                      currentTableData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-indigo-50/40 transition-colors">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{startIndex + index + 1}</td>
                          <td className="py-2.5 px-3 font-semibold text-indigo-700">{item.projectType}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{item.title}</td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="inline-flex items-center gap-1.5 justify-center">
                              <button
                                type="button"
                                onClick={() => { 
                                  setSelectedItem(item); 
                                  setFormData({ projectType: item.projectType, title: item.title });
                                  setIsEditOpen(true); 
                                }}
                                className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded transition-colors cursor-pointer"
                                title="Edit Title"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors cursor-pointer"
                                title="Delete Title"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-slate-400 font-medium">
                          No matching BOQ titles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium w-full">
                <div>
                  Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <div className="inline-flex items-center gap-1">
                  <button 
                    type="button" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border border-slate-200 ${currentPage === 1 ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded border font-semibold ${currentPage === pageNumber ? 'border-[#5949d6] bg-[#5949d6] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer'}`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button 
                    type="button" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-3 py-1 rounded border border-slate-200 ${(currentPage === totalPages || totalPages === 0) ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: BOQ TITLE ADD FORM ================= */}
        {viewMode === 'create' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 w-full">
            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> New BOQ Title Entry Form
            </h2>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Building Construction">Building Construction</option>
                    <option value="Civil Works">Civil Works</option>
                    <option value="Interior Fitout">Interior Fitout</option>
                    <option value="Plumbing & Sanitary">Plumbing & Sanitary</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Metal Fabrication">Metal Fabrication</option>
                    <option value="HVAC">HVAC</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">BOQ Title Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter BOQ title name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
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
                  <Save className="w-4 h-4" /> Save Title
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ================= MODAL: EDIT FORM ================= */}
      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-300" /> Edit BOQ Title
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="p-5 space-y-3 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Building Construction">Building Construction</option>
                    <option value="Civil Works">Civil Works</option>
                    <option value="Interior Fitout">Interior Fitout</option>
                    <option value="Plumbing & Sanitary">Plumbing & Sanitary</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Metal Fabrication">Metal Fabrication</option>
                    <option value="HVAC">HVAC</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">BOQ Title Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
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