import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import RecordName from "@/components/list/RecordName";
import StatusBadge from "@/components/ui/StatusBadge";
import { contactDetails, contactFilters, contacts, type Contact } from "@/data/contacts";
import type { Column } from "@/data/types";

/** Cells after the name start 6px lower than the name in the design. */
const lower = (content: React.ReactNode) => <div className="pt-6">{content}</div>;

const columns: Column<Contact>[] = [
  {
    header: "Contact Name",
    width: 290,
    render: (c) => <RecordName name={c.name} details={[["Email", c.email]]} />,
  },
  { header: "Company", width: 130, render: (c) => lower(c.company) },
  { header: "Role", width: 93, render: (c) => lower(c.role) },
  { header: "Phone No.", width: 150, render: (c) => lower(c.phone) },
  { header: "Deal Stage", width: 130, render: (c) => lower(c.dealStage) },
  { header: "Status", width: 148, render: (c) => lower(<StatusBadge status={c.status} />) },
  { header: "Assigned to", width: 123, render: (c) => lower(c.assignedTo) },
];

export default function ContactsPage() {
  return (
    <ListPage
      title="All Contacts"
      createLabel="Create Contact"
      filters={contactFilters}
      filterSearch="Search by Contact Name"
      search="Search Contact"
      compactHeader
    >
      <ListTable
        columns={columns}
        rows={contacts}
        rowKey={(c) => c.id}
        rowHref={(c) => (c.id in contactDetails ? `/contacts/${c.id}` : undefined)}
        rowClassName="h-91 pl-17 pt-21"
        bodyClassName="mt-4"
      />
    </ListPage>
  );
}
