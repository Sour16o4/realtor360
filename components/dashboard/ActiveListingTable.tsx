import Image from "next/image";
import AvatarStack from "@/components/ui/AvatarStack";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import { listings } from "@/data/dashboard";
import { cn } from "@/lib/cn";

const COLUMNS = ["Property", "Type", "Units", "Price", "Active Leads", "Views", "Status"];
/** Column widths from the design (774px wide table), as percentages so the table can shrink. */
const WIDTHS = [138, 98, 97, 100, 153, 77, 111].map((px) => `${(px / 774) * 100}%`);

export default function ActiveListingTable({ className }: { className?: string }) {
  return (
    <Card title="Active Listing" className={cn("overflow-x-auto pt-13 pr-14 pl-22", className)}>
      <table className="mt-14 w-full min-w-640 table-fixed text-left text-14">
        <colgroup>
          {WIDTHS.map((width, index) => (
            <col key={index} style={{ width }} />
          ))}
        </colgroup>
        <thead>
          <tr className="bg-page">
            {COLUMNS.map((column, index) => (
              <th
                key={column}
                className={cn(
                  "h-33 font-medium",
                  index === 0 && "rounded-l-5 pl-10",
                  index === COLUMNS.length - 1 && "rounded-r-5",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_td]:pt-10 [&_tr:first-child_td]:pt-9">
          {listings.map((listing) => (
            <tr key={listing.name}>
              <td className="pl-10">
                <div className="flex items-center gap-5">
                  <Image
                    src={listing.image}
                    alt=""
                    width={30}
                    height={30}
                    className="size-30 rounded-8 bg-placeholder object-cover"
                  />
                  <span className="w-min text-12 font-medium">{listing.name}</span>
                </div>
              </td>
              <td>{listing.type}</td>
              <td>{listing.units}</td>
              <td>{listing.price}</td>
              <td>
                <AvatarStack avatars={listing.leadAvatars} extra={listing.extraLeads} size={30} />
              </td>
              <td>{listing.views}</td>
              <td>
                <Pill tone={listing.status.tone}>{listing.status.label}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
