import Image from "next/image";
import ListPage from "@/components/list/ListPage";
import ListTable from "@/components/list/ListTable";
import StatusBadge from "@/components/ui/StatusBadge";
import { companies, companyFilters, type Company } from "@/data/companies";
import type { Column } from "@/data/types";

const columns: Column<Company>[] = [
  {
    header: "Company Name",
    width: 342,
    render: (c) => (
      <div className="flex items-start gap-9 pl-2">
        <Image src={c.logo} alt="" width={45} height={45} className="shrink-0 rounded-full object-cover" style={{ width: 45, height: 45 }} />
        <p className="mt-10 text-16 font-semibold">{c.name}</p>
      </div>
    ),
  },
  { header: "Type", width: 148, render: (c) => c.type },
  { header: "No. of Projects", width: 161, render: (c) => c.projects },
  { header: "City", width: 127, render: (c) => c.city },
  { header: "Status", width: 143, render: (c) => <StatusBadge status={c.status} /> },
  { header: "Owner Name", width: 143, render: (c) => c.owner },
];

export default function CompaniesPage() {
  return (
    <ListPage
      title="All Companies"
      createLabel="Create Company"
      filters={companyFilters}
      search="Search Company"
      tightFilters
    >
      <ListTable
        columns={columns}
        rows={companies}
        rowKey={(c) => c.id}
        rowHref={(c) => `/companies/${c.id}`}
        rowClassName="h-89 pl-17 pt-22"
        bodyClassName="mt-3"
      />
    </ListPage>
  );
}
