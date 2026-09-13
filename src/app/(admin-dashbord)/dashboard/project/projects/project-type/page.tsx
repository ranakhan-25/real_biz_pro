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
  FolderKanban,
  Home,
  Check,
  CheckCircle2
} from "lucide-react";
import { ProjectType } from "@/types/project-type";

const initialProjects: ProjectType[] = [
  { id: 14, code: "P4773027", name: "Office" },
  { id: 15, code: "P7566761", name: "Real Estate" },
  { id: 16, code: "P9579440", name: "Construction" },
  { id: 17, code: "P2596945", name: "Design" },
  { id: 18, code: "P1554959", name: "Land Share" },
  { id: 19, code: "P7784999", name: "Share Project" },
  { id: 21, code: "P2777817", name: "Interior" },
];

export default function ProjectTypePage() {
  const [projects, setProjects] = useState<ProjectType[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  
  // States for Inline Add Form (ডিলিট বা এডিট বাটনের পাশে সরাসরি ফর্ম ওপেন করার জন্য)
  const [isInlineAdding, setIsInlineAdding] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");

  // Search filter
  const filteredProjects = projects.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Inline Submit
  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;

    const newProject: ProjectType = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      code: newCode,
      name: newName,
    };

    setProjects([newProject, ...projects]);
    setNewCode("");
    setNewName("");
    setIsInlineAdding(false);
  };

  // Handle Delete
  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 font-sans text-slate-800">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center text-sm font-medium text-slate-500">
        <a href="#" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
          <Home className="h-4 w-4" /> Home
        </a>
        <span className="mx-2 text-slate-300">/</span>
        <span className="hover:text-indigo-600 cursor-pointer">Project</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-indigo-600 font-semibold">Project Type</span>
      </nav>

      {/* Header & Actions Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Project Type Management</h1>
            <p className="text-xs text-slate-500">Manage and organize your project categories efficiently</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            Select Columns
          </button>

          {/* Toggle Inline Add Form Button */}
          <button
            onClick={() => setIsInlineAdding(!isInlineAdding)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            {isInlineAdding ? "Close Form" : "Add Project Form"}
          </button>
        </div>
      </div>

      {/* Embedded Project Add Form Box (আপনার দেওয়া ছবির ডিজাইন অনুযায়ী) */}
      {isInlineAdding && (
        <div className="mb-6 rounded-2xl bg-white shadow-xl border border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-100/70 px-6 py-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" /> Project Add
            </h3>
            <button
              onClick={() => setIsInlineAdding(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleInlineSubmit} className="p-6 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Code</label>
                <input
                  type="text"
                  required
                  placeholder="P4773027"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 font-mono shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Office"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/60">
              <button
                type="button"
                onClick={() => setIsInlineAdding(false)}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                Close
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Container Section */}
      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Search Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Entries: {filteredProjects.length}
          </span>
          <div className="relative w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#58427c] text-white text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6 font-semibold w-24">ID</th>
                <th className="py-3.5 px-6 font-semibold">Code</th>
                <th className="py-3.5 px-6 font-semibold">Name</th>
                <th className="py-3.5 px-6 font-semibold text-right">Action</th>
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
                    <td className="py-4 px-6 font-medium text-slate-500">#{item.id}</td>
                    <td className="py-4 px-6 font-mono font-medium text-indigo-600">{item.code}</td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 transition-colors shadow-sm"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors shadow-sm"
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
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No matching project types found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Showing <span className="font-medium text-slate-700">1</span> to{" "}
            <span className="font-medium text-slate-700">{filteredProjects.length}</span> of entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </button>
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm">
              1
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}