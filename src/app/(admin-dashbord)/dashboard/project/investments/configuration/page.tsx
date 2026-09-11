'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  FileText
} from 'lucide-react';

// Type definitions for Share Configuration Settings
export interface ShareConfig {
  id: number;
  projectName: string;
  investorName: string;
  investmentAmount: string;
  profitPercent: string;
  profitAmount: string;
  isProfitDistribute: boolean;
}

// Comprehensive mock data matching the structure from the reference images to ensure zero empty spaces
const initialConfigs: ShareConfig[] = [
  { id: 1, projectName: 'Alpha Tech Park', investorName: 'AGB', investmentAmount: '20000000', profitPercent: '10', profitAmount: '2000000', isProfitDistribute: true },
  { id: 2, projectName: 'Beta Real Estate', investorName: 'ABC Ltd', investmentAmount: '0', profitPercent: '5', profitAmount: '60000', isProfitDistribute: false },
  { id: 3, projectName: 'Gamma Agro Industries', investorName: 'Tanvir Ahmed', investmentAmount: '300000', profitPercent: '3', profitAmount: '9000', isProfitDistribute: true },
  { id: 4, projectName: 'Delta Logistics', investorName: 'ABC Ltd', investmentAmount: '60000', profitPercent: '5', profitAmount: '3000', isProfitDistribute: true },
  { id: 5, projectName: 'Omega Software', investorName: 'ABC Ltd', investmentAmount: '100000', profitPercent: '5', profitAmount: '5000', isProfitDistribute: false },
  { id: 6, projectName: 'Sigma Energy', investorName: 'Farhana Sultana', investmentAmount: '1000000', profitPercent: '5', profitAmount: '50000', isProfitDistribute: true },
  { id: 7, projectName: 'Theta Pharma', investorName: 'Mahbub Alam', investmentAmount: '0', profitPercent: '8', profitAmount: '0', isProfitDistribute: false },
  { id: 8, projectName: 'Kappa Retail Chain', investorName: 'Sharmin Akter', investmentAmount: '100000', profitPercent: '10', profitAmount: '10000', isProfitDistribute: true },
  { id: 9, projectName: 'Lambda Fintech', investorName: 'Golam Mostafa', investmentAmount: '12500000', profitPercent: '30', profitAmount: '6000000', isProfitDistribute: true },
  { id: 10, projectName: 'Zeta Infrastructure', investorName: 'Nazmul Hossain', investmentAmount: '400000000', profitPercent: '30', profitAmount: '5000000', isProfitDistribute: true },
  { id: 11, projectName: 'Epsilon Media Hub', investorName: 'Rubina Yasmin', investmentAmount: '4500000', profitPercent: '12', profitAmount: '540000', isProfitDistribute: true },
  { id: 12, projectName: 'Phoenix Ventures', investorName: 'Moniruzzaman Khan', investmentAmount: '8500000', profitPercent: '15', profitAmount: '1275000', isProfitDistribute: false }
];

export default function ShareConfigurationPage() {
  const [configs, setConfigs] = useState<ShareConfig[]>(initialConfigs);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<ShareConfig | null>(null);

  // Form state (Matching fields from images: Project, Investor, Investment Amount, If Profit(%), Amount(if Fixed Amount), Is Profit Distribute)
  const [formData, setFormData] = useState<Partial<ShareConfig>>({
    projectName: '',
    investorName: '',
    investmentAmount: '',
    profitPercent: '',
    profitAmount: '',
    isProfitDistribute: false
  });

  // Filtered data based on search input
  const filteredConfigs = configs.filter(item =>
    item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.investorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.investmentAmount.includes(searchQuery)
  );

  // Submit Handler for Add
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig: ShareConfig = {
      id: configs.length + 1,
      projectName: formData.projectName || 'Select value',
      investorName: formData.investorName || '--Select Investor--',
      investmentAmount: formData.investmentAmount || '0',
      profitPercent: formData.profitPercent || '0',
      profitAmount: formData.profitAmount || '0',
      isProfitDistribute: formData.isProfitDistribute || false
    };
    setConfigs([newConfig, ...configs]);
    setIsAddOpen(false);
    resetFormState();
  };

  // Submit Handler for Edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConfig) return;
    setConfigs(configs.map(item => item.id === selectedConfig.id ? { ...item, ...formData } as ShareConfig : item));
    setIsEditOpen(false);
    setSelectedConfig(null);
  };

  // Delete Handler
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this configuration record?')) {
      setConfigs(configs.filter(item => item.id !== id));
    }
  };

  const openEditModal = (config: ShareConfig) => {
    setSelectedConfig(config);
    setFormData({
      projectName: config.projectName,
      investorName: config.investorName,
      investmentAmount: config.investmentAmount,
      profitPercent: config.profitPercent,
      profitAmount: config.profitAmount,
      isProfitDistribute: config.isProfitDistribute
    });
    setIsEditOpen(true);
  };

  const resetFormState = () => {
    setFormData({
      projectName: '',
      investorName: '',
      investmentAmount: '',
      profitPercent: '',
      profitAmount: '',
      isProfitDistribute: false
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Breadcrumb and Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mb-1">
              <span>Home</span> / <span className="text-indigo-600 font-medium">Share Configuration Settings</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Share Configuration Management</h1>
          </div>
          <button
            onClick={() => { resetFormState(); setIsAddOpen(true); }}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Configuration
          </button>
        </div>

        {/* Controls: Show Entries & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-slate-600">Search:</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search configurations..."
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Modern Data Table (Matching headers from Image 6th: SL NO, PROJECT NAME, INVESTOR NAME, INVESTMENT AMOUNT, PROFIT PERCENT, PROFIT AMOUNT, ACTION) */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-indigo-600 text-white font-medium text-xs tracking-wider uppercase">
                  <th className="py-3 px-4">SL NO</th>
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Investor Name</th>
                  <th className="py-3 px-4">Investment Amount</th>
                  <th className="py-3 px-4">Profit Percent</th>
                  <th className="py-3 px-4">Profit Amount</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredConfigs.length > 0 ? (
                  filteredConfigs.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-600">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{item.projectName}</td>
                      <td className="py-3 px-4 font-semibold text-indigo-600">{item.investorName}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-700">{item.investmentAmount}</td>
                      <td className="py-3 px-4 text-slate-600">{item.profitPercent}</td>
                      <td className="py-3 px-4 font-mono text-xs text-emerald-600 font-medium">{item.profitAmount}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center justify-center gap-1.5">
                          {/* Edit Action Button */}
                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit Configuration"
                            className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-md transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* Delete Action Button */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete Configuration"
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-slate-400 font-medium">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500">
            <div>Showing 1 to {Math.min(entriesPerPage, filteredConfigs.length)} of {filteredConfigs.length} entries</div>
            <div className="inline-flex items-center gap-1">
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 rounded border border-indigo-600 bg-indigo-600 text-white font-medium">1</button>
              <button disabled className="px-3 py-1 rounded border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT CONFIGURATION FORM (Exact Spec matching Image 1st, 2nd & 3rd Layout) ================= */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                {isAddOpen ? 'Add New Configuration' : 'Edit Configuration'}
              </h3>
              <button 
                onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddOpen ? handleAddSubmit : handleEditSubmit} className="p-6 space-y-6">
              {/* Form Layout matching Image 1st & 2nd specification */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Project */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project</label>
                  <select
                    value={formData.projectName || ''}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Select value</option>
                    <option value="Alpha Tech Park">Alpha Tech Park</option>
                    <option value="Beta Real Estate">Beta Real Estate</option>
                    <option value="Gamma Agro Industries">Gamma Agro Industries</option>
                    <option value="Delta Logistics">Delta Logistics</option>
                  </select>
                </div>

                {/* Investor */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Investor</label>
                  <select
                    value={formData.investorName || ''}
                    onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">-- Select Investor --</option>
                    <option value="AGB">AGB</option>
                    <option value="ABC Ltd">ABC Ltd</option>
                    <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                    <option value="Farhana Sultana">Farhana Sultana</option>
                    <option value="Mahbub Alam">Mahbub Alam</option>
                  </select>
                </div>

                {/* Investment Amount */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Investment Amount</label>
                  <input
                    type="text"
                    placeholder="20000000"
                    value={formData.investmentAmount || ''}
                    onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* If Profit(%) */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">If Profit(%)</label>
                  <input
                    type="text"
                    placeholder="10"
                    value={formData.profitPercent || ''}
                    onChange={(e) => setFormData({ ...formData, profitPercent: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Amount(if Fixed Amount) */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Amount(if Fixed Amount)</label>
                  <input
                    type="text"
                    placeholder="value"
                    value={formData.profitAmount || ''}
                    onChange={(e) => setFormData({ ...formData, profitAmount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Is Profit Distribute Checkbox */}
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.isProfitDistribute || false}
                      onChange={(e) => setFormData({ ...formData, isProfitDistribute: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Is Profit Distribute
                  </label>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                  className="px-5 py-2 bg-slate-400 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
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