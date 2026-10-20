"use client";

import { CrmPageTemplate } from "@/components/crm/CrmPageTemplate";

export default function ProjectPage() {
  return (
    <CrmPageTemplate
      breadcrumb="CRM / Configuration / Project"
      title="Project"
      description="Manage the list of projects leads can be linked to."
      addLabel="Add Project"
      apiEndpoint="/project"
      columns={[
        { key: "code", label: "Project Code" },
        { key: "name", label: "Project Name" },
        { key: "location", label: "Location" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
      ]}
      transformData={(raw) => {
        const list = Array.isArray(raw) ? raw : (raw as any)?.data || [];
        return list.map((item: any) => ({
          id: item.uuid || item.id,
          code: item.code || "—",
          name: item.name || "N/A",
          location: item.location || "—",
          type: item.projectType || "Residential",
          status: item.status || "ACTIVE",
          description: item.description || "—",
        }));
      }}
      createFields={[
        {
          key: "code",
          label: "Project Code",
          type: "text",
          required: true,
          defaultValue: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
          placeholder: "e.g. PRJ-2026-01",
        },
        {
          key: "name",
          label: "Project Name",
          type: "text",
          required: true,
          placeholder: "e.g. Skyline Residency",
        },
        {
          key: "location",
          label: "Location",
          type: "text",
          placeholder: "e.g. Gulshan, Dhaka",
        },
        {
          key: "projectType",
          label: "Project Type",
          type: "select",
          defaultValue: "Residential",
          options: [
            { label: "Residential", value: "Residential" },
            { label: "Commercial", value: "Commercial" },
            { label: "Mixed-use", value: "Mixed-use" },
            { label: "Industrial", value: "Industrial" },
          ],
        },
        {
          key: "status",
          label: "Status",
          type: "select",
          defaultValue: "ACTIVE",
          options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Under Construction", value: "ACTIVE" },
            { label: "Completed", value: "COMPLETED" },
            { label: "On Hold", value: "ON_HOLD" },
          ],
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Enter brief project details...",
        },
      ]}
      rows={[
        { id: "1", code: "PRJ-101", name: "Skyline Residency", location: "Gulshan, Dhaka", type: "Residential", status: "Under Construction" },
        { id: "2", code: "PRJ-102", name: "Green Valley Tower", location: "Bashundhara, Dhaka", type: "Residential", status: "Under Construction" },
        { id: "3", code: "PRJ-103", name: "Riverside Heights", location: "Chattogram", type: "Residential", status: "Ready" },
      ]}
    />
  );
}
