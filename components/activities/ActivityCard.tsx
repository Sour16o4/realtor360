import Image from "next/image";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Activity } from "@/data/activities";
import { cn } from "@/lib/cn";

/**
 * Distance (px) of each row from the top of the card, and of the status badge. The design spaces the three kinds of
 * card differently: customers (deal + value), meetings/tasks (two-line title) and calls (one-line title).
 */
const LAYOUTS = {
  customer: { rows: [61, 86, 111], status: 136, valueWidth: "" },
  task: { rows: [51, 90, 111], status: 136, valueWidth: "w-160" },
  call: { rows: [51, 73, 95], status: 117, valueWidth: "whitespace-nowrap" },
};

function Row({ top, label, children, className }: { top: number; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className="absolute left-14 flex items-center gap-12 text-12" style={{ top }}>
      <span className="font-semibold text-subtle">{`${label}:`}</span>
      <span className={className}>{children}</span>
    </div>
  );
}

/** One activity card: icon + title + date on top, "Label: value" rows, status badge and priority. */
export default function ActivityCard({ activity }: { activity: Activity }) {
  const kind = activity.deal ? "customer" : activity.icon === "task" ? "task" : "call";
  const { rows, status, valueWidth } = LAYOUTS[kind];
  const fields: Array<[string, string | undefined]> =
    kind === "customer"
      ? [["Assigned To", activity.assignedTo], ["Deal", activity.deal], ["Deal Value", activity.dealValue]]
      : [["Title", activity.subject], ["Assigned To", activity.assignedTo], ["Linked To", activity.linkedTo]];

  return (
    <article className="relative h-169 w-245 rounded-10 border-[0.5px] border-subtle bg-white">
      <div className="absolute top-12 left-14 flex min-h-24 items-center gap-5">
        <Image src={`/icons/${activity.icon}.svg`} alt="" width={24} height={24} />
        <h3 className={cn("text-14", !activity.titleWidth && "whitespace-nowrap")} style={{ width: activity.titleWidth }}>
          {activity.title}
        </h3>
      </div>
      <p className={cn("absolute top-12 left-181 text-10", activity.overdue ? "text-overdue" : "text-subtle")}>
        {activity.date}
        {activity.time && (
          <>
            <br />
            {activity.time}
          </>
        )}
      </p>

      {fields.map(([label, value], index) => (
        <Row key={label} top={rows[index]} label={label} className={index === 0 ? valueWidth : undefined}>
          {value}
        </Row>
      ))}

      <div className="absolute left-14 flex items-center gap-12 text-12" style={{ top: status }}>
        <span className="font-semibold text-subtle">Status:</span>
        <StatusBadge status={activity.status} size="sm" />
      </div>
      <span className="absolute right-9 text-10 text-subtle" style={{ top: status + 4 }}>
        {activity.priority}
      </span>
    </article>
  );
}
