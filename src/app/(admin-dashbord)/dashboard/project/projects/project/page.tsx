"use client";

import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  SlidersHorizontal,
  Home,
  Copy,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
  PhoneCall,
  User,
  Building2,
  MapPin,
  Tag,
  Clock,
  Layers,
  DollarSign
} from "lucide-react";

interface ProjectItem {
  id: number;
  durationFrom: string;
  durationTo: string;
  projectType: string;
  projectManager: string;
  customer: string;
  code: string;
  name: string;
  budget: string;
  storeys: string;
  description: string;
  location: string;
  status: string;
  area: string;
  assignUsers: string[];
  startDate: string;
  endDate: string;
  contactPerson: string;
  contactPhone: string;
  clientEmail: string;
  contractor: string;
  progress: number;
}

const staticProjects: ProjectItem[] = [
  {
    id: 1,
    durationFrom: "01 Sep 2026",
    durationTo: "31 Dec 2026",
    projectType: "Office",
    projectManager: "Shamim Khan",
    customer: "Internal Dept",
    code: "P5587198",
    name: "Head Office Tower",
    budget: "8500000",
    storeys: "12",
    description: "Corporate headquarters expansion and interior setup.",
    location: "Motijheel C/A, Dhaka",
    status: "Active",
    area: "Central",
    assignUsers: ["Admin", "Shamim Khan"],
    startDate: "01/09/2026",
    endDate: "31/12/2026",
    contactPerson: "Shamim Khan",
    contactPhone: "+8801700000000",
    clientEmail: "head office@domain.com",
    contractor: "BuildTech Ltd",
    progress: 45
  },
  {
    id: 2,
    durationFrom: "15 Aug 2026",
    durationTo: "30 Nov 2027",
    projectType: "Commercial",
    projectManager: "Tanvir Ahmed",
    customer: "Metro Group",
    code: "P7741209",
    name: "Metro Shopping Complex",
    budget: "45000000",
    storeys: "18",
    description: "Multi-storied commercial mall with basement parking.",
    location: "Agrabad, Chattogram",
    status: "Active",
    area: "Commercial",
    assignUsers: ["Admin", "Tanvir"],
    startDate: "15/08/2026",
    endDate: "30/11/2027",
    contactPerson: "Tanvir Ahmed",
    contactPhone: "+8801822222222",
    clientEmail: "contact@metrogroup.com",
    contractor: "Structure Experts",
    progress: 20
  },
  {
    id: 3,
    durationFrom: "01 Jul 2026",
    durationTo: "15 Oct 2026",
    projectType: "Industrial",
    projectManager: "Rahim Uddin",
    customer: "Apex Apparel",
    code: "P9923411",
    name: "Apex Textile Warehouse",
    budget: "12000000",
    storeys: "4",
    description: "Large scale industrial fabric storage unit.",
    location: "EPZ, Gazipur",
    status: "Pending",
    area: "Industrial",
    assignUsers: ["Admin", "Rahim"],
    startDate: "01/07/2026",
    endDate: "15/10/2026",
    contactPerson: "Rahim Uddin",
    contactPhone: "+8801933333333",
    clientEmail: "info@apexapparel.com",
    contractor: "Skyline Builders",
    progress: 80
  },
  {
    id: 4,
    durationFrom: "10 Jan 2026",
    durationTo: "10 Jun 2026",
    projectType: "Residential",
    projectManager: "Nusrat Jahan",
    customer: "Private Owner",
    code: "P1104822",
    name: "Green Valley Duplex",
    budget: "9500000",
    storeys: "3",
    description: "Eco-friendly modern luxury duplex home.",
    location: "Uttara Sector 4",
    status: "Completed",
    area: "North",
    assignUsers: ["Admin", "Nusrat"],
    startDate: "10/01/2026",
    endDate: "10/06/2026",
    contactPerson: "Nusrat Jahan",
    contactPhone: "+8801644444444",
    clientEmail: "nusrat@gmail.com",
    contractor: "Green Living",
    progress: 100
  },
  {
    id: 5,
    durationFrom: "05 Sep 2026",
    durationTo: "21 Dec 2027",
    projectType: "Real Estate",
    projectManager: "Mohin Uddin",
    customer: "Hena Properties",
    code: "P8005133",
    name: "Hena Heights Luxury",
    budget: "25000000",
    storeys: "70",
    description: "Luxury apartment building with rooftop helipad.",
    location: "Bashundhara R/A",
    status: "Active",
    area: "North",
    assignUsers: ["Admin", "Mohin"],
    startDate: "05/09/2026",
    endDate: "21/12/2027",
    contactPerson: "Tazmul Reza",
    contactPhone: "+8801811111111",
    clientEmail: "sales@henaheights.com",
    contractor: "Prime Builders",
    progress: 15
  },
  {
    id: 6,
    durationFrom: "07 Sep 2026",
    durationTo: "31 Dec 2030",
    projectType: "Office",
    projectManager: "Rifat Hosain",
    customer: "Eyecon Tech",
    code: "P6317184",
    name: "Rifat Eyecon City",
    budget: "15000000",
    storeys: "59",
    description: "Commercial IT Park and Data Center hub.",
    location: "Gulshan-2, Dhaka",
    status: "Active",
    area: "Commercial",
    assignUsers: ["Admin", "Rifat"],
    startDate: "09/07/2026",
    endDate: "31/12/2030",
    contactPerson: "Rifat Hosain",
    contactPhone: "+8801922222222",
    clientEmail: "admin@eyeconcity.io",
    contractor: "Tech Infra Corp",
    progress: 30
  },
];

export default function StaticProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(staticProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedArea, setSelectedArea] = useState("All Area");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    projectType: "Office",
    projectManager: "",
    customer: "",
    code: "P" + Math.floor(1000000 + Math.random() * 9000000),
    projectName: "",
    description: "",
    budget: "",
    location: "",
    status: "Active",
    area: "Central",
    storeys: "",
    startDate: "09/07/2026",
    endDate: "31/12/2030",
    contactPerson: "",
    contactPhone: "",
    clientEmail: "",
    contractor: "",
    progress: 10
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      projectType: "Office",
      projectManager: "",
      customer: "",
      code: "P" + Math.floor(1000000 + Math.random() * 9000000),
      projectName: "",
      description: "",
      budget: "",
      location: "",
      status: "Active",
      area: "Central",
      storeys: "",
      startDate: "09/07/2026",
      endDate: "31/12/2030",
      contactPerson: "",
      contactPhone: "",
      clientEmail: "",
      contractor: "",
      progress: 10
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      projectType: project.projectType,
      projectManager: project.projectManager,
      customer: project.customer,
      code: project.code,
      projectName: project.name,
      description: project.description,
      budget: project.budget,
      location: project.location,
      status: project.status,
      area: project.area,
      storeys: project.storeys,
      startDate: project.startDate,
      endDate: project.endDate,
      contactPerson: project.contactPerson,
      contactPhone: project.contactPhone,
      clientEmail: project.clientEmail,
      contractor: project.contractor,
      progress: project.progress
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? {
        ...p,
        projectType: formData.projectType,
        projectManager: formData.projectManager || "N/A",
        customer: formData.customer || "N/A",
        code: formData.code,
        name: formData.projectName,
        description: formData.description,
        budget: formData.budget,
        location: formData.location,
        status: formData.status,
        area: formData.area,
        storeys: formData.storeys,
        startDate: formData.startDate,
        endDate: formData.endDate,
        durationFrom: formData.startDate,
        durationTo: formData.endDate,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        clientEmail: formData.clientEmail,
        contractor: formData.contractor,
        progress: Number(formData.progress)
      } : p));
    } else {
      const newEntry: ProjectItem = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        durationFrom: formData.startDate,
        durationTo: formData.endDate,
        projectType: formData.projectType,
        projectManager: formData.projectManager || "N/A",
        customer: formData.customer || "N/A",
        code: formData.code,
        name: formData.projectName,
        budget: formData.budget,
        storeys: formData.storeys,
        description: formData.description,
        location: formData.location,
        status: formData.status,
        area: formData.area,
        assignUsers: ["Admin"],
        startDate: formData.startDate,
        endDate: formData.endDate,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        clientEmail: formData.clientEmail,
        contractor: formData.contractor,
        progress: Number(formData.progress)
      };
      setProjects([newEntry, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const filteredProjects = projects.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;
    const matchesArea = selectedArea === "All Area" || item.area === selectedArea;
    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 font-sans text-slate-800">
      
      {/* Breadcrumb */}
      <nav className="mb-3 flex items-center text-xs font-medium text-slate-500">
        <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
          <Home className="h-3.5 w-3.5" /> Home
        </a>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-indigo-600 font-semibold">Projects Management</span>
      </nav>

      {/* Top Filter Panel */}
      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Filter by Status</label>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Filter by Area</label>
          <select 
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option>All Area</option>
            <option>Central</option>
            <option>North</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Quick Search Across All Fields</label>
          <input 
            type="text" 
            placeholder="Type project name, location, contractor..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Action Utility Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-3.5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <Copy className="h-3 w-3 text-slate-500" /> Copy
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition-all">
            <FileSpreadsheet className="h-3 w-3" /> Export CSV
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Columns ({filteredProjects.length} items)
          </button>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </button>
        </div>
      </div>

      {/* Main Full-Width Table Container */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1250px]">
            <thead>
              <tr className="bg-[#58427c] text-white text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 font-semibold">ID</th>
                <th className="py-3 px-3 font-semibold">Code & Name</th>
                <th className="py-3 px-3 font-semibold">Type & Area</th>
                <th className="py-3 px-3 font-semibold">Duration & Timeline</th>
                <th className="py-3 px-3 font-semibold">Location</th>
                <th className="py-3 px-3 font-semibold">Contact & Client</th>
                <th className="py-3 px-3 font-semibold">Contractor</th>
                <th className="py-3 px-3 font-semibold">Budget (৳)</th>
                <th className="py-3 px-3 font-semibold">Storeys</th>
                <th className="py-3 px-3 font-semibold">Progress</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-indigo-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="py-3.5 px-3 font-medium text-slate-500">#{item.id}</td>
                    
                    <td className="py-3.5 px-3">
                      <p className="font-mono text-[10px] text-indigo-600 font-bold">{item.code}</p>
                      <p className="font-semibold text-slate-900 text-xs hover:text-indigo-600 cursor-pointer">{item.name}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{item.description}</p>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <Tag className="h-3 w-3 text-indigo-500" /> {item.projectType}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.area} Area</p>
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-slate-600 whitespace-nowrap">
                      <p className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar className="h-3 w-3 text-emerald-600" /> {item.durationFrom}
                      </p>
                      <p className="text-slate-400 text-[10px]">To: {item.durationTo}</p>
                    </td>

                    <td className="py-3.5 px-3 text-[11px]">
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-rose-500" /> {item.location || "N/A"}
                      </p>
                    </td>

                    <td className="py-3.5 px-3 text-[11px]">
                      <p className="font-medium text-slate-800 flex items-center gap-1">
                        <User className="h-3 w-3 text-indigo-500" /> {item.contactPerson || "N/A"}
                      </p>
                      <p className="text-slate-500 flex items-center gap-1">
                        <PhoneCall className="h-3 w-3 text-emerald-500" /> {item.contactPhone || "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.clientEmail}</p>
                    </td>

                    <td className="py-3.5 px-3 text-[11px]">
                      <p className="font-medium text-slate-700 flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-amber-600" /> {item.contractor || "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-500">Mgr: {item.projectManager}</p>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {item.budget ? `৳${Number(item.budget).toLocaleString()}` : "—"}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold text-slate-700">
                        {item.storeys ? `${item.storeys} Fl` : "—"}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 w-28">
                      <div className="flex items-center justify-between text-[10px] mb-1 font-semibold text-slate-600">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-1.5 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        item.status === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="rounded-md bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-colors shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="rounded-md bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition-colors shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    No matching projects found. Try checking your search or filter values.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-700">1</span> to{" "}
            <span className="font-medium text-slate-700">{filteredProjects.length}</span> of total entries
          </p>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <button className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
              1
            </button>
            <button className="flex items-center gap-0.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" /> 
                {editingProject ? "Edit Project Details" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 bg-slate-50/30 space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Heights"
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Type</label>
                  <input
                    type="text"
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Area Category</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location / Address</label>
                  <input
                    type="text"
                    placeholder="e.g. Gulshan-2, Dhaka"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Total Budget (৳)</label>
                  <input
                    type="text"
                    placeholder="15000000"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="Person Name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+8801XXXXXXXXX"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Client Email</label>
                  <input
                    type="text"
                    placeholder="client@domain.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Contractor Company</label>
                  <input
                    type="text"
                    placeholder="Contractor Name"
                    value={formData.contractor}
                    onChange={(e) => setFormData({...formData, contractor: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Manager</label>
                  <input
                    type="text"
                    placeholder="Manager Name"
                    value={formData.projectManager}
                    onChange={(e) => setFormData({...formData, projectManager: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Number of Storeys</label>
                  <input
                    type="text"
                    placeholder="e.g. 10"
                    value={formData.storeys}
                    onChange={(e) => setFormData({...formData, storeys: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">End Date</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Progress Percentage (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({...formData, progress: Number(e.target.value)})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description about the project..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  ></textarea>
                </div>

              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Save Project
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}