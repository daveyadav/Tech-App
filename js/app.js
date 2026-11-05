/* Tech App v1 — plain JS, no build step, no API keys in the app */
(function () {
  "use strict";

  var launches = window.LAUNCHES || [];
  var USD_TO_NPR = window.USD_TO_NPR || 137;
  var NEWS_SOURCES = window.NEWS_SOURCES || [];

  /* Image fallback — never show a broken image */
  window.imgFallback = function (img) {
    img.onerror = null;
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><text x="600" y="420" font-family="Arial" font-size="64" fill="white" text-anchor="middle">Tech App</text></svg>'
    );
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(id) { return document.getElementById(id); }
  function fmtUSD(n) { return "$" + Number(n).toLocaleString("en-US"); }
  function fmtNPR(n) { return "Rs " + Math.round(n * USD_TO_NPR).toLocaleString("en-IN") + " approx."; }
  function priceHTML(l) {
    if (l.priceUSD) {
      return '<div class="price">' + esc(l.priceNote ? l.priceNote + " " : "") + fmtUSD(l.priceUSD) +
        '<small>' + fmtNPR(l.priceUSD) + '</small></div>';
    }
    return '<div class="price">' + esc(l.priceNote || "TBA") + '<small>Price TBA</small></div>';
  }
  function statusClass(s) { return s.toLowerCase(); }
  function getSaved() {
    try { return JSON.parse(localStorage.getItem("techapp_saved") || "[]"); } catch (e) { return []; }
  }
  function setSaved(ids) {
    try { localStorage.setItem("techapp_saved", JSON.stringify(ids)); } catch (e) {}
    updateSavedCount();
  }
  function updateSavedCount() { var c = byId("savedCount"); if (c) c.textContent = String(getSaved().length); }

  /* ---------- Theme ---------- */
  var themeBtn = byId("themeBtn");
  try {
    var savedTheme = localStorage.getItem("techapp_theme");
    if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  } catch (e) {}
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", cur);
    try { localStorage.setItem("techapp_theme", cur); } catch (e) {}
  });

  /* ---------- Tabs ---------- */
  var tabs = document.querySelectorAll("#mainTabs .tab");
  function showTab(name) {
    tabs.forEach(function (t) { t.classList.toggle("active", t.dataset.tab === name); });
    ["launches", "calendar", "news", "saved", "compare"].forEach(function (n) {
      var el = byId("tab-" + n);
      if (el) el.hidden = (n !== name);
    });
    if (name === "news") loadNews(false);
    if (name === "saved") renderSaved();
    if (name === "compare") renderCompare();
    if (name === "calendar") renderCalendar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { showTab(t.dataset.tab); }); });
  if (byId("savedBtn")) byId("savedBtn").addEventListener("click", function () { showTab("saved"); });

  /* ---------- Hero carousel: top 3 ---------- */
  var HERO_IDS = ["iphone-17-pro", "galaxy-s26-ultra", "macbook-pro-proled"];
  var heroIndex = 0, heroTimer = null;
  function renderHero() {
    var hero = byId("hero");
    if (!hero) return;
    var items = HERO_IDS.map(function (id) { return launches.find(function (l) { return l.id === id; }); }).filter(Boolean);
    hero.innerHTML = items.map(function (l, i) {
      return '<div class="hero-slide' + (i === 0 ? " active" : "") + '">' +
        '<img src="' + esc(l.image) + '" alt="' + esc(l.name) + '" onerror="imgFallback(this)">' +
        '<div class="hero-overlay">' +
        '<span class="badge ' + statusClass(l.status) + '">' + esc(l.status) + ' · ' + esc(l.launchLabel) + '</span>' +
        '<h1>' + esc(l.name) + '</h1><p>' + esc(l.tagline) + '</p>' +
        '<div class="hero-actions">' +
        '<button class="btn" type="button" data-open="' + esc(l.id) + '">View details →</button>' +
        '<span class="btn ghost">' + (l.priceUSD ? esc(l.priceNote ? l.priceNote + " " : "") + fmtUSD(l.priceUSD) : esc(l.priceNote || "TBA")) + '</span>' +
        '</div></div></div>';
    }).join("") +
    '<div class="hero-dots">' + items.map(function (_, i) {
      return '<button type="button" aria-label="Slide ' + (i + 1) + '" data-dot="' + i + '" class="' + (i === 0 ? "active" : "") + '"></button>';
    }).join("") + '</div>';
    hero.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { openDetail(b.dataset.open); });
    });
    hero.querySelectorAll("[data-dot]").forEach(function (d) {
      d.addEventListener("click", function () { setHero(Number(d.dataset.dot)); });
    });
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(function () { setHero((heroIndex + 1) % items.length); }, 5000);
  }
  function setHero(i) {
    heroIndex = i;
    var slides = document.querySelectorAll(".hero-slide");
    var dots = document.querySelectorAll(".hero-dots button");
    slides.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
  }

  /* ---------- Filters / search / sort ---------- */
  var FILTERS = ["All", "Phones", "Laptops", "Tablets", "Wearables", "AI", "Upcoming", "Launched", "Rumoured"];
  var state = { filter: "All", q: "", sort: "date-desc" };
  var compareIds = [];

  function renderChips() {
    var wrap = byId("filterChips");
    wrap.innerHTML = FILTERS.map(function (f) {
      return '<button type="button" class="chip' + (state.filter === f ? " active" : "") + '" data-filter="' + esc(f) + '">' + esc(f) + '</button>';
    }).join("");
    wrap.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () { state.filter = b.dataset.filter; renderChips(); renderGrid(); });
    });
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    var list = launches.filter(function (l) {
      var okFilter = state.filter === "All" ||
        (["Upcoming", "Launched", "Rumoured"].indexOf(state.filter) >= 0 ? l.status === state.filter : l.category === state.filter);
      var hay = (l.name + " " + l.brand + " " + l.category + " " + l.tagline + " " + l.highlights.join(" ")).toLowerCase();
      return okFilter && (!q || hay.indexOf(q) >= 0);
    });
    list.sort(function (a, b) {
      if (state.sort === "date-asc") return a.launchDate.localeCompare(b.launchDate);
      if (state.sort === "date-desc") return b.launchDate.localeCompare(a.launchDate);
      if (state.sort === "price-asc") return (a.priceUSD || 999999) - (b.priceUSD || 999999);
      if (state.sort === "price-desc") return (b.priceUSD || 0) - (a.priceUSD || 0);
      return 0;
    });
    return list;
  }

  function cardHTML(l) {
    var saved = getSaved().indexOf(l.id) >= 0;
    var inCompare = compareIds.indexOf(l.id) >= 0;
    return '<article class="card">' +
      '<div class="card-media"><span class="badge on-card ' + statusClass(l.status) + '">' + esc(l.status) + '</span>' +
      '<img src="' + esc(l.image) + '" alt="' + esc(l.name) + '" loading="lazy" onerror="imgFallback(this)"></div>' +
      '<div class="card-body">' +
      '<div class="card-top"><span>' + esc(l.brand) + ' · ' + esc(l.category) + '</span><span>' + esc(l.launchLabel) + '</span></div>' +
      '<h3>' + esc(l.name) + '</h3><p>' + esc(l.tagline) + '</p>' +
      '<div>' + l.highlights.map(function (h) { return '<span class="tag">' + esc(h) + '</span>'; }).join("") + '</div>' +
      '<div class="price-row">' + priceHTML(l) + '<span class="small muted">' + esc(l.source) + '</span></div>' +
      '<div class="card-actions">' +
      '<button type="button" class="mini-btn primary" data-open="' + esc(l.id) + '">Details</button>' +
      '<button type="button" class="mini-btn' + (saved ? " active" : "") + '" data-save="' + esc(l.id) + '">' + (saved ? "★ Saved" : "☆ Save") + '</button>' +
      (l.category === "Phones" ? '<button type="button" class="mini-btn' + (inCompare ? " active" : "") + '" data-compare="' + esc(l.id) + '">' + (inCompare ? "✓ Compare" : "Compare") + '</button>' : "") +
      '</div></div></article>';
  }

  function bindCardButtons(root) {
    root.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () { openDetail(b.dataset.open); });
    });
    root.querySelectorAll("[data-save]").forEach(function (b) {
      b.addEventListener("click", function () {
        var ids = getSaved();
        var i = ids.indexOf(b.dataset.save);
        if (i >= 0) ids.splice(i, 1); else ids.push(b.dataset.save);
        setSaved(ids); renderGrid(); renderSaved();
      });
    });
    root.querySelectorAll("[data-compare]").forEach(function (b) {
      b.addEventListener("click", function () { toggleCompare(b.dataset.compare); });
    });
  }

  function renderGrid() {
    var grid = byId("grid");
    var list = filtered();
    byId("resultCount").textContent = list.length + " launch" + (list.length === 1 ? "" : "es") + " · " + launches.length + " curated in total";
    byId("emptyState").hidden = list.length > 0;
    grid.innerHTML = list.map(cardHTML).join("");
    bindCardButtons(grid);
    updateCompareBar();
  }

  var searchInput = byId("searchInput");
  if (searchInput) searchInput.addEventListener("input", function () { state.q = searchInput.value; renderGrid(); });
  var sortSelect = byId("sortSelect");
  if (sortSelect) sortSelect.addEventListener("change", function () { state.sort = sortSelect.value; renderGrid(); });

  /* ---------- Detail modal ---------- */
  function openDetail(id) {
    var l = launches.find(function (x) { return x.id === id; });
    if (!l) return;
    var yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent(l.videoSearch + " official trailer");
    var specRows = Object.keys(l.specs).map(function (k) {
      return "<tr><th>" + esc(k) + "</th><td>" + esc(l.specs[k]) + "</td></tr>";
    }).join("");
    byId("modalContent").innerHTML =
      '<div class="modal-hero"><img src="' + esc(l.image) + '" alt="' + esc(l.name) + '" onerror="imgFallback(this)">' +
      '<button class="modal-close" type="button" id="modalClose" aria-label="Close">✕</button></div>' +
      '<div class="modal-body">' +
      '<span class="badge ' + statusClass(l.status) + '">' + esc(l.status) + '</span> ' +
      '<span class="small muted">' + esc(l.brand) + ' · ' + esc(l.category) + ' · ' + esc(l.launchLabel) + '</span>' +
      '<h2>' + esc(l.name) + '</h2><p class="muted">' + esc(l.tagline) + '</p>' +
      '<div class="price-row">' + priceHTML(l) + '<span class="small muted">Source: ' + esc(l.source) + '</span></div>' +
      '<h3>Highlights</h3><ul>' + l.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + '</ul>' +
      '<h3>Full specs</h3><table class="spec-table">' + specRows + '</table>' +
      '<p class="small muted">Specs shown are only the verified facts for this launch. Anything not confirmed is marked TBA or omitted.</p>' +
      '<h3>Gallery</h3><div class="gallery">' + l.gallery.map(function (g) {
        return '<img src="' + esc(g) + '" alt="' + esc(l.name) + ' photo" loading="lazy" onerror="imgFallback(this)">';
      }).join("") + '</div>' +
      '<div class="video-box"><h3 style="margin-top:0">Video</h3>' +
      '<p class="muted">We do not embed guessed YouTube videos. Watch the official trailer / hands-on on YouTube:</p>' +
      '<a class="btn primary" href="' + yt + '" target="_blank" rel="noopener">▶ Watch official trailer on YouTube</a>' +
      '<p class="small muted" style="margin-top:10px">Search: ' + esc(l.videoSearch + " official trailer") + '</p></div>' +
      '<p><a href="' + esc(l.sourceUrl) + '" target="_blank" rel="noopener">View source ↗ ' + esc(l.source) + '</a></p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" type="button" id="modalSave">' + (getSaved().indexOf(l.id) >= 0 ? "★ Saved" : "☆ Save this launch") + '</button>' +
      '<button class="btn ghost" type="button" id="modalClose2" style="color:var(--text);border-color:var(--line);background:var(--card)">Close</button></div>' +
      '</div>';
    byId("modalBackdrop").classList.add("open");
    document.body.style.overflow = "hidden";
    var close = function () { byId("modalBackdrop").classList.remove("open"); document.body.style.overflow = ""; };
    byId("modalClose").addEventListener("click", close);
    byId("modalClose2").addEventListener("click", close);
    byId("modalSave").addEventListener("click", function () {
      var ids = getSaved();
      var i = ids.indexOf(l.id);
      if (i >= 0) ids.splice(i, 1); else ids.push(l.id);
      setSaved(ids); renderGrid(); renderSaved(); openDetail(l.id);
    });
  }
  byId("modalBackdrop").addEventListener("click", function (e) {
    if (e.target === byId("modalBackdrop")) { byId("modalBackdrop").classList.remove("open"); document.body.style.overflow = ""; }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { byId("modalBackdrop").classList.remove("open"); document.body.style.overflow = ""; }
  });

  /* ---------- Compare (up to 2 phones) ---------- */
  function toggleCompare(id) {
    var i = compareIds.indexOf(id);
    if (i >= 0) compareIds.splice(i, 1);
    else {
      if (compareIds.length >= 2) { alert("Compare supports up to 2 phones. Clear one first."); return; }
      compareIds.push(id);
    }
    renderGrid(); updateCompareBar(); renderCompare();
  }
  function updateCompareBar() {
    var bar = byId("compareBar");
    if (!bar) return;
    if (compareIds.length === 0) { bar.classList.remove("show"); return; }
    bar.classList.add("show");
    byId("compareLabel").textContent = compareIds.length + " selected: " + compareIds.map(function (id) {
      var l = launches.find(function (x) { return x.id === id; }); return l ? l.name : id;
    }).join(" vs ");
  }
  if (byId("compareClear")) byId("compareClear").addEventListener("click", function () { compareIds = []; renderGrid(); renderCompare(); });
  if (byId("compareGo")) byId("compareGo").addEventListener("click", function () { showTab("compare"); });
  function renderCompare() {
    var view = byId("compareView");
    if (!view) return;
    if (compareIds.length === 0) {
      view.innerHTML = '<div class="empty">No phones selected yet. Go to Launches and tap “Compare” on up to 2 phones.</div>';
      return;
    }
    var items = compareIds.map(function (id) { return launches.find(function (l) { return l.id === id; }); }).filter(Boolean);
    var keys = [];
    items.forEach(function (l) { Object.keys(l.specs).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
    var head = '<tr><th>Spec</th>' + items.map(function (l) { return "<th>" + esc(l.name) + "<br><span class='small muted'>" + esc(l.brand) + "</span></th>"; }).join("") + "</tr>";
    var rows = keys.map(function (k) {
      return "<tr><th>" + esc(k) + "</th>" + items.map(function (l) { return "<td>" + esc(l.specs[k] || "—") + "</td>"; }).join("") + "</tr>";
    }).join("");
    view.innerHTML = '<table class="compare-table">' + head + rows + '</table>' +
      '<div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">' +
      items.map(function (l) { return '<button class="mini-btn primary" type="button" data-open="' + esc(l.id) + '">View ' + esc(l.name) + '</button>'; }).join("") +
      '<button class="mini-btn" type="button" id="compareClear2">Clear comparison</button></div>';
    view.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", function () { openDetail(b.dataset.open); }); });
    var c2 = byId("compareClear2");
    if (c2) c2.addEventListener("click", function () { compareIds = []; renderGrid(); renderCompare(); });
  }

  /* ---------- Saved ---------- */
  function renderSaved() {
    var grid = byId("savedGrid");
    if (!grid) return;
    var ids = getSaved();
    var items = ids.map(function (id) { return launches.find(function (l) { return l.id === id; }); }).filter(Boolean);
    byId("savedEmpty").hidden = items.length > 0;
    grid.innerHTML = items.map(cardHTML).join("");
    bindCardButtons(grid);
  }

  /* ---------- Calendar ---------- */
  function renderCalendar() {
    var wrap = byId("calendarList");
    if (!wrap) return;
    var groups = {};
    launches.slice().sort(function (a, b) { return a.launchDate.localeCompare(b.launchDate); }).forEach(function (l) {
      var key = l.launchDate.slice(0, 7);
      (groups[key] = groups[key] || []).push(l);
    });
    var months = Object.keys(groups).sort();
    var fmtMonth = function (ym) {
      var d = new Date(ym + "-01T00:00:00");
      return d.toLocaleString("en-US", { month: "long", year: "numeric" });
    };
    wrap.innerHTML = months.map(function (m) {
      return '<div class="cal-group"><h3>' + esc(fmtMonth(m)) + '</h3>' + groups[m].map(function (l) {
        return '<button type="button" class="cal-row" data-open="' + esc(l.id) + '"><span><b>' + esc(l.name) + '</b> <span class="muted">· ' + esc(l.brand) + ' · ' + esc(l.category) + '</span></span><span><span class="badge ' + statusClass(l.status) + '">' + esc(l.status) + '</span> <span class="small muted">' + esc(l.launchLabel) + '</span></span></button>';
      }).join("") + '</div>';
    }).join("");
    wrap.querySelectorAll("[data-open]").forEach(function (b) { b.addEventListener("click", function () { openDetail(b.dataset.open); }); });
  }

  /* ---------- Live News (rss2json, title + snippet + link only) ---------- */
  var newsLoaded = false;
  function newsFallback(msg) {
    var status = byId("newsStatus");
    var list = byId("newsList");
    if (status) status.innerHTML = '<div class="notice">' + esc(msg) + ' Showing curated launches below instead — tap any launch for details. Live news needs internet.</div>';
    if (list) {
      list.innerHTML = launches.slice().sort(function (a, b) { return b.launchDate.localeCompare(a.launchDate); }).slice(0, 6).map(function (l) {
        return '<a class="news-item" href="#" data-open="' + esc(l.id) + '"><img src="' + esc(l.image) + '" alt="" onerror="imgFallback(this)"><div><h4>' + esc(l.name) + ' — ' + esc(l.tagline) + '</h4><p>Curated launch · ' + esc(l.launchLabel) + '</p><div class="news-meta">Tech App · Curated · ' + esc(l.source) + '</div></div></a>';
      }).join("");
      list.querySelectorAll("[data-open]").forEach(function (a) {
        a.addEventListener("click", function (e) { e.preventDefault(); openDetail(a.dataset.open); });
      });
    }
  }
  function loadNews(force) {
    if (newsLoaded && !force) return;
    var status = byId("newsStatus");
    var list = byId("newsList");
    if (status) status.innerHTML = '<p class="muted">Loading live news from The Verge and GSMArena…</p>';
    if (!navigator.onLine) { newsFallback("You are offline."); return; }
    var jobs = NEWS_SOURCES.map(function (src) {
      var url = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(src.rss);
      return fetch(url, { signal: AbortSignal.timeout(10000) })
        .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .then(function (j) {
          return (j.items || []).slice(0, 8).map(function (it) {
            return { title: it.title || "", link: it.link || "", date: it.pubDate || "", image: it.thumbnail || it.enclosure && it.enclosure.link || "", desc: (it.description || "").replace(/<[^>]*>/g, "").slice(0, 160), source: src.name };
          });
        })
        .catch(function () { return []; });
    });
    Promise.all(jobs).then(function (results) {
      var items = [].concat.apply([], results).filter(function (x) { return x.title && x.link; });
      items.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      newsLoaded = true;
      if (!items.length) { newsFallback("Live news could not be loaded right now."); return; }
      if (status) status.innerHTML = '<p class="muted">' + items.length + ' headlines · Sources: The Verge, GSMArena · Tap a headline to read the full article on the original site.</p>';
      list.innerHTML = items.slice(0, 16).map(function (it) {
        var d = it.date ? new Date(it.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
        return '<a class="news-item" href="' + esc(it.link) + '" target="_blank" rel="noopener">' +
          (it.image ? '<img src="' + esc(it.image) + '" alt="" loading="lazy" onerror="imgFallback(this)">' : "") +
          '<div><h4>' + esc(it.title) + '</h4>' + (it.desc ? "<p>" + esc(it.desc) + "…</p>" : "") +
          '<div class="news-meta">' + esc(it.source) + (d ? " · " + esc(d) : "") + ' · Read original ↗</div></div></a>';
      }).join("");
    }).catch(function () { newsFallback("Live news could not be loaded right now."); });
  }
  if (byId("refreshNews")) byId("refreshNews").addEventListener("click", function () { newsLoaded = false; loadNews(true); });

  /* ---------- Init ---------- */
  renderHero();
  renderChips();
  renderGrid();
  renderCalendar();
  renderSaved();
  updateSavedCount();
  updateCompareBar();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline PWA is optional */ });
    });
  }
})();
