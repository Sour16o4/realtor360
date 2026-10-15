import Image from "next/image";
import type { FilterGroup } from "@/data/types";
import { cn } from "@/lib/cn";

type FilterSidebarProps = {
  groups: FilterGroup[];
  searchPlaceholder?: string;
  /** Extra controls rendered after the checkbox groups (e.g. a range). */
  children?: React.ReactNode;
  /** Tighter group spacing (the units design). */
  tight?: boolean;
};

/**
 * Left "Filters" panel shared by every list page.
 * It is a plain form: the browser's native reset clears the checkboxes, so no client state is needed.
 */
export default function FilterSidebar({ groups, searchPlaceholder, children, tight = false }: FilterSidebarProps) {
  return (
    <aside className="shrink-0 bg-white pt-22 pr-13 pb-40 pl-26 lg:w-296">
      <h2 className="-mr-13 -ml-26 text-center text-24 font-semibold">Filters</h2>

      <form>
        {searchPlaceholder && (
          <label className="mt-12 flex h-32 items-center justify-between rounded-10 bg-page px-10">
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full bg-transparent font-nav text-12 font-medium outline-none placeholder:text-subtle"
            />
            <Image src="/icons/search-small.svg" alt="" width={17} height={17} />
          </label>
        )}

        {groups.map((group, index) => (
          <fieldset key={group.title} className={cn(index === 0 ? (searchPlaceholder ? "mt-11" : tight ? "mt-19" : "mt-31") : tight ? "mt-12" : "mt-15")}>
            <legend className="text-20 font-medium">{group.title}</legend>
            <div className="mt-12 flex flex-col gap-8">
              {group.options.map((option) => (
                <label key={option} className="flex items-center gap-5 text-14">
                  <input
                    type="checkbox"
                    name={group.title}
                    value={option}
                    className="size-15 shrink-0 appearance-none bg-[url(/icons/checkbox.svg)] checked:bg-[url(/icons/checkbox-checked.svg)]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {children}

        <div className="mt-30 -ml-4 flex w-252 max-w-full flex-col gap-15">
          <button type="button" className="h-30 rounded-10 bg-gold text-14 font-medium text-white">
            Apply Filters
          </button>
          <button type="reset" className="h-30 rounded-10 border border-gold bg-white text-14 font-medium">
            Reset Filters
          </button>
        </div>
      </form>
    </aside>
  );
}
