import type { HDAuthority, HDType } from '../../core/human-design';

/** מה שהמשתמש הזין. נפרד מתוצאת החישוב. */
export interface BirthData {
  date: string;
  time: string;
  timeUnknown: boolean;
  place: string;
}

export interface UserProfile {
  name: string;
}

/** מה שהמסכים מציגים. לא תלוי במנוע החישוב. */
export interface HdChartView {
  typeId: HDType;
  typeName: { he: string; en: string };
  typeRole: { he: string; en: string };
  typeDescription: { he: string; en: string };
  strategy: { he: string; en: string };
  authorityId: HDAuthority;
  authorityName: { he: string; en: string };
  profileLabel: { he: string; en: string };
  timeLimited: boolean;
}

export type HdTopic = 'type' | 'strategy' | 'authority' | 'profile';
