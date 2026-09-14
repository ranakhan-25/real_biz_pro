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
  Layers, 
  Building2, 
  Maximize2,
  SlidersHorizontal
} from 'lucide-react';

interface BlockItem {
  sl: number;
  projectName: string;
  blockName: string;
}

const initialBlocks: BlockItem[] = [
  { sl: 1, projectName: 'Estern 19', blockName: 'B' },
  { sl: 2, projectName: 'Estern 19', blockName: 'A' },
  { sl: 3, projectName: 'N/A', blockName: 'B' },
  { sl: 4, projectName: 'N/A', blockName: 'D' },
  { sl: 5, projectName: 'N/A', blockName: 'B' },
  { sl: 6, projectName: 'N/A', blockName: 'Block-B' },
  { sl: 7, projectName: 'N/A', blockName: '5' },
  { sl: 8, projectName: 'N/A', blockName: '4' },
  { sl: 9, projectName: 'N/A', blockName: '2' },
  { sl: 10, projectName: 'Green Valley', blockName: 'Block-C' },
];

export default function PropertyBlockListPage() {
  const [blocks, setBlocks] = useState<BlockItem[]>(initialBlocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');

  // Modal and Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<BlockItem | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    projectName: '',
    blockName: ''
  });

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingBlock(null);
    setFormData({ projectName: '', blockName: '' });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (block: BlockItem) => {
    setEditingBlock(block);
    setFormData({ projectName: block.projectName, blockName: block.blockName });
    setIsModalOpen(true);
  };

  // Delete Item
  const handleDelete = (sl: number) => {
    if (confirm('Are you sure you want to delete this block?')) {
      setBlocks(blocks.filter(item => item.sl !== sl));
    }
  };

  // Handle Form Submit (Add / Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlock) {
      // Update
      setBlocks(blocks.map(item => item.sl === editingBlock.sl ? { ...item, ...formData } : item));
    } else {
      // Add New
      const newItem: BlockItem = {
        sl: blocks.length + 1,
        projectName: formData.projectName || 'N/A',
        blockName: formData.blockName || 'A'
      };
      setBlocks([newItem, ...blocks]);
    }
    setIsModalOpen(false);
  };

  // Filter & Search Logic
  const filteredBlocks = blocks.filter(item => {
    const matchesSearch = item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.blockName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = filterProject ? item.projectName === filterProject : true;
    return matchesSearch && matchesProject;
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
          <span className="hover:text-indigo-600 cursor-pointer transition">Flat/Land</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Property Block List</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-500/25 transition transform active:scale-95 text-sm"
          >
            <Plus className="w-4 h-4" /> Block Add
          </button>
          <button className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FORM 1: Filter & Control Form */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filter Blocks by Project</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500">Project Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select 
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              >
                <option value="">All Projects</option>
                <option value="Estern 19">Estern 19</option>
                <option value="Green Valley">Green Valley</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Controls (Show entries & Search) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Show</span>
          <select className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none font-medium">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search block..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>
      </div>

      {/* Property Block List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 w-20">SL</th>
                <th className="py-3.5 px-4">Project Name</th>
                <th className="py-3.5 px-4">Block Name</th>
                <th className="py-3.5 px-4 text-center w-36">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredBlocks.length > 0 ? (
                filteredBlocks.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition group">
                    <td className="py-3.5 px-4 font-medium text-slate-500">{item.sl}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.projectName}</td>
                    <td className="py-3.5 px-4 font-medium text-indigo-600 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" /> {item.blockName}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Action Button */}
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {/* Delete Action Button */}
                        <button 
                          onClick={() => handleDelete(item.sl)}
                          className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-400">No blocks found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500">
          <div>Showing 1 to {filteredBlocks.length} of {blocks.length} entries</div>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Previous</button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm font-semibold">1</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100">Next</button>
          </div>
        </div>
      </div>

      {/* FORM 2: Block Add / Edit Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Plus className="w-5 h-5" /> {editingBlock ? 'Edit Block' : 'Add New Block'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Project Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Estern 19" 
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Block Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. B" 
                  value={formData.blockName}
                  onChange={(e) => setFormData({...formData, blockName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-lg shadow-indigo-500/25 transition"
                >
                  {editingBlock ? 'Update Block' : 'Save Block'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}