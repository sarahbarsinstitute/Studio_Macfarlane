# Sarah Lauren website

A single-page static site: plain HTML, CSS and JavaScript. No build step, no database.

## Structure
- `index.html`: all page text and sections (Art, Objects, Collaborations, Atelier, About, footer).
- `js/data.js`: your contact email, newsletter form ID and artwork list. This is the main file you edit.
- `css/style.css`, `js/main.js`: design and behaviour.
- `assets/images/originals/`: artwork images. `assets/images/atelier/`: macro details and the video poster.
- `assets/video/process.mp4`: the time-lapse shown in Atelier.
- `assets/images/site/`: favicon and `share.jpg` (the preview shown when the link is shared).

## Before publishing
1. In `js/data.js`, replace `studio@yourdomain.com` with your real email. Every enquiry and register-interest link uses it.
2. Optional: create a free Formspree form and paste its ID into `FORM_ID` so newsletter signups are collected for you. If left empty, Subscribe opens an email to you instead.
3. In `js/data.js`, give Nº 01 its title and check its details and availability.
4. Read the About text in `index.html` and adjust it so it is in your own words.

## Adding a work
1. Save the image as a JPG (about 2000 px on the long edge) in `assets/images/originals/`, plus any close-ups.
2. In `js/data.js`, copy the existing block inside `ORIGINALS`, paste it after a comma, and edit it. Works are numbered Nº 01, Nº 02 in the order they appear.
3. Filter buttons appear automatically once works use more than one `cat`.
4. The homepage image is the first work in the list. To feature a different one, change the image path in the hero section of `index.html`.

## Later sections
Objects, Editions and Workshops are each a short "register interest" note for now. When there is something real to show, replace the note in `index.html` with images and details. To add a section, copy an existing `<section>`, give it a new `id`, and add a link in the `<nav>`.

## GitHub Pages
1. On github.com create a new public repository, for example `sarah-lauren`.
2. Upload every file and folder from this project (Add file > Upload files) and commit.
3. Go to Settings > Pages. Under Build and deployment choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
4. Your site appears at `https://USERNAME.github.io/sarah-lauren/`. All paths are relative, so it works in a subfolder and on a custom domain.

## Custom domain
1. In Settings > Pages enter your domain and Save.
2. At your registrar add A records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME for `www` to `USERNAME.github.io`.
3. Wait for DNS (up to a day), then tick Enforce HTTPS.

## Pre-publication checklist
- Every nav link scrolls to its section; the mobile menu opens and closes.
- Open the artwork: Previous, Next, Escape and the full-size toggle all work.
- The enquiry form opens your email app with the details filled in.
- The email address in the footer is yours.
- Test on a phone and a desktop browser.
