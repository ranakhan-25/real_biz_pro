"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function EmployeeKpiPage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / KPI / Employee KPI Setting"
      title="Employee KPI Setting"
      description="Configure KPI targets and weighting per employee."
      addLabel="Add KPI"
      apiEndpoint="/crm/master/task-types"
      columns={[
        { key: "employee", label: "Employee" },
        { key: "metric", label: "KPI Metric" },
        { key: "target", label: "Target" },
        { key: "weight", label: "Weight %" },
      ]}
      transformData={(items) =>
        items.map((item: any) => ({
          id: item.uuid || item.id,
          employee: item.name || "Employee",
          metric: item.code || "Calls per day",
          target: item.projectId ? item.projectId.split("/")[0]?.trim() : "25",
          weight: item.projectId && item.projectId.includes("/") ? item.projectId.split("/")[1]?.trim() : "30%",
        }))
      }
      createFields={[
        { key: "name", label: "Employee Name", type: "text", required: true, placeholder: "e.g. Admin / Sabbir" },
        { key: "code", label: "KPI Metric", type: "text", required: true, placeholder: "e.g. Calls per day" },
        {
          key: "projectId",
          label: "Target / Weight (Target/Weight%)",
          type: "text",
          defaultValue: "25 / 30%",
          placeholder: "e.g. 25 / 30%",
        },
      ]}
      rows={[
        { id: "1", employee: "Admin", metric: "Calls per day", target: "25", weight: "30%" },
        { id: "2", employee: "Sabbir", metric: "Site visits per week", target: "5", weight: "25%" },
      ]}
    />
  );
}
