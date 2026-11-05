/* Tech App v1 — curated launches
   Only verified facts from the brief. If a spec/price is unsure, it is
   omitted or marked TBA. Do not invent specs, prices or exact dates.
   1 USD ≈ Rs 137 — NPR prices are labelled approx.
*/
const USD_TO_NPR = 137;

const LAUNCHES = [
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "Phones",
    status: "Launched",
    launchDate: "2025-09-09",
    launchLabel: "Sep 9, 2025",
    priceUSD: 1099,
    priceNote: "",
    tagline: "A19 Pro power, 48MP main camera in a 6.3-inch Pro.",
    highlights: ["A19 Pro chip", "48MP main camera", "6.3-inch display"],
    specs: { "Chip": "A19 Pro", "Main camera": "48MP", "Display": "6.3-inch", "Battery": "~4,252 mAh", "Price": "$1,099" },
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "iPhone 17 Pro official trailer",
    source: "Apple / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "galaxy-s26",
    name: "Galaxy S26",
    brand: "Samsung",
    category: "Phones",
    status: "Launched",
    launchDate: "2026-02-25",
    launchLabel: "Feb 25, 2026",
    priceUSD: 899,
    priceNote: "",
    tagline: "Snapdragon 8 Elite Gen 5 in a compact 6.3-inch flagship.",
    highlights: ["Snapdragon 8 Elite Gen 5", "50MP camera", "4,300 mAh battery"],
    specs: { "Chip": "Snapdragon 8 Elite Gen 5", "Main camera": "50MP", "Display": "6.3-inch", "Battery": "4,300 mAh", "Price": "$899" },
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Samsung Galaxy S26 official trailer",
    source: "Samsung / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "galaxy-s26-ultra",
    name: "Galaxy S26 Ultra",
    brand: "Samsung",
    category: "Phones",
    status: "Launched",
    launchDate: "2026-02-25",
    launchLabel: "Feb 25, 2026",
    priceUSD: 1300,
    priceNote: "",
    tagline: "200MP camera and a 5,000 mAh battery in a 6.9-inch Ultra.",
    highlights: ["200MP main camera", "Snapdragon 8 Elite Gen 5", "5,000 mAh battery"],
    specs: { "Chip": "Snapdragon 8 Elite Gen 5", "Main camera": "200MP", "Display": "6.9-inch", "Battery": "5,000 mAh", "Price": "$1,300" },
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Samsung Galaxy S26 Ultra official trailer",
    source: "Samsung / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "pixel-10",
    name: "Pixel 10",
    brand: "Google",
    category: "Phones",
    status: "Launched",
    launchDate: "2025-08-20",
    launchLabel: "Aug 20, 2025",
    priceUSD: 799,
    priceNote: "",
    tagline: "Tensor G5 and a 50MP camera, with a 4,970 mAh battery.",
    highlights: ["Tensor G5", "50MP camera", "4,970 mAh battery"],
    specs: { "Chip": "Tensor G5", "Main camera": "50MP", "Display": "6.3-inch", "Battery": "4,970 mAh", "Price": "$799" },
    image: "https://images.unsplash.com/photo-1571380401583-72ca84994796?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1571380401583-72ca84994796?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Google Pixel 10 official trailer",
    source: "Google / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "pixel-10-pro",
    name: "Pixel 10 Pro",
    brand: "Google",
    category: "Phones",
    status: "Launched",
    launchDate: "2025-08-20",
    launchLabel: "Aug 20, 2025",
    priceUSD: 999,
    priceNote: "",
    tagline: "Tensor G5 Pro flagship with a 50MP camera.",
    highlights: ["Tensor G5", "50MP camera", "4,870 mAh battery"],
    specs: { "Chip": "Tensor G5", "Main camera": "50MP", "Display": "6.3-inch", "Battery": "4,870 mAh", "Price": "$999" },
    image: "https://images.unsplash.com/photo-1571380401583-72ca84994796?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1571380401583-72ca84994796?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Google Pixel 10 Pro official trailer",
    source: "Google / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "macbook-pro-proled",
    name: "MacBook Pro 14 / 16 — PROLED XDR Touch",
    brand: "Apple",
    category: "Laptops",
    status: "Launched",
    launchDate: "2026-10-28",
    launchLabel: "Announced Oct 28, 2026 · On sale Nov 6, 2026",
    priceUSD: 2899,
    priceNote: "from",
    tagline: "M5 Pro / M5 Max, PROLED XDR Touch display, up to 128GB unified memory.",
    highlights: ["M5 Pro / M5 Max", "PROLED XDR Touch display", "Up to 128GB unified memory", "Up to 24h battery"],
    specs: { "Chip": "M5 Pro / M5 Max", "Memory": "Up to 128GB unified memory", "Display": "PROLED XDR Touch", "Battery": "Up to 24 hours", "On sale": "Nov 6, 2026", "Price": "From $2,899" },
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Apple MacBook Pro M5 Pro official trailer",
    source: "Apple",
    sourceUrl: "https://www.apple.com/macbook-pro/"
  },
  {
    id: "iphone-18-pro-duo",
    name: "iPhone 18 Pro & iPhone Duo",
    brand: "Apple",
    category: "Phones",
    status: "Launched",
    launchDate: "2026-09-01",
    launchLabel: "Sep 2026 · Duo on sale Oct 23, 2026",
    priceUSD: null,
    priceNote: "TBA",
    tagline: "iOS 27 with Siri AI — plus the foldable iPhone Duo.",
    highlights: ["iOS 27", "Siri AI", "iPhone Duo foldable — on sale Oct 23, 2026"],
    specs: { "OS": "iOS 27", "AI": "Siri AI", "Form factor": "iPhone 18 Pro + iPhone Duo foldable", "Duo on sale": "Oct 23, 2026", "Price": "TBA" },
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "iPhone 18 Pro official trailer",
    source: "Apple",
    sourceUrl: "https://www.apple.com/iphone/"
  },
  {
    id: "ipad-mini-oled",
    name: "iPad mini OLED",
    brand: "Apple",
    category: "Tablets",
    status: "Launched",
    launchDate: "2026-11-06",
    launchLabel: "On sale Nov 6, 2026",
    priceUSD: 699,
    priceNote: "",
    tagline: "8.5-inch OLED and A20 Pro in the mini.",
    highlights: ["8.5-inch OLED display", "A20 Pro", "$699"],
    specs: { "Chip": "A20 Pro", "Display": "8.5-inch OLED", "Price": "$699", "On sale": "Nov 6, 2026" },
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "iPad mini OLED official trailer",
    source: "Apple",
    sourceUrl: "https://www.apple.com/ipad-mini/"
  },
  {
    id: "oneplus-ace-7-pro",
    name: "OnePlus Ace 7 Pro",
    brand: "OnePlus",
    category: "Phones",
    status: "Launched",
    launchDate: "2026-10-01",
    launchLabel: "Oct 2026",
    priceUSD: null,
    priceNote: "TBA",
    tagline: "A 9,000 mAh battery — the headline for this launch.",
    highlights: ["9,000 mAh battery"],
    specs: { "Battery": "9,000 mAh", "Price": "TBA" },
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "OnePlus Ace 7 Pro official trailer",
    source: "OnePlus / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "motorola-signature-27",
    name: "Motorola Signature 27",
    brand: "Motorola",
    category: "Phones",
    status: "Upcoming",
    launchDate: "2026-11-05",
    launchLabel: "Launch Nov 5, 2026",
    priceUSD: null,
    priceNote: "TBA",
    tagline: "Snapdragon 8 Elite Extreme Gen 6, Android 17, 7 years of updates.",
    highlights: ["Snapdragon 8 Elite Extreme Gen 6", "Android 17", "7 years of updates"],
    specs: { "Chip": "Snapdragon 8 Elite Extreme Gen 6", "OS": "Android 17", "Updates": "7 years", "Price": "TBA" },
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Motorola Signature 27 official trailer",
    source: "Motorola / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "xiaomi-18-pro",
    name: "Xiaomi 18 Pro",
    brand: "Xiaomi",
    category: "Phones",
    status: "Upcoming",
    launchDate: "2026-11-01",
    launchLabel: "Global Nov 2026",
    priceUSD: null,
    priceNote: "TBA",
    tagline: "Xiaomi's next Pro flagship — global launch in November 2026.",
    highlights: ["Global launch Nov 2026"],
    specs: { "Launch": "Global, Nov 2026", "Price": "TBA" },
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Xiaomi 18 Pro official trailer",
    source: "Xiaomi / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  },
  {
    id: "oppo-watch-x3",
    name: "OPPO Watch X3",
    brand: "OPPO",
    category: "Wearables",
    status: "Launched",
    launchDate: "2026-11-06",
    launchLabel: "On sale Nov 6, 2026",
    priceUSD: null,
    priceNote: "AED 1,599",
    tagline: "Wear OS 6 with Gemini, on sale Nov 6, 2026.",
    highlights: ["Wear OS 6", "Gemini", "On sale Nov 6, 2026"],
    specs: { "OS": "Wear OS 6", "AI": "Gemini", "Price": "AED 1,599", "On sale": "Nov 6, 2026" },
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "OPPO Watch X3 official trailer",
    source: "OPPO",
    sourceUrl: "https://www.oppo.com/en/"
  },
  {
    id: "galaxy-glasses",
    name: "Samsung Galaxy Glasses",
    brand: "Samsung",
    category: "AI",
    status: "Rumoured",
    launchDate: "2026-12-01",
    launchLabel: "Rumoured Dec 2026",
    priceUSD: null,
    priceNote: "TBA",
    tagline: "Rumoured Android XR glasses with Gemini — not confirmed as launched.",
    highlights: ["Android XR", "Gemini", "Rumoured — Dec 2026"],
    specs: { "Platform": "Android XR", "AI": "Gemini", "Status": "Rumoured — Dec 2026", "Price": "TBA" },
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=80&auto=format&fit=crop"
    ],
    videoSearch: "Samsung Galaxy Glasses Android XR official trailer",
    source: "Rumour — Samsung / GSMArena",
    sourceUrl: "https://www.gsmarena.com/"
  }
];

const NEWS_SOURCES = [
  { name: "The Verge", rss: "https://www.theverge.com/rss/index.xml" },
  { name: "GSMArena", rss: "https://www.gsmarena.com/rss-news-reviews.php3" }
];

// Expose for app.js (plain script, no modules, no build step)
window.LAUNCHES = LAUNCHES;
window.USD_TO_NPR = USD_TO_NPR;
window.NEWS_SOURCES = NEWS_SOURCES;
