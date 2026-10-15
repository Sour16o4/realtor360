import { developments } from "@/data/dashboard";
import { cn } from "@/lib/cn";

export default function ChartLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-22", className)}>
      {developments.map((item) => (
        <li key={item.key} className="flex items-center gap-5 text-12 font-medium text-muted">
          <span className="size-16 rounded-full" style={{ background: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
