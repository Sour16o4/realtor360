import Card from "@/components/ui/Card";
import { pipeline } from "@/data/dashboard";
import { cn } from "@/lib/cn";

export default function PipelineTable({ padRight = 26, menu, className }: { padRight?: number; menu?: boolean; className?: string }) {
  return (
    <Card title="Deals in Pipeline by Development" menu={menu} className={cn("pt-13 pl-22", className)} style={{ paddingRight: padRight }}>
      <table className="mt-23 w-full text-14">
        <thead>
          <tr className="bg-page font-medium">
            <th className="h-33 rounded-l-5 pl-10 text-left font-medium">Development Name</th>
            <th className="h-33 rounded-r-5 pr-10 text-right font-medium">Record Count</th>
          </tr>
        </thead>
        <tbody className="[&_tr:first-child_td]:pt-14">
          {pipeline.map((row) => (
            <tr key={row.development}>
              <td className="pt-20 pl-10">{row.development}</td>
              <td className="pt-20 pr-10 text-right">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
