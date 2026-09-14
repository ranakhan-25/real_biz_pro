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
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  deleteRole,
  getRole,
  getRoles,
  type Role,
} from "@/services/roleService";

import RoleDetails from "@/components/modules/roles/RoleDetails";
import RoleForm from "@/components/modules/roles/RoleForm";
import { useTheme } from "@/lib/theme";

const DEMO_ROLES: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all system modules and management tools.",
    permissions: [
      { id: 1, name: "Create Users", key: "users.create", action: "create" },
      { id: 2, name: "Manage Roles", key: "roles.manage", action: "update" },
      { id: 3, name: "View Reports", key: "reports.view", action: "read" },
    ],
  },
  {
    id: 2,
    name: "Project Manager",
    description: "Can manage project workflows and daily operational tasks.",
    permissions: [
      { id: 4, name: "Project Access", key: "projects.read", action: "read" },
      {
        id: 5,
        name: "Update Project",
        key: "projects.update",
        action: "update",
      },
    ],
  },
  {
    id: 3,
    name: "Sales Team",
    description: "Limited access for sales pipeline, leads, and follow-ups.",
    permissions: [
      { id: 6, name: "View Leads", key: "leads.view", action: "read" },
      { id: 7, name: "Create Leads", key: "leads.create", action: "create" },
    ],
  },
];

export default function RolesPage() {
  const { primaryColor } = useTheme();

  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [viewingId, setViewingId] = useState<string | number | null>(null);

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const loadRequestIdRef = useRef(0);
  const viewRequestIdRef = useRef(0);

  const loadRoles = useCallback(async () => {
    const requestId = ++loadRequestIdRef.current;

    try {
      setLoading(true);
      setError("");

      const data = await getRoles();

      if (requestId !== loadRequestIdRef.current) return;

      if (!Array.isArray(data) || data.length === 0) {
        setRoles(DEMO_ROLES);
        setError("Using demo data because the API is returning no roles.");
        return;
      }

      setRoles(data);
    } catch (err) {
      if (requestId !== loadRequestIdRef.current) return;

      setError(
        err instanceof Error
          ? `${err.message} Using demo data instead.`
          : "Using demo data because the backend is unavailable.",
      );
      setRoles(DEMO_ROLES);
    } finally {
      if (requestId === loadRequestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const handleView = async (role: Role) => {
    const requestId = ++viewRequestIdRef.current;
    setViewingId(role.id);
    setError("");

    try {
      const fullRole = await getRole(role.id);
      if (requestId !== viewRequestIdRef.current) return;
      setSelectedRole(fullRole);
    } catch (err) {
      if (requestId !== viewRequestIdRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load role.");
    } finally {
      if (requestId === viewRequestIdRef.current) setViewingId(null);
    }
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const requestDelete = (role: Role) => {
    setDeleteError("");
    setRoleToDelete(role);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;

    setDeletingId(roleToDelete.id);
    setDeleteError("");

    try {
      await deleteRole(roleToDelete.id);
      setRoleToDelete(null);
      await loadRoles();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete role.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredRoles = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return roles;
    return roles.filter((role) =>
      `${role.name} ${role.description || ""}`.toLowerCase().includes(query),
    );
  }, [roles, search]);

  return (
    <main className="w-full">
      {/* ================= HEADER ================= */}
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
            type="button"
            onClick={() => {
              setEditingRole(null);
              setShowForm(true);
            }}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98]"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus className="h-4 w-4" />
            Add Role
          </button>
        </div>
      </section>

      {/* ================= ERROR ================= */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-5 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
            className="ml-4 font-semibold text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* ================= TABLE CARD ================= */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search Bar */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles..."
              aria-label="Search roles"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:bg-white"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = primaryColor;
                e.currentTarget.style.boxShadow = `0 0 0 4px ${primaryColor}1A`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Permissions
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-20 text-center">
                    <Loader2
                      className="mx-auto h-6 w-6 animate-spin"
                      style={{ color: primaryColor }}
                    />
                    <p className="mt-3 text-sm font-medium text-slate-500">
                      Loading roles...
                    </p>
                  </td>
                </tr>
              ) : filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-20 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <Shield className="h-6 w-6 text-slate-300" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-600">
                      No roles found
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {search
                        ? "Try changing your search query."
                        : "Create your first role to get started."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role, index) => (
                  <motion.tr
                    key={role.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.025 }}
                    className="group transition-colors hover:bg-slate-50/80"
                  >
                    {/* Role */}
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

                    {/* Description */}
                    <td className="px-5 py-4">
                      <p className="max-w-[360px] truncate text-sm text-slate-500">
                        {role.description || "No description available"}
                      </p>
                    </td>

                    {/* Permissions */}
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

                    {/* Created */}
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {role.createdAt
                        ? new Date(role.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleView(role)}
                          disabled={viewingId === role.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                          title="View role"
                          aria-label={`View ${role.name}`}
                          onMouseEnter={(e) => {
                            if (viewingId !== role.id) {
                              e.currentTarget.style.color = primaryColor;
                              e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                            e.currentTarget.style.backgroundColor = "";
                          }}
                        >
                          {viewingId === role.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEdit(role)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                          title="Edit role"
                          aria-label={`Edit ${role.name}`}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = primaryColor;
                            e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                            e.currentTarget.style.backgroundColor = "";
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => requestDelete(role)}
                          disabled={deletingId === role.id}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete role"
                          aria-label={`Delete ${role.name}`}
                        >
                          {deletingId === role.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom info */}
        {!loading && filteredRoles.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-5 py-3">
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredRoles.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-600">
                {roles.length}
              </span>{" "}
              roles
            </p>
          </div>
        )}
      </section>

      {/* ================= CREATE / EDIT MODAL ================= */}
      {showForm && (
        <Modal
          onClose={() => {
            setShowForm(false);
            setEditingRole(null);
          }}
          labelledBy="role-form-heading"
        >
          <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2
                id="role-form-heading"
                className="text-lg font-bold text-slate-900"
              >
                {editingRole ? "Edit Role" : "Create Role"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingRole
                  ? "Update role information."
                  : "Create a new system role."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingRole(null);
              }}
              aria-label="Close"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-6">
            <RoleForm
              role={editingRole}
              onCancel={() => {
                setShowForm(false);
                setEditingRole(null);
              }}
              onSuccess={() => {
                setShowForm(false);
                setEditingRole(null);
                loadRoles();
              }}
            />
          </div>
        </Modal>
      )}

      {/* ================= VIEW ROLE ================= */}
      {selectedRole && (
        <RoleDetails
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {roleToDelete && (
        <Modal
          onClose={() => (deletingId ? undefined : setRoleToDelete(null))}
          labelledBy="delete-role-heading"
          maxWidthClass="max-w-md"
        >
          <div className="space-y-4 p-6">
            <h2
              id="delete-role-heading"
              className="text-lg font-bold text-slate-900"
            >
              Delete role?
            </h2>
            <p className="text-sm text-slate-500">
              This will permanently remove{" "}
              <span className="font-semibold text-slate-700">
                {roleToDelete.name}
              </span>
              . Any users currently assigned this role may lose its permissions.
              This action cannot be undone.
            </p>
            {deleteError && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600"
              >
                {deleteError}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRoleToDelete(null)}
                disabled={deletingId !== null}
                className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deletingId !== null}
                className="flex h-10 items-center gap-2 rounded-xl bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId !== null && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}

function Modal({
  children,
  onClose,
  labelledBy,
  maxWidthClass = "max-w-lg",
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy?: string;
  maxWidthClass?: string;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onMouseDown={(event) => event.stopPropagation()}
        className={`max-h-[calc(100vh-32px)] w-full ${maxWidthClass} overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        {children}
      </motion.div>
    </div>
  );
}
