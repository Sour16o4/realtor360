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

/** The design lists the same development five times; only the first one has a detail page. */
export const developments: Development[] = Array.from({ length: 5 }, (_, index) =>
  index === 0 ? sunriseEnclave : { ...sunriseEnclave, id: `${sunriseEnclave.id}-${index + 1}` },
);

export type DevelopmentDetail = {
  id: string;
  status: string;
  owner: string;
  phone: string;
  /** Items of the "Related List" sidebar; `count` is the badge next to the label. */
  related: Array<{ label: string; count?: number }>;
  address: { street: string; state: string; country: string; city: string; zipCode: string };
  attorney: { firm: string; fee: string; name: string };
  buildings: Array<{ name: string; floors: number; status: string; createdDate: string; createdTime: string }>;
};

export const developmentDetails: Record<string, DevelopmentDetail> = {
  "sunrise-enclave": {
    id: "sunrise-enclave",
    status: "Active",
    owner: "Rohit Mehra",
    phone: "+91-9854155264",
    related: [
      { label: "Notes" },
      { label: "Buildings", count: 6 },
      { label: "Units", count: 8 },
      { label: "Deals" },
      { label: "Activities" },
      { label: "Attachments" },
    ],
    address: {
      street: "102 Sunrise Avenue, Sarjapur Road",
      state: "Karnataka",
      // The design shows a price here; copied as is.
      country: "Rs.1.25 Cr",
      city: "Bengaluru",
      zipCode: "560035",
    },
    attorney: { firm: "NNC Law Firm", fee: "Rs.10,000.00", name: "Neha Sinha" },
    buildings: [
      { name: "Sunrise Enclave- Building 1", floors: 4, status: "Active", createdDate: "12/06/18", createdTime: "10:50AM" },
      { name: "Sunrise Enclave- Building 2", floors: 4, status: "Active", createdDate: "07/06/18", createdTime: "07:30PM" },
      { name: "Sunrise Enclave- Building 3", floors: 3, status: "Active", createdDate: "07/06/18", createdTime: "07:30PM" },
      { name: "Sunrise Enclave- Building 4", floors: 6, status: "Active", createdDate: "04/06/18", createdTime: "10:50AM" },
      { name: "Sunrise Enclave- Building 5", floors: 5, status: "Active", createdDate: "03/06/18", createdTime: "10:50AM" },
      { name: "Sunrise Enclave- Building 6", floors: 6, status: "Active", createdDate: "01/06/18", createdTime: "10:50AM" },
    ],
  },
};
