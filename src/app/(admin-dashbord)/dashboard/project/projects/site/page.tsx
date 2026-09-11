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
  Home,
  CheckCircle2,
  Building
} from "lucide-react";

interface SiteItem {
  id: number;
  code: string;
  project: string;
  name: string;
  description: string;
  location: string;
  projectType: string;
}

const staticSites: SiteItem[] = [
  { id: 1, code: "P1171952", project: "Abason Project", name: "Site Alpha - Block A", description: "Residential piling & foundation work", location: "Uttara Sector 11, Dhaka", projectType: "Residential" },
  { id: 2, code: "P1883545", project: "Admin Headquarters", name: "Central IT Hub", description: "Networking and server room setup", location: "Motijheel C/A, Dhaka", projectType: "Office" },
  { id: 3, code: "P1572732", project: "HPDL Tower", name: "Commercial Plaza Site", description: "Basement car parking and structure", location: "Gulshan-2, Dhaka", projectType: "Commercial" },
  { id: 4, code: "AA00058", project: "GV TeSt", name: "Green Valley Phase 1", description: "Boundary wall and guard room construction", location: "Savandar, Gazipur", projectType: "Industrial" },
  { id: 5, code: "AA00058", project: "GV Heights", name: "GV Tower Site 2", description: "High-rise luxury structural framework", location: "Bashundhara R/A", projectType: "Real Estate" },
  { id: 6, code: "P2209182", project: "Apex Apparel", name: "Textile Warehouse Site", description: "Steel shed roofing and flooring", location: "EPZ, Chattogram", projectType: "Industrial" },
  { id: 7, code: "P3314290", project: "Metro Mall", name: "Shopping Complex North Wing", description: "Interior plastering and electrical wiring", location: "Agrabad, Chattogram", projectType: "Commercial" },
  { id: 8, code: "P4451092", project: "Skyline Duplex", name: "Villa Cluster B", description: "Duplex plumbing and sanitary fitting", location: "Uttara Sector 4, Dhaka", projectType: "Residential" },
  { id: 9, code: "P5567812", project: "Rifat Eyecon City", name: "Tech Park Site 3", description: "Glass facade and curtain wall installation", location: "Banani, Dhaka", projectType: "Office" },
  { id: 10, code: "P6678901", project: "Hena Heights", name: "Hena Heights Ground Work", description: "Deep piling and soil testing analysis", location: "Baridhara, Dhaka", projectType: "Real Estate" },
  { id: 11, code: "P7789012", project: "Desh Spinning", name: "Factory Extension Site", description: "Machine foundation casting", location: "Narayanganj Sadar", projectType: "Industrial" },
  { id: 12, code: "P8890123", project: "Silicon Tower", name: "Server Park Sector", description: "Substation and backup generator installation", location: "Tejgaon I/A, Dhaka", projectType: "Commercial" }
];

export default function SiteManagementPage() {
  const [sites, setSites] = useState<SiteItem[]>(staticSites);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<SiteItem | null>(null);

  // Form Fields State (Ready for API Integration)
  const [formData, setFormData] = useState({
    projectType: "",
    project: "",
    code: "P" + Math.floor(1000000 + Math.random() * 9000000),
    name: "",
    description: "",
    location: ""
  });

  const handleOpenAdd = () => {
    setEditingSite(null);
    setFormData({
      projectType: "",
      project: "",
      code: "P" + Math.floor(1000000 + Math.random() * 9000000),
      name: "",
      description: "",
      location: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (site: SiteItem) => {
    setEditingSite(site);
    setFormData({
      projectType: site.projectType,
      project: site.project,
      code: site.code,
      name: site.name,
      description: site.description,
      location: site.location
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSite) {
      // API Update placeholder: await axios.put(`/api/sites/${editingSite.id}`, formData)
      setSites(sites.map(s => s.id === editingSite.id ? {
        ...s,
        projectType: formData.projectType,
        project: formData.project,
        code: formData.code,
        name: formData.name,
        description: formData.description,
        location: formData.location
      } : s));
    } else {
      // API Create placeholder: await axios.post('/api/sites', formData)
      const newEntry: SiteItem = {
        id: sites.length > 0 ? Math.max(...sites.map(s => s.id)) + 1 : 1,
        projectType: formData.projectType || "Residential",
        project: formData.project || "General Project",
        code: formData.code,
        name: formData.name,
        description: formData.description || "N/A",
        location: formData.location || "N/A"
      };
      setSites([newEntry, ...sites]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this site?")) {
      // API Delete placeholder: await axios.delete(`/api/sites/${id}`)
      setSites(sites.filter(s => s.id !== id));
    }
  };

  const filteredSites = sites.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedSites = filteredSites.slice(0, entriesPerPage);

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 font-sans text-slate-800">
      
      {/* Breadcrumb Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-slate-200/60">
        <nav className="flex items-center text-xs font-medium text-slate-500">
          <a href="#" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            <Home className="h-3.5 w-3.5" /> Home
          </a>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-500">Project</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-indigo-600 font-semibold">Site</span>
        </nav>

        <button 
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          <Plus className="h-4 w-4" /> +Create Site
        </button>
      </div>

      {/* Control Bar: Show entries & Search */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200/60">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:border-indigo-500 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600">Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none w-48 sm:w-64"
            placeholder=""
          />
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="rounded-xl bg-white shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#7c3aed] text-white text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold w-16">ID ↕</th>
                <th className="py-3 px-4 font-semibold w-32">Code ↕</th>
                <th className="py-3 px-4 font-semibold">Project ↕</th>
                <th className="py-3 px-4 font-semibold">Name ↕</th>
                <th className="py-3 px-4 font-semibold">Description ↕</th>
                <th className="py-3 px-4 font-semibold">Location ↕</th>
                <th className="py-3 px-4 font-semibold text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {displayedSites.length > 0 ? (
                displayedSites.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors hover:bg-indigo-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-600">{item.id}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600">{item.code}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.project}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{item.description}</td>
                    <td className="py-3.5 px-4 text-slate-600">{item.location}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="rounded bg-indigo-600 p-1.5 text-white hover:bg-indigo-700 transition-all shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="rounded bg-rose-600 p-1.5 text-white hover:bg-rose-700 transition-all shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/60 px-4 py-3 bg-slate-50/50 gap-2">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-700">1</span> to{" "}
            <span className="font-medium text-slate-700">{displayedSites.length}</span> of{" "}
            <span className="font-medium text-slate-700">{filteredSites.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              Previous
            </button>
            <button className="rounded-md bg-indigo-600 px-3.5 py-1 text-xs font-medium text-white shadow-sm">
              1
            </button>
            <button className="flex items-center gap-0.5 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create / Edit Modal (Static Form for future API binding) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-600" /> 
                {editingSite ? "Site Edit" : "Site Add"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 bg-slate-50/30 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Office">Office</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Project</option>
                    <option value="Abason Project">Abason Project</option>
                    <option value="Admin Headquarters">Admin Headquarters</option>
                    <option value="HPDL Tower">HPDL Tower</option>
                    <option value="GV TeSt">GV TeSt</option>
                    <option value="Apex Apparel">Apex Apparel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Code</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Site Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Site Location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all"
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