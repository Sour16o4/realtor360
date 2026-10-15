import Image from "next/image";
import Link from "next/link";
import ListPage from "@/components/list/ListPage";
import { leadFilters, leads } from "@/data/leads";

export default function LeadsPage() {
  return (
    <ListPage title="Leads" createLabel="Create Lead" filters={leadFilters} filterSearch="Search by Lead Name" search="Search Lead" tightFilters>
      {/* The lead rows span the whole main area, so cancel the page's content padding. */}
      <div className="-mx-16 -mt-20 lg:-mr-25 lg:-ml-38">
        {leads.map((lead) => (
          <div key={lead.id} className="relative h-136 border-b border-black/12 pt-21 pl-16 hover:bg-white/60 lg:pl-38">
            <div className="flex gap-24">
              <Image src={lead.photo} alt="" width={82} height={82} className="shrink-0 rounded-full object-cover" style={{ width: 82, height: 82 }} />
              <div>
                {/* The link covers the whole row; the remove button sits above it. */}
                <Link href={`/leads/${lead.id}`} className="block text-16 font-semibold after:absolute after:inset-0">
                  {lead.name}
                </Link>
                <p className="mt-5 text-14 text-subtle">
                  <span className="font-medium">Email:</span> {lead.email}
                </p>
                <div className="mt-15 flex items-center gap-7 text-14 text-subtle">
                  {lead.details.map(([label, value], index) => (
                    <div key={label} className="flex items-center gap-7">
                      {index > 0 && <span className="text-20 opacity-70">|</span>}
                      <div className="flex flex-col gap-2">
                        <span className="opacity-70">{label}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button type="button" aria-label="Remove lead" className="absolute top-21 right-16 z-10 lg:right-25">
              <Image src="/icons/remove.svg" alt="" width={28} height={28} />
            </button>
          </div>
        ))}
      </div>
    </ListPage>
  );
}
