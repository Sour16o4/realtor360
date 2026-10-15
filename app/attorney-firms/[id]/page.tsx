import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import DetailTable from "@/components/detail/DetailTable";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { attorneyFirmDetails, attorneyFirms } from "@/data/attorneyFirms";

export function generateStaticParams() {
  return Object.keys(attorneyFirmDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function AttorneyFirmDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = attorneyFirmDetails[id];
  const firm = attorneyFirms.find((f) => f.id === id);
  if (!detail || !firm) notFound();

  return (
    <DetailPage related={detail.related} compact listWidth={200} addRelatedGap={41}>
      <RecordHeader
        backHref="/attorney-firms"
        textClassName="pt-6 pb-3 pl-2"
        actionsClassName="mr-10 mb-12 gap-9"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText
          title={firm.name}
          titleClassName="w-306 text-22"
          titleAdornment={<StatusBadge status={firm.status} className="ml-25 -translate-y-1" />}
          linesClassName=""
        >
          <p className="mt-6 text-14 leading-17 text-subtle/60">{detail.services}</p>
          <p className="mt-10 text-16 leading-19 text-subtle">Email: {firm.email}</p>
        </HeaderText>
      </RecordHeader>

      <Tabs active={tab} className="mt-2" /> {/* the design leaves 2px more under the header here */}

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title, field list and table sits in its section. */}
          <DetailSection
            title="Basic Details"
            subtitle="Key development highlights"
            paddingTop={29}
            paddingBottom={31}
            titleShift={{ x: -20, y: -39 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={124}
              columns={[
                [
                  ["Firm Name", firm.name],
                  ["Phone", detail.phone ?? firm.phone],
                  ["Email", <span key="email" className="-ml-26 block">{detail.email ?? firm.email}</span>], // 26px further left in the design
                  ["Status", <span key="status" className="-my-1 inline-block"><StatusBadge status={firm.status} /></span>], // the design's badge is 23px high
                  ["City", <span key="city" className="-ml-29 block">{firm.city}</span>], // 29px further left
                  ["Type of Service", detail.services],
                ],
              ]}
            />
          </DetailSection>

          {/* This section sits 13px further left than the others in the design. */}
          <div className="mr-13 -ml-13">
            <DetailSection
              title="Assigned Developments"
              subtitle="Direct and indirect communication information."
              paddingTop={21}
              paddingBottom={36}
              titleWidth={235}
              titleShift={{ x: -7, y: 6 }}
            >
              <div className="ml-105">
                <DetailTable
                  columns="219px 124px 168px 1fr"
                  rowGap={15}
                  headingGap={26}
                  headings={["Development Name", "City", "No. of Buildings", "Starting Price"]}
                  rows={detail.developments.map((d) => [d.name, d.city, d.buildings, d.startingPrice])}
                />
              </div>
            </DetailSection>
          </div>

          <DetailSection
            title="Assigned Units"
            subtitle="Direct and indirect communication information."
            paddingTop={25}
            paddingBottom={33}
            titleWidth={270}
            titleShift={{ x: 10, y: -25 }}
          >
            {/* Cells have the fixed widths of the design's text boxes, so longer text wraps like there. */}
            <div className="ml-92">
              <DetailTable
                columns="138px 184px 112px 89px 1fr"
                rowGap={20}
                headingGap={15}
                headings={["Unit ID", "Development", "Building\nName", "Status", "Assigned Date"]}
                rows={detail.units.map((u) => [
                  <span key="unit" className="block min-h-44 w-92">{u.unit}</span>,
                  <span key="dev" className="ml-3">{u.development}</span>,
                  <span key="building" className="block w-76">{u.building}</span>,
                  u.status,
                  u.assignedDate,
                ])}
              />
            </div>
          </DetailSection>

          <DetailSection
            title="Team Member"
            subtitle="Direct and indirect communication information."
            paddingTop={39}
            paddingBottom={37}
            titleWidth={250}
            titleShift={{ y: 3 }}
          >
            <ul className="ml-92 flex flex-col gap-28 text-20 leading-24 font-semibold text-black">
              {detail.team.map((member) => (
                <li key={member.email}>
                  {member.name} ({member.role}) - {member.email}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection
            id="leads"
            title="Originating Leads"
            subtitle="Direct and indirect communication information."
            paddingTop={27}
            paddingBottom={33}
            titleWidth={270}
            titleShift={{ x: 10, y: -25 }}
          >
            <div className="ml-92">
              <DetailTable
                columns="152px 116px 126px 118px 1fr"
                rowGap={20}
                headingGap={37}
                headings={["Lead Name", "Source", "Category", "Status", "Contact"]}
                rows={detail.leads.map((l) => [
                  <span key="name" className="block min-h-44">{l.name}</span>,
                  <span key="source" className="block w-97">{l.source}</span>,
                  l.category,
                  l.status,
                  <span key="contact" className="block w-156 [overflow-wrap:anywhere]">{l.contact}</span>,
                ])}
              />
            </div>
          </DetailSection>

          <DetailSection
            id="matters"
            title="Originating Matters"
            subtitle="Direct and indirect communication information."
            paddingTop={27}
            paddingBottom={33}
            titleWidth={270}
            titleShift={{ x: 10, y: -25 }}
          >
            <div className="ml-92">
              <DetailTable
                columns="195px 150px 172px 1fr"
                rowGap={20}
                headingGap={15}
                headings={["Matter Name", "Type", "Linked\nDevelopment", "Status"]}
                rows={detail.matters.map((m) => [
                  <span key="name" className="block min-h-44 w-113">{m.name}</span>,
                  <span key="type" className="block w-111">{m.type}</span>,
                  m.development,
                  m.status,
                ])}
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
