/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ShieldCheck, X } from "lucide-react";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* =========================================================
   GENERIC MODAL
========================================================= */

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  labelledBy?: string;
  maxWidthClass?: string;
  closeOnOverlayClick?: boolean;
}

export function Modal({
  children,
  onClose,
  labelledBy,
  maxWidthClass = "max-w-[1180px]",
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
          }
        }}
        aria-labelledby={labelledBy}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 8 }}
          transition={{ duration: 0.18 }}
          className={`flex max-h-[94vh] w-full ${maxWidthClass} flex-col overflow-hidden rounded-xl bg-white shadow-2xl`}
          onMouseDown={(event) => event.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================
   TYPES
========================================================= */

export interface PermissionItem {
  id: number | string;
  name: string;
  code?: string;
}

export interface FeatureItem {
  id: number | string;
  name: string;
  code?: string;
  permissions: PermissionItem[];
}

export interface ModuleItem {
  id: number | string;
  name: string;
  code?: string;
  features: FeatureItem[];
}

/* =========================================================
   EXPANDED DEMO DATA (আপনার রিকোয়েস্ট অনুযায়ী অনেক ডেটা)
========================================================= */

const DEMO_DATA: ModuleItem[] = [
  {
    id: 1,
    name: "HRMS",
    code: "HRMS",
    features: [
      {
        id: 101,
        name: "Employee Management",
        code: "EMPLOYEE_MANAGEMENT",
        permissions: [
          { id: 1001, name: "View Employees", code: "VIEW_EMPLOYEES" },
          { id: 1002, name: "Create Employee", code: "CREATE_EMPLOYEE" },
          { id: 1003, name: "Edit Employee", code: "EDIT_EMPLOYEE" },
          { id: 1004, name: "Delete Employee", code: "DELETE_EMPLOYEE" },
        ],
      },
      {
        id: 102,
        name: "Attendance",
        code: "ATTENDANCE",
        permissions: [
          { id: 1005, name: "View Attendance", code: "VIEW_ATTENDANCE" },
          { id: 1006, name: "Manage Attendance", code: "MANAGE_ATTENDANCE" },
          { id: 1007, name: "Approve Leave", code: "APPROVE_LEAVE" },
          { id: 1008, name: "View Leave", code: "VIEW_LEAVE" },
        ],
      },
      {
        id: 103,
        name: "Payroll",
        code: "PAYROLL",
        permissions: [
          { id: 1009, name: "View Salary", code: "VIEW_SALARY" },
          { id: 1010, name: "Process Payroll", code: "PROCESS_PAYROLL" },
          { id: 1011, name: "Generate Payslip", code: "GENERATE_PAYSLIP" },
        ],
      },
      {
        id: 104,
        name: "Recruitment",
        code: "RECRUITMENT",
        permissions: [
          { id: 1012, name: "View Jobs", code: "VIEW_JOBS" },
          { id: 1013, name: "Post Job", code: "POST_JOB" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "POS",
    code: "POS",
    features: [
      {
        id: 201,
        name: "Sales",
        code: "SALES",
        permissions: [
          { id: 2001, name: "View Sales", code: "VIEW_SALES" },
          { id: 2002, name: "Create Sale", code: "CREATE_SALE" },
          { id: 2003, name: "Edit Sale", code: "EDIT_SALE" },
          { id: 2004, name: "Delete Sale", code: "DELETE_SALE" },
          { id: 2005, name: "Refund Sale", code: "REFUND_SALE" },
        ],
      },
      {
        id: 202,
        name: "Products",
        code: "PRODUCTS",
        permissions: [
          { id: 2006, name: "View Products", code: "VIEW_PRODUCTS" },
          { id: 2007, name: "Manage Products", code: "MANAGE_PRODUCTS" },
          { id: 2008, name: "Categories", code: "MANAGE_CATEGORIES" },
        ],
      },
      {
        id: 203,
        name: "Customers",
        code: "CUSTOMERS",
        permissions: [
          { id: 2009, name: "View Customers", code: "VIEW_CUSTOMERS" },
          { id: 2010, name: "Manage Customers", code: "MANAGE_CUSTOMERS" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Production",
    code: "PRODUCTION",
    features: [
      {
        id: 301,
        name: "Production Management",
        code: "PRODUCTION_MANAGEMENT",
        permissions: [
          { id: 3001, name: "View Production", code: "VIEW_PRODUCTION" },
          { id: 3002, name: "Create Production", code: "CREATE_PRODUCTION" },
          { id: 3003, name: "Edit Production", code: "EDIT_PRODUCTION" },
        ],
      },
      {
        id: 302,
        name: "Quality Control",
        code: "QC",
        permissions: [
          { id: 3004, name: "View QC", code: "VIEW_QC" },
          { id: 3005, name: "Approve QC", code: "APPROVE_QC" },
        ],
      },
      {
        id: 303,
        name: "Inventory",
        code: "INVENTORY",
        permissions: [
          { id: 3006, name: "View Stock", code: "VIEW_STOCK" },
          { id: 3007, name: "Adjust Stock", code: "ADJUST_STOCK" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "System",
    code: "SYSTEM",
    features: [
      {
        id: 401,
        name: "User Management",
        code: "USER_MANAGEMENT",
        permissions: [
          { id: 4001, name: "View Users", code: "VIEW_USERS" },
          { id: 4002, name: "Create User", code: "CREATE_USER" },
          { id: 4003, name: "Edit User", code: "EDIT_USER" },
          { id: 4004, name: "Delete User", code: "DELETE_USER" },
        ],
      },
      {
        id: 402,
        name: "Role Management",
        code: "ROLE_MANAGEMENT",
        permissions: [
          { id: 4005, name: "View Roles", code: "VIEW_ROLES" },
          { id: 4006, name: "Create Role", code: "CREATE_ROLE" },
          { id: 4007, name: "Edit Role", code: "EDIT_ROLE" },
          { id: 4008, name: "Delete Role", code: "DELETE_ROLE" },
        ],
      },
      {
        id: 403,
        name: "Settings",
        code: "SETTINGS",
        permissions: [
          { id: 4009, name: "General Settings", code: "MANAGE_SETTINGS" },
          { id: 4010, name: "Email Templates", code: "MANAGE_EMAILS" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Accounts",
    code: "ACCOUNTS",
    features: [
      {
        id: 501,
        name: "Accounting",
        code: "ACCOUNTING",
        permissions: [
          { id: 5001, name: "View Accounts", code: "VIEW_ACCOUNTS" },
          { id: 5002, name: "Create Transaction", code: "CREATE_TRANSACTION" },
          { id: 5003, name: "Edit Transaction", code: "EDIT_TRANSACTION" },
        ],
      },
      {
        id: 502,
        name: "Reports",
        code: "REPORTS",
        permissions: [
          { id: 5004, name: "View Reports", code: "VIEW_REPORTS" },
          { id: 5005, name: "Export Reports", code: "EXPORT_REPORTS" },
        ],
      },
      {
        id: 503,
        name: "Expenses",
        code: "EXPENSES",
        permissions: [
          { id: 5006, name: "View Expenses", code: "VIEW_EXPENSES" },
          { id: 5007, name: "Manage Expenses", code: "MANAGE_EXPENSES" },
        ],
      },
    ],
  },
];

/* =========================================================
   CHECKBOX
========================================================= */

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checked}
      aria-label={ariaLabel}
      onChange={(event) => {
        event.stopPropagation();
        onChange();
      }}
      onClick={(event) => event.stopPropagation()}
      className="h-3.5 w-3.5 shrink-0 cursor-pointer accent-[#009432]"
    />
  );
}

/* =========================================================
   PERMISSION MODAL
========================================================= */

export interface PermissionModalProps {
  open: boolean;
  onClose: () => void;
  permission?: any | null;
  onSuccess?: (newData: any) => void;
  title?: string;
}

const ACTIONS = ["create", "read", "update", "delete", "list"] as const;
const CONTEXTS = ["own", "any", "team", "department"] as const;

export default function PermissionModal({
  open,
  onClose,
  permission,
  onSuccess,
  title = "Permission",
}: PermissionModalProps) {
  const isEdit = Boolean(permission?.id);

  const [data, setData] = useState<ModuleItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(false);

  const [activeModuleId, setActiveModuleId] = useState<number | string | null>(
    null,
  );
  const [selectedByModule, setSelectedByModule] = useState<
    Record<string, string[]>
  >({});

  // Form State
  const [permissionName, setPermissionName] = useState("");
  const [permissionKey, setPermissionKey] = useState("");
  const [description, setDescription] = useState("");
  const [resource, setResource] = useState("");
  const [action, setAction] = useState<string>(ACTIONS[0]);
  const [context, setContext] = useState<string>(CONTEXTS[0]);
  const [featureId, setFeatureId] = useState<string>("");

  const [search, setSearch] = useState("");
  const initializedRef = useRef(false);
  const permissionRef = useRef(permission);

  useEffect(() => {
    permissionRef.current = permission;
  }, [permission]);

  // Initialize
  useEffect(() => {
    if (!open) {
      initializedRef.current = false;
      return;
    }
    if (initializedRef.current) return;
    initializedRef.current = true;

    const currentPermission = permissionRef.current;

    if (currentPermission) {
      setPermissionName(currentPermission.name ?? "");
      setPermissionKey(currentPermission.key ?? "");
      setDescription(currentPermission.description ?? "");
      setResource(currentPermission.resource ?? "");
      setAction(currentPermission.action ?? ACTIONS[0]);
      setContext(currentPermission.context ?? CONTEXTS[0]);
      setFeatureId(
        currentPermission.featureId ? String(currentPermission.featureId) : "",
      );
    } else {
      setPermissionName("");
      setPermissionKey("");
      setDescription("");
      setResource("");
      setAction(ACTIONS[0]);
      setContext(CONTEXTS[0]);
      setFeatureId("");
    }

    setLoading(true);
    setTimeout(() => {
      setData(DEMO_DATA);
      setActiveModuleId(DEMO_DATA[0].id);
      setSelectedByModule({ [String(DEMO_DATA[0].id)]: [] });
      setLoading(false);
      setUsingDemoData(true);
    }, 300);
  }, [open]);

  // Derived State
  const activeModule = useMemo(() => {
    if (!data || activeModuleId === null) return null;
    return data.find((m) => String(m.id) === String(activeModuleId)) || null;
  }, [data, activeModuleId]);

  const selectedPermissionIds = useMemo(() => {
    if (!activeModuleId) return new Set<string>();
    return new Set(selectedByModule[String(activeModuleId)] || []);
  }, [selectedByModule, activeModuleId]);

  const visibleFeatures = useMemo(() => {
    if (!activeModule) return [];
    if (!search.trim()) return activeModule.features;

    const q = search.toLowerCase();
    return activeModule.features
      .map((f) => {
        if (f.name.toLowerCase().includes(q)) return f;
        const perms = f.permissions.filter((p) =>
          p.name.toLowerCase().includes(q),
        );
        return perms.length > 0 ? { ...f, permissions: perms } : null;
      })
      .filter(Boolean) as FeatureItem[];
  }, [activeModule, search]);

  const allActivePermissionIds = useMemo(() => {
    if (!activeModule) return [];
    return activeModule.features.flatMap((f) =>
      f.permissions.map((p) => String(p.id)),
    );
  }, [activeModule]);

  const allActiveSelected =
    allActivePermissionIds.length > 0 &&
    allActivePermissionIds.every((id) => selectedPermissionIds.has(id));
  const someActiveSelected = allActivePermissionIds.some((id) =>
    selectedPermissionIds.has(id),
  );

  // Handlers
  const togglePermission = (
    p: PermissionItem,
    fId: string | number,
    featureName: string,
  ) => {
    const key = String(activeModuleId);
    setSelectedByModule((prev) => {
      const curr = new Set(prev[key] || []);
      const isSelected = curr.has(String(p.id));

      if (isSelected) {
        curr.delete(String(p.id));
      } else {
        curr.add(String(p.id));
        if (!isEdit) {
          // Auto-fill Form
          setPermissionName(`${featureName} - ${p.name}`);
          setPermissionKey(
            `${featureName.toLowerCase().replace(/\s+/g, "")}.${p.code?.toLowerCase() || "action"}`,
          );
          setFeatureId(String(fId));
          setAction(p.code?.toLowerCase() || "read");
          setResource(featureName.toLowerCase().replace(/\s+/g, "_"));
        }
      }
      return { ...prev, [key]: Array.from(curr) };
    });
  };

  const toggleFeature = (feature: FeatureItem) => {
    const key = String(activeModuleId);
    const ids = feature.permissions.map((p) => String(p.id));
    setSelectedByModule((prev) => {
      const curr = new Set(prev[key] || []);
      const all = ids.length > 0 && ids.every((i) => curr.has(i));
      ids.forEach((i) => (all ? curr.delete(i) : curr.add(i)));
      return { ...prev, [key]: Array.from(curr) };
    });
  };

  const toggleAll = () => {
    const key = String(activeModuleId);
    setSelectedByModule((prev) => {
      const curr = new Set(prev[key] || []);
      if (allActiveSelected)
        allActivePermissionIds.forEach((i) => curr.delete(i));
      else allActivePermissionIds.forEach((i) => curr.add(i));
      return { ...prev, [key]: Array.from(curr) };
    });
  };

  const handleSave = async () => {
    if (
      !permissionName.trim() ||
      !permissionKey.trim() ||
      !resource.trim() ||
      !featureId
    ) {
      alert(
        "Please fill all required fields (Name, Key, Resource, Feature ID).",
      );
      return;
    }

    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newData = {
        id: isEdit ? permission.id : Date.now().toString(),
        name: permissionName,
        key: permissionKey,
        description,
        resource,
        action,
        context,
        featureId,
        feature: {
          name:
            activeModule?.features.find((f) => f.id.toString() === featureId)
              ?.name || "Unknown",
          module: { name: activeModule?.name || "Unknown" },
        },
      };

      onClose();
      if (onSuccess) onSuccess(newData);
    } catch (err) {
      alert("Failed to save permission.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <Modal
      onClose={onClose}
      labelledBy="permission-modal-title"
      maxWidthClass="max-w-[1180px]"
    >
      {/* HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-3">
        <div>
          <h2
            id="permission-modal-title"
            className="text-[15px] font-semibold text-[#009432]"
          >
            {title}
          </h2>
          {usingDemoData && (
            <p className="mt-0.5 text-[10px] text-amber-600">
              Demo data is being displayed.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X size={15} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* MODULE TABS + SEARCH */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {data?.map((item) => {
              const isActive = String(activeModuleId) === String(item.id);
              const selectedCount =
                selectedByModule[String(item.id)]?.length ?? 0;

              return (
                <button
                  key={String(item.id)}
                  type="button"
                  onClick={() => {
                    setActiveModuleId(item.id);
                    setSearch("");
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded px-2.5 py-1.5 text-[10px] font-medium transition ${
                    isActive
                      ? "bg-[#009432] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{item.name}</span>
                  {selectedCount > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[8px] ${isActive ? "bg-white/20 text-white" : "bg-white text-slate-500"}`}
                    >
                      {selectedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-[230px]">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search features or permissions..."
              className="h-8 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2.5 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#009432] focus:ring-1 focus:ring-[#009432]/20"
            />
          </div>
        </div>

        {/* PERMISSION FORM FIELDS */}
        <div className="shrink-0 border-b border-slate-200 px-5 py-2.5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Name *
              </label>
              <input
                value={permissionName}
                onChange={(e) => setPermissionName(e.target.value)}
                placeholder="e.g. Create User"
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none transition focus:border-[#009432]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Key *
              </label>
              <input
                value={permissionKey}
                onChange={(e) => setPermissionKey(e.target.value)}
                placeholder="e.g. users.create"
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 font-mono text-[10px] text-slate-700 outline-none transition focus:border-[#009432]"
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description..."
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none transition focus:border-[#009432]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Resource *
              </label>
              <input
                value={resource}
                onChange={(e) => setResource(e.target.value)}
                placeholder="e.g. users"
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none transition focus:border-[#009432]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Feature ID *
              </label>
              <input
                value={featureId}
                onChange={(e) => setFeatureId(e.target.value)}
                placeholder="Auto-filled"
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 font-mono text-[10px] text-slate-700 outline-none transition focus:border-[#009432]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Action
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none focus:border-[#009432]"
              >
                {ACTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[70px] shrink-0 text-[10px] font-medium text-slate-600">
                Context
              </label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[10px] text-slate-700 outline-none focus:border-[#009432]"
              >
                {CONTEXTS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PERMISSION TABLE */}
        <div className="min-h-0 flex-1 overflow-auto px-5 py-3">
          {loading ? (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="text-[10px] text-slate-400">
                Loading permissions...
              </div>
            </div>
          ) : !activeModule ? (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="text-[10px] text-slate-400">No module found.</div>
            </div>
          ) : (
            <div className="overflow-hidden rounded border border-slate-200">
              {/* TABLE HEADER */}
              <div className="grid grid-cols-[210px_minmax(0,1fr)] border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 border-r border-slate-200 px-2.5 py-2">
                  <Checkbox
                    checked={allActiveSelected}
                    indeterminate={!allActiveSelected && someActiveSelected}
                    onChange={toggleAll}
                    ariaLabel="Select all permissions"
                  />
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="text-[10px] font-semibold text-slate-700"
                  >
                    Features
                  </button>
                </div>
                <div className="flex items-center px-2.5 py-2">
                  <span className="text-[10px] font-semibold text-slate-700">
                    Permissions
                  </span>
                </div>
              </div>

              {/* FEATURES */}
              {visibleFeatures.length === 0 ? (
                <div className="flex min-h-[120px] items-center justify-center">
                  <span className="text-[10px] text-slate-400">
                    No features or permissions found.
                  </span>
                </div>
              ) : (
                visibleFeatures.map((feature) => {
                  const featurePermissionIds = feature.permissions.map((p) =>
                    String(p.id),
                  );
                  const selectedCount = featurePermissionIds.filter((id) =>
                    selectedPermissionIds.has(id),
                  ).length;
                  const fullySelected =
                    featurePermissionIds.length > 0 &&
                    selectedCount === featurePermissionIds.length;
                  const partiallySelected =
                    selectedCount > 0 &&
                    selectedCount < featurePermissionIds.length;

                  return (
                    <div
                      key={String(feature.id)}
                      className="grid grid-cols-[210px_minmax(0,1fr)] border-b border-slate-200 last:border-b-0"
                    >
                      {/* FEATURE */}
                      <div className="flex min-h-[38px] items-center gap-2 border-r border-slate-200 px-2.5">
                        <Checkbox
                          checked={fullySelected}
                          indeterminate={partiallySelected}
                          onChange={() => toggleFeature(feature)}
                          ariaLabel={`Select ${feature.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className="min-w-0 truncate text-left text-[9px] font-medium text-slate-700"
                        >
                          {feature.name} (ID: {feature.id})
                        </button>
                      </div>

                      {/* PERMISSIONS */}
                      <div className="grid grid-cols-1 gap-1 p-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {feature.permissions.map((p) => {
                          const checked = selectedPermissionIds.has(
                            String(p.id),
                          );
                          return (
                            <button
                              key={String(p.id)}
                              type="button"
                              onClick={() =>
                                togglePermission(p, feature.id, feature.name)
                              }
                              className="flex cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-left transition hover:bg-slate-50"
                            >
                              <Checkbox
                                checked={checked}
                                onChange={() =>
                                  togglePermission(p, feature.id, feature.name)
                                }
                                ariaLabel={p.name}
                              />
                              <span
                                className={`text-[9px] leading-4 ${checked ? "font-medium text-slate-800" : "text-slate-500"}`}
                              >
                                {p.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-2.5">
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck size={13} className="text-[#009432]" />
          <span>{selectedPermissionIds.size} permissions selected</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={
              saving ||
              loading ||
              !permissionName.trim() ||
              !permissionKey.trim()
            }
            className="rounded-md bg-[#009432] px-3 py-1.5 text-[10px] font-medium text-white transition hover:bg-[#007f2a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
