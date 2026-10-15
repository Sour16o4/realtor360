import type { DealsClosed, SalesPersonDeals } from "./dashboard";
import type { CalloutPlacement } from "@/components/dashboard/LeadSourceChart";

// The lead sources, stages and pipeline on /dashboards are the same records as Home (data/dashboard.ts).

/** The Dashboards frame draws longer bars than Home's; the "None" bar of the first person runs past the 20 line. */
export const dashboardSalesPeople: SalesPersonDeals[] = [
  { owner: "Rohit Mehra", plaza: 4.93, garden: 11.12, none: 21.76 },
  { owner: "Priya Nair", plaza: 2.33, garden: 7.89, none: 12.11 },
];

export const dashboardDealsClosed: DealsClosed = { closed: 42, inProgress: 132, fillPercent: 42.4 };

/** Callouts of the 311px donut, in px from its top-left corner. */
export const dashboardCallouts: Record<string, CalloutPlacement> = {
  "Inbound Call": { label: [341, 45], arrow: [254.3, 31.6, 66.9, 24.2] },
  Reference: { label: [369, 248], arrow: [236.5, 269, 111, 22] },
  Website: { label: [-104, 91], arrow: [-42.3, 55.1, 87.4, 30.3] },
  Facebook: { label: [-104, 234], arrow: [-44, 226.6, 81.2, 51.8] },
};
