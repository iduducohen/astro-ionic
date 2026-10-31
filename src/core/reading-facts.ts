import { BIRTH_MONTH, ELEMENTS, NUMBER_MEANINGS, ZODIAC, type Profile } from './astro';
import { lifeAreas } from './life-areas';
import { CN_ELEMENT, CN_POLE, MOON_NEED, RISE_FACE, STONE_NOTE } from './reading-use';

export interface ReadingSky {
  moon?: { sign: string; estimated: boolean; place: string };
  rising?: { sign: string; place: string; time: string };
}

/** העובדות שכבר חושבו. המודל מקבל רק את זה, ולא בוחר מזל בעצמו. */
export interface ReadingFacts {
  lang: 'he' | 'en';
  name: string;
  sun: { sign: string; element: string };
  hebrew: { date: string; sign: string; tribe: string };
  chinese: { animal: string; element: string; polarity: string; year: number };
  lifePath: { number: number; title: string };
  nameNumber: { number: number; title: string };
  celtic: string;
  tarot: string;
  stone: string;
  /** הטקסטים שכבר מופיעים במפה. המודל משלב אותם עם הקריאה שלו. */
  written: ReadingWritten;
  moon?: { sign: string; estimated: boolean; place: string };
  rising?: { sign: string; place: string; time: string };
}

export interface ReadingWritten {
  sun: string;
  hebrew: string;
  chinese: string;
  lifePath: string;
  nameNumber: string;
  celtic: string;
  tarot: string;
  stone: string;
  career: string;
  money: string;
  love: string;
  health: string;
  strengths: string;
  challenges: string;
  moon?: string;
  rising?: string;
}

export function readingFacts(profile: Profile, lang: 'he' | 'en', sky: ReadingSky = {}): ReadingFacts {
  const life = NUMBER_MEANINGS[profile.lifePath];
  const name = NUMBER_MEANINGS[profile.nameNum.number];
  const facts: ReadingFacts = {
    lang,
    name: profile.name,
    sun: { sign: profile.western.name[lang], element: ELEMENTS[profile.western.element][lang] },
    hebrew: {
      date: profile.hebrew.formatted[lang],
      sign: profile.hebrew.sign.name[lang],
      tribe: profile.hebrew.month.tribe[lang],
    },
    chinese: {
      animal: profile.chinese.animal.name[lang],
      element: profile.chinese.element[lang],
      polarity: profile.chinese.polarity[lang],
      year: profile.chinese.chineseYear,
    },
    lifePath: { number: profile.lifePath, title: life?.title[lang] ?? '' },
    nameNumber: { number: profile.nameNum.number, title: name?.title[lang] ?? '' },
    celtic: profile.celtic.name[lang],
    tarot: profile.tarot.name[lang],
    stone: profile.birth.stone[lang],
    written: writtenOf(profile, lang, sky),
  };
  if (sky.moon?.sign) facts.moon = sky.moon;
  if (sky.rising?.sign) facts.rising = sky.rising;
  return facts;
}

function join(parts: string[]): string {
  return parts.map((part) => part.trim()).filter(Boolean).join(' ');
}

function signId(name: string): string | undefined {
  return ZODIAC.find((sign) => sign.name.he === name || sign.name.en === name)?.id;
}

function writtenOf(profile: Profile, lang: 'he' | 'en', sky: ReadingSky): ReadingWritten {
  const areas = lifeAreas(profile);
  const life = NUMBER_MEANINGS[profile.lifePath];
  const name = NUMBER_MEANINGS[profile.nameNum.number];
  const month = BIRTH_MONTH.indexOf(profile.birth);
  const element = profile.chinese.element[lang];
  const polarity = profile.chinese.polarity[lang];
  const written: ReadingWritten = {
    sun: profile.western.text[lang],
    hebrew: profile.hebrew.sign.text[lang],
    chinese: join([
      profile.chinese.animal.text[lang],
      CN_ELEMENT[element]?.[lang] ?? '',
      CN_POLE[polarity]?.[lang] ?? '',
    ]),
    lifePath: join([life?.text[lang] ?? '', life?.title[lang] ?? '']),
    nameNumber: name?.text[lang] ?? '',
    celtic: profile.celtic.text[lang],
    tarot: profile.tarot.upright[lang],
    stone: STONE_NOTE[month]?.[lang] ?? profile.birth.stone[lang],
    career: join([areas.areas.career[lang], areas.lifePath.career[lang]]),
    money: areas.areas.money[lang],
    love: join([areas.areas.love[lang], areas.lifePath.love[lang]]),
    health: join([areas.areas.health[lang], areas.healthEl[lang]]),
    strengths: areas.areas.strengths[lang],
    challenges: areas.areas.challenges[lang],
  };
  const moonId = sky.moon?.sign ? signId(sky.moon.sign) : undefined;
  const risingId = sky.rising?.sign ? signId(sky.rising.sign) : undefined;
  if (moonId && MOON_NEED[moonId]) written.moon = MOON_NEED[moonId][lang];
  if (risingId && RISE_FACE[risingId]) written.rising = RISE_FACE[risingId][lang];
  return written;
}
