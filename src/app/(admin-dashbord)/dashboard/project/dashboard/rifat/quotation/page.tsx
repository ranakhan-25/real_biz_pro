"use client";

import React, { useState } from "react";
import { Plus, Search, Edit3, Trash2, FileSpreadsheet, FileText, X, Bold, Italic, AlignLeft, List, Image as ImageIcon, Printer } from "lucide-react";

// Quotation Item Interface
interface QuotationItem {
  id: number;
  orderCode: string;
  date: string;
  projectType: string;
  project: string;
  employeeName: string;
  grandTotal: number;
  addedBy: string;
  approve: string;
  attachment: string;
}

// Sub-item Interface for Modal Form
interface TableRowItem {
  id: number;
  itemName: string;
  unit: string;
  quantity: number;
  rate: number;
  details: string;
  image: string;
  amount: number;
}

export default function QuotationPage() {
  // Quotation List State
  const [quotations, setQuotations] = useState<QuotationItem[]>([
    {
      id: 1,
      orderCode: "QUO00003",
      date: "2026-10-07",
      projectType: "Commercial",
      project: "Rifat Eyecon City",
      employeeName: "Md. Rifat",
      grandTotal: 27500,
      addedBy: "Admin",
      approve: "Approved",
      attachment: "file.pdf",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dateRange, setDateRange] = useState("October 1, 2026 - October 31, 2026");

  // Modal State (+New Quote / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Form States inside Modal
  const [formData, setFormData] = useState({
    date: "10/07/2026",
    customer: "",
    code: "QU000003",
    projectType: "",
    project: "",
    site: "",
    contentBody: "",
    category: "",
    subCategory: "",
    searchItem: "",
  });

  const [modalTableItems, setModalTableItems] = useState<TableRowItem[]>([
    {
      id: 1,
      itemName: "Cement (Supercrete)",
      unit: "Bag",
      quantity: 50,
      rate: 550,
      details: "High quality cement",
      image: "N/A",
      amount: 27500,
    },
  ]);

  // Handle Form Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modal for Add New
  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setCurrentEditId(null);
    setFormData({
      date: "10/07/2026",
      customer: "",
      code: `QU00000${quotations.length + 3}`,
      projectType: "",
      project: "",
      site: "",
      contentBody: "",
      category: "",
      subCategory: "",
      searchItem: "",
    });
    setModalTableItems([]);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEdit = (item: QuotationItem) => {
    setIsEditMode(true);
    setCurrentEditId(item.id);
    setFormData({
      date: item.date,
      customer: item.employeeName,
      code: item.orderCode,
      projectType: item.projectType,
      project: item.project,
      site: "Block A",
      contentBody: "Updated quotation content body...",
      category: "",
      subCategory: "",
      searchItem: "",
    });
    setIsModalOpen(true);
  };

  // Delete Quotation Row
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      setQuotations(quotations.filter((item) => item.id !== id));
    }
  };

  // Add Item inside Modal Table
  const handleAddModalTableRow = () => {
    const newItem: TableRowItem = {
      id: Date.now(),
      itemName: formData.searchItem || "New Material/Product",
      unit: "Pcs",
      quantity: 1,
      rate: 1000,
      details: "-",
      image: "-",
      amount: 1000,
    };
    setModalTableItems([...modalTableItems, newItem]);
    setFormData((prev) => ({ ...prev, searchItem: "" }));
  };

  const handleDeleteModalTableRow = (id: number) => {
    setModalTableItems(modalTableItems.filter((i) => i.id !== id));
  };

  // Save Quotation (Add or Update)
  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const grandTotal = modalTableItems.reduce((acc, curr) => acc + curr.amount, 0);

    if (isEditMode && currentEditId !== null) {
      setQuotations(
        quotations.map((q) =>
          q.id === currentEditId
            ? {
                ...q,
                orderCode: formData.code,
                date: formData.date,
                projectType: formData.projectType || "Commercial",
                project: formData.project || "Rifat Eyecon City",
                employeeName: formData.customer || "Md. Rifat",
                grandTotal: grandTotal > 0 ? grandTotal : q.grandTotal,
              }
            : q
        )
      );
    } else {
      const newQuotation: QuotationItem = {
        id: Date.now(),
        orderCode: formData.code,
        date: formData.date,
        projectType: formData.projectType || "Commercial",
        project: formData.project || "Rifat Eyecon City",
        employeeName: formData.customer || "Md. Rifat",
        grandTotal: grandTotal > 0 ? grandTotal : 1000,
        addedBy: "Admin",
        approve: "Pending",
        attachment: "file.pdf",
      };
      setQuotations([newQuotation, ...quotations]);
    }

    setIsModalOpen(false);
  };

  // Filtered Quotations for search
  const filteredQuotations = quotations.filter(
    (item) =>
      item.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-full md:w-80 space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Date</label>
          <input
            type="text"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1 px-4 py-2 bg-[#655bea] text-white text-xs font-bold rounded-lg hover:bg-[#534ac7] transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="h-4 w-4" /> New Quote
        </button>
      </div>

      {/* Export & Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-700 transition-colors">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded hover:bg-rose-700 transition-colors">
            <FileText className="h-3.5 w-3.5" /> PDF
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-600 ml-4">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-xs text-slate-600 font-semibold">Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Quotation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1300px] text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#655bea] text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="px-3.5 py-3">ID</th>
                <th className="px-3.5 py-3">Order Code</th>
                <th className="px-3.5 py-3">Date</th>
                <th className="px-3.5 py-3">Project Type</th>
                <th className="px-3.5 py-3">Project</th>
                <th className="px-3.5 py-3">Employee Name</th>
                <th className="px-3.5 py-3">Grand Total</th>
                <th className="px-3.5 py-3">Added By</th>
                <th className="px-3.5 py-3">Approve</th>
                <th className="px-3.5 py-3">Attachment</th>
                <th className="px-3.5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredQuotations.length > 0 ? (
                filteredQuotations.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3.5 py-3 text-slate-500 font-semibold">{index + 1}</td>
                    <td className="px-3.5 py-3 font-bold text-indigo-600">{item.orderCode}</td>
                    <td className="px-3.5 py-3">{item.date}</td>
                    <td className="px-3.5 py-3">{item.projectType}</td>
                    <td className="px-3.5 py-3 font-semibold text-slate-900">{item.project}</td>
                    <td className="px-3.5 py-3">{item.employeeName}</td>
                    <td className="px-3.5 py-3 font-bold text-slate-900">{item.grandTotal.toLocaleString()}</td>
                    <td className="px-3.5 py-3">{item.addedBy}</td>
                    <td className="px-3.5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.approve === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {item.approve}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 text-indigo-600 underline cursor-pointer">{item.attachment}</td>
                    <td className="px-3.5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded transition-colors"
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
                  <td colSpan={11} className="px-4 py-8 text-center text-slate-400">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>Showing 1 to {filteredQuotations.length} of {filteredQuotations.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-50">Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* FULL PAGE MODAL FOR QUOTE ADD / OFFER                 */}
      {/* ===================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-start p-4 md:p-8 overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-6xl my-auto overflow-hidden border border-slate-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#655bea] text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {isEditMode ? "Edit Quotation / Offer" : "Quote Add / Offer"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveQuotation} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Top Fields */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Customer</label>
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select value</option>
                    <option value="Md. Rifat">Md. Rifat</option>
                    <option value="Customer 2">Customer 2</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white font-bold text-indigo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select value</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Project</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select Project</option>
                    <option value="Rifat Eyecon City">Rifat Eyecon City</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Site</label>
                  <input
                    type="text"
                    name="site"
                    placeholder="Select Site"
                    value={formData.site}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Attachment</label>
                  <div className="flex items-center border border-slate-200 rounded-lg px-3 py-1 bg-white">
                    <input type="file" className="text-xs text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Content Body Editor Simulation */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 font-bold text-xs text-slate-700">
                  Content Body
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-200 bg-slate-50 text-slate-600 text-xs">
                  <span className="hover:bg-slate-200 px-2 py-1 rounded cursor-pointer font-semibold">File</span>
                  <span className="hover:bg-slate-200 px-2 py-1 rounded cursor-pointer font-semibold">Edit</span>
                  <span className="hover:bg-slate-200 px-2 py-1 rounded cursor-pointer font-semibold">Insert</span>
                  <div className="h-4 w-[1px] bg-slate-300 mx-1" />
                  <button type="button" className="p-1 hover:bg-slate-200 rounded"><Bold className="h-3.5 w-3.5" /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 rounded"><Italic className="h-3.5 w-3.5" /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 rounded"><AlignLeft className="h-3.5 w-3.5" /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 rounded"><List className="h-3.5 w-3.5" /></button>
                  <button type="button" className="p-1 hover:bg-slate-200 rounded"><ImageIcon className="h-3.5 w-3.5" /></button>
                </div>
                <textarea
                  rows={4}
                  name="contentBody"
                  value={formData.contentBody}
                  onChange={handleInputChange}
                  placeholder="Write content body here..."
                  className="w-full p-4 text-xs focus:outline-none bg-white text-slate-800"
                ></textarea>
              </div>

              {/* Item Selector Bar */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Raw Materials">Raw Materials</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Sub Category</label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                  >
                    <option value="">Select Sub Category</option>
                    <option value="Sub 1">Sub 1</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Select Item (Product / Material) *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="searchItem"
                      value={formData.searchItem}
                      onChange={handleInputChange}
                      placeholder="Search Item..."
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddModalTableRow}
                      className="px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#655bea] text-white font-bold uppercase tracking-wider text-[11px]">
                      <th className="px-4 py-3">ITEM NAME</th>
                      <th className="px-4 py-3">UNIT</th>
                      <th className="px-4 py-3">QUANTITY</th>
                      <th className="px-4 py-3">RATE</th>
                      <th className="px-4 py-3">DETAILS</th>
                      <th className="px-4 py-3">IMAGE</th>
                      <th className="px-4 py-3">AMOUNT</th>
                      <th className="px-4 py-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {modalTableItems.length > 0 ? (
                      modalTableItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-900">{item.itemName}</td>
                          <td className="px-4 py-3">{item.unit}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">{item.rate}</td>
                          <td className="px-4 py-3">{item.details}</td>
                          <td className="px-4 py-3">{item.image}</td>
                          <td className="px-4 py-3 font-bold text-slate-900">{item.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteModalTableRow(item.id)}
                              className="p-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded"
                            >
                              <Plus className="h-3.5 w-3.5 rotate-45" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-4 py-6 text-center text-slate-400">No items added yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#655bea] text-white rounded-lg text-xs font-bold hover:bg-[#534ac7] transition-colors shadow-sm"
                >
                  {isEditMode ? "Update Quotation" : "Save Quotation"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}