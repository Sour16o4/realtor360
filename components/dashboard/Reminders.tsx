import AvatarStack from "@/components/ui/AvatarStack";
import Card from "@/components/ui/Card";
import { reminders } from "@/data/dashboard";
import { cn } from "@/lib/cn";

export default function Reminders({ className }: { className?: string }) {
  return (
    <Card className={cn("px-14 pt-15", className)}>
      <h2 className="pl-4 text-18 font-medium">Reminder</h2>
      <ul className="mt-16 flex flex-col gap-12">
        {reminders.map((reminder, index) => (
          <li
            key={reminder.title}
            className={cn(
              "flex flex-col gap-7 rounded-10 px-10 py-9",
              index === 0 && "bg-cream",
              reminder.avatars && "h-81",
            )}
          >
            <div className="max-w-234">
              <p className="text-14 font-medium">{reminder.title}</p>
              <p className="text-12 text-muted">{reminder.description}</p>
            </div>
            {reminder.avatars && <AvatarStack avatars={reminder.avatars} extra={reminder.extra} size={20} small />}
          </li>
        ))}
      </ul>
    </Card>
  );
}
