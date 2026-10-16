import type { Deal } from "./deals";

/** Label, value and an optional nudge (px) the design applies to that row: the value's indent on the left, the label's shift on the right. */
export type Field = [label: string, value: string, nudge?: number];

type OfferForm = {
  buyer: Field[];
  property: Field[];
  offer: Field[];
  broker: Field[];
  buyerSignature: string;
  salesSignature: string;
};

type DealSheet = {
  info: Field[];
  financials: Field[];
  buyer: Field[];
  attorney: Field[];
};

const DESIGNED_DEAL = "sunrise-villa-sale";

/** The designed deal shows the values of the Offer Form and Deal Sheet frames; the others use their own row of the deals list. */
function dealValues(deal: Deal) {
  if (deal.id === DESIGNED_DEAL) return { name: "John Doe- Sunrise Deal", owner: "Rohit Mehra", value: "₹1.45 Cr", status: "Converted" };
  return { name: deal.name, owner: deal.owner, value: deal.value, status: deal.status };
}

// "Unit A-101 (3 BHK)" -> "Unit A-101", "A-101" and "3 BHK". Deals without a type in brackets keep the designed one.
const unitNumber = (deal: Deal) => deal.unit.replace(/\s*\(.*\)/, "");
const unitCode = (deal: Deal) => unitNumber(deal).replace(/^Unit\s+/, "");
const unitType = (deal: Deal) => deal.unit.match(/\((.*)\)/)?.[1] ?? "3 BHK";

export function offerForm(deal: Deal): OfferForm {
  const { owner, value } = dealValues(deal);
  return {
    buyer: [
      ["Full Name", "John Doe"],
      ["Contact Number", "+91 98765 43210"],
      ["Email Address", "john.doe@email.com"],
      ["Address", "201, Orchid Apartments, Bengaluru"],
    ],
    property: [
      ["Deal ID", "#10567"],
      ["Development Name", deal.development],
      ["Building Name", "Aster Tower"],
      ["Unit Number", unitNumber(deal)],
      ["Unit Type", unitType(deal)],
      // The design repeats the label as the value.
      ["Unit Area (sq.ft)", "Unit Area (sq.ft)"],
      ["Floor No.", "1st Floor"],
    ],
    offer: [
      ["Offer Price (₹)", value],
      ["Booking Amount (₹)", "₹5,00,000"],
      ["Payment Plan", "Full Payment"],
      ["Offer Validity (till date)", "31/07/2025"],
      ["Possession Date Expected", "30/11/2025"],
      ["Preferred Payment Method", "Bank Transfer"],
    ],
    broker: [
      ["Broker Name", owner],
      ["Contact Number", "+91 91234 56789"],
      ["Agency/Firm Name", "Urban Realty Group"],
    ],
    buyerSignature: "John Doe (14/07/2025)",
    salesSignature: `${owner} (14/07/2025)`,
  };
}

export function dealSheet(deal: Deal): DealSheet {
  const { name, owner, value, status } = dealValues(deal);
  return {
    info: [
      ["Deal Name", name],
      ["Deal Owner", owner],
      ["Development", deal.development],
      ["Building", "Aster Tower"],
      ["Unit Number", unitCode(deal), 29],
      ["Unit Type", unitType(deal)],
      ["Unit Area", "1500 sq.ft"],
      ["Deal Status", status, 19],
      ["Deal Stage", "Final Agreement"],
      ["Deal Value", value],
      ["Possession Date", "30/11/2025"],
      ["Offer Date", "14/07/2025"],
    ],
    financials: [
      ["Unit Area", "1500 sq.ft"],
      ["Deal Value", value],
      ["Payment Status", "70% Paid"],
      ["Balance Due", "₹43.5L"],
      ["Possession Date", "30/11/2025"],
      ["Payment Terms", "As per final agreement"],
    ],
    buyer: [
      ["Buyer Name", "Rohan Verma", 4],
      ["Phone", "+91 98111 22334"],
      ["Email", "rohan.verma@email.com"],
      ["Address", "402, Green Heights, Mumbai"],
    ],
    attorney: [
      ["Name", "Neha Kapoor"],
      ["Firm", "Kapoor & Associates"],
      ["Phone", "+91 98760 11122"],
      ["Email", "neha@kapoorlegal.com"],
    ],
  };
}
