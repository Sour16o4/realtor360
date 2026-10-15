import type { FilterGroup } from "@/data/types";
import { cn } from "@/lib/cn";
import FilterSidebar from "./FilterSidebar";
import ListHeader from "./ListHeader";
import Pagination from "./Pagination";

type ListPageProps = {
  title: string;
  createLabel: string;
  filters: FilterGroup[];
  filterSearch?: string;
  filterExtra?: React.ReactNode;
  search?: string;
  /** Some pages place the divider under the header 8px higher. */
  compactHeader?: boolean;
  children: React.ReactNode;
};

/** Shared shell for list pages: filters on the left, header, content and pagination on the right. */
export default function ListPage({
  title,
  createLabel,
  filters,
  filterSearch,
  filterExtra,
  search,
  compactHeader = false,
  children,
}: ListPageProps) {
  return (
    <div className="flex flex-col lg:min-h-[calc(100vh-65px)] lg:flex-row">
      <FilterSidebar groups={filters} searchPlaceholder={filterSearch}>
        {filterExtra}
      </FilterSidebar>

      <main className="flex min-w-0 flex-1 flex-col pb-34">
        <ListHeader title={title} createLabel={createLabel} searchPlaceholder={search} className="px-16 lg:pr-25 lg:pl-38" />
        <hr className={cn("border-black/12", compactHeader ? "mt-14" : "mt-22")} />
        <div className="px-16 pt-20 lg:pr-25 lg:pl-38">{children}</div>
        <Pagination className="mt-auto self-center pt-40 lg:pr-150" />
      </main>
    </div>
  );
}
