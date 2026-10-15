import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import DetailTable from "@/components/detail/DetailTable";
import FieldList from "@/components/detail/FieldList";
import GenerateOfferForm from "@/components/detail/GenerateOfferForm";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { dealDetails, deals } from "@/data/deals";

export function generateStaticParams() {
  return Object.keys(dealDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

/** The design's meeting rows are not evenly spaced: distance (px) from each row to the next one. */
const MEETING_ROW_HEIGHTS = [74, 78, 82, 44];

export default async function DealDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = dealDetails[id];
  const deal = deals.find((d) => d.id === id);
  if (!detail || !deal) notFound();

  return (
    <DetailPage related={detail.related} compact addRelatedGap={50}>
      <RecordHeader
        backHref="/deals"
        textClassName="pt-6 pb-3 pl-2"
        actionsClassName="mr-9 mb-3 gap-15"
        actions={
          <>
            <GenerateOfferForm dealId={deal.id} />
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText title={`${deal.name}  -  ${deal.owner}`} titleClassName="text-[26px] whitespace-pre" linesClassName="">
          <div className="mt-18">
            <StatusBadge status={deal.status} />
          </div>
        </HeaderText>
      </RecordHeader>

      <Tabs active={tab} />

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title, field list and table sits in its section. */}
          <DetailSection
            title="Basic Details"
            subtitle="Key development highlights"
            paddingTop={29}
            paddingBottom={37}
            titleShift={{ x: -22, y: 7 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={127}
              columns={[
                [
                  ["Deal Name", deal.name],
                  ["Deal Owner", deal.owner],
                  ["Development", deal.development],
                  ["Unit", deal.unit],
                  ["Phone", detail.phone],
                  ["Email", detail.email],
                  ["Status", <span key="status" className="-my-1 inline-block"><StatusBadge status={deal.status} /></span>], // the design's badge is 23px high
                  ["Contact Person", detail.contactPerson],
                  ["Deal Stage", detail.stage],
                  ["Deal Value", detail.value ?? deal.value],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            id="stage-history"
            title="Stage History"
            subtitle="Direct and indirect communication information."
            paddingTop={25}
            paddingBottom={32}
            titleWidth={262}
            titleShift={{ x: 3, y: 13 }}
          >
            <div className="ml-168">
              <DetailTable
                columns="219px 203px 1fr"
                headings={["Stage", "Date", "Updated By"]}
                rows={detail.stageHistory.map((s) => [s.stage, s.date, s.updatedBy])}
              />
            </div>
          </DetailSection>

          {/* This section sits 5px further left than the others in the design. */}
          <div className="mr-5 -ml-5">
            <DetailSection
              id="contact-roles"
              title="Contact Roles"
              subtitle="Direct and indirect communication information."
              paddingTop={27}
              paddingBottom={30}
              titleWidth={270}
              titleShift={{ x: 9, y: 6 }}
            >
              <div className="ml-170">
                <DetailTable
                  columns="118px 92px 223px 1fr"
                  rowGap={31}
                  headingGap={37}
                  headings={["Name", "Role", "Email", "Phone"]}
                  rows={detail.contactRoles.map((c) => [
                    c.name,
                    <span key="role" className="block min-h-22 w-68">{c.role}</span>,
                    c.email,
                    c.phone,
                  ])}
                />
              </div>
            </DetailSection>
          </div>

          <DetailSection
            id="invoices"
            title="Invoices"
            subtitle="Direct and indirect communication information."
            paddingTop={31}
            paddingBottom={44}
            titleWidth={270}
            titleShift={{ x: 7, y: 13 }}
          >
            <div className="ml-168">
              <DetailTable
                columns="154px 151px 128px 1fr"
                rowGap={31}
                headingGap={37}
                headings={["Invoice No.", "Amount", "Status", "Due Date"]}
                rows={detail.invoices.map((i) => [i.number, i.amount, i.status, i.dueDate])}
              />
            </div>
          </DetailSection>

          <DetailSection
            id="meetings"
            title="Meetings"
            subtitle="Direct and indirect communication information."
            paddingTop={24}
            paddingBottom={38}
            titleWidth={270}
            titleShift={{ x: 7, y: 11 }}
          >
            {/* Cells have the fixed widths of the design's text boxes, so longer text wraps like there. */}
            <div className="ml-168">
              <DetailTable
                columns="131px 121px 94px 140px 1fr"
                rowGap={0}
                headingGap={25}
                headings={["Subject", "Date", "Time", "Participants", "Outcomes"]}
                rows={detail.meetings.map((m, index) => [
                  <span key="subject" className="block w-112" style={{ minHeight: MEETING_ROW_HEIGHTS[index] ?? 74 }}>{m.subject}</span>,
                  m.date,
                  <span key="time" className="block w-52">{m.time}</span>,
                  <span key="participants" className="block w-117">{m.participants}</span>,
                  <span key="outcome" className="block w-117">{m.outcome}</span>,
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
