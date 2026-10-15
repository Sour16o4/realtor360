type DetailTableProps = {
  /** CSS grid columns; the first one starts at the first heading's x position. */
  columns: string;
  /** Use "\n" where the design breaks a heading onto two lines. */
  headings: string[];
  rows: React.ReactNode[][];
  /** Vertical space between rows (px). */
  rowGap?: number;
  /** Space (px) between the headings and the first row where the design differs from `rowGap`. */
  headingGap?: number;
};

/** Plain table of an overview section: grey headings (18/600), black values (18/400). */
export default function DetailTable({ columns, headings, rows, rowGap = 20, headingGap }: DetailTableProps) {
  return (
    <div className="grid text-18 leading-22 text-black" style={{ gridTemplateColumns: columns, rowGap }}>
      {headings.map((heading) => (
        <span
          key={heading}
          className="font-semibold whitespace-pre-line text-subtle"
          style={headingGap === undefined ? undefined : { marginBottom: headingGap - rowGap }}
        >
          {heading}
        </span>
      ))}
      {rows.map((row, index) => (
        <div key={index} className="contents">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
