import type { FilterGroup } from "./types";

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
