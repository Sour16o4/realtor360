import Image from "next/image";
import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import { developmentFilters, developments, type Development } from "@/data/developments";
import type { Column } from "@/data/types";

const columns: Column<Development>[] = [
  {
    header: "Name",
    width: 449,
    render: (d) => (
      <div className="flex items-center gap-14">
        <Image src={d.image} alt="" width={100} height={100} className="shrink-0 rounded-10 object-cover" style={{ width: 100, height: 100 }} />
        <div>
          <p className="text-16 font-semibold text-black">{d.name}</p>
          <div className="mt-20 opacity-60">
            <p className="text-14 text-subtle">Email: {d.email}</p>
            <p className="mt-8 text-14 text-subtle">
              Website: <span className="text-gold underline">{d.website}</span>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  { header: "Type", width: 85, render: (d) => d.type },
  { header: "City", width: 93, render: (d) => d.city },
  { header: "Attorney Firms Name", width: 146, className: "text-center", render: (d) => d.attorneyFirm },
  { header: <span className="mx-auto block w-98">No. of Buildings</span>, width: 126, className: "text-center", render: (d) => d.buildings },
  { header: "Starting Price", width: 165, className: "pl-17", render: (d) => d.startingPrice },
];

export default function DevelopmentsPage() {
  return (
    <ListPage
      title="Developments"
      createLabel="Create Development"
      filters={developmentFilters}
      filterSearch="Search by Development Name"
      compactHeader
    >
      <ListTable
        columns={columns}
        rows={developments}
        rowKey={(_, i) => String(i)}
        rowClassName="-ml-8 h-153 pl-24 pt-25 first:pt-28"
        bodyClassName="mt-3"
      />
    </ListPage>
  );
}
