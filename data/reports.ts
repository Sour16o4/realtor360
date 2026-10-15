import type { FilterGroup } from "./types";

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
};

const row = (id: string, name: string, description: string, category: string): Report => ({
  id,
  name,
  description,
  category,
  lastRun: "12 Jul 2025",
});

export const reports: Report[] = [
  row("leads-by-source", "Lead by Source", "Breaks down leads by source (e.g., Referral, Website, Walk-in).", ""),
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
