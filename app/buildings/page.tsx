import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import RecordName from "@/components/list/RecordName";
import { buildingFilters, buildings, type Building } from "@/data/buildings";
import type { Column } from "@/data/types";
import { listRows } from "@/lib/search";

const columns: Column<Building>[] = [
  {
    header: "Building Name",
    width: 405,
    render: (b) => <RecordName name={b.name} image={b.image} details={[["Email", b.email]]} className="gap-14" />,
  },
  { header: "Development Name", width: 214, render: (b) => b.development },
  { header: "City", width: 131, render: (b) => b.city },
  { header: "Status", width: 138, render: (b) => b.status },
  { header: "Units", width: 98, render: (b) => b.units },
  { header: "Sold", width: 78, render: (b) => b.sold },
];

export default async function BuildingsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams;
  const { rows, pages } = listRows(buildings, q, page, (row) => row.name);
  return (
    <ListPage pages={pages}
      title="Buildings"
      createLabel="Create Buildings"
      filters={buildingFilters}
      filterSearch="Search by Building Name"
      compactHeader
    >
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(b) => b.id}
        rowHref={(b) => `/buildings/${b.id}`}
        rowClassName="-ml-8 h-150 pl-24 pt-25"
      />
    </ListPage>
  );
}
