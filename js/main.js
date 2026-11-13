/* Sarah Lauren: site behaviour. Content lives in index.html and js/data.js. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const no = i => "Nº " + String(i + 1).padStart(2, "0");
const src = f => "assets/images/originals/" + f;
const mailto = (subject, body) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? "&body=" + encodeURIComponent(body) : ""}`;

ORIGINALS.forEach((o, i) => { o.n = i; });

/* ---------- email links ---------- */
$$("[data-mail]").forEach(a => {
  a.href = mailto(a.dataset.mail);
  if (a.hasAttribute("data-show")) a.textContent = EMAIL;
});

/* ---------- works ---------- */
const works = $("#works"), filters = $("#filters");
let shown = ORIGINALS;

function draw() {
  works.innerHTML = shown.map(o => `
    <article class="work">
      <button class="work-main" data-w="${o.n}" data-i="0" aria-label="View ${no(o.n)}, ${o.title}">
        <img src="${src(o.file)}" alt="${o.alt || "Black ink drawing, " + no(o.n)}" loading="lazy">
      </button>
      <div class="work-info">
        <p class="no">${no(o.n)}</p>
        <h3>${o.title}</h3>
        <p>${o.note || ""}</p>
        <dl class="spec">
          <div><dt>Medium</dt><dd>${o.medium}</dd></div>
          <div><dt>Dimensions</dt><dd>${o.size}</dd></div>
          <div><dt>Year</dt><dd>${o.year}</dd></div>
          <div><dt>Availability</dt><dd>${o.status}</dd></div>
        </dl>
        ${(o.details || []).length ? `<div class="thumbs">${o.details.map((f, k) => `
          <button data-w="${o.n}" data-i="${k + 1}" aria-label="View detail ${k + 1} of ${no(o.n)}">
            <img src="${src(f)}" alt="Detail ${k + 1} of ${no(o.n)}" loading="lazy">
          </button>`).join("")}</div>` : ""}
        <a class="link" href="${mailto("Enquiry: " + no(o.n) + ", " + o.title)}">Enquire about this work</a>
      </div>
    </article>`).join("");
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

/* ---------- viewer ---------- */
const viewer = $("#viewer");
let cur = { w: 0, i: 0 };

function openViewer(w, i) {
  const o = ORIGINALS[w], imgs = [o.file, ...(o.details || [])];
  cur = { w, i: (i + imgs.length) % imgs.length };
  const label = cur.i === 0 ? "Full work" : `Detail ${cur.i} of ${imgs.length - 1}`;
  viewer.innerHTML = `
    <div class="view" title="Select to toggle full size"><img src="${src(imgs[cur.i])}" alt="${o.alt || o.title}"></div>
    <div class="info">
      <p class="no">${no(w)}</p>
      <h2>${o.title}</h2>
      <p>${o.note || ""}</p>
      <dl class="spec">
        <div><dt>Medium</dt><dd>${o.medium}</dd></div>
        <div><dt>Dimensions</dt><dd>${o.size}</dd></div>
        <div><dt>Year</dt><dd>${o.year}</dd></div>
        <div><dt>Availability</dt><dd>${o.status}</dd></div>
      </dl>
      <a class="link" href="${mailto("Enquiry: " + no(w) + ", " + o.title)}">Enquire about this work</a>
      <p class="count">${label}</p>
      <nav>
        ${imgs.length > 1 ? `<button data-d="-1">Previous</button><button data-d="1">Next</button>` : ""}
        <button data-x>Close</button>
      </nav>
    </div>`;
  if (!viewer.open) viewer.showModal();
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-w]");
  if (t) openViewer(+t.dataset.w, +t.dataset.i);
});
viewer.addEventListener("click", e => {
  if (e.target.closest("[data-x]") || e.target === viewer) return viewer.close();
  const n = e.target.closest("[data-d]");
  if (n) return openViewer(cur.w, cur.i + +n.dataset.d);
  const v = e.target.closest(".view");
  if (v) v.classList.toggle("zoom");
});
viewer.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") openViewer(cur.w, cur.i + 1);
  if (e.key === "ArrowLeft") openViewer(cur.w, cur.i - 1);
});

/* ---------- hero loupe: look closer ---------- */
const loupe = $("#loupe");
if (loupe) {
  const lens = $(".lens", loupe), img = $("img", loupe), ZOOM = 2.6;
  loupe.addEventListener("click", () => openViewer(0, 0));
  loupe.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const r = img.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const s = lens.offsetWidth / 2;
    lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
    lens.style.backgroundPosition = `${s - x * ZOOM}px ${s - y * ZOOM}px`;
    lens.style.transform = `translate(${x - s}px, ${y - s}px)`;
    lens.classList.add("on");
  });
  loupe.addEventListener("pointerleave", () => lens.classList.remove("on"));
}

/* ---------- mobile menu ---------- */
const menu = $("#menu"), links = $("#links");
menu.onclick = () => menu.setAttribute("aria-expanded", links.classList.toggle("open"));
links.onclick = e => {
  if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); }
};

/* ---------- forms ---------- */
$("#enq").onsubmit = e => {
  e.preventDefault();
  const f = new FormData(e.target);
  location.href = mailto("Collaboration enquiry: " + f.get("type"),
    `Name: ${f.get("name")}\nOrganisation: ${f.get("org")}\n\n${f.get("msg")}`);
};
const news = $("#news");
if (FORM_ID) {
  news.action = "https://formspree.io/f/" + FORM_ID;
  news.method = "post";
} else {
  news.onsubmit = e => {
    e.preventDefault();
    location.href = mailto("Journal: please add me", "Please add this address to the journal list: " + new FormData(news).get("email"));
  };
}

/* An image that fails to load is removed along with its frame, so nothing unfinished shows. */
document.addEventListener("error", e => {
  if (e.target.tagName !== "IMG") return;
  (e.target.closest("figure, .work, .thumbs button") || e.target).remove();
}, true);
