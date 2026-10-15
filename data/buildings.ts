import type { FilterGroup } from "./types";

export type Building = {
  id: string;
  name: string;
  image: string;
  email: string;
  development: string;
  city: string;
  status: string;
  units: number;
  sold: number;
};

export const buildingFilters: FilterGroup[] = [
  {
    title: "Development",
    options: ["Sunrise Enclave", "Garden Heights", "Lakeview Estate", "Harmony Valley", "Ocean View Residency"],
  },
  { title: "Status", options: ["Available", "Sold Out", "Ready to Move", "Under Construction", "On Hold"] },
  { title: "City", options: ["Bengaluru", "Hyderabad", "Pune", "Mumbai"] },
  { title: "No. of Units", options: ["0-10", "11-20", "21-30", "31+"] },
];

export const buildings: Building[] = [
  {
    id: "aster-tower",
    name: "Aster Tower",
    image: "/images/building-aster-tower.webp",
    email: "sales@sunriseenclave.com",
    development: "Sunrise Enclave",
    city: "Bengaluru",
    status: "Available",
    units: 20,
    sold: 15,
  },
  {
    id: "orchid-heights",
    name: "Orchid Heights",
    image: "/images/building-orchid-heights.webp",
    email: "sales@sunriseenclave.com",
    development: "Sunrise Enclave",
    city: "Bengaluru",
    status: "Selling Fast",
    units: 25,
    sold: 10,
  },
  {
    id: "maple-residency",
    name: "Maple Residency",
    image: "/images/building-maple-residency.webp",
    email: "sales@sunriseenclave.com",
    development: "Sunrise Enclave",
    city: "Bengaluru",
    status: "Ready to Move",
    units: 30,
    sold: 30,
  },
  {
    id: "palm-grove-towers",
    name: "Palm Grove Towers",
    image: "/images/building-palm-grove.webp",
    email: "sales@greenvalleyestates.com",
    development: "Green Valley Estates",
    city: "Mumbai",
    status: "Few Units Left",
    units: 28,
    sold: 20,
  },
  {
    id: "ocean-view-residences",
    name: "Ocean View Residences",
    image: "/images/building-ocean-view.webp",
    email: "sales@greenvalleyestates.com",
    development: "Green Valley Estates",
    city: "Mumbai",
    status: "Available",
    units: 30,
    sold: 24,
  },
];

export type BuildingDetail = {
  id: string;
  owner: string;
  /** The Orchid Heights overview shows "Available", although the list says "Selling Fast". */
  status: string;
  website: string;
  /** Items of the "Related List" sidebar; `count` is the badge next to the label. */
  related: Array<{ label: string; count?: number }>;
  /** The overview repeats some fields in two sections and the design gives them different values. */
  overview: { floors: number; infoName: string; infoFloors: number };
  units: Array<{ name: string; development: string; building: string; price: string; status: string; created: string }>;
};

const asterTowerDetail: BuildingDetail = {
  id: "aster-tower",
  owner: "Rohit Mehra",
  status: "Available",
  website: "www.sunriseenclave.com",
  related: [{ label: "Notes" }, { label: "Units", count: 3 }, { label: "Activities" }, { label: "Attachments" }],
  overview: { floors: 4, infoName: "Aster Tower", infoFloors: 6 },
  units: [
    { name: "Unit A- 101 (3 BHK)", development: "Sunrise Enclave", building: "Aster Tower", price: "Rs.1.45Cr", status: "Active", created: "12/06/18" },
    { name: "Unit A- 205 (2 BHK)", development: "Sunrise Enclave", building: "Aster Tower", price: "Rs.98L", status: "Active", created: "07/06/18" },
    { name: "Unit A- 307 (4 BHK+Study)", development: "Sunrise Enclave", building: "Aster Tower", price: "Rs.1.95Cr", status: "Active", created: "07/06/18" },
  ],
};

/** The design's second overview (Orchid Heights) is the same page with another title, so the content is shared. */
export const buildingDetails: Record<string, BuildingDetail> = {
  "aster-tower": asterTowerDetail,
  "orchid-heights": { ...asterTowerDetail, id: "orchid-heights" },
};
