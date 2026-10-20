"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function CommunicationStatusPage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / Configuration / Communication Status"
      title="Communication Status"
      description="Manage the outcome labels used when logging a call or contact attempt."
      addLabel="Add Communication Status"
      apiEndpoint="/crm/master/visit-statuses"
      columns={[
        { key: "name", label: "Name" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
      ]}
      transformData={(items) =>
        items.map((item: any) => ({
          id: item.uuid || item.id,
          name: item.name || "N/A",
          type: item.color || "Positive",
          status: item.projectId || "Active",
        }))
      }
      createFields={[
        { key: "name", label: "Status Name", type: "text", required: true, placeholder: "e.g. Interested" },
        {
          key: "color",
          label: "Type",
          type: "select",
          defaultValue: "Positive",
          options: [
            { label: "Positive", value: "Positive" },
            { label: "Negative", value: "Negative" },
            { label: "Neutral", value: "Neutral" },
          ],
        },
        {
          key: "projectId",
          label: "Active Status",
          type: "select",
          defaultValue: "Active",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
        },
      ]}
      rows={[
        { id: "1", name: "Interested", type: "Positive", status: "Active" },
        { id: "2", name: "Not Interested", type: "Negative", status: "Active" },
        { id: "3", name: "Call Back Later", type: "Neutral", status: "Active" },
        { id: "4", name: "No Response", type: "Neutral", status: "Active" },
        { id: "5", name: "Wrong Number", type: "Negative", status: "Inactive" },
      ]}
    />
  );
}
