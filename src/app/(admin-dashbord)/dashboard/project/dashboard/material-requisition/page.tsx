"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, X, Plus } from "lucide-react";

interface ApprovalStep {
  label: string;
  done: boolean;
}

interface MaterialRequisition {
  id: number;
  projectType: string;
  project: string;
  titleOfWork: string;
  code: string;
  ref: string;
  date: string;
  demandDate: string;
  addedBy: string;
  approvalLayer: ApprovalStep[];
  hasAttachment: boolean;
}

const initialData: MaterialRequisition[] = [
  { id: 1, projectType: "Real Estate", project: "Hena Heights", titleOfWork: "", code: "taz00017", ref: "", date: "08 Sept 2026", demandDate: "08 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: false },
  { id: 2, projectType: "Office", project: "Rifat Eyecon City", titleOfWork: "", code: "taz00016", ref: "", date: "08 Sept 2026", demandDate: "08 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: false },
  { id: 3, projectType: "Office", project: "Rifat Eyecon City", titleOfWork: "", code: "taz00015", ref: "", date: "08 Sept 2026", demandDate: "08 Sept 2026", addedBy: "Tazmul Reza", approvalLayer: [{ label: "All Approvals Completed", done: true }, { label: "Rifat Hosain", done: true }, { label: "Admin", done: true }], hasAttachment: false },
  { id: 4, projectType: "Office", project: "Rifat Eyecon City", titleOfWork: "", code: "taz00014", ref: "", date: "07 Sept 2026", demandDate: "07 Sept 2026", addedBy: "Tazmul Reza", approvalLayer: [{ label: "All Approvals Completed", done: true }, { label: "Rifat Hosain", done: true }, { label: "Admin", done: true }], hasAttachment: false },
  { id: 5, projectType: "Office", project: "Rifat Eyecon City", titleOfWork: "", code: "taz00013", ref: "", date: "07 Sept 2026", demandDate: "07 Sept 2026", addedBy: "Tazmul Reza", approvalLayer: [{ label: "All Approvals Completed", done: true }, { label: "Admin", done: true }], hasAttachment: false },
  { id: 6, projectType: "Office", project: "Rifat Eyecon City", titleOfWork: "", code: "taz00012", ref: "", date: "07 Sept 2026", demandDate: "07 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: false },
  { id: 7, projectType: "Real Estate", project: "Hena Heights", titleOfWork: "Bricks Works", code: "taz00011", ref: "", date: "05 Sept 2026", demandDate: "10 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: false },
  { id: 8, projectType: "Real Estate", project: "Sheba Eyecon Tower", titleOfWork: "", code: "taz00010", ref: "", date: "03 Sept 2026", demandDate: "03 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: false },
  { id: 9, projectType: "Real Estate", project: "Estern 19", titleOfWork: "", code: "taz00009", ref: "", date: "01 Sept 2026", demandDate: "01 Sept 2026", addedBy: "Admin", approvalLayer: [{ label: "All Approvals Completed", done: true }], hasAttachment: true },
];

const emptyForm = {
  projectType: "",
  project: "",
  titleOfWork: "",
  code: "",
  ref: "",
  date: "",
  demandDate: "",
};

const MaterialRequisitionPage = () => {
  const [rows, setRows] = useState<MaterialRequisition[]>(initialData);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = rows.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filtered.map((r) => r.id) : []);
  };

  const toggleSelectOne = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (row: MaterialRequisition) => {
    setEditingId(row.id);
    setForm({
      projectType: row.projectType,
      project: row.project,
      titleOfWork: row.titleOfWork,
      code: row.code,
      ref: row.ref,
      date: row.date,
      demandDate: row.demandDate,
    });
    setIsModalOpen(true);
    setOpenActionId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, ...form }
            : r
        )
      );
    } else {
      const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
      setRows((prev) => [
        {
          id: newId,
          ...form,
          addedBy: "Admin",
          approvalLayer: [{ label: "Pending Approval", done: false }],
          hasAttachment: false,
        },
        ...prev,
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setOpenActionId(null);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb + Top Buttons */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-indigo-600 font-medium">
            Home
          </Link>
          <span>›</span>
          <span className="text-indigo-600 font-medium">Requisition</span>
          <span>›</span>
          <span className="text-slate-600">Material Requisition List</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">
            ⇄ Multiple PO Convert
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
            ⇄ Multiple RFQ Convert
          </button>
          <button className="flex items-center gap-1 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">
            ⇄ Multiple Purchase Convert
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            <Plus className="h-3.5 w-3.5" /> New Material Requisition
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Select Date</label>
          <input
            defaultValue="1 September, 2026 - 30 September, 2026"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Company</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" defaultValue="Somikoron IT Ltd">
            <option>Somikoron IT Ltd</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Supplier</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select an option</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Project</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select value</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-600">Title/Name of Work</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select Title/Name of Work</option>
          </select>
        </div>
      </div>

      {/* Table controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
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
              <th className="px-3 py-2 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                />
              </th>
              <th className="px-3 py-2 text-left">PROJECT TYPE</th>
              <th className="px-3 py-2 text-left">PROJECT</th>
              <th className="px-3 py-2 text-left">TITLE/NAME OF WORK</th>
              <th className="px-3 py-2 text-left">CODE</th>
              <th className="px-3 py-2 text-left">REF</th>
              <th className="px-3 py-2 text-left">DATE</th>
              <th className="px-3 py-2 text-left">DEMAND DATE</th>
              <th className="px-3 py-2 text-left">ADDED BY</th>
              <th className="px-3 py-2 text-left">APPROVAL LAYER</th>
              <th className="px-3 py-2 text-left">ATTACHMENT</th>
              <th className="px-3 py-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, entries).map((r) => (
              <tr key={r.id} className="border-t border-slate-100 align-top">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(r.id)}
                    onChange={(e) => toggleSelectOne(r.id, e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2">{r.projectType}</td>
                <td className="px-3 py-2">{r.project}</td>
                <td className="px-3 py-2">{r.titleOfWork}</td>
                <td className="px-3 py-2">{r.code}</td>
                <td className="px-3 py-2">{r.ref}</td>
                <td className="px-3 py-2">{r.date}</td>
                <td className="px-3 py-2">{r.demandDate}</td>
                <td className="px-3 py-2">{r.addedBy}</td>
                <td className="px-3 py-2">
                  {r.approvalLayer.map((step, i) => (
                    <div key={i} className="flex items-center gap-1 text-emerald-600">
                      <span>✓</span>
                      <span>{step.label}</span>
                    </div>
                  ))}
                </td>
                <td className="px-3 py-2">
                  {r.hasAttachment && (
                    <div className="h-10 w-16 rounded border border-slate-200 bg-slate-100" />
                  )}
                </td>
                <td className="relative px-3 py-2">
                  <button
                    onClick={() =>
                      setOpenActionId(openActionId === r.id ? null : r.id)
                    }
                    className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    Action <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {openActionId === r.id && (
                    <div className="absolute right-0 z-10 mt-1 w-36 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <button
                        onClick={() => openEditModal(r)}
                        className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
                {editingId !== null ? "Edit Material Requisition" : "New Material Requisition"}
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
                <label className="mb-1 block text-sm font-medium text-slate-600">Project</label>
                <input
                  required
                  value={form.project}
                  onChange={(e) => handleChange("project", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Title/Name of Work</label>
                <input
                  value={form.titleOfWork}
                  onChange={(e) => handleChange("titleOfWork", e.target.value)}
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
                <label className="mb-1 block text-sm font-medium text-slate-600">Ref</label>
                <input
                  value={form.ref}
                  onChange={(e) => handleChange("ref", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Date</label>
                <input
                  placeholder="08 Sept 2026"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Demand Date</label>
                <input
                  placeholder="08 Sept 2026"
                  value={form.demandDate}
                  onChange={(e) => handleChange("demandDate", e.target.value)}
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

export default MaterialRequisitionPage;