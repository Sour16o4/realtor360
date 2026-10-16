import DealsClosedCard from "@/components/dashboard/DealsClosedCard";
import DealStagesChart from "@/components/dashboard/DealStagesChart";
import LeadSourceChart from "@/components/dashboard/LeadSourceChart";
import PipelineTable from "@/components/dashboard/PipelineTable";
import SalesPeopleChart from "@/components/dashboard/SalesPeopleChart";
import { dashboardCallouts, dashboardDealsClosed, dashboardSalesPeople } from "@/data/dashboards";

// The charts are the Home ones at the sizes of the Dashboards frame; the cards have no links in the prototype.
export default function DashboardsPage() {
  return (
    <main className="mx-auto grid max-w-1440 grid-cols-1 gap-40 px-16 pt-31 pb-40 xl:grid-cols-2 xl:px-43">
      <div className="flex flex-col gap-40">
        <LeadSourceChart menu size={311} left={143} callouts={dashboardCallouts} className="h-410" />
        <SalesPeopleChart
          menu
          rows={dashboardSalesPeople}
          plotWidth={448}
          plotHeight={90}
          layout={{ top: 6, left: 16, titleLeft: 37, titleShift: 2.5, tickTop: 8, recordTop: 29, recordShift: 44, legendTop: 15, menuTop: 20 }}
          className="h-224"
        />
        <DealsClosedCard menu stats={dashboardDealsClosed} barHeight={48} figuresGap={10} padRight={19} className="h-147" />
      </div>
      <div className="flex flex-col gap-40">
        <DealStagesChart
          menu
          plotWidth={490}
          plotHeight={148}
          layout={{ top: 26, left: 56, barsLeft: 29, barsDrop: 57, tickLeft: 28, titleLeft: 58, titleShift: 34, labelAngle: 40, labelShift: -10, stageGap: 129, stageShift: 8 }}
          className="h-410"
        />
        <PipelineTable padRight={23} className="h-410" />
      </div>
    </main>
  );
}
