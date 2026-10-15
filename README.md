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
