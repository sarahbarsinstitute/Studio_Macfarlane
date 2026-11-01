# Studio Macfarlane website

A single-page static site: plain HTML, CSS and JavaScript. No build step, no database.

## Structure
- `index.html`: all page text and sections (Originals, Editions, Commercial, Atelier, Learn, Objects, About, Journal/newsletter).
- `js/data.js`: your artwork list and the studio email. This is the main file you edit.
- `css/style.css`, `js/main.js`: design and behaviour.
- `assets/images/originals|editions|atelier|objects|portraits|site/`: your images.

## Replace placeholders
1. Save images as JPG (about 2000px on the long edge, under 600 KB) in `assets/images/originals/`. Use the names in `js/data.js` (`original-01.jpg`...), plus `hero.jpg` and `hero-detail.jpg` for the homepage. Placeholders disappear when a file is found.
2. In `js/data.js`, edit each artwork's `title`, `medium`, `size`, `year`, `status`, `note`, `cat` (the filter category) and `ratio` (for example `3/4` or `4/3`). Copy a line to add a work.
3. Edit `EDITIONS` the same way. Edit Atelier, Objects and About text and images directly in `index.html`. Replace `studio@yourdomain.com` and `YOUR_FORM_ID` (a free Formspree form) throughout, and add a 1200x630 `assets/images/site/share.jpg`.
4. To add a section, copy an existing `<section>` in `index.html`, give it a new `id`, and add a link in the `<nav>`.

## GitHub repository and Pages
1. On github.com create a new public repository, for example `studio-macfarlane`.
2. Upload every file and folder from this project (Add file > Upload files) and commit.
3. Go to Settings > Pages. Under Build and deployment choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
4. Your site appears at `https://USERNAME.github.io/studio-macfarlane/`. All paths here are relative, so it works in a subfolder and on a custom domain.

## Custom domain
1. In Settings > Pages enter your domain and Save.
2. At your registrar add A records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME for `www` to `USERNAME.github.io`.
3. Wait for DNS (up to a day), then tick Enforce HTTPS.

## Pre-publication checklist
- Every nav link scrolls to its section; mobile menu opens and closes.
- Open each artwork: arrows, Escape and full-size toggle work with the keyboard.
- Filters work; the enquiry form opens your email app with the details filled in.
- Placeholder email, form ID, titles and "to be confirmed" text are replaced or accurate.
- Alt text describes each image; images load quickly on mobile data.
- Share preview and favicon look right; test in a phone and a desktop browser.
