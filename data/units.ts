import type { FilterGroup } from "./types";

export const unitFilters: FilterGroup[] = [
  { title: "Development", options: ["Sunrise Enclave", "Green Heights", "Ocean Pearl", "Eden Greens"] },
  { title: "Building", options: ["Aster Tower", "Orchid Heights", "Lotus Crest"] },
  { title: "Status", options: ["Active", "Sold", "Booked", "Under Construction", "Ready to Move"] },
  { title: "Unit Type", options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Penthouse", "Studio"] },
  { title: "Area Range (sqft)", options: ["0–1000", "1001–1500", "1501–2000", "2001–2500", "2500+"] },
  { title: "Price Range", options: ["< ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr", "₹2Cr – ₹3Cr", "₹3Cr+"] },
  { title: "Facing", options: ["East", "West", "North", "South", "Corner"] },
  { title: "Availability", options: ["Immediate", "In 3 Months", "In 6 Months", "Later"] },
];

export type Unit = {
  id: string;
  name: string;
  image: string;
  building: string;
  development: string;
  type: string;
  status: string;
  price: string;
};

export const units: Unit[] = [
  {
    id: "unit-a-101",
    name: "Unit A- 101 (3 BHK)",
    image: "/images/unit-a-101.webp",
    building: "Aster Tower",
    development: "Sunrise Enclave",
    type: "Flat",
    status: "Active",
    price: "₹1.45 Cr",
  },
  {
    id: "unit-a-205",
    name: "Unit A- 205 (2 BHK)",
    image: "/images/unit-a-205.webp",
    building: "Aster Tower",
    development: "Sunrise Enclave",
    type: "Flat",
    status: "Sold",
    price: "₹98L",
  },
  {
    id: "unit-b-307",
    name: "Unit B- 307 (4 BHK)",
    image: "/images/unit-b-307.webp",
    building: "Aster Tower",
    development: "Sunrise Enclave",
    type: "Duplex",
    status: "Active",
    price: "₹1.95 Cr",
  },
  {
    id: "unit-b-104",
    name: "Unit B- 104 (2 BHK)",
    image: "/images/unit-b-104.webp",
    building: "Lotus Crest",
    development: "Sunrise Enclave",
    type: "Flat",
    status: "Active",
    price: "₹1.10Cr",
  },
  {
    id: "unit-c-402",
    name: "Unit C- 402 (3 BHK)",
    image: "/images/unit-c-402.webp",
    building: "Orchid Heights",
    development: "Eden Greens",
    type: "Flat",
    status: "Booked",
    price: "₹1.35Cr",
  },
  {
    id: "unit-c-202",
    name: "Unit C- 202 (1 BHK)",
    image: "/images/unit-c-202.webp",
    building: "Orchid Heights",
    development: "Eden Greens",
    type: "Studio",
    status: "Sold",
    price: "₹45L",
  },
];
