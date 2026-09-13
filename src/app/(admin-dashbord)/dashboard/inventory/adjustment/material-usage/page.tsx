"use client";

import MaterialUsageTable from "@/components/inventory/MaterialUsageTable";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export interface MaterialUsageItem {
  id: number;
  projectType: string;
  project: string;
  titleOfWork: string;
  task: string;
  workerStaffName: string;
  code: string;
  purchaseGrn: string;
  date: string;
  subTotal: number;
  grandTotal: number;
  addedBy: string;
  attachment: string;
  approvalStatus: string;
  approver: string;
}

export default function MaterialUsageAccounts() {
  // Filter states
  const [dateRange, setDateRange] = useState("1 September, 2026 - 30 September, 2026");
  const [company, setCompany] = useState("Somikoron IT Ltd");
  const [supplier, setSupplier] = useState("");
  const [project, setProject] = useState("");
  const [site, setSite] = useState("");
  const [titleOfWork, setTitleOfWork] = useState("");
  const [task, setTask] = useState("");

  // Modal State for Create / Edit / View
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update" | "view">("create");
  const [selectedUsage, setSelectedUsage] = useState<Partial<MaterialUsageItem>>({});

  // Handler to open Create Module
  const handleCreateNewUsage = () => {
    setModalMode("create");
    setSelectedUsage({
      code: `MU${Math.floor(100000 + Math.random() * 900000)}`,
      date: "10 Sept 2026",
      projectType: "Office",
      project: "Rifat Eyecon City",
    });
    setIsModalOpen(true);
  };

  // Handler to open Edit/View Module passed to child table
  const handleOpenModal = (item: MaterialUsageItem, mode: "update" | "view") => {
    setModalMode(mode);
    setSelectedUsage(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 font-sans">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <RouteBreadcrumb />
          <h1 className="text-xl font-bold mt-1">Material Usage</h1>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* +New Material Usage Button */}
          <button
            onClick={handleCreateNewUsage}
            className="flex items-center gap-1.5 bg-[var(--lime)] hover:opacity-95 text-white px-4 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiPlus className="text-base" /> +New Material Usage
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
              <option value="Safety First Suppliers">Safety First Suppliers</option>
              <option value="Mohin Business solution">Mohin Business solution</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Project</option>
              <option value="Rifat Eyecon City">Rifat Eyecon City</option>
              <option value="Estern 19">Estern 19</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Site</label>
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Site</option>
              <option value="Site A">Site A</option>
            </select>
          </div>
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
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Task</label>
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full bg-background border border-input rounded px-3 py-1.5 text-xs text-foreground"
            >
              <option value="">Select Task</option>
              <option value="Task 1">Task 1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Child Component for Table */}
      <MaterialUsageTable
        onEdit={(item) => handleOpenModal(item, "update")}
        onView={(item) => handleOpenModal(item, "view")}
      />

      {/* Modal Module for Create / Update / View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg capitalize text-foreground">
                {modalMode === "create" && "Create Material Usage Module"}
                {modalMode === "update" && "Update Material Usage Module"}
                {modalMode === "view" && "View Material Usage Details"}
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
                    value={selectedUsage.code || ""}
                    onChange={(e) => setSelectedUsage({ ...selectedUsage, code: e.target.value })}
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
                    value={selectedUsage.project || ""}
                    onChange={(e) =>
                      setSelectedUsage({ ...selectedUsage, project: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Worker/Staff Name
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedUsage.workerStaffName || ""}
                    onChange={(e) =>
                      setSelectedUsage({ ...selectedUsage, workerStaffName: e.target.value })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Grand Total
                  </label>
                  <input
                    type="number"
                    disabled={modalMode === "view"}
                    value={selectedUsage.grandTotal || 0}
                    onChange={(e) =>
                      setSelectedUsage({ ...selectedUsage, grandTotal: Number(e.target.value) })
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
                      `${modalMode === "create" ? "Material Usage Created" : "Material Usage Updated"} successfully!`,
                    );
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-[var(--lime)] text-white text-sm font-medium hover:opacity-90 shadow-sm"
                >
                  {modalMode === "create" ? "Save Usage" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
