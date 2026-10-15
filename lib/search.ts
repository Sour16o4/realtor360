/** Lower case without spaces and hyphens, so "a-101", "a101" and "A- 101" are the same text. */
const simplify = (text: string) => text.toLowerCase().replace(/[\s-]+/g, "");

/** Rows whose name contains the search text (ignoring case, spaces and hyphens); all rows when the text is empty. */
export function searchRows<Row>(rows: Row[], query: string | undefined, name: (row: Row) => string) {
  const text = simplify(query ?? "");
  return text ? rows.filter((row) => simplify(name(row)).includes(text)) : rows;
}

const ROWS_PER_PAGE = 10;

/** The design shows 3 pages; while searching, the pages only cover the matching rows. */
export function pageCount(matching: number, searching: boolean) {
  return searching ? Math.max(1, Math.ceil(matching / ROWS_PER_PAGE)) : 3;
}
