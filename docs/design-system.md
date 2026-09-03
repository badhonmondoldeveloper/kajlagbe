# KajLagbe Design System Specification (Module 02)

## 1. Product Vision & Brand Identity

**KAJLAGBE** is Bangladesh's nationwide on-demand and scheduled local service marketplace.
The design system communicates **TRUST**, **QUALITY**, **SAFETY**, and **MODERN ACCESSIBILITY**.

---

## 2. Semantic Color System

| Token | CSS Variable / Value | Description |
| :--- | :--- | :--- |
| **`primary`** | `hsl(160 84% 39%)` (`#059669`) | Emerald 600 - Main Trust Brand Color |
| **`primary-hover`** | `hsl(161 94% 30%)` (`#047857`) | Emerald 700 - Hover State |
| **`primary-light`** | `hsl(152 81% 96%)` (`#ecfdf5`) | Emerald 50 - Subtle Background & Badges |
| **`background`** | `hsl(210 40% 98%)` (`#f8fafc`) | Neutral Slate 50 Background |
| **`foreground`** | `hsl(222 47% 11%)` (`#0f172a`) | Slate 900 Text Primary |
| **`card`** | `hsl(0 0% 100%)` (`#ffffff`) | Pure White Card Surface |
| **`success`** | `hsl(142 71% 45%)` (`#16a34a`) | Positive confirmation, verified check |
| **`warning`** | `hsl(38 92% 50%)` (`#f59e0b`) | Pending statuses, cautionary feedback |
| **`error`** | `hsl(0 84% 60%)` (`#e11d48`) | Destructive actions, validation errors |
| **`info`** | `hsl(199 89% 48%)` (`#0284c7`) | Informational tips, system guidance |

---

## 3. Typography System

- **English & Numeric UI**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Bangla Rendering**: `Hind Siliguri`, `Kalpurush`, `SolaimanLipi`, `sans-serif`

### Typographic Scale
- **Display**: `text-4xl` / `text-5xl` (Black / 900)
- **H1**: `text-2xl` / `text-3xl` (Bold / 700)
- **H2**: `text-xl` / `text-2xl` (Bold / 700)
- **H3**: `text-lg` / `text-xl` (SemiBold / 600)
- **H4**: `text-base` / `text-lg` (SemiBold / 600)
- **Body Large**: `text-base` (Regular / 400)
- **Body**: `text-sm` (Regular / 400, leading-relaxed)
- **Body Small**: `text-xs` (Regular / 400)
- **Caption / Label**: `text-[11px]` / `text-[10px]` (Medium / 500)
- **Currency & Numerals**: `font-bold` / `font-mono` (BDT `৳`)

---

## 4. Spacing Scale

- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px
- `5`: 20px
- `6`: 24px
- `8`: 32px
- `10`: 40px
- `12`: 48px
- `16`: 64px
- `20`: 80px
- `24`: 96px

---

## 5. Border Radius & Shadows

- `sm`: 4px (`rounded-md`)
- `md`: 6px (`rounded-lg`)
- `lg`: 8px (`rounded-xl`)
- `xl`: 12px (`rounded-2xl`)
- `full`: 9999px (`rounded-full`)

### Shadows
- **Card**: `0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)`
- **Elevated**: `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)`
- **Dropdown / Modal**: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`

---

## 6. Reusable Component Catalog (`packages/ui`)

### Base Components
- `Button` (primary, secondary, outline, ghost, danger, success; sizes: sm, md, lg, icon; states: default, hover, active, loading, disabled)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
- `Input`, `PasswordInput`, `SearchInput`, `PhoneInput` (+880 BD prefix), `Textarea`
- `Select`, `Checkbox`, `Radio`, `Switch`
- `Badge`, `StatusBadge`, `AvailabilityBadge`, `RatingBadge`
- `Avatar`, `AvatarGroup`
- `Modal`, `Dialog`, `Drawer` (Responsive Mobile Bottom Sheet)
- `Tabs` (underline, pills, segmented), `Accordion`
- `Pagination`, `Breadcrumb`, `Tooltip`, `Dropdown`

### Feedback & Loading
- `Alert` (info, success, warning, error)
- `Toast`, `ToastContainer`
- `EmptyState`, `NoJobsEmptyState`, `NoBookingsEmptyState`, `NoMessagesEmptyState`, `NoSearchResultsEmptyState`
- `PageLoader`, `SectionLoader`, `Skeleton`, `InlineLoader`
- `InlineError`, `PageError`, `NetworkError`

### Data Display
- `StarRating`, `RatingSummary` (with percentage bars)
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `DataCard` (mobile table alternative)
- `KeyValueDisplay`, `StatusTimeline`

### Trust & Safety (Marketplace Specific)
- `VerifiedProviderBadge` (NID, Trade License, Police Clearance, Top Rated, Guaranteed)
- `TrustScoreIndicator` (Calculated percentage & badge)
- `CompletedJobsCounter`
- `ResponseRateIndicator`
- `ExperienceBadge`

### Search & Location
- `GlobalSearchInput` (with interactive location selector)
- `PopularSearches`
- `LocationSelectorModal` (Division > District hierarchy for Bangladesh)

### Navigation & Layout
- `DesktopNavbar`, `MobileBottomNav`, `CollapsibleSidebar`
- `Container`, `SectionContainer`, `Stack`, `PageHeader`, `SectionHeader`

