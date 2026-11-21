/* Sarah Lauren: site behaviour. Content lives in index.html and js/data.js. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const no = i => "Nº " + String(i + 1).padStart(2, "0");
const src = f => "assets/images/originals/" + f;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? "&body=" + encodeURIComponent(body) : ""}`;

ORIGINALS.forEach((o, i) => { o.n = i; });

/* ---------- contact email ---------- */
function wireMail(root = document) {
  $$("[data-mail]", root).forEach(a => {
    if (EMAIL) {
      a.href = mailto(a.dataset.mail);
      if (a.hasAttribute("data-show")) a.textContent = EMAIL;
    } else {
      a.removeAttribute("href");
      a.classList.add("off");
      a.setAttribute("aria-disabled", "true");
      a.title = "Add the studio contact email in js/data.js before publishing";
      if (a.hasAttribute("data-show")) a.textContent = "Contact details to be added";
      else if (a.textContent.trim().length === 0) a.textContent = "Contact details to be added";
    }
  });
}

/* ---------- works ---------- */
const works = $("#works"), filters = $("#filters");
let shown = ORIGINALS;

const row = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : "";
const spec = o => `<dl class="spec">${row("Medium", o.medium)}${row("Dimensions", o.size)}${row("Year", o.year)}${row("Availability", o.status)}</dl>`;
const enquire = o => `<a class="arrow" data-mail="Enquiry: ${no(o.n)}, ${o.title}">Enquire about this work</a>`;
const shot = (o, i, cls, alt) => `
  <button class="shot ${cls}" data-w="${o.n}" data-i="${i}" aria-label="View ${i ? "detail " + i + " of " : ""}${no(o.n)}, ${o.title}">
    <img src="${src(i ? o.details[i - 1] : o.file)}" alt="${alt}" loading="lazy">
  </button>`;

function draw() {
  const feat = shown.filter(o => o.feature), rest = shown.filter(o => !o.feature);
  works.innerHTML = feat.map(o => `
    <article class="feature">
      ${shot(o, 0, "f-main", o.alt || "Black ink drawing, " + no(o.n))}
      <div class="f-info">
        <p class="no">${no(o.n)}</p>
        <h3>${o.title}</h3>
        ${o.note ? `<p>${o.note}</p>` : ""}
        ${spec(o)}
        ${enquire(o)}
      </div>
      ${(o.details || []).slice(0, 3).map((f, k) => shot(o, k + 1, "f-d" + (k + 1), `Detail ${k + 1} of ${no(o.n)}`)).join("")}
    </article>`).join("") + (rest.length ? `<div class="sequence">${rest.map(o => `
      <article class="plate">
        ${shot(o, 0, "", o.alt || "Black ink drawing, " + no(o.n))}
        <p class="cap"><span class="no">${no(o.n)}</span> ${o.title}${[o.medium, o.size, o.year].filter(Boolean).map(x => " · " + x).join("")}</p>
      </article>`).join("")}</div>` : "");
  wireMail(works);
  watch(works);
}

/* ---------- gentle reveal on scroll ---------- */
const io = "IntersectionObserver" in window && !calm
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" })
  : null;
if (io) document.documentElement.classList.add("anim");
function watch(root) {
  $$(".reveal, .feature > *, .plate", root).forEach(el => { if (io) { el.classList.add("reveal"); io.observe(el); } else el.classList.add("in"); });
}

const cats = [...new Set(ORIGINALS.map(o => o.cat))];
if (cats.length > 1) {
  filters.hidden = false;
  ["All", ...cats].forEach((c, i) => {
    const b = document.createElement("button");
    b.textContent = c;
    b.setAttribute("aria-pressed", i === 0);
    b.onclick = () => {
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      shown = c === "All" ? ORIGINALS : ORIGINALS.filter(o => o.cat === c);
      draw();
    };
    filters.append(b);
  });
}
draw();
wireMail();
watch(document);

/* ---------- viewer ---------- */
const viewer = $("#viewer");
let cur = { w: 0, i: 0 };

function openViewer(w, i) {
  const o = ORIGINALS[w], imgs = [o.file, ...(o.details || [])];
  cur = { w, i: (i + imgs.length) % imgs.length };
  const label = imgs.length > 1 ? (cur.i === 0 ? "Full work" : `Detail ${cur.i} of ${imgs.length - 1}`) : "";
  viewer.innerHTML = `
    <div class="view" title="Select to toggle full size"><img src="${src(imgs[cur.i])}" alt="${o.alt || o.title}"></div>
    <div class="info">
      <p class="no">${no(w)}</p>
      <h2>${o.title}</h2>
      ${o.note ? `<p>${o.note}</p>` : ""}
      ${spec(o)}
      ${enquire(o)}
      <p class="count">${label}</p>
      <nav>
        <button data-d="-1">Previous</button><button data-d="1">Next</button>
        <button data-x>Close</button>
      </nav>
    </div>`;
  wireMail(viewer);
  if (!viewer.open) viewer.showModal();
}
/* Previous and Next step through a work's images, then on to the neighbouring work. */
function step(d) {
  const n = 1 + (ORIGINALS[cur.w].details || []).length, i = cur.i + d;
  if (i >= 0 && i < n) return openViewer(cur.w, i);
  const w = (cur.w + d + ORIGINALS.length) % ORIGINALS.length;
  openViewer(w, d > 0 ? 0 : (ORIGINALS[w].details || []).length);
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-w]");
  if (t) openViewer(+t.dataset.w, +t.dataset.i);
});
viewer.addEventListener("click", e => {
  if (e.target.closest("[data-x]") || e.target === viewer) return viewer.close();
  const n = e.target.closest("[data-d]");
  if (n) return step(+n.dataset.d);
  const v = e.target.closest(".view");
  if (v) v.classList.toggle("zoom");
});
viewer.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* ---------- cover loupe: look closer ---------- */
const loupe = $("#loupe");
if (loupe) {
  const lens = $(".lens", loupe), img = $("img", loupe), ZOOM = 2.6;
  loupe.addEventListener("click", () => openViewer(0, 0));
  loupe.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const r = img.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, s = lens.offsetWidth / 2;
    lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
    lens.style.backgroundPosition = `${s - x * ZOOM}px ${s - y * ZOOM}px`;
    lens.style.transform = `translate(${x - s}px, ${y - s}px)`;
    lens.classList.add("on");
  });
  loupe.addEventListener("pointerleave", () => lens.classList.remove("on"));
}

/* ---------- header: small wordmark appears once the masthead has scrolled away ---------- */
const bar = $("#bar"), mast = $(".masthead");
if ("IntersectionObserver" in window && mast) {
  new IntersectionObserver(([e]) => bar.classList.toggle("scrolled", !e.isIntersecting), { rootMargin: "-70px 0px 0px 0px" }).observe(mast);
} else bar.classList.add("scrolled");

const menu = $("#menu"), links = $("#links");
menu.onclick = () => menu.setAttribute("aria-expanded", links.classList.toggle("open"));
links.onclick = e => {
  if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); }
};

/* ---------- process film: loads and plays only when in view; never autoplays for reduced motion ---------- */
const film = $("#film"), toggle = $("#filmtoggle");
if (film) {
  const setLabel = () => { toggle.textContent = film.paused ? "Play" : "Pause"; };
  toggle.hidden = false;
  toggle.onclick = () => { film.paused ? film.play() : film.pause(); film.dataset.user = "1"; };
  film.addEventListener("play", setLabel);
  film.addEventListener("pause", setLabel);
  if (!calm && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      if (film.dataset.user) return;
      e.isIntersecting ? film.play().catch(() => {}) : film.pause();
    }, { threshold: 0.35 }).observe(film);
  }
}

/* ---------- contact configuration ---------- */
/* Add the preferred studio email to js/data.js before publishing.
   Until then, contact links remain visibly inactive rather than opening a broken form. */
