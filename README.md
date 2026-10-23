# HandyTech.sg static 1.0.0

A lightweight multi-page static site for HandyTech.sg using HTML, CSS, vanilla JavaScript and the Tailwind CDN.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static web server. Public routes are plain `.html` files so the site works on simple Apache, XAMPP or static hosting setups without a build step.

## Public pages

- `/` home (`index.html` on disk)
- `services/` service index (`index.html` inside the folder)
- `services/` six service detail pages
- `projects`, `about`, `review`, `contact`, `quote`
- `privacy`, `terms`

## Business data

Contact details, address, UEN, hours, pricing guides and trust stats are taken from the live handytech.sg site and centralized in `app.js` (`business` object). Logo assets live in `assets/` (`handytech-logo.svg` for light backgrounds, `handytech-logo-dark.svg` for the dark footer, `favicon.svg` mark). Service photos live in `assets/` (`home-hero.jpg`, `services-hero.jpg`, `hero-electrical/cctv/aircon/handyman/plumbing/painting.jpg`, optimized JPEG, ≤1400px).

## Before production

- Replace or confirm all business contact details and public claims.
- Replace demo image URLs with owned, optimized WebP/AVIF assets.
- Quote forms currently submit via the visitor's email app (mailto to hello@handytech.sg). For direct delivery and real photo uploads, connect them to a secure server-side endpoint with CSRF, validation, rate limiting and upload handling.
- Review and approve the privacy and terms pages.
- Review the sitemap and robots file against the production domain.
- Configure analytics only after consent and measurement requirements are confirmed.
