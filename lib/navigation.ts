/** `width` and `gap` (space before the item) are the design's pill sizes in px, so the items line up with the Figma navbar. */
type NavItem = { label: string; width: number; gap: number; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", width: 63, gap: 0, href: "/" },
  { label: "Developments", width: 119, gap: 1, href: "/developments" },
  { label: "Buildings", width: 83, gap: 2, href: "/buildings" },
  { label: "Units", width: 60, gap: 0, href: "/units" },
  { label: "Leads", width: 64, gap: 0, href: "/leads" },
  { label: "Companies", width: 99, gap: 0, href: "/companies" },
  { label: "Contacts", width: 86, gap: 0, href: "/contacts" },
  { label: "Deals", width: 61, gap: 0, href: "/deals" },
  { label: "Activities", width: 86, gap: 0, href: "/activities" },
  { label: "Attorney Firms", width: 120, gap: 0, href: "/attorney-firms" },
  { label: "Reports", width: 77, gap: 0, href: "/reports" },
];

export function isActive(pathname: string, href: string) {
  // The Dashboards frame draws the Home pill as the active one (and not the "···" item).
  if (href === "/") return pathname === "/" || pathname === "/dashboards";
  return pathname === href || pathname.startsWith(`${href}/`);
}
