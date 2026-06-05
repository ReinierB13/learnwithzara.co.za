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
| `src/app/admin/page.tsx` | Protected admin catalog manager for subjects, grades, courses, and product uploads. |
| `src/app/admin/actions.ts` | Admin-only server actions for catalog creation and PDF uploads. |
| `src/app/products-test/page.tsx` | Internal product testing page that lists uploaded products from Postgres. |
| `src/app/basket/page.tsx` | Basket test page for stored cart items before payment simulation. |
| `src/app/checkout-test/page.tsx` | Payment simulation page that creates paid test orders and previews customer email content. |
| `src/app/checkout-test/actions.ts` | Server action that turns browser basket items into simulated paid orders. |
| `src/lib/db.ts` | Neon database client helper. |
| `src/lib/auth.ts` | Password hashing, signed session cookies, and current-user lookup. |
| `src/lib/admin-catalog.ts` | Admin catalog schema guard and dashboard queries. |
| `src/lib/r2.ts` | Cloudflare R2 upload helper for product PDFs. |
| `src/components/ProductTestStore.tsx` | Client-side product basket prototype for testing checkout flow. |
| `src/components/BasketClient.tsx` | Client-side basket review and quantity controls. |
| `src/components/CheckoutTestClient.tsx` | Client-side checkout simulation form. |
| `src/lib/basket.ts` | Browser basket storage helpers for the test checkout flow. |
| `src/components/Footer.tsx` | Footer navigation and social placeholders. |
| `db/001_core_schema.sql` | Core account, commerce, download, free resource, and email subscriber schema. |
| `db/002_admin_catalog.sql` | Admin catalog schema for subjects, grades, courses, and course-product links. |
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
R2_ACCOUNT_ID=64ffd5073b3feaf3b9a1cb229a022155
R2_ACCESS_KEY_ID=cloudflare-r2-access-key
R2_SECRET_ACCESS_KEY=cloudflare-r2-secret-key
R2_BUCKET_NAME=cloudflare-r2-bucket-name
R2_PUBLIC_URL=https://pub-68019f01cee142348aa3e9e8cbf6b13b.r2.dev
```

Set the same `DATABASE_URL`, `AUTH_SECRET`, and R2 environment variables in the production hosting environment before deploying account, newsletter, or admin upload changes.

## Database

Core tables are defined in `db/001_core_schema.sql`. Admin catalog tables are defined in `db/002_admin_catalog.sql`.

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

## Admin Catalog

The admin dashboard is available at `/admin` for signed-in users with `role = 'ADMIN'`.

It currently supports:

- creating subjects
- managing grade labels
- creating courses by subject and grade
- uploading product PDFs to Cloudflare R2
- storing product metadata in the existing `products` table
- linking uploaded products to courses

To promote an account to admin, update the matching user row in Postgres:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE lower(email) = lower('you@example.com');
```

PDF uploads require a Cloudflare R2 bucket with S3 API credentials. Uploaded products are stored under grade and subject prefixes such as `grade-r/maths/` and the public R2 URL is saved in the `products.file_url` column.

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
