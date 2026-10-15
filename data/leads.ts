import type { FilterGroup } from "./types";

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
