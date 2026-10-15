import { notFound } from "next/navigation";
import DetailPage from "@/components/detail/DetailPage";
import DetailSection from "@/components/detail/DetailSection";
import DetailTable from "@/components/detail/DetailTable";
import FieldList from "@/components/detail/FieldList";
import { EmptyTab, NotesTab } from "@/components/detail/NotesTab";
import RecordHeader, { HeaderButton, HeaderText } from "@/components/detail/RecordHeader";
import Tabs, { parseTab } from "@/components/detail/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import { companies, companyDetails } from "@/data/companies";

export function generateStaticParams() {
  return Object.keys(companyDetails).map((id) => ({ id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
};

/** The Deals and Projects sections use bigger, black labels (20/600). */
const BIG_LABEL = "text-20 leading-24 font-semibold text-black";

export default async function CompanyDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const tab = parseTab((await searchParams).tab);
  const detail = companyDetails[id];
  const company = companies.find((c) => c.id === id);
  if (!detail || !company) notFound();

  const { address, deals, contacts } = detail;

  return (
    <DetailPage related={detail.related} compact addRelatedGap={48}>
      <RecordHeader
        backHref="/companies"
        image={company.logo}
        imageSize={[60, 60]}
        roundImage
        imageGap={24}
        imageClassName="mt-6"
        textClassName="pt-6 -mb-2" // the title is 6px under the top; the text block reaches 2px below the header's padding
        actionsClassName="mr-10 -mb-2 gap-9"
        actions={
          <>
            <HeaderButton variant="gold">Send Email</HeaderButton>
            <HeaderButton wide>Edit</HeaderButton>
          </>
        }
      >
        <HeaderText
          title={company.name}
          titleClassName="text-22"
          titleAdornment={<StatusBadge status={company.status} className="ml-46 translate-y-2" />}
          linesClassName=""
        >
          <div className="mt-15 flex gap-10 text-16 leading-19 font-medium text-subtle">
            <div className="flex w-245 flex-col gap-7 break-words">
              <p>Email: {detail.email}</p>
              <p>Owner Name: {company.owner}</p>
            </div>
            <div className="flex flex-col gap-7">
              <p>Type: {company.type}</p>
              <p>City: {company.city}</p>
            </div>
          </div>
        </HeaderText>
      </RecordHeader>

      <Tabs active={tab} className="mt-3" /> {/* the design leaves 3px more under the header here */}

      {tab === "overview" && (
        <>
          {/* Offsets (px) below come from the design: where each title, field list and table sits in its section. */}
          <DetailSection
            title="Basic Details"
            subtitle="Key development highlights"
            paddingTop={29}
            paddingBottom={35}
            titleShift={{ x: -20, y: 24 }}
          >
            <FieldList
              gap={[61, 43]}
              rowGap={20}
              offset={62}
              columnGap={58}
              widths={[334, 280]}
              columns={[
                [
                  ["Company Name", <span key="name" className="-ml-26 block">{company.name}</span>], // the design puts this value 26px further left
                  ["Type", company.type],
                  ["City", company.city],
                ],
                [
                  ["Owner Name", company.owner],
                  ["Status", <span key="status" className="ml-18"><StatusBadge status={company.status} /></span>], // 18px further right
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Contact Information"
            subtitle="Essential communication details"
            paddingTop={26}
            paddingBottom={32}
            titleShift={{ x: -4, y: 7 }}
          >
            <FieldList
              gap={61}
              rowGap={20}
              offset={129}
              columns={[
                [
                  ["Phone", <span key="phone" className="-ml-26 block">{detail.phone}</span>],
                  ["Email", detail.email],
                  ["Website", detail.website],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            title="Address Information"
            subtitle="Essential communication details"
            paddingTop={43}
            paddingBottom={52}
            titleShift={{ x: 7, y: -21 }}
          >
            <FieldList
              gap={[61, 35]}
              rowGap={20}
              offset={128}
              columnGap={46}
              widths={[249, 240]}
              columns={[
                [
                  ["Address", <span key="street" className="-ml-26 block">{address.street}</span>],
                  ["State", address.state],
                  ["Country", address.country],
                ],
                [
                  ["City", <span key="city" className="ml-28">{company.city}</span>],
                  ["Zip Code", address.zipCode],
                ],
              ]}
            />
          </DetailSection>

          <DetailSection
            id="deals"
            title="Deals Information"
            subtitle="Essential communication details"
            paddingTop={23}
            paddingBottom={25}
            titleShift={{ x: 7, y: 3 }}
          >
            <FieldList
              labelClassName={BIG_LABEL}
              offset={97}
              columnGap={60}
              widths={[159, 380]}
              columns={[[["Total Deals", deals.total]], [["Deal Value Range", deals.valueRange]]]}
            />
            <div className="mt-25">
              <FieldList
                labelClassName={BIG_LABEL}
                gap={25}
                offset={95}
                columns={[
                  [
                    [
                      "Deal Types",
                      <ul key="types" className="flex">
                        {deals.types.map((type) => (
                          <li key={type} className="flex gap-7 pl-10">
                            <span aria-hidden>•</span>
                            {type}
                          </li>
                        ))}
                      </ul>,
                    ],
                  ],
                ]}
              />
            </div>
            <p className={`mt-25 ml-90 ${BIG_LABEL}`}>Deal Status</p>
            <div className="mt-7 ml-90">
              <DetailTable
                columns="146px 144px 151px 1fr"
                rowGap={10}
                headings={["Open Deals", "In progress", "Closed Won", "Closed Lost"]}
                rows={[[deals.status.open, deals.status.inProgress, deals.status.closedWon, deals.status.closedLost]]}
              />
            </div>
          </DetailSection>

          <DetailSection
            id="projects"
            title="Projects Information"
            subtitle="Essential communication details"
            paddingTop={20}
            paddingBottom={36}
            titleShift={{ x: 7, y: -42 }}
          >
            <FieldList
              labelClassName={BIG_LABEL}
              offset={97}
              columnGap={56}
              widths={[161, 400]}
              columns={[
                [["Total Deals", <span key="total" className="text-20 leading-24">{company.projects}</span>, 61]], // centered next to the three Project Types lines
                [
                  [
                    "Project Types",
                    <ul key="types" className="flex flex-col gap-10 text-20 leading-24">
                      {detail.projectTypes.map((type) => (
                        <li key={type}>{type}</li>
                      ))}
                    </ul>,
                  ],
                ],
              ]}
            />
            <p className={`mt-25 ml-90 ${BIG_LABEL}`}>Top Projects</p>
            <div className="mt-7 ml-90">
              <DetailTable
                columns="198px 141px 134px 86px 1fr"
                rowGap={10}
                headings={["Project Name", "Type", "City", "Units", "Status"]}
                rows={detail.topProjects.map((p) => [p.name, p.type, p.city, p.units, p.status])}
              />
            </div>
          </DetailSection>

          <DetailSection
            title="Company Contacts"
            subtitle="Internal contacts related to this company"
            paddingTop={40}
            paddingBottom={37}
            titleWidth={310}
            titleShift={{ x: 41, y: -20 }}
          >
            {/* Name is right-aligned in the design, the other columns start at their heading. The design wraps names, roles and emails inside narrow text boxes, so they wrap here too. */}
            <div className="ml-59 grid grid-cols-[168px_81px_190px_186px_1fr] gap-y-22 text-18 leading-22">
              {["Name", "Role", "Email", "Phone", "Status"].map((heading) => (
                <span key={heading} className={`mb-4 font-semibold text-subtle ${heading === "Name" ? "w-113 text-right" : ""}`}>
                  {heading}
                </span>
              ))}
              {contacts.map((contact) => (
                <div key={contact.email} className="contents">
                  <span className="flex w-113 justify-end text-right">
                    <span className="w-min">{contact.name}</span>
                  </span>
                  <span className="w-min">{contact.role}</span>
                  <span className="w-159 [overflow-wrap:anywhere]">{contact.email}</span>
                  <span>{contact.phone}</span>
                  <span>{contact.status}</span>
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
