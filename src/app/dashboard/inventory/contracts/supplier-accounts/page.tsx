import SupplierList from "@/components/inventory/SupplierList";
import { RouteBreadcrumb } from "@/components/ui/RouteBreadcrumb";
import React from "react";
import { FiPlus } from "react-icons/fi";

const SupplierAccounts = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4 sm:p-6">
        <div className="">
          <RouteBreadcrumb />
          <p className="text-xl font-medium">Supplier Accounts</p>
        </div>
        {/* Supplier Add Button */}
        <button className="flex items-center justify-center gap-2 bg-[var(--lime)] hover:opacity-90 text-[var(--ink)] px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all self-start md:self-auto">
          <FiPlus className="text-base" /> Supplier Add
        </button>
      </div>
      <SupplierList />
    </div>
  );
};

export default SupplierAccounts;
