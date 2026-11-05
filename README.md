# Tech App v1 — Recent Tech Launches Worldwide

Static PWA. No build step, no API keys, no backend.

Live (after GitHub Pages is enabled): https://daveyadav.github.io/Tech-App/

## Run locally

```bash
# from this folder
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly — Live News needs http(s) + internet, the curated launches work offline once installed.

## What's in v1

- **13 curated launches** — phones, laptops, tablets, wearables and AI. See `js/data.js`.
- **Hero carousel** — top 3 launches, auto-rotates every 5s.
- **Filters + search + sort** — All / Phones / Laptops / Tablets / Wearables / AI / Upcoming / Launched / Rumoured, text search, sort by date or price.
- **Launch cards** — image, brand, date, price in USD + approx NPR (1 USD ≈ Rs 137, labelled approx), status badge, highlights.
- **Detail modal** — full specs table, highlights, gallery, video link. Videos are **not** embedded with guessed IDs — each detail links to a YouTube search for that product's official trailer.
- **Compare** — pick up to 2 phones, side-by-side specs table.
- **Bookmarks** — ★ saves to localStorage, Saved tab.
- **Live News tab** — The Verge + GSMArena RSS via rss2json (`https://api.rss2json.com/v1/api.json?rss_url=…`). Title + snippet + link only, with source attribution. If offline / fetch fails, curated launches are shown as fallback with a clear offline message.
- **Launch Calendar** — grouped by month.
- **PWA** — `manifest.json` + `sw.js` (app-shell cache, `tech-app-v1`), installable, offline fallback to curated launches.
- **Theme** — dark / light toggle, saved in localStorage. Footer: **Tech App v1**.

## Sources & attribution

- News: The Verge RSS (`https://www.theverge.com/rss/index.xml`) and GSMArena RSS (`https://www.gsmarena.com/rss-news-reviews.php3`), via rss2json. Title + snippet + link only — full articles are read on the original site.
- Images: Unsplash photos used as illustrations (not official press images). Every image has an `onerror` fallback to a gradient placeholder, so a broken image never shows as broken. Do not hotlink GSMArena / Apple press images.
- Specs/prices: curated from Apple, Samsung, Google, OnePlus, Motorola, Xiaomi and OPPO announcements. Only verified facts are included.
- Videos: YouTube search links only, no guessed embeds.

## Curated launches (13)

| Launch | Date | Price |
|---|---|---|
| iPhone 17 Pro | Sep 9, 2025 | $1,099 |
| Galaxy S26 | Feb 25, 2026 | $899 |
| Galaxy S26 Ultra | Feb 25, 2026 | $1,300 |
| Pixel 10 | Aug 20, 2025 | $799 |
| Pixel 10 Pro | Aug 20, 2025 | $999 |
| MacBook Pro 14/16 PROLED XDR Touch | Announced Oct 28, 2026, on sale Nov 6, 2026 | From $2,899 |
| iPhone 18 Pro & iPhone Duo | Sep 2026, Duo on sale Oct 23, 2026 | TBA |
| iPad mini OLED | On sale Nov 6, 2026 | $699 |
| OnePlus Ace 7 Pro | Oct 2026 | TBA |
| Motorola Signature 27 | Launch Nov 5, 2026 | TBA |
| Xiaomi 18 Pro | Global Nov 2026 | TBA |
| OPPO Watch X3 | On sale Nov 6, 2026 | AED 1,599 |
| Samsung Galaxy Glasses | Rumoured Dec 2026 | TBA |

**Left as TBA (do not invent):** iPhone 18 Pro / Duo price; OnePlus Ace 7 Pro price and chip (only 9,000 mAh battery is verified); Motorola Signature 27 price; Xiaomi 18 Pro price and specs; Galaxy Glasses price and specs (Rumoured — Android XR + Gemini only).

## How to add a launch

Edit `js/data.js` — add an object to `LAUNCHES` with: `id, name, brand, category, status, launchDate (YYYY-MM-DD), launchLabel, priceUSD (or null + priceNote), tagline, highlights[], specs{}, image, gallery[], videoSearch, source, sourceUrl`. Use only verified facts; mark anything unsure as TBA. Use a stable Unsplash image URL.

## Files

- `index.html` — app shell, tabs, hero, grid, calendar, news, saved, compare, modal, footer
- `css/style.css` — premium dark/light theme, mobile-first
- `js/data.js` — curated launches + news sources
- `js/app.js` — all features (filters, search, sort, detail, compare, bookmarks, news, calendar, theme, PWA registration)
- `manifest.json` — PWA manifest
- `sw.js` — service worker, app-shell cache
- `README.md` — this file
