# KajLagbe Auth Production Environment Checklist

## 1. Supabase Environment Configuration
- [x] `NEXT_PUBLIC_SUPABASE_URL` configured in Vercel & local `.env`.
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configured in Vercel & local `.env`.
- [x] `SUPABASE_SERVICE_ROLE_KEY` configured strictly on server environment (never exposed to browser).
- [x] Supabase Auth Site URL configured to `https://kajlagbe-sigma.vercel.app`.
- [x] Supabase Auth Redirect URLs configured to `https://kajlagbe-sigma.vercel.app/auth/callback`.
- [x] Email confirmation settings reviewed.

## 2. Vercel & Deployment Security
- [x] Environment variables verified on preview and production branches.
- [x] No service keys or secrets committed to repository code or documentation.
- [x] Cookie attributes set to `SameSite=Lax` and `HttpOnly` via `@supabase/ssr`.

## 3. Local Development Security
- [x] `.env.example` contains non-sensitive placeholders.
- [x] `.gitignore` includes `.env`, `.env.local`, `.env.production`.

