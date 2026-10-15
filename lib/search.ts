/** Lower case without spaces and hyphens, so "a-101", "a101" and "A- 101" are the same text. */
const simplify = (text: string) => text.toLowerCase().replace(/[\s-]+/g, "");

/** Rows whose name contains the search text (ignoring case, spaces and hyphens); all rows when the text is empty. */
function searchRows<Row>(rows: Row[], query: string | undefined, name: (row: Row) => string) {
  const text = simplify(query ?? "");
  return text ? rows.filter((row) => simplify(name(row)).includes(text)) : rows;
}

const ROWS_PER_PAGE = 10;

/** The design shows 3 pages; while searching, the pages only cover the matching rows. */
function pageCount(matching: number, searching: boolean) {
  return searching ? Math.max(1, Math.ceil(matching / ROWS_PER_PAGE)) : 3;
}

/** The page in `?page=`, kept between 1 and `pages`. */
export function currentPage(param: string | undefined, pages: number) {
  return Math.min(Math.max(Number.parseInt(param ?? "", 10) || 1, 1), pages);
}

/** The design has one set of records, so page 2 shows them reversed and page 3 rotated by half. */
export function reorder<Row>(rows: Row[], page: number) {
  if (page === 2) return [...rows].reverse();
  const half = Math.ceil(rows.length / 2);
  return page === 3 ? [...rows.slice(half), ...rows.slice(0, half)] : rows;
}

/** The rows to show for `?q=` and `?page=`, and the number of pages. */
export function listRows<Row>(rows: Row[], q: string | undefined, page: string | undefined, name: (row: Row) => string) {
  const matching = searchRows(rows, q, name);
  const pages = pageCount(matching.length, !!q);
  return { pages, rows: reorder(matching, currentPage(page, pages)) };
}
