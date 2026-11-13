# Sarah Lauren website

A single-page static site: plain HTML, CSS and JavaScript. No build step, no database, no frameworks. Works on GitHub Pages as it is; every path is relative.

## Structure
- `index.html`: all page text and sections (Cover, Art, Objects, Collaborations, Atelier, About, Contact).
- `js/data.js`: your contact email and the list of artworks. This is the main file you edit.
- `css/style.css`, `js/main.js`: design and behaviour.
- `assets/images/originals/`: artwork images. `assets/images/atelier/`: macro details and the video poster.
- `assets/video/process.mp4`: the time-lapse shown in Atelier.
- `assets/images/site/`: favicon and `share.jpg` (the preview shown when the link is shared).

## Before publishing
1. **Contact email (required).** In `js/data.js`, set `EMAIL`. Until you do, the site shows a "Setup needed" bar, and enquiry links and the enquiry form are switched off.
2. In `js/data.js`, give each work its title, and add size and year where they are blank.
3. Read the About and Atelier text in `index.html` and adjust it so it is accurate and in your own words.

## Adding a work
1. Save the image as a JPG (about 2000 px on the long edge) in `assets/images/originals/`, plus any close-ups.
2. In `js/data.js`, copy a block inside `ORIGINALS`, paste it after a comma, and edit it. Works are numbered Nº 01, Nº 02 in the order they appear.
3. `feature: true` presents a work large with up to three details. Other works follow in the staggered sequence.
4. The cover uses `original-01-tight.jpg` (the drawing with no paper margin). To change the cover, replace that file or its path in the cover section of `index.html`.

## Concept studies
The three studies in Collaborations are built in HTML and CSS from your own drawings and are labelled as speculative. Replace them with photographed samples when they exist.

## GitHub Pages
1. On github.com create a new public repository, for example `sarah-lauren`.
2. Upload every file and folder from this project (Add file > Upload files) and commit.
3. Go to Settings > Pages. Under Build and deployment choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
4. Your site appears at `https://USERNAME.github.io/sarah-lauren/`.

## Custom domain
1. In Settings > Pages enter your domain and Save.
2. At your registrar add A records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME for `www` to `USERNAME.github.io`.
3. Wait for DNS (up to a day), then tick Enforce HTTPS.
