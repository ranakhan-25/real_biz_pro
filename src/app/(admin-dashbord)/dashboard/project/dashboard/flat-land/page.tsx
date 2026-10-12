"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, X } from "lucide-react";

interface Flat {
  id: number;
  project: string;
  site: string;
  flatLandNo: string;
  unit: string;
  bedroom: string;
  bathroom: string;
  size: number;
  price: number;
  subtotal: number;
  parkingCost: number;
  utilityCharge: number;
  grandTotal: number;
  customer: string;
  status: "Sold" | "Unsold";
}

const initialData: Flat[] = [
  { id: 1, project: "Sheba Eyecon Tower", site: "", flatLandNo: "F 4", unit: "", bedroom: "", bathroom: "", size: 1230, price: 60, subtotal: 73800, parkingCost: 0, utilityCharge: 0, grandTotal: 73800, customer: "Sagor kumar", status: "Sold" },
  { id: 2, project: "Sheba Eyecon Tower", site: "", flatLandNo: "F 4", unit: "", bedroom: "", bathroom: "", size: 1230, price: 60, subtotal: 73800, parkingCost: 0, utilityCharge: 0, grandTotal: 73800, customer: "", status: "Unsold" },
  { id: 3, project: "Sheba Eyecon Tower", site: "", flatLandNo: "F 3", unit: "", bedroom: "", bathroom: "", size: 1150, price: 9500, subtotal: 10925000, parkingCost: 0, utilityCharge: 0, grandTotal: 10925000, customer: "Sagor kumar", status: "Sold" },
  { id: 4, project: "Sheba Eyecon Tower", site: "", flatLandNo: "F2", unit: "", bedroom: "", bathroom: "", size: 1230, price: 9000, subtotal: 11070000, parkingCost: 300000, utilityCharge: 200000, grandTotal: 11570000, customer: "Sagor kumar", status: "Sold" },
  { id: 5, project: "Sheba Eyecon Tower", site: "", flatLandNo: "F2", unit: "", bedroom: "", bathroom: "", size: 1230, price: 9000, subtotal: 11070000, parkingCost: 300000, utilityCharge: 200000, grandTotal: 11570000, customer: "", status: "Unsold" },
  { id: 6, project: "Lake Garden", site: "", flatLandNo: "E5", unit: "E", bedroom: "3", bathroom: "3", size: 1480, price: 6000, subtotal: 8880000, parkingCost: 500000, utilityCharge: 300000, grandTotal: 9680000, customer: "Abul", status: "Sold" },
  { id: 7, project: "Lake Garden", site: "", flatLandNo: "C-9", unit: "C", bedroom: "", bathroom: "3", size: 1230, price: 6000, subtotal: 7380000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 8680000, customer: "Sagor kumar", status: "Sold" },
  { id: 8, project: "Lake Garden", site: "", flatLandNo: "C-9", unit: "C", bedroom: "", bathroom: "3", size: 1230, price: 6000, subtotal: 7380000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 8680000, customer: "", status: "Unsold" },
  { id: 9, project: "Lake Garden", site: "", flatLandNo: "C-10", unit: "C", bedroom: "3", bathroom: "3", size: 1560, price: 9000, subtotal: 14040000, parkingCost: 800000, utilityCharge: 500000, grandTotal: 15340000, customer: "Abc", status: "Sold" },
  { id: 10, project: "Lake Garden", site: "", flatLandNo: "A!", unit: "1", bedroom: "4", bathroom: "3", size: 1200, price: 70000, subtotal: 84000000, parkingCost: 200000, utilityCharge: 0, grandTotal: 84200000, customer: "Mr. Raju raz", status: "Sold" },
];

const emptyForm = {
  project: "",
  site: "",
  flatLandNo: "",
  unit: "",
  bedroom: "",
  bathroom: "",
  size: "",
  price: "",
  parkingCost: "",
  utilityCharge: "",
  customer: "",
  status: "Unsold" as "Sold" | "Unsold",
};

const FlatLandPage = () => {
  const [rows, setRows] = useState<Flat[]>(initialData);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = rows.filter(
    (r) =>
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.flatLandNo.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (row: Flat) => {
    setEditingId(row.id);
    setForm({
      project: row.project,
      site: row.site,
      flatLandNo: row.flatLandNo,
      unit: row.unit,
      bedroom: row.bedroom,
      bathroom: row.bathroom,
      size: String(row.size),
      price: String(row.price),
      parkingCost: String(row.parkingCost),
      utilityCharge: String(row.utilityCharge),
      customer: row.customer,
      status: row.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const calcTotals = (f: typeof form) => {
    const size = Number(f.size) || 0;
    const price = Number(f.price) || 0;
    const parkingCost = Number(f.parkingCost) || 0;
    const utilityCharge = Number(f.utilityCharge) || 0;
    const subtotal = size * price;
    const grandTotal = subtotal + parkingCost + utilityCharge;
    return { subtotal, grandTotal, size, price, parkingCost, utilityCharge };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, grandTotal, size, price, parkingCost, utilityCharge } = calcTotals(form);

    if (editingId !== null) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                project: form.project,
                site: form.site,
                flatLandNo: form.flatLandNo,
                unit: form.unit,
                bedroom: form.bedroom,
                bathroom: form.bathroom,
                size,
                price,
                subtotal,
                parkingCost,
                utilityCharge,
                grandTotal,
                customer: form.customer,
                status: form.status,
              }
            : r
        )
      );
    } else {
      const newId = rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
      setRows((prev) => [
        ...prev,
        {
          id: newId,
          project: form.project,
          site: form.site,
          flatLandNo: form.flatLandNo,
          unit: form.unit,
          bedroom: form.bedroom,
          bathroom: form.bathroom,
          size,
          price,
          subtotal,
          parkingCost,
          utilityCharge,
          grandTotal,
          customer: form.customer,
          status: form.status,
        },
      ]);
    }

    closeModal();
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
          <span className="text-indigo-600 font-medium">Flat</span>
          <span>›</span>
          <span className="text-slate-600">Flat</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCreateModal}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Flat Add
          </button>
          <button className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-600">
            ⇅
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Project</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select value</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Site</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select Site</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Status</label>
          <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option>Select Status</option>
          </select>
        </div>
      </div>

      {/* Table controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white">Excel</button>
          <button className="rounded bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">PDF</button>
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
              <th className="px-3 py-2 text-left">SL</th>
              <th className="px-3 py-2 text-left">PROJECT</th>
              <th className="px-3 py-2 text-left">SITE</th>
              <th className="px-3 py-2 text-left">FLAT/LAND NO</th>
              <th className="px-3 py-2 text-left">UNIT</th>
              <th className="px-3 py-2 text-left">BEDROOM</th>
              <th className="px-3 py-2 text-left">BATHROOM</th>
              <th className="px-3 py-2 text-left">SIZE</th>
              <th className="px-3 py-2 text-left">PRICE</th>
              <th className="px-3 py-2 text-left">SUBTOTAL</th>
              <th className="px-3 py-2 text-left">PARKING COST</th>
              <th className="px-3 py-2 text-left">UTILITY CHARGE</th>
              <th className="px-3 py-2 text-left">GRAND TOTAL</th>
              <th className="px-3 py-2 text-left">CUSTOMER</th>
              <th className="px-3 py-2 text-left">STATUS</th>
              <th className="px-3 py-2 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, entries).map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.project}</td>
                <td className="px-3 py-2">{r.site}</td>
                <td className="px-3 py-2">
                  <span className="font-medium text-indigo-600">{r.flatLandNo}</span>
                </td>
                <td className="px-3 py-2">{r.unit}</td>
                <td className="px-3 py-2">{r.bedroom}</td>
                <td className="px-3 py-2">{r.bathroom}</td>
                <td className="px-3 py-2">{r.size}</td>
                <td className="px-3 py-2">{r.price}</td>
                <td className="px-3 py-2">{r.subtotal.toLocaleString()}</td>
                <td className="px-3 py-2">{r.parkingCost ? r.parkingCost.toLocaleString() : ""}</td>
                <td className="px-3 py-2">{r.utilityCharge ? r.utilityCharge.toLocaleString() : ""}</td>
                <td className="px-3 py-2">{r.grandTotal.toLocaleString()}</td>
                <td className="px-3 py-2">{r.customer}</td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-semibold text-white ${
                      r.status === "Sold" ? "bg-indigo-600" : "bg-red-500"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => openEditModal(r)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded bg-cyan-500 text-white hover:bg-cyan-600"
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
                {editingId !== null ? "Edit Flat" : "Flat Add"}
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
                <label className="mb-1 block text-sm font-medium text-slate-600">Project</label>
                <input
                  required
                  value={form.project}
                  onChange={(e) => handleChange("project", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Site</label>
                <input
                  value={form.site}
                  onChange={(e) => handleChange("site", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Flat/Land No</label>
                <input
                  required
                  value={form.flatLandNo}
                  onChange={(e) => handleChange("flatLandNo", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Unit</label>
                <input
                  value={form.unit}
                  onChange={(e) => handleChange("unit", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Bedroom</label>
                <input
                  value={form.bedroom}
                  onChange={(e) => handleChange("bedroom", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Bathroom</label>
                <input
                  value={form.bathroom}
                  onChange={(e) => handleChange("bathroom", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Size</label>
                <input
                  type="number"
                  value={form.size}
                  onChange={(e) => handleChange("size", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Parking Cost</label>
                <input
                  type="number"
                  value={form.parkingCost}
                  onChange={(e) => handleChange("parkingCost", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Utility Charge</label>
                <input
                  type="number"
                  value={form.utilityCharge}
                  onChange={(e) => handleChange("utilityCharge", e.target.value)}
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
                <label className="mb-1 block text-sm font-medium text-slate-600">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="Unsold">Unsold</option>
                  <option value="Sold">Sold</option>
                </select>
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

export default FlatLandPage;