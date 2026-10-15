import { Fragment } from "react";

/** `gapBefore` replaces the usual space above this row where the design differs. */
type Field = [label: string, value: React.ReactNode, gapBefore?: number];

type FieldListProps = {
  /** One or two columns of fields. */
  columns: Field[][];
  /** Space between the right-aligned labels and the values (35 or 61 in the design). */
  gap?: number;
  /** Distance of the first column from the section's title area. */
  offset?: number;
  /** Extra space before the second column (may be negative). */
  columnGap?: number;
  /** Vertical space between rows (px). */
  rowGap?: number;
};

/** Right-aligned labels (18/600 grey) with their values (18/400 black) next to them. */
export default function FieldList({ columns, gap = 35, offset = 0, columnGap = 0, rowGap = 27 }: FieldListProps) {
  return (
    <div className="flex items-start" style={{ marginLeft: offset }}>
      {columns.map((fields, index) => (
        <dl
          key={index}
          className="grid grid-cols-[auto_auto] items-center text-18 leading-22 whitespace-nowrap"
          style={{ columnGap: gap, rowGap, marginLeft: index > 0 ? columnGap : 0 }}
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
