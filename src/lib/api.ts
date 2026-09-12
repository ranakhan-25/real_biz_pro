/**
 * Data layer for the CRM dashboard.
 *
 * Every function below returns a Promise shaped exactly like the JSON
 * a real endpoint would send back. Swap the body of each function for
 * a `fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)` call once the
 * NestJS backend exposes these routes — the components that consume
 * them will not need to change.
 */
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  tone: "accent" | "success" | "warning" | "danger" | "info" | "neutral";
  /** Lead stage id used to build the `?lead_stages=` query param. Omitted for "Total Leads". */
  leadStageId?: number;
}

export interface StatGroup {
  id: string;
  label: string;
  totalValue: number;
  tone: StatCardData["tone"];
  items: StatCardData[];
}

export interface TodoSummaryItem {
  id: string;
  label: string;
  value: number;
  emphasis?: "danger";
}

export interface FeedLead {
  id: string;
  leadId: string;
  name: string;
  caller: string;
  phone?: string;
  timestamp: string;
}

export interface FeedVisit {
  id: string;
  message: string;
}

export interface CalendarEvent {
  date: string; // ISO yyyy-mm-dd
  count: number;
  label: string;
}

export interface ActivityPoint {
  label: string;
  leads: number;
  followUps: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function groupStatCards(stats: StatCardData[]): StatGroup[] {
  const groups: Record<string, StatGroup> = {
    overview: {
      id: "overview",
      label: "Total Pipeline",
      totalValue: 0,
      tone: "accent",
      items: [],
    },
    active: {
      id: "active",
      label: "Active Deals",
      totalValue: 0,
      tone: "info",
      items: [],
    },
    closing: {
      id: "closing",
      label: "Closing & Won",
      totalValue: 0,
      tone: "success",
      items: [],
    },
    hold: {
      id: "hold",
      label: "Pending & Hold",
      totalValue: 0,
      tone: "warning",
      items: [],
    },
    archived: {
      id: "archived",
      label: "Junk & Lost",
      totalValue: 0,
      tone: "danger",
      items: [],
    },
  };

  const groupMapping: Record<string, keyof typeof groups> = {
    "total-leads": "overview",
    "junk-leads": "archived",
    lost: "archived",
    sold: "closing",
    closed: "closing",
    booked: "closing",
    booking: "closing",
    registration: "closing",
    exchange: "closing",
    "high-prospect": "active",
    priority: "active",
    negotiation: "active",
    visit: "active",
    query: "active",
    "new-call": "active",
    "follow-up": "active",
    lead: "active",
    potential: "active",
    "high-potential": "active",
    "token-lead": "active",
    hold: "hold",
    "emi-hold": "hold",
    "hold-for-later": "hold",
    "token-hold": "hold",
  };

  stats.forEach((stat) => {
    const groupId = groupMapping[stat.id] || "active";
    groups[groupId].items.push(stat);
    if (stat.id !== "total-leads") {
      groups[groupId].totalValue += stat.value;
    } else {
      groups[groupId].totalValue = stat.value;
    }
  });

  return Object.values(groups);
}

export async function fetchStatCards(): Promise<StatCardData[]> {
  await delay(250);
  // NOTE: leadStageId values below are placeholders — replace with your
  // actual lead-stage IDs from the backend. "Total Leads" has none since
  // it links to the unfiltered list.
  return [
    { id: "total-leads", label: "Total Leads", value: 128, tone: "accent" },
    {
      id: "junk-leads",
      label: "Junk Leads",
      value: 6,
      tone: "neutral",
      leadStageId: 1,
    },
    { id: "sold", label: "Sold", value: 14, tone: "success", leadStageId: 2 },
    {
      id: "high-prospect",
      label: "High Prospect",
      value: 22,
      tone: "accent",
      leadStageId: 3,
    },
    {
      id: "priority",
      label: "Priority",
      value: 9,
      tone: "warning",
      leadStageId: 4,
    },
    { id: "hold", label: "Hold", value: 11, tone: "info", leadStageId: 37 },
    { id: "lost", label: "Lost", value: 17, tone: "danger", leadStageId: 5 },
    {
      id: "closed",
      label: "Closed",
      value: 31,
      tone: "success",
      leadStageId: 6,
    },
    {
      id: "negotiation",
      label: "Negotiation",
      value: 8,
      tone: "warning",
      leadStageId: 7,
    },
    { id: "visit", label: "Visit", value: 13, tone: "info", leadStageId: 8 },
    { id: "query", label: "Query", value: 19, tone: "neutral", leadStageId: 9 },
    {
      id: "new-call",
      label: "New Call",
      value: 24,
      tone: "accent",
      leadStageId: 10,
    },
    {
      id: "follow-up",
      label: "Follow Up",
      value: 27,
      tone: "info",
      leadStageId: 11,
    },
    { id: "lead", label: "Lead", value: 41, tone: "neutral", leadStageId: 12 },
    {
      id: "booked",
      label: "Booked",
      value: 16,
      tone: "success",
      leadStageId: 13,
    },
    {
      id: "potential",
      label: "Potential",
      value: 20,
      tone: "accent",
      leadStageId: 14,
    },
    {
      id: "high-potential",
      label: "High Potential",
      value: 12,
      tone: "warning",
      leadStageId: 15,
    },
    {
      id: "token-lead",
      label: "Token Lead",
      value: 7,
      tone: "neutral",
      leadStageId: 16,
    },
    {
      id: "booking",
      label: "Booking",
      value: 10,
      tone: "success",
      leadStageId: 17,
    },
    {
      id: "registration",
      label: "Registration & Handover",
      value: 5,
      tone: "info",
      leadStageId: 18,
    },
    {
      id: "exchange",
      label: "Exchange",
      value: 3,
      tone: "neutral",
      leadStageId: 19,
    },
    {
      id: "emi-hold",
      label: "EMI Hold",
      value: 4,
      tone: "warning",
      leadStageId: 20,
    },
    {
      id: "hold-for-later",
      label: "Hold For Later",
      value: 6,
      tone: "neutral",
      leadStageId: 21,
    },
    {
      id: "token-hold",
      label: "Token Hold",
      value: 2,
      tone: "warning",
      leadStageId: 22,
    },
  ];
}

export async function fetchTodoSummary(): Promise<TodoSummaryItem[]> {
  await delay(200);
  return [
    { id: "todays-followup", label: "Today's Followup", value: 5 },
    { id: "todays-call", label: "Today's Call", value: 8 },
    { id: "todays-visit", label: "Today's Visit", value: 2 },
    {
      id: "missed-followup",
      label: "Missed Followup",
      value: 3,
      emphasis: "danger",
    },
    { id: "missed-visit", label: "Missed Visit", value: 0 },
    { id: "next-followup", label: "Next Followup", value: 6 },
  ];
}

export async function fetchNewLeads(): Promise<FeedLead[]> {
  await delay(300);
  return [
    {
      id: "1",
      leadId: "L260907-0022",
      name: "Serena Ahmed",
      caller: "Admin",
      timestamp: "10:14 AM",
    },
    {
      id: "2",
      leadId: "L260906-0020",
      name: "Sharmin Akter",
      caller: "Sarna",
      timestamp: "9:58 AM",
    },
    {
      id: "3",
      leadId: "L260906-0018",
      name: "Rafiq Islam",
      caller: "Admin",
      timestamp: "9:20 AM",
    },
  ];
}

export async function fetchFollowUps(): Promise<FeedLead[]> {
  await delay(300);
  return [
    {
      id: "1",
      leadId: "L260827-0012",
      name: "Golam Gaus",
      caller: "Admin",
      timestamp: "Yesterday",
    },
    {
      id: "2",
      leadId: "L260825-0009",
      name: "Nusrat Jahan",
      caller: "Sarna",
      timestamp: "2 days ago",
    },
  ];
}

export async function fetchTaskVisits(): Promise<FeedVisit[]> {
  await delay(250);
  return [{ id: "1", message: "No visit scheduled" }];
}

export async function fetchCalendarEvents(
  month: string,
): Promise<CalendarEvent[]> {
  await delay(200);
  return [
    { date: `${month}-08`, count: 2, label: "Site visits" },
    { date: `${month}-14`, count: 1, label: "Follow-up" },
  ];
}

export async function fetchActivityTrend(
  range: "today" | "weekly" | "monthly" | "yearly" | "all",
): Promise<ActivityPoint[]> {
  await delay(300);
  const base: Record<string, ActivityPoint[]> = {
    today: [
      { label: "9am", leads: 1, followUps: 0 },
      { label: "11am", leads: 2, followUps: 1 },
      { label: "1pm", leads: 1, followUps: 2 },
      { label: "3pm", leads: 3, followUps: 1 },
      { label: "5pm", leads: 2, followUps: 3 },
    ],
    weekly: [
      { label: "Mon", leads: 4, followUps: 3 },
      { label: "Tue", leads: 6, followUps: 4 },
      { label: "Wed", leads: 3, followUps: 5 },
      { label: "Thu", leads: 7, followUps: 4 },
      { label: "Fri", leads: 5, followUps: 6 },
      { label: "Sat", leads: 2, followUps: 2 },
      { label: "Sun", leads: 1, followUps: 1 },
    ],
    monthly: [
      { label: "W1", leads: 18, followUps: 12 },
      { label: "W2", leads: 22, followUps: 16 },
      { label: "W3", leads: 15, followUps: 14 },
      { label: "W4", leads: 27, followUps: 19 },
    ],
    yearly: [
      { label: "Jan", leads: 40, followUps: 30 },
      { label: "Feb", leads: 55, followUps: 38 },
      { label: "Mar", leads: 48, followUps: 35 },
      { label: "Apr", leads: 62, followUps: 44 },
    ],
    all: [
      { label: "2024", leads: 320, followUps: 260 },
      { label: "2025", leads: 410, followUps: 330 },
      { label: "2026", leads: 180, followUps: 140 },
    ],
  };
  return base[range] ?? base.weekly;
}

export interface PropertyStatusCount {
  status: string;
  count: number;
}

export async function fetchPropertyStatusCounts(): Promise<
  PropertyStatusCount[]
> {
  await delay(250);
  return [
    { status: "Ready Flat", count: 34 },
    { status: "Ongoing Project", count: 21 },
    { status: "Upcoming Project", count: 12 },
    { status: "Used Flat", count: 17 },
    { status: "Land Share", count: 9 },
  ];
}

export interface PersonEvent {
  name: string;
  mobile: string;
  date: string; // ISO yyyy-mm-dd
}

export interface DayActivity {
  date: string; // ISO yyyy-mm-dd
  visits: number;
  calls: number;
  birthdays: PersonEvent[];
  anniversaries: PersonEvent[];
}

export async function fetchDayActivity(dateISO: string): Promise<DayActivity> {
  await delay(250);
  const day = Number(dateISO.split("-")[2]);

  const hasEvents = day === 7;

  return {
    date: dateISO,
    visits: day % 3,
    calls: day % 5,
    birthdays: hasEvents
      ? [
          { name: "ssas", mobile: "345353", date: dateISO },
          { name: "serw", mobile: "123424243", date: dateISO },
        ]
      : [],
    anniversaries: hasEvents
      ? [
          { name: "ssas", mobile: "345353", date: dateISO },
          { name: "serw", mobile: "123424243", date: dateISO },
        ]
      : [],
  };
}
