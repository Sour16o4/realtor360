import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import RecordName from "@/components/list/RecordName";
import StatusBadge from "@/components/ui/StatusBadge";
import { contactFilters, contacts, type Contact } from "@/data/contacts";
import type { Column } from "@/data/types";
import { pageCount, searchRows } from "@/lib/search";

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

export default async function ContactsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const rows = searchRows(contacts, q, (row) => row.name);
  return (
    <ListPage pages={pageCount(rows.length, !!q)}
      title="All Contacts"
      createLabel="Create Contact"
      filters={contactFilters}
      filterSearch="Search by Contact Name"
      search="Search Contact"
      compactHeader
      actionsGap={20}
    >
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(c) => c.id}
        rowHref={(c) => `/contacts/${c.id}`}
        rowClassName="h-91 pl-17 pt-21"
        bodyClassName="mt-4"
      />
    </ListPage>
  );
}
