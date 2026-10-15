import { Fragment } from "react";

/** `gapBefore` replaces the usual space above this row where the design differs. */
type Field = [label: string, value: React.ReactNode, gapBefore?: number];

type FieldListProps = {
  /** One or two columns of fields. */
  columns: Field[][];
  /** Space between the right-aligned labels and the values (35 or 61 in the design); one number per column if they differ. */
  gap?: number | number[];
  /** Distance of the first column from the section's title area. */
  offset?: number;
  /** Extra space before the second column (may be negative). */
  columnGap?: number;
  /** Fixed width (px) per column, as in the design, so the next column starts at the same x whatever the values are; longer values wrap. */
  widths?: number[];
  /** Vertical space between rows (px). */
  rowGap?: number;
};

/** Right-aligned labels (18/600 grey) with their values (18/400 black) next to them. */
export default function FieldList({ columns, gap = 35, offset = 0, columnGap = 0, widths, rowGap = 27 }: FieldListProps) {
  return (
    <div className="flex items-start" style={{ marginLeft: offset }}>
      {columns.map((fields, index) => (
        <dl
          key={index}
          className={`grid items-center text-18 leading-22 ${widths?.[index] ? "shrink-0 grid-cols-[auto_minmax(0,1fr)] break-words" : "grid-cols-[auto_auto] whitespace-nowrap"}`}
          style={{ width: widths?.[index], columnGap: Array.isArray(gap) ? gap[index] : gap, rowGap, marginLeft: index > 0 ? columnGap : 0 }}
        >
          {fields.map(([label, value, gapBefore]) => {
            const style = gapBefore === undefined ? undefined : { marginTop: gapBefore - rowGap };
            return (
              <Fragment key={label}>
                <dt className="text-right font-semibold text-subtle" style={style}>
                  {label}
                </dt>
                <dd style={style}>{value}</dd>
              </Fragment>
            );
          })}
        </dl>
      ))}
    </div>
  );
}
