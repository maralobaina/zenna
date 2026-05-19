# Zenna — Development Log

This document tracks every improvement made to the Zenna website as part of an exam project. It covers what was changed, why, and which tools were used.

---

## Project Overview

**Project name:** Zenna  
**Type:** E-commerce landing site — premium matcha brand  
**Stack:** Plain HTML, CSS, JavaScript (no frameworks)  
**Origin:** Converted from a Figma prototype using Claude AI (Figma-to-code)  
**Goal:** Take a static prototype and turn it into a fully functional, polished website

---

## Tools & Technologies Used

| Tool | Purpose |
|------|---------|
| HTML / CSS / JavaScript | Core website stack |
| Google Fonts (Instrument Serif + Roboto) | Typography |
| CSS custom properties | Design token system (colors, spacing, etc.) |
| Hash-based SPA router (vanilla JS) | Client-side routing without a framework |
| localStorage | Cart and language preference persistence |
| i18n system (custom, vanilla JS) | English / Finnish bilingual support |
| Figma | Original prototype design |
| Claude AI (Figma plugin + Claude Code) | Design-to-code conversion and development assistant |
| Git + GitHub | Version control |

---

## Improvements — Completed

### 1. Remove search button from nav
**Date:** 2026-05-19  
**What changed:** Removed the magnifying glass / search icon button from the navigation bar.  
**Why:** The site has no search functionality, so the button was misleading to users.  
**Files changed:** `index.html`  
**How it was done:** Deleted the `<button aria-label="Search">` element and its SVG icon from the nav's right side.

---

### 2. Fix i18n bug — "No added sugar" tag
**Date:** 2026-05-19  
**What changed:** The circular tag on the hero product image now correctly switches to Finnish ("Ei lisättyä sokeria") when the language is toggled.  
**Why:** The element was using a non-existent `data-i18n-html` attribute instead of the correct `data-i18n` attribute, and the translation key was missing from both language dictionaries.  
**Files changed:** `pages.js`, `i18n.js`  
**How it was done:** Changed the attribute to `data-i18n="tag.no-sugar"` and added the key to both the English and Finnish dictionaries in `i18n.js`.

---

## Improvements — Upcoming

3. Login page + profile page (with Supabase authentication)
4. Restore hero section carousel; animate hero text
5. Make prep guide on product page into a swipeable carousel
6. Redesign product page and footer
7. Hide nav on scroll down, show on scroll up
8. Add About Us page
9. Coffee bag slide-in animation on load
10. Loading effects throughout the site

---

*This log is updated after every completed improvement.*
