import Card from "@/components/ui/Card";
import { dealsBySalesPerson, developments } from "@/data/dashboard";
import { cn } from "@/lib/cn";
import AxisTitle from "./AxisTitle";
import ChartLegend from "./ChartLegend";

const TICKS = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];
const MAX = TICKS[TICKS.length - 1];
/** The design's tick labels are placed by hand and are not evenly spaced: px each label sits left of / right of its gridline. */
const LABEL_SHIFT = [1, -2, -4.5, -7.5, -8.5, -5.5, -3, 0, 2.5];
const SERIES = [...developments].reverse();

type SalesPeopleChartProps = {
  plotHeight?: number;
  className?: string;
};

export default function SalesPeopleChart({ plotHeight = 74, className }: SalesPeopleChartProps) {
  return (
    <Card title="Deals by Sales People by Development" className={cn("px-22 pt-13", className)}>
      <div className="relative mt-13 mr-17 ml-26" style={{ height: plotHeight }}>
        <AxisTitle vertical className="absolute top-1/2 -left-30 -translate-y-1/2">
          Deal Owner
        </AxisTitle>

        {TICKS.map((tick, index) => (
          <span
            key={tick}
            className="absolute top-0 h-full w-1 bg-grid"
            style={{ left: `${(tick / MAX) * 100}%` }}
          >
            <span
              className="absolute top-full mt-[5.5px] -translate-x-1/2 text-12 leading-18 font-medium text-muted"
              style={{ marginLeft: LABEL_SHIFT[index] }}
            >
              {tick}
            </span>
          </span>
        ))}

        <ul className="absolute inset-x-1 top-3 flex flex-col gap-9">
          {dealsBySalesPerson.map((row) => (
            <li key={row.owner} aria-label={row.owner} className="relative h-28">
              {SERIES.map((series) => (
                <span
                  key={series.key}
                  className="absolute inset-y-0 left-0 rounded-8"
                  style={{ width: `${(row[series.key] / MAX) * 100}%`, background: series.color }}
                />
              ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-22 mr-17 ml-26 text-center">
        <AxisTitle>Record Count</AxisTitle>
      </div>
      <ChartLegend className="mt-11" />
    </Card>
  );
}
