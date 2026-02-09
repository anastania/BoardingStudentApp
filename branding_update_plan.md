# Branding Update Plan

## Objective
Update the website with the provided logo, apply its colors (Royal Blue & Cream) as the primary brand colors, and use the Montserrat font throughout the project.

## Changes Implemented

### 1. Logo Integration
- **File**: `src/assets/logo.jpg`
  - Created the logo file from the uploaded image.
- **Sidebar**: `src/components/layout/Sidebar.tsx`
  - Replaced the placeholder "B" logo with the imported `logo.jpg`.
- **Mobile Header**: `src/App.tsx`
  - Replaced the placeholder "B" logo with the imported `logo.jpg`.
- **Type Support**: `src/vite-env.d.ts`
  - Added module declaration for `*.jpg` to support image imports.

### 2. Typography
- **Font**: Montserrat
- **Index HTML**: `index.html`
  - Added Google Fonts link for Montserrat.
- **Tailwind Config**: `tailwind.config.js`
  - Set `fontFamily.sans` to `["Montserrat", "sans-serif"]`.

### 3. Color Theme Update
- **Brand Colors**:
  - **Royal Blue**: `#16358C` (HSL: 224 73% 32%) -> Primary Color
  - **Cream**: `#FFFDD0` (HSL: 57 100% 91%) -> Accent/Foreground Color
- **Tailwind Config**: `tailwind.config.js`
  - Added `royalBlue` and `cream` to colors.
- **CSS Variables**: `src/index.css`
  - Updated `--primary` to Royal Blue.
  - Updated `--primary-foreground` to Cream.
  - Updated `--ring`, `--sidebar-primary`, `--sidebar-ring` to match.

### 4. Component Updates
Replaced hardcoded blue/indigo color classes (e.g., `bg-blue-600`, `text-blue-700`) with semantic `primary` classes across the application:

- **Layout**:
  - `src/components/layout/Sidebar.tsx`: Updated gradients, active item colors, and text.
  - `src/components/layout/BottomNav.tsx`: Updated active item colors.

- **Sections**:
  - `src/sections/Dashboard.tsx`: Updated stats cards, progress bars, and buttons.
  - `src/sections/Matching.tsx`: Updated search interface, buttons, and matching score badge.
  - `src/sections/Journey.tsx`: Updated timeline steps, progress indicators, and badges.
  - `src/sections/Profile.tsx`: Updated completion gauge, buttons, and icons.
  - `src/sections/Support.tsx`: Updated appointment booking, resource badges, and chat interface.

## Verification
- Checked `Button` component in `src/components/ui/button.tsx` to ensure it uses the `primary` variables.
- Verified all major sections use consistent `bg-primary` for main actions and `text-primary` for highlights.
