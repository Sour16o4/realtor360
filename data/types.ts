export type FilterGroup = {
  title: string;
  options: string[];
};

/** One item of a detail page's "Related List" sidebar. `href` jumps to a section (e.g. "#deals") of the Overview tab. */
export type RelatedItem = { label: string; count?: number; href?: string };

/** One column of a list table. `width` is the column's width in the design (px), used as a proportion. */
export type Column<Row> = {
  header: React.ReactNode;
  width: number;
  /** Applied to the header and every cell of the column (alignment, padding). */
  className?: string;
  render: (row: Row) => React.ReactNode;
};
