"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";

/** Only Settings has a prototype link; the other items are plain buttons. */
const MENU_ITEMS = [
  { label: "User Profile", icon: "/icons/user.svg" },
  { label: "Settings", icon: "/icons/settings.svg", href: "/settings" },
  { label: "Sign out", icon: "/icons/sign-out.svg" },
];

const ITEM_CLASS = "flex h-42 w-full items-center gap-10 rounded-10 px-20 text-left text-14 hover:bg-[#f4f4f4]";

export default function UserMenu() {
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
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-35 w-60 items-center gap-5"
      >
        <Avatar src="/images/user.webp" alt="" size={35} />
        <Image src="/icons/arrow-drop-down.svg" alt="" width={20} height={20} />
      </button>

      {open && (
        <ul className="absolute top-58 right-0 w-257 rounded-10 bg-white p-1 shadow-menu">
          {MENU_ITEMS.map((item) => {
            const content = (
              <>
                <Image src={item.icon} alt="" width={18} height={18} />
                {item.label}
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} onClick={() => setOpen(false)} className={ITEM_CLASS}>
                    {content}
                  </Link>
                ) : (
                  <button type="button" className={ITEM_CLASS}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
