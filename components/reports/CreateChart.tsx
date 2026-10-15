"use client";

import Image from "next/image";
import { useState } from "react";
import DealStagesChart from "@/components/dashboard/DealStagesChart";
import LeadSourceChart from "@/components/dashboard/LeadSourceChart";
import { chartTypes, createChartCallouts, type ChartTypeId } from "@/data/reports";
import { cn } from "@/lib/cn";

// Figma's inside 0.5px #777 stroke renders as a 1px #bbb line. An inset shadow draws that without moving the content (a border would).
const edge = "shadow-[inset_0_0_0_1px_rgb(119_119_119/0.5)]";
const field = `h-36 w-135 rounded-5 bg-white px-12 text-12 font-medium text-ink placeholder:text-grid ${edge}`;

/** The design lays the rotated stage labels out in a row, so they sit a few px off their bars (Contracts Signed the most). */
const STAGE_LABEL_SHIFTS = [-7.5, -10.3, -9.2, 1, -5.6, -4.5];

/** Chart-type tiles, axis fields and the preview. Only one tile is selected at a time. */
export default function CreateChart() {
  const [selected, setSelected] = useState<ChartTypeId | null>(null);

  return (
    <div className="mt-25">
      <div className="relative z-10 grid h-125 grid-cols-7">
        {chartTypes.map(({ id, label, icon }, index) => {
          const active = id === selected;
          return (
            <div key={id} className="relative" style={active ? { filter: "drop-shadow(0 4px 4px rgb(0 0 0 / 0.25))" } : undefined}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(id)}
                className={cn(
                  "flex size-full flex-col items-center justify-center gap-15 bg-white",
                  edge,
                  index === 0 && "rounded-tl-10",
                  index === chartTypes.length - 1 && "rounded-tr-10",
                  !active && "opacity-40",
                )}
              >
                <span
                  aria-hidden
                  className={cn("size-40", active ? "bg-gold" : "bg-grid")}
                  style={{ mask: `url(${icon}) center / contain no-repeat` }}
                />
                <span className="text-14 font-semibold text-ink">{label}</span>
              </button>
              {active && (
                <Image src="/icons/chart-pointer.svg" alt="" width={73} height={25} className="absolute top-124 left-1/2 max-w-none -translate-x-1/2" />
              )}
            </div>
          );
        })}
      </div>

      <section className={cn("relative bg-white", edge, selected ? "-mt-1 h-194" : "h-173")}>
        <h2 className={cn("absolute left-97 text-18 font-semibold text-ink", selected ? "top-63" : "top-51")}>Axis Values</h2>
        <div className={cn("absolute left-97 flex gap-15", selected ? "top-106" : "top-86")}>
          <input type="text" aria-label="X axis value" placeholder="Type X- axis value" className={field} />
          <input type="text" aria-label="Y axis value" placeholder="Type Y- axis value" className={field} />
        </div>

        <div className={cn("absolute right-139 w-227", selected ? "top-63" : "top-51")}>
          <h2 className="text-18 font-semibold text-ink">Add as Dashboard Widget</h2>
          {/* No prototype link on this button, so it does nothing; it only looks enabled once a type is chosen. */}
          <button
            type="button"
            disabled={!selected}
            className={cn(selected ? "mt-21" : "mt-13", "flex h-36 items-center gap-4 rounded-5 bg-gold px-8 text-16 font-medium text-white", !selected && "opacity-40")}
          >
            <Image src="/icons/add.svg" alt="" width={13} height={13} />
            Add to Dashboard
          </button>
        </div>
      </section>

      {(selected === "vertical-bar" || selected === "donut") && (
        <section className={`relative h-357 overflow-hidden rounded-b-10 bg-white ${edge}`}>
          <h2 className="absolute top-34 left-49 text-18 font-semibold text-ink">Lead by Source</h2>
          {selected === "vertical-bar" ? (
            <DealStagesChart
              plain
              plotWidth={392}
              plotHeight={148}
              layout={{ top: 46, left: 502, labelAngle: 40, labelSize: 12, labelDrop: -1, stageGap: 81, titleShift: -2, stageShift: 3 }}
              labelShifts={STAGE_LABEL_SHIFTS}
              className="absolute inset-x-0 top-0"
            />
          ) : (
            <LeadSourceChart plain size={230} left={556} callouts={createChartCallouts} className="absolute inset-x-0 top-18" />
          )}
        </section>
      )}
    </div>
  );
}
