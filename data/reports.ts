import { attorneyFirms, type AttorneyFirm } from "./attorneyFirms";
import { companies, type Company } from "./companies";
import { dealDetails, deals, type Deal } from "./deals";
import { leads, leadValue, type Lead } from "./leads";
import type { FilterGroup } from "./types";
import { units, type Unit } from "./units";

export const reportFilters: FilterGroup[] = [
  {
    title: "Report Category",
    options: [
      "Deals Reports",
      "Leads Reports",
      "Units Reports",
      "Contacts Reports",
      "Hyderabad",
      "Development Reports",
      "Buildings Reports",
      "Finance Reports",
      "Attorney Firms Reports",
      "Companies Reports",
      "Activities Reports",
      "Broker/Sales Agent Reports",
      "Schedule Reports",
      "Company Reports",
      "Email Reports",
      "Meeting Reports",
      "Visit Reports",
    ],
  },
];

export type Report = {
  id: string;
  name: string;
  description: string;
  category: string;
  lastRun: string;
  /** Title of the report page when it differs from the list name (the design calls the first report "Leads by Source"). */
  pageTitle?: string;
};

const row = (id: string, name: string, description: string, category: string): Report => ({
  id,
  name,
  description,
  category,
  lastRun: "12 Jul 2025",
});

export const reports: Report[] = [
  {
    ...row("lead-by-source", "Lead by Source", "Breaks down leads by source (e.g., Referral, Website, Walk-in).", ""),
    pageTitle: "Leads by Source",
  },
  row("lead-conversion", "Lead Conversion Report", "Tracks how many leads have been successfully converted into deals.", "Leads Reports"),
  row("leads-by-status", "Leads by Status", "Report showing all leads grouped by their current status.", "Leads Reports"),
  row("deal-status-summary", "Deal Status Summary", "Overview of total deals categorized by current status.", "Deals Reports"),
  row("deals-by-owner", "Deals by Owner", "Shows deals grouped by assigned sales agents or brokers.", "Deals Reports"),
  row("deals-closing", "Deals Closing This Month", "List of deals expected to close in the current month.", "Deals Reports"),
  row("deal-value-trend", "Deal Value Trend (Monthly)", "Monthly summary of total deal value.", "Deals Reports"),
  row("unit-sales", "Unit Sales Report", "Units sold within selected timeframes, grouped by type or location.", "Units Reports"),
  row("unit-status", "Unit Status Summary", "Summary of unit statuses across all developments.", "Units Reports"),
  row("vacant-units", "Vacant Units Report", "List of units that are currently unassigned or unsold.", "Units Reports"),
  row("matters-by-firm", "Assigned Matters by Firm", "Number and types of legal cases handled by each attorney firm.", "Attorney Firms Reports"),
  row("company-deals", "Company Deal Report", "Shows companies associated with the most deals.", "Company Reports"),
];

export type ReportLead = {
  source: string;
  owner: string;
  name: string;
  company: string;
  email: string;
  mobile: string;
  requirement: string;
  status: string;
  budget: string;
};

/** The rows of the designed "Leads by Source" page. */
const reportLeads: ReportLead[] = [
  { source: "Website", owner: "Jessica Chen", name: "Rohan Malhotra", company: "Urban Spaces Pvt.", email: "rohan@urbanspaces.com", mobile: "+91 98765 12345", requirement: "3 BHK Apartment", status: "Interested", budget: "₹1.25 Cr" },
  { source: "Website", owner: "Ayesha Khan", name: "Kunal Bhatia", company: "Luxe Realty", email: "kunal@luxerealty.com", mobile: "+91 98765 12345", requirement: "2 BHK Apartment", status: "Interested", budget: "₹90 L" },
  { source: "Website", owner: "Deepak Rao", name: "Meera Joshi", company: "Joshi Associates", email: "meera.joshi@email.com", mobile: "+91 98765 12345", requirement: "3 BHK Penthouse", status: "In Progress", budget: "₹2.75 Cr" },
  { source: "Referral", owner: "Rahul Verma", name: "Priya Khanna", company: "Khanna Realty", email: "priya@khannarealty.com", mobile: "+91 98234 45678", requirement: "2 BHK Flat", status: "In Progress", budget: "₹85 L" },
  { source: "Walk-In", owner: "Rohit Mehra", name: "Manish Kapoor", company: "Elite Homes", email: "shweta@elitehomes.com", mobile: "+91 99876 33221", requirement: "3 BHK Apartment", status: "Converted", budget: "₹1.40 Cr" },
  { source: "Google Ads", owner: "Neha Gupta", name: "Tarun Arora", company: "—", email: "tarun.arora@email.com", mobile: "+91 90909 12345", requirement: "1 BHK Flat", status: "Follow-up", budget: "₹55 L" },
];

/** One column of a report table; `width` and `breakAll` are only set for the designed page. */
type Col<T> = { header: string; get: (item: T) => string; width?: number; breakAll?: boolean };

/** `columns` are the headers; the first cell of every row is the group label ("Name (count)" on the group's first row, otherwise ""). */
export type ReportTable = { columns: Array<Pick<Col<never>, "header" | "width" | "breakAll">>; rows: string[][] };

/** Groups `items` by `group` (groups in order of first appearance); the group column comes first, then `cols`. */
function grouped<T>(items: T[], group: Col<T>, cols: Col<T>[]): ReportTable {
  const sorted = [...new Set(items.map(group.get))].flatMap((key) => items.filter((item) => group.get(item) === key));
  const count = (item: T) => sorted.filter((other) => group.get(other) === group.get(item)).length;
  return {
    columns: [group, ...cols].map(({ header, width, breakAll }) => ({ header, width, breakAll })),
    rows: sorted.map((item, i) => [
      i === 0 || group.get(sorted[i - 1]) !== group.get(item) ? `${group.get(item)} (${count(item)})` : "",
      ...cols.map((col) => col.get(item)),
    ]),
  };
}

/** The list page's columns minus the one the report groups by. */
const without = <T>(cols: Col<T>[], group: Col<T>) => cols.filter((col) => col !== group);

const dealCols = {
  name: { header: "Deal Name", get: (d: Deal) => d.name },
  owner: { header: "Deal Owner", get: (d: Deal) => d.owner },
  development: { header: "Development", get: (d: Deal) => d.development },
  unit: { header: "Unit", get: (d: Deal) => d.unit },
  status: { header: "Status", get: (d: Deal) => d.status },
  value: { header: "Deal Value", get: (d: Deal) => d.value },
};
const dealList = Object.values(dealCols);

const unitCols = {
  name: { header: "Unit Name", get: (u: Unit) => u.name },
  building: { header: "Building", get: (u: Unit) => u.building },
  development: { header: "Development", get: (u: Unit) => u.development },
  type: { header: "Type", get: (u: Unit) => u.type },
  status: { header: "Status", get: (u: Unit) => u.status },
  price: { header: "Price", get: (u: Unit) => u.price },
};
const unitList = Object.values(unitCols);

const firmName: Col<AttorneyFirm> = { header: "Firm Name", get: (f) => f.name };
const firmCols: Col<AttorneyFirm>[] = [
  { header: "Email", get: (f) => f.email },
  { header: "Phone No.", get: (f) => f.phone },
  { header: "City", get: (f) => f.city },
  { header: "Status", get: (f) => f.status },
];

const companyCols = {
  name: { header: "Company Name", get: (c: Company) => c.name },
  type: { header: "Type", get: (c: Company) => c.type },
  projects: { header: "No. of Projects", get: (c: Company) => String(c.projects) },
  city: { header: "City", get: (c: Company) => c.city },
  status: { header: "Status", get: (c: Company) => c.status },
  owner: { header: "Owner Name", get: (c: Company) => c.owner },
};

const leadStatus: Col<Lead> = { header: "Lead Status", get: (l) => leadValue(l, "Lead Status") };
const leadCols: Col<Lead>[] = [
  { header: "Full Name", get: (l) => l.name },
  { header: "Email", get: (l) => l.email },
  ...["Lead Source", "Lead Category", "Lead Owner"].map((label) => ({ header: label, get: (l: Lead) => leadValue(l, label) })),
];

/** "30/06/2025" -> "June 2025" */
const month = (date: string) => {
  const [, m, y] = date.split("/");
  return `${new Date(2000, Number(m) - 1).toLocaleString("en-US", { month: "long" })} ${y}`;
};
/** Deals have no date of their own in the list; it comes from the deal's page data (the date of its last stage). */
const dealMonth = (d: Deal) => month(dealDetails[d.id].stageHistory.at(-1)!.date);

const sourceCol = (header: string, get: (l: ReportLead) => string, width: number, breakAll = false): Col<ReportLead> => ({ header, get, width, breakAll });

/** The table of every report page, by report id. */
export const reportTables: Record<string, ReportTable> = {
  "lead-by-source": grouped(reportLeads, sourceCol("Lead Source", (l) => l.source, 160), [
    sourceCol("Lead Owner", (l) => l.owner, 160),
    sourceCol("Full Name", (l) => l.name, 150),
    sourceCol("Company", (l) => l.company, 152),
    sourceCol("Email", (l) => l.email, 152, true),
    sourceCol("Mobile", (l) => l.mobile, 147),
    sourceCol("Requirement Type", (l) => l.requirement, 164),
    sourceCol("Lead Status", (l) => l.status, 154),
    sourceCol("Budget", (l) => l.budget, 150),
  ]),
  "lead-conversion": grouped(leads, leadStatus, leadCols),
  "leads-by-status": grouped(leads, leadStatus, leadCols),
  "deal-status-summary": grouped(deals, dealCols.status, without(dealList, dealCols.status)),
  "deals-by-owner": grouped(deals, dealCols.owner, without(dealList, dealCols.owner)),
  "deals-closing": grouped(deals, dealCols.status, dealList),
  "deal-value-trend": grouped(deals, { header: "Month", get: dealMonth }, dealList),
  "unit-sales": grouped(units, unitCols.building, without(unitList, unitCols.building)),
  "unit-status": grouped(units, unitCols.status, without(unitList, unitCols.status)),
  "vacant-units": grouped(units.filter((u) => u.status === "Active"), unitCols.building, without(unitList, unitCols.building)),
  "matters-by-firm": grouped(attorneyFirms, firmName, firmCols),
  "company-deals": grouped(companies, companyCols.type, without(Object.values(companyCols), companyCols.type)),
};

/** The Create Chart tiles, in the design's order. Only Vertical Bar and Donut Graph have a designed preview. */
export const chartTypes = [
  // The chart-*.svg files are named out of order (e.g. chart-funnel.svg draws the vertical bars), so each icon is listed here.
  { id: "vertical-bar", label: "Vertical Bar", icon: "/icons/chart-funnel.svg" },
  { id: "horizontal-bar", label: "Horizontal Bar", icon: "/icons/chart-donut.svg" },
  { id: "line", label: "Line Graph", icon: "/icons/chart-vertical-bar.svg" },
  { id: "donut", label: "Donut Graph", icon: "/icons/chart-horizontal-bar.svg" },
  { id: "pie", label: "Pie Chart", icon: "/icons/chart-line.svg" },
  { id: "area", label: "Area Chart", icon: "/icons/chart-pie.svg" },
  { id: "funnel", label: "Funnel Chart", icon: "/icons/chart-area.svg" },
] as const;

export type ChartTypeId = (typeof chartTypes)[number]["id"];

/** Callout labels of the 230px donut in the Create Chart preview (14px text), in px from the donut's top-left corner. */
export const createChartCallouts: Record<string, { label: [number, number] }> = {
  "Inbound Call": { label: [240, 35] },
  Reference: { label: [261, 176] },
  Website: { label: [-104, 66] },
  Facebook: { label: [-103, 177] },
};
