"use client";

import ItemList from "@/components/inventory/ItemList";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import React, { useState } from "react";
import { FiPlus, FiX, FiFileText, FiDownload, FiPrinter } from "react-icons/fi";

// Item type definition
export interface Item {
  id: number;
  code: string;
  name: string;
  category: string;
  unit: string;
  brand: string;
  purchasePrice: number;
  salePrice: number;
}

const ItemAccounts = () => {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "update" | "view">("add");
  const [selectedItem, setSelectedItem] = useState<Partial<Item>>({});

  // Open modal for adding a new item
  const handleAddClick = () => {
    setModalMode("add");
    setSelectedItem({
      code: `M00${Math.floor(80 + Math.random() * 20)}`,
      name: "",
      category: "Rod",
      unit: "Set",
      brand: "brand",
      purchasePrice: 0,
      salePrice: 0,
    });
    setIsModalOpen(true);
  };

  // Open modal for updating or viewing
  const handleOpenModal = (item: Item, mode: "update" | "view") => {
    setModalMode(mode);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Form submit handler for Add/Update
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${modalMode.toUpperCase()} Item Data:`, selectedItem);
    // Here you can add your API submission logic (POST/PUT request)
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 font-sans">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <RouteBreadcrumb />
          <h1 className="text-xl font-bold mt-1">Item</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
          {/* +Item Add Button with bg-[var(--lime)] and text-white */}
          <button
            onClick={handleAddClick}
            className="flex items-center gap-1.5 bg-[var(--lime)] hover:opacity-90 text-white px-3.5 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiPlus className="text-sm" /> +Item Add
          </button>

          {/* PDF Button */}
          <button
            onClick={() => alert("Exporting to PDF...")}
            className="flex items-center gap-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white px-3.5 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiFileText className="text-sm" /> PDF
          </button>

          {/* Excel Button */}
          <button
            onClick={() => alert("Exporting to Excel...")}
            className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3.5 py-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiDownload className="text-sm" /> Excel
          </button>

          {/* Extra Icon Button */}
          <button
            onClick={() => alert("Additional action triggered")}
            className="flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white p-2 rounded text-xs font-medium shadow-sm transition-all"
          >
            <FiPrinter className="text-sm" />
          </button>
        </div>
      </div>

      {/* Child Component for Listing & Filtering */}
      <ItemList
        onEdit={(item) => handleOpenModal(item, "update")}
        onView={(item) => handleOpenModal(item, "view")}
      />

      {/* Shared Modal Form for Add / Update / View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg capitalize text-foreground">
                {modalMode === "add" && "Add New Item"}
                {modalMode === "update" && "Update Item"}
                {modalMode === "view" && "Item Details"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedItem.code || ""}
                    onChange={(e) => setSelectedItem({ ...selectedItem, code: e.target.value })}
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedItem.name || ""}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    placeholder="Enter item name"
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Category
                  </label>
                  <select
                    disabled={modalMode === "view"}
                    value={selectedItem.category || "Rod"}
                    onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  >
                    <option value="Rod">Rod</option>
                    <option value="Sand">Sand</option>
                    <option value="Bricks">Bricks</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Unit
                  </label>
                  <select
                    disabled={modalMode === "view"}
                    value={selectedItem.unit || "Set"}
                    onChange={(e) => setSelectedItem({ ...selectedItem, unit: e.target.value })}
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  >
                    <option value="Set">Set</option>
                    <option value="Bag">Bag</option>
                    <option value="Rft">Rft</option>
                    <option value="Sft">Sft</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Kg">Kg</option>
                    <option value="Nos">Nos</option>
                    <option value="Job">Job</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    value={selectedItem.brand || ""}
                    onChange={(e) => setSelectedItem({ ...selectedItem, brand: e.target.value })}
                    placeholder="Brand name"
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    disabled={modalMode === "view"}
                    value={selectedItem.purchasePrice ?? 0}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, purchasePrice: Number(e.target.value) })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    disabled={modalMode === "view"}
                    value={selectedItem.salePrice ?? 0}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, salePrice: Number(e.target.value) })
                    }
                    className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-border text-sm font-medium hover:bg-muted transition-colors text-foreground"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>
                {modalMode !== "view" && (
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[var(--lime)] text-white text-sm font-medium hover:opacity-90 transition-all shadow-sm"
                  >
                    {modalMode === "add" ? "Save Item" : "Update Changes"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemAccounts;
