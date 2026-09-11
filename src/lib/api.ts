/**
 * Data layer for the CRM dashboard.
 *
 * Every function below returns a Promise shaped exactly like the JSON
 * a real endpoint would send back. Swap the body of each function for
 * a `fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)` call once the
 * NestJS backend exposes these routes — the components that consume
 * them will not need to change.
 */

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  tone: "accent" | "success" | "warning" | "danger" | "info" | "neutral";
  /** Lead stage id used to build the `?lead_stages=` query param. Omitted for "Total Leads". */
  leadStageId?: number;
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

export async function fetchStatCards(): Promise<StatCardData[]> {
  await delay(250);
  return [
    { id: "total-leads", label: "Total Inquiries", value: 128, tone: "accent" },
    { id: "hot-prospects", label: "Hot Prospects", value: 22, tone: "warning", leadStageId: 1 },
    { id: "site-visits", label: "Site Visits Scheduled", value: 13, tone: "info", leadStageId: 2 },
    { id: "booking-pending", label: "Token / Booking", value: 10, tone: "accent", leadStageId: 3 },
    { id: "closed-deals", label: "Handover & Closed", value: 31, tone: "success", leadStageId: 4 },
    { id: "junk-leads", label: "Junk Inquiries", value: 6, tone: "neutral", leadStageId: 5 },
  ];
}

export async function fetchTodoSummary(): Promise<TodoSummaryItem[]> {
  await delay(200);
  return [
    { id: "todays-followup", label: "Today's Followup", value: 5 },
    { id: "todays-call", label: "Today's Call", value: 8 },
    { id: "todays-visit", label: "Today's Visit", value: 2 },
    { id: "missed-followup", label: "Missed Followup", value: 3, emphasis: "danger" },
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
    { id: "3", leadId: "L260906-0018", name: "Rafiq Islam", caller: "Admin", timestamp: "9:20 AM" },
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

export async function fetchCalendarEvents(month: string): Promise<CalendarEvent[]> {
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

export async function fetchPropertyStatusCounts(): Promise<PropertyStatusCount[]> {
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

  // Demo data: a couple of sample dates carry birthday/anniversary entries,
  // everything else comes back with empty lists.
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
