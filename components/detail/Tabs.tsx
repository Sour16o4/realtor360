import Link from "next/link";
import { cn } from "@/lib/cn";

export const TABS = ["overview", "timeline", "notes", "activities", "attachments"] as const;
export type DetailTab = (typeof TABS)[number];

/** Reads the ?tab= search param of a page; anything unknown means the Overview tab. */
export function parseTab(value: string | string[] | undefined): DetailTab {
  return TABS.find((tab) => tab === value) ?? "overview";
}

/** Segmented control under the record header. Each tab is a link to ?tab=..., so no client state is needed. */
export default function Tabs({ active }: { active: DetailTab }) {
  return (
    <nav className="px-59 py-11">
      <div className="flex max-w-1020 rounded-10 bg-white">
        {TABS.map((tab) => (
          <Link
            key={tab}
            href={`?tab=${tab}`}
            className={cn(
              "flex h-42 flex-1 items-center justify-center rounded-10 text-16 font-semibold capitalize",
              tab === active && "bg-[#ddd]",
            )}
          >
            {tab}
          </Link>
        ))}
      </div>
    </nav>
  );
}
