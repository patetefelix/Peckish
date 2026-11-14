/* Peckish — demo interactions. No real checkout, orders or payments. */
(function () {
  const D = window.PECKISH;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = (n) => "$" + Number(n).toFixed(n % 1 ? 2 : 0);
  const ICON_PLUS = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 2v14M2 9h14"/></svg>';

  /* ---------- catalog helpers ---------- */
  const findItem = (slug) =>
    D.sauces.find((s) => s.slug === slug) ||
    D.burgers.find((b) => b.slug === slug) ||
    (slug === D.pack.slug ? { ...D.pack, image: "sauce-rooster.webp" } : null);

  const diamonds = (lvl) => "◆".repeat(lvl) + "◇".repeat(5 - lvl);

  /* ---------- render sauce cards ---------- */
  function sauceCard(s, opts = {}) {
    const theme = opts.theme ? ` theme-${opts.theme}` : "";
    return `
      <article class="sauce${theme} reveal" data-slug="${s.slug}">
        <a class="sauce-media" href="product.html?sauce=${s.slug}" aria-label="View ${s.name}">
          <img src="${s.image}" alt="Peckish ${s.name} hot sauce bottle" loading="lazy" decoding="async">
        </a>
        <button class="sauce-add" data-add="${s.slug}" aria-label="Add ${s.name} to bag">${ICON_PLUS}</button>
        <div class="sauce-body">
          <div>
            <h3 class="sauce-name"><a href="product.html?sauce=${s.slug}">${s.name}</a></h3>
            <p class="sauce-notes">${s.notes}</p>
            <p class="sauce-mood">${s.mood}</p>
            <p class="sauce-price">${money(s.price)}<span class="ast">*</span></p>
          </div>
          <div class="lvl" aria-label="Heat level ${s.level} of 5"><small>LVL</small>${s.no}</div>
        </div>
      </article>`;
  }

  $$("[data-sauce-grid]").forEach((grid) => {
    const exclude = grid.dataset.exclude;
    const themes = (grid.dataset.themes || "").split(",").filter(Boolean);
    const limit = Number(grid.dataset.limit || 99);
    let list = D.sauces.filter((s) => s.slug !== exclude);
    if (grid.dataset.pick) list = grid.dataset.pick.split(",").map((slug) => D.sauces.find((s) => s.slug === slug)).filter(Boolean);
    list = list.slice(0, limit);
    const html = list.map((s, i) => sauceCard(s, { theme: themes[i] })).join("");
    const flock = grid.dataset.flock !== undefined ? `
      <article class="flock reveal">
        <p class="eyebrow">Can’t pick one?</p>
        <h3 class="h3">The full flock.</h3>
        <p>All five heat levels. One glorious box. Zero commitment issues.</p>
        <button class="btn btn-ink" data-add="${D.pack.slug}">Meet the 5 pack ↗</button>
      </article>` : "";
    grid.innerHTML = html + flock;
  });

  /* ---------- sort by heat toggle ---------- */
  $$("[data-sort]").forEach((btn) => {
    let dir = 1;
    btn.addEventListener("click", () => {
      dir *= -1;
      const grid = $(btn.dataset.sort);
      const cards = $$(".sauce", grid).sort((a, b) => {
        const la = D.sauces.find((s) => s.slug === a.dataset.slug).level;
        const lb = D.sauces.find((s) => s.slug === b.dataset.slug).level;
        return (la - lb) * dir;
      });
      cards.forEach((c) => grid.insertBefore(c, grid.firstChild));
      cards.reverse().forEach((c) => grid.appendChild(c));
      btn.textContent = dir === 1 ? "Sort by: heat, obviously ↕" : "Sort by: heat, hottest first ↕";
    });
  });

  /* ---------- PDP ---------- */
  const pdp = $("[data-pdp]");
  if (pdp) {
    const params = new URLSearchParams(location.search);
    const s = D.sauces.find((x) => x.slug === params.get("sauce")) || D.sauces[2];
    document.title = `${s.name} — Peckish Hot Sauce`;
    pdp.dataset.theme = s.theme;
    const idx = D.sauces.indexOf(s);
    const prev = D.sauces[(idx + 4) % 5], next = D.sauces[(idx + 1) % 5];
    const set = (sel, v) => $$(sel, pdp).forEach((el) => (el.innerHTML = v));
    set("[data-f=counter]", `${s.no} / 05`);
    set("[data-f=level]", `Level ${s.no} &nbsp;${diamonds(s.level)}&nbsp; ${s.heatWord}`);
    set("[data-f=name]", s.name + ".");
    set("[data-f=tagline]", s.tagline);
    set("[data-f=intro]", s.intro);
    set("[data-f=tastes]", `Tastes like: ${s.tastes}`);
    set("[data-f=price]", `${money(s.price)}.00<span class="ast">*</span>`);
    set("[data-f=pairs]", s.pairsWith);
    set("[data-f=flavor-h]", s.flavor[0]); set("[data-f=flavor-p]", s.flavor[1]);
    set("[data-f=heat-h]", s.heat[0]); set("[data-f=heat-p]", s.heat[1]);
    set("[data-f=pair-h]", s.pairing[0]); set("[data-f=pair-p]", s.pairing[1]);
    const img = $("[data-f=image]", pdp);
    img.src = s.image; img.alt = `Peckish ${s.name} hot sauce bottle`;
    $$("[data-add-pdp]", pdp).forEach((b) => (b.dataset.add = s.slug));
    $("[data-f=prev]").href = `product.html?sauce=${prev.slug}`;
    $("[data-f=next]").href = `product.html?sauce=${next.slug}`;
    $("[data-f=prev]").title = prev.name; $("[data-f=next]").title = next.name;

    // related: the other four, themed
    const more = $("[data-more]");
    if (more) {
      const others = D.sauces.filter((x) => x.slug !== s.slug).slice(0, 3);
      const themes = ["yellow", "red", "black"];
      more.innerHTML = others.map((x, i) => sauceCard(x, { theme: themes[i] })).join("");
    }
    // tabs
    $$(".pdp-tabs button").forEach((t) =>
      t.addEventListener("click", () => {
        $$(".pdp-tabs button").forEach((b) => b.setAttribute("aria-selected", b === t));
        const target = $("#facts-" + t.dataset.tab);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
      })
    );
    // qty
    let q = 1;
    const out = $("[data-qty]");
    $("[data-qty-minus]").addEventListener("click", () => { q = Math.max(1, q - 1); out.value = q; });
    $("[data-qty-plus]").addEventListener("click", () => { q = Math.min(12, q + 1); out.value = q; });
    pdp.addEventListener("click", (e) => {
      const b = e.target.closest("[data-add-pdp]");
      if (b) { addToBag(s.slug, q); }
    });
  }

  /* ---------- Bag (browser-local demo) ---------- */
  const KEY = "peckish-bag";
  let bag = [];
  try { bag = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { bag = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(bag)); } catch (e) {} };

  function addToBag(slug, qty = 1) {
    const item = findItem(slug);
    if (!item) return;
    const row = bag.find((r) => r.slug === slug);
    if (row) row.qty += qty; else bag.push({ slug, qty });
    save(); renderBag(); toast(`${item.name} added to bag`);
  }
  function setQty(slug, qty) {
    bag = bag.map((r) => (r.slug === slug ? { ...r, qty } : r)).filter((r) => r.qty > 0);
    save(); renderBag();
  }
  function renderBag() {
    const count = bag.reduce((n, r) => n + r.qty, 0);
    $$("[data-bag-count]").forEach((el) => (el.textContent = count));
    const list = $("[data-bag-items]");
    if (!list) return;
    if (!bag.length) {
      list.innerHTML = `<div class="bag-empty">
        <img src="mark-rooster.svg" alt="" width="72" height="80">
        <p class="h3" style="font-size:22px">Your bag is empty.</p>
        <p class="small">Which is, frankly, a cry for help.</p>
        <a class="btn btn-ink" href="sauces.html">Shop sauces</a></div>`;
    } else {
      list.innerHTML = bag.map((r) => {
        const it = findItem(r.slug);
        return `<div class="bag-item">
          <img src="${it.image}" alt="">
          <div><strong>${it.name}</strong><small>${money(it.price)} each</small></div>
          <div class="qty">
            <button data-bag-minus="${r.slug}" aria-label="Decrease">−</button>
            <output>${r.qty}</output>
            <button data-bag-plus="${r.slug}" aria-label="Increase">+</button>
          </div></div>`;
      }).join("");
    }
    const total = bag.reduce((n, r) => n + r.qty * findItem(r.slug).price, 0);
    $("[data-bag-total]").textContent = money(total);
  }
  function openBag(open) { document.body.classList.toggle("bag-open", open); }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add && !add.hasAttribute("data-add-pdp")) { e.preventDefault(); addToBag(add.dataset.add, 1); return; }
    if (e.target.closest("[data-bag-open]")) { e.preventDefault(); openBag(true); return; }
    if (e.target.closest("[data-bag-close]")) { openBag(false); return; }
    const minus = e.target.closest("[data-bag-minus]");
    if (minus) { const r = bag.find((x) => x.slug === minus.dataset.bagMinus); setQty(r.slug, r.qty - 1); return; }
    const plus = e.target.closest("[data-bag-plus]");
    if (plus) { const r = bag.find((x) => x.slug === plus.dataset.bagPlus); setQty(r.slug, r.qty + 1); return; }
    if (e.target.closest("[data-checkout]")) { toast("Concept site — no real checkout. Yet."); return; }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { openBag(false); $(".mobile-menu")?.classList.remove("open"); } });
  renderBag();

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- newsletter ---------- */
  $$("form[data-news]").forEach((f) =>
    f.addEventListener("submit", (e) => { e.preventDefault(); toast("You’re on the list. Stay spicy."); f.reset(); })
  );

  /* ---------- mobile nav ---------- */
  const toggle = $(".nav-toggle"), mobile = $(".mobile-menu");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- hero dots (decorative slides of copy) ---------- */
  const hero = $("[data-hero]");
  if (hero) {
    const slides = JSON.parse(hero.dataset.hero || "[]");
    const dots = $$(".hero-dots span", hero);
    const h = $(".display", hero), p = $(".lead", hero);
    let i = 0;
    if (slides.length > 1) {
      setInterval(() => {
        i = (i + 1) % slides.length;
        h.innerHTML = slides[i][0]; p.textContent = slides[i][1];
        dots.forEach((d, k) => d.classList.toggle("on", k === i));
      }, 5200);
    }
  }

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    const watch = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
    watch(); setTimeout(watch, 50);
  } else { $$(".reveal").forEach((el) => el.classList.add("in")); }

  /* ---------- current page ---------- */
  const page = location.pathname.split("/").pop() || "index.html";
  $$(".nav-link[href]").forEach((a) => { if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page"); });
})();
