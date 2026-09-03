# Supabase Authentication Setup & Configuration Guide

## Overview
This document specifies the complete, security-audited setup required in the **Supabase Dashboard** for **KAJLAGBE (কাজ লাগবে)** authentication.

> [!IMPORTANT]
> - Never expose `SUPABASE_SECRET_KEY` in frontend environment variables or client code.
> - Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be used on the client.

---

## 1. Project Reference & Endpoints
- **Supabase Project URL**: `https://epmbzwcvhophzhzetoio.supabase.co`
- **JWKS Endpoint**: `https://epmbzwcvhophzhzetoio.supabase.co/auth/v1/.well-known/jwks.json`
- **OIDC Discovery Endpoint**: `https://epmbzwcvhophzhzetoio.supabase.co/auth/v1/.well-known/openid-configuration`
- **OAuth Authorization Endpoint**: `https://epmbzwcvhophzhzetoio.supabase.co/auth/v1/oauth/authorize`
- **OAuth Token Endpoint**: `https://epmbzwcvhophzhzetoio.supabase.co/auth/v1/oauth/token`

---

## 2. Authentication Provider Configuration

### A. Email / Password Provider
- **Status**: Enabled
- **Email Confirmation**: Enabled (Configurable depending on onboarding requirements)
- **Minimum Password Length**: 6 characters

### B. Google OAuth Provider
- **Status**: Enabled (via Supabase Dashboard -> Auth -> Providers -> Google)
- **Client ID**: Configured from Google Cloud Console OAuth 2.0 Credentials
- **Client Secret**: Configured in Supabase Dashboard
- **Authorized Redirect URI (in Google Cloud Console)**:
  `https://epmbzwcvhophzhzetoio.supabase.co/auth/v1/callback`

---

## 3. Site URL & Redirect URI Allow List

In **Supabase Dashboard -> Authentication -> URL Configuration**:

### A. Site URL:
```
https://kajlagbe-sigma.vercel.app/
```

### B. Redirect URLs (URI Allow List):
```
https://kajlagbe-sigma.vercel.app/*
https://kajlagbe-sigma.vercel.app/auth/callback
http://localhost:3000/*
http://localhost:3000/auth/callback
```

---

## 4. Email Templates & Recovery Redirects

In **Supabase Dashboard -> Authentication -> Email Templates**:

### Reset Password Redirect URL:
```
https://kajlagbe-sigma.vercel.app/reset-password
```
*(Or `http://localhost:3000/reset-password` during local development)*

---

## 5. User & Profile Idempotent Database Linkage

When a user signs up via Email or Google OAuth:
1. Supabase Auth generates a unique `auth.uid()`.
2. `AuthContext.fetchProfile()` checks if a matching record exists in the PostgreSQL `users` table (`id` = `auth.uid()`).
3. If absent, `users` and `user_profiles` records are created with fallback metadata without duplicating existing profile data.
