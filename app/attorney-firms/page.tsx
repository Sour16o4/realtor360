import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { attorneyFirmFilters, attorneyFirms, type AttorneyFirm } from "@/data/attorneyFirms";
import type { Column } from "@/data/types";
import { listRows } from "@/lib/search";

const columns: Column<AttorneyFirm>[] = [
  { header: "Firm Name", width: 342, render: (f) => <p className="text-16 font-semibold">{f.name}</p> },
  { header: "Email", width: 267, render: (f) => f.email },
  { header: "Phone No.", width: 178, render: (f) => f.phone },
  { header: "City", width: 125, render: (f) => f.city },
  { header: "Status", width: 152, render: (f) => <StatusBadge status={f.status} /> },
];

export default async function AttorneyFirmsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams;
  const { rows, pages } = listRows(attorneyFirms, q, page, (row) => row.name);
  return (
    <ListPage pages={pages}
      title="Attorney Firm"
      createLabel="Create Attorney Firm"
      filters={attorneyFirmFilters}
      search="Search Attorney Firm"
      tightFilters
      actionsGap={20}
    >
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(f) => f.id}
        rowHref={(f) => `/attorney-firms/${f.id}`}
        rowClassName="h-74 pl-17 pt-22"
        bodyClassName="mt-3"
      />
    </ListPage>
  );
}
