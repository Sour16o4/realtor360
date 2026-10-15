import Link from "next/link";
import type { Column } from "@/data/types";
import { cn } from "@/lib/cn";

type ListTableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row, index: number) => string;
  /** Height and top padding of a row; they differ per page in the design. */
  rowClassName: string;
  /** Extra space between the header card and the first row. */
  bodyClassName?: string;
  /** Rows with a detail page link to it; return undefined for rows without one. */
  rowHref?: (row: Row) => string | undefined;
  className?: string;
};

/** Header card + rows separated by thin lines, used by the list pages. */
export default function ListTable<Row>({
  columns,
  rows,
  rowKey,
  rowClassName,
  rowHref,
  bodyClassName,
  className,
}: ListTableProps<Row>) {
  const gridTemplateColumns = columns.map((column) => `minmax(0, ${column.width}fr)`).join(" ");
  const rowClasses = cn("grid items-start border-b border-black/12 -ml-8 pl-24", rowClassName);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-900">
        <div
          role="row"
          className="grid h-49 items-center rounded-10 bg-white pl-17 text-16 font-semibold"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column, index) => (
            <span key={index} role="columnheader" className={column.className}>
              {column.header}
            </span>
          ))}
        </div>

        <div className={bodyClassName}>
        {rows.map((row, index) => {
          const cells = columns.map((column, index) => (
            <div key={index} role="cell" className={cn("text-14 text-black", column.className)}>
              {column.render(row)}
            </div>
          ));
          const key = rowKey(row, index);
          const href = rowHref?.(row);
          return href ? (
            <Link key={key} href={href} role="row" className={cn(rowClasses, "hover:bg-white/60")} style={{ gridTemplateColumns }}>
              {cells}
            </Link>
          ) : (
            <div key={key} role="row" className={rowClasses} style={{ gridTemplateColumns }}>
              {cells}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
