"use client";

import Image from "next/image";
import { useState } from "react";

/** The star in front of a report name: toggles between the empty and the filled star. */
export default function StarToggle({ name }: { name: string }) {
  const [starred, setStarred] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={starred}
      aria-label={`${starred ? "Remove star from" : "Star"} ${name}`}
      onClick={() => setStarred(!starred)}
      className="shrink-0"
    >
      <Image src={starred ? "/icons/star-filled.svg" : "/icons/star.svg"} alt="" width={26} height={26} />
    </button>
  );
}
