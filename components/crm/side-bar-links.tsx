import {
  LayoutDashboard,
  SlidersHorizontal,
  UserRound,
  PhoneCall,
  CarFront,
  FileBarChart2,
  Gauge,
  FolderKanban,
  FileText,
  Users,
  CircleDollarSign,
  Share2,
  ClipboardList,
  Receipt,
  Home,
  ShoppingCart,
  Landmark,
  MapPin,
  Building2,
} from "lucide-react";

export interface NavNode {
  id: string;
  label: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavNode[];
}

export const NAV_TREE: NavNode[] = [
  // CRM MODULE
  {
    id: "crm-module",
    label: "CRM Module",
    icon: LayoutDashboard,
    children: [
      {
        id: "configuration",
        label: "Configuration",
        icon: SlidersHorizontal,
        children: [
          { id: "communication_status", label: "Communication Status", href: "/crm-module/communication_status" },
          { id: "teams", label: "Teams", href: "/crm-module/teams" },
          { id: "lead_category", label: "Lead Category", href: "/crm-module/lead_category" },
          { id: "campaign", label: "Campaign", href: "/crm-module/campaign" },
          { id: "profession", label: "Profession", href: "/crm-module/profession" },
          { id: "lead_source", label: "Lead Source", href: "/crm-module/add-lead-source" },
          { id: "offers", label: "Offers", href: "/crm-module/feature" },
          { id: "area", label: "Area", href: "/crm-module/area" },
          { id: "lead_stage", label: "Lead Stage", href: "/crm-module/lead_status" },
          { id: "project", label: "Project", href: "/project-module/projects" },
          { id: "price_range", label: "Price Range", href: "/crm-module/price-range" },
          { id: "requirement_type", label: "Requirement Type", href: "/crm-module/requirement-type" },
          { id: "visit_places", label: "Visit Places", href: "/crm-module/visit_places" },
          { id: "visit_status", label: "Visit Status", href: "/crm-module/visit_status" },
          { id: "task_type", label: "Task Type", href: "/crm-module/task_type" },
          { id: "internal_task", label: "Internal Task", href: "/crm-module/internal-tasks" },
        ],
      },
      {
        id: "lead",
        label: "Lead",
        icon: UserRound,
        children: [
          { id: "lead_account", label: "Lead", href: "/crm-module/add-lead-account" },
          { id: "junk_lead", label: "Junk Lead", href: "/crm-module/junk-add-lead-account" },
          { id: "transfer_history", label: "Transfer History", href: "/crm-module/transfer-call-list" },
        ],
      },
      {
        id: "call_center",
        label: "Call Center",
        icon: PhoneCall,
        children: [
          { id: "follow_up", label: "Follow Up", href: "/crm-module/reminder-call-list" },
          { id: "call_report", label: "Call Report", href: "/crm-module/call-report" },
          { id: "call_details_report", label: "Call Details Report", href: "/crm-module/call-details-report" },
          { id: "call_assign_history", label: "Call Assign History", href: "/crm-module/call-assign-history" },
        ],
      },
      {
        id: "task_visit",
        label: "Task / Visit",
        icon: CarFront,
        children: [
          { id: "reminder_task", label: "Task/Visit", href: "/crm-module/reminder-task-list" },
          { id: "deal_negotiation", label: "Deal Negotiation Activity", href: "/crm-module/deal-negotiation-activity-list" },
          { id: "visit_task_report", label: "Task/Visit Summary Report", href: "/crm-module/visit-task-report" },
          { id: "visit_details_report", label: "Task/Visit Details Report", href: "/crm-module/visit-details-report" },
        ],
      },
      {
        id: "property",
        label: "Property",
        icon: Building2,
        children: [
          { id: "flat", label: "Flat", href: "/inventory-module/flat" },
          {
            id: "land_group",
            label: "Land",
            children: [
              { id: "road", label: "Road", href: "/project-module/road" },
              { id: "block", label: "Block", href: "/project-module/block" },
              { id: "land", label: "Land", href: "/inventory-module/land" },
            ],
          },
          { id: "booking", label: "Booking", href: "/billing/flat_land_booking_list" },
          { id: "sale_offer", label: "Sale Offer", href: "/billing/flat_land_sale_offer_list" },
        ],
      },
      {
        id: "kpi",
        label: "KPI",
        icon: Gauge,
        children: [
          { id: "kpi_settings", label: "Employee KPI Setting", href: "/hrm-module/employee_wise_kpi_settings" },
          {
            id: "kpi_reports",
            label: "Reports",
            children: [
              { id: "employee_call_report", label: "Employee Call Report", href: "/hrm-module/employee_wise_call_report" },
              { id: "team_call_report", label: "Team Call Report", href: "/hrm-module/team_wise_task_report" },
            ],
          },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: FileBarChart2,
        children: [
          { id: "user_wise_report", label: "User Wise Report", href: "/crm-module/user-wise-call-task-report" },
          { id: "user_activity_report", label: "User Activity Report", href: "/crm-module/user-wise-activity-report" },
          { id: "sales_pipeline", label: "Sales Pipeline Funnel Report", href: "/crm-module/sales-pipeline-funnel-report" },
          { id: "team_reports", label: "Team Reports", href: "/crm-module/team-wise-lead-report" },
          { id: "interested_flat_land", label: "Interested Flat/Land", href: "/crm-module/flat-land-interest-list" },
          { id: "requirements", label: "Requirements", href: "/crm-module/see-requirements" },
          { id: "sales_probability", label: "Sales Probability", href: "/crm-module/sales-probability" },
          { id: "flat_land_sale_report", label: "Flat/Land Sale Report", href: "/billing/flat_land_sale_report" },
          { id: "missed_followup", label: "Missed FollowUp/Visit Summary", href: "/crm-module/missed-followup-list-report" },
          { id: "deal_negotiation_report", label: "Deal Negotiation Report", href: "/crm-module/deal-negotiation-report" },
          { id: "call_log_report", label: "Call Log Report", href: "/crm-module/call-log-report" },
          { id: "call_log_details", label: "Call Log Details Report", href: "/crm-module/call-log-details-report" },
        ],
      },
    ],
  },

  // PROJECT MODULE
  {
    id: "project",
    label: "Project Module",
    icon: FolderKanban,
    children: [
      { id: "project_type", label: "Project Type", href: "/project-module/project-type" },
      { id: "project_list", label: "Project", href: "/project-module/projects" },
      { id: "site", label: "Site", href: "/project-module/site" },
      { id: "project_reports", label: "Reports", href: "/project-module/reports" },
    ],
  },

  // DOCUMENT MODULE
  {
    id: "document",
    label: "Document Module",
    icon: FileText,
    children: [
      { id: "all_documents", label: "All Documents", href: "/document-module/all-documents" },
      { id: "upload_document", label: "Upload Document", href: "/document-module/upload" },
      { id: "templates", label: "Templates", href: "/document-module/templates" },
    ],
  },

  // CONTACT MODULE 
  {
    id: "contact",
    label: "Contact Module",
    icon: Users,
    children: [
      { id: "customer_accounts", label: "Customer-Accounts", href: "/contact-module/customer-accounts" },
      { id: "supplier_accounts", label: "Supplier Accounts", href: "/contact-module/supplier-accounts" },
      { id: "labour_workers_contractor", label: "Labour/Workers/Contractor", href: "/contact-module/labour-workers-contractor" },
    ],
  },

  // INVESTMENT MODULE
  {
    id: "investment",
    label: "Investment Module",
    icon: CircleDollarSign,
    children: [
      { id: "investors", label: "Investors", href: "/investment-module/investors" },
      { id: "investment_plans", label: "Investment Plans", href: "/investment-module/plans" },
      { id: "returns", label: "Returns", href: "/investment-module/returns" },
    ],
  },

  // SHARE PROJECT MODULE
  {
    id: "share-project",
    label: "Share Project Module",
    icon: Share2,
    children: [
      { id: "shared_with_me", label: "Shared With Me", href: "/share-project-module/shared-with-me" },
      { id: "share_settings", label: "Share Settings", href: "/share-project-module/settings" },
      { id: "assign_share", label: "Assign Share", href: "/share-project-module/assign" },
      { id: "share_report", label: "Share Report", href: "/share-project-module/share-report" },
      { id: "share_collection_report", label: "Share Collection Report", href: "/share-project-module/collection-report" },
      { id: "penalty_report", label: "Penalty Report", href: "/share-project-module/penalty-report" },
      { id: "shareholder_point_report", label: "ShareHolder Point Report", href: "/share-project-module/shareholder-point-report" },
      { id: "project_share_configuration", label: "Project Share Configuration", href: "/share-project-module/configuration" },
    ],
  },

  // REQUISITION MODULE
  {
    id: "requisition",
    label: "Requisition Module",
    icon: ClipboardList,
    children: [
      { id: "all_requisitions", label: "All Requisitions", href: "/requisition-module/all" },
      { id: "new_requisition", label: "New Requisition", href: "/requisition-module/new" },
      { id: "approvals", label: "Approvals", href: "/requisition-module/approvals" },
    ],
  },

  // BILLING MODULE
  {
    id: "billing",
    label: "Billing Module",
    icon: Receipt,
    children: [
      { id: "billing_configuration", label: "Configuration", href: "/billing/configuration" },
      { id: "bill_invoice", label: "Bill/Invoice", href: "/billing/invoice" },
      { id: "contractor_bill", label: "Contractor Bill", href: "/billing/contractor-bill" },
      { id: "labour_worker_bill", label: "Labour/Worker Bill", href: "/billing/labour-worker-bill" },
      { id: "work_order", label: "Work Order", href: "/billing/work-order" },
      { id: "contractor_work_order", label: "Contractor Work Order", href: "/billing/contractor-work-order" },
      { id: "period_billing", label: "Period Billing", href: "/billing/period-billing" },
      { id: "adjustment_billing", label: "Adjustment Billing", href: "/billing/adjustment-billing" },
      { id: "quote", label: "Quote", href: "/billing/quote" },
      { id: "labour_worker_bill_report", label: "Labour/Worker Bill Report", href: "/billing/labour-worker-bill-report" },
      { id: "payments", label: "Payments", href: "/billing/payments" },
      { id: "billing_settings", label: "Billing Settings", href: "/billing/settings" },
    ],
  },

  // FLAT/LAND MODULE
  {
    id: "flat-land",
    label: "Flat/Land Module",
    icon: Home,
    children: [
      { id: "flats", label: "Flats", href: "/flat-land-module/flats" },
      { id: "land", label: "Land", href: "/flat-land-module/land" },
      { id: "booking", label: "Booking", href: "/billing/flat_land_booking_list" },
      { id: "sale_offer", label: "Sale Offer", href: "/billing/flat_land_sale_offer_list" },
      { id: "flat_land_sale", label: "Flat/Land Sale", href: "/flat-land-module/sale" },
      { id: "flat_land_sale_report", label: "Flat/Land Sale Report", href: "/billing/flat_land_sale_report" },
      { id: "sale_collection_report", label: "Sale Collection Report", href: "/flat-land-module/sale-collection-report" },
      { id: "plot_distribution_report", label: "Plot Distribution Report", href: "/flat-land-module/plot-distribution-report" },
      { id: "aging_report", label: "Aging Report", href: "/flat-land-module/aging-report" },
      { id: "installment_report", label: "Installment Report", href: "/flat-land-module/installment-report" },
    ],
  },

  // PROCUREMENT MODULE
  {
    id: "procurement",
    label: "Procurement",
    icon: ShoppingCart,
    children: [
      { id: "pending_requisition", label: "Pending Requisition", href: "/procurement/pending-requisition" },
      { id: "requisition", label: "Requisition", href: "/procurement/requisition" },
      { id: "pending_purchase_order", label: "Pending Purchase Order", href: "/procurement/pending-purchase-order" },
      { id: "purchase_order", label: "Purchase Order", href: "/procurement/purchase-order" },
      { id: "pending_grn", label: "Pending GRN", href: "/procurement/pending-grn" },
      { id: "pending_purchase_bill", label: "Pending Purchase Bill", href: "/procurement/pending-purchase-bill" },
      { id: "overflow_material", label: "Overflow Material", href: "/procurement/overflow-material" },
      { id: "pending_voucher_invoice", label: "Pending Voucher/Invoice", href: "/procurement/pending-voucher-invoice" },
    ],
  },

  // CREDIT REALIZATION (CR) MODULE
  {
    id: "cr",
    label: "Credit Realization (CR)",
    icon: Landmark,
    children: [
      { id: "receipt_voucher", label: "Receipt Voucher", href: "/credit-realization/receipt-voucher" },
      { id: "overdue", label: "Overdue", href: "/credit-realization/overdue" },
      {
        id: "cr_reports",
        label: "Reports",
        children: [
          { id: "realization_summary_report", label: "Realization Summary Report", href: "/credit-realization/realization-summary-report" },
          { id: "cr_sale_collection_report", label: "Sale Collection Report", href: "/credit-realization/sale-collection-report" },
          { id: "cr_aging_report", label: "Aging Report", href: "/credit-realization/aging-report" },
          { id: "cr_installment_report", label: "Installment Report", href: "/credit-realization/installment-report" },
        ],
      },
    ],
  },

  // LAND ACQUISITION MODULE
  {
    id: "land-acquisition",
    label: "Land Acquisition",
    icon: MapPin,
    children: [
      { id: "land_owners", label: "Land Owners", href: "/land-acquisition/land-owners" },
      { id: "acquisition_leads", label: "Acquisition Leads", href: "/land-acquisition/leads" },
      { id: "negotiation_process", label: "Negotiation Process", href: "/land-acquisition/negotiation" },
      { id: "legal_documents", label: "Legal Documents", href: "/land-acquisition/legal-documents" },
      { id: "acquisition_follow_up", label: "Follow Up", href: "/land-acquisition/follow-up" },
    ],
  },
];