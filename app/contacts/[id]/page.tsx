import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import DetailTable from "@/components/detail/DetailTable";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { contactDetails, contacts } from "@/data/contacts";

export function generateStaticParams() {
  return Object.keys(contactDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function ContactDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = contactDetails[id];
  const contact = contacts.find((c) => c.id === id);
  if (!detail || !contact) notFound();

  return (
    <DetailPage related={detail.related} compact>
      <RecordHeader
        backHref="/contacts"
        textClassName="pb-3"
        actionsClassName="mr-10 mb-3 gap-9"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText
          title={contact.name}
          titleClassName="text-[26px]"
          lines={[["Email", detail.email]]}
          linesClassName="mt-4 text-16"
        >
          <div className="mt-20">
            <StatusBadge status={contact.status} />
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
            paddingBottom={31}
            titleShift={{ x: -20, y: -18 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={226}
              columns={[
                [
                  ["Contact Name", contact.name],
                  ["Role", <span key="role" className="ml-30">{contact.role}</span>], // the design puts this value 30px further right
                  ["Status", <StatusBadge key="status" status={contact.status} />],
                  ["Assigned To", contact.assignedTo],
                  ["Created Date", detail.createdDate],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Contact Information"
            subtitle="Direct and indirect communication information."
            paddingTop={31}
            paddingBottom={47}
            titleWidth={250}
            titleShift={{ y: 22 }}
          >
            <FieldList
              offset={123}
              columns={[
                [
                  ["Email", detail.email],
                  ["Phone Number", detail.phone],
                  ["Location/City", detail.city],
                  ["Preferred Contact Method", detail.preferredContact, 31], // this row sits slightly further down
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            id="deals"
            title="Deals"
            subtitle="Associated transactions or deal stages with the contact."
            paddingTop={16}
            paddingBottom={23}
            titleWidth={224}
            titleShift={{ x: -13, y: -28 }}
          >
            <div className="mr-45 mb-16 flex justify-end gap-10 text-14">
              <button type="button" className="h-31 rounded-5 bg-cream px-18">New</button>
              <button type="button" className="h-31 rounded-5 bg-cream px-18">Edit</button>
            </div>
            <div className="ml-21">
              <DetailTable
                columns="150px 155px 90px 121px 115px 1fr"
                rowGap={30}
                headings={["Deal Name", "Development\nName", "Unit\nType", "Deal\nValue", "Status", "Follow-\nup Date"]}
                rows={detail.deals.map((deal) => [
                  <span key="name" className="block w-126 font-semibold text-black">{deal.name}</span>,
                  <span key="dev" className="block w-120">{deal.development}</span>,
                  <span key="unit" className="block w-60">{deal.unitType}</span>,
                  deal.value,
                  <span key="status" className="block w-80">{deal.status}</span>,
                  deal.followUp,
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
