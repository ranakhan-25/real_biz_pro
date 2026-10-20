"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function FollowUpPage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / Call Center / Follow Up"
      title="Follow Up"
      description="Scheduled and completed follow-up calls."
      addLabel="Add Follow-up"
      apiEndpoint="/crm/tasks"
      columns={[
        { key: "leadId", label: "Lead ID" },
        { key: "name", label: "Name" },
        { key: "followUpDate", label: "Follow-up Date" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
        { key: "agent", label: "Agent" },
      ]}
      transformData={(items) =>
        items.map((item: any) => ({
          id: item.uuid || item.id,
          leadId: item.related_lead_id ? `L2608-${item.related_lead_id}` : (item.leadId || "L2608-001"),
          name: item.title || item.client_name || "Client Follow-up",
          followUpDate: item.due_date ? String(item.due_date).slice(0, 10) : "2026-09-10",
          type: item.priority ? String(item.priority).toUpperCase() : "Call",
          status: item.status || "Due",
          agent: item.assignees?.[0]?.user_id || "Admin",
        }))
      }
      createFields={[
        { key: "title", label: "Client Name", type: "text", required: true, placeholder: "e.g. Golam Gaus" },
        {
          key: "due_date",
          label: "Follow-up Date",
          type: "date",
          defaultValue: new Date().toISOString().slice(0, 10),
        },
        {
          key: "priority",
          label: "Type",
          type: "select",
          defaultValue: "Call",
          options: [
            { label: "Call", value: "Call" },
            { label: "Visit", value: "Visit" },
            { label: "Meeting", value: "Meeting" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          defaultValue: "Due",
          options: [
            { label: "Due", value: "Due" },
            { label: "Completed", value: "Completed" },
            { label: "Pending", value: "Pending" },
          ],
        },
        { key: "description", label: "Discussion Notes", type: "textarea", placeholder: "Enter discussion details..." },
      ]}
      rows={[
        { id: "1", leadId: "L260827-0012", name: "Golam Gaus", followUpDate: "2026-09-10", type: "Call", status: "Due", agent: "Admin" },
        { id: "2", leadId: "L260825-0009", name: "Nusrat Jahan", followUpDate: "2026-09-09", type: "Visit", status: "Completed", agent: "Sabbir" },
      ]}
    />
  );
}
