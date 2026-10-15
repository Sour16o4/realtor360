import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { leadDetails, leads, leadValue } from "@/data/leads";

export function generateStaticParams() {
  return Object.keys(leadDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function LeadDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = leadDetails[id];
  const lead = leads.find((l) => l.id === id);
  if (!detail || !lead) notFound();

  const status = leadValue(lead, "Lead Status");
  const { address, requirement, visit } = detail;

  return (
    <DetailPage related={detail.related} compact addRelatedGap={43}>
      <RecordHeader
        backHref="/leads"
        image={lead.photo}
        imageSize={[108, 108]}
        roundImage
        imageGap={22}
        imageClassName="mt-2 -mb-8" // the photo is 2px lower than the back button and reaches below the header's padding
        textClassName="pt-13"
        actionsClassName="mr-10 mb-3 gap-9"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText title={lead.name} lines={[["Email", lead.email]]} linesClassName="mt-8 text-16">
          <div className="mt-8">
            <StatusBadge status={status} />
          </div>
        </HeaderText>
      </RecordHeader>

      <Tabs active={tab} className="mt-2" /> {/* the design leaves 2px more under the header here */}

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title and field list sits in its section. */}
          <DetailSection
            title="Basic Details"
            subtitle="Key development highlights"
            paddingTop={29}
            paddingBottom={33}
            titleShift={{ x: -20, y: -18 }}
          >
            <FieldList
              gap={[61, 32]}
              rowGap={20}
              offset={78}
              columnGap={43}
              widths={[344, 257]}
              columns={[
                [
                  ["Lead Name", lead.name],
                  ["Mobile", detail.mobile],
                  ["Email", <span key="email" className="-ml-26">{detail.email ?? lead.email}</span>], // the design puts this value 26px further left
                  ["Status", <StatusBadge key="status" status={status} />],
                  ["Last Contacted", detail.lastContacted],
                ],
                [
                  ["Lead Owner", leadValue(lead, "Lead Owner")],
                  ["Lead Source", <span key="source" className="block w-113 whitespace-normal">{leadValue(lead, "Lead Source")}</span>],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Address Information"
            subtitle="Direct and indirect communication information."
            paddingTop={42}
            paddingBottom={47}
            titleWidth={250}
            titleShift={{ y: 2 }}
          >
            <FieldList
              rowGap={20}
              offset={141}
              columnGap={113}
              widths={[242, 202]}
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

          <DetailSection
            title="Requirement Detail"
            subtitle="Direct and indirect communication information."
            paddingTop={36}
            paddingBottom={30}
            titleWidth={250}
            titleShift={{ y: -19 }}
          >
            <FieldList
              rowGap={20}
              offset={44}
              columns={[
                [
                  ["Property Type", requirement.propertyType],
                  ["Budget", requirement.budget],
                  ["Preferred Location", requirement.preferredLocation],
                  ["Requirement Notes", requirement.notes],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Visit Summary"
            subtitle="Direct and indirect communication information."
            paddingTop={40}
            paddingBottom={34}
            titleWidth={250}
            titleShift={{ y: -18 }}
          >
            <FieldList
              rowGap={20}
              offset={64}
              widths={[427, 192]}
              columnGap={-65} // the second column starts under the long "Next Task" value
              columns={[
                [
                  ["Days Visited", visit.daysVisited],
                  ["Number of Chats", visit.chats],
                  ["First Visit", visit.firstVisit],
                  ["Next Task", visit.nextTask],
                ],
                [
                  ["Most recent Visit", visit.mostRecentVisit],
                  ["Referrer", visit.referrer],
                ],
              ]}
            />
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
