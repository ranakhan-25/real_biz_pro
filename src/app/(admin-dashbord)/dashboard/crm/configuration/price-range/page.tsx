"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function PriceRangePage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / Configuration / Price Range"
      title="Price Range"
      description="Manage the budget brackets used to filter leads and properties."
      addLabel="Add Range"
      apiEndpoint="/crm/master/price-ranges"
      columns={[
        { key: "name", label: "Range Name" },
        { key: "min", label: "Min Price" },
        { key: "max", label: "Max Price" },
      ]}
      transformData={(raw) => {
        const list = Array.isArray(raw) ? raw : (raw as any)?.data || [];
        return list.map((item: any) => ({
          id: item.uuid || item.id,
          name: item.name || "N/A",
          min: item.min_price !== undefined && item.min_price !== null ? `${Number(item.min_price).toLocaleString()} BDT` : "৳0",
          max: item.max_price !== undefined && item.max_price !== null ? `${Number(item.max_price).toLocaleString()} BDT` : "—",
          min_price: item.min_price,
          max_price: item.max_price,
        }));
      }}
      createFields={[
        { key: "name", label: "Range Name", type: "text", required: true, placeholder: "e.g. 50L - 1Cr" },
        { key: "min_price", label: "Min Price (BDT)", type: "number", placeholder: "e.g. 5000000" },
        { key: "max_price", label: "Max Price (BDT)", type: "number", placeholder: "e.g. 10000000" },
      ]}
      rows={[
        { id: "1", name: "Under 50L", min: "৳0", max: "৳50,00,000" },
        { id: "2", name: "50L - 1Cr", min: "৳50,00,000", max: "৳1,00,00,000" },
        { id: "3", name: "1Cr - 2Cr", min: "৳1,00,00,000", max: "৳2,00,00,000" },
        { id: "4", name: "Above 2Cr", min: "৳2,00,00,000", max: "—" },
      ]}
    />
  );
}
