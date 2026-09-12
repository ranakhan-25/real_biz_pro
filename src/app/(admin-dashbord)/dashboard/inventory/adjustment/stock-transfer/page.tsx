"use client";

import StockTransferTable from "@/components/inventory/StockTransferTable";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export interface StockTransferItem {
  id: number;
  code: string;
  date: string;
  fromProject: string;
  fromSite: string;
  fromTask: string;
  toProject: string;
  toSite: string;
  toTask: string;
  contact: string;
}

export default function StockTransferAccounts() {
  // Filter states
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("Somikoron IT Ltd");
  const [supplier, setSupplier] = useState("");
  const [project, setProject] = useState("");
  const [titleOfWork, setTitleOfWork] = useState("");

  // Modal State for Transfer / Edit / View
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "view">("create");
  const [selectedTransfer, setSelectedTransfer] = useState<Partial<StockTransferItem>>({});

  // Handler to open Transfer Module
  const handleOpenTransferModal = () => {
    setModalMode("create");
    setSelectedTransfer({
      code: `ST${Math.floor(100000 + Math.random() * 900000)}`,
      date: "10 Sept 2026",
    });
    setIsModalOpen(true);
  };

  // Handler to open Edit/View Module from Table
  const handleOpenModalFromTable = (item: StockTransferItem, mode: "update" | "view") => {
    setModalMode(mode);
    setSelectedTransfer(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 font-sans">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <RouteBreadcrumb />
          <h1 className="text-xl font-bold mt-1">Stock Transfer</h1>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* +Transfer Button */}
          <button
            onClick={handleOpenTransferModal}
            className="flex items-center gap-1.5 bg-[var(--lime)] hover:opacity-95 text-white px-4 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiPlus className="text-base" /> +Transfer
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-card border border-border rounded p-4 shadow-sm mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Select Date
            </label>
            <input
              type="text"
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Supplier</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select an option</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select value</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
              <option value="Estern 19">Estern 19</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Title/Name of Work
            </label>
            <select
              value={titleOfWork}
              onChange={(e) => setTitleOfWork(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Title/Name of Work</option>
              <option value="Work 1">Work 1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Child Component for Table */}
      <StockTransferTable
        onEdit={(item) => handleOpenModalFromTable(item, "update")}
        onView={(item) => handleOpenModalFromTable(item, "view")}
      />

      {/* Modal Module for Transfer / Update / View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg capitalize text-foreground">
                {modalMode === "create" && "New Stock Transfer"}
                {modalMode === "update" && "Update Stock Transfer"}
                {modalMode === "view" && "View Stock Transfer Details"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedTransfer.code || ""}
                    onChange={(e) =>
                      setSelectedTransfer({ ...selectedTransfer, code: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedTransfer.date || ""}
                    onChange={(e) =>
                      setSelectedTransfer({ ...selectedTransfer, date: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    From Project
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedTransfer.fromProject || ""}
                    onChange={(e) =>
                      setSelectedTransfer({ ...selectedTransfer, fromProject: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    To Project
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedTransfer.toProject || ""}
                    onChange={(e) =>
                      setSelectedTransfer({ ...selectedTransfer, toProject: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border border-border text-sm font-medium hover:bg-muted text-foreground"
              >
                {modalMode === "view" ? "Close" : "Cancel"}
              </button>
              {modalMode !== "view" && (
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `${modalMode === "create" ? "Stock transferred" : "Stock transfer updated"} successfully!`,
                    );
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-[var(--lime)] text-white text-sm font-medium hover:opacity-90 shadow-sm"
                >
                  {modalMode === "create" ? "Transfer Stock" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
