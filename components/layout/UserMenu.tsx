"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";

const MENU_ITEMS = [
  { label: "User Profile", icon: "/icons/user.svg", href: "/settings" },
  { label: "Settings", icon: "/icons/settings.svg", href: "/settings" },
  { label: "Sign out", icon: "/icons/sign-out.svg", href: "/" },
];

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere outside the menu.
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
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
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex h-42 items-center gap-10 rounded-10 px-20 text-14 hover:bg-[#f4f4f4]"
              >
                <Image src={item.icon} alt="" width={18} height={18} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
