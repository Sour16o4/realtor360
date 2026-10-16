import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CreateChart from "@/components/reports/CreateChart";
import { reports } from "@/data/reports";

export function generateStaticParams() {
  return reports.map(({ id }) => ({ id }));
}

export default async function CreateChartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!reports.some((r) => r.id === id)) notFound();

  return (
    <main className="overflow-x-auto px-26 pt-20 pr-28 pb-40">
      <div className="flex items-center gap-32">
        <Link href={`/reports/${id}`} aria-label="Back" className="shrink-0">
          <Image src="/icons/back.svg" alt="" width={38} height={38} />
        </Link>
        <h1 className="text-20 font-semibold text-black">Create Chart</h1>
      </div>
      <CreateChart />
    </main>
  );
}
