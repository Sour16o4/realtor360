import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type RecordHeaderProps = {
  /** The list page the round back button returns to. */
  backHref: string;
  image?: string;
  /** Photo size in px; the development page uses a larger one than the building page. */
  imageSize?: [width: number, height: number];
  /** Extra classes for the photo, e.g. a top margin. */
  imageClassName?: string;
  /** Round photo (the lead page) instead of rounded corners. */
  roundImage?: boolean;
  /** Space (px) between the back button and the photo. */
  imageGap?: number;
  /** Classes of the title block's wrapper (its distance from the top differs per page). */
  textClassName?: string;
  /** Usually a <HeaderText>; the buttons on the right go in `actions`. */
  children: React.ReactNode;
  actions?: React.ReactNode;
  /** Space under and between the buttons; the design uses different values on some pages. */
  actionsClassName?: string;
};

/** Top of a detail page: back button, optional photo, title block and action buttons, with a divider below. */
export default function RecordHeader({
  backHref,
  image,
  imageSize = [155, 115],
  imageClassName,
  roundImage = false,
  imageGap = 32,
  textClassName = image ? "pt-12" : "",
  children,
  actions,
  actionsClassName = "mb-13 gap-10",
}: RecordHeaderProps) {
  return (
    <header className="flex items-stretch border-b border-black/25 py-20 pr-25 pl-14">
      <Link href={backHref} aria-label="Back" className="shrink-0">
        <Image src="/icons/back.svg" alt="" width={38} height={38} />
      </Link>
      {image && (
        <Image
          src={image}
          alt=""
          width={imageSize[0]}
          height={imageSize[1]}
          className={cn("shrink-0 object-cover", roundImage ? "rounded-full" : "rounded-10", imageClassName)}
          style={{ width: imageSize[0], height: imageSize[1], marginLeft: imageGap }}
        />
      )}
      <div className={cn("min-w-0", image ? "ml-18" : "ml-32", textClassName)}>{children}</div>
      {actions && <div className={cn("ml-auto flex items-end self-end pl-16", actionsClassName)}>{actions}</div>}
    </header>
  );
}

type HeaderTextProps = {
  title: string;
  /** Shown right after the title, e.g. a dropdown arrow. */
  titleAdornment?: React.ReactNode;
  titleClassName?: string;
  /** Lines under the title, e.g. [["Email", "a@b.com"]]; the label is medium weight, both at 60% opacity. */
  lines?: Array<[label: string, value: React.ReactNode]>;
  /** Spacing, text size and opacity of the lines. */
  linesClassName?: string;
  /** Anything below the lines, e.g. a status badge. */
  children?: React.ReactNode;
};

export function HeaderText({
  title,
  titleAdornment,
  titleClassName = "text-22",
  lines = [],
  linesClassName = "mt-11 gap-8 text-16 opacity-60",
  children,
}: HeaderTextProps) {
  return (
    <>
      <div className="relative flex items-center gap-7">
        <h1 className={cn("font-semibold text-black", titleClassName)}>{title}</h1>
        {titleAdornment}
      </div>
      <div className={cn("flex flex-col text-subtle", linesClassName)}>
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
  /** Wider side padding (the "Edit" button on the building and contact pages). */
  wide?: boolean;
  /** Renders a link instead of a button. */
  href?: string;
  /** Only works when the button is rendered from a client component. */
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export function HeaderButton({ variant = "light", dropdown = false, wide = false, href, onClick, className, children }: HeaderButtonProps) {
  const classes = cn(
    "flex h-31 items-center gap-3 rounded-5 text-14",
    wide ? "px-18" : "px-8",
    variant === "gold" ? "bg-gold font-medium text-white" : "bg-cream",
    className,
  );
  const content = (
    <>
      {children}
      {dropdown && <Image src="/icons/arrow-drop-down.svg" alt="" width={16} height={16} />}
    </>
  );
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
