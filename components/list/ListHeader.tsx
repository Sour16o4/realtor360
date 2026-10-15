import Image from "next/image";
import { cn } from "@/lib/cn";
import SearchInput from "./SearchInput";

type ListHeaderProps = {
  title: string;
  createLabel: string;
  searchPlaceholder?: string;
  className?: string;
};

function ToolbarButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="flex h-31 items-center gap-3 rounded-5 bg-cream px-5 text-14">
      {children}
    </button>
  );
}

/** Page title, "+ Create" button, optional search, view switcher and Actions menu. */
export default function ListHeader({ title, createLabel, searchPlaceholder, className }: ListHeaderProps) {
  return (
    <div className={cn("pt-22", className)}>
      <h1 className="text-24 font-semibold">{title}</h1>
      <div className="mt-15 flex flex-wrap items-center justify-between gap-10">
        <button
          type="button"
          className="mt-2 flex h-29 items-center gap-4 rounded-5 bg-gold px-8 text-16 font-medium text-white"
        >
          <Image src="/icons/add.svg" alt="" width={13} height={13} />
          {createLabel}
        </button>

        <div className="flex items-center gap-10">
          {searchPlaceholder && (
            <label className="flex h-31 w-267 items-center justify-between rounded-5 bg-[#ededed] px-10">
              <SearchInput
                placeholder={searchPlaceholder}
                className="w-full bg-transparent font-nav text-12 font-medium outline-none placeholder:text-subtle"
              />
              <Image src="/icons/search.svg" alt="" width={25} height={25} />
            </label>
          )}
          <ToolbarButton>
            <Image src="/icons/grid-view.svg" alt="Change view" width={24} height={24} />
            <Image src="/icons/caret-down.svg" alt="" width={16} height={16} />
          </ToolbarButton>
          <ToolbarButton>
            Actions
            <Image src="/icons/caret-down.svg" alt="" width={16} height={16} />
          </ToolbarButton>
        </div>
      </div>
    </div>
  );
}
