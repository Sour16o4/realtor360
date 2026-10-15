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
