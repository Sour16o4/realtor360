import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import { leadContacts } from "@/data/dashboard";
import { cn } from "@/lib/cn";

export default function LeadsContacts({ className }: { className?: string }) {
  return (
    <Card className={cn("pt-13 pr-13 pl-18", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-18 font-medium">Leads Contacts</h2>
        <Link href="/contacts" aria-label="Open contacts">
          <Image src="/icons/open.svg" alt="" width={24} height={24} />
        </Link>
      </div>

      <ul className="mt-11 flex flex-col gap-11">
        {leadContacts.map((lead) => (
          <li key={lead.name} className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <Avatar src={lead.avatar} alt="" size={35} />
              <div>
                <p className="text-14 font-medium">{lead.name}</p>
                <p className="text-10 text-muted">{lead.location}</p>
              </div>
            </div>
            <button type="button" aria-label={`Call ${lead.name}`}>
              <Image src="/icons/call.svg" alt="" width={30} height={30} />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
