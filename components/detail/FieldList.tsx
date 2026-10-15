import { Fragment } from "react";

type Field = [label: string, value: React.ReactNode];

type FieldListProps = {
  /** One or two columns of fields. */
  columns: Field[][];
  /** Space between the right-aligned labels and the values (35 or 61 in the design). */
  gap?: number;
  /** Distance of the first column from the section's title area. */
  offset?: number;
  /** Extra space before the second column (may be negative). */
  columnGap?: number;
};

/** Right-aligned labels (18/600 grey) with their values (18/400 black) next to them. */
export default function FieldList({ columns, gap = 35, offset = 0, columnGap = 0 }: FieldListProps) {
  return (
    <div className="flex items-start" style={{ marginLeft: offset }}>
      {columns.map((fields, index) => (
        <dl
          key={index}
          className="grid grid-cols-[auto_auto] gap-y-27 text-18 leading-22 whitespace-nowrap"
          style={{ columnGap: gap, marginLeft: index > 0 ? columnGap : 0 }}
        >
          {fields.map(([label, value]) => (
            <Fragment key={label}>
              <dt className="text-right font-semibold text-subtle">{label}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      ))}
    </div>
  );
}
