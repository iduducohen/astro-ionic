/**
 * שרת מקומי לקריאה שמחברת. המפתח של קלוד נשאר כאן, לא בדפדפן.
 * מפעילים עם שאר האפליקציה: npm start
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
loadEnv(path.join(root, '.env'));

const port = Number(process.env.READING_PORT || 8787);
const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const cut = trimmed.indexOf('=');
    if (cut < 1) continue;
    const key = trimmed.slice(0, cut).trim();
    let value = trimmed.slice(cut + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function clip(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function whole(value, max) {
  return Number.isInteger(value) && value >= 0 && value <= max ? value : null;
}

function skyPoint(value, withTime) {
  if (!value || typeof value !== 'object') return undefined;
  const sign = clip(value.sign, 40);
  const place = clip(value.place, 80);
  if (!sign) return undefined;
  if (withTime) {
    const time = clip(value.time, 8);
    if (!/^\d{1,2}:\d{2}$/.test(time)) return undefined;
    return { sign, place, time };
  }
  if (typeof value.estimated !== 'boolean') return undefined;
  return { sign, estimated: value.estimated, place };
}

function factsOf(body) {
  if (!body || (body.lang !== 'he' && body.lang !== 'en')) return null;
  const name = clip(body.name, 80);
  const sunSign = clip(body.sun?.sign, 40);
  const sunElement = clip(body.sun?.element, 40);
  const year = whole(body.chinese?.year, 3000);
  const life = whole(body.lifePath?.number, 99);
  const nameNumber = whole(body.nameNumber?.number, 99);
  if (!name || !sunSign || !sunElement || year === null || life === null || nameNumber === null) return null;
  const facts = {
    lang: body.lang,
    name,
    sun: { sign: sunSign, element: sunElement },
    hebrew: {
      date: clip(body.hebrew?.date, 80),
      sign: clip(body.hebrew?.sign, 40),
      tribe: clip(body.hebrew?.tribe, 40),
    },
    chinese: {
      animal: clip(body.chinese?.animal, 40),
      element: clip(body.chinese?.element, 40),
      polarity: clip(body.chinese?.polarity, 20),
      year,
    },
    lifePath: { number: life, title: clip(body.lifePath?.title, 80) },
    nameNumber: { number: nameNumber, title: clip(body.nameNumber?.title, 80) },
    celtic: clip(body.celtic, 40),
    tarot: clip(body.tarot, 40),
    stone: clip(body.stone, 40),
  };
  const moon = skyPoint(body.moon, false);
  const rising = skyPoint(body.rising, true);
  const written = writtenOf(body.written);
  if (!written) return null;
  if (moon) facts.moon = moon;
  if (rising) facts.rising = rising;
  facts.written = written;
  return facts;
}

const WRITTEN_KEYS = ['sun', 'hebrew', 'chinese', 'lifePath', 'nameNumber', 'celtic', 'tarot', 'stone', 'career', 'money', 'love', 'health', 'strengths', 'challenges'];

function writtenOf(value) {
  if (!value || typeof value !== 'object') return null;
  const written = {};
  for (const key of WRITTEN_KEYS) {
    const line = clip(value[key], 700);
    if (!line) return null;
    written[key] = line;
  }
  const moon = clip(value.moon, 700);
  const rising = clip(value.rising, 700);
  if (moon) written.moon = moon;
  if (rising) written.rising = rising;
  return written;
}

function brief(facts) {
  const he = facts.lang === 'he';
  const lines = [
    he ? `שם: ${facts.name}` : `Name: ${facts.name}`,
    he ? `מזל השמש: ${facts.sun.sign}, יסוד ${facts.sun.element}` : `Sun sign: ${facts.sun.sign}, element ${facts.sun.element}`,
    he
      ? `לוח עברי: ${facts.hebrew.date}, מזל ${facts.hebrew.sign}, שבט ${facts.hebrew.tribe}`
      : `Hebrew calendar: ${facts.hebrew.date}, sign ${facts.hebrew.sign}, tribe ${facts.hebrew.tribe}`,
    he
      ? `שנה סינית: ${facts.chinese.animal}, יסוד ${facts.chinese.element}, ${facts.chinese.polarity}, שנת ${facts.chinese.year}`
      : `Chinese year: ${facts.chinese.animal}, element ${facts.chinese.element}, ${facts.chinese.polarity}, year ${facts.chinese.year}`,
    he
      ? `דרך החיים: ${facts.lifePath.number}, ${facts.lifePath.title}`
      : `Life path: ${facts.lifePath.number}, ${facts.lifePath.title}`,
    he
      ? `מספר השם: ${facts.nameNumber.number}, ${facts.nameNumber.title}`
      : `Name number: ${facts.nameNumber.number}, ${facts.nameNumber.title}`,
    he ? `עץ קלטי: ${facts.celtic}` : `Celtic tree: ${facts.celtic}`,
    he ? `קלף לידה: ${facts.tarot}` : `Birth card: ${facts.tarot}`,
    he ? `אבן: ${facts.stone}` : `Stone: ${facts.stone}`,
  ];
  if (facts.moon) {
    lines.push(he
      ? `ירח: ${facts.moon.sign}${facts.moon.estimated ? `, הערכה לצהריים ב${facts.moon.place}` : `, ב${facts.moon.place}`}`
      : `Moon: ${facts.moon.sign}${facts.moon.estimated ? `, a noon estimate in ${facts.moon.place}` : `, in ${facts.moon.place}`}`);
  } else {
    lines.push(he ? 'אין ירח, כי לא נבחרה עיר.' : 'No Moon, because no city was chosen.');
  }
  if (facts.rising) {
    lines.push(he
      ? `מזל עולה: ${facts.rising.sign}, ב${facts.rising.place} בשעה ${facts.rising.time}`
      : `Rising sign: ${facts.rising.sign}, in ${facts.rising.place} at ${facts.rising.time}`);
  } else {
    lines.push(he ? 'אין מזל עולה, כי אין שעת לידה ידועה.' : 'No rising sign, because the birth time is unknown.');
  }
  lines.push(he ? 'הטקסט שכבר כתוב במפה:' : 'The text already written on the chart:');
  const labels = he
    ? { sun: 'מזל השמש', hebrew: 'מזל עברי', chinese: 'שנה סינית', lifePath: 'דרך החיים', nameNumber: 'מספר השם', celtic: 'עץ', tarot: 'קלף', stone: 'אבן', career: 'קריירה', money: 'כסף', love: 'אהבה', health: 'בריאות', strengths: 'חוזקות', challenges: 'אתגרים', moon: 'ירח', rising: 'מזל עולה' }
    : { sun: 'Sun', hebrew: 'Hebrew sign', chinese: 'Chinese year', lifePath: 'Life path', nameNumber: 'Name number', celtic: 'Tree', tarot: 'Card', stone: 'Stone', career: 'Career', money: 'Money', love: 'Love', health: 'Health', strengths: 'Strengths', challenges: 'Challenges', moon: 'Moon', rising: 'Rising sign' };
  for (const [key, label] of Object.entries(labels)) {
    if (facts.written[key]) lines.push(`${label}: ${facts.written[key]}`);
  }
  return lines.join('\n');
}

function systemPrompt(lang) {
  if (lang === 'he') {
    return `אתה כותב ניתוח מעמיק בעברית, בשפה חמה ובהירה.
קיבלת עובדות שכבר חושבו, וגם את הטקסט שכבר כתוב במפה.
הניתוח משלב את שניהם: מה שכתוב, ומה שאתה מבין כשקוראים את הכל יחד.
אל תעתיק משפט שכבר כתוב. כל שורה אומרת את החיבור, לא את המשפט המקורי.
אל תוסיף כוכב, בית או זווית שלא מופיעים בעובדות.
אל תחזה אירוע, תאריך, או אם משהו יצליח.
אל תכתוב שזו מדידה מדעית.
כתוב תמיד בלשון זכר, כמו שאר המפה: אתה, שלך, נמשך.
החזר JSON בלבד, בלי הסבר מסביב:
{"sections":[{"title":"זוגיות","lines":["משפט.","משפט.","משפט."]},{"title":"פרנסה","lines":["משפט.","משפט.","משפט."]},{"title":"בריאות","lines":["משפט.","משפט.","משפט."]},{"title":"חוזקות","lines":["משפט.","משפט.","משפט."]},{"title":"אתגרים","lines":["משפט.","משפט.","משפט."]}]}
בדיוק חמישה מקטעים, בסדר הזה, עם הכותרות האלה.
בכל מקטע שלוש שורות. כל שורה משפט אחד, עד 18 מילים.
זוגיות: חבר את מה שכתוב על אהבה, על הירח אם יש, ועל מספר השם.
פרנסה: חבר עבודה וכסף, את מזל השמש ואת דרך החיים.
בריאות: חבר את מה שכתוב על הגוף עם מה שמכביד רגשית, בלי אבחון.
חוזקות: מה כבר עובד אצלו, מתוך כמה טקסטים יחד.
אתגרים: איפה הטקסטים מתנגשים, ומה עוזר.`;
  }
  return `You write a deeper reading in English, in warm and plain language.
You receive facts already calculated, and the text already written on the chart.
The reading combines both: what is written, and what you understand when all of it is read together.
Do not copy a sentence that is already written. Each line says the connection, not the original sentence.
Do not add a planet, a house, or an aspect that is not in the facts.
Do not predict an event, a date, or whether something will succeed.
Do not call this a scientific measurement.
Return JSON only, with no surrounding explanation:
{"sections":[{"title":"Relationship","lines":["One sentence.","One sentence.","One sentence."]},{"title":"Livelihood","lines":["One sentence.","One sentence.","One sentence."]},{"title":"Health","lines":["One sentence.","One sentence.","One sentence."]},{"title":"Strengths","lines":["One sentence.","One sentence.","One sentence."]},{"title":"Challenges","lines":["One sentence.","One sentence.","One sentence."]}]}
Exactly five sections, in this order, with these titles.
Each section has three lines. Each line is one sentence, up to 18 words.
Relationship: connect what is written about love, the Moon if present, and the name number.
Livelihood: connect work and money, the Sun sign and the life path.
Health: connect what is written about the body with what weighs emotionally, with no diagnosis.
Strengths: what already works, drawn from several texts together.
Challenges: where the texts pull apart, and what helps.`;
}

function sectionsOf(text) {
  const raw = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || !Array.isArray(data.sections)) return null;
  const sections = data.sections
    .map((section) => ({
      title: clip(section?.title, 40),
      lines: Array.isArray(section?.lines)
        ? section.lines.map((line) => clip(line, 180)).filter(Boolean).slice(0, 4)
        : [],
    }))
    .filter((section) => section.title && section.lines.length)
    .slice(0, 5);
  return sections.length ? sections : null;
}

function send(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

async function claude(facts) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 2200,
      thinking: { type: 'between_tools' },
      system: systemPrompt(facts.lang),
      messages: [{ role: 'user', content: brief(facts) }],
    }),
    signal: AbortSignal.timeout(45000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('claude', response.status, data.error?.type || '');
    if (response.status === 401) return { error: 'rejected-key' };
    return { error: 'claude-failed' };
  }
  const text = (data.content || [])
    .filter((block) => block.type === 'text' && block.text)
    .map((block) => block.text.trim())
    .filter(Boolean)
    .join('\n\n')
    .trim();
  const sections = sectionsOf(text);
  return sections ? { sections } : { error: 'claude-failed' };
}

const server = createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/reading') {
    send(res, 404, { error: 'not-found' });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    send(res, 503, { error: 'missing-key' });
    return;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 40_000) {
      send(res, 413, { error: 'bad-facts' });
      return;
    }
    chunks.push(chunk);
  }
  let body;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    send(res, 400, { error: 'bad-facts' });
    return;
  }
  const facts = factsOf(body);
  if (!facts) {
    send(res, 400, { error: 'bad-facts' });
    return;
  }
  try {
    const result = await claude(facts);
    if (result.error) {
      send(res, result.error === 'rejected-key' ? 401 : 502, result);
      return;
    }
    send(res, 200, { sections: result.sections });
  } catch (err) {
    console.error('claude', err instanceof Error ? err.name : 'error');
    send(res, 502, { error: 'claude-failed' });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`reading server on http://127.0.0.1:${port} (${model})`);
});
