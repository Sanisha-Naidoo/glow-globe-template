
# Plan: Add Family Tree Wiki to Portfolio

## Overview
Add Family Tree Wiki as the featured project in the "Building in Public" section, positioned above Global Hour. This will showcase Family Tree as the primary active project with a live iframe preview.

---

## Changes Summary

### 1. Update BuildingInPublicSection.tsx
**Add Family Tree Wiki as the first project in the array:**

- Import the `familytree.png` logo (already exists in assets)
- Add Family Tree Wiki as the first item in `currentProjects` array:
  - Name: "Family Tree Wiki"
  - Tagline: "Map your heritage"
  - URL: https://familytreewiki.lovable.app
  - Tools: React, TypeScript, Supabase, D3.js (from current Coming Soon)
  - Motivation: A visual and interactive way to map family heritage, preserving stories and connections across generations

- Move Global Hour to second position in the array
- Both projects will maintain the existing interactive layout with live iframe previews and scale animations

### 2. Update ComingSoonSection.tsx
**Remove Family Tree from upcoming projects:**

- Remove the Family Tree object from `upcomingProjects` array
- Keep only "Spill the Tee" in the Coming Soon section
- Remove the unused `familytreeLogo` import

### 3. Update BrandShowcase.tsx
**Make Family Tree a live link:**

- Update the Family Tree entry in `logos` array:
  - Set `url` to "https://familytreewiki.lovable.app"
  - Set `isLive` to `true`

This will enable hover effects and make it clickable like Global Hour, Trustee App, and PreLoved.

---

## Technical Details

### File Changes

| File | Action |
|------|--------|
| `src/components/BuildingInPublicSection.tsx` | Add Family Tree as first project, import logo |
| `src/components/ComingSoonSection.tsx` | Remove Family Tree from array, remove logo import |
| `src/components/BrandShowcase.tsx` | Update Family Tree to `isLive: true` with URL |

### Visual Result
The "Building in Public" section will now display:
1. **Family Tree Wiki** (first/top) - with live iframe preview
2. **Global Hour** (second/below) - with live iframe preview

Both will have the same interactive animations, browser chrome styling, and responsive layout currently used for Global Hour.
