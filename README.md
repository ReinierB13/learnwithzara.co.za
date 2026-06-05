# Learn with Zara

Public website for Learn with Zara, a South African learning-resource brand offering CAPS-aligned workbooks, test packs, and exam preparation material for school learners.

## Live Site

Production is live at:

```text
https://learnwithzara.co.za
```

## Project Status

- Live public site: `https://learnwithzara.co.za`
- Framework: Next.js App Router
- Styling: Tailwind CSS
- Language: TypeScript
- Database: Neon Serverless Postgres for accounts, products, orders, downloads, free resources, and email subscribers
- Primary route: `src/app/page.tsx`
- Main page sections: header, hero, product cards, trust section, Meet Zara, newsletter signup, and footer

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local site:

```text
http://localhost:3000
```

## Common Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Key Files

| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Composes the homepage sections. |
| `src/app/layout.tsx` | App metadata, tab icon, fonts, and root layout. |
| `src/app/globals.css` | Theme tokens and global styles. |
| `src/components/Header.tsx` | Fixed navigation, mobile menu, account/cart links. |
| `src/components/Hero.tsx` | First viewport brand section with Zara mascot and call to action. |
| `src/components/ProductCards.tsx` | Workbooks, test packs, and exam preparation cards. |
| `src/components/TrustSection.tsx` | Parent/teacher trust messaging. |
| `src/components/MeetZara.tsx` | Brand mascot and learner-friendly story section. |
| `src/components/NewsletterSignup.tsx` | Email signup/contact area. |
| `src/app/api/newsletter/route.ts` | API route that validates and stores newsletter emails. |
| `src/lib/db.ts` | Neon database client helper. |
| `src/lib/auth.ts` | Password hashing, signed session cookies, and current-user lookup. |
| `src/components/Footer.tsx` | Footer navigation and social placeholders. |
| `db/001_core_schema.sql` | Core account, commerce, download, free resource, and email subscriber schema. |
| `db/newsletter_subscribers.sql` | Legacy newsletter subscriber table schema. |
| `public/Calender_Free_download_QR_code.png` | Free printable school calendar lead magnet. |
| `public/tab_icon.png` | Browser tab icon for the site. |
| `public/images` | Production image assets used by the site. |
| `BackGround` | Source/generated background image candidates. |

## Environment Variables

Create a local `.env.local` file with the Neon connection string:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
AUTH_SECRET=replace-with-a-long-random-secret
```

Set the same `DATABASE_URL` and `AUTH_SECRET` in the production hosting environment before deploying account or newsletter changes.

## Database

Core tables are defined in `db/001_core_schema.sql`.

The schema includes:

- `users`
- `children`
- `products`
- `orders`
- `order_items`
- `downloads`
- `email_subscribers`
- `free_resources`
- `addresses`

Newsletter and calendar emails are stored in the `email_subscribers` table. The legacy `newsletter_subscribers` table is still documented for older deployments and can be migrated into `email_subscribers` with the core schema migration.

Neon project:

- Name: `learnwithzara`
- Project ID: `aged-bird-59300115`
- Region: `aws-eu-central-1`
- Database: `learnwithzara`
- Branch: `main`

The API route at `/api/newsletter`:

- accepts `POST` requests with `{ "email": "person@example.com" }`
- normalizes emails to lowercase
- creates the `email_subscribers` table and unique email index if they do not already exist
- upserts repeat signups instead of creating duplicates

## Account Foundation

The My Account button opens `/account`.

The first account version includes:

- account registration for parents and teachers
- password hashing with Node `crypto.scrypt`
- signed, HTTP-only session cookies
- sign in and sign out
- a dashboard shell with child, order, and download counts

Use `AUTH_SECRET` for signing session cookies. If it is missing, the local fallback uses `DATABASE_URL`, but production should define a dedicated long random secret.

## Deployment Notes

- Production domain: `learnwithzara.co.za`
- Canonical URL to use in docs and references: `https://learnwithzara.co.za`
- Before publishing changes, run `npm run build` and `npm run lint`.
- After deployment, smoke test the homepage, navigation anchors, mobile menu, newsletter/contact area, and production HTTPS redirect.

## Content Notes

- Keep copy focused on South African learners, CAPS-aligned resources, and teacher-created materials.
- Product links currently point to a coming soon page until ecommerce flows are added.
- The free school calendar is featured on the homepage and unlocked in the UI after newsletter signup.
- Social and terms links in the footer are placeholders and should be replaced when those pages/accounts are ready.
