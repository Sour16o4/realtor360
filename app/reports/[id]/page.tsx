import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderButton } from "@/components/detail/RecordHeader";
import { reports, reportTables } from "@/data/reports";

export function generateStaticParams() {
  return reports.map(({ id }) => ({ id }));
}

// Only the right and bottom edges are drawn, 0.5px wide like the design's cell strokes.
const line = "border-r-[0.5px] border-b-[0.5px] border-subtle last:border-r-0";
const cell = `${line} text-center text-14 whitespace-nowrap text-ink`;

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((r) => r.id === id);
  const table = reportTables[id];
  if (!report || !table) notFound();

  return (
    <main className="px-26 pt-20 pb-40 pr-25">
      <div className="flex flex-wrap items-end gap-y-10">
        <Link href="/reports" aria-label="Back" className="shrink-0 self-start">
          <Image src="/icons/back.svg" alt="" width={38} height={38} />
        </Link>
        <div className="ml-32 flex items-center gap-7 self-start pt-5">
          <h1 className="text-20 font-semibold text-black">{report.pageTitle ?? report.name}</h1>
          <Image src="/icons/caret-down-large.svg" alt="" width={27} height={27} />
        </div>
        <div className="mr-9 ml-auto flex gap-10">
          <HeaderButton variant="gold">Send Email</HeaderButton>
          <HeaderButton wide className="opacity-80">Edit</HeaderButton>
          <HeaderButton wide href={`/reports/${id}/create-chart`} className="opacity-80">Create Chart</HeaderButton>
        </div>
      </div>

      <div className="mt-25 min-h-505 overflow-x-auto rounded-10 bg-white pb-36">
        <table className="w-full min-w-1389 table-fixed border-separate border-spacing-0">
          <colgroup>
            {table.columns.map(({ header, width }) => (
              <col key={header} style={{ width }} />
            ))}
          </colgroup>
          <thead className="bg-[#ddd]">
            <tr className="h-58">
              {table.columns.map(({ header }) => (
                <th key={header} className={`${line} px-26 text-16 font-semibold text-ink`}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="h-61">
                {row.map((value, col) =>
                  table.columns[col].breakAll ? (
                    <td key={col} className={`${line} px-19 text-14 break-all text-ink`}>{value}</td>
                  ) : (
                    <td key={col} className={`${cell} ${col === 0 ? "text-black" : ""}`}>{value}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-25 pl-26 text-16 font-semibold">
          <span className="text-subtle">Total Records in this Page:</span> {table.rows.length} Records
        </p>
      </div>
    </main>
  );
}
