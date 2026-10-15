import type { FilterGroup } from "./types";

export const developmentFilters: FilterGroup[] = [
  { title: "City", options: ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai"] },
  { title: "Type", options: ["Apartment", "Villa", "House", "Studio", "Penthouse"] },
  { title: "Attorney Firm", options: ["Lex & Co. Legal Partners", "Urban Law Associates", "Prime Legal Group"] },
  { title: "No. of Buildings", options: ["1-5", "6-10", "11-20", "20+"] },
  {
    title: "Starting Price",
    options: ["Below Rs.50L", "Rs.50L-Rs.1Cr", "Rs.1Cr-Rs.2Cr", "Rs.2Cr- Rs.5Cr", "Above Rs.5Cr"],
  },
];

export type Development = {
  id: string;
  name: string;
  image: string;
  email: string;
  website: string;
  type: string;
  city: string;
  attorneyFirm: string;
  buildings: number;
  startingPrice: string;
};

const sunriseEnclave: Development = {
  id: "sunrise-enclave",
  name: "Sunrise Enclave",
  image: "/images/development-sunrise-enclave.webp",
  email: "sales@sunriseenclave.com",
  website: "www.sunriseenclave.com",
  type: "Villa",
  city: "Bengaluru",
  attorneyFirm: "Lex & Co. Legal Partners",
  buildings: 6,
  startingPrice: "Rs.1.25 Cr",
};

/** The design lists the same development five times. */
export const developments: Development[] = Array.from({ length: 5 }, () => sunriseEnclave);
