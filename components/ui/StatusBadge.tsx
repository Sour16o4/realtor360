import { cn } from "@/lib/cn";

const TONES = {
  green: "border-[#0dd112] bg-[#e9f7ef]",
  yellow: "border-[#f2c94c] bg-[#fff9e6]",
  red: "border-[#eb5757] bg-[#fdeeee]",
  blue: "border-[#2d9cdb] bg-[#eaf4fb]",
  gray: "border-[#828282] bg-[#f4f4f4]",
} as const;

type Tone = keyof typeof TONES;

/** Which color each status label uses across the app. */
const STATUS_TONE: Record<string, Tone> = {
  Active: "green",
  Available: "green",
  Completed: "green",
  "Closed Won": "green",
  Interested: "green",
  "In Progress": "yellow",
  Booked: "yellow",
  Inactive: "red",
  "Not Interested": "red",
  "Closed Lost": "red",
  Missed: "red",
  Open: "blue",
  Sold: "blue",
  Converted: "blue",
  Cold: "gray",
  "Not Started": "gray",
};

type StatusBadgeProps = {
  status: string;
  size?: "sm" | "md";
  className?: string;
};

/** Outlined status label used in tables, detail pages and activity cards. */
export default function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-5 border whitespace-nowrap",
        size === "md" ? "h-25 px-17 text-14" : "h-21 px-17 text-12",
        TONES[STATUS_TONE[status] ?? "gray"],
        className,
      )}
    >
      {status}
    </span>
  );
}
