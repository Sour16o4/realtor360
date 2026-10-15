import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import { developmentDetails, developments } from "@/data/developments";

export function generateStaticParams() {
  return Object.keys(developmentDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function DevelopmentDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = developmentDetails[id];
  const development = developments.find((d) => d.id === id);
  if (!detail || !development) notFound();

  const { address, attorney } = detail;
  const website = <span className="text-16 text-gold underline">{development.website}</span>;

  return (
    <DetailPage related={detail.related}>
      <RecordHeader
        backHref="/developments"
        image={development.image}
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton>Edit</HeaderButton>
            <HeaderButton dropdown>Stacking Plan</HeaderButton>
          </>
        }
      >
        <HeaderText title={development.name} lines={[["Email", development.email], ["Website", website]]} />
      </RecordHeader>

      <Tabs active={tab} />

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title and field list sits in its section. */}
          <DetailSection title="Basic Details" subtitle="Key development highlights" paddingTop={29} titleShift={{ x: 30, y: -31 }}>
            <FieldList
              gap={61}
              offset={198}
              columns={[
                [
                  ["Development Type", development.type],
                  ["Starting Price", development.startingPrice],
                  ["Development Website", website],
                  ["Development Status", detail.status],
                  ["City", development.city],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Development Information"
            subtitle="Essential development details at a glance"
            paddingTop={57}
            titleWidth={250} // the design wraps this subtitle after "at"
            titleShift={{ y: -22 }}
          >
            <FieldList
              offset={21}
              widths={[420, 346]}
              columnGap={-13} // the second column starts slightly under the first one's long website value
              columns={[
                [
                  ["Development Owner", detail.owner],
                  ["Development Type", development.type],
                  ["Starting Price", development.startingPrice],
                  ["Phone", detail.phone],
                  ["Development Website", website],
                ],
                [
                  ["Development Name", development.name],
                  ["No.of Buildings", development.buildings],
                  ["City", development.city],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection title="Address Information" subtitle="Where the development is located" titleShift={{ y: 18 }}>
            <FieldList
              offset={39}
              columnGap={77}
              widths={[406, 202]}
              columns={[
                [
                  ["Street", address.street],
                  ["State", address.state],
                  ["Country", address.country],
                ],
                [
                  ["City", address.city],
                  ["Zip Code", address.zipCode],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection title="Attorney Information" subtitle="Project's legal advisor information" titleShift={{ y: 17 }}>
            <FieldList
              offset={56}
              columns={[
                [
                  ["Attorney Firm Name", attorney.firm],
                  ["Attorney Fee", attorney.fee],
                  ["Attorney Name", attorney.name],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            id="buildings"
            title="Buildings"
            subtitle="Details of buildings within the development"
            paddingTop={26}
            titleShift={{ y: 10 }}
          >
            <div className="ml-34 grid grid-cols-[288px_169px_114px_1fr] gap-y-21 text-18 leading-22 whitespace-nowrap">
              <span />
              {["No. of Floors", "Status", "Created Time"].map((heading) => (
                <span key={heading} className="mb-5 font-semibold text-subtle">
                  {heading}
                </span>
              ))}
              {detail.buildings.map((building) => (
                <div key={building.name} className="contents">
                  <span>{building.name}</span>
                  <span>{building.floors}</span>
                  <span>{building.status}</span>
                  <span className="flex gap-10">
                    <span>{building.createdDate}</span>
                    <span>{building.createdTime}</span>
                  </span>
                </div>
              ))}
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
