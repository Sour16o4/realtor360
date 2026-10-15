import { cn } from "@/lib/cn";
import { colorKey, unitStatuses, type StackingDevelopment, type StackingUnit } from "@/data/stackingPlan";

// Figma's inside 0.5px #777 stroke renders as a 1px #bbb line; an inset shadow draws it without moving the content.
const edge = "shadow-[inset_0_0_0_1px_rgb(119_119_119/0.5)]";

/**
 * One unit. Its hover variant (the status name centered on the status color, without the border) is a covering
 * layer shown with CSS only, like the prototype's hover → mouse-leave change. Available has no variant.
 */
function UnitCell({ status, unit, type, area, buyer, price }: StackingUnit) {
  const { color, hoverLabel } = unitStatuses[status];
  return (
    <div className={cn("group relative flex h-110 w-173 shrink-0 flex-col gap-8 px-13 py-9 text-14 text-ink", edge)} style={{ backgroundColor: color }}>
      <div className="flex justify-between">
        <span>{unit}</span>
        <span>{type}</span>
      </div>
      <span>{area}</span>
      <span>{buyer}</span>
      {/* The design's price text starts with a space. */}
      <span className="whitespace-pre">{` ${price}`}</span>
      {hoverLabel && (
        <span
          className="absolute inset-0 hidden items-center justify-center text-18 font-semibold group-hover:flex"
          style={{ backgroundColor: color }}
        >
          {hoverLabel}
        </span>
      )}
    </div>
  );
}

const SEPARATOR = "mx-28 border-t border-subtle";

/** The report: one white card per development with its floors, then the Color Key. */
export default function StackingPlan({ developments }: { developments: StackingDevelopment[] }) {
  return (
    <div className="mt-25 pb-39">
      {developments.map((development, index) => (
        <div key={index}>
          <section className="flex flex-col gap-25 bg-white p-20">
            <h2 className="pl-6 text-18 leading-22 font-semibold">{`${index + 1}. Development Name: ${development.name}`}</h2>
            <div className="flex flex-col gap-6">
              {development.floors.map((floor) => (
                <div key={floor.label} className="flex gap-6">
                  <div className={cn("flex h-110 w-80 shrink-0 items-center justify-center bg-[#dbdbdb] text-14 font-medium", edge)}>
                    <span className="max-w-50">{floor.label}</span>
                  </div>
                  {floor.units.map((unit, unitIndex) => (
                    <UnitCell key={unitIndex} {...unit} />
                  ))}
                </div>
              ))}
            </div>
          </section>
          {/* The design spaces its dividers differently: 31/35px after the first card, 27/35px after the second. */}
          {index < developments.length - 1 && (
            <hr className={cn(SEPARATOR, "mb-35 border-subtle/40", index === 0 ? "mt-31" : "mt-27")} />
          )}
        </div>
      ))}

      <hr className={cn(SEPARATOR, "mt-51 border-subtle/80")} />
      <section className="mt-23 px-28">
        <h2 className="text-18 leading-22 font-semibold">Color Key</h2>
        <ul className="mt-12 grid grid-cols-[auto_auto_auto] justify-start gap-x-50 gap-y-12 text-14 font-medium">
          {/* The design's Closed item has a 11px gap, the others 15px. */}
          {colorKey.map((status) => (
            <li key={status} className={cn("flex items-center", status === "closed" ? "gap-11" : "gap-15")}>
              <span className="size-50" style={{ backgroundColor: unitStatuses[status].color }} />
              {unitStatuses[status].label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
