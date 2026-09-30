import { ELEMENTS, type El } from '../../core/zohar';

export interface Temperament {
  id: El;
  name: { he: string; en: string };
  title: { he: string; en: string };
  text: { he: string; en: string };
  gift: { he: string; en: string };
  care: { he: string; en: string };
}

/** ארבעת המזגים. המסך רק מציג את הרשימה הזו. */
export const TEMPERAMENTS: Temperament[] = (['fire', 'air', 'water', 'earth'] as El[]).map((id) => {
  const el = ELEMENTS[id];
  return {
    id,
    name: el.name,
    title: el.temperament,
    text: el.text,
    gift: el.gift,
    care: el.care,
  };
});
