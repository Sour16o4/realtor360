import type { FilterGroup, RelatedItem } from "./types";

export const attorneyFirmFilters: FilterGroup[] = [
  { title: "City", options: ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Ahmedabad"] },
  { title: "Status", options: ["Active", "Inactive"] },
  {
    title: "Assigned Developments",
    options: ["Sunrise Enclave", "Green Meadows", "Orchid Grove", "Vista Heights", "Other"],
  },
  {
    title: "Type of Service",
    options: [
      "Property Registration",
      "Legal Verification",
      "Title Due Diligence",
      "Agreement Drafting",
      "RERA Consultation",
    ],
  },
  { title: "No. of Clients Handled", options: ["0-5", "6-10", "11-20", "21+"] },
];

export type AttorneyFirm = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
};

const row = (id: string, name: string, email: string, phone: string, city: string, status: string): AttorneyFirm => ({
  id,
  name,
  email,
  phone,
  city,
  status,
});

export const attorneyFirms: AttorneyFirm[] = [
  row("lex-co", "Lex & Co. Legal Partners", "contact@lexcolegal.com", "+91 99888 11223", "Bengaluru", "Active"),
  row("juris-edge", "Juris Edge Associates", "info@jurisedge.in", "+91 93412 44456", "Mumbai", "Active"),
  row("civic-law", "Civic Law Chambers", "support@civiclawchambers.com", "+91 93412 44456", "Delhi", "Inactive"),
  row("trust-legal", "Trust Legal Advisory", "contact@trustlegaladvisory.com", "+91 93412 44456", "Pune", "Active"),
  row("prime-advocates", "Prime Advocates LLP", "hello@primeadvocates.in", "+91 93412 44456", "Hyderabad", "Inactive"),
  row("metro-law", "Metro Law Group", "office@metrolawgroup.com", "+91 93412 44456", "Chennai", "Active"),
  row("estate-law", "Estate Law Solutions", "estate@lawsolutions.in", "+91 93412 44456", "Ahmedabad", "Active"),
  row("lex-co-2", "Lex & Co. Legal Partners", "contact@lexcolegal.com", "+91 99888 11223", "Bengaluru", "Active"),
  row("juris-edge-2", "Juris Edge Associates", "info@jurisedge.in", "+91 93412 44456", "Mumbai", "Active"),
  row("prime-advocates-2", "Prime Advocates LLP", "hello@primeadvocates.in", "+91 93412 44456", "Hyderabad", "Inactive"),
];

export type AttorneyFirmDetail = {
  id: string;
  /** Only the designed page sets these; the other firms show their own list phone and email. */
  phone?: string;
  email?: string;
  services: string;
  developments: Array<{ name: string; city: string; buildings: number; startingPrice: string }>;
  units: Array<{ unit: string; development: string; building: string; status: string; assignedDate: string }>;
  team: Array<{ name: string; role: string; email: string }>;
  leads: Array<{ name: string; source: string; category: string; status: string; contact: string }>;
  matters: Array<{ name: string; type: string; development: string; status: string }>;
  related: RelatedItem[];
};

/** The designed overview (Lex & Co.); every other firm uses it as a template with their own list values. */
const designedAttorneyFirmDetail: AttorneyFirmDetail = {
  id: "lex-co",
  phone: "+91 98765 43210",
  email: "contact@lexandco.com",
  services: "Property Registration, Due Diligence",
  developments: [
    { name: "Sunrise Enclave", city: "Bengaluru", buildings: 6, startingPrice: "Rs.1.25Cr" },
    { name: "Orchid Grove", city: "Pune", buildings: 4, startingPrice: "Rs.98L" },
  ],
  units: [
    { unit: "Unit A-101 (3BHK)", development: "Sunrise Enclave", building: "Aster Tower", status: "Sold", assignedDate: "12/06/2022" },
    { unit: "Unit B-205 (2BHK)", development: "Orchid Grove", building: "Tulip Residency", status: "Active", assignedDate: "18/07/2022" },
  ],
  team: [
    { name: "Meera Sinha", role: "Partner", email: "meera@lexco.in" },
    { name: "Arvind Jha", role: "Sr. Associate", email: "arvind@lexco.in" },
  ],
  leads: [
    { name: "John Doe", source: "Referral from Client", category: "Corporate", status: "Interested", contact: "john@urbanrealty.com" },
    { name: "Kavita Rao", source: "Website Form", category: "Retail", status: "Cold", contact: "kavita@email.com" },
  ],
  matters: [
    { name: "Title Check \u2013 Orchid", type: "Legal Verification", development: "Orchid Grove", status: "In Review" },
    { name: "RERA Filing \u2013 Sunrise", type: "RERA Consultation", development: "Sunrise Enclave", status: "Completed" },
  ],
  related: [
    { label: "Notes" },
    { label: "Email" },
    { label: "Assigned Matters" },
    { label: "Originating Leads", href: "#leads" },
    { label: "Originating Matters", href: "#matters" },
    { label: "Activities" },
    { label: "Attachments" },
  ],
};

/** Every row of the list has a page; the designed firm keeps its own phone and email, the others reuse the template. */
export const attorneyFirmDetails: Record<string, AttorneyFirmDetail> = Object.fromEntries(
  attorneyFirms.map((f) => [
    f.id,
    f.id === designedAttorneyFirmDetail.id
      ? designedAttorneyFirmDetail
      : { ...designedAttorneyFirmDetail, id: f.id, phone: undefined, email: undefined },
  ]),
);
