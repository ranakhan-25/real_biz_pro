/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@/lib/theme";
import RolePermissionModal, { Modal } from "./Modal";

// টাইপ ডেফিনিশন
interface Role {
  id: string | number;
  name: string;
  description?: string;
  permissions?: any[];
  createdAt?: string;
}

// ডেমো রোল ডেটা
const INITIAL_DEMO_ROLES: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all system modules and management tools.",
    permissions: [{ id: 1 }, { id: 2 }],
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Project Manager",
    description: "Can manage project workflows and daily operational tasks.",
    permissions: [{ id: 3 }],
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Sales Team",
    description: "Limited access for sales pipeline, leads, and follow-ups.",
    permissions: [{ id: 4 }, { id: 5 }],
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

export default function RolesPage() {
  const { primaryColor } = useTheme();

  // স্টেট
  const [roles, setRoles] = useState<Role[]>(INITIAL_DEMO_ROLES);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // মডাল স্টেট
  const [formOpen, setFormOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [viewingRole, setViewingRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // সার্চ ডিবাউন্স
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // হ্যান্ডলারসমূহ
  const openCreate = () => {
    setEditingRole(null);
    setFormOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setFormOpen(true);
  };

  // মডাল থেকে ডেটা রিসিভ করা (Add / Edit)
  const handleFormSuccess = (newRoleData: any) => {
    setRoles((prev) => {
      const exists = prev.find((r) => r.id === newRoleData.roleId);

      const formattedRole: Role = {
        id: newRoleData.roleId || Date.now(),
        name: newRoleData.roleName,
        description: editingRole?.description || "Newly created role",
        permissions: newRoleData.permissionIds.map((id: any) => ({ id })),
        createdAt: editingRole?.createdAt || new Date().toISOString(),
      };

      if (exists) {
        return prev.map((r) => (r.id === formattedRole.id ? formattedRole : r));
      }
      return [formattedRole, ...prev];
    });
  };

  const confirmDelete = () => {
    if (!roleToDelete) return;
    setDeletingId(roleToDelete.id);
    setTimeout(() => {
      setRoles((prev) => prev.filter((r) => r.id !== roleToDelete.id));
      setRoleToDelete(null);
      setDeletingId(null);
    }, 300);
  };

  const filteredRoles = useMemo(() => {
    if (!search) return roles;
    return roles.filter((role) =>
      `${role.name} ${role.description ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [roles, search]);

  return (
    <main className="w-full p-4 md:p-6">
      {/* HEADER */}
      <section className="mb-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${primaryColor}1A`,
                  color: primaryColor,
                }}
              >
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Role Management
                </h1>
                <p className="mt-0.5 text-sm text-slate-500">
                  Manage roles and their assigned permissions.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openCreate}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="h-4 w-4" />
            Add Role
          </button>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* SEARCH */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              System Roles
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              {filteredRoles.length}{" "}
              {filteredRoles.length === 1 ? "role" : "roles"} available
            </p>
          </div>
          <div className="relative w-full sm:w-[280px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search roles..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:bg-white"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Role
                </th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Description
                </th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Permissions
                </th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Created
                </th>
                <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoles.map((role, index) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.025 }}
                  className="group transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${primaryColor}1A`,
                          color: primaryColor,
                        }}
                      >
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {role.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          ID: {role.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="max-w-[360px] truncate text-sm text-slate-500">
                      {role.description || "No description available"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                      style={{
                        backgroundColor: `${primaryColor}1A`,
                        color: primaryColor,
                      }}
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      {role.permissions?.length ?? 0}
                      <span style={{ opacity: 0.7 }}>permissions</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {role.createdAt
                      ? new Date(role.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewingRole(role)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#009432]"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEdit(role)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#009432]"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setRoleToDelete(role)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD / EDIT MODAL */}
      <RolePermissionModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        role={editingRole}
        title={
          editingRole ? "Edit Role & Permissions" : "Create Role & Permissions"
        }
        onSave={handleFormSuccess}
      />

      {/* VIEW MODAL (Details) */}
      {viewingRole && (
        <Modal onClose={() => setViewingRole(null)} maxWidthClass="max-w-lg">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">Role Details</h2>
            <button onClick={() => setViewingRole(null)}>
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase">
                Name
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {viewingRole.name}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase">
                Description
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {viewingRole.description || "—"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="text-xs font-medium text-slate-400 uppercase">
                Total Permissions
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {viewingRole.permissions?.length || 0}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE MODAL */}
      {roleToDelete && (
        <Modal onClose={() => setRoleToDelete(null)} maxWidthClass="max-w-md">
          <div className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Delete role?</h2>
            <p className="text-sm text-slate-500">
              Are you sure you want to delete <b>{roleToDelete.name}</b>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRoleToDelete(null)}
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
    </main>
  );
}
