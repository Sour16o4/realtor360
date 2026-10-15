"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { currentPage } from "@/lib/search";

const Divider = () => <span className="w-7 text-subtle">|</span>;

/** Prev / Next: a link, or (without href) the same grey, inert text at the first / last page. */
function Step({ label, href, className }: { label: "Prev" | "Next"; href?: string; className: string }) {
  const prev = label === "Prev";
  // The dark chevron is page-next.svg and the grey one page-prev.svg; each is mirrored where it points the other way.
  const icon = (
    <Image src={href ? "/icons/page-next.svg" : "/icons/page-prev.svg"} alt="" width={18} height={18} className={cn(prev === !!href && "-scale-x-100")} />
  );
  const content = prev ? <>{icon}{label}</> : <>{label}{icon}</>;
  const classes = cn("flex items-center", className, !href && "text-subtle");
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <span aria-disabled="true" className={classes}>
      {content}
    </span>
  );
}

/** The current page is `?page=`; every other param (?tab=, ?q=) is kept in the links. */
export default function Pagination({ pages = 3, className }: { pages?: number; className?: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const page = currentPage(params.get("page") ?? undefined, pages);
  const numbers = Array.from({ length: pages }, (_, index) => index + 1);
  const hrefTo = (number: number) => {
    const next = new URLSearchParams(params);
    next.set("page", String(number));
    return `${pathname}?${next}`;
  };

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-3 text-18 font-medium", className)}>
      <Step label="Prev" href={page > 1 ? hrefTo(page - 1) : undefined} className="w-57" />
      {numbers.map((number) => (
        <Fragment key={number}>
          <Divider />
          <Link
            href={hrefTo(number)}
            aria-current={page === number ? "page" : undefined}
            className={cn("flex h-27 min-w-12 items-center justify-center text-black", page === number && "w-27 rounded-full bg-[#f3e3af]")}
          >
            {number}
          </Link>
        </Fragment>
      ))}
      <Divider />
      <Step label="Next" href={page < pages ? hrefTo(page + 1) : undefined} className="w-59" />
    </nav>
  );
}
