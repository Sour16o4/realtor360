import Image from "next/image";
import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { unitFilters, units, type Unit } from "@/data/units";
import type { Column } from "@/data/types";
import { pageCount, searchRows } from "@/lib/search";

const columns: Column<Unit>[] = [
  {
    header: "Unit Name",
    width: 321,
    render: (u) => (
      <div className="flex items-start gap-32">
        <Image src={u.image} alt="" width={82} height={82} className="shrink-0 rounded-10 object-cover" style={{ width: 82, height: 82 }} />
        <p className="mt-17 w-120 text-16 font-semibold">{u.name}</p>
      </div>
    ),
  },
  { header: "Building", width: 148, render: (u) => u.building },
  { header: "Development", width: 198, render: (u) => u.development },
  { header: "Type", width: 121, render: (u) => u.type },
  { header: "Status", width: 160, render: (u) => <StatusBadge status={u.status} /> },
  { header: "Price", width: 116, render: (u) => <span className="-mt-3 block text-12">{u.price}</span> },
];

export default async function UnitsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const rows = searchRows(units, q, (row) => row.name);
  return (
    <ListPage pages={pageCount(rows.length, !!q)} title="All Units" createLabel="Create Units" filters={unitFilters} search="Search Unit" tightFilters actionsGap={20}>
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(u) => u.id}
        rowHref={(u) => `/units/${u.id}`}
        rowClassName="h-122 pl-17 pr-8 -mr-8 pt-20"
        bodyClassName="mt-5"
      />
    </ListPage>
  );
}
