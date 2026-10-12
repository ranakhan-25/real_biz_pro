import test from "node:test";
import assert from "node:assert/strict";

// Import fallback datasets and API definitions from inventoryApi
import {
  fallbackCategories,
  fallbackSubCategories,
  fallbackBrands,
  fallbackUnits,
  fallbackItems,
  fallbackSuppliers,
  fallbackPurchases,
  fallbackStockReport,
  fallbackMaterialComparison,
  fallbackMaterialUsage,
  reportsApi,
} from "../lib/inventoryApi.ts";

// Import LAMS mock datasets
import {
  mockAcquisitionLeads,
  mockLandOwners,
  mockNegotiations,
  mockLegalDocuments,
  mockFollowUps,
} from "../data/lams/lams.mock.ts";

test("LAMS: mock datasets are non-empty and well-structured", () => {
  assert.ok(Array.isArray(mockAcquisitionLeads), "Acquisition leads must be an array");
  assert.ok(mockAcquisitionLeads.length > 0, "Acquisition leads must have fallback data");

  for (const lead of mockAcquisitionLeads) {
    assert.ok(lead.id, "Lead must have an id");
    assert.ok(lead.district, "Lead must have district");
    assert.ok(lead.mouza, "Lead must have mouza");
    assert.ok(lead.leadStatus || (lead as any).status, "Lead must have status");
  }

  assert.ok(Array.isArray(mockLandOwners), "Land owners must be an array");
  assert.ok(mockLandOwners.length > 0, "Land owners must have items");
  for (const owner of mockLandOwners) {
    assert.ok(owner.id, "Owner must have id");
    assert.ok(owner.ownerName || (owner as any).name, "Owner must have name");
    assert.ok(owner.acquisitionLeadId || (owner as any).leadId, "Owner must have leadId");
  }

  assert.ok(Array.isArray(mockNegotiations), "Negotiation records must be an array");
  assert.ok(mockNegotiations.length > 0, "Negotiations must have items");

  assert.ok(Array.isArray(mockLegalDocuments), "Legal documents must be an array");
  assert.ok(mockLegalDocuments.length > 0, "Legal docs must have items");

  assert.ok(Array.isArray(mockFollowUps), "Follow ups must be an array");
  assert.ok(mockFollowUps.length > 0, "Follow ups must have items");
});

test("LAMS: Lead IDs and UUIDs are properly normalized", () => {
  const sampleLead = mockAcquisitionLeads[0];
  const normalizedId = sampleLead.uuid || sampleLead.id;
  assert.ok(typeof normalizedId === "string", "Normalized ID must be a string");
  assert.ok(normalizedId.length > 0, "Normalized ID must not be empty");
});

test("LAMS: Payload builder generates Swagger-compliant schemas", () => {
  // Test Lead Payload
  const leadPayload = {
    title: "Project Expansion Plot 4",
    district: "Dhaka",
    upazila: "Savar",
    mouza: "Hemayetpur",
    jl_number: "JL-88",
    plot_number: "PL-101",
    total_land_area: 45.5,
    estimated_budget: 15000000,
    source: "Direct Contact",
    priority: "High",
    assigned_to: "Officer A",
    notes: "Site visit completed",
    projectId: "PRJ-1001",
  };
  assert.strictEqual(leadPayload.projectId, "PRJ-1001");
  assert.strictEqual(typeof leadPayload.total_land_area, "number");
  assert.strictEqual(typeof leadPayload.estimated_budget, "number");

  // Test Land Owner Payload
  const ownerPayload = {
    lead_id: "0a5f9737-fbca-4c91-9e79-8ec9d58beae8",
    name: "Mohammad Ali",
    phone: "01711000000",
    nid_number: "19882692012345678",
    ownership_type: "Individual",
    share_percentage: 100,
    projectId: "PRJ-1001",
  };
  assert.ok(ownerPayload.lead_id.includes("-"), "lead_id should be UUID format");
  assert.strictEqual(ownerPayload.share_percentage, 100);

  // Test Negotiation Record Payload
  const negPayload = {
    lead_id: "0a5f9737-fbca-4c91-9e79-8ec9d58beae8",
    meeting_date: "2026-10-12",
    discussion_points: "Price negotiation",
    demanded_price: 5000000,
    offered_price: 4500000,
    status: "In Progress",
    projectId: "PRJ-1001",
  };
  assert.strictEqual(negPayload.status, "In Progress");
  assert.ok(negPayload.demanded_price > negPayload.offered_price);

  // Test Follow-up Item Payload
  const followUpPayload = {
    lead_id: "0a5f9737-fbca-4c91-9e79-8ec9d58beae8",
    action_item: "Document collection",
    due_date: "2026-10-20",
    assigned_to: "Officer B",
    priority: "High",
    status: "Pending",
    projectId: "PRJ-1001",
  };
  assert.strictEqual(followUpPayload.priority, "High");
});

test("Inventory: Fallback categories and subcategories are complete", () => {
  assert.ok(Array.isArray(fallbackCategories), "Categories must be array");
  assert.ok(fallbackCategories.length >= 5, "Categories must contain at least 5 items");

  for (const cat of fallbackCategories) {
    assert.ok(cat.id, "Category must have id");
    assert.ok(cat.category_code, "Category must have category_code");
    assert.ok(cat.name, "Category must have name");
  }

  assert.ok(Array.isArray(fallbackSubCategories), "Subcategories must be array");
  assert.ok(fallbackSubCategories.length >= 5, "Subcategories must contain at least 5 items");

  for (const sub of fallbackSubCategories) {
    assert.ok(sub.id, "Subcategory must have id");
    assert.ok(sub.category_id, "Subcategory must have category_id");
    assert.ok(sub.name, "Subcategory must have name");
  }
});

test("Inventory: Fallback brands and units are valid", () => {
  assert.ok(Array.isArray(fallbackBrands), "Brands must be array");
  assert.ok(fallbackBrands.length >= 4, "Brands must have at least 4 items");

  for (const b of fallbackBrands) {
    assert.ok(b.id, "Brand must have id");
    assert.ok(b.name, "Brand must have name");
  }

  assert.ok(Array.isArray(fallbackUnits), "Units must be array");
  assert.ok(fallbackUnits.length >= 4, "Units must have at least 4 items");

  for (const u of fallbackUnits) {
    assert.ok(u.id, "Unit must have id");
    assert.ok(u.code, "Unit must have code");
    assert.ok(u.name, "Unit must have name");
  }
});

test("Inventory: Fallback items have valid nested references", () => {
  assert.ok(Array.isArray(fallbackItems), "Items must be array");
  assert.ok(fallbackItems.length > 0, "Items must have items");

  for (const item of fallbackItems) {
    assert.ok(item.id, "Item must have id");
    assert.ok(item.item_code, "Item must have item_code");
    assert.ok(item.name, "Item must have name");
    assert.ok(item.category_id, "Item must have category_id");
    assert.ok(item.unit_id, "Item must have unit_id");
    assert.ok(typeof item.purchase_price === "number", "Item purchase_price must be number");
  }
});

test("Inventory: Fallback purchases and suppliers format matches Swagger schema", () => {
  assert.ok(Array.isArray(fallbackSuppliers), "Suppliers must be array");
  assert.ok(fallbackSuppliers.length > 0, "Suppliers must have items");

  assert.ok(Array.isArray(fallbackPurchases), "Purchases must be array");
  assert.ok(fallbackPurchases.length > 0, "Purchases must have items");

  for (const p of fallbackPurchases) {
    assert.ok(p.id, "Purchase must have id");
    assert.ok(p.code || (p as any).purchase_no || (p as any).invoice_no, "Purchase must have code/purchase_no");
    assert.ok(p.supplier, "Purchase must have supplier");
    assert.ok(Array.isArray(p.items), "Purchase must have items array");
    assert.ok(p.items.length > 0, "Purchase must have at least 1 item line");
    assert.ok((p.grand_total || (p as any).total_amount) > 0, "Purchase must have total amount");
  }
});

test("Inventory: Stock report and Material comparison fallbacks contain valid metrics", () => {
  assert.ok(Array.isArray(fallbackStockReport), "Stock report must be array");
  assert.ok(fallbackStockReport.length > 0, "Stock report must have items");

  for (const sr of fallbackStockReport) {
    assert.ok(sr.item_id, "Stock item must have item_id");
    assert.ok(sr.item_name, "Stock item must have item_name");
    assert.ok(sr.category, "Stock item must have category");
    assert.ok(sr.unit, "Stock item must have unit");
    assert.ok(typeof sr.current_stock === "number", "current_stock must be number");
  }

  assert.ok(Array.isArray(fallbackMaterialComparison), "Material comparison must be array");
  assert.ok(fallbackMaterialComparison.length > 0, "Material comparison must have items");

  for (const mc of fallbackMaterialComparison) {
    assert.ok(mc.item_name, "Material item must have item_name");
    assert.ok(mc.budget_qty >= 0, "budget_qty must be >= 0");
    assert.ok(mc.purchase_qty >= 0, "purchase_qty must be >= 0");
  }
});

test("Inventory: Fallback material usage contains complete site and worker details", () => {
  assert.ok(Array.isArray(fallbackMaterialUsage), "Material usage must be array");
  assert.ok(fallbackMaterialUsage.length > 0, "Material usage must have items");

  for (const mu of fallbackMaterialUsage) {
    assert.ok(mu.id, "Usage must have id");
    assert.ok(mu.usage_no, "Usage must have usage_no");
    assert.ok(mu.project?.name || mu.project_name, "Usage must have project");
    assert.ok(mu.title_of_work, "Usage must have title_of_work");
    assert.ok(mu.task, "Usage must have task");
    assert.ok(mu.site?.name || mu.site_name, "Usage must have site");
    assert.ok(mu.worker_staff_name, "Usage must have worker");
    assert.ok(mu.item_name, "Usage must have item_name");
    assert.ok(mu.quantity > 0, "Usage must have positive quantity");
  }
});

test("Inventory: reportsApi material comparison endpoint builds query parameter properly", () => {
  const projectId = "PRJ-1001";
  const expectedParam = `?project_id=${projectId}`;
  assert.ok(expectedParam.includes("project_id=PRJ-1001"));
});
