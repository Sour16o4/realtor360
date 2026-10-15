"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex min-w-0 flex-1 items-center">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-42 shrink-0 items-center rounded-10 px-12 font-nav text-14 whitespace-nowrap",
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
