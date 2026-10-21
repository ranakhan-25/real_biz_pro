'use client';

import React, { useState, useMemo } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  Calendar,
  DollarSign,
  User,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  PauseCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  X,
  Upload,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building,
  Layers,
  LayoutGrid,
  Users,
  FileCheck,
  Flag,
  ListTodo,
  PieChart,
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

type ProjectStatus = 'planning' | 'active' | 'onhold' | 'completed' | 'cancelled';
type ProjectType = 'Residential' | 'Commercial' | 'Infrastructure' | 'Industrial' | 'Mixed-Use';

interface ProjectMaster {
  uuid: string;
  code: string;
  name: string;
  type: ProjectType;
  site: string;
  manager: string;
  start_date: string;
  end_date: string;
  budget: number;
  actual_cost: number;
  progress: number;
  description: string;
  status: ProjectStatus;
  cover_image?: string;
  open_issues: number;
  team: string[];
}

const initialProjects: ProjectMaster[] = [
  {
    uuid: 'p-101',
    code: 'PRJ-2026-001',
    name: 'Metro Commercial Heights',
    type: 'Commercial',
    site: 'Dhaka North Zone Site A',
    manager: 'Tanvir Ahmed',
    start_date: '2026-01-15',
    end_date: '2027-06-30',
    budget: 4500000.00,
    actual_cost: 1850000.00,
    progress: 42,
    description: 'A modern 22-storey commercial tower featuring Grade-A office spaces and green building compliance.',
    status: 'active',
    open_issues: 3,
    team: ['Tanvir A.', 'Shamim K.', 'Farhana R.', 'Abdur R.']
  },
  {
    uuid: 'p-102',
    code: 'PRJ-2026-002',
    name: 'Green Villa Residential Enclave',
    type: 'Residential',
    site: 'Chittagong Coastal Sector 4',
    manager: 'Shamim Khan',
    start_date: '2026-03-01',
    end_date: '2028-02-28',
    budget: 8200000.00,
    actual_cost: 7200000.00,
    progress: 88,
    description: 'Luxury gated community project consisting of 40 individual villas and shared recreational facilities.',
    status: 'active',
    open_issues: 1,
    team: ['Shamim K.', 'Zubair H.', 'Tanvir A.']
  },
  {
    uuid: 'p-103',
    code: 'PRJ-2026-003',
    name: 'East-West Expressway Interchange',
    type: 'Infrastructure',
    site: 'Gazipur Highway Extension',
    manager: 'Rahim Uddin',
    start_date: '2025-11-10',
    end_date: '2026-08-15',
    budget: 12500000.00,
    actual_cost: 12100000.00,
    progress: 95,
    description: 'High-density highway flyover connection with heavy reinforced concrete structures.',
    status: 'completed',
    open_issues: 0,
    team: ['Rahim U.', 'Nadia S.']
  },
  {
    uuid: 'p-104',
    code: 'PRJ-2026-004',
    name: 'Logistics Park & Storage Silos',
    type: 'Industrial',
    site: 'Narayanganj Riverfront Depot',
    manager: 'Farhana Rahman',
    start_date: '2026-05-01',
    end_date: '2027-11-30',
    budget: 3100000.00,
    actual_cost: 250000.00,
    progress: 15,
    description: 'Automated warehouse facility with climate-controlled cold storage zones.',
    status: 'planning',
    open_issues: 5,
    team: ['Farhana R.', 'Tanvir A.']
  },
  {
    uuid: 'p-105',
    code: 'PRJ-2026-005',
    name: 'Riverfront City Mixed Township',
    type: 'Mixed-Use',
    site: 'Sylhet Sadar Block B',
    manager: 'Zubair Hossain',
    start_date: '2026-02-01',
    end_date: '2029-01-01',
    budget: 18000000.00,
    actual_cost: 2100000.00,
    progress: 20,
    description: 'Integrated township featuring residential apartments, retail shopping plazas, and school zones.',
    status: 'onhold',
    open_issues: 8,
    team: ['Zubair H.', 'Shamim K.', 'Rahim U.']
  }
];

export default function ProjectMasterPage() {
  const [projects, setProjects] = useState<ProjectMaster[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterManager, setFilterManager] = useState<string>('All');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modal Control States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewProject, setViewProject] = useState<ProjectMaster | null>(null);
  const [editProject, setEditProject] = useState<ProjectMaster | null>(null);

  // Form State for Creation
  const [formData, setFormData] = useState({
    code: `PRJ-2026-00${initialProjects.length + 1}`,
    name: '',
    type: 'Residential' as ProjectType,
    site: '',
    manager: 'Tanvir Ahmed',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    budget: '',
    description: '',
    status: 'planning' as ProjectStatus,
    cover_image: ''
  });

  const managersList = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.manager)))], [projects]);
  const typesList = useMemo(() => ['All', 'Residential', 'Commercial', 'Infrastructure', 'Industrial', 'Mixed-Use'], []);
  const statusesList = useMemo(() => ['All', 'planning', 'active', 'onhold', 'completed', 'cancelled'], []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.site.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filterType === 'All' || p.type === filterType;
      const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
      const matchesManager = filterManager === 'All' || p.manager === filterManager;

      const matchesFromDate = !fromDate || new Date(p.start_date) >= new Date(fromDate);
      const matchesToDate = !toDate || new Date(p.end_date) <= new Date(toDate);

      return matchesSearch && matchesType && matchesStatus && matchesManager && matchesFromDate && matchesToDate;
    });
  }, [projects, searchQuery, filterType, filterStatus, filterManager, fromDate, toDate]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status === 'active').length;
    const planning = projects.filter(p => p.status === 'planning').length;
    const totalBudget = projects.reduce((acc, curr) => acc + curr.budget, 0);
    const avgProgress = Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / (total || 1));
    return { total, active, planning, totalBudget, avgProgress };
  }, [projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code || !formData.start_date || !formData.budget) {
      alert('Please fill in all mandatory fields (*)');
      return;
    }

    const budgetNum = parseFloat(formData.budget) || 0;

    const newProject: ProjectMaster = {
      uuid: `p-${Date.now()}`,
      code: formData.code,
      name: formData.name,
      type: formData.type,
      site: formData.site || 'Main Site Base',
      manager: formData.manager,
      start_date: formData.start_date,
      end_date: formData.end_date || formData.start_date,
      budget: budgetNum,
      actual_cost: 0,
      progress: formData.status === 'active' ? 10 : 0,
      description: formData.description,
      status: formData.status,
      open_issues: 0,
      team: [formData.manager, 'Admin User']
    };

    setProjects([newProject, ...projects]);
    setIsCreateModalOpen(false);

    setFormData({
      code: `PRJ-2026-00${projects.length + 2}`,
      name: '',
      type: 'Residential',
      site: '',
      manager: 'Tanvir Ahmed',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      budget: '',
      description: '',
      status: 'planning',
      cover_image: ''
    });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProject) return;

    setProjects(projects.map(p => p.uuid === editProject.uuid ? editProject : p));
    setEditProject(null);
  };

  const renderStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Active
          </span>
        );
      case 'planning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> Planning
          </span>
        );
      case 'onhold':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <PauseCircle className="w-3.5 h-3.5" /> On Hold
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 p-6 lg:p-8 font-sans">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center text-sm text-slate-500 space-x-2 mb-1">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="hover:text-blue-600 cursor-pointer">Projects</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-800">Project Master</span>
          </nav>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2.5">
            <FolderKanban className="w-7 h-7 text-blue-600" /> Project Master Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Create Project Master
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Projects</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</h3>
            <p className="text-xs text-blue-600 mt-1 font-medium">{stats.active} Active in progress</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Portfolio Budget</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">${(stats.totalBudget / 1000000).toFixed(2)}M</h3>
            <p className="text-xs text-emerald-600 mt-1 font-medium">Allocated across {stats.total} projects</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Portfolio Progress</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.avgProgress}%</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Overall milestone execution</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Planning Stage</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.planning}</h3>
            <p className="text-xs text-amber-600 mt-1 font-medium">Pending site initiation</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" /> Search & Filter Projects
          </span>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('All');
              setFilterStatus('All');
              setFilterManager('All');
              setFromDate('');
              setToDate('');
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Code, Name, Site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            >
              <option value="All">Type: All</option>
              {typesList.filter(t => t !== 'All').map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            >
              <option value="All">Status: All</option>
              {statusesList.filter(s => s !== 'All').map((s, idx) => (
                <option key={idx} value={s}>{s.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterManager}
              onChange={(e) => setFilterManager(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            >
              <option value="All">Manager: All</option>
              {managersList.filter(m => m !== 'All').map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="date"
              title="Start Date From"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-2.5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Excel Export
            </button>
            <button className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs">
              <FileText className="w-3.5 h-3.5" /> PDF Summary
            </button>
            <span className="text-xs text-slate-500 ml-2">Showing <strong className="text-slate-800">{filteredProjects.length}</strong> items</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Per page:</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-600"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Project Name</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Site Location</th>
                <th className="py-3.5 px-4">Manager</th>
                <th className="py-3.5 px-4">Budget ($)</th>
                <th className="py-3.5 px-4">Start / End Date</th>
                <th className="py-3.5 px-4 w-36">Progress</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((proj) => (
                  <tr key={proj.uuid} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-blue-600 whitespace-nowrap">{proj.code}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{proj.name}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{proj.type}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px]" title={proj.site}>{proj.site}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        {proj.manager}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                      ${proj.budget.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>S: {proj.start_date}</span>
                        <span className="text-slate-400">E: {proj.end_date}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            proj.progress >= 80 ? 'bg-emerald-500' : proj.progress >= 40 ? 'bg-blue-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${proj.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-[11px] font-bold text-slate-600 mt-1 text-right">{proj.progress}%</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">{renderStatusBadge(proj.status)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* VIEW ACTION TRIGGER */}
                        <button
                          onClick={() => setViewProject(proj)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="View Project Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {/* EDIT ACTION TRIGGER */}
                        <button
                          onClick={() => setEditProject({ ...proj })}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                          title="Edit Project Master"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* DELETE ACTION TRIGGER */}
                        <button
                          onClick={() => setProjects(projects.filter(p => p.uuid !== proj.uuid))}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No Project Master records found matching your active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CREATE PROJECT MODAL FORM                                              */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Create New Project Master</h2>
                  <p className="text-xs text-slate-500">Add an industry-standard ERP project entry</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Code <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="code"
                    required
                    value={formData.code}
                    onChange={handleInputChange}
                    className="bg-slate-50 border border-slate-200 font-mono text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Skyline Tower Phase 1"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Type <span className="text-rose-500">*</span></label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Site Location</label>
                  <input
                    type="text"
                    name="site"
                    placeholder="e.g. Sector 7, Uttara, Dhaka"
                    value={formData.site}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Manager</label>
                  <input
                    type="text"
                    name="manager"
                    value={formData.manager}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Total Budget ($) <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    name="budget"
                    required
                    placeholder="5000000"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Start Date <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    name="start_date"
                    required
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Scope of work and overview..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                  Save Project Master
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW PROJECT DETAILS MODAL / DRAWER                                    */}
      {/* ========================================================================= */}
      {viewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{viewProject.name}</h2>
                  <p className="text-xs font-mono text-blue-600">{viewProject.code}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewProject(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Type:</span>
                  <p className="font-bold text-slate-800">{viewProject.type}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Status:</span>
                  <div className="mt-0.5">{renderStatusBadge(viewProject.status)}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Manager:</span>
                  <p className="font-bold text-slate-800">{viewProject.manager}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Site Location:</span>
                  <p className="font-bold text-slate-800">{viewProject.site}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Budget:</span>
                  <p className="font-mono font-bold text-slate-900">${viewProject.budget.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Progress:</span>
                  <p className="font-mono font-bold text-blue-600">{viewProject.progress}%</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Project Description</h4>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">{viewProject.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-1.5">Assigned Team Members</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewProject.team.map((member, i) => (
                    <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setViewProject(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. EDIT PROJECT MODAL FORM                                                */}
      {/* ========================================================================= */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Edit Project Master</h2>
                  <p className="text-xs font-mono text-slate-500">{editProject.code}</p>
                </div>
              </div>
              <button 
                onClick={() => setEditProject(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={editProject.name}
                    onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Status</label>
                  <select
                    value={editProject.status}
                    onChange={(e) => setEditProject({ ...editProject, status: e.target.value as ProjectStatus })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  >
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="onhold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Site Location</label>
                  <input
                    type="text"
                    value={editProject.site}
                    onChange={(e) => setEditProject({ ...editProject, site: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Project Manager</label>
                  <input
                    type="text"
                    value={editProject.manager}
                    onChange={(e) => setEditProject({ ...editProject, manager: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    value={editProject.budget}
                    onChange={(e) => setEditProject({ ...editProject, budget: parseFloat(e.target.value) || 0 })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editProject.progress}
                    onChange={(e) => setEditProject({ ...editProject, progress: parseInt(e.target.value) || 0 })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full font-mono focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editProject.description}
                  onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditProject(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}