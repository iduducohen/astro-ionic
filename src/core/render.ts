/**
 * render.ts — הצגה משותפת: גלגל מפה ב-SVG ודוח ב-HTML.
 * האתר מכניס את זה ב-innerHTML, והאפליקציה ב-dangerouslySetInnerHTML. כל טקסט עובר escape.
 */
import { ZODIAC } from './astro.ts';
import { natalAspects, norm, type Chart, type Point } from './chart.ts';
import type { Report } from './techniques.ts';
import { POINTS } from './texts.ts';

export const esc = (s: string): string =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const VS = '\uFE0E';
const EL_VAR: Record<string, string> = { fire: '--el-fire', earth: '--el-earth', air: '--el-air', water: '--el-water' };

/** פיזור תוויות כדי שכוכבים צמודים לא יעלו זה על זה */
function spread(points: Point[], minSep: number): { p: Point; a: number }[] {
  const arr = points.map((p) => ({ p, a: p.lon })).sort((x, y) => x.a - y.a);
  for (let iter = 0; iter < 60; iter++) {
    let moved = false;
    for (let i = 0; i < arr.length; i++) {
      const cur = arr[i], nxt = arr[(i + 1) % arr.length];
      const gap = norm(nxt.a - cur.a);
      if (arr.length > 1 && gap < minSep) {
        const push = (minSep - gap) / 2;
        cur.a = norm(cur.a - push); nxt.a = norm(nxt.a + push); moved = true;
      }
    }
    if (!moved) break;
  }
  return arr;
}

export function wheelSVG(inner: Chart, outer?: Chart): string {
  const C = 260, R_OUT = 250, R_SIGN = 212, R_ASP = outer ? 96 : 104;
  const base = inner.points.asc?.lon ?? 0; // ASC משמאל; בלי שעה — טלה משמאל
  const ang = (lon: number) => ((180 + lon - base) * Math.PI) / 180;
  const xy = (lon: number, r: number) => [C + r * Math.cos(ang(lon)), C - r * Math.sin(ang(lon))].map((v) => v.toFixed(2));
  const o: string[] = [];
  o.push(`<svg class="wheel-chart" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg" role="img">`);
  o.push(`<circle cx="${C}" cy="${C}" r="${R_OUT}" fill="var(--surface)" stroke="var(--line)"/>`);
  // טבעת המזלות
  for (let i = 0; i < 12; i++) {
    const a0 = i * 30, a1 = a0 + 30;
    const [x0, y0] = xy(a0, R_OUT), [x1, y1] = xy(a1, R_OUT), [x2, y2] = xy(a1, R_SIGN), [x3, y3] = xy(a0, R_SIGN);
    o.push(`<path d="M${x0} ${y0} A${R_OUT} ${R_OUT} 0 0 0 ${x1} ${y1} L${x2} ${y2} A${R_SIGN} ${R_SIGN} 0 0 1 ${x3} ${y3}Z" fill="var(${EL_VAR[ZODIAC[i].element]})" stroke="var(--line)"/>`);
    const [gx, gy] = xy(a0 + 15, (R_OUT + R_SIGN) / 2);
    o.push(`<text x="${gx}" y="${gy}" class="w-sign" text-anchor="middle" dominant-baseline="central">${ZODIAC[i].symbol}${VS}</text>`);
  }
  o.push(`<circle cx="${C}" cy="${C}" r="${R_SIGN}" fill="none" stroke="var(--line)"/>`);
  if (outer) o.push(`<circle cx="${C}" cy="${C}" r="174" fill="none" stroke="var(--line)" stroke-dasharray="2 3"/>`);
  o.push(`<circle cx="${C}" cy="${C}" r="${R_ASP}" fill="var(--bg)" stroke="var(--line)"/>`);
  // בתים
  if (inner.cusps) {
    inner.cusps.forEach((cu, i) => {
      const angular = i % 3 === 0;
      const [x0, y0] = xy(cu, R_ASP), [x1, y1] = xy(cu, R_SIGN);
      o.push(`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${angular ? 'var(--ink)' : 'var(--line)'}" stroke-width="${angular ? 1.6 : 1}"/>`);
      const next = inner.cusps![(i + 1) % 12], mid = cu + norm(next - cu) / 2;
      const [hx, hy] = xy(mid, R_ASP + 10);
      o.push(`<text x="${hx}" y="${hy}" class="w-house" text-anchor="middle" dominant-baseline="central">${i + 1}</text>`);
    });
    for (const [lon, lbl] of [[inner.cusps[0], 'AC'], [inner.cusps[9], 'MC']] as [number, string][]) {
      const [lx, ly] = xy(lon + 4, R_SIGN - 11);
      o.push(`<text x="${lx}" y="${ly}" class="w-angle" text-anchor="middle" dominant-baseline="central">${lbl}</text>`);
    }
  }
  // היבטים (במפה בודדת)
  if (!outer) {
    for (const a of natalAspects(inner).filter((x) => x.type !== 'conj' && x.a !== 'node' && x.b !== 'node')) {
      const pa = inner.points[a.a]!, pb = inner.points[a.b]!;
      const [x0, y0] = xy(pa.lon, R_ASP), [x1, y1] = xy(pb.lon, R_ASP);
      const hard = a.type === 'square' || a.type === 'opp';
      o.push(`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="var(${hard ? '--tense' : '--good'})" stroke-width="${a.orb < 2 ? 1.6 : 1}" opacity="${(1 - a.orb / 10).toFixed(2)}"/>`);
    }
  }
  // כוכבים
  const ring = (ch: Chart, rTick: number, rGlyph: number, cls: string, minSep: number) => {
    const pts = [...ch.planets, ch.points.node!].filter(Boolean);
    for (const { p, a } of spread(pts, minSep)) {
      const [tx, ty] = xy(p.lon, rTick), [tx2, ty2] = xy(p.lon, rTick - 6);
      const [gx, gy] = xy(a, rGlyph), [dx, dy] = xy(a, rGlyph - 17);
      o.push(`<line x1="${tx}" y1="${ty}" x2="${tx2}" y2="${ty2}" stroke="var(--ink)"/>`);
      o.push(`<text x="${gx}" y="${gy}" class="${cls}" text-anchor="middle" dominant-baseline="central">${POINTS[p.id].glyph}${VS}</text>`);
      o.push(`<text x="${dx}" y="${dy}" class="w-deg" text-anchor="middle" dominant-baseline="central">${Math.floor(p.deg)}${p.retro ? 'ʀ' : ''}</text>`);
    }
  };
  if (outer) {
    ring(inner, R_ASP + 1, 150, 'w-planet', 9);
    ring(outer, R_SIGN, 194, 'w-planet w-outer', 9);
  } else {
    ring(inner, R_SIGN, 186, 'w-planet', 8);
  }
  o.push('</svg>');
  return o.join('');
}

export function reportHTML(r: Report): string {
  const o: string[] = ['<div class="report">'];
  o.push(`<header class="r-head"><h2 class="r-title">${esc(r.title)}</h2>${r.subtitle ? `<p class="r-sub">${esc(r.subtitle)}</p>` : ''}</header>`);
  if (r.verdict) {
    o.push(`<div class="r-verdict tone-${r.verdict.tone}"><p class="v-label">${esc(r.verdict.label)}${r.verdict.score !== undefined ? ` <span class="v-score">${r.verdict.score}%</span>` : ''}</p><p class="v-text">${esc(r.verdict.text)}</p></div>`);
  }
  if (r.wheel) {
    o.push(`<figure class="r-wheel">${wheelSVG(r.wheel.inner, r.wheel.outer)}${r.wheel.caption ? `<figcaption>${esc(r.wheel.caption)}</figcaption>` : ''}</figure>`);
  }
  for (const s of r.sections) {
    o.push(`<section class="r-sec"><h3>${esc(s.title)}</h3>${s.intro ? `<p class="r-intro">${esc(s.intro)}</p>` : ''}`);
    for (const it of s.items) {
      o.push(`<article class="ri tone-${it.tone ?? 'neutral'}">`
        + (it.label ? `<h4>${esc(it.label)}</h4>` : '<h4></h4>')
        + '<div>'
        + (it.value || it.tag ? `<p class="ri-val">${esc(it.value)}${it.tag ? ` <span class="tag">${esc(it.tag)}</span>` : ''}</p>` : '')
        + (it.sub ? `<p class="ri-sub">${esc(it.sub)}</p>` : '')
        + (it.text ? `<p class="ri-text">${esc(it.text)}</p>` : '')
        + '</div></article>');
    }
    o.push('</section>');
  }
  if (r.notes.length) o.push(`<ul class="r-notes">${r.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`);
  o.push('</div>');
  return o.join('');
}
