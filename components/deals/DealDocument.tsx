import Image from "next/image";
import Link from "next/link";
import { HeaderButton } from "@/components/detail/RecordHeader";
import PrintButton from "@/components/ui/PrintButton";

type DealDocumentProps = {
  dealId: string;
  /** "Offer Form" or "Deal Sheet". */
  title: string;
  /** Distance (px) of the gold title from the top of the sheet; the two frames differ by 5px. */
  titleTop: number;
  /** The sheet's content, positioned absolutely inside it. */
  children: React.ReactNode;
};

/** Page shell shared by the Offer Form and the Deal Sheet: back button, header buttons and the white 1234x932 sheet. */
export default function DealDocument({ dealId, title, titleTop, children }: DealDocumentProps) {
  return (
    <main className="pt-20 pb-64">
      <div className="flex pr-31 pl-26">
        <Link href={`/deals/${dealId}`} aria-label="Back" className="shrink-0">
          <Image src="/icons/back.svg" alt="" width={38} height={38} />
        </Link>
        {/* The Deal Sheet frame is titled "Offer Form" too. */}
        <h1 className="ml-32 self-center text-20 font-semibold text-black">Offer Form</h1>
        <div className="mt-7 ml-auto flex items-start gap-15">
          <PrintButton>Export PDF</PrintButton>
          <HeaderButton wide className="opacity-80">Save Draft</HeaderButton>
        </div>
      </div>

      <div className="mt-25 overflow-x-auto">
        <div className="relative mx-auto h-932 w-1234 bg-white">
          <Image src="/icons/logo.svg" alt="Realtor360" width={139} height={28} className="absolute top-31 left-55" />
          <h2 className="absolute inset-x-0 text-center text-[40px] font-semibold text-gold" style={{ top: titleTop }}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </main>
  );
}
