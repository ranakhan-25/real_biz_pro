"use client";

import { Loader2, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  createUser,
  getUserFormDropdowns,
  updateUser,
  type User,
} from "@/services/userService";
import { useTheme } from "@/lib/theme";

interface UserFormProps {
  user?: User | null;
  onSuccess?: (savedUser: User) => void;
  onCancel?: () => void;
}

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  userType: "organization" as "organization" | "system",
  designationId: "",
  companyId: "",
  roleId: "",
  isActive: true,
  password: "",
};

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const { primaryColor } = useTheme();

  const [form, setForm] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dropdowns, setDropdowns] = useState({
    designations: [] as Array<{ id: number | string; name: string }>,
    roles: [] as Array<{ id: number | string; name: string }>,
    modules: [] as Array<{ id: number | string; name: string }>,
    companies: [] as Array<{ id: number | string; name: string }>,
  });

  useEffect(() => {
    let alive = true;

    const loadDropdowns = async () => {
      try {
        const source = await getUserFormDropdowns();
        if (!alive) return;
        setDropdowns({
          designations: source.designations ?? [],
          roles: source.roles ?? [],
          modules: source.modules ?? [],
          companies: source.companies ?? [],
        });
      } catch {
        if (alive) {
          setDropdowns({
            designations: [],
            roles: [],
            modules: [],
            companies: [],
          });
        }
      }
    };

    loadDropdowns();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setForm(initialValues);
      return;
    }

    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      userType: (user.userType as "organization" | "system") || "organization",
      designationId: user.designationId ? String(user.designationId) : "",
      companyId: "",
      roleId: "",
      isActive: user.isActive ?? true,
      password: "",
    });
  }, [user]);

  const roleOptions = useMemo(() => dropdowns.roles ?? [], [dropdowns.roles]);
  const moduleOptions = useMemo(
    () => dropdowns.modules ?? [],
    [dropdowns.modules],
  );
  const companyOptions = useMemo(
    () => dropdowns.companies ?? [],
    [dropdowns.companies],
  );
  const designationOptions = useMemo(
    () => dropdowns.designations ?? [],
    [dropdowns.designations],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        email: form.email.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        username: form.username.trim(),
        isActive: Boolean(form.isActive),
        designationId: form.designationId
          ? Number(form.designationId)
          : undefined,
        userType: form.userType,
        ...(user ? {} : { password: form.password.trim() || "Password123!" }),
      };

      if (
        !payload.email ||
        !payload.username ||
        !payload.firstName ||
        !payload.lastName
      ) {
        throw new Error(
          "First name, last name, username, and email are required.",
        );
      }

      const saved = user
        ? await updateUser(String(user.uuid ?? user.id), payload)
        : await createUser(payload as any);

      onSuccess?.(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save user.");
    } finally {
      setSaving(false);
    }
  };

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = primaryColor;
      e.currentTarget.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = "";
      e.currentTarget.style.boxShadow = "";
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2
            id="user-form-heading"
            className="text-lg font-bold text-slate-900"
          >
            {user ? "Edit User" : "Create User"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {user
              ? "Update the selected account details."
              : "Add a new platform user."}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* ===================== 2 TABS ===================== */}
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({ ...prev, userType: "organization" }))
          }
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
            form.userType === "organization"
              ? "bg-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={
            form.userType === "organization"
              ? { color: primaryColor }
              : undefined
          }
        >
          Organization User
        </button>

        <button
          type="button"
          onClick={() => setForm((prev) => ({ ...prev, userType: "system" }))}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
            form.userType === "system"
              ? "bg-white shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={
            form.userType === "system" ? { color: primaryColor } : undefined
          }
        >
          System User
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span>First Name</span>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span>Last Name</span>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span>Username</span>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span>Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          />
        </label>

        {/* Organization User → Company */}
        {form.userType === "organization" && (
          <label className="space-y-2 text-sm text-slate-600">
            <span>Company</span>
            <select
              name="companyId"
              value={form.companyId || ""}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
              {...focusStyle}
            >
              <option value="">Select company</option>
              {companyOptions.map((option) => (
                <option key={String(option.id)} value={String(option.id)}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* System User → Role */}
        {form.userType === "system" && (
          <label className="space-y-2 text-sm text-slate-600">
            <span>Role</span>
            <select
              name="roleId"
              value={form.roleId || ""}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
              {...focusStyle}
            >
              <option value="">Select role</option>
              {roleOptions.map((option) => (
                <option key={String(option.id)} value={String(option.id)}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Designation */}
        <label className="space-y-2 text-sm text-slate-600">
          <span>Designation</span>
          <select
            name="designationId"
            value={form.designationId}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          >
            <option value="">Select designation</option>
            {designationOptions.map((option) => (
              <option key={String(option.id)} value={String(option.id)}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        {/* Status */}
        <label className="space-y-2 text-sm text-slate-600">
          <span>Status</span>
          <select
            name="isActive"
            value={String(form.isActive)}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                isActive: event.target.value === "true",
              }))
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
            {...focusStyle}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>

        {/* Password - only on create */}
        {!user && (
          <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none"
              {...focusStyle}
            />
          </label>
        )}
      </div>

      {/* Optional sections */}
      {roleOptions.length > 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Available roles
          </p>
          <div className="flex flex-wrap gap-2">
            {roleOptions.map((option) => (
              <span
                key={String(option.id)}
                className="rounded-full bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
              >
                {option.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {moduleOptions.length > 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Available modules
          </p>
          <div className="flex flex-wrap gap-2">
            {moduleOptions.map((option) => (
              <span
                key={String(option.id)}
                className="rounded-full bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
              >
                {option.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {companyOptions.length > 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Available companies
          </p>
          <div className="flex flex-wrap gap-2">
            {companyOptions.map((option) => (
              <span
                key={String(option.id)}
                className="rounded-full bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
              >
                {option.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: primaryColor }}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : user ? "Save Changes" : "Create User"}
        </button>
      </div>
    </form>
  );
}
