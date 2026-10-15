import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type RecordHeaderProps = {
  /** The list page the round back button returns to. */
  backHref: string;
  image?: string;
  /** Usually a <HeaderText>; the buttons on the right go in `actions`. */
  children: React.ReactNode;
  actions?: React.ReactNode;
  /** Space under the buttons; the design uses a different value on some pages. */
  actionsClassName?: string;
};

/** Top of a detail page: back button, optional photo, title block and action buttons, with a divider below. */
export default function RecordHeader({
  backHref,
  image,
  children,
  actions,
  actionsClassName = "mb-13",
}: RecordHeaderProps) {
  return (
    <header className="flex items-stretch border-b border-black/25 py-20 pr-25 pl-14">
      <Link href={backHref} aria-label="Back" className="shrink-0">
        <Image src="/icons/back.svg" alt="" width={38} height={38} />
      </Link>
      {image && (
        <Image src={image} alt="" width={155} height={115} className="ml-32 h-115 w-155 shrink-0 rounded-10 object-cover" />
      )}
      <div className={cn("min-w-0", image ? "ml-18 pt-12" : "ml-32")}>{children}</div>
      {actions && <div className={cn("ml-auto flex items-end gap-10 self-end pl-16", actionsClassName)}>{actions}</div>}
    </header>
  );
}

type HeaderTextProps = {
  title: string;
  titleClassName?: string;
  /** Lines under the title, e.g. [["Email", "a@b.com"]]; the label is medium weight, both at 60% opacity. */
  lines?: Array<[label: string, value: React.ReactNode]>;
  /** Space between title and lines. */
  linesClassName?: string;
  /** Anything below the lines, e.g. a status badge. */
  children?: React.ReactNode;
};

export function HeaderText({ title, titleClassName = "text-22", lines = [], linesClassName = "mt-11", children }: HeaderTextProps) {
  return (
    <>
      <h1 className={cn("font-semibold text-black", titleClassName)}>{title}</h1>
      <div className={cn("flex flex-col gap-8 text-16 text-subtle opacity-60", linesClassName)}>
        {lines.map(([label, value]) => (
          <p key={label}>
            <span className="font-medium">{label}:</span> {value}
          </p>
        ))}
      </div>
      {children}
    </>
  );
}

type HeaderButtonProps = {
  variant?: "gold" | "light";
  /** Adds the small dropdown arrow. */
  dropdown?: boolean;
  children: React.ReactNode;
};

export function HeaderButton({ variant = "light", dropdown = false, children }: HeaderButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-31 items-center gap-3 rounded-5 px-8 text-14",
        variant === "gold" ? "bg-gold font-medium text-white" : "bg-cream",
      )}
    >
      {children}
      {dropdown && <Image src="/icons/arrow-drop-down.svg" alt="" width={16} height={16} />}
    </button>
  );
}
