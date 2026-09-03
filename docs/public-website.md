# KajLagbe Public Website Architecture (Module 03)

This document details the architecture, mock data structure, page responsibilities, SEO strategy, and future API integration points for the **KajLagbe Premium Public Website**.

---

## 1. Public Routes Map

| Route | Page Purpose | Layout & Key Components |
| :--- | :--- | :--- |
| `/` | Master Homepage | Hero search with division picker, emergency service entry, categories, how it works, verified provider spotlight, trust & safety pillars, business solutions, testimonials, stats, FAQs. |
| `/services` | Services Directory | Categorized taxonomy groups, search filter, pricing indicators, category cards. |
| `/services/[category]` | Service Category Details | Subservices with price ranges, pricing guidance disclaimer, matching providers, benefits, safety tips, FAQs, booking CTA. |
| `/providers` | Provider Directory | Faceted filtering (Category, Division, Verified NID, Availability), sorting (Rating, Experience, Trust score), mobile drawer filter, provider cards. |
| `/providers/[slug]` | Provider Profile | Master profile header, verification badges, trust score, completed jobs, experience, services offered, portfolio gallery, ratings summary, customer reviews, sticky mobile booking bar. |
| `/jobs` | Live Job Board | Public customer job posts, search, urgency tag (Emergency, Today, Flexible), budget ranges in BDT, customer verification status. |
| `/jobs/[id]` | Job Details | Full job scope, requirements list, customer trust indicator, apply modal/CTA, related category jobs. |
| `/how-it-works` | How It Works | Tabbed visual process for Customers (4 steps) and Providers (4 steps). |
| `/for-providers` | Provider Onboarding | High-converting acquisition page, benefits, earning transparency, verification explanation, onboarding FAQs, registration CTA. |
| `/for-businesses` | Corporate B2B Solutions | Enterprise team dispatch, central invoicing, AMC maintenance contracts, agency dashboard preview. |
| `/pricing` | Pricing & Subscription Plans | Transparent Provider plans (Free Starter, Pro Provider, Enterprise Business) with feature checklists. |
| `/safety` | Trust & Safety Policy | Background checks, NID verification, escrow payment safety, dispute resolution, emergency disclaimer. |
| `/help` | Help & FAQ Center | Searchable knowledge base, topic-filtered accordion FAQs, customer support routing. |
| `/about` | About KajLagbe | Bangladesh mission, platform values, nationwide expansion story. |
| `/contact` | Contact & Inquiries | Multi-channel contact information, customer/provider/corporate support inquiry form with feedback state. |
| `/blog` | Blog & Guides | Maintenance tips, electrical safety, plumbing guides, tag search. |
| `/blog/[slug]` | Blog Article View | Full article view with author credentials, read time, related articles, and contextual service booking CTA. |

---

## 2. Mock Data Architecture (`apps/web/src/data/`)

All mock data is centralized in `apps/web/src/data/` with strict TypeScript typing:
- `categories.ts`: Complete taxonomy of services with subservices, pricing guidance hints, icons, and Bangla titles.
- `providers.ts`: 12+ realistic provider profiles with Bangla names, categories, experience, completed jobs, trust scores, locations across 8 divisions, verification badges, ratings, reviews, services offered, and portfolio items.
- `jobs.ts`: Realistic customer job postings with titles, categories, areas/districts, budget ranges in BDT, urgency, description, requirements.
- `testimonials.ts`: Realistically structured customer & provider testimonials.
- `locations.ts`: Bangladesh 8 divisions with districts and active provider metrics.
- `blog.ts`: Practical maintenance and service guide articles.
- `faq.ts`: Categorized FAQs for customers, providers, and businesses.

---

## 3. SEO & Local Discovery Foundation

- Clean semantic HTML structure across all public pages (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
- Responsive OpenGraph & Twitter preview tags configured in Next.js layout metadata.
- Pre-structured routing hierarchy (`/services/[category]`, `/providers/[slug]`, `/jobs/[id]`, `/blog/[slug]`) ready for dynamic JSON-LD Schema markup (`Service`, `LocalBusiness`, `FAQPage`, `BreadcrumbList`).

---

## 4. Future API Integration Points

When migrating from mock data to real backend APIs in future modules:
1. **Services & Categories**: Replace `CATEGORIES` in `apps/web/src/data/categories.ts` with `GET /api/v1/categories` and `GET /api/v1/categories/:slug`.
2. **Providers**: Replace `PROVIDERS` in `apps/web/src/data/providers.ts` with `GET /api/v1/providers?category=&division=&verified=` and `GET /api/v1/providers/:slug`.
3. **Job Marketplace**: Replace `JOBS` in `apps/web/src/data/jobs.ts` with `GET /api/v1/jobs` and `GET /api/v1/jobs/:id`.
4. **Blog & CMS**: Replace `BLOG_POSTS` in `apps/web/src/data/blog.ts` with `GET /api/v1/cms/articles`.

