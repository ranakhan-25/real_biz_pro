"use client";

import React, { useState } from "react";
import { Search, Calendar, Plus, Eye, Trash2, X, FileText } from "lucide-react";

interface DocumentItem {
  id: number;
  projectName: string;
  documentName: string;
  documentType: string;
  details: string;
  RAJUK?: string;
}

const dummyDocuments: DocumentItem[] = [
  {
    id: 1,
    projectName: "Sheba Eyecon Tower",
    documentName: "Land Deed Copy",
    documentType: "Legal",
    details: "Original deed papers scanned.",
  },
  {
    id: 2,
    projectName: "Lake Garden",
    documentName: "Approval Letter",
    documentType: "Government",
    RAJUK: "RAJUK clearance certificate.",
    details: "RAJUK clearance certificate.",
  },
  {
    id: 3,
    projectName: "Estern 19",
    documentName: "Environmental Clearance",
    documentType: "Compliance",
    details: "DOE environmental approval.",
  },
  {
    id: 4,
    projectName: "Sheba Eyecon Tower",
    documentName: "Architectural Blueprint",
    documentType: "Engineering",
    details: "Final approved floor plans.",
  },
  {
    id: 5,
    projectName: "Lake Garden",
    documentName: "Soil Test Report",
    documentType: "Engineering",
    details: "Geo-technical soil investigation.",
  },
  {
    id: 6,
    projectName: "Estern 19",
    documentName: "Fire Safety Certificate",
    documentType: "Safety",
    details: "Fire department NOC document.",
  },
];

export default function DocumentationPage() {
  const [docList, setDocList] = useState<DocumentItem[]>(dummyDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    "1 September, 2026 - 30 September, 2026",
  );
  const [projectFilter, setProjectFilter] = useState("Select value");
  const [entriesCount, setEntriesCount] = useState("50");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State for "+ ADD NEW"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newDocName, setNewDocName] = useState("");
  const [newDocType, setNewDocType] = useState("");
  const [newDetails, setNewDetails] = useState("");

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName || !newProjectName) {
      alert("Please fill in required fields");
      return;
    }

    const newItem: DocumentItem = {
      id: docList.length + 1,
      projectName: newProjectName,
      documentName: newDocName,
      documentType: newDocType || "General",
      details: newDetails || "-",
    };

    setDocList([newItem, ...docList]);
    setIsModalOpen(false);
    // Reset form
    setNewProjectName("");
    setNewDocName("");
    setNewDocType("");
    setNewDetails("");
  };

  const handleDelete = (id: number) => {
    setDocList(docList.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans relative">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="text-xs text-purple-600 font-medium mb-1 flex items-center gap-1">
            <span>Home</span> &gt; <span>Project</span> &gt;{" "}
            <span className="text-slate-500">Documentation</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Documentation
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold px-4 py-2 rounded-md text-xs flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus size={16} /> ADD NEW
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Select Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Calendar
              size={14}
              className="absolute right-3 top-2.5 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Project
          </label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Sheba Eyecon Tower</option>
            <option>Lake Garden</option>
            <option>Estern 19</option>
          </select>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border-t border-x border-slate-200 rounded-t-lg gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Show</span>
          <select
            value={entriesCount}
            onChange={(e) => setEntriesCount(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-600">Search:</span>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto rounded-b-lg">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-4 w-16">SL</th>
              <th className="py-3 px-4">Project Name</th>
              <th className="py-3 px-4">Document Name</th>
              <th className="py-3 px-4">Document Type</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4 text-center w-24">View</th>
              <th className="py-3 px-4 text-center w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {docList.length > 0 ? (
              docList.map((item, index) => (
                <tr key={item.id} className="hover:bg-purple-50/40 transition">
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.projectName}
                  </td>
                  <td className="py-3 px-4 font-medium text-purple-700">
                    {item.documentName}
                  </td>
                  <td className="py-3 px-4">{item.documentType}</td>
                  <td className="py-3 px-4 text-slate-500">{item.details}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        alert(`Viewing document: ${item.documentName}`)
                      }
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 p-1.5 rounded transition inline-flex items-center justify-center"
                      title="View Document"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded transition inline-flex items-center justify-center"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-slate-400 text-xs"
                >
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>
          Showing 1 to {docList.length} of {docList.length} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="px-3 py-1 bg-purple-600 text-white border border-purple-600 rounded">
            1
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Form for "+ ADD NEW" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center bg-purple-600 text-white px-4 py-3">
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <FileText size={16} /> Add New Document
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Name *
                </label>
                <select
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Project</option>
                  <option value="Sheba Eyecon Tower">Sheba Eyecon Tower</option>
                  <option value="Lake Garden">Lake Garden</option>
                  <option value="Estern 19">Estern 19</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter document name"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Legal, Engineering, Safety"
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter additional details..."
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-4 py-2 rounded-md text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md text-xs shadow-sm transition"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
