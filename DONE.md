# Done

## 2026-06-04

- Added a dedicated `/zara-story` page with Zara's longer story.
- Updated the Meet Zara landing copy and linked "Read Zara's Story" to the story page.
- Removed the fox emoji from the Zara story sign-off.
- Added a `/products` coming soon page for Workbooks, Test Packs, and Exam Preparation.
- Updated product cards to link to the new products page.
- Updated newsletter calendar downloads to include both 2026 and 2027 calendars.
- Added `public/Calender_Free_download_QR_code_2027.png`.
- Added a dedicated `/parents` page with the "A Word to Parents" message.
- Updated "For Parents" navigation links to open the new parents page.
- Added a dedicated `/refund-policy` page with the digital products refund policy.
- Updated the footer Refund Policy link to open the new page.
- Added a dedicated `/faqs` page with frequently asked questions.
- Updated the footer FAQs link to open the new page.
- Added a dedicated `/shipping-delivery` page for digital delivery details.
- Updated the footer Shipping & Delivery link to open the new page.

## 2026-06-05

- Installed `@vercel/analytics` and added the Vercel Analytics component to the root layout.
- Fixed footer overflow so quick links and copyright no longer overlap.
- Updated footer copyright year to 2026.
- Added the core Postgres schema for users, children, products, orders, downloads, email subscribers, free resources, and addresses.
- Updated newsletter signup storage to use the new `email_subscribers` table.
- Added account registration, sign in, sign out, and a basic account dashboard shell.
- Updated the header My Account links to open `/account`.
- Added child profile creation, listing, and removal inside `/account`.
- Collapsed the add-child form behind a plus control in the Children profiles section.
- Added a pencil edit control for updating saved child details.
- Added the official support email `learnwithzara@outlook.com` to contact and policy pages.
- Cleaned up FAQ contact formatting so email and website links sit beside their labels.
- Cleaned up Shipping & Delivery contact formatting so the website link sits beside its label.
- Installed `@vercel/blob` for durable admin PDF uploads.
- Added a protected `/admin` catalog manager for subjects, grades, courses, and product PDF uploads.
- Added the admin catalog schema in `db/002_admin_catalog.sql`.
- Added an admin-only dashboard link from `/account`.
- Collapsed admin subject and grade forms behind plus controls.
- Increased admin PDF upload body limit to 25 MB and added friendlier upload error messages.
- Added graceful admin catalog load handling and an admin route error boundary.
- Updated 2026 and 2027 calendar downloads to use Cloudflare R2 URLs.
- Switched admin product PDF uploads from Vercel Blob to Cloudflare R2.
- Removed the Vercel Blob dependency after moving uploads to R2.
- Collapsed the admin course form behind a plus control.
- Updated R2 product upload paths to use grade and subject folders.
- Improved admin R2 upload errors when the Access Key ID is incorrect.
- Added `/products-test` to display uploaded products and prototype basket testing.
- Added `/basket` with browser-stored test cart items, quantity controls, and basket summary.
- Kept product add-to-basket actions on `/products-test` and added running basket counts.
