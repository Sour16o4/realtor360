"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

/**
 * Search box of a list page. The text lives in the `?q=` search param, so the (server) page filters its rows by it
 * and the header and sidebar boxes always show the same text.
 */
export default function SearchInput({ placeholder, className }: { placeholder: string; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams().get("q") ?? "";
  const [value, setValue] = useState(query);
  const ref = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();

  // Follow the URL (the other box, Reset Filters), but never overwrite what is being typed here.
  useEffect(() => {
    if (document.activeElement !== ref.current) setValue(query);
  }, [query]);

  return (
    <input
      ref={ref}
      type="search"
      placeholder={placeholder}
      aria-label={placeholder}
      value={value}
      className={className}
      onChange={(event) => {
        setValue(event.target.value);
        const url = event.target.value ? `${pathname}?q=${encodeURIComponent(event.target.value)}` : pathname;
        startTransition(() => router.replace(url, { scroll: false }));
      }}
    />
  );
}
