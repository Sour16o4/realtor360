import Card from "@/components/ui/Card";
import { dealsBySalesPerson, developments, type SalesPersonDeals } from "@/data/dashboard";
import { cn } from "@/lib/cn";
import AxisTitle from "./AxisTitle";
import ChartLegend from "./ChartLegend";

const TICKS = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];
const MAX = TICKS[TICKS.length - 1];
/** The design's tick labels are placed by hand and are not evenly spaced: px each label sits left of / right of its gridline. */
const LABEL_SHIFT = [1, -2, -4.5, -7.5, -8.5, -5.5, -3, 0, 2.5];
const SERIES = [...developments].reverse();

/** Offsets (px) measured from the design. The defaults are Home's; the Dashboards frame places things differently. */
const HOME_LAYOUT = { top: 13, left: 26, titleLeft: 30, titleShift: 0, tickTop: 5.5, recordTop: 22, recordShift: 0, legendTop: 11, menuTop: 13 };

type SalesPeopleChartProps = {
  rows?: SalesPersonDeals[];
  plotHeight?: number;
  /** Fixed plot width; without it the plot fills the card. */
  plotWidth?: number;
  layout?: Partial<typeof HOME_LAYOUT>;
  menu?: boolean;
  className?: string;
};

export default function SalesPeopleChart({ rows = dealsBySalesPerson, plotHeight = 74, plotWidth, layout, menu, className }: SalesPeopleChartProps) {
  const l = { ...HOME_LAYOUT, ...layout };
  const width = plotWidth ? { width: plotWidth } : { marginRight: 17 };
  return (
    <Card title="Deals by Sales People by Development" menu={menu} menuTop={l.menuTop} className={cn("px-22 pt-13", className)}>
      <div className="relative" style={{ height: plotHeight, marginTop: l.top, marginLeft: l.left, ...width }}>
        <AxisTitle vertical className="absolute -translate-y-1/2" style={{ left: -l.titleLeft, top: `calc(50% + ${l.titleShift}px)` }}>
          Deal Owner
        </AxisTitle>

        {TICKS.map((tick, index) => (
          <span
            key={tick}
            className="absolute top-0 h-full w-1 bg-grid"
            style={{ left: `${(tick / MAX) * 100}%` }}
          >
            <span
              className="absolute top-full -translate-x-1/2 text-12 leading-18 font-medium text-muted"
              style={{ marginLeft: LABEL_SHIFT[index], marginTop: l.tickTop }}
            >
              {tick}
            </span>
          </span>
        ))}

        <ul className="absolute inset-x-1 top-3 flex flex-col gap-9">
          {rows.map((row) => (
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

      <div className="text-center" style={{ marginTop: l.recordTop, marginLeft: l.left, transform: `translateX(${l.recordShift}px)`, ...width }}>
        <AxisTitle>Record Count</AxisTitle>
      </div>
      <ChartLegend style={{ marginTop: l.legendTop }} />
    </Card>
  );
}
