export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Developments", href: "/developments" },
  { label: "Buildings", href: "/buildings" },
  { label: "Units", href: "/units" },
  { label: "Leads", href: "/leads" },
  { label: "Companies", href: "/companies" },
  { label: "Contacts", href: "/contacts" },
  { label: "Deals", href: "/deals" },
  { label: "Activities", href: "/activities" },
  { label: "Attorney Firms", href: "/attorney-firms" },
  { label: "Reports", href: "/reports" },
];

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
