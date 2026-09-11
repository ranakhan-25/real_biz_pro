'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronRight, 
  Home, 
  Save, 
  Layers, 
  ChevronDown, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Building2
} from 'lucide-react';

export interface ServiceRequisitionItem {
  id: string;
  projectType: string;
  project: string;
  code: string;
  date: string;
  grandTotal: string;
  addedBy: string;
  approvalLayer: string[];
}

const initialServiceData: ServiceRequisitionItem[] = [
  { id: '1', projectType: 'Real Estate', project: 'Hena Heights', code: 'SR00001', date: '09/10/2026', grandTotal: '150,000 BDT', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'] },
  { id: '2', projectType: 'Office', project: 'Rifat Eyecon City', code: 'SR00002', date: '08/10/2026', grandTotal: '85,500 BDT', addedBy: 'Tazmul Reza', approvalLayer: ['✔ Rifat Hosain', '✔ Admin'] },
  { id: '3', projectType: 'Commercial', project: 'Silicon City Mall', code: 'SR00003', date: '07/10/2026', grandTotal: '240,000 BDT', addedBy: 'Admin', approvalLayer: ['✔ All Approvals Completed'] },
  { id: '4', projectType: 'Real Estate', project: 'Green Valley Tower', code: 'SR00004', date: '06/10/2026', grandTotal: '115,000 BDT', addedBy: 'Shamim Khan', approvalLayer: ['⏳ Pending Project Head'] },
  { id: '5', projectType: 'Industrial', project: 'Apex Logistics Hub', code: 'SR00005', date: '05/10/2026', grandTotal: '450,000 BDT', addedBy: 'Tanvir Ahmed', approvalLayer: ['✔ All Approvals Completed'] },
  { id: '6', projectType: 'Commercial', project: 'Metro Shopping Plaza', code: 'SR00006', date: '04/10/2026', grandTotal: '92,000 BDT', addedBy: 'Admin', approvalLayer: ['✔ Accounts Dept', '⏳ Managing Director'] },
  { id: '7', projectType: 'Real Estate', project: 'Skyline Orchid', code: 'SR00007', date: '03/10/2026', grandTotal: '310,000 BDT', addedBy: 'Tazmul Reza', approvalLayer: ['✔ All Approvals Completed'] }
];

export default function ServiceRequisitionModule() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [requisitions, setRequisitions] = useState<ServiceRequisitionItem[]>(initialServiceData);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Form State for New Service Requisition
  const [formData, setFormData] = useState({
    date: '09/10/2026',
    code: 'SR00008',
    projectType: 'Real Estate',
    project: 'Hena Heights',
    titleWork: 'Foundation & Piling Service',
    task: 'Deep Excavation & Soil Testing',
    site: 'Site A - Main Block (North Wing)',
    serviceItem: 'Heavy Duty Crane Rental & Operator',
    qtyDays: '5',
    rate: '30000',
    details: 'Daily heavy excavation machinery usage including fuel and certified safety operators.'
  });

  const filteredData = requisitions.filter(item => 
    item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.addedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ServiceRequisitionItem = {
      id: Date.now().toString(),
      projectType: formData.projectType,
      project: formData.project,
      code: formData.code,
      date: formData.date,
      grandTotal: `${(Number(formData.qtyDays) * Number(formData.rate)).toLocaleString()} BDT`,
      addedBy: 'Shamim Khan',
      approvalLayer: ['⏳ Pending Department Head']
    };
    setRequisitions([newItem, ...requisitions]);
    setViewMode('list');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this service requisition?')) {
      setRequisitions(requisitions.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between p-3 sm:p-5 font-sans">
      <div className="space-y-3 max-w-[1600px] mx-auto w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Requisition Management</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-indigo-600 font-semibold">
            {viewMode === 'list' ? 'Service/Work Requisition List' : 'Service Requisition Form'}
          </span>
        </div>

        {/* Top Header Bar with Toggle Button */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">
                {viewMode === 'list' ? 'Service & Work Requisition Dashboard' : 'Create New Service Requisition Entry'}
              </h1>
              <p className="text-[11px] text-slate-500">
                {viewMode === 'list' 
                  ? 'Monitor, filter, and track all service orders, subcontractor bills, and work approvals in real time.' 
                  : 'Fill up project specifications, contractor details, BOQ items, and submit multi-layer documentation.'}
              </p>
            </div>
          </div>

          <div>
            {viewMode === 'list' ? (
              <button
                type="button"
                onClick={() => setViewMode('create')}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> New Service/Work Requisition
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Requisition List
              </button>
            )}
          </div>
        </div>

        {/* ================= VIEW 1: SERVICE REQUISITION LIST ================= */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
            {/* Stats Row to completely fill up visual space */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pb-2 border-b border-slate-100">
              <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-indigo-600">Total Requisitions</p>
                  <h4 className="text-lg font-bold text-slate-900">{requisitions.length} Entries</h4>
                </div>
                <FileSpreadsheet className="w-8 h-8 text-indigo-400 opacity-60" />
              </div>
              <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-emerald-600">Fully Approved</p>
                  <h4 className="text-lg font-bold text-slate-900">
                    {requisitions.filter(i => i.approvalLayer.some(l => l.includes('Completed'))).length} Active
                  </h4>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-400 opacity-60" />
              </div>
              <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-amber-600">Pending Approvals</p>
                  <h4 className="text-lg font-bold text-slate-900">
                    {requisitions.filter(i => !i.approvalLayer.some(l => l.includes('Completed'))).length} Requests
                  </h4>
                </div>
                <Clock className="w-8 h-8 text-amber-400 opacity-60" />
              </div>
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-blue-600">Active Sites</p>
                  <h4 className="text-lg font-bold text-slate-900">6 Locations</h4>
                </div>
                <Building2 className="w-8 h-8 text-blue-400 opacity-60" />
              </div>
            </div>

            {/* Entries & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
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
                <span>entries per page</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 font-medium">Search:</span>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search project, code, or creator..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
              <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">PROJECT TYPE</th>
                      <th className="py-3 px-3">PROJECT NAME</th>
                      <th className="py-3 px-3">CODE</th>
                      <th className="py-3 px-3">DATE</th>
                      <th className="py-3 px-3">GRAND TOTAL</th>
                      <th className="py-3 px-3">ADDED BY</th>
                      <th className="py-3 px-3">APPROVAL LAYER</th>
                      <th className="py-3 px-3 text-center w-28">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, entriesPerPage).map((item, index) => (
                        <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-slate-500">{index + 1}</td>
                          <td className="py-3 px-3 font-medium text-slate-700">{item.projectType}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{item.project}</td>
                          <td className="py-3 px-3 font-mono text-indigo-700 font-semibold">{item.code}</td>
                          <td className="py-3 px-3 text-slate-600">{item.date}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">{item.grandTotal}</td>
                          <td className="py-3 px-3 font-medium text-slate-700">{item.addedBy}</td>
                          <td className="py-3 px-3">
                            <div className="space-y-0.5 text-[11px]">
                              {item.approvalLayer.map((layer, i) => (
                                <div key={i} className={`font-semibold ${layer.includes('Completed') ? 'text-emerald-600' : 'text-amber-600'}`}>
                                  {layer}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center relative">
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
                                    type="button"
                                    onClick={() => { alert(`Viewing full documentation and history for ${item.code}`); setActiveDropdown(null); }}
                                    className="w-full px-3 py-1.5 text-slate-700 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer font-medium"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-indigo-600" /> View Details
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => { alert(`Editing record ${item.code}`); setActiveDropdown(null); }}
                                    className="w-full px-3 py-1.5 text-slate-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer font-medium"
                                  >
                                    <Edit className="w-3.5 h-3.5 text-amber-600" /> Edit Record
                                  </button>
                                  <button
                                    type="button"
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
                        <td colSpan={9} className="text-center py-12 text-slate-400 font-medium">
                          No service requisition data matching filters.
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
        )}

        {/* ================= VIEW 2: SERVICE REQUISITION FORM ================= */}
        {viewMode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            
            {/* Filter / Top Selection Fields Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Requisition Date</label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Requisition Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Real Estate">Real Estate Construction</option>
                  <option value="Office">Corporate Office Buildout</option>
                  <option value="Commercial">Commercial Mall Development</option>
                  <option value="Industrial">Industrial Warehouse Unit</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Target Project</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Hena Heights">Hena Heights</option>
                  <option value="Rifat Eyecon City">Rifat Eyecon City</option>
                  <option value="Silicon City Mall">Silicon City Mall</option>
                  <option value="Green Valley Tower">Green Valley Tower</option>
                  <option value="Apex Logistics Hub">Apex Logistics Hub</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Title / Name of Work</label>
                <select
                  value={formData.titleWork}
                  onChange={(e) => setFormData({ ...formData, titleWork: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Foundation & Piling Service">Foundation & Piling Service</option>
                  <option value="Interior Architectural Finishing">Interior Architectural Finishing</option>
                  <option value="Electrical & Substation Setup">Electrical & Substation Setup</option>
                  <option value="HVAC Ducting & Ventilation">HVAC Ducting & Ventilation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Task Subcategory</label>
                <input
                  type="text"
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  placeholder="e.g. Excavation Task"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Construction Site</label>
                <input
                  type="text"
                  value={formData.site}
                  onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                  placeholder="e.g. Site A - Main Block"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Select Service or Work Item</label>
                <div className="flex gap-1.5">
                  <select
                    value={formData.serviceItem}
                    onChange={(e) => setFormData({ ...formData, serviceItem: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Heavy Duty Crane Rental & Operator">Heavy Duty Crane Rental & Operator</option>
                    <option value="Architectural Consultant Fee">Architectural Consultant Fee</option>
                    <option value="Labor Supply Subcontract">Labor Supply Subcontract</option>
                    <option value="Soil Compaction & Testing">Soil Compaction & Testing</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => alert('Service specification template loaded into BOQ.')}
                    className="bg-[#5949d6] hover:bg-[#4d3ec2] text-white px-3 py-2 rounded-lg font-semibold flex items-center justify-center cursor-pointer shadow-2xs"
                    title="Add to BOQ"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* BOQ Items Section Header */}
            <div className="w-full bg-[#5949d6] text-white text-xs font-semibold py-2.5 px-4 rounded-t-lg flex items-center justify-between">
              <span>BILL OF QUANTITIES (BOQ) - SERVICE SPECIFICATIONS</span>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded">Active Template</span>
            </div>

            {/* Dynamic Items Table Grid */}
            <div className="border border-slate-200 bg-white rounded-b-xl p-4 space-y-4 shadow-2xs text-xs">
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#8b7ff0] text-white font-semibold text-[11px]">
                      <th className="py-2.5 px-3">DATE</th>
                      <th className="py-2.5 px-3">CODE</th>
                      <th className="py-2.5 px-3">SERVICE / ITEM NAME</th>
                      <th className="py-2.5 px-3">UNIT TYPE</th>
                      <th className="py-2.5 px-3">QTY / DAYS</th>
                      <th className="py-2.5 px-3">RATE (BDT)</th>
                      <th className="py-2.5 px-3">SCOPE DETAILS / REMARKS</th>
                      <th className="py-2.5 px-3">AMOUNT (BDT)</th>
                      <th className="py-2.5 px-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-2 px-3 text-slate-600">{formData.date}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">SRV-01</td>
                      <td className="py-2 px-3 text-slate-800">{formData.serviceItem}</td>
                      <td className="py-2 px-3 text-slate-600">Days / Contract</td>
                      <td className="py-2 px-3">
                        <input 
                          type="number" 
                          value={formData.qtyDays}
                          onChange={(e) => setFormData({ ...formData, qtyDays: e.target.value })}
                          className="w-20 border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 font-medium" 
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="number" 
                          value={formData.rate}
                          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                          className="w-28 border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 font-medium" 
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input 
                          type="text" 
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50" 
                        />
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-900">
                        {(Number(formData.qtyDays || 0) * Number(formData.rate || 0)).toLocaleString()} BDT
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button type="button" onClick={() => alert('Item row cleared')} className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer">
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-2 px-3 text-slate-600">{formData.date}</td>
                      <td className="py-2 px-3 font-mono text-indigo-700 font-semibold">SRV-02</td>
                      <td className="py-2 px-3 text-slate-800">Site Safety Gear & Compliance Check</td>
                      <td className="py-2 px-3 text-slate-600">Lumpsum</td>
                      <td className="py-2 px-3"><input type="number" defaultValue="1" className="w-20 border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50" /></td>
                      <td className="py-2 px-3"><input type="number" defaultValue="15000" className="w-28 border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50" /></td>
                      <td className="py-2 px-3"><input type="text" defaultValue="PPE kits and safety signage setup" className="w-full border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50" /></td>
                      <td className="py-2 px-3 font-bold text-slate-900">15,000 BDT</td>
                      <td className="py-2 px-3 text-center">
                        <button type="button" className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer">
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Attachment Section */}
              <div className="max-w-md ml-auto space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Subtotal Amount :</span>
                  <input 
                    type="text" 
                    readOnly 
                    value={`${((Number(formData.qtyDays || 0) * Number(formData.rate || 0)) + 15000).toLocaleString()} BDT`}
                    className="w-52 bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-bold text-slate-800" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Grand Total Payable :</span>
                  <input 
                    type="text" 
                    readOnly 
                    value={`${((Number(formData.qtyDays || 0) * Number(formData.rate || 0)) + 15000).toLocaleString()} BDT`}
                    className="w-52 bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-bold text-indigo-700 text-sm" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Supporting Attachment :</span>
                  <input 
                    type="file" 
                    className="w-52 text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-lg shadow-sm font-semibold cursor-pointer flex items-center gap-1.5 text-xs"
                  >
                    <Save className="w-4 h-4" /> Submit Requisition For Approval
                  </button>
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}