export type UnitStatus = "available" | "offer" | "contractSigned" | "closed" | "onHold" | "contractOut";

/**
 * Cell fill and Color Key label per status. `hoverLabel` is the text of the cell's hover variant in the design
 * (Offer, Contract signed, Closed, On hold and Contract out each have one; Available has none, so it stays static).
 */
export const unitStatuses: Record<UnitStatus, { label: string; color: string; hoverLabel?: string }> = {
  closed: { label: "Closed", color: "#CAFFCB", hoverLabel: "Closed" },
  contractSigned: { label: "Contract Signed", color: "#FAF4D0", hoverLabel: "Contact Signed" }, // typo is in the design's hover variant
  contractOut: { label: "Contract Out", color: "#CCCCCC", hoverLabel: "Contract Out" },
  offer: { label: "Offer", color: "#D0EFFF", hoverLabel: "Offer" },
  available: { label: "Available", color: "#FFFFFF" },
  onHold: { label: "On Hold", color: "#FFCCCC", hoverLabel: "On Hold" },
};

/** The Color Key's order: three columns, filled row by row. */
export const colorKey: UnitStatus[] = ["closed", "contractSigned", "contractOut", "offer", "available", "onHold"];

export type StackingUnit = { unit: string; type: string; area: string; buyer: string; price: string; status: UnitStatus };
export type StackingFloor = { label: string; units: StackingUnit[] };
export type StackingDevelopment = { name: string; floors: StackingFloor[] };

/** Every unit in the design shows the same text; only its status changes. */
const unit = (status: UnitStatus = "available"): StackingUnit => ({
  unit: "Unit A-301",
  type: "Flat",
  area: "1250 sq.ft",
  buyer: "Rohan Mehta",
  price: "₹1.25 Cr",
  status,
});

/** A floor of `count` units; `statuses` maps a unit's position (from 0) to its status, the rest are Available. */
const floor = (label: string, count: number, statuses: Record<number, UnitStatus> = {}): StackingFloor => ({
  label,
  units: Array.from({ length: count }, (_, index) => unit(statuses[index])),
});

/** The one report: every development with its floors listed top to bottom, like the design. */
export const stackingPlan: StackingDevelopment[] = [
  {
    name: "Sunrise Enclave",
    floors: [
      floor("3", 7, { 1: "closed" }),
      floor("2", 7),
      floor("1", 7, { 0: "contractSigned", 3: "offer" }),
      floor("Ground Floor", 2),
    ],
  },
  {
    name: "Eden Greens",
    floors: [floor("2", 7, { 6: "contractOut" }), floor("1", 7, { 0: "contractSigned", 3: "onHold" }), floor("Ground Floor", 2)],
  },
  // The design repeats the name "Eden Greens" for its third block.
  { name: "Eden Greens", floors: [floor("2", 4), floor("1", 3), floor("Ground Floor", 1)] },
];
