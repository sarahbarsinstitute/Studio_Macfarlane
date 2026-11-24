/* Sarah Lauren: site behaviour. Content lives in index.html and js/data.js. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const src = f => "assets/images/originals/" + f;
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? "&body=" + encodeURIComponent(body) : ""}`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/* Size "17 × 20 cm" becomes { w: 17, h: 20 }; empty sizes return null. */
const cm = s => {
  const m = String(s || "").match(/([\d.]+)\s*[×x]\s*([\d.]+)/);
  return m ? { w: +m[1], h: +m[2] } : null;
};

const WORKS = ORIGINALS.filter(o => o.show !== false);
WORKS.forEach((o, i) => {
  o.i = i;
  o.dims = cm(o.size);
  o.dot = /^(sold|reserved)$/i.test(o.status || "");
  o.priceText = o.dot ? o.status : (/private/i.test(o.status || "") ? "Private collection" : (o.price || "Price on request"));
});

/* ---------- hero colour: try another with ?colour=indigo (see COLOURS in data.js) ---------- */
const pick = new URLSearchParams(location.search).get("colour");
const hue = (pick && COLOURS[pick]) || COLOURS[HERO_COLOUR];
if (hue) {
  document.documentElement.style.setProperty("--shu", hue[0]);
  document.documentElement.style.setProperty("--shu-deep", hue[1]);
}

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

/* ---------- the exhibition ---------- */
$("#ex-title").textContent = EXHIBITION.title;
$("#ex-sub").textContent = EXHIBITION.subtitle;
$("#ex-when").textContent = EXHIBITION.when;
const heroWork = WORKS.find(o => o.no === EXHIBITION.hero) || WORKS[0];
const heroImg = $("#heroimg");
heroImg.src = src(heroWork.hero || heroWork.file);
heroImg.alt = "Stipple drawing in black ink: " + heroWork.alt;
$("#loupe").setAttribute("aria-label", "Open " + heroWork.title + " in the viewer");

/* ---------- installation wall: works hung in a row, centred on one line ---------- */
const hang = $("#hang");
function hangWall() {
  hang.innerHTML = WORKS.map(o => {
    const d = o.dims || { h: 20, w: 20 * (o.ratio || .72) };
    return `<button class="hung" type="button" data-w="${o.i}" style="--w:${d.w};--h:${d.h}" aria-label="View ${esc(o.title)}">
      <span class="frame"><img src="${src(o.file)}" alt="${esc(o.alt)}" loading="lazy" data-ratio="${o.i}"></span>
      <span class="wall-label"><b>${esc(o.title)}</b>${o.year ? esc(o.year) : ""}${o.dot ? `<br><span class="dot" aria-hidden="true"></span>${esc(o.status)}` : ""}</span>
    </button>`;
  }).join("");
  /* works without a size take their proportions from the photograph */
  $$("img[data-ratio]", hang).forEach(img => {
    const set = () => {
      const o = WORKS[+img.dataset.ratio];
      if (o.dims || !img.naturalWidth) return;
      img.closest(".hung").style.setProperty("--w", (20 * img.naturalWidth / img.naturalHeight).toFixed(2));
    };
    img.complete ? set() : img.addEventListener("load", set, { once: true });
  });
}
hangWall();

/* A mouse wheel moves the wall sideways once the pointer is over it. */
const wall = $("#wall");
wall.addEventListener("wheel", e => {
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  const max = wall.scrollWidth - wall.clientWidth;
  const next = wall.scrollLeft + e.deltaY;
  if ((e.deltaY < 0 && wall.scrollLeft <= 0) || (e.deltaY > 0 && wall.scrollLeft >= max)) return;
  e.preventDefault();
  wall.scrollLeft = Math.max(0, Math.min(max, next));
}, { passive: false });
wall.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") wall.scrollBy({ left: 320, behavior: calm ? "auto" : "smooth" });
  if (e.key === "ArrowLeft") wall.scrollBy({ left: -320, behavior: calm ? "auto" : "smooth" });
});

/* ---------- checklist of works, with wall labels ---------- */
const list = $("#checklist"), filters = $("#filters");
let shown = WORKS;
const tomb = o => `
  <p class="t-artist">Sarah Lauren</p>
  <h3>${esc(o.title)}${o.year ? ", " + esc(o.year) : ""}</h3>
  <p class="t-med">${esc(o.medium)}</p>
  ${o.size ? `<p class="t-med">${esc(o.size)}</p>` : ""}
  <p class="t-status">${o.dot ? `<span class="dot" aria-hidden="true"></span>` : ""}${esc(o.priceText)}</p>`;

function drawList() {
  list.innerHTML = shown.map(o => `
    <li class="plate">
      <button class="pic" type="button" data-w="${o.i}" aria-label="View ${esc(o.title)}">
        <img src="${src(o.file)}" alt="${esc(o.alt)}" loading="lazy">
      </button>
      <div class="tomb">${tomb(o)}<button class="quiet" type="button" data-w="${o.i}">View work</button></div>
    </li>`).join("");
}
const cats = [...new Set(WORKS.map(o => o.cat))];
if (cats.length > 1) {
  filters.hidden = false;
  ["All works", ...cats].forEach((c, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.setAttribute("aria-pressed", i === 0);
    b.onclick = () => {
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      shown = i === 0 ? WORKS : WORKS.filter(o => o.cat === c);
      drawList();
    };
    filters.append(b);
  });
}
drawList();
wireMail();

/* ---------- artwork viewer ---------- */
const viewer = $("#viewer");
let cur = { w: 0, k: 0, room: false };

function stage(o, imgs) {
  if (cur.room && o.dims) {
    return `<div class="stage"><div class="room" id="room" style="--w:${o.dims.w};--h:${o.dims.h}">
      <span class="frame"><img src="${src(o.file)}" alt="${esc(o.alt)}"></span>
      <span class="bench" aria-hidden="true"></span>
      <p class="scale-note">Drawn to scale, framed, above a 120 cm bench</p>
    </div></div>`;
  }
  return `<div class="stage">
    <div class="view" title="Select to see full size"><img src="${src(imgs[cur.k])}" alt="${esc(o.alt)}${cur.k ? ", detail" : ""}"></div>
    ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((f, k) => `
      <button type="button" data-k="${k}" aria-label="${k ? "Detail " + k : "Whole drawing"}" aria-current="${k === cur.k}"><img src="${src(f)}" alt=""></button>`).join("")}</div>` : ""}
  </div>`;
}

function openViewer(w, k = 0, room = false) {
  const o = WORKS[w], imgs = [o.file, ...(o.details || [])];
  cur = { w, k: Math.max(0, Math.min(k, imgs.length - 1)), room: room && !!o.dims };
  const row = (a, b) => b ? `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>` : "";
  viewer.innerHTML = `
    ${stage(o, imgs)}
    <div class="label">
      <button class="quiet close" type="button" data-x>Close</button>
      <p class="t-artist">Sarah Lauren</p>
      <h2>${esc(o.title)}</h2>
      ${o.year ? `<p class="t-year">${esc(o.year)}</p>` : ""}
      <dl class="spec">${row("Medium", o.medium)}${row("Size", o.size)}${row("Category", o.cat)}</dl>
      ${o.note ? `<p class="note">${esc(o.note)}</p>` : ""}
      <p class="price">${o.dot ? `<span class="dot" aria-hidden="true"></span>` : ""}${esc(o.priceText)}</p>
      <a class="btn" data-mail="Enquiry: ${esc(o.title)}${o.year ? ", " + esc(o.year) : ""}">Enquire about this work</a>
      ${o.dims ? `<button class="quiet roomtoggle" type="button" data-room>${cur.room ? "Back to the drawing" : "See it on a wall"}</button>` : ""}
      <nav>
        <button class="quiet" type="button" data-d="-1">Previous work</button>
        <button class="quiet" type="button" data-d="1">Next work</button>
      </nav>
    </div>`;
  wireMail(viewer);
  if (!viewer.open) viewer.showModal();
  if (cur.room) scaleRoom();
}

/* The room shows 260 cm of wall above the floor; the work hangs centred 150 cm up. */
function scaleRoom() {
  const room = $("#room");
  if (!room) return;
  const o = WORKS[cur.w], H = room.clientHeight, floor = Math.round(H * .1), k = (H - floor) / 260;
  const framed = o.dims.h + 2 * 5 + 2 * 1.5;
  room.style.setProperty("--k", k + "px");
  room.style.setProperty("--floor", floor + "px");
  room.style.setProperty("--lift", ((150 - framed / 2) * k) + "px");
}
addEventListener("resize", scaleRoom);

const step = d => openViewer((cur.w + d + WORKS.length) % WORKS.length, 0, false);

document.addEventListener("click", e => {
  if (viewer.contains(e.target)) return;
  const t = e.target.closest("[data-w]");
  if (t) openViewer(+t.dataset.w);
});
viewer.addEventListener("click", e => {
  if (e.target.closest("[data-x]")) return viewer.close();
  const n = e.target.closest("[data-d]");
  if (n) return step(+n.dataset.d);
  const th = e.target.closest("[data-k]");
  if (th) return openViewer(cur.w, +th.dataset.k);
  if (e.target.closest("[data-room]")) return openViewer(cur.w, 0, !cur.room);
  const v = e.target.closest(".view");
  if (v) v.classList.toggle("zoom");
});
viewer.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});
viewer.addEventListener("close", () => { document.body.style.overflow = ""; });
viewer.addEventListener("cancel", () => { document.body.style.overflow = ""; });
new MutationObserver(() => { document.body.style.overflow = viewer.open ? "hidden" : ""; }).observe(viewer, { attributes: true, attributeFilter: ["open"] });

/* ---------- hero loupe ---------- */
const loupe = $("#loupe");
if (loupe) {
  const lens = $(".lens", loupe), ZOOM = 2.8;
  loupe.addEventListener("click", () => openViewer(heroWork.i));
  loupe.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const r = heroImg.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, s = lens.offsetWidth / 2;
    lens.style.backgroundImage = `url("${heroImg.currentSrc || heroImg.src}")`;
    lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
    lens.style.backgroundPosition = `${s - x * ZOOM}px ${s - y * ZOOM}px`;
    lens.style.transform = `translate(${x - s}px, ${y - s}px)`;
    lens.classList.add("on");
  });
  loupe.addEventListener("pointerleave", () => lens.classList.remove("on"));
}

/* ---------- header: background on scroll, current section underlined ---------- */
const bar = $(".bar");
const onScroll = () => bar.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
if ("IntersectionObserver" in window) {
  const navs = $$("#links a");
  const navObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navs.forEach(a => a.classList.toggle("here", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  navs.forEach(a => { const t = $(a.getAttribute("href")); if (t) navObs.observe(t); });
}

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
  if (e.target.tagName !== "IMG" || viewer.contains(e.target)) return;
  (e.target.closest(".plate, .hung, figure") || e.target).remove();
}, true);
