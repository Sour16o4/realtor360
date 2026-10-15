import ActiveListingTable from "@/components/dashboard/ActiveListingTable";
import Calendar from "@/components/dashboard/Calendar";
import DealStagesChart from "@/components/dashboard/DealStagesChart";
import DealsClosedCard from "@/components/dashboard/DealsClosedCard";
import LeadSourceChart from "@/components/dashboard/LeadSourceChart";
import LeadsContacts from "@/components/dashboard/LeadsContacts";
import PipelineTable from "@/components/dashboard/PipelineTable";
import Reminders from "@/components/dashboard/Reminders";
import SalesPeopleChart from "@/components/dashboard/SalesPeopleChart";
import Schedule from "@/components/dashboard/Schedule";
import StatCard from "@/components/dashboard/StatCard";
import Card from "@/components/ui/Card";
import { stats } from "@/data/dashboard";

export default function HomePage() {
  return (
    <main className="mx-auto grid max-w-1440 gap-10 px-16 py-20 xl:grid-cols-[1085fr_289fr] xl:gap-x-15 xl:pr-25 xl:pl-26">
      <div className="flex min-w-0 flex-col gap-10">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-15">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid gap-10 xl:grid-cols-2 xl:gap-x-15">
          <LeadSourceChart className="h-334" />
          <DealStagesChart className="h-334" />
        </div>

        <div className="grid gap-10 xl:grid-cols-2 xl:gap-x-15">
          <div className="flex flex-col gap-10">
            <SalesPeopleChart className="h-196" />
            <DealsClosedCard className="h-128" />
          </div>
          <PipelineTable className="h-334" />
        </div>

        <div className="grid gap-10 xl:grid-cols-[810fr_258fr] xl:gap-x-17">
          <ActiveListingTable className="h-279" />
          <LeadsContacts className="h-279" />
        </div>
      </div>

      <aside className="flex flex-col gap-10">
        <Reminders className="h-370" />
        <Card className="px-11 pb-13 xl:h-697">
          <Calendar />
          <hr className="-mx-11 mt-18 border-t-[0.5px] border-subtle" />
          <div className="mt-13">
            <Schedule />
          </div>
        </Card>
      </aside>
    </main>
  );
}
