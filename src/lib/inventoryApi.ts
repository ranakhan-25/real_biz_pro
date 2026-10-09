export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5002/realbizpro/api/v1";

// ---------------------------------------------------------------------------
// Generic Fetch Helper
// ---------------------------------------------------------------------------
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => null);
    const msg = errorJson?.message || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  const json = await res.json();
  return (json.data !== undefined ? json.data : json) as T;
}

// ---------------------------------------------------------------------------
// 1. Categories
// ---------------------------------------------------------------------------
export const categoriesApi = {
  getAll: () => apiFetch<any[]>("/inventory/categories"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/categories/${id}`),
  create: (data: { category_code: string; name: string }) =>
    apiFetch<any>("/inventory/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: { category_code: string; name: string }) =>
    apiFetch<any>(`/inventory/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/categories/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 2. Sub-Categories
// ---------------------------------------------------------------------------
export const subCategoriesApi = {
  getAll: () => apiFetch<any[]>("/inventory/sub-categories"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/sub-categories/${id}`),
  create: (data: { category_id: string; sub_category_code: string; name: string }) =>
    apiFetch<any>("/inventory/sub-categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: { category_id: string; sub_category_code: string; name: string }) =>
    apiFetch<any>(`/inventory/sub-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/sub-categories/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 3. Brands
// ---------------------------------------------------------------------------
export const brandsApi = {
  getAll: () => apiFetch<any[]>("/inventory/brands"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/brands/${id}`),
  create: (data: { code: string; name: string }) =>
    apiFetch<any>("/inventory/brands", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: { code: string; name: string }) =>
    apiFetch<any>(`/inventory/brands/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/brands/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 4. Units
// ---------------------------------------------------------------------------
export const unitsApi = {
  getAll: () => apiFetch<any[]>("/inventory/units"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/units/${id}`),
  create: (data: { code: string; name: string }) =>
    apiFetch<any>("/inventory/units", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: { code: string; name: string }) =>
    apiFetch<any>(`/inventory/units/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/units/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 5. Items (Item Entry)
// ---------------------------------------------------------------------------
export const itemsApi = {
  getAll: () => apiFetch<any[]>("/inventory/items"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/items/${id}`),
  create: (data: {
    item_code: string;
    name: string;
    type?: string;
    purchase_price: number;
    sale_price: number;
    category_id: string;
    sub_category_id?: string;
    brand_id?: string;
    unit_id: string;
  }) =>
    apiFetch<any>("/inventory/items", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiFetch<any>(`/inventory/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/items/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 6. Suppliers (Supplier Accounts)
// ---------------------------------------------------------------------------
export const suppliersApi = {
  getAll: () => apiFetch<any[]>("/inventory/suppliers"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/suppliers/${id}`),
  create: (data: {
    code: string;
    name: string;
    company?: string;
    mobile: string;
    email?: string;
    address?: string;
    credit_limit?: number;
    opening_balance?: number;
  }) =>
    apiFetch<any>("/inventory/suppliers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiFetch<any>(`/inventory/suppliers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/suppliers/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 7. Purchases
// ---------------------------------------------------------------------------
export const purchasesApi = {
  getAll: () => apiFetch<any[]>("/inventory/purchases"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/purchases/${id}`),
  create: (data: {
    date: string;
    supplier_id: string;
    payment_method?: string;
    subtotal: number;
    discount?: number;
    delivery_charge?: number;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
    items: { item_id: string; quantity: number; rate: number; amount: number }[];
  }) =>
    apiFetch<any>("/inventory/purchases", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiFetch<any>(`/inventory/purchases/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/purchases/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 8. Material Usage
// ---------------------------------------------------------------------------
export const materialUsageApi = {
  getAll: () => apiFetch<any[]>("/inventory/material-usage"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/material-usage/${id}`),
  create: (data: {
    date: string;
    note?: string;
    items: { item_id: string; quantity: number }[];
  }) =>
    apiFetch<any>("/inventory/material-usage", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/material-usage/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 9. Stock Transfers
// ---------------------------------------------------------------------------
export const stockTransfersApi = {
  getAll: () => apiFetch<any[]>("/inventory/stock-transfers"),
  getOne: (id: string | number) => apiFetch<any>(`/inventory/stock-transfers/${id}`),
  create: (data: {
    date: string;
    item_id: string;
    quantity: number;
    status?: string;
    note?: string;
  }) =>
    apiFetch<any>("/inventory/stock-transfers", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiFetch<any>(`/inventory/stock-transfers/${id}`, { method: "DELETE" }),
};

// ---------------------------------------------------------------------------
// 10. Reports
// ---------------------------------------------------------------------------
export const reportsApi = {
  getStockReport: () => apiFetch<any>("/inventory/reports/stock"),
  getMaterialComparison: () => apiFetch<any>("/inventory/reports/material-comparison"),
};
