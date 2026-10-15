import { cn } from "@/lib/cn";

export type PillTone = "success" | "danger";

const TONES: Record<PillTone, string> = {
  success: "bg-success-bg text-success",
  danger: "bg-danger-bg text-danger",
};

type PillProps = {
  tone: PillTone;
  children: React.ReactNode;
};

/** Small rounded status label, e.g. "Available", "Sold Out", "+12%". */
export default function Pill({ tone, children }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-20 items-center gap-2 rounded-10 px-10 text-12 font-medium whitespace-nowrap",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
