import type { FilterGroup, RelatedItem } from "./types";

export const leadFilters: FilterGroup[] = [
  {
    title: "Lead Source",
    options: ["Website Referral from Client", "Social Media", "Walk-in", "Cold Call", "Campaign", "Event"],
  },
  { title: "Lead Status", options: ["Active", "In Progress", "Converted", "Cold", "Not Interested"] },
  { title: "Lead Category", options: ["Corporate", "Individual", "Investor", "Agent", "Other"] },
  { title: "Lead Owner", options: ["Jessica Chen", "Evan Chris", "Jack B.", "Emily Paris"] },
];

export type Lead = {
  id: string;
  name: string;
  email: string;
  photo: string;
  details: Array<[label: string, value: string]>;
};

const johnDoe = (id: string): Lead => ({
  id,
  name: "John Doe",
  email: "john@urbanrealty.com",
  photo: "/images/lead-john-doe-portrait.webp",
  details: [
    ["Lead Source", "Referral from Client"],
    ["Lead Status", "Interested"],
    ["Lead Category", "Corporate"],
    ["Lead Owner", "Jessica Chen"],
  ],
});

/** The design repeats the same lead six times. */
export const leads: Lead[] = Array.from({ length: 6 }, (_, index) => johnDoe(index === 0 ? "john-doe" : `john-doe-${index + 1}`));

/** A value from the "Label: value" pairs of a lead's list row, e.g. leadValue(lead, "Lead Owner"). */
export const leadValue = (lead: Lead, label: string) => lead.details.find(([l]) => l === label)?.[1] ?? "";

export type LeadDetail = {
  id: string;
  /** Only the designed page sets this; the other leads show their own list email. */
  email?: string;
  mobile: string;
  lastContacted: string;
  address: { street: string; state: string; country: string; city: string; zipCode: string };
  requirement: { propertyType: string; budget: string; preferredLocation: string; notes: string };
  visit: { daysVisited: string; chats: string; firstVisit: string; nextTask: string; mostRecentVisit: string; referrer: string };
  related: RelatedItem[];
};

/** The designed overview (John Doe); every lead uses it as a template with their own list values. */
const designedLeadDetail: LeadDetail = {
  id: "john-doe",
  email: "john.doe@email.com",
  mobile: "+91 98765 43210",
  lastContacted: "10/02/2025",
  address: { street: "56 Auricht Road", state: "Karnataka", country: "India", city: "Bengaluru", zipCode: "560035" },
  requirement: {
    propertyType: "Residential Apartment",
    budget: "Rs.50L - Rs.1Cr",
    // "Begaluru" is spelled like this in the design.
    preferredLocation: "Begaluru",
    notes: "Looking for 2BHK sea-facing flat",
  },
  visit: { daysVisited: "-", chats: "-", firstVisit: "-", nextTask: "Call schedule on 14/02/2025", mostRecentVisit: "-", referrer: "-" },
  related: [{ label: "Notes" }, { label: "Email" }, { label: "Social" }, { label: "Activities" }, { label: "Attachments" }],
};

/** Every lead has a page. */
export const leadDetails: Record<string, LeadDetail> = Object.fromEntries(
  leads.map((l) => [l.id, l.id === designedLeadDetail.id ? designedLeadDetail : { ...designedLeadDetail, id: l.id, email: undefined }]),
);
