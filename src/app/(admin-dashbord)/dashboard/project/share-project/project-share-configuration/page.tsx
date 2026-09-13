'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  User, 
  Edit, 
  Trash2, 
  ChevronRight, 
  Home, 
  X, 
  Save, 
  FileText,  
  Download,
  Settings,
  CheckCircle2
} from 'lucide-react';

export interface ShareConfigItem {
  id: string;
  titleName: string;
  projectName: string;
  shareType: string;
  taskNames: string;
  assignType: string;
  configurationAmount: string;
  status: 'Active' | 'Inactive';
}

const initialConfigData: ShareConfigItem[] = [
  { id: '1', titleName: '1st Installment', projectName: 'Alpha Heights', shareType: 'Construction Share', taskNames: 'Foundation', assignType: 'Fixed-Amount', configurationAmount: '100,000', status: 'Active' },
  { id: '2', titleName: 'Test Configuration', projectName: 'Beta Commercial', shareType: 'Land Share', taskNames: 'Piling Work', assignType: 'Percentage', configurationAmount: '1,111', status: 'Active' },
  { id: '3', titleName: '1st Installment', projectName: 'Green Valley', shareType: 'Construction Share', taskNames: 'Structure', assignType: 'Fixed-Amount', configurationAmount: '100,000', status: 'Active' },
  { id: '4', titleName: 'Advanced Instalment', projectName: 'Delta Residency', shareType: 'Land Share', taskNames: 'Design & Plan', assignType: 'Fixed-Amount', configurationAmount: '5,000,000', status: 'Active' },
  { id: '5', titleName: 'Rooftop Special Share', projectName: 'Silicon City', shareType: 'Construction Share', taskNames: 'Roof Casting', assignType: 'Fixed-Amount', configurationAmount: '10,000,000', status: 'Active' },
  { id: '6', titleName: '1st Floor Rooftop', projectName: 'Sigma Tower', shareType: 'Construction Share', taskNames: 'Masonry', assignType: 'Fixed-Amount', configurationAmount: '3,000,000', status: 'Active' },
  { id: '7', titleName: 'Title Share Project', projectName: 'Alpha Heights', shareType: 'Construction Share', taskNames: 'Interior', assignType: 'Fixed-Amount', configurationAmount: '70,000', status: 'Active' },
  { id: '8', titleName: '2nd Installment Payment', projectName: 'Beta Commercial', shareType: 'Land Share', taskNames: 'Legal & Doc', assignType: 'Fixed-Amount', configurationAmount: '250,000', status: 'Active' },
  { id: '9', titleName: 'Basement Development', projectName: 'Green Valley', shareType: 'Construction Share', taskNames: 'Excavation', assignType: 'Fixed-Amount', configurationAmount: '1,500,000', status: 'Active' },
  { id: '10', titleName: 'Commercial Unit A', projectName: 'Delta Residency', shareType: 'Land Share', taskNames: 'Handover', assignType: 'Percentage', configurationAmount: '4,500,000', status: 'Active' },
  { id: '11', titleName: 'Parking Space Share', projectName: 'Silicon City', shareType: 'Construction Share', taskNames: 'Marking', assignType: 'Fixed-Amount', configurationAmount: '350,000', status: 'Active' },
  { id: '12', titleName: 'Substation Installation', projectName: 'Sigma Tower', shareType: 'Construction Share', taskNames: 'Electrical', assignType: 'Fixed-Amount', configurationAmount: '800,000', status: 'Active' },
  { id: '13', titleName: 'Fire Safety Unit', projectName: 'Alpha Heights', shareType: 'Construction Share', taskNames: 'Safety Check', assignType: 'Fixed-Amount', configurationAmount: '450,000', status: 'Active' },
  { id: '14', titleName: 'Lift & Escalator Share', projectName: 'Beta Commercial', shareType: 'Construction Share', taskNames: 'Mechanics', assignType: 'Fixed-Amount', configurationAmount: '2,200,000', status: 'Active' },
  { id: '15', titleName: 'Generator Backup Fund', projectName: 'Green Valley', shareType: 'Land Share', taskNames: 'Power Setup', assignType: 'Fixed-Amount', configurationAmount: '600,000', status: 'Active' }
];

export default function ShareConfigurationPage() {
  const [configData, setConfigData] = useState<ShareConfigItem[]>(initialConfigData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ShareConfigItem | null>(null);

  const [formData, setFormData] = useState({
    titleName: '',
    projectName: 'Alpha Heights',
    shareType: 'Construction Share',
    taskNames: 'General Task',
    assignType: 'Fixed-Amount',
    configurationAmount: '100,000',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const filteredData = configData.filter(item => 
    item.titleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.shareType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ShareConfigItem = {
      id: Date.now().toString(),
      ...formData
    };
    setConfigData([newItem, ...configData]);
    setIsAddOpen(false);
    setFormData({
      titleName: '',
      projectName: 'Alpha Heights',
      shareType: 'Construction Share',
      taskNames: 'General Task',
      assignType: 'Fixed-Amount',
      configurationAmount: '100,000',
      status: 'Active'
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem) return;
    setConfigData(configData.map(item => item.id === activeItem.id ? { ...item, ...formData } : item));
    setIsEditOpen(false);
    setActiveItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this configuration?')) {
      setConfigData(configData.filter(item => item.id !== id));
    }
  };

  const openEditModal = (item: ShareConfigItem) => {
    setActiveItem(item);
    setFormData({
      titleName: item.titleName,
      projectName: item.projectName,
      shareType: item.shareType,
      taskNames: item.taskNames,
      assignType: item.assignType,
      configurationAmount: item.configurationAmount,
      status: item.status
    });
    setIsEditOpen(true);
  };

  const openProfileModal = (item: ShareConfigItem) => {
    setActiveItem(item);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Share Configuration Settings</span>
        </div>

        {/* Top Action Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Share Configuration Management</h1>
              <p className="text-[11px] text-slate-500">Manage all share setups, amounts, and task allocations seamlessly.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Configuration
            </button>
            <button className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
            <button className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Excel
            </button>
          </div>
        </div>

        {/* Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-600 font-medium">Search:</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, project..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                  <th className="py-3 px-3 w-16">SL NO</th>
                  <th className="py-3 px-3">TITLE/NAME</th>
                  <th className="py-3 px-3">PROJECT NAME</th>
                  <th className="py-3 px-3">SHARE TYPE</th>
                  <th className="py-3 px-3">TASK NAMES</th>
                  <th className="py-3 px-3">ASSIGN TYPE</th>
                  <th className="py-3 px-3">CONFIGURATION AMOUNT</th>
                  <th className="py-3 px-3 text-center">STATUS</th>
                  <th className="py-3 px-3 text-center w-36">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{item.titleName}</td>
                      <td className="py-3 px-3 font-medium text-slate-700">{item.projectName}</td>
                      <td className="py-3 px-3 text-slate-600">{item.shareType}</td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                          {item.taskNames}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{item.assignType}</td>
                      <td className="py-3 px-3 font-mono font-bold text-indigo-700">৳ {item.configurationAmount}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {/* Action buttons matching screenshot style: Profile (Human Icon), Edit, Delete */}
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openProfileModal(item)}
                            title="View Profile"
                            className="p-1.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded shadow-xs transition-colors cursor-pointer"
                          >
                            <User className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            title="Edit Record"
                            className="p-1.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white rounded shadow-xs transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Record"
                            className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded shadow-xs transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-slate-400 font-medium">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredData.length)} of {filteredData.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button type="button" className="px-3 py-1 rounded border border-[#5949d6] bg-[#5949d6] text-white font-semibold">1</button>
              <button type="button" disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MODAL 1: ADD CONFIGURATION FORM ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Share Configuration
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleName}
                    onChange={(e) => setFormData({ ...formData, titleName: e.target.value })}
                    placeholder="e.g. 1st Installment"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial">Beta Commercial</option>
                    <option value="Green Valley">Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                    <option value="Silicon City">Silicon City</option>
                    <option value="Sigma Tower">Sigma Tower</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Type *</label>
                  <select
                    value={formData.shareType}
                    onChange={(e) => setFormData({ ...formData, shareType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Construction Share">Construction Share</option>
                    <option value="Land Share">Land Share</option>
                    <option value="Commercial Share">Commercial Share</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Task Names *</label>
                  <input
                    type="text"
                    required
                    value={formData.taskNames}
                    onChange={(e) => setFormData({ ...formData, taskNames: e.target.value })}
                    placeholder="e.g. Foundation"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Type *</label>
                  <select
                    value={formData.assignType}
                    onChange={(e) => setFormData({ ...formData, assignType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Fixed-Amount">Fixed-Amount</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Configuration Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.configurationAmount}
                    onChange={(e) => setFormData({ ...formData, configurationAmount: e.target.value })}
                    placeholder="100,000"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: PROFILE VIEW DETAILS ================= */}
      {isProfileOpen && activeItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" /> Configuration Profile Summary
              </h3>
              <button type="button" onClick={() => setIsProfileOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-4 bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <div className="w-12 h-12 rounded-full bg-[#5949d6] text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {activeItem.titleName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeItem.titleName}</h4>
                  <p className="text-indigo-600 font-semibold">{activeItem.projectName}</p>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Share Type:</span>
                  <span className="font-bold text-slate-800">{activeItem.shareType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Task Name:</span>
                  <span className="font-bold text-slate-800">{activeItem.taskNames}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Assign Type:</span>
                  <span className="font-bold text-slate-800">{activeItem.assignType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Configuration Amount:</span>
                  <span className="font-mono font-bold text-indigo-700">৳ {activeItem.configurationAmount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <span className="font-bold text-emerald-600">{activeItem.status}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: EDIT FORM ================= */}
      {isEditOpen && activeItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-amber-600 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Edit className="w-4 h-4" /> Edit Share Configuration
              </h3>
              <button type="button" onClick={() => setIsEditOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleName}
                    onChange={(e) => setFormData({ ...formData, titleName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <select
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Alpha Heights">Alpha Heights</option>
                    <option value="Beta Commercial">Beta Commercial</option>
                    <option value="Green Valley">Green Valley</option>
                    <option value="Delta Residency">Delta Residency</option>
                    <option value="Silicon City">Silicon City</option>
                    <option value="Sigma Tower">Sigma Tower</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Share Type *</label>
                  <select
                    value={formData.shareType}
                    onChange={(e) => setFormData({ ...formData, shareType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Construction Share">Construction Share</option>
                    <option value="Land Share">Land Share</option>
                    <option value="Commercial Share">Commercial Share</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Task Names *</label>
                  <input
                    type="text"
                    required
                    value={formData.taskNames}
                    onChange={(e) => setFormData({ ...formData, taskNames: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Type *</label>
                  <select
                    value={formData.assignType}
                    onChange={(e) => setFormData({ ...formData, assignType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Fixed-Amount">Fixed-Amount</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Configuration Amount (৳) *</label>
                  <input
                    type="text"
                    required
                    value={formData.configurationAmount}
                    onChange={(e) => setFormData({ ...formData, configurationAmount: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Update Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}