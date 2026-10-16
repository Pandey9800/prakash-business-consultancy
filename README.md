# Prakash Business Consultancy - website concept demo

A plain HTML/CSS/JS website. No build step, no installs.

## View it
Open `index.html` in a browser (double-click works). All links point to explicit `index.html` files, so it also works straight from disk.

## Files
- `index.html`, `about/index.html`, `sss/index.html`, `programs/index.html`, `approach/index.html`, `services/index.html`, `contact/index.html`
- `assets/css/style.css` - colours and fonts are variables at the top
- `assets/js/main.js` - menu, scroll animations, form validation

## Edit content
Open any page's HTML file and change the text. The navigation and footer are repeated in every HTML file, so a menu change must be made in each one. The contact form dropdown is in `contact/index.html`. To hide the "WEBSITE CONCEPT DEMO" pill, delete the `<div class="demo-pill">` line in each page.

## Publish on GitHub Pages
1. Create a repository and push this folder to the `main` branch.
2. Settings > Pages > Source: GitHub Actions.
3. The site appears at https://USERNAME.github.io/REPOSITORY/ (all links are relative, so the repo name doesn't matter).

## Notes
- The contact form only validates; it does not send anything. Connect a form service before launch.
- Placeholders to replace: logo emblem, founder portrait, services, email.
- Pages have `noindex` set; remove it when going live.

## Light / dark toggle
The header has a Light/Dark button. The colours for each theme are the CSS variables at the top of `assets/css/style.css` (the `:root[data-theme="dark"]` block holds the dark palette). The choice is remembered in the browser.
