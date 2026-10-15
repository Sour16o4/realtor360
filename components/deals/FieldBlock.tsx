import type { Field } from "@/data/offerForms";
import { cn } from "@/lib/cn";

type FieldBlockProps = {
  title?: string;
  fields: Field[];
  /** Right blocks hug the right edge: labels and values are right-aligned in two columns. */
  align?: "left" | "right";
  /** Left blocks: width (px) of the label column, so every value starts at the same x. */
  labelWidth?: number;
  /** Right blocks: distance (px) from the block's right edge to the labels' right edge, so labels line up whatever the value widths. */
  labelEdge?: number;
  /** Space (px) between rows. */
  rowGap?: number;
  /** Position inside the document (absolute), e.g. "top-111 left-55". */
  className: string;
};

/** A title with its label/value rows, as drawn in the Offer Form and Deal Sheet. The fields are plain text, not inputs, in the design. */
export default function FieldBlock({ title, fields, align = "left", labelWidth, labelEdge, rowGap = 15, className }: FieldBlockProps) {
  const right = align === "right";
  return (
    <section className={cn("absolute", right && "flex flex-col items-end", className)}>
      {title && <h2 className="mb-15 text-20 leading-24 font-semibold text-ink">{title}</h2>}
      <dl
        className="grid auto-rows-[22px] items-center text-18"
        style={{ gridTemplateColumns: right ? `auto ${labelEdge}px` : `${labelWidth}px auto`, rowGap }}
      >
        {fields.map(([label, value, nudge = 0]) => (
          <div key={label} className="contents">
            <dt className={cn("font-semibold whitespace-nowrap text-subtle", right && "text-right")} style={right ? { translate: `${nudge}px` } : undefined}>
              {label}
            </dt>
            <dd className={cn("whitespace-nowrap text-black", right && "text-right")} style={right ? undefined : { marginLeft: nudge }}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
