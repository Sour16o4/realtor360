import type { FilterGroup } from "./types";

export const dealFilters: FilterGroup[] = [
  { title: "Deal Owner", options: ["Jessica Chen", "Arjun Rao", "Priya Nair", "Sunil Mehta"] },
  { title: "Status", options: ["Open", "In Progress", "Closed Won", "Closed Lost", "On Hold"] },
  {
    title: "Developments",
    options: ["Sunrise Enclave", "Palm Greens", "Orion Tech Square", "Orchid Heights", "Lotus Crest"],
  },
  { title: "Unit Name", options: ["A-101 (3 BHK)", "B2-205 (2 BHK)", "PH-01 (Penthouse)", "T1-504 (Commercial)"] },
];

export type Deal = {
  id: string;
  name: string;
  owner: string;
  development: string;
  unit: string;
  status: string;
  value: string;
};

const row = (
  id: string,
  name: string,
  owner: string,
  development: string,
  unit: string,
  status: string,
  value: string,
): Deal => ({ id, name, owner, development, unit, status, value });

export const deals: Deal[] = [
  row("sunrise-villa-sale", "Sunrise Villa Sale", "Jessica Chen", "Sunrise Enclave", "Unit A-101 (3 BHK)", "Closed Won", "₹1.45Cr"),
  row("lotus-crest-b2", "Lotus Crest B2 Booking", "Arjun Rao", "Lotus Crest", "Unit B2-205 (2 BHK)", "In Progress", "₹98L"),
  row("orchid-heights-lease", "Orchid Heights Lease", "Priya Nair", "Orchid Heights", "Unit A-307", "Closed Lost", "₹1.95Cr"),
  row("orion-tech-park", "Orion Tech Park Deal", "Sunil Mehta", "Orion Tech Square", "Unit T1-504", "Open", "₹2.20Cr"),
  row("palm-greens-penthouse", "Palm Greens Penthouse Sale", "Jessica Chen", "Palm Greens", "Unit PH-01", "Closed Lost", "₹2.00Cr"),
  row("sunrise-enclave-duplex", "Sunrise Enclave- Duplex", "Arjun Rao", "Sunrise Enclave", "Unit D-208", "Closed Won", "₹1.85Cr"),
  row("lotus-crest-a3", "Lotus Crest A3 Sale", "Priya Nair", "Lotus Crest", "Unit A3-109", "Closed Won", "₹1.10Cr"),
  row("orchid-heights-corner", "Orchid Heights Corner Flat", "Sunil Mehta", "Orchid Heights", "Unit C-312", "Closed Won", "₹1.25Cr"),
  row("sunrise-villa-sale-2", "Sunrise Villa Sale", "Jessica Chen", "Sunrise Enclave", "Unit A-101 (3 BHK)", "Closed Won", "₹1.45Cr"),
  row("sunrise-villa-sale-3", "Sunrise Villa Sale", "Jessica Chen", "Sunrise Enclave", "Unit A-101 (3 BHK)", "Closed Lost", "₹1.45Cr"),
];
