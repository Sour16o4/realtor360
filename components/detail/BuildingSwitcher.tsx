"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type BuildingSwitcherProps = {
  options: Array<{ id: string; name: string; development: string }>;
};

/** Arrow next to a building's title: opens the list of buildings; picking one opens that building's page. */
export default function BuildingSwitcher({ options }: BuildingSwitcherProps) {
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
    <div ref={ref} className="contents">
      <button type="button" aria-label="Switch building" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Image src="/icons/arrow-drop-down.svg" alt="" width={27} height={27} className={cn(open && "rotate-180")} />
      </button>
      {open && (
        <ul className="absolute top-full left-0 z-10 mt-6 w-262 rounded-10 bg-white p-2 shadow-[0_2px_3px_rgba(0,0,0,0.15)]">
          {options.map((option) => (
            <li key={option.id}>
              <Link
                href={`/buildings/${option.id}`}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-5 rounded-10 p-20 hover:bg-[#f4f4f4]"
              >
                <span className="text-16 leading-normal font-semibold text-black">{option.name}</span>
                <span className="text-14 text-subtle">
                  <span className="font-medium">Development:</span> {option.development}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
