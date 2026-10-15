import Image from "next/image";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import type { Stat } from "@/data/dashboard";

export default function StatCard({ title, value, change, icon }: Stat) {
  const rising = change >= 0;

  return (
    <Card className="flex h-100 flex-col gap-13 px-13 py-10">
      <div className="flex items-center gap-20">
        <Image src={icon} alt="" width={38} height={38} />
        <h2 className="text-18 font-medium">{title}</h2>
      </div>
      <div className="flex items-center gap-17">
        <p className="text-24 font-semibold">{value}</p>
        <Pill tone={rising ? "success" : "danger"}>
          {rising ? "+" : ""}
          {change}%
          <Image
            src={rising ? "/icons/trend-up.svg" : "/icons/trend-down.svg"}
            alt=""
            width={8}
            height={8}
            className="m-2"
          />
        </Pill>
      </div>
    </Card>
  );
}
