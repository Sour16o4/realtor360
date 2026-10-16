# Realtor360 CRM

A frontend implementation of the Realtor360 Figma design in Next.js, TypeScript and Tailwind CSS.

Live demo: https://realtor360-lac.vercel.app

## Tech stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS v4. Design tokens (colors, font sizes, radii, shadows) are defined in `app/globals.css`.
- `next/font` with self-hosted Inter and Manrope
- Charts are plain HTML, CSS and SVG. No chart library is used.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build && npm start
```

## Pages

| Route | Figma frame |
| --- | --- |
| `/` | Home Screen |
| `/developments` | Developments |
| `/developments/[id]` | Developments (Overview), Developments (Notes) |
| `/buildings` | Buildings |
| `/buildings/[id]` | Buildings (Overview) |
| `/units` | Units |
| `/units/[id]` | Units (Overview) |
| `/leads` | Leads |
| `/leads/[id]` | Leads (Overview) |
| `/companies` | Companies |
| `/companies/[id]` | Companies (Overview) |
| `/contacts` | Contacts |
| `/contacts/[id]` | Contact (Overview) |
| `/deals` | Deals |
| `/deals/[id]` | Deals (Overview) |
| `/deals/[id]/offer-form` | Offer Form |
| `/deals/[id]/deal-sheet` | Deal Sheet |
| `/attorney-firms` | Attorney firms |
| `/attorney-firms/[id]` | Attorney Firms (Overview) |
| `/activities` | Activities (customers), Activities (open deals), Activities (leads/contacts), selected with `?tab=` |
| `/reports` | Reports |
| `/reports/[id]` | Reports (leads by source), used as the template for every report |
| `/reports/[id]/create-chart` | Reports (Create Chart) |
| `/reports/stacking-plan` | Stacking plan report |
| `/settings` | Settings |
| `/dashboards` | Dashboard panel |

The detail tabs (Overview, Timeline, Notes, Activities, Attachments) are selected with `?tab=`.

## Interactions

- Navbar: every link works and the current section is highlighted. The user menu opens from the avatar and links to Settings. The "more" button opens the Dashboards page.
- Home calendar: month switching and day selection.
- Search on every list page (Developments, Buildings, Units, Leads, Companies, Contacts, Deals, Attorney Firms, Reports). The header box and the filter-sidebar box share the same text.
- Filter checkboxes toggle, and Reset Filters clears them.
- Pagination: Prev, Next and the page numbers.
- Every list row opens its own detail page, and every detail page has a back button to its list.
- Detail pages: the tabs and the Related List links work (Notes, Activities and Attachments open their tab; section links jump to the section).
- Activities: the Customers, Open Deals and Leads/Contacts tabs switch with `?tab=`.
- Building switcher: the arrow next to a building title lists the buildings and opens the one you pick.
- Deals: the Generate Offer Form button opens the offer form, and its arrow menu opens the deal sheet.
- Reports: the star in front of a report name toggles. Every report opens its page, and Create Chart opens the chart builder.
- Create Chart: the chart type tiles select one chart type at a time.
- Stacking plan: hovering a unit cell that is Offer, Contract Signed, Closed, On Hold or Contract Out shows its status label, as in the prototype. Available cells have no variant and stay static. The Stacking Plan button on every development page opens the report.
- Export on the stacking plan and Export PDF on the Offer Form and Deal Sheet open the browser's print dialog. When printing, the navbar, back button and action buttons are hidden so only the document prints.

## Implementation notes

- Tailwind's spacing unit is set to 1px (`--spacing: 1px`), so utilities map directly to Figma pixels: `p-13` is 13px and `w-260` is 260px.
- Lists and detail pages are built from shared components: `components/list` (filters, header, table, pagination) and `components/detail` (Related List sidebar, record header, tabs, sections, field lists).
- All content lives in typed files in `data/`. Components do not hard-code records.
- The design draws one record for most detail pages. Records the design does not draw are built from their list row, with the designed record used as the template for every other field. The designed record is unchanged.
- Filter checkboxes toggle as in the prototype, but the design defines no filtering rules, so the lists are not filtered by them.
- The design has no data for pagination pages 2 and 3, so they reorder the existing records: page 2 shows them reversed and page 3 rotated by half.
- The Figma file has no sign-in, user profile or settings sub-pages. User Profile and Sign out in the user menu keep their hover states, and the nine Settings cards are shown as designed. None of them navigate, because the prototype defines no screen for them.
- Layout is pixel-matched at 1440px. Below that, the pages stay usable: wide content scrolls horizontally inside its container instead of the page, and the navbar pills scroll sideways on narrow screens.

```
app/                  one folder per route; layout.tsx renders the navbar
components/layout/    navbar, active nav item, user menu
components/ui/        small shared pieces (Card, Pill, StatusBadge, Avatar, AvatarStack, PrintButton)
components/dashboard/ home and dashboard sections and charts
components/list/      list-page shell: filters, header, table, pagination
components/detail/    detail-page shell: sidebar, header, tabs, sections
components/reports/   create chart and stacking plan
components/deals/     offer form and deal sheet document
data/                 typed mock data for every screen
public/               icons (SVG) and photos exported from Figma
```

## Known design inconsistencies

These are reproduced as they appear in Figma:

- The Home schedule shows "Submit Internal Review – Apartment PricingFinal Offer – Villa Deal" (two titles merged).
- Developments overview lists the Country as "Rs.1.25 Cr".
- Report Category filters include "Hyderabad", and the Contacts city filter has "Hyderbad".
- Deals list: the Unit text of rows 8 and 9 sits about 9px higher in the frame than in the other rows.
- Some list fields have no place on the detail design, so they are not shown there: the building Sold count, the Orchid Heights status and units, the lead category, and the contact company and stage.
- The deal value is "₹1.45Cr" in the list and "₹1.45 Cr" on the detail page.
- The attorney firm of the development list ("Lex & Co. Legal Partners") differs from the one on the development detail page ("NNC Law Firm").
- Emails wrap in the middle of a word in the narrow (172px) boxes of the company contacts table.
- The lead's preferred location is spelled "Begaluru".
- The Activities "Others" pill has no prototype link or screen, so it is not clickable.
- The Activities Owner Name filter does not list Jessica Chen, who is assigned on the Open Deals and Leads/Contacts cards.
- The Activities Status filter has no "Not Started" option, though some cards have that status.
- The Activities filter checkboxes toggle as in the prototype; the design defines no filtering rules, so the cards are not filtered.
- The Dashboards frame shows the Home pill active, and its navbar has no links for Home, Leads or Contacts. The shared navbar keeps them working.
- The report list says "Lead by Source", but the page title says "Leads by Source".
- Leads by Source: Manish Kapoor is paired with shweta@elitehomes.com, three rows share one mobile number, and Google Ads has "—" as its company.
- Create Chart: the preview heading says "Lead by Source", even over the stage bar chart.
- The Deal Sheet frame is titled "Offer Form". Its Deal Owner (Rohit Mehra) and deal name differ from the deals list. The Offer Form's Unit Area value repeats its label, and the buyer email differs from the deal page.
- Stacking plan: the Contract Signed hover label reads "Contact Signed".
- Settings: the card grid spacing is uneven, and the Developer Space card has a larger icon box.
- The design repeats one lead (John Doe, six times) and one development (Sunrise Enclave, five times).
