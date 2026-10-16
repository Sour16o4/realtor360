import Link from "next/link";
import type { RelatedItem } from "@/data/types";
import { cn } from "@/lib/cn";

type DetailPageProps = {
  related: RelatedItem[];
  /** The building and contact pages space the sidebar items slightly tighter and 6px further right. */
  compact?: boolean;
  /** Space (px) above "Add Related List"; the design uses a different value on some pages. */
  addRelatedGap?: number;
  /** Width (px) of the sidebar list where the design has longer labels than the usual 146px. */
  listWidth?: number;
  /** Top margin and item spacing (px) of the sidebar list where a design frame differs from the usual one (the developments Notes tab). */
  listTop?: number;
  listGap?: number;
  children: React.ReactNode;
};

/**
 * Where a sidebar item leads: Notes, Activities and Attachments open their tab, "#section" jumps to a section of the Overview tab.
 * Items the design gives no section (e.g. Units on a development) open the Overview tab.
 */
function relatedHref({ label, href }: RelatedItem) {
  if (href) return `?tab=overview${href}`;
  return ["Notes", "Activities", "Attachments"].includes(label) ? `?tab=${label.toLowerCase()}` : "?tab=overview";
}

/** Shell of every detail page: white "Related List" sidebar on the left, page content on the right. */
export default function DetailPage({ related, compact = false, addRelatedGap = compact ? 56 : 54, listWidth, listTop, listGap, children }: DetailPageProps) {
  return (
    <div className="flex flex-col lg:min-h-[calc(100vh-65px)] lg:flex-row">
      <aside className="shrink-0 bg-white pt-22 pb-40 pl-80 lg:w-296">
        <h2 className="w-137 text-center text-24 font-semibold">Related List</h2>
        <ul className={cn("flex flex-col", compact ? "mt-47 w-146 gap-37 pl-6" : "mt-39 gap-39")}
          style={{ width: listWidth, marginTop: listTop, gap: listGap }}
        >
          {related.map((item) => (
            <li key={item.label} className="flex items-center gap-9 text-18 leading-22 font-medium">
              <Link href={relatedHref(item)}>{item.label}</Link>
              {item.count !== undefined && (
                <span className="flex size-19 items-center justify-center rounded-5 bg-[#f3e3af] text-14 font-normal text-black">
                  {item.count}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="-ml-80 text-center text-16 font-medium text-[#0077b5]" style={{ marginTop: addRelatedGap }}>
          Add Related List
        </p>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-auto">{children}</main>
    </div>
  );
}
