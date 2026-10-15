import Card from "@/components/ui/Card";
import { dealsByStage, developments } from "@/data/dashboard";
import { cn } from "@/lib/cn";
import AxisTitle from "./AxisTitle";
import ChartLegend from "./ChartLegend";

const TICKS = [10, 7.5, 5, 2.5, 0];
const MAX = TICKS[0];
// Tallest series first, so the shorter ones are drawn on top of it.
const SERIES = [...developments].reverse();

type DealStagesChartProps = {
  plotWidth?: number;
  plotHeight?: number;
  className?: string;
};

export default function DealStagesChart({ plotWidth = 392, plotHeight = 148, className }: DealStagesChartProps) {
  return (
    <Card title="Deals by Stages by Development" className={cn("overflow-x-auto px-20 pt-13", className)}>
      <div className="relative mt-23 ml-48 shrink-0" style={{ width: plotWidth, height: plotHeight }}>
        <AxisTitle vertical className="absolute top-1/2 -left-50 -translate-y-1/2">
          Record Count
        </AxisTitle>

        {TICKS.map((tick, index) => (
          <div
            key={tick}
            className="absolute inset-x-0 h-1 bg-grid"
            style={{ top: (index / (TICKS.length - 1)) * plotHeight }}
          >
            <span className="absolute -left-20 -translate-y-1/2 text-12 leading-18 font-medium text-muted">
              {tick}
            </span>
          </div>
        ))}

        <ul className="absolute bottom-0 left-21 flex h-full items-end gap-30">
          {dealsByStage.map((row) => (
            <li key={row.stage} className="relative h-full w-32">
              {SERIES.map((series) => (
                <span
                  key={series.key}
                  className="absolute inset-x-0 bottom-0 rounded-t-6"
                  style={{ height: `${(row[series.key] / MAX) * 100}%`, background: series.color }}
                />
              ))}
              <span className="absolute top-full right-1/2 origin-top-right -rotate-45 text-10 whitespace-nowrap text-muted">
                {row.stage}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-68 ml-48 text-center" style={{ width: plotWidth }}>
        <AxisTitle>Stage</AxisTitle>
      </div>
      <ChartLegend className="mt-13" />
    </Card>
  );
}
