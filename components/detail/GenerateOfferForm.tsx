"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Gold header button of a deal: the label opens the offer form, the arrow opens a menu with the deal sheet. */
export default function GenerateOfferForm({ dealId }: { dealId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on a click outside the menu or on Escape.
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-173">
      <div className="flex h-31 items-center gap-3 rounded-5 bg-gold px-8 text-14 font-medium text-white">
        <Link href={`/deals/${dealId}/offer-form`}>Generate Offer Form</Link>
        <button type="button" aria-label="More options" aria-expanded={open} onClick={() => setOpen(!open)}>
          <Image src="/icons/arrow-drop-down.svg" alt="" width={16} height={16} className={cn("brightness-0 invert", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-2 w-full rounded-10 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
          <Link
            href={`/deals/${dealId}/deal-sheet`}
            onClick={() => setOpen(false)}
            className="flex justify-center rounded-5 px-20 py-6 text-12 text-ink hover:bg-[#ddd]"
          >
            Generate Deal Sheet
          </Link>
        </div>
      )}
    </div>
  );
}
