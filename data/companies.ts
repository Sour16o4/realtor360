import type { FilterGroup, RelatedItem } from "./types";

export const companyFilters: FilterGroup[] = [
  {
    title: "Company Type",
    options: ["Developer", "Contractor", "Brokerage Firm", "Consultant", "Legal Partner", "Marketing Agency"],
  },
  { title: "City", options: ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Ahmedabad"] },
  { title: "Owner Name", options: ["Mohit Verma", "Arjun Malhotra", "Mohit Mehra", "Shruti Reddy", "Neha Desai"] },
  { title: "Number of Projects", options: ["0-5", "6-10", "11-20", "21+"] },
];

export type Company = {
  id: string;
  name: string;
  logo: string;
  type: string;
  projects: number;
  city: string;
  status: string;
  owner: string;
};

const LOGOS = {
  tunnel: "/images/company-tunnel.webp",
  desk: "/images/company-desk.webp",
  stripes: "/images/company-stripes.webp",
  market: "/images/company-market.webp",
  flowers: "/images/company-flowers.webp",
};

const row = (
  id: string,
  name: string,
  logo: string,
  type: string,
  projects: number,
  city: string,
  status: string,
  owner: string,
): Company => ({ id, name, logo, type, projects, city, status, owner });

export const companies: Company[] = [
  row("urban-build-group", "Urban Build Group", LOGOS.tunnel, "Developer", 12, "Bengaluru", "Active", "Mohit Verma"),
  row("skyhigh-realtors", "SkyHigh Realtors", LOGOS.desk, "Brokerage Firm", 7, "Mumbai", "Active", "Ravi Patel"),
  row("blue-line", "Blue Line Constructions", LOGOS.tunnel, "Contractor", 5, "Pune", "In Progress", "Mohit Mehra"),
  row("vision-infra", "Vision Infra Pvt Ltd", LOGOS.stripes, "Developer", 9, "Hyderabad", "Active", "Shruti Reddy"),
  row("nest-edge", "Nest Edge Associates", LOGOS.market, "Consultant", 3, "Delhi", "Inactive", "Kunal Verma"),
  row("prime-realty", "Prime Realty Solutions", LOGOS.flowers, "Brokerage Firm", 6, "Chennai", "Active", "Arjun Malhotra"),
  row("west-side", "West Side Developers", LOGOS.desk, "Developer", 10, "Ahmedabad", "Active", "Neha Desai"),
  row("skyhigh-realtors-2", "SkyHigh Realtors", LOGOS.desk, "Brokerage Firm", 7, "Bengaluru", "Active", "Mohit Verma"),
  row("skyhigh-realtors-3", "SkyHigh Realtors", LOGOS.stripes, "Brokerage Firm", 7, "Bengaluru", "Active", "Mohit Verma"),
];

export type CompanyDetail = {
  id: string;
  email: string;
  phone: string;
  website: string;
  address: { street: string; state: string; country: string; zipCode: string };
  deals: {
    total: number;
    valueRange: string;
    types: string[];
    status: { open: number; inProgress: number; closedWon: number; closedLost: number };
  };
  projectTypes: string[];
  topProjects: Array<{ name: string; type: string; city: string; units: number; status: string }>;
  contacts: Array<{ name: string; role: string; email: string; phone: string; status: string }>;
  related: RelatedItem[];
};

/** The designed overview (Urban Build Group); every other company uses it as a template with their own list values. */
const designedCompanyDetail: CompanyDetail = {
  id: "urban-build-group",
  email: "contact@urbanbuild.com",
  phone: "+91 98765 43210",
  website: "www.urbanbuildgroup.com",
  address: { street: "56 Auricht Road", state: "Karnataka", country: "India", zipCode: "560035" },
  deals: {
    total: 21,
    valueRange: "Rs.98L - Rs.2.95Cr",
    types: ["Residential Sales", "Commercial Lease", "Land Acquisition"],
    status: { open: 8, inProgress: 5, closedWon: 6, closedLost: 2 },
  },
  projectTypes: ["Villas- 5", "Apartments- 4", "Commercial Spaces- 3"],
  topProjects: [
    { name: "Sunrise Enclave", type: "Villa", city: "Bengaluru", units: 40, status: "Completed" },
    { name: "Palm Greens", type: "Apartment", city: "Bengaluru", units: 32, status: "In Progress" },
    { name: "Orion Tech Square", type: "Commercial", city: "Hyderabad", units: 16, status: "Upcoming" },
  ],
  contacts: [
    { name: "Jessica Chen", role: "Sales Lead", email: "jessica@urbanbuild.com", phone: "+91 91234 56789", status: "Active" },
    { name: "Arjun Rao", role: "Legal Head", email: "arjun@urbanbuild.com", phone: "+91 91234 56789", status: "Inactive" },
    { name: "Priya Nair", role: "Broker", email: "priya@urbanbuild.com", phone: "+91 91234 56789", status: "Active" },
  ],
  related: [
    { label: "Notes" },
    { label: "Deals", href: "#deals" },
    { label: "Projects", href: "#projects" },
    { label: "Activities" },
    { label: "Attachments" },
  ],
};

/** Every row of the list has a page; the other rows reuse the designed page as a template. */
export const companyDetails: Record<string, CompanyDetail> = Object.fromEntries(
  companies.map((c) => [c.id, { ...designedCompanyDetail, id: c.id }]),
);
