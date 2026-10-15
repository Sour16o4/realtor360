"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** The filters form: Reset Filters clears the checkboxes (native reset) and the search text, but keeps the open ?tab=. */
export default function FilterForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const tab = useSearchParams().get("tab");
  return <form onReset={() => router.replace(tab ? `${pathname}?tab=${tab}` : pathname, { scroll: false })}>{children}</form>;
}
