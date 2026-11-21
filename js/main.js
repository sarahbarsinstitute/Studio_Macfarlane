/* Sarah Lauren: site behaviour. Content lives in index.html and js/data.js. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const src = f => "assets/images/originals/" + f;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? "&body=" + encodeURIComponent(body) : ""}`;

const WORKS = ORIGINALS.filter(o => o.show !== false);
WORKS.forEach((o, i) => { o.i = i; o.label = "Nº " + o.no; });

/* ---------- contact email ---------- */
function wireMail(root = document) {
  $$("[data-mail]", root).forEach(a => {
    if (EMAIL) {
      a.href = mailto(a.dataset.mail);
      if (a.hasAttribute("data-show")) a.textContent = EMAIL;
    } else {
      a.removeAttribute("href");
      a.classList.add("off");
      if (a.hasAttribute("data-show")) a.textContent = "Email to be added";
    }
  });
}
if (!EMAIL) $("#setup").hidden = false;

/* ---------- works ---------- */
const works = $("#works"), filters = $("#filters");
let shown = WORKS;

const row = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : "";
const spec = o => `<dl class="spec">${row("Medium", o.medium)}${row("Size", o.size)}${row("Year", o.year)}${row("Availability", o.status)}</dl>`;
const enquire = o => `<a class="quiet-link" data-mail="Enquiry: ${o.label}, ${o.title}">Enquire about this drawing</a>`;
const shot = (o, k, cls, alt) => `
  <button class="shot ${cls}" type="button" data-w="${o.i}" data-k="${k}" aria-label="View ${k ? "detail " + k + " of " : ""}${o.label}, ${o.title}">
    <img src="${src(k ? o.details[k - 1] : o.file)}" alt="${alt}" loading="lazy">
  </button>`;

function draw() {
  const feat = shown.filter(o => o.feature), rest = shown.filter(o => !o.feature);
  works.innerHTML = feat.map(o => `
    <article class="feature">
      ${shot(o, 0, "f-main", o.alt)}
      <div class="f-info">
        <p class="no">${o.label}</p>
        <h3>${o.title}</h3>
        ${o.note ? `<p>${o.note}</p>` : ""}
        ${spec(o)}
        ${enquire(o)}
      </div>
      ${(o.details || []).slice(0, 3).map((f, k) => shot(o, k + 1, "f-d" + (k + 1), `Detail ${k + 1} of ${o.label}`)).join("")}
    </article>`).join("") + (rest.length ? `<div class="sequence">${rest.map(o => `
      <article class="plate">
        ${shot(o, 0, "", o.alt)}
        <p class="cap"><span class="no">${o.label}</span> ${o.title}${[o.medium, o.size, o.year].filter(Boolean).map(x => ", " + x).join("")}</p>
      </article>`).join("")}</div>` : "");
  wireMail(works);
}

const cats = [...new Set(WORKS.map(o => o.cat))];
if (cats.length > 1) {
  filters.hidden = false;
  ["All", ...cats].forEach((c, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.setAttribute("aria-pressed", i === 0);
    b.onclick = () => {
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      shown = c === "All" ? WORKS : WORKS.filter(o => o.cat === c);
      draw();
    };
    filters.append(b);
  });
}
draw();
wireMail();

/* ---------- viewer ---------- */
const viewer = $("#viewer");
let cur = { w: 0, k: 0 };

function openViewer(w, k) {
  const o = WORKS[w], imgs = [o.file, ...(o.details || [])];
  cur = { w, k: (k + imgs.length) % imgs.length };
  const label = imgs.length > 1 ? (cur.k === 0 ? "Whole drawing" : `Detail ${cur.k} of ${imgs.length - 1}`) : "";
  viewer.innerHTML = `
    <div class="view" title="Select to see full size"><img src="${src(imgs[cur.k])}" alt="${o.alt || o.title}"></div>
    <div class="info">
      <p class="no">${o.label}</p>
      <h2>${o.title}</h2>
      ${o.note ? `<p>${o.note}</p>` : ""}
      ${spec(o)}
      ${enquire(o)}
      <p class="count">${label}</p>
      <nav>
        <button type="button" data-d="-1">Previous</button><button type="button" data-d="1">Next</button>
        <button type="button" data-x>Close</button>
      </nav>
    </div>`;
  wireMail(viewer);
  if (!viewer.open) viewer.showModal();
}
/* Previous and Next step through a drawing's images, then on to the neighbouring drawing. */
function step(d) {
  const n = 1 + (WORKS[cur.w].details || []).length, k = cur.k + d;
  if (k >= 0 && k < n) return openViewer(cur.w, k);
  const w = (cur.w + d + WORKS.length) % WORKS.length;
  openViewer(w, d > 0 ? 0 : (WORKS[w].details || []).length);
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-w]");
  if (t) openViewer(+t.dataset.w, +t.dataset.k);
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

/* ---------- hero loupe ---------- */
const loupe = $("#loupe");
if (loupe) {
  const lens = $(".lens", loupe), img = $("img", loupe), ZOOM = 2.8;
  const heroIndex = WORKS.findIndex(o => o.no === "06");
  loupe.addEventListener("click", () => openViewer(heroIndex < 0 ? 0 : heroIndex, 0));
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

/* ---------- header gains a background once the page scrolls ---------- */
const bar = $(".bar");
const onScroll = () => bar.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const menu = $("#menu"), links = $("#links");
menu.onclick = () => menu.setAttribute("aria-expanded", links.classList.toggle("open"));
links.onclick = e => {
  if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); }
};

/* ---------- process film: loads and plays only in view; never autoplays for reduced motion ---------- */
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

/* ---------- enquiry form ---------- */
$("#enq").onsubmit = e => {
  e.preventDefault();
  if (!EMAIL) return;
  const f = new FormData(e.target);
  location.href = mailto("Enquiry: " + f.get("type"),
    `Name: ${f.get("name")}\nCompany: ${f.get("org")}\n\n${f.get("msg")}`);
};
if (!EMAIL) {
  $("#enq .btn").disabled = true;
  $("#enq .formnote").textContent = "The enquiry form is switched off until a contact email is added in js/data.js.";
}

/* An image that fails to load is removed with its frame, so nothing unfinished shows. */
document.addEventListener("error", e => {
  if (e.target.tagName !== "IMG") return;
  (e.target.closest("figure, .plate, .shot") || e.target).remove();
}, true);
