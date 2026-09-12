"use client";

import MaterialRequisitionTable from "@/components/inventory/MaterialRequisitionTable";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import React, { useState } from "react";
import { FiPlus, FiRefreshCw, FiShoppingCart, FiFileText, FiX } from "react-icons/fi";

export interface MaterialRequisitionItem {
  id: number;
  select: boolean;
  projectType: string;
  project: string;
  titleOfWork: string;
  code: string;
  ref: string;
  date: string;
  demandDate: string;
  addedBy: string;
  approvalStatus: string;
  approver: string;
  attachment: string;
}

export default function MaterialRequisitionAccounts() {
  // Filter states
  const [dateRange, setDateRange] = useState("1 September, 2026 - 30 September, 2026");
  const [company, setCompany] = useState("Somikoron IT Ltd");
  const [supplier, setSupplier] = useState("");
  const [project, setProject] = useState("");
  const [titleOfWork, setTitleOfWork] = useState("");

  // Modal State for Create / Edit / View
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "view">("create");
  const [selectedRequisition, setSelectedRequisition] = useState<Partial<MaterialRequisitionItem>>(
    {},
  );

  // Handler to open Create Module
  const handleCreateNew = () => {
    setModalMode("create");
    setSelectedRequisition({
      code: `taz${Math.floor(10000 + Math.random() * 90000)}`,
      date: "10 Sept 2026",
      demandDate: "10 Sept 2026",
      projectType: "Office",
      project: "Rifat Eyecon City",
    });
    setIsModalOpen(true);
  };

  // Handler to open Edit/View Module from Table
  const handleOpenModalFromTable = (item: MaterialRequisitionItem, mode: "update" | "view") => {
    setModalMode(mode);
    setSelectedRequisition(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 font-sans">
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <RouteBreadcrumb />
          <h1 className="text-xl font-bold mt-1">Material Requisition List</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Multiple PO Convert */}
          <button
            onClick={() => alert("Converting selected items to PO...")}
            className="flex items-center gap-1.5 bg-[#06b6d4] hover:bg-[#0891b2] text-white px-3 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiRefreshCw size={14} /> Multiple PO Convert
          </button>

          {/* Multiple RFQ Convert */}
          <button
            onClick={() => alert("Converting selected items to RFQ...")}
            className="flex items-center gap-1.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-3 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiFileText size={14} /> Multiple RFQ Convert
          </button>

          {/* Multiple Purchase Convert */}
          <button
            onClick={() => alert("Converting selected items to Purchase...")}
            className="flex items-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiShoppingCart size={14} /> Multiple Purchase Convert
          </button>

          {/* +New Material Requisition */}
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 bg-[var(--lime)] hover:opacity-95 text-white px-3 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiPlus size={14} /> +New Material Requisition
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
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
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
              <option value="Hena Heights">Hena Heights</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
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
              <option value="Bricks Works">Bricks Works</option>
            </select>
          </div>
        </div>
      </div>

      {/* Child Component for Table */}
      <MaterialRequisitionTable
        onEdit={(item) => handleOpenModalFromTable(item, "update")}
        onView={(item) => handleOpenModalFromTable(item, "view")}
      />

      {/* Modal Module for Create / Update / View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg capitalize text-foreground">
                {modalMode === "create" && "Create Material Requisition"}
                {modalMode === "update" && "Update Material Requisition"}
                {modalMode === "view" && "View Material Requisition Details"}
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
                    value={selectedRequisition.code || ""}
                    onChange={(e) =>
                      setSelectedRequisition({ ...selectedRequisition, code: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Project
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedRequisition.project || ""}
                    onChange={(e) =>
                      setSelectedRequisition({ ...selectedRequisition, project: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedRequisition.date || ""}
                    onChange={(e) =>
                      setSelectedRequisition({ ...selectedRequisition, date: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Demand Date
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedRequisition.demandDate || ""}
                    onChange={(e) =>
                      setSelectedRequisition({ ...selectedRequisition, demandDate: e.target.value })
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
                      `${modalMode === "create" ? "Requisition Created" : "Requisition Updated"} successfully!`,
                    );
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-[var(--lime)] text-white text-sm font-medium hover:opacity-90 shadow-sm"
                >
                  {modalMode === "create" ? "Save Requisition" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
