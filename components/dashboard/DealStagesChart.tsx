import Card from "@/components/ui/Card";
import { dealsByStage, developments } from "@/data/dashboard";
import { cn } from "@/lib/cn";
import AxisTitle from "./AxisTitle";
import ChartLegend from "./ChartLegend";

const TICKS = [10, 7.5, 5, 2.5, 0];
const MAX = TICKS[0];
// Tallest series first, so the shorter ones are drawn on top of it.
const SERIES = [...developments].reverse();

/** Offsets (px) measured from the design. The defaults are Home's; the Dashboards frame places things differently. */
const HOME_LAYOUT = {
  top: 23,
  left: 48,
  /** Space between the plot's left edge and the first bar. */
  barsLeft: 21,
  /** How far the bars' bottom sits below the last grid line. */
  barsDrop: 0,
  /** Distance of the tick numbers left of the plot. */
  tickLeft: 20,
  /** Distance of the "Record Count" title left of the plot, and how far it sits below the plot's middle. */
  titleLeft: 50,
  titleShift: 0,
  labelAngle: 45,
  labelShift: 0,
  stageGap: 68,
  stageShift: 0,
};

type DealStagesChartProps = {
  plotWidth?: number;
  plotHeight?: number;
  layout?: Partial<typeof HOME_LAYOUT>;
  menu?: boolean;
  className?: string;
};

export default function DealStagesChart({ plotWidth = 392, plotHeight = 148, layout, menu, className }: DealStagesChartProps) {
  const l = { ...HOME_LAYOUT, ...layout };
  return (
    <Card title="Deals by Stages by Development" menu={menu} className={cn("overflow-x-auto px-20 pt-13", className)}>
      <div className="relative shrink-0" style={{ width: plotWidth, height: plotHeight, marginTop: l.top, marginLeft: l.left }}>
        <AxisTitle vertical className="absolute -translate-y-1/2" style={{ left: -l.titleLeft, top: `calc(50% + ${l.titleShift}px)` }}>
          Record Count
        </AxisTitle>

        {TICKS.map((tick, index) => (
          <div
            key={tick}
            className="absolute inset-x-0 h-1 bg-grid"
            style={{ top: (index / (TICKS.length - 1)) * plotHeight }}
          >
            <span className="absolute -translate-y-1/2 text-12 leading-18 font-medium text-muted" style={{ left: -l.tickLeft }}>
              {tick}
            </span>
          </div>
        ))}

        <ul className="absolute flex h-full items-end gap-30" style={{ left: l.barsLeft, bottom: -l.barsDrop }}>
          {dealsByStage.map((row) => (
            <li key={row.stage} className="relative h-full w-32">
              {SERIES.map((series) => (
                <span
                  key={series.key}
                  className="absolute inset-x-0 bottom-0 rounded-t-6"
                  style={{ height: `${(row[series.key] / MAX) * 100}%`, background: series.color }}
                />
              ))}
              <span
                className="absolute top-full right-1/2 origin-top-right text-10 whitespace-nowrap text-muted"
                style={{ transform: `translateX(${l.labelShift}px) rotate(-${l.labelAngle}deg)` }}
              >
                {row.stage}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center" style={{ width: plotWidth, marginTop: l.stageGap, marginLeft: l.left, transform: `translateX(${l.stageShift}px)` }}>
        <AxisTitle>Stage</AxisTitle>
      </div>
      <ChartLegend className="mt-13" />
    </Card>
  );
}
