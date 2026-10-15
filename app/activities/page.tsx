import Image from "next/image";
import Link from "next/link";
import ActivityCard from "@/components/activities/ActivityCard";
import FilterSidebar from "@/components/list/FilterSidebar";
import Pagination from "@/components/list/Pagination";
import { ACTIVITY_TABS, activitiesByTab, activityFilters, type ActivityTab } from "@/data/activities";
import { cn } from "@/lib/cn";
import { currentPage, reorder } from "@/lib/search";

const CREATE_BUTTONS = ["Add Task", "Add Call", "Add Meeting"];

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<{ tab?: string; page?: string }> }) {
  const { tab, page } = await searchParams;
  const current: ActivityTab = ACTIVITY_TABS.find((item) => item.id === tab)?.id ?? "customers";
  const activities = reorder(activitiesByTab[current], currentPage(page, 3));

  return (
    <div className="flex flex-col lg:min-h-[calc(100vh-65px)] lg:flex-row">
      <FilterSidebar groups={activityFilters} tight actionsGap={19} />

      <main className="flex min-w-0 flex-1 flex-col pb-34 lg:min-h-[calc(100vh-65px)] lg:self-start">
        <div className="flex flex-wrap items-center justify-between gap-10 px-16 pt-25 lg:pr-30 lg:pl-38">
          <h1 className="text-24 font-semibold">Activities</h1>
          <div className="flex gap-10">
            {CREATE_BUTTONS.map((label) => (
              <button key={label} type="button" className="flex h-31 items-center gap-8 rounded-5 bg-cream/80 px-10 text-14">
                <Image src="/icons/add-dark.svg" alt="" width={13} height={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
        <hr className="mt-23 border-black/12" />

        <div className="px-16 lg:pr-30 lg:pl-38">
          <nav aria-label="Activity tabs" className="mt-26 grid grid-cols-2 rounded-10 bg-white text-16 font-semibold sm:grid-cols-4">
            {ACTIVITY_TABS.map((item) => (
              <Link
                key={item.id}
                href={`/activities?tab=${item.id}`}
                aria-current={item.id === current ? "page" : undefined}
                className={cn("flex h-42 items-center justify-center rounded-10", item.id === current && "bg-[#ddd]")}
              >
                {item.label}
              </Link>
            ))}
            {/* The design has no screen or link for "Others", so it is only a pill. */}
            <span className="flex h-42 items-center justify-center rounded-10">Others</span>
          </nav>

          <div className="mt-30 flex flex-wrap gap-25 lg:pl-12">
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </div>

        <Pagination className="mt-auto self-center pt-26 lg:pr-150" />
      </main>
    </div>
  );
}
