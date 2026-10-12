"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  FileEdit,
  Copy,
  FileText,
  ChevronLeft,
  ChevronRight,
  Calendar,
  X,
  FileSpreadsheet,
  FileDown,
} from "lucide-react";

interface AgreementItem {
  id: number;
  agreementDate: string;
  handoverDate: string;
  code: string;
  project: string;
  flatLandNo: string;
  customerName: string;
  rate: number;
  otherCost: number;
  parking: number;
  utilityCharge: number;
  discount: number;
  subtotal: number;
  settlement?: number;
  grandTotal: number;
  collection: number;
  remaining: number;
  salesBy: string;
}

const dummyAgreements: AgreementItem[] = [
  {
    id: 1,
    agreementDate: "2026-09-02",
    handoverDate: "2028-12-31",
    code: "AGR-88412",
    project: "Sheba Eyecon Tower",
    flatLandNo: "F-2",
    customerName: "Sagor kumar",
    rate: 9000,
    otherCost: 10000,
    parking: 300000,
    utilityCharge: 200000,
    discount: 0,
    subtotal: 11070000,
    grandTotal: 11580000,
    collection: 1500000,
    remaining: 10080000,
    salesBy: "Tazmul Reza",
  },
  {
    id: 2,
    agreementDate: "2026-09-05",
    handoverDate: "2029-06-30",
    code: "AGR-88413",
    project: "Lake Garden",
    flatLandNo: "C-9",
    customerName: "Mr. Raju raz",
    rate: 6000,
    otherCost: 5000,
    parking: 800000,
    utilityCharge: 500000,
    discount: 50000,
    subtotal: 7200000,
    grandTotal: 8455000,
    collection: 2000000,
    remaining: 6455000,
    salesBy: "Rifat Hosain",
  },
  {
    id: 3,
    agreementDate: "2026-09-10",
    handoverDate: "2030-01-15",
    code: "AGR-88414",
    project: "Estern 19",
    flatLandNo: "2",
    customerName: "Nasir Uddin",
    rate: 7500,
    otherCost: 15000,
    parking: 500000,
    utilityCharge: 300000,
    discount: 20000,
    subtotal: 9000000,
    settlement: 0,
    grandTotal: 9795000,
    collection: 3000000,
    remaining: 6795000,
    salesBy: "Mohin Uddin",
  },
];

export default function FlatLandAgreementList() {
  const [dataList] = useState<AgreementItem[]>(dummyAgreements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    "1 September, 2026 - 30 September, 2026",
  );
  const [salesPerson, setSalesPerson] = useState("Select value");
  const [team, setTeam] = useState("Select value");
  const [project, setProject] = useState("Select value");

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("Add New Agreement");

  const handleOpenForm = (title = "Add New Agreement") => {
    setFormTitle(title);
    setIsFormOpen(true);
  };

  // Calculate Totals
  const totalRate = dataList.reduce((acc, item) => acc + item.rate, 0);
  const totalOtherCost = dataList.reduce(
    (acc, item) => acc + item.otherCost,
    0,
  );
  const totalParking = dataList.reduce((acc, item) => acc + item.parking, 0);
  const totalUtility = dataList.reduce(
    (acc, item) => acc + item.utilityCharge,
    0,
  );
  const totalDiscount = dataList.reduce((acc, item) => acc + item.discount, 0);
  const totalSub = dataList.reduce((acc, item) => acc + item.subtotal, 0);
  const totalGrand = dataList.reduce((acc, item) => acc + item.grandTotal, 0);
  const totalCollection = dataList.reduce(
    (acc, item) => acc + item.collection,
    0,
  );
  const totalRemaining = dataList.reduce(
    (acc, item) => acc + item.remaining,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            Sales By
          </label>
          <select
            value={salesPerson}
            onChange={(e) => setSalesPerson(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Tazmul Reza</option>
            <option>Mohin Uddin</option>
            <option>Rifat Hosain</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Team
          </label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Team Alpha</option>
            <option>Team Beta</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Project
          </label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Select value</option>
            <option>Sheba Eyecon Tower</option>
            <option>Lake Garden</option>
            <option>Estern 19</option>
          </select>
        </div>
      </div>

      {/* Action Buttons & Search Control */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-4 py-3 border-t border-x border-slate-200 rounded-t-lg gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Exported to Excel!")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
          >
            <FileSpreadsheet size={14} /> Excel
          </button>
          <button
            onClick={() => alert("Exported to PDF!")}
            className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition"
          >
            <FileDown size={14} /> PDF
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-600 ml-4">
            <span>Show</span>
            <select className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-600">Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={() => handleOpenForm("Add Agreement")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 shadow-sm transition ml-2 whitespace-nowrap"
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1500px]">
          <thead>
            <tr className="bg-purple-600 text-white text-[11px] font-semibold tracking-wider uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Agreement Date</th>
              <th className="py-3 px-3">Handover Date</th>
              <th className="py-3 px-3">Code</th>
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Flat/Land No</th>
              <th className="py-3 px-3">Customer Name</th>
              <th className="py-3 px-3">Rate</th>
              <th className="py-3 px-3">Other Cost</th>
              <th className="py-3 px-3">Parking</th>
              <th className="py-3 px-3">Utility Charge</th>
              <th className="py-3 px-3">Discount</th>
              <th className="py-3 px-3">Subtotal</th>
              <th className="py-3 px-3">Grand Total</th>
              <th className="py-3 px-3">Collection</th>
              <th className="py-3 px-3">Remaining</th>
              <th className="py-3 px-3">Sales By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {dataList.map((item) => (
              <tr key={item.id} className="hover:bg-purple-50/40 transition">
                <td className="py-3 px-3 font-medium">{item.id}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {item.agreementDate}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {item.handoverDate}
                </td>
                <td className="py-3 px-3 font-medium text-purple-600">
                  {item.code}
                </td>
                <td className="py-3 px-3">{item.project}</td>
                <td className="py-3 px-3 font-semibold">{item.flatLandNo}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {item.customerName}
                </td>
                <td className="py-3 px-3">{item.rate.toLocaleString()}</td>
                <td className="py-3 px-3">{item.otherCost.toLocaleString()}</td>
                <td className="py-3 px-3">{item.parking.toLocaleString()}</td>
                <td className="py-3 px-3">
                  {item.utilityCharge.toLocaleString()}
                </td>
                <td className="py-3 px-3">{item.discount.toLocaleString()}</td>
                <td className="py-3 px-3">{item.subtotal.toLocaleString()}</td>
                <td className="py-3 px-3 font-bold">
                  {item.grandTotal.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">
                  {item.collection.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-rose-600 font-semibold">
                  {item.remaining.toLocaleString()}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">{item.salesBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Total Row */}
      <div className="bg-white border-x border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between text-xs font-bold text-slate-800 rounded-b-lg overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          <span className="text-purple-700">TOTAL:</span>
          <span>{totalRate.toFixed(2)}</span>
          <span>{totalOtherCost.toFixed(2)}</span>
          <span>{totalParking.toFixed(2)}</span>
          <span>{totalUtility.toFixed(2)}</span>
          <span>{totalDiscount.toFixed(2)}</span>
          <span>{totalSub.toFixed(2)}</span>
          <span>{totalGrand.toFixed(2)}</span>
          <span className="text-emerald-600">{totalCollection.toFixed(2)}</span>
          <span className="text-rose-600">{totalRemaining.toFixed(2)}</span>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-4 text-xs text-slate-500 gap-4">
        <div>
          Showing 1 to {dataList.length} of {dataList.length} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
            disabled
          >
            <ChevronLeft size={14} />
          </button>
          <button className="px-3 py-1 bg-purple-600 text-white border border-purple-600 rounded">
            1
          </button>
          <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-base">{formTitle}</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-white hover:bg-purple-700 p-1 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Project Name *
                </label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Project</option>
                  <option>Sheba Eyecon Tower</option>
                  <option>Lake Garden</option>
                  <option>Estern 19</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Agreement Date *
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Handover Date *
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Customer Name *
                </label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Customer</option>
                  <option>Sagor kumar</option>
                  <option>Mr. Raju raz</option>
                  <option>Nasir Uddin</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Flat / Land No *
                </label>
                <input
                  type="text"
                  placeholder="e.g. F-2"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Rate *
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Other Cost
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Parking Charge
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Utility Charge
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Sales By *
                </label>
                <select className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500">
                  <option>Select Person</option>
                  <option>Tazmul Reza</option>
                  <option>Mohin Uddin</option>
                  <option>Rifat Hosain</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-100 px-6 py-3 flex justify-end gap-2 border-t border-slate-200">
              <button
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Agreement Saved Successfully!");
                  setIsFormOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-xs font-medium hover:bg-purple-700 transition"
              >
                Save Agreement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
