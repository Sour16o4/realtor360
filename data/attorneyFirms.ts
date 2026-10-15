import type { FilterGroup } from "./types";

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
