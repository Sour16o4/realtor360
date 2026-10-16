import Image from "next/image";
import Link from "next/link";
import StackingPlan from "@/components/reports/StackingPlan";
import PrintButton from "@/components/ui/PrintButton";
import { stackingPlan } from "@/data/stackingPlan";

export default function StackingPlanPage() {
  return (
    <main className="px-26 pt-20 pr-25">
      <div className="flex items-center gap-32">
        <Link href="/reports" aria-label="Back" className="shrink-0 print:hidden">
          <Image src="/icons/back.svg" alt="" width={38} height={38} />
        </Link>
        <h1 className="text-20 font-semibold text-black">Stacking Plan Reports</h1>
        <div className="-mt-1 ml-auto self-start print:hidden">
          <PrintButton>Export</PrintButton>
        </div>
      </div>
      <StackingPlan developments={stackingPlan} />
    </main>
  );
}
