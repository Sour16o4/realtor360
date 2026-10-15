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
