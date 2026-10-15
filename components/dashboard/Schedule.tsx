import { schedule, type EventType } from "@/data/dashboard";
import { cn } from "@/lib/cn";

/** Colored bar on the left edge of each item. */
const ACCENT: Record<EventType, string> = {
  visit: "shadow-[inset_2px_0_0_0_var(--color-event-visit)]",
  "follow-up": "shadow-[inset_2px_0_0_0_var(--color-event-follow-up)]",
  offer: "shadow-[inset_2px_0_0_0_var(--color-event-offer)]",
};

export default function Schedule() {
  return (
    <div>
      <h2 className="text-16 font-medium">My Schedule</h2>
      <ul className="mt-15 flex flex-col gap-12">
        {schedule.map((item) => (
          <li key={item.title} className={cn("rounded-10 bg-white px-10 py-9", ACCENT[item.type])}>
            <p className="text-14 font-medium">{item.title}</p>
            <p className="text-12 text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
