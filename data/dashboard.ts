import type { PillTone } from "@/components/ui/Pill";

export type Stat = {
  title: string;
  value: string;
  change: number;
  icon: string;
};

export const stats: Stat[] = [
  { title: "Active Listing", value: "23", change: -12, icon: "/icons/stat-listing.svg" },
  { title: "Active Leads", value: "120", change: 12, icon: "/icons/stat-leads.svg" },
  { title: "Total Closed", value: "42", change: 12, icon: "/icons/stat-closed.svg" },
  { title: "Total Revenue", value: "Rs.22Cr.", change: 12, icon: "/icons/stat-revenue.svg" },
];

/** The three developments every chart is split by, with their colors. */
export const developments = [
  { key: "plaza", label: "Angel Plaza", color: "var(--color-gold)" },
  { key: "garden", label: "Angel Garden", color: "var(--color-gold-200)" },
  { key: "none", label: "None", color: "var(--color-gold-100)" },
] as const;

export type DevelopmentKey = (typeof developments)[number]["key"];
export type DevelopmentCounts = Record<DevelopmentKey, number>;

export type LeadSource = {
  label: string;
  count: number;
  percent: number;
  color: string;
};

/** Donut slices in clockwise order, starting at the angle used in the design. */
export const leadSources: LeadSource[] = [
  { label: "Reference", count: 1, percent: 30.6, color: "var(--color-gold)" },
  { label: "Facebook", count: 1, percent: 6.78, color: "var(--color-gold-300)" },
  { label: "Website", count: 10, percent: 24.83, color: "rgb(212 175 55 / 0.4)" },
  { label: "Inbound Call", count: 9, percent: 37.87, color: "rgb(212 175 55 / 0.2)" },
];

/** Record count per deal stage. Each value is the cumulative height of that series' bar. */
export const dealsByStage: Array<{ stage: string } & DevelopmentCounts> = [
  { stage: "Interested", plaza: 3, garden: 5.6, none: 7.9 },
  { stage: "Site Visit Done", plaza: 3.8, garden: 7.2, none: 10 },
  { stage: "Unit Shortlisted", plaza: 3.5, garden: 6.6, none: 9.3 },
  { stage: "Contracts Signed", plaza: 3.8, garden: 7.2, none: 10 },
  { stage: "Offer Initiated", plaza: 3.1, garden: 5.9, none: 8.4 },
  { stage: "Offer Accepted", plaza: 3.8, garden: 7.2, none: 10 },
];

/** Record count per sales person (cumulative, like the stage chart). */
export const dealsBySalesPerson: Array<{ owner: string } & DevelopmentCounts> = [
  { owner: "Rohit Mehra", plaza: 4.9, garden: 11.1, none: 17.8 },
  { owner: "Priya Nair", plaza: 2.3, garden: 7.9, none: 12.1 },
];

export const dealsClosed = { closed: 42, inProgress: 132, fillPercent: 42.5 };

export const pipeline = [
  { development: "None", count: 14 },
  { development: "Angel Plaza", count: 3 },
  { development: "Angel Garden", count: 1 },
];

const AGENTS = ["/images/user.webp", "/images/agent.webp"];

export type Listing = {
  name: string;
  image: string;
  type: string;
  units: number;
  price: string;
  leadAvatars: string[];
  extraLeads: number;
  views: number;
  status: { label: string; tone: PillTone };
};

export const listings: Listing[] = [
  {
    name: "Maplewood House",
    image: "/images/property-maplewood.webp",
    type: "House",
    units: 12,
    price: "Rs.85L",
    leadAvatars: AGENTS,
    extraLeads: 35,
    views: 125,
    status: { label: "8/12 Occupied", tone: "success" },
  },
  {
    name: "Serenity Villa",
    image: "/images/property-serenity.webp",
    type: "Villa",
    units: 9300,
    price: "Rs.2.8Cr",
    leadAvatars: AGENTS,
    extraLeads: 40,
    views: 930,
    status: { label: "Available", tone: "success" },
  },
  {
    name: "Rosehill Cottage",
    image: "/images/property-rosehill.webp",
    type: "House",
    units: 25,
    price: "Rs.1.1Cr",
    leadAvatars: AGENTS,
    extraLeads: 15,
    views: 355,
    status: { label: "Available", tone: "success" },
  },
  {
    name: "Skyline Edge",
    image: "/images/property-skyline.webp",
    type: "Apartment",
    units: 17,
    price: "Rs.75L",
    leadAvatars: AGENTS,
    extraLeads: 11,
    views: 425,
    status: { label: "Sold Out", tone: "danger" },
  },
];

export const leadContacts = [
  { name: "John Doe", location: "New York", avatar: "/images/lead-john-doe.webp" },
  { name: "Jessica Chen", location: "California, LA", avatar: "/images/lead-jessica-chen.webp" },
  { name: "Evan Chris", location: "New York", avatar: "/images/lead-evan-chris.webp" },
  { name: "Jack B.", location: "Ohio, Columbus", avatar: "/images/lead-jack-b.webp" },
  { name: "Emily Paris", location: "California, LA", avatar: "/images/lead-emily-paris.webp" },
];

export type Reminder = {
  title: string;
  description: string;
  avatars?: string[];
  extra?: number;
};

export const reminders: Reminder[] = [
  {
    title: "Follow-Ups",
    description: "15 leads need to be followed up.",
    avatars: [AGENTS[0], AGENTS[1], AGENTS[1], AGENTS[1]],
    extra: 11,
  },
  { title: "Submit Final Offer- Villa Deal", description: "Finalize and send offer documents." },
  { title: "Review Contract with Legal", description: "Ensure attorney reviews apartment deal contract today." },
  { title: "Call Jessica Chen – Follow-up", description: "Discuss her feedback after site visit to Angel Plaza." },
];

export type EventType = "visit" | "follow-up" | "offer";

export const schedule: Array<{ title: string; detail: string; type: EventType }> = [
  { title: "Visit Client- Angel Plaza", detail: "Sector 45, Gurugram, Haryana", type: "visit" },
  { title: "Visit Client – Site Walkthrough", detail: "Whitefield Road, Bengaluru, Karnataka", type: "visit" },
  { title: "Follow Up – Jessica Chen", detail: "jessica.chen@email.com", type: "follow-up" },
  { title: "Follow Up – Roger Bouchard", detail: "roger.bouchard@clientmail.com", type: "follow-up" },
  { title: "Submit Final Offer – Villa Deal", detail: "Finalize and send offer documents.", type: "offer" },
  {
    title: "Submit Internal Review – Apartment PricingFinal Offer – Villa Deal",
    detail: "Update CRM with latest market rates.",
    type: "offer",
  },
];

/** Calendar shown first, the selected day and days that have events (July 2025 in the design). */
export const calendar = {
  year: 2025,
  month: 6, // 0-based: July
  selectedDay: 8,
  eventDays: { 10: "visit", 11: "offer", 14: "follow-up" } as Record<number, EventType>,
};
