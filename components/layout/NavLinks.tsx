"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export default function NavLinks() {
  const pathname = usePathname();

  // On narrow screens the pills scroll sideways; the vertical padding keeps focus outlines from being clipped.
  return (
    <nav className="-my-4 flex min-w-0 flex-1 items-center overflow-x-auto py-4 [scrollbar-width:none]">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{ width: item.width, marginLeft: item.gap }}
            className={cn(
              "flex h-42 shrink-0 items-center justify-center rounded-10 font-nav text-14 whitespace-nowrap",
              active ? "bg-gold font-semibold text-white" : "font-medium text-ink hover:bg-page",
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link href="/dashboards" aria-label="Dashboards" className="ml-5 shrink-0">
        <Image src="/icons/more.svg" alt="" width={28} height={28} />
      </Link>
    </nav>
  );
}
