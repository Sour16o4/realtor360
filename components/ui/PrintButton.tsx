"use client";

import { HeaderButton } from "@/components/detail/RecordHeader";

/** The "Export" / "Export PDF" button of the document pages: opens the browser's print dialog (save as PDF). */
export default function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <HeaderButton wide className="opacity-80" onClick={() => window.print()}>
      {children}
    </HeaderButton>
  );
}
