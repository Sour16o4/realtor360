"use client";

import Image from "next/image";
import { useState } from "react";
import { calendar, type EventType } from "@/data/dashboard";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const EVENT_UNDERLINE: Record<EventType, string> = {
  visit: "underline decoration-event-visit decoration-2 underline-offset-3",
  "follow-up": "underline decoration-event-follow-up decoration-2 underline-offset-3",
  offer: "underline decoration-event-offer decoration-2 underline-offset-3",
};

type Day = { year: number; month: number; day: number };

const sameDay = (a: Day, b: Day) => a.year === b.year && a.month === b.month && a.day === b.day;

export default function Calendar() {
  const [view, setView] = useState({ year: calendar.year, month: calendar.month });
  const [selected, setSelected] = useState<Day>({ ...view, day: calendar.selectedDay });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const showsEvents = view.year === calendar.year && view.month === calendar.month;
  const title = new Date(view.year, view.month).toLocaleString("en-US", { month: "long", year: "numeric" });

  const changeMonth = (step: number) => {
    const date = new Date(view.year, view.month + step);
    setView({ year: date.getFullYear(), month: date.getMonth() });
  };

  return (
    <div>
      <div className="flex items-center justify-between pt-17 pl-5">
        <h2 className="text-30 font-medium">{title}</h2>
        <div className="flex gap-16">
          <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
            <Image src="/icons/chevron-left.svg" alt="" width={35} height={35} />
          </button>
          <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
            <Image src="/icons/chevron-right.svg" alt="" width={35} height={35} />
          </button>
        </div>
      </div>

      <div className="mt-37 grid grid-cols-[repeat(7,15px)] justify-between gap-y-12 text-center text-12">
        {WEEKDAYS.map((weekday, index) => (
          <span key={index} className="text-black">
            {weekday}
          </span>
        ))}
        {Array.from({ length: firstWeekday }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = { ...view, day: index + 1 };
          const event = showsEvents ? calendar.eventDays[day.day] : undefined;
          return (
            <button
              key={day.day}
              type="button"
              onClick={() => setSelected(day)}
              className={cn(
                "size-15 rounded-3 text-day",
                sameDay(day, selected) && "bg-gold",
                event && EVENT_UNDERLINE[event],
              )}
            >
              {day.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
