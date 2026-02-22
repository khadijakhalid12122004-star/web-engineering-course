# PAF-IAST One-Page Website

This repository contains a one-page university website implementation with:

- Sticky navigation and section scrolling.
- About, Academics, Admissions, Campus Life, and Contact sections.
- Contact form JavaScript workflow that sends an automatic welcome email using EmailJS.

## Files

- `index.html`
- `style.css`
- `script.js`

## Email auto-reply setup (required for live sending)

1. Create an EmailJS account.
2. Create an email service and template.
3. Replace placeholders in `script.js`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`

Without setup, the form still works and shows a simulated success message.

## Run locally

Open `index.html` in a browser.
