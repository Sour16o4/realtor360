import Image from "next/image";
import Card from "@/components/ui/Card";
import { leadSources } from "@/data/dashboard";
import { cn } from "@/lib/cn";

/** Angle (clockwise from 12 o'clock) where the first slice starts in the design. */
const START_ANGLE = 121.5;
/** The hole is 40% of the donut's diameter. */
const INNER_RATIO = 0.4;
/** Size the label positions below were measured at. */
const BASE_SIZE = 230;

/** Where each slice's callout sits, relative to the donut's top-left corner at BASE_SIZE. */
const CALLOUTS: Record<string, { label: [number, number]; arrow: [number, number, number, number]; icon: string }> = {
  "Inbound Call": { label: [245, 35], arrow: [188, 24, 50, 19], icon: "/icons/callout-top-right.svg" },
  Reference: { label: [269, 175], arrow: [174, 198, 84, 17], icon: "/icons/callout-bottom-right.svg" },
  Website: { label: [-84, 66], arrow: [-32, 40, 66, 23], icon: "/icons/callout-top-left.svg" },
  Facebook: { label: [-91, 173], arrow: [-33, 167, 61, 39], icon: "/icons/callout-bottom-left.svg" },
};

function donutBackground() {
  let total = 0;
  const stops = leadSources.map(({ percent, color }) => {
    const start = total;
    total += percent;
    return `${color} ${start}% ${total}%`;
  });
  return `conic-gradient(from ${START_ANGLE}deg, ${stops.join(", ")})`;
}

type LeadSourceChartProps = {
  size?: number;
  className?: string;
};

export default function LeadSourceChart({ size = BASE_SIZE, className }: LeadSourceChartProps) {
  const scale = size / BASE_SIZE;
  const hole = (size * INNER_RATIO) / 2;

  return (
    <Card title="Deals by Lead Source" className={cn("relative px-22 pt-13", className)}>
      <div className="relative mx-auto mt-32" style={{ width: size, height: size }}>
        <div
          className="size-full rounded-full"
          role="img"
          aria-label={leadSources.map((s) => `${s.label} ${s.percent}%`).join(", ")}
          style={{
            background: donutBackground(),
            mask: `radial-gradient(circle, transparent ${hole}px, black ${hole + 0.5}px)`,
          }}
        />

        {leadSources.map(({ label, count, percent }) => {
          const callout = CALLOUTS[label];
          const [left, top, width, height] = callout.arrow.map((value) => value * scale);
          return (
            <div key={label}>
              <Image
                src={callout.icon}
                alt=""
                width={width}
                height={height}
                className="absolute max-w-none"
                style={{ left, top, width, height }}
              />
              <p
                className="absolute text-center text-10 whitespace-nowrap text-muted"
                style={{ left: callout.label[0] * scale, top: callout.label[1] * scale }}
              >
                {label}
                <br />
                {count} ({percent}%)
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
