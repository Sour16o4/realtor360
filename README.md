# Realtor360

Frontend implementation of the Realtor360 real-estate CRM Figma design, built with Next.js and TypeScript.

## Tech stack

- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS v4. Design tokens (colors, font sizes, radii, shadows) are defined in `app/globals.css`.
- Inter and Manrope fonts, self-hosted with `next/font/local`

No UI or chart libraries are used. The charts are plain HTML, CSS and SVG, so they match the design exactly.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build && npm start`.

## Project structure

```
app/                  one folder per route; layout.tsx renders the navbar
components/layout/    navbar, active nav item, user dropdown
components/ui/        small shared pieces (Card, Pill, StatusBadge, Avatar, AvatarStack)
components/dashboard/ home dashboard sections and charts
components/list/      shared list-page shell: filters, header, table, pagination
data/                 typed mock data for every screen
public/               icons (SVG) and photos exported from Figma
```

## Notes

- The layout is built for the design's 1440px width and stays usable down to mobile. The dashboard grid stacks into one column, and wide tables scroll horizontally.
- Interactive parts: the navigation, user menu, calendar month switching and day selection, filter checkboxes with reset, and pagination.
- Text content is copied exactly from the design.

### Known design content issues

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
