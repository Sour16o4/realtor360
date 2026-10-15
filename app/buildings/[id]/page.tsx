import { notFound } from "next/navigation";
import BuildingSwitcher from "@/components/detail/BuildingSwitcher";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import { buildingDetails, buildings } from "@/data/buildings";

export function generateStaticParams() {
  return Object.keys(buildingDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

const unitColumns = ["Development Name", "Building\nName", "Unit Price", "Status", "Created Time"];

export default async function BuildingDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = buildingDetails[id];
  const building = buildings.find((b) => b.id === id);
  if (!detail || !building) notFound();

  const website = <span className="text-16 text-gold underline">{detail.website}</span>;

  return (
    <DetailPage related={detail.related} compact>
      <RecordHeader
        backHref="/buildings"
        image={building.image}
        imageSize={[100, 100]}
        imageClassName="mt-7 mb-8" // the photo sits 7px lower than the back button; keeps the header 155px tall
        textClassName="pt-22"
        actionsClassName="mr-10 mb-13 gap-9"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText
          title={building.name}
          titleAdornment={<BuildingSwitcher options={buildings.slice(0, 3)} />} // the design's dropdown lists the first three buildings
          lines={[["Development", building.development], ["Email", building.email]]}
          linesClassName="mt-4 gap-4 text-14 opacity-60"
        />
      </RecordHeader>

      <Tabs active={tab} />

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title and field list sits in its section. */}
          <DetailSection title="Basic Details" subtitle="Key development highlights" paddingTop={29} titleShift={{ x: -20, y: -31 }}>
            <FieldList
              gap={61}
              offset={205}
              columns={[
                [
                  ["Development Name", building.development],
                  ["No. of Floors", detail.overview.floors],
                  ["Development Website", website],
                  ["Building Status", detail.status ?? building.status],
                  ["City", building.city],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Development Information"
            subtitle="Essential development details at a glance"
            paddingTop={57}
            titleWidth={250} // the design wraps this subtitle after "at"
            titleShift={{ y: 7 }}
          >
            <FieldList
              offset={33}
              columnGap={13}
              widths={[420, 268]}
              columns={[
                [
                  ["Building Owner", detail.owner],
                  ["Development Name", building.development],
                  ["Building Status", detail.status ?? building.status],
                  ["Development Website", website, 19], // this row sits closer to the one above
                ],
                [
                  ["Building Name", detail.overview.infoName ?? building.name],
                  ["No. of Floors", detail.overview.infoFloors],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection id="units" title="Units" subtitle="Details of Units within the Building" titleWidth={195} paddingTop={20} titleShift={{ x: -28, y: -18 }}>
            <div className="mr-13 mb-15 flex justify-end gap-15 text-14">
              <button type="button" className="h-31 rounded-5 bg-cream px-20">New</button>
              <button type="button" className="h-31 rounded-5 bg-cream px-16">Edit</button>
            </div>
            <div className="-ml-15 grid grid-cols-[151px_158px_136px_122px_100px_100px] gap-y-20 text-18 leading-22">
              <span />
              {unitColumns.map((heading) => (
                <span key={heading} className="mb-11 font-semibold whitespace-pre-line text-subtle">
                  {heading}
                </span>
              ))}
              {detail.units.map((unit) => (
                <div key={unit.name} className="contents">
                  {/* The design breaks the name before the bracket, e.g. "Unit A- 101" / "(3 BHK)". */}
                  <span className="pr-20 text-center font-semibold whitespace-pre-line">{unit.name.replace(" (", "\n(")}</span>
                  <span>{unit.development}</span>
                  <span>{unit.building}</span>
                  <span>{unit.price}</span>
                  <span>{unit.status}</span>
                  <span>{unit.created}</span>
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
