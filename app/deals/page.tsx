import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { dealFilters, deals, type Deal } from "@/data/deals";
import type { Column } from "@/data/types";
import { listRows } from "@/lib/search";

const columns: Column<Deal>[] = [
  { header: "Deal Name", width: 342, render: (d) => <p className="text-16 font-semibold">{d.name}</p> },
  { header: "Deal Owner", width: 147, render: (d) => d.owner },
  { header: "Development", width: 168, render: (d) => d.development },
  { header: "Unit", width: 131, render: (d) => <p className="w-82">{d.unit}</p> },
  { header: "Status", width: 156, render: (d) => <StatusBadge status={d.status} /> },
  { header: "Deal Value", width: 120, render: (d) => d.value },
];

/** Static "Deal Value" slider at the end of the filters (min. Rs.50L to max. Rs.3Cr). */
const dealValueRange = (
  <fieldset className="mt-12 -mb-10">
    <legend className="text-20 font-medium">Deal Value</legend>
    <div className="relative mt-10 h-13 w-236">
      <span className="absolute top-4 left-2 h-5 w-232 rounded-full bg-[#ddd]" />
      <span className="absolute left-0 size-13 rounded-full bg-black" />
      <span className="absolute left-225 size-13 rounded-full bg-black" />
    </div>
    <div className="mt-2 flex w-236 justify-between text-10 font-medium text-ink">
      <span className="w-24">Min. ₹50L</span>
      <span className="w-24 text-right">Max. ₹3Cr</span>
    </div>
  </fieldset>
);

export default async function DealsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams;
  const { rows, pages } = listRows(deals, q, page, (row) => row.name);
  return (
    <ListPage pages={pages}
      title="All Deals"
      createLabel="Create Deals"
      filters={dealFilters}
      filterExtra={dealValueRange}
      search="Search Deal"
      tightFilters
    >
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(d) => d.id}
        rowHref={(d) => `/deals/${d.id}`}
        rowClassName="h-74 pl-17 pt-22"
        bodyClassName="mt-3"
      />
    </ListPage>
  );
}
