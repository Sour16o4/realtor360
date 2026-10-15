import { notFound } from "next/navigation";
import DealDocument from "@/components/deals/DealDocument";
import FieldBlock from "@/components/deals/FieldBlock";
import { deals } from "@/data/deals";
import { dealSheet } from "@/data/offerForms";

export function generateStaticParams() {
  return deals.map(({ id }) => ({ id }));
}

export default async function DealSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = deals.find((d) => d.id === id);
  if (!deal) notFound();
  const sheet = dealSheet(deal);

  return (
    <DealDocument dealId={deal.id} title="Deal Sheet" titleTop={36}>
      <FieldBlock title="Deal Information" fields={sheet.info} labelWidth={213} className="top-111 left-55" />
      <FieldBlock title="Deal Financials" fields={sheet.financials} labelWidth={213} className="top-645 left-55" />
      {/* The design's two right-hand blocks end at different x: 1288 and 1281. */}
      <FieldBlock title="Buyer Information" fields={sheet.buyer} align="right" labelEdge={306} className="top-111 right-49" />
      <FieldBlock title="Buyer Attorney Information" fields={sheet.attorney} align="right" labelEdge={306} className="top-407 right-56" />
    </DealDocument>
  );
}
