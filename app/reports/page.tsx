import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import StarToggle from "@/components/list/StarToggle";
import { reportFilters, reports, type Report } from "@/data/reports";
import type { Column } from "@/data/types";
import { listRows } from "@/lib/search";

const columns: Column<Report>[] = [
  {
    header: "Report Name",
    width: 272,
    render: (r) => (
      <div className="-mt-4 flex items-center gap-8">
        <StarToggle name={r.name} />
        <p className="text-14 font-semibold">{r.name}</p>
      </div>
    ),
  },
  { header: "Description", width: 497, render: (r) => r.description },
  { header: "Category", width: 171, render: (r) => r.category },
  { header: "Last Run Date", width: 124, render: (r) => r.lastRun },
];

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const { q, page } = await searchParams;
  const { rows, pages } = listRows(reports, q, page, (row) => row.name);
  return (
    <ListPage pages={pages}
      title="All Reports"
      createLabel="Create Reports"
      filters={reportFilters}
      search="Search Report"
      tightFilters
    >
      <ListTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        rowClassName="h-66 pl-17 pt-24"
        bodyClassName="mt-3"
      />
    </ListPage>
  );
}
