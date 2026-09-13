'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Home, 
  X, 
  Save, 
  CheckCircle2, 
  FileSpreadsheet, 
  FileText, 
  ArrowRightLeft, 
  Layers, 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2, 
  Paperclip,
  Calendar,
  Building,
  UserCheck
} from 'lucide-react';

export interface RequisitionItem {
  id: string;
  select: boolean;
  projectType: string;
  project: string;
  titleNameOfWork: string;
  code: string;
  ref: string;
  date: string;
  demandDate: string;
  addedBy: string;
  approvalLayer: string[];
  attachment: boolean;
}

const initialRequisitionData: RequisitionItem[] = [
  { id: '1', select: false, projectType: 'Real Estate', project: 'Hena Heights', titleNameOfWork: 'Foundation Work', code: 'taiz00017', ref: 'REF-9921', date: '08 Sept 2026', demandDate: '08 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: true },
  { id: '2', select: false, projectType: 'Office', project: 'Rifat Eyecon City', titleNameOfWork: 'Interior Framing', code: 'taiz00016', ref: 'REF-9920', date: '08 Sept 2026', demandDate: '08 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: false },
  { id: '3', select: false, projectType: 'Office', project: 'Rifat Eyecon City', titleNameOfWork: 'Electrical Wiring', code: 'taiz00015', ref: 'REF-9919', date: '08 Sept 2026', demandDate: '08 Sept 2026', addedBy: 'Tazmul Reza', approvalLayer: ['✔ Rifat Hosain', '✔ Admin'], attachment: true },
  { id: '4', select: false, projectType: 'Office', project: 'Rifat Eyecon City', titleNameOfWork: 'Plumbing Setup', code: 'taiz00014', ref: 'REF-9918', date: '07 Sept 2026', demandDate: '07 Sept 2026', addedBy: 'Tazmul Reza', approvalLayer: ['✔ Rifat Hosain', '✔ Admin'], attachment: true },
  { id: '5', select: false, projectType: 'Office', project: 'Rifat Eyecon City', titleNameOfWork: 'Network Cable Laying', code: 'taiz00013', ref: 'REF-9917', date: '07 Sept 2026', demandDate: '07 Sept 2026', addedBy: 'Tazmul Reza', approvalLayer: ['✔ All Approvals Completed'], attachment: false },
  { id: '6', select: false, projectType: 'Office', project: 'Rifat Eyecon City', titleNameOfWork: 'HVAC Installation', code: 'taiz00012', ref: 'REF-9916', date: '07 Sept 2026', demandDate: '07 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: true },
  { id: '7', select: false, projectType: 'Real Estate', project: 'Hena Heights', titleNameOfWork: 'Bricks Works', code: 'taiz00011', ref: 'REF-9915', date: '05 Sept 2026', demandDate: '10 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: false },
  { id: '8', select: false, projectType: 'Real Estate', project: 'Sheba Eyecon Tower', titleNameOfWork: 'Rod & Cement Supply', code: 'taiz00010', ref: 'REF-9914', date: '03 Sept 2026', demandDate: '03 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: true },
  { id: '9', select: false, projectType: 'Real Estate', project: 'Estern 19', titleNameOfWork: 'Earth Excavation', code: 'taiz00009', ref: 'REF-9913', date: '01 Sept 2026', demandDate: '01 Sept 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: true },
  { id: '10', select: false, projectType: 'Commercial', project: 'Silicon City Mall', titleNameOfWork: 'Glass Partition', code: 'taiz00008', ref: 'REF-9912', date: '30 Aug 2026', demandDate: '05 Sept 2026', addedBy: 'Tazmul Reza', approvalLayer: ['✔ All Approvals Completed'], attachment: false },
  { id: '11', select: false, projectType: 'Residential', project: 'Green Valley', titleNameOfWork: 'Roof Casting Materials', code: 'taiz00007', ref: 'REF-9911', date: '28 Aug 2026', demandDate: '30 Aug 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: true },
  { id: '12', select: false, projectType: 'Commercial', project: 'Beta Tower', titleNameOfWork: 'Generator Fuel Unit', code: 'taiz00006', ref: 'REF-9910', date: '25 Aug 2026', demandDate: '27 Aug 2026', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'], attachment: false }
];

export default function MaterialRequisitionPage() {
  const [requisitions, setRequisitions] = useState<RequisitionItem[]>(initialRequisitionData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);

  // Filters state
  const [dateFilter, setDateFilter] = useState('1 September, 2026 - 30 September, 2026');
  const [companyFilter, setCompanyFilter] = useState('Somikoron IT Ltd');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RequisitionItem | null>(null);

  // Form State for New Requisition
  const [formData, setFormData] = useState({
    projectType: 'Real Estate',
    project: 'Hena Heights',
    titleNameOfWork: '',
    demandDate: '2026-09-15',
    ref: 'REF-9930'
  });

  const handleSelectAll = () => {
    const updatedSelect = !selectAll;
    setSelectAll(updatedSelect);
    setRequisitions(requisitions.map(item => ({ ...item, select: updatedSelect })));
  };

  const handleRowSelect = (id: string) => {
    setRequisitions(requisitions.map(item => item.id === id ? { ...item, select: !item.select } : item));
  };

  const filteredData = requisitions.filter(item => 
    item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.titleNameOfWork.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.addedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: RequisitionItem = {
      id: Date.now().toString(),
      select: false,
      projectType: formData.projectType,
      project: formData.project,
      titleNameOfWork: formData.titleNameOfWork || 'General Material Work',
      code: `taiz000${Math.floor(10 + Math.random() * 90)}`,
      ref: formData.ref,
      date: '10 Sept 2026',
      demandDate: formData.demandDate,
      addedBy: 'Shamim Khan',
      approvalLayer: ['✔ All Approvals Completed'],
      attachment: true
    };
    setRequisitions([newItem, ...requisitions]);
    setIsAddOpen(false);
    setFormData({ projectType: 'Real Estate', project: 'Hena Heights', titleNameOfWork: '', demandDate: '2026-09-15', ref: 'REF-9930' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this requisition?')) {
      setRequisitions(requisitions.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
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
          <span className="text-slate-600">Requisition</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">Material Requisition List</span>
        </div>

        {/* Top Header & Buttons Bar */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" /> Material Requisition Dashboard
            </h1>
            <p className="text-[11px] text-slate-500">Manage, convert, and track all construction & office material requisitions.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Multiple PO Convert
            </button>
            <button className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> Multiple RFQ Convert
            </button>
            <button className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold px-3 py-2 rounded-lg shadow-sm transition-all cursor-pointer">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Multiple Purchase Convert
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> +New Material Requisition
            </button>
          </div>
        </div>

        {/* Filter Section (Matching Screenshot) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Select Date</label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Company</label>
            <div className="relative">
              <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Somikoron IT Ltd">Somikoron IT Ltd</option>
                <option value="Tazmul Enterprise">Tazmul Enterprise</option>
                <option value="Eyecon Builders">Eyecon Builders</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Supplier</label>
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select an option</option>
              <option value="Supplier A">Alpha Steel & Rod Ltd</option>
              <option value="Supplier B">Beta Cement Industries</option>
              <option value="Supplier C">Global Electric Works</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Project</label>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select value</option>
              <option value="Hena Heights">Hena Heights</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
              <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
            </select>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block font-semibold text-slate-600 mb-1">Title/Name of Work</label>
            <select
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Title/Name of Work</option>
              <option value="Foundation Work">Foundation Work</option>
              <option value="Interior Framing">Interior Framing</option>
              <option value="Bricks Works">Bricks Works</option>
              <option value="Electrical Wiring">Electrical Wiring</option>
            </select>
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
                placeholder="Search project, code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                  <th className="py-3 px-3 w-12">ID</th>
                  <th className="py-3 px-3 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectAll} 
                      onChange={handleSelectAll}
                      className="rounded border-white/40 cursor-pointer accent-indigo-700 w-3.5 h-3.5"
                    />
                  </th>
                  <th className="py-3 px-3">PROJECT TYPE</th>
                  <th className="py-3 px-3">PROJECT</th>
                  <th className="py-3 px-3">TITLE/NAME OF WORK</th>
                  <th className="py-3 px-3">CODE</th>
                  <th className="py-3 px-3">REF</th>
                  <th className="py-3 px-3">DATE</th>
                  <th className="py-3 px-3">DEMAND DATE</th>
                  <th className="py-3 px-3">ADDED BY</th>
                  <th className="py-3 px-3">APPROVAL LAYER</th>
                  <th className="py-3 px-3 text-center">ATTACHMENT</th>
                  <th className="py-3 px-3 text-center w-28">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.slice(0, entriesPerPage).map((item, index) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-600">{index + 1}</td>
                      <td className="py-3 px-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={item.select} 
                          onChange={() => handleRowSelect(item.id)}
                          className="rounded border-slate-300 cursor-pointer accent-indigo-600 w-3.5 h-3.5"
                        />
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">{item.projectType}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{item.project}</td>
                      <td className="py-3 px-3 text-slate-600 italic">{item.titleNameOfWork || 'N/A'}</td>
                      <td className="py-3 px-3 font-mono text-indigo-700 font-semibold">{item.code}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{item.ref}</td>
                      <td className="py-3 px-3 text-slate-600">{item.date}</td>
                      <td className="py-3 px-3 text-slate-600">{item.demandDate}</td>
                      <td className="py-3 px-3 font-medium text-slate-700">{item.addedBy}</td>
                      <td className="py-3 px-3">
                        <div className="space-y-0.5 text-[11px]">
                          {item.approvalLayer.map((layer, i) => (
                            <div key={i} className={`font-semibold ${layer.includes('Completed') ? 'text-emerald-600' : 'text-slate-600'}`}>
                              {layer}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {item.attachment ? (
                          <span className="inline-flex items-center justify-center p-1 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 shadow-2xs">
                            <Paperclip className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center relative">
                        {/* Action Dropdown Button matching screenshot */}
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                            className="inline-flex items-center gap-1 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-3 py-1.5 rounded shadow-2xs transition-colors cursor-pointer"
                          >
                            Action <ChevronDown className="w-3 h-3" />
                          </button>

                          {activeDropdown === item.id && (
                            <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-xl z-20 py-1 text-left text-xs">
                              <button
                                onClick={() => { setSelectedItem(item); setIsViewModalOpen(true); setActiveDropdown(null); }}
                                className="w-full px-3 py-1.5 text-slate-700 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer font-medium"
                              >
                                <Eye className="w-3.5 h-3.5 text-indigo-600" /> View Details
                              </button>
                              <button
                                onClick={() => { alert(`Editing Requisition: ${item.code}`); setActiveDropdown(null); }}
                                className="w-full px-3 py-1.5 text-slate-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer font-medium"
                              >
                                <Edit className="w-3.5 h-3.5 text-amber-600" /> Edit Record
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="w-full px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer font-medium"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-600" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={13} className="text-center py-12 text-slate-400 font-medium">
                      No requisition data available in table
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

      {/* ================= MODAL: +NEW MATERIAL REQUISITION FORM ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-[#5949d6] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create New Material Requisition
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Type *</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Office">Office</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Name *</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Hena Heights">Hena Heights</option>
                    <option value="Rifat Eyecon City">Rifat Eyecon City</option>
                    <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                    <option value="Estern 19">Estern 19</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Title / Name of Work *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleNameOfWork}
                    onChange={(e) => setFormData({ ...formData, titleNameOfWork: e.target.value })}
                    placeholder="e.g. Foundation & Rod Work"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Demand Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.demandDate}
                    onChange={(e) => setFormData({ ...formData, demandDate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Reference Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.ref}
                    onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
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
                  <Save className="w-4 h-4" /> Save Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: VIEW DETAILS ================= */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" /> Requisition Details: {selectedItem.code}
              </h3>
              <button type="button" onClick={() => setIsViewModalOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Project Name:</span>
                  <span className="font-bold text-slate-800">{selectedItem.project}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Project Type:</span>
                  <span className="font-bold text-slate-800">{selectedItem.projectType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Title of Work:</span>
                  <span className="font-bold text-slate-800">{selectedItem.titleNameOfWork}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Reference:</span>
                  <span className="font-mono font-bold text-indigo-700">{selectedItem.ref}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Demand Date:</span>
                  <span className="font-bold text-slate-800">{selectedItem.demandDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Added By:</span>
                  <span className="font-bold text-slate-800">{selectedItem.addedBy}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Approval Status:</span>
                  <span className="font-bold text-emerald-600">{selectedItem.approvalLayer.join(', ')}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}