"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { cn } from "@/lib/cn";

const PAGES = [1, 2, 3];

const Divider = () => <span className="w-7 text-subtle">|</span>;

export default function Pagination({ className }: { className?: string }) {
  const [page, setPage] = useState(1);

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-3 text-18 font-medium", className)}>
      <button
        type="button"
        onClick={() => setPage((value) => Math.max(1, value - 1))}
        className="flex w-57 items-center text-subtle"
      >
        <Image src="/icons/page-prev.svg" alt="" width={18} height={18} />
        Prev
      </button>
      {PAGES.map((number) => (
        <Fragment key={number}>
          <Divider />
          <button
            type="button"
            onClick={() => setPage(number)}
            aria-current={page === number ? "page" : undefined}
            className={cn("flex h-27 min-w-12 items-center justify-center text-black", page === number && "w-27 rounded-full bg-[#f3e3af]")}
          >
            {number}
          </button>
        </Fragment>
      ))}
      <Divider />
      <button
        type="button"
        onClick={() => setPage((value) => Math.min(PAGES.length, value + 1))}
        className="flex w-59 items-center"
      >
        Next
        <Image src="/icons/page-next.svg" alt="" width={18} height={18} />
      </button>
    </nav>
  );
}
