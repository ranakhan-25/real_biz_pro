/* eslint-disable prettier/prettier */
"use client";

import { motion } from "framer-motion";
import {
  Edit3,
  Eye,
  KeyRound,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@/lib/theme";
import PermissionModal, { Modal } from "./Modal";

// ডেমো টাইপ
interface Permission {
  id: string | number;
  name: string;
  key: string;
  description?: string;
  resource?: string;
  action?: string;
  context?: string;
  featureId?: number;
  feature?: { name: string; module?: { name: string } };
}

const INITIAL_DEMO_PERMISSIONS: Permission[] = [
  {
    id: "1",
    name: "Create Employee",
    key: "employee.create",
    description: "Allow creating new employees",
    resource: "employees",
    action: "create",
    context: "any",
    feature: { name: "Employee Management", module: { name: "HRMS" } },
  },
  {
    id: "2",
    name: "View Sales",
    key: "sales.view",
    description: "Allow viewing sales records",
    resource: "sales",
    action: "read",
    context: "any",
    feature: { name: "Sales", module: { name: "POS" } },
  },
];

export default function PermissionsPage() {
  const { primaryColor } = useTheme();

  // ✅ লোকাল স্টেটে ডেটা রাখা হচ্ছে
  const [permissions, setPermissions] = useState<Permission[]>(
    INITIAL_DEMO_PERMISSIONS,
  );
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  // Modals
  const [formOpen, setFormOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const [permissionToDelete, setPermissionToDelete] =
    useState<Permission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Search Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const openCreate = () => {
    setEditingPermission(null);
    setFormOpen(true);
  };

  const openEdit = (permission: Permission) => {
    setEditingPermission(permission);
    setFormOpen(true);
  };

  const openView = (permission: Permission) => {
    setViewingId(permission.id as string);
    setTimeout(() => {
      setSelectedPermission(permission);
      setViewingId(null);
    }, 200);
  };

  // ✅ নতুন ডেটা অ্যাড বা এডিট হলে এই ফাংশনটি কল হবে
  const handleFormSuccess = (newData: Permission) => {
    setPermissions((prev) => {
      const exists = prev.find((p) => p.id === newData.id);
      if (exists) {
        // Edit হলে ডেটা আপডেট হবে
        return prev.map((p) => (p.id === newData.id ? newData : p));
      }
      // Add হলে নতুন ডেটা টেবিলের সবার উপরে যুক্ত হবে
      return [newData, ...prev];
    });
  };

  const confirmDelete = async () => {
    if (!permissionToDelete) return;
    setDeletingId(permissionToDelete.id as string);

    // ✅ ডিলিট লজিক
    setTimeout(() => {
      setPermissions((prev) =>
        prev.filter((p) => p.id !== permissionToDelete.id),
      );
      setPermissionToDelete(null);
      setDeletingId(null);
    }, 300);
  };

  const filteredPermissions = useMemo(() => {
    if (!search) return permissions;
    return permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.key.toLowerCase().includes(search.toLowerCase()),
    );
  }, [permissions, search]);

  return (
    <div className="mx-auto max-w-[1600px] p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Permission Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Define granular permissions for platform resources.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <Plus className="h-4 w-4" /> Add Permission
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* FILTERS */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search permissions..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:bg-white"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                {[
                  "Permission",
                  "Key",
                  "Module",
                  "Feature",
                  "Resource",
                  "Action",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Loader2
                      className="mx-auto h-6 w-6 animate-spin"
                      style={{ color: primaryColor }}
                    />
                  </td>
                </tr>
              ) : filteredPermissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <KeyRound className="mx-auto h-8 w-8 text-slate-300" />
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      No permissions found.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPermissions.map((permission, index) => (
                  <motion.tr
                    key={permission.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${primaryColor}1A`,
                            color: primaryColor,
                          }}
                        >
                          <KeyRound className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {permission.name}
                          </p>
                          {permission.description && (
                            <p className="text-xs text-slate-400 truncate max-w-xs">
                              {permission.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <code className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                        {permission.key}
                      </code>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {permission.feature?.module?.name || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {permission.feature?.name || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {permission.resource || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-medium capitalize"
                        style={{
                          backgroundColor: `${primaryColor}1A`,
                          color: primaryColor,
                        }}
                      >
                        {permission.action || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openView(permission)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-[#009432]"
                        >
                          {viewingId === permission.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => openEdit(permission)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-[#009432]"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setPermissionToDelete(permission)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      <PermissionModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        permission={editingPermission}
        title={editingPermission ? "Edit Permission" : "Create Permission"}
        onSuccess={handleFormSuccess} // ✅ এখানে onSuccess ফাংশনটি পাস করা হলো
      />

      {/* VIEW MODAL */}
      {selectedPermission && (
        <Modal
          onClose={() => setSelectedPermission(null)}
          maxWidthClass="max-w-lg"
        >
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">
              Permission Details
            </h2>
            <button onClick={() => setSelectedPermission(null)}>
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase">
                Name
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {selectedPermission.name}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase">
                Key
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700 font-mono">
                {selectedPermission.key}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {permissionToDelete && (
        <Modal
          onClose={() => setPermissionToDelete(null)}
          maxWidthClass="max-w-md"
        >
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Delete permission?
            </h2>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete <b>{permissionToDelete.name}</b>?
              This cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setPermissionToDelete(null)}
                className="px-4 py-2 border rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId !== null}
                className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                {deletingId && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
