import Card from "@/components/ui/Card";
import { dealsClosed } from "@/data/dashboard";
import { cn } from "@/lib/cn";

function Figure({ value, label }: { value: number; label: string }) {
  return (
    <p className="flex items-center gap-5">
      <span className="text-24 font-medium">{value}</span>
      <span className="text-12 font-medium text-muted">{label}</span>
    </p>
  );
}

export default function DealsClosedCard({ className }: { className?: string }) {
  const { closed, inProgress, fillPercent } = dealsClosed;

  return (
    <Card title="Total Deals Closed" className={cn("pt-13 pr-24 pl-22", className)}>
      <div className="relative mt-10 h-43 rounded-10 bg-track">
        <div
          className="h-full rounded-10 bg-linear-to-r from-gold to-gold/20"
          style={{ width: `${fillPercent}%` }}
        />
        {/* Dashed marker at the end of the filled part, with a dot at each end. */}
        <span
          className="absolute -top-3 -bottom-3 w-3 -translate-x-1/2"
          style={{ left: `${fillPercent}%` }}
          aria-hidden
        >
          <span className="absolute top-0 left-0 size-3 rounded-full bg-gold" />
          <span className="absolute inset-y-3 left-1 w-1 bg-[repeating-linear-gradient(to_bottom,var(--color-gold)_0_5px,transparent_5px_10px)]" />
          <span className="absolute bottom-0 left-0 size-3 rounded-full bg-gold" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Figure value={closed} label="Closed Deals" />
        <Figure value={inProgress} label="On Progress" />
      </div>
    </Card>
  );
}
