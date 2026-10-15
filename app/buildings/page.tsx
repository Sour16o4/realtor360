import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import RecordName from "@/components/list/RecordName";
import { buildingDetails, buildingFilters, buildings, type Building } from "@/data/buildings";
import type { Column } from "@/data/types";

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

export default function BuildingsPage() {
  return (
    <ListPage
      title="Buildings"
      createLabel="Create Buildings"
      filters={buildingFilters}
      filterSearch="Search by Building Name"
      compactHeader
    >
      <ListTable
        columns={columns}
        rows={buildings}
        rowKey={(b) => b.id}
        rowHref={(b) => (b.id in buildingDetails ? `/buildings/${b.id}` : undefined)}
        rowClassName="-ml-8 h-150 pl-24 pt-25"
      />
    </ListPage>
  );
}
