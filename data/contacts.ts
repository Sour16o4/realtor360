import type { FilterGroup } from "./types";

export const contactFilters: FilterGroup[] = [
  { title: "Status", options: ["Active", "In Progress", "Converted", "Cold", "Not Interested"] },
  { title: "Role", options: ["Buyer", "Seller", "Investor", "Broker"] },
  { title: "Assigned To", options: ["Jessica", "Mohit", "Arjun", "Emily"] },
  { title: "City", options: ["Bengaluru", "Pune", "Mumbai", "Hyderbad", "Delhi"] },
  { title: "Lead Source", options: ["Website Form", "Referral", "Facebook Ads", "Walk-In", "Email Campaign"] },
];

export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  dealStage: string;
  status: string;
  assignedTo: string;
};

const row = (id: string, name: string, role: string, status: string): Contact => ({
  id,
  name,
  email: "john@urbanrealty.com",
  company: "Urban Realty",
  role,
  phone: "+91 9411521487",
  dealStage: "Negotiation",
  status,
  assignedTo: "Jessica Chen",
});

export const contacts: Contact[] = [
  row("john-doe", "John Doe", "Broker", "Active"),
  row("ananya-verma", "Ananya Verma", "Buyer", "In Progress"),
  row("ravi-kapoor", "Ravi Kapoor", "Developer", "Cold"),
  row("emily-mehra", "Emily Mehra", "Buyer", "Converted"),
  row("john-doe-2", "John Doe", "Seller", "Not Interested"),
  row("ananya-verma-2", "Ananya Verma", "Buyer", "Active"),
  row("ravi-kapoor-2", "Ravi Kapoor", "Investor", "Active"),
  row("emily-mehra-2", "Emily Mehra", "Broker", "Active"),
];

export type ContactDetail = {
  id: string;
  email: string;
  createdDate: string;
  city: string;
  phone: string;
  preferredContact: string;
  /** Items of the "Related List" sidebar; `href` jumps to a section, `count` is the badge. */
  related: Array<{ label: string; count?: number; href?: string }>;
  deals: Array<{ name: string; development: string; unitType: string; value: string; status: string; followUp: string }>;
};

export const contactDetails: Record<string, ContactDetail> = {
  "john-doe": {
    id: "john-doe",
    email: "john.doe@email.com",
    createdDate: "12/06/2024",
    city: "Bengaluru",
    phone: "+91 98765 43210",
    preferredContact: "Email / Phone",
    related: [
      { label: "Notes" },
      { label: "Deals", count: 3, href: "#deals" },
      { label: "Activities" },
      { label: "Attachments" },
    ],
    deals: [
      { name: "Villa Purchase - Sunrise", development: "Sunrise Enclave", unitType: "3 BHK Villa", value: "Rs. 1.95 Cr", status: "In Progress", followUp: "12 July 2025" },
      { name: "Apartment - Orchid", development: "Orchid Heights", unitType: "2 BHK Flat", value: "Rs. 98 L", status: "Cold", followUp: "15 July 2025" },
      { name: "Aster Tower Penthouse", development: "Aster Tower", unitType: "4 BHK Duplex", value: "Rs. 2.5 Cr", status: "Not Interested", followUp: "-" },
    ],
  },
};
