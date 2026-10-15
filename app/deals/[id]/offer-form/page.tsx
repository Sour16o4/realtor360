import { notFound } from "next/navigation";
import DealDocument from "@/components/deals/DealDocument";
import FieldBlock from "@/components/deals/FieldBlock";
import { deals } from "@/data/deals";
import { offerForm } from "@/data/offerForms";

export function generateStaticParams() {
  return deals.map(({ id }) => ({ id }));
}

export default async function OfferFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = deals.find((d) => d.id === id);
  if (!deal) notFound();
  const form = offerForm(deal);

  return (
    <DealDocument dealId={deal.id} title="Offer Form" titleTop={31}>
      <FieldBlock title="Buyer’s Details" fields={form.buyer} labelWidth={205} className="top-111 left-55" />
      <FieldBlock title="Property Information" fields={form.property} align="right" labelEdge={195} className="top-111 right-56" />
      <div className="absolute inset-x-0 top-416 h-px bg-subtle/50" />

      <div className="absolute top-442 right-56 left-55 flex h-54 items-center rounded-10 bg-gold px-30 text-20 font-semibold text-white">
        Offer Details
      </div>
      <FieldBlock fields={form.offer} labelWidth={296} rowGap={20} className="top-517 left-55" />
      <FieldBlock title="Broker/Sales Agent Info" fields={form.broker} align="right" labelEdge={228} className="top-517 right-56" />

      <h2 className="absolute top-828 left-55 text-20 leading-24 font-semibold text-ink">Signatures</h2>
      <p className="absolute top-874 left-55 flex gap-39 text-18">
        <span className="font-semibold text-subtle">Buyer</span>
        <span className="text-black">{form.buyerSignature}</span>
      </p>
      <p className="absolute top-874 right-56 flex gap-39 text-18">
        <span className="font-semibold text-subtle">Sales Representative</span>
        <span className="text-black">{form.salesSignature}</span>
      </p>
    </DealDocument>
  );
}
