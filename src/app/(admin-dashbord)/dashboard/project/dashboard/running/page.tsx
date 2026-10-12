"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, X } from "lucide-react";

interface Project {
  id: number;
  duration: string;
  projectType: string;
  projectManager: string;
  customer: string;
  code: string;
  name: string;
  budget: number | null;
  storeys: number | null;
  description: string;
  location: string;
}

const initialProjects: Project[] = [
  { id: 1, duration: "From: N/A To: N/A", projectType: "Office", projectManager: "", customer: "", code: "P5587198", name: "Head Office", budget: null, storeys: null, description: "", location: "" },
  { id: 2, duration: "From: N/A To: N/A", projectType: "Real Estate", projectManager: "", customer: "", code: "P2831747", name: "Lake Garden", budget: null, storeys: null, description: "", location: "" },
  { id: 3, duration: "From: N/A To: N/A", projectType: "Real Estate", projectManager: "", customer: "", code: "P7781383", name: "Estern 19", budget: null, storeys: null, description: "", location: "" },
  { id: 4, duration: "From: N/A To: N/A", projectType: "Real Estate", projectManager: "", customer: "", code: "P7915478", name: "Sheba Eyecon Tower", budget: 2000000, storeys: 70, description: "", location: "" },
  { id: 5, duration: "From: 05 Sep 2026 To: 21 Dec 2027", projectType: "Real Estate", projectManager: "Mohin Uddin", customer: "", code: "P8005133", name: "Hena Heights", budget: null, storeys: null, description: "", location: "Bashundhara R/A" },
  { id: 6, duration: "From: 07 Sep 2026 To: 31 Dec 2030", projectType: "Office", projectManager: "", customer: "", code: "P6317184", name: "Rifat Eyecon City", budget: 15000000, storeys: 59, description: "", location: "" },
];

const emptyForm: Omit<Project, "id"> = {
  duration: "",
  projectType: "",
  projectManager: "",
  customer: "",
  code: "",
  name: "",
  budget: null,
  storeys: null,
  description: "",
  location: "",
};

const RunningProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyForm);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingId(project.id);
    const { id, ...rest } = project;
    setForm(rest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "budget" || field === "storeys"
          ? value === ""
            ? null
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingId ? { id: editingId, ...form } : p))
      );
    } else {
      const newId =
        projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects((prev) => [...prev, { id: newId, ...form }]);
    }

    closeModal();
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-indigo-600 font-medium">
            Home
          </Link>
          <span>›</span>
          <span className="text-indigo-600 font-medium">Project</span>
          <span>›</span>
          <span className="text-slate-600">Running Project</span>
        </div>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          + Create Project
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Project Type</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>All Types</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Status</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>All Status</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Area</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select Area</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Number Of Storeys</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>All Storeys</option>
          </select>
        </div>
      </div>

      {/* Table controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button className="rounded bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white">Copy</button>
          <button className="rounded bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white">CSV</button>
          <span className="text-sm">Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="rounded border border-slate-300 px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded border border-indigo-500 px-3 py-1.5 text-sm font-semibold text-indigo-600">
            Select Columns ▾
          </button>
          <span className="text-sm">Search:</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border border-slate-300 px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">DURATION</th>
              <th className="px-3 py-2 text-left">PROJECT TYPE</th>
              <th className="px-3 py-2 text-left">PROJECT MANAGER</th>
              <th className="px-3 py-2 text-left">CUSTOMER</th>
              <th className="px-3 py-2 text-left">CODE</th>
              <th className="px-3 py-2 text-left">NAME</th>
              <th className="px-3 py-2 text-left">BUDGET</th>
              <th className="px-3 py-2 text-left">STOREYS</th>
              <th className="px-3 py-2 text-left">DESCRIPTION</th>
              <th className="px-3 py-2 text-left">LOCATION</th>
              <th className="px-3 py-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, entries).map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.duration}</td>
                <td className="px-3 py-2">{p.projectType}</td>
                <td className="px-3 py-2">{p.projectManager}</td>
                <td className="px-3 py-2">{p.customer}</td>
                <td className="px-3 py-2">{p.code}</td>
                <td className="px-3 py-2">
                  <Link
                    href={`/dashboard/project/dashboard/${p.id}`}
                    className="font-medium text-indigo-600"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-3 py-2">{p.budget ?? ""}</td>
                <td className="px-3 py-2">{p.storeys ?? ""}</td>
                <td className="px-3 py-2">{p.description}</td>
                <td className="px-3 py-2">{p.location}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded bg-indigo-600 text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span>
          Showing 1 to {Math.min(entries, filtered.length)} of {filtered.length} entries
        </span>
        <div className="flex items-center gap-1">
          <button className="rounded bg-slate-100 px-3 py-1.5">Previous</button>
          <button className="rounded bg-indigo-600 px-3 py-1.5 text-white">1</button>
          <button className="rounded bg-slate-100 px-3 py-1.5">Next</button>
        </div>
      </div>

      {/* ================= MODAL (Create & Edit) ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId !== null ? "Edit Project" : "Create Project"}
              </h2>
              <button
                onClick={closeModal}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Code</label>
                <input
                  required
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Project Type</label>
                <select
                  value={form.projectType}
                  onChange={(e) => handleChange("projectType", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Office">Office</option>
                  <option value="Real Estate">Real Estate</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Project Manager</label>
                <input
                  value={form.projectManager}
                  onChange={(e) => handleChange("projectManager", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Customer</label>
                <input
                  value={form.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Duration</label>
                <input
                  placeholder="From: 01 Jan 2026 To: 31 Dec 2026"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Budget</label>
                <input
                  type="number"
                  value={form.budget ?? ""}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Number Of Storeys</label>
                <input
                  type="number"
                  value={form.storeys ?? ""}
                  onChange={(e) => handleChange("storeys", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-600">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {editingId !== null ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RunningProjectPage;