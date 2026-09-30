/**
 * seo.ts — כותרות, תיאורים ונתונים מובנים לכל מסך.
 * המקור היחיד לתגיות בראש העמוד, למפת האתר ולקבצי ה-HTML שנבנים לכל נתיב.
 */
import type { Lang } from './astro';

export interface SeoLabel { he: string; en: string }

export interface SeoPage {
  path: string;
  title: SeoLabel;
  description: SeoLabel;
  crumb: SeoLabel;
  /** עמוד אב בפירורי הלחם, אם יש */
  parent?: string;
  /** מופיע בתחתית כל מסך */
  footer?: boolean;
  priority: string;
}

const BRAND: SeoLabel = { he: 'מה כתוב בכוכבים', en: 'What the stars say' };

export const SEO_PAGES: SeoPage[] = [
  {
    path: '/',
    title: {
      he: 'מה כתוב בכוכבים | מזל, מפת לידה, טארוט וקבלה',
      en: 'What the stars say | Birth chart, tarot and Kabbalah',
    },
    description: {
      he: 'מפת לידה, מזל עברי וסיני, התאמה זוגית, טארוט, קבלה, זוהר ונומרולוגיה. בחינם, בעברית, בלי הרשמה. החישוב נעשה אצלך במכשיר.',
      en: 'Birth chart, Hebrew and Chinese signs, compatibility, tarot, Kabbalah and numerology. Free, in Hebrew and English, with no account. Calculated on your device.',
    },
    crumb: BRAND,
    priority: '1.0',
  },
  {
    path: '/me',
    footer: true,
    title: {
      he: 'מפת לידה לפי תאריך | מזל, נומרולוגיה ושם',
      en: 'Birth chart by date | Sign, numerology and name',
    },
    description: {
      he: 'שם ותאריך לידה מספיקים למזל המערבי, המזל העברי, המזל הסיני, מספר דרך החיים, מספר השם, העץ הקלטי וקלף הלידה.',
      en: 'A name and birth date give your Western, Hebrew and Chinese signs, life path number, name number, Celtic tree and birth card.',
    },
    crumb: { he: 'המפה שלי', en: 'My chart' },
    priority: '0.9',
  },
  {
    path: '/charts',
    footer: true,
    title: {
      he: 'מפות אסטרולוגיות | לידה, תחזית, סינסטרי והוררי',
      en: 'Astrology charts | Natal, forecast, synastry, horary',
    },
    description: {
      he: 'שבע מפות לפי תאריך, שעה ומקום: מפת לידה, קארמה, תחזית שנתית, התאמה זוגית, שאלה הוררית, בחירת מועד ואסטרולוגיה עולמית.',
      en: 'Seven charts from date, time and place: natal, karmic, yearly forecast, synastry, horary, electional and mundane astrology.',
    },
    crumb: { he: 'אסטרולוגיה', en: 'Astrology' },
    priority: '0.9',
  },
  {
    path: '/charts/natal',
    parent: '/charts',
    title: {
      he: 'מפת לידה מלאה | שמש, ירח, בתים והיבטים',
      en: 'Full natal chart | Sun, Moon, houses and aspects',
    },
    description: {
      he: 'מפת לידה לפי שעה ומקום: עשרה גופים במזלות ובבתים, היבטים, איזון יסודות, שליט המפה והמזל העולה.',
      en: 'A natal chart from birth time and place: ten bodies in signs and houses, aspects, elements, chart ruler and the Ascendant.',
    },
    crumb: { he: 'מפת לידה', en: 'Natal chart' },
    priority: '0.8',
  },
  {
    path: '/charts/karmic',
    parent: '/charts',
    title: {
      he: 'מפה קארמתית | קשרי הירח וציר הגורל',
      en: 'Karmic chart | Lunar nodes and the axis of fate',
    },
    description: {
      he: 'ראש וזנב הדרקון, כוכבים בנסיגה ונקודות גורל. לאן הנשמה מתבקשת לגדול, ומה כבר מוכר ונוח.',
      en: 'North and South Nodes, retrograde planets and the lots. Where you are asked to grow, and what is already familiar.',
    },
    crumb: { he: 'מפה קארמתית', en: 'Karmic chart' },
    priority: '0.7',
  },
  {
    path: '/charts/forecast',
    parent: '/charts',
    title: {
      he: 'תחזית אסטרולוגית שנתית | טרנזיטים וחזרת שמש',
      en: 'Yearly astrology forecast | Transits and solar return',
    },
    description: {
      he: 'טרנזיטים פעילים, מעברים בשנה הקרובה, מפת חזרת השמש וקידומים. מה מודגש עכשיו ומה צפוי עד יום ההולדת הבא.',
      en: 'Live transits, the year ahead, your solar return and progressions. What is highlighted now and what unfolds until your next birthday.',
    },
    crumb: { he: 'תחזית', en: 'Forecast' },
    priority: '0.8',
  },
  {
    path: '/charts/synastry',
    parent: '/charts',
    title: {
      he: 'סינסטרי | התאמה זוגית לפי שתי מפות לידה',
      en: 'Synastry | Compatibility from two birth charts',
    },
    description: {
      he: 'השוואה בין שתי מפות לידה: היבטים בין הכוכבים, כוכבים בבתים של האחר ומפת אמצע. צריך שעה ומקום של שני הצדדים.',
      en: 'A comparison of two natal charts: cross-aspects, planets in each other’s houses and a composite chart. Needs both birth times and places.',
    },
    crumb: { he: 'סינסטרי', en: 'Synastry' },
    priority: '0.8',
  },
  {
    path: '/charts/horary',
    parent: '/charts',
    title: {
      he: 'שאלה הוררית | תשובה אסטרולוגית לשאלה אחת',
      en: 'Horary question | An astrological answer to one question',
    },
    description: {
      he: 'שאלה אחת ממוקדת, ומפת הרגע שבו נשאלה. לפי כללים מסורתיים: מייצגים, תוקף, ירח ריק ממהלך והעברת אור.',
      en: 'One focused question, and the chart of the moment it was asked. Traditional rules: significators, radicality, void of course Moon and translation of light.',
    },
    crumb: { he: 'שאלה הוררית', en: 'Horary' },
    priority: '0.7',
  },
  {
    path: '/charts/election',
    parent: '/charts',
    title: {
      he: 'בחירת מועד | מתי נכון להתחיל',
      en: 'Electional astrology | When to begin',
    },
    description: {
      he: 'סריקה של הימים והשעות הקרובים לפי כללי בחירת מועד, כדי למצוא חלון מתאים להתחלה חשובה.',
      en: 'A scan of upcoming days and hours by electional rules, to find a fitting window for an important beginning.',
    },
    crumb: { he: 'בחירת מועד', en: 'Electional' },
    priority: '0.7',
  },
  {
    path: '/charts/mundane',
    parent: '/charts',
    title: {
      he: 'אסטרולוגיה עולמית | מפות מדינות ואירועים',
      en: 'Mundane astrology | Charts of countries and events',
    },
    description: {
      he: 'מפות לאומיות ומפת אירוע: טרנזיטים, כניסות כוכבים, מחזורים וליקויים על רקע השמיים של מדינה או רגע.',
      en: 'National charts and an event chart: transits, ingresses, cycles and eclipses against the sky of a country or a moment.',
    },
    crumb: { he: 'אסטרולוגיה עולמית', en: 'Mundane' },
    priority: '0.6',
  },
  {
    path: '/pair',
    footer: true,
    title: {
      he: 'התאמה זוגית לפי מזל | ציון אהבה ונומרולוגיה',
      en: 'Love compatibility by sign | Score and numerology',
    },
    description: {
      he: 'בדיקת התאמה בין שני אנשים לפי המזל המערבי, העברי והסיני ולפי מספרי דרך החיים. ציון ופירוט של כל מרכיב.',
      en: 'A match between two people by Western, Hebrew and Chinese signs and by life path numbers, with a score and a breakdown.',
    },
    crumb: { he: 'התאמה זוגית', en: 'Compatibility' },
    priority: '0.9',
  },
  {
    path: '/tarot',
    footer: true,
    title: {
      he: 'טארוט אונליין | פריסת קלפים מהארקנה הגדולה',
      en: 'Tarot online | A Major Arcana draw',
    },
    description: {
      he: '22 קלפי הארקנה הגדולה. מערבבים, שולפים קלף אחד או שלושה (עבר, הווה, עתיד) וקוראים גם קלף הפוך.',
      en: 'The 22 Major Arcana. Shuffle, draw one card or three (past, present, future), and read reversals too.',
    },
    crumb: { he: 'טארוט', en: 'Tarot' },
    priority: '0.9',
  },
  {
    path: '/kabbalah',
    footer: true,
    title: {
      he: 'קבלה ועץ החיים | ספירות לפי תאריך לידה ושם',
      en: 'Kabbalah and the Tree of Life | Sephiroth by birth date',
    },
    description: {
      he: 'עץ החיים, עשר הספירות ו-22 הנתיבים. ספירת דרך החיים, ספירת השם, והאות של חודש הלידה העברי.',
      en: 'The Tree of Life, ten Sephiroth and 22 paths. Your life-path Sephira, name Sephira, and the letter of your Hebrew birth month.',
    },
    crumb: { he: 'קבלה', en: 'Kabbalah' },
    priority: '0.8',
  },
  {
    path: '/psychology',
    footer: true,
    title: {
      he: 'מבחן אישיות | MBTI, אניאגרם וביג פייב',
      en: 'Personality test | MBTI, Enneagram and Big Five',
    },
    description: {
      he: 'שלושה שאלוני אישיות קצרים: 16 טיפוסי MBTI, תשעת טיפוסי האניאגרם וחמש התכונות הגדולות. התשובות נשארות במכשיר.',
      en: 'Three short personality questionnaires: 16 MBTI types, the Enneagram and the Big Five. Answers stay on your device.',
    },
    crumb: { he: 'פסיכולוגיה', en: 'Psychology' },
    priority: '0.7',
  },
  {
    path: '/zohar',
    footer: true,
    title: {
      he: 'קריאת פנים ויד לפי הזוהר',
      en: 'Face and palm reading from the Zohar',
    },
    description: {
      he: 'לפי פרשת יתרו: קריאת תווי פנים וקווי כף היד. מעלים תמונה, בוחרים מאפיינים ומקבלים פירוש לפי ארבעת הטמפרמנטים.',
      en: 'From the Zohar, portion Yitro: a reading of the face and the lines of the hand. Upload a photo, choose features and get an interpretation.',
    },
    crumb: { he: 'זוהר', en: 'Zohar' },
    priority: '0.7',
  },
  {
    path: '/graphology',
    footer: true,
    title: {
      he: 'גרפולוגיה | ניתוח כתב יד אונליין',
      en: 'Graphology | Handwriting analysis online',
    },
    description: {
      he: 'ניתוח כתב יד מהתמונה: נטייה, גודל אותיות, לחץ, קו כתיבה ומרווחים, עם פירוש לכל מאפיין.',
      en: 'Handwriting analysis from a photo: slant, letter size, pressure, baseline and spacing, each one interpreted.',
    },
    crumb: { he: 'גרפולוגיה', en: 'Graphology' },
    priority: '0.7',
  },
  {
    path: '/hd',
    footer: true,
    title: {
      he: 'עיצוב אנושי | סוג, סמכות ופרופיל',
      en: 'Human Design | Type, authority and profile',
    },
    description: {
      he: 'עיצוב אנושי לפי תאריך ושעת לידה: סוג האנרגיה, הסמכות, האסטרטגיה והפרופיל.',
      en: 'Human Design from your birth date and time: energy type, authority, strategy and profile.',
    },
    crumb: { he: 'עיצוב אנושי', en: 'Human Design' },
    priority: '0.7',
  },
  {
    path: '/more',
    title: {
      he: 'עוד כלים | פסיכולוגיה, זוהר, גרפולוגיה ועיצוב אנושי',
      en: 'More tools | Psychology, Zohar, graphology, Human Design',
    },
    description: {
      he: 'כלים נוספים באותו מקום: מבחני אישיות, קריאת פנים ויד לפי הזוהר, ניתוח כתב יד ועיצוב אנושי.',
      en: 'More tools in the same place: personality tests, Zohar face and palm reading, handwriting analysis and Human Design.',
    },
    crumb: { he: 'עוד', en: 'More' },
    priority: '0.5',
  },
];

export const FOOTER_LINKS = SEO_PAGES.filter((p) => p.footer);

const KEYWORDS = 'מפת לידה, מזל לפי תאריך לידה, מזל עברי, מזל סיני, התאמה זוגית, טארוט, קבלה, נומרולוגיה, גרפולוגיה, עיצוב אנושי, הורוסקופ';

export function pageForPath(pathname: string): SeoPage {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  return SEO_PAGES.find((p) => p.path === path) ?? SEO_PAGES[0];
}

export function isIndexableOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
    const host = u.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return false;
    return true;
  } catch {
    return false;
  }
}

/** כתובת האתר הציבורי. בדפדפן: הדומיין שעליו רצים, אלא אם הוגדר VITE_SITE_URL. */
export function browserOrigin(): string {
  const env = (import.meta as { env?: { VITE_SITE_URL?: string } }).env;
  const configured = String(env?.VITE_SITE_URL || '').trim().replace(/\/$/, '');
  if (configured && isIndexableOrigin(configured)) return configured;
  if (typeof window === 'undefined') return '';
  const origin = window.location.origin;
  return isIndexableOrigin(origin) ? origin : '';
}

export function pageUrlForShare(lang: Lang): string {
  if (typeof window === 'undefined') return '';
  const origin = browserOrigin() || window.location.origin;
  const path = window.location.pathname || '/';
  return lang === 'en' ? `${origin}${path}?lang=en` : `${origin}${path}`;
}

/** כדי שפייסבוק, וואטסאפ ו־X יציגו את המפה עצמה ולא את תיאור האתר הכללי. */
export function setSharePreview(title: string, description: string, url: string): void {
  if (typeof document === 'undefined') return;
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  if (url) upsertMeta('property', 'og:url', url);
}

function abs(origin: string, path: string): string {
  if (!origin) return path;
  return `${origin}${path}`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export interface SeoView {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  heUrl: string;
  enUrl: string;
  jsonLd: string;
  noscript: string;
}

export function describeSeo(page: SeoPage, lang: Lang, origin: string): SeoView {
  const title = page.title[lang];
  const description = page.description[lang];
  const heUrl = abs(origin, page.path);
  const enUrl = `${heUrl}${page.path.includes('?') ? '&' : '?'}lang=en`;
  const canonical = lang === 'en' ? enUrl : heUrl;
  const ogImage = abs(origin, '/og.png');
  return {
    title,
    description,
    canonical,
    ogImage,
    heUrl,
    enUrl,
    jsonLd: JSON.stringify(jsonGraph(page, lang, origin, canonical, title, description)).replace(/</g, '\\u003c'),
    noscript: noscriptHtml(page, lang),
  };
}

function crumbs(page: SeoPage, lang: Lang, origin: string): { name: string; item: string }[] {
  const home = SEO_PAGES[0];
  const items = [{ name: home.crumb[lang], item: abs(origin, '/') }];
  if (page.path === '/') return items;
  if (page.parent) {
    const parent = SEO_PAGES.find((p) => p.path === page.parent);
    if (parent) items.push({ name: parent.crumb[lang], item: abs(origin, parent.path) });
  }
  items.push({ name: page.crumb[lang], item: abs(origin, page.path) });
  return items;
}

function jsonGraph(page: SeoPage, lang: Lang, origin: string, canonical: string, title: string, description: string) {
  const site = abs(origin, '/');
  const inLanguage = lang === 'he' ? 'he-IL' : 'en';
  const trail = crumbs(page, lang, origin);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site}#website`,
        url: site || undefined,
        name: BRAND.he,
        alternateName: BRAND.en,
        inLanguage: ['he-IL', 'en'],
        description: SEO_PAGES[0].description.he,
      },
      {
        '@type': 'WebApplication',
        '@id': `${site}#app`,
        name: BRAND.he,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web, Android',
        inLanguage: ['he-IL', 'en'],
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'ILS' },
        description: SEO_PAGES[0].description[lang],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical || undefined,
        name: title,
        description,
        inLanguage,
        isPartOf: { '@id': `${site}#website` },
        about: { '@id': `${site}#app` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: trail.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.item || undefined,
        })),
      },
    ],
  };
}

function noscriptHtml(page: SeoPage, lang: Lang): string {
  const links = FOOTER_LINKS.map((p) => `<a href="${esc(p.path)}">${esc(p.crumb[lang])}</a>`).join(' · ');
  return `<article><h1>${esc(page.title[lang])}</h1><p>${esc(page.description[lang])}</p><nav>${links}</nav></article>`;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const sel = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function urlIsEnglish(): boolean {
  if (typeof location === 'undefined') return false;
  try {
    return new URLSearchParams(location.search).get('lang') === 'en';
  } catch {
    return false;
  }
}

/** מעדכן את ראש המסמך אחרי מעבר מסך או החלפת שפה. גוגל רואה את זה אחרי הרינדור. */
export function applyDocumentSeo(page: SeoPage, lang: Lang): void {
  const origin = browserOrigin();
  const indexLang: Lang = urlIsEnglish() ? 'en' : 'he';
  const view = describeSeo(page, lang, origin);
  const indexed = lang === indexLang ? view : describeSeo(page, indexLang, origin);
  document.title = view.title;
  upsertMeta('name', 'description', view.description);
  upsertMeta('name', 'keywords', KEYWORDS);
  upsertMeta('property', 'og:title', view.title);
  upsertMeta('property', 'og:description', view.description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:locale', lang === 'he' ? 'he_IL' : 'en_US');
  upsertMeta('property', 'og:locale:alternate', lang === 'he' ? 'en_US' : 'he_IL');
  upsertMeta('property', 'og:site_name', BRAND.he);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', view.title);
  upsertMeta('name', 'twitter:description', view.description);
  if (origin) {
    upsertMeta('property', 'og:url', indexed.canonical);
    upsertMeta('property', 'og:image', indexed.ogImage);
    upsertMeta('name', 'twitter:image', indexed.ogImage);
    upsertLink('canonical', indexed.canonical);
    upsertLink('alternate', indexed.heUrl, { hreflang: 'he' });
    upsertLink('alternate', indexed.enUrl, { hreflang: 'en' });
    upsertLink('alternate', indexed.heUrl, { hreflang: 'x-default' });
  }
  const robots = document.querySelector('meta[name="robots"]');
  if (!robots || !/noindex/i.test(robots.getAttribute('content') || '')) {
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }
  let ld = document.getElementById('seo-jsonld');
  if (!ld) {
    ld = document.createElement('script');
    ld.id = 'seo-jsonld';
    ld.setAttribute('type', 'application/ld+json');
    document.head.appendChild(ld);
  }
  ld.textContent = view.jsonLd;
}

export function headBlock(page: SeoPage, origin: string, preview: boolean): string {
  const view = describeSeo(page, 'he', origin);
  const robots = preview
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const lines = [
    `<title>${esc(view.title)}</title>`,
    `<meta name="description" content="${esc(view.description)}" />`,
    `<meta name="keywords" content="${esc(KEYWORDS)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${esc(BRAND.he)}" />`,
    `<meta name="theme-color" content="#1b2438" />`,
    `<meta property="og:title" content="${esc(view.title)}" />`,
    `<meta property="og:description" content="${esc(view.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="he_IL" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta property="og:site_name" content="${esc(BRAND.he)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(view.title)}" />`,
    `<meta name="twitter:description" content="${esc(view.description)}" />`,
  ];
  if (origin) {
    lines.push(
      `<link rel="canonical" href="${esc(view.canonical)}" />`,
      `<link rel="alternate" hreflang="he" href="${esc(view.heUrl)}" />`,
      `<link rel="alternate" hreflang="en" href="${esc(view.enUrl)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${esc(view.heUrl)}" />`,
      `<meta property="og:url" content="${esc(view.canonical)}" />`,
      `<meta property="og:image" content="${esc(view.ogImage)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(BRAND.he)}" />`,
      `<meta name="twitter:image" content="${esc(view.ogImage)}" />`,
    );
  }
  lines.push(`<script type="application/ld+json" id="seo-jsonld">${view.jsonLd}</script>`);
  return lines.join('\n    ');
}

export function bodyBlock(page: SeoPage): string {
  return `<noscript>${noscriptHtml(page, 'he')}</noscript>`;
}
