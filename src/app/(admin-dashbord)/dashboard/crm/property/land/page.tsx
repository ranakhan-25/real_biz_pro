"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function LandPage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / Property / Land"
      title="Land"
      description="Manage land plot inventory."
      addLabel="Add Land"
      apiEndpoint="/flat-land/lands"
      columns={[
        { key: "plotNo", label: "Plot No" },
        { key: "location", label: "Location" },
        { key: "size", label: "Size (Katha)" },
        { key: "status", label: "Status" },
        { key: "price", label: "Price" },
      ]}
      transformData={(items) =>
        items.map((item: any) => ({
          id: item.uuid || item.id,
          plotNo: item.flatLandNo || item.plotNo || "N/A",
          location: item.plotLocation || item.location || "Dhaka",
          size: item.size || "—",
          status: item.status || "Available",
          price: item.subtotal && Number(item.subtotal) > 0 ? `৳${Number(item.subtotal).toLocaleString()}` : (item.price || "—"),
        }))
      }
      createFields={[
        { key: "flatLandNo", label: "Plot No", type: "text", required: true, placeholder: "e.g. 14B" },
        { key: "plotLocation", label: "Location", type: "text", placeholder: "e.g. Purbachal, Dhaka" },
        { key: "size", label: "Size (Katha)", type: "text", placeholder: "e.g. 5" },
        {
          key: "status",
          label: "Status",
          type: "select",
          defaultValue: "Available",
          options: [
            { label: "Available", value: "Available" },
            { label: "Booked", value: "Booked" },
            { label: "Sold", value: "Sold" },
          ],
        },
        { key: "subtotal", label: "Price (BDT)", type: "number", placeholder: "e.g. 25000000" },
      ]}
      rows={[
        { id: "1", plotNo: "14B", location: "Purbachal, Dhaka", size: "5", status: "Available", price: "৳2,50,00,000" },
        { id: "2", plotNo: "R-09", location: "Savar, Dhaka", size: "10", status: "Sold", price: "৳4,00,00,000" },
      ]}
    />
  );
}
