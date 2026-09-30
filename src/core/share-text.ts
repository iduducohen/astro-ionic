/**
 * share-text.ts — טקסטים מעוצבים לשיתוף (וואטסאפ, טלגרם, מייל…), שורה לכל מערכת.
 */
import { ELEMENTS, NUMBER_MEANINGS, type Lang, type Profile } from './astro';
import { lifeAreas } from './life-areas';

export function profileShareText(p: Profile, lang: Lang): string {
  const he = lang === 'he';
  const w = p.western, h = p.hebrew, c = p.chinese;
  const lp = NUMBER_MEANINGS[p.lifePath], nn = NUMBER_MEANINGS[p.nameNum.number];
  const lines = he ? [
    `✨ ${p.name} · מה כתוב לך בכוכבים`,
    '',
    `${w.symbol} מזל: ${w.name.he} (${ELEMENTS[w.element].he}, כוכב שולט: ${w.ruler.he})`,
    `✡ מזל עברי: ${h.sign.name.he} · נולדת ב${h.formatted.he} · שבט ${h.month.tribe.he}`,
    `${c.animal.emoji} מזל סיני: ${c.animal.name.he} (${c.element.he}, ${c.polarity.he})`,
    `🔢 דרך החיים: ${p.lifePath} — ${lp.title.he}`,
    `🔤 מספר השם: ${p.nameNum.number} — ${nn.title.he}`,
    `🌳 עץ קלטי: ${p.celtic.name.he}`,
    `🃏 קלף הלידה: ${p.tarot.name.he}`,
    `💎 אבן: ${p.birth.stone.he} · פרח: ${p.birth.flower.he}`,
  ] : [
    `✨ ${p.name} · What the stars say`,
    '',
    `${w.symbol} Sign: ${w.name.en} (${ELEMENTS[w.element].en}, ruled by ${w.ruler.en})`,
    `✡ Hebrew sign: ${h.sign.name.en} · born ${h.formatted.en} · tribe of ${h.month.tribe.en}`,
    `${c.animal.emoji} Chinese sign: ${c.animal.name.en} (${c.element.en}, ${c.polarity.en})`,
    `🔢 Life path: ${p.lifePath} — ${lp.title.en}`,
    `🔤 Name number: ${p.nameNum.number} — ${nn.title.en}`,
    `🌳 Celtic tree: ${p.celtic.name.en}`,
    `🃏 Birth card: ${p.tarot.name.en}`,
    `💎 Stone: ${p.birth.stone.en} · Flower: ${p.birth.flower.en}`,
  ];
  const a = lifeAreas(p), L = lang;
  lines.push(
    '',
    he ? '— תחומי חיים —' : '— Life areas —',
    `💼 ${he ? 'קריירה' : 'Career'}: ${a.areas.career[L]} ${a.lifePath.career[L]}`,
    `💰 ${he ? 'כסף' : 'Money'}: ${a.areas.money[L]}`,
    `❤️ ${he ? 'אהבה וזוגיות' : 'Love'}: ${a.areas.love[L]}`,
    `🩺 ${he ? 'בריאות' : 'Health'}: ${a.areas.health[L]}`,
    `💪 ${he ? 'חוזקות' : 'Strengths'}: ${a.areas.strengths[L]}`,
    `⚠️ ${he ? 'אתגרים' : 'Challenges'}: ${a.areas.challenges[L]}`,
    `🤝 ${he ? 'מתאימים לך' : 'Good matches'}: ${a.matchSigns.map((m) => m[L]).join(', ')}`,
    `🍀 ${he ? 'יום מזל' : 'Lucky day'}: ${a.luckyDay[L]} · ${he ? 'מספרים' : 'numbers'}: ${a.luckyNumbers.join(', ')}`,
  );
  return lines.join('\n');
}

/** גרסה קצרה (עד 280 תווים) לרשתות עם מגבלת אורך, כמו X */
export function profileShortText(p: Profile, lang: Lang): string {
  return lang === 'he'
    ? `✨ ${p.name}: ${p.western.symbol} ${p.western.name.he} · מזל עברי ${p.hebrew.sign.name.he} · ${p.chinese.animal.emoji} ${p.chinese.animal.name.he} · דרך חיים ${p.lifePath} · עץ ${p.celtic.name.he}`
    : `✨ ${p.name}: ${p.western.symbol} ${p.western.name.en} · Hebrew ${p.hebrew.sign.name.en} · ${p.chinese.animal.emoji} ${p.chinese.animal.name.en} · life path ${p.lifePath} · ${p.celtic.name.en} tree`;
}
