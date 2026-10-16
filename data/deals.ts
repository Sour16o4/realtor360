import type { FilterGroup, RelatedItem } from "./types";

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

type DealDetail = {
  id: string;
  /** Only the designed page sets this; the other deals show their own list value. */
  value?: string;
  phone: string;
  email: string;
  contactPerson: string;
  stage: string;
  stageHistory: Array<{ stage: string; date: string; updatedBy: string }>;
  contactRoles: Array<{ name: string; role: string; email: string; phone: string }>;
  invoices: Array<{ number: string; amount: string; status: string; dueDate: string }>;
  meetings: Array<{ subject: string; date: string; time: string; participants: string; outcome: string }>;
  related: RelatedItem[];
};

/** The designed overview (Sunrise Villa Sale); every other deal uses it as a template with their own list values. */
const designedDealDetail: DealDetail = {
  id: "sunrise-villa-sale",
  value: "₹1.45 Cr",
  phone: "+91 98765 43210",
  email: "john.doe@example.com",
  contactPerson: "John Doe",
  stage: "Offer Accepted",
  stageHistory: [
    { stage: "Initial Contact", date: "10/06/2025", updatedBy: "Jessica Chen" },
    { stage: "Qualified", date: "12/06/2025", updatedBy: "Jessica Chen" },
    { stage: "Site Visit Done", date: "16/06/2025", updatedBy: "Jessica Chen" },
    { stage: "Proposal Sent", date: "20/06/2025", updatedBy: "Jessica Chen" },
    { stage: "Offer Accepted", date: "25/06/2025", updatedBy: "Jessica Chen" },
    { stage: "Closed Won", date: "30/06/2025", updatedBy: "Jessica Chen" },
  ],
  contactRoles: [
    { name: "John Doe", role: "Buyer", email: "john.doe@example.com", phone: "+91 98765 43210" },
    { name: "Priya Nair", role: "Broker", email: "priya@urbanbuild.com", phone: "+91 99321 67890" },
    { name: "Arjun Rao", role: "Legal Advisor", email: "arjun@urbanbuild.com", phone: "+91 99321 67890" },
  ],
  invoices: [
    { number: "INV-2045", amount: "₹50,000", status: "Paid", dueDate: "15/06/2025" },
    { number: "INV-2092", amount: "₹95,000", status: "Overdue", dueDate: "15/06/2025" },
    { number: "INV-2110", amount: "₹1,00,000", status: "Pending", dueDate: "30/07/2025" },
  ],
  meetings: [
    { subject: "Initial Buyer Discussion", date: "10/06/2025", time: "11:00 AM", participants: "John Doe, Jessica Chen", outcome: "Requirement collected" },
    { subject: "Site Visit", date: "15/06/2025", time: "03:00 PM", participants: "John Doe, Priya Nair", outcome: "Buyer impressed" },
    { subject: "Price Negotiation", date: "22/06/2025", time: "01:30 PM", participants: "John Doe, Jessica Chen", outcome: "Offer sent" },
    { subject: "Final Closing Meeting", date: "29/06/2025", time: "12:00 PM", participants: "All Stakeholders", outcome: "Deal closed" },
  ],
  related: [
    { label: "Notes" },
    { label: "Email" },
    { label: "Stage History", href: "#stage-history" },
    { label: "Contact Roles", href: "#contact-roles" },
    { label: "Invoices", href: "#invoices" },
    { label: "Meetings", href: "#meetings" },
    { label: "Activities" },
    { label: "Attachments" },
  ],
};

/** Every row of the list has a page; the designed deal keeps its own value, the others reuse the template. */
export const dealDetails: Record<string, DealDetail> = Object.fromEntries(
  deals.map((d) => [d.id, d.id === designedDealDetail.id ? designedDealDetail : { ...designedDealDetail, id: d.id, value: undefined }]),
);
