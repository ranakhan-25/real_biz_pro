"use client"

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  ChevronDown 
} from 'lucide-react';

interface ProjectTypeItem {
  id: number;
  code: string;
  name: string;
}

export default function ProjectTypePage() {
  const [projectTypes, setProjectTypes] = useState<ProjectTypeItem[]>([
    { id: 14, code: 'P4773027', name: 'Office' },
    { id: 15, code: 'P7566761', name: 'Real Estate' },
    { id: 16, code: 'P9579440', name: 'Construction' },
    { id: 17, code: 'P2596945', name: 'Design' },
    { id: 18, code: 'P1554959', name: 'Land Share' },
    { id: 19, code: 'P7784999', name: 'Share Project' },
    { id: 21, code: 'P2777817', name: 'Interior' },
    { id: 22, code: 'P1279431', name: 'Residencial' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  const [codeValue, setCodeValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const filteredProjectTypes = projectTypes.filter(item => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toString().includes(searchTerm)
  );

  const handleOpenCreate = () => {
    setModalMode('create');
    setCodeValue('P' + Math.floor(1000000 + Math.random() * 9000000));
    setNameValue('');
    setCurrentId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ProjectTypeItem) => {
    setModalMode('edit');
    setCodeValue(item.code);
    setNameValue(item.name);
    setCurrentId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProjectTypes(projectTypes.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameValue.trim()) return;

    if (modalMode === 'create') {
      const newId = projectTypes.length > 0 ? Math.max(...projectTypes.map(p => p.id)) + 1 : 1;
      const newItem: ProjectTypeItem = {
        id: newId,
        code: codeValue,
        name: nameValue,
      };
      setProjectTypes([newItem, ...projectTypes]);
    } else if (modalMode === 'edit' && currentId !== null) {
      setProjectTypes(projectTypes.map(item => 
        item.id === currentId 
          ? { ...item, code: codeValue, name: nameValue } 
          : item
      ));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative flex flex-col">
      {/* Top Header Navigation */}
      <header className="bg-white border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-1.5 sm:space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-purple-600 font-medium cursor-pointer hover:underline shrink-0">Home</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
          <span className="text-purple-600 font-medium cursor-pointer hover:underline flex items-center shrink-0">
            Project <ChevronDown className="w-3 h-3 ml-0.5" />
          </span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
          <span className="text-gray-700 font-semibold shrink-0">Project Type</span>
        </div>

        <div className="w-full sm:w-auto flex justify-end">
          <button 
            onClick={handleOpenCreate}
            className="w-full sm:w-auto bg-[#6B5BFF] hover:bg-[#5848e0] text-white px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Create Project Type
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[98%] w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1">
        {/* Controls Bar: Select Columns & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-4 gap-3">
          <div className="flex items-center">
            <button className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white text-gray-700 flex items-center justify-between w-full sm:w-auto shadow-sm">
              <span>Select Columns</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-sm font-medium text-gray-600 shrink-0">Search:</span>
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                placeholder=""
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#6B5BFF] text-white text-xs uppercase tracking-wider font-semibold">
                  <th className="px-4 sm:px-6 py-3.5 border-b border-purple-700">ID</th>
                  <th className="px-4 sm:px-6 py-3.5 border-b border-purple-700">Code</th>
                  <th className="px-4 sm:px-6 py-3.5 border-b border-purple-700">Name</th>
                  <th className="px-4 sm:px-6 py-3.5 border-b border-purple-700 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredProjectTypes.length > 0 ? (
                  filteredProjectTypes.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4 text-gray-700 font-medium">{item.id}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-600">{item.code}</td>
                      <td className="px-4 sm:px-6 py-4 text-gray-800">{item.name}</td>
                      <td className="px-4 sm:px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="bg-[#6B5BFF] hover:bg-[#5848e0] text-white p-2 rounded transition-colors inline-flex items-center justify-center shadow-sm cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-[#E5484D] hover:bg-[#d43b40] text-white p-2 rounded transition-colors inline-flex items-center justify-center shadow-sm cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Info & Pagination */}
          <div className="px-4 sm:px-6 py-4 bg-white border-t flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 gap-3">
            <div className="text-center sm:text-left">
              Showing 1 to {filteredProjectTypes.length} of {filteredProjectTypes.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-1.5 border rounded text-xs sm:text-sm text-gray-400 bg-gray-50 cursor-not-allowed">
                Previous
              </button>
              <button className="px-3.5 py-1.5 border rounded text-xs sm:text-sm bg-[#6B5BFF] text-white font-medium shadow-sm">
                1
              </button>
              <button className="px-3.5 py-1.5 border rounded text-xs sm:text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Popup for Create / Edit Project Type */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden my-auto animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {modalMode === 'create' ? 'Project Add' : 'Project Edit'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-100 px-4 sm:px-8 py-5 sm:py-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Code</label>
                    <input 
                      type="text" 
                      value={codeValue}
                      onChange={(e) => setCodeValue(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      placeholder="Name"
                      className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-t flex items-center justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-sm cursor-pointer"
                >
                  Close
                </button>
                <button 
                  type="submit"
                  className="bg-[#6B5BFF] hover:bg-[#5848e0] text-white px-5 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-sm cursor-pointer"
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