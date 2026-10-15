import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import DetailTable from "@/components/detail/DetailTable";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { unitCode, unitDetails, unitType, units } from "@/data/units";

export function generateStaticParams() {
  return Object.keys(unitDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function UnitDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = unitDetails[id];
  const unit = units.find((u) => u.id === id);
  if (!detail || !unit) notFound();

  const { overview, building, broker } = detail;

  return (
    <DetailPage related={detail.related} compact addRelatedGap={40}>
      <RecordHeader
        backHref="/units"
        image={unit.image}
        imageSize={[82, 82]}
        textClassName="self-center"
        actionsClassName="mr-10 mb-2 gap-15"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <div className="flex items-center gap-18">
          <div>
            <HeaderText
              title={unit.name}
              titleClassName="text-20"
              lines={[["Building Name", unit.building], ["Development Name", unit.development]]}
              linesClassName="mt-4 gap-4 text-14"
            />
          </div>
          <StatusBadge status={unit.status} />
        </div>
      </RecordHeader>

      <Tabs active={tab} />

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title, field list and table sits in its section. */}
          <DetailSection
            title="Basic Details"
            subtitle="Key development highlights"
            paddingTop={29}
            paddingBottom={29}
            titleShift={{ x: -22 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={163}
              columns={[
                [
                  ["Unit Name", unitCode(unit)],
                  ["Type", unitType(unit)],
                  ["Area", overview.area],
                  ["Floor", overview.floor],
                  ["Balconies", overview.balconies],
                  ["Bathrooms", overview.bathrooms],
                  ["Status", <StatusBadge key="status" status={unit.status} />],
                  ["Price", unit.price],
                  ["Facing", overview.facing],
                  ["Furnishing", overview.furnishing],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Building & Development Info"
            subtitle="Direct and indirect communication information."
            paddingTop={39}
            paddingBottom={28}
            titleWidth={272}
            titleShift={{ x: -31, y: 13 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={48} // the widest label is wider in the browser than in the design, so start earlier
              columns={[
                [
                  ["Building Name", unit.building],
                  ["Development Name", unit.development],
                  ["City", building.city],
                  ["No. of Floors in Building", building.floors],
                  ["Building Status", building.status],
                  ["Development Website", <span key="site" className="text-gold">{building.website}</span>],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Assigned Broker / Sales Agent"
            subtitle="Direct and indirect communication information."
            paddingTop={37}
            paddingBottom={34}
            titleWidth={298}
            titleShift={{ x: 21 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={202}
              columns={[
                [
                  ["Name", broker.name],
                  ["Role", broker.role],
                  ["Email", broker.email],
                  ["Phone", broker.phone],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            id="deals"
            title="Deals Associated"
            subtitle="Direct and indirect communication information."
            paddingTop={22}
            paddingBottom={37}
            titleShift={{ x: -1, y: 10 }}
          >
            <div className="ml-164">
              <DetailTable
                columns="173px 164px 163px 1fr"
                headings={["Deal Name", "Deal Owner", "Status", "Value"]}
                rows={detail.deals.map((deal) => [
                  <span key="name" className="block w-130">{deal.name}</span>,
                  deal.owner,
                  <StatusBadge key="status" status={deal.status} />,
                  deal.value,
                ])}
              />
            </div>
          </DetailSection>

          <DetailSection
            id="add-on-units"
            title="Add-on Units Associated"
            subtitle="Direct and indirect communication information."
            paddingTop={21}
            paddingBottom={40}
            titleShift={{ x: 1, y: 12 }}
          >
            <div className="ml-167">
              <DetailTable
                columns="168px 116px 112px 1fr"
                headings={["Unit Name", "Type", "Status", "Purpose"]}
                rows={detail.addOns.map((addOn) => [addOn.name, addOn.type, addOn.status, addOn.purpose])}
              />
            </div>
          </DetailSection>
        </>
      )}

      {tab === "notes" && <NotesTab />}
      {(tab === "timeline" || tab === "activities" || tab === "attachments") && (
        <EmptyTab title={tab[0].toUpperCase() + tab.slice(1)} />
      )}
    </DetailPage>
  );
}
