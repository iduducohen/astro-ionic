import type { HumanDesignChart } from '../../core/human-design';
import { HD_AUTHORITIES } from '../../core/human-design';
import type { BirthData, HdChartView } from './models';

export function birthIssue(input: Pick<BirthData, 'date' | 'time' | 'timeUnknown'>): 'date' | 'time' | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.date);
  if (!match) return 'date';
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (year < 1800 || year > 2200 || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return 'date';
  if (input.timeUnknown) return null;
  const time = /^(\d{2}):(\d{2})$/.exec(input.time);
  if (!time) return 'time';
  const hour = Number(time[1]);
  const minute = Number(time[2]);
  if (hour > 23 || minute > 59) return 'time';
  return null;
}

export function toChartView(raw: HumanDesignChart, timeUnknown: boolean): HdChartView {
  return {
    typeId: raw.type.id,
    typeName: raw.type.name,
    typeRole: raw.type.role,
    typeDescription: raw.type.description,
    strategy: raw.type.strategy,
    authorityId: raw.authority,
    authorityName: HD_AUTHORITIES[raw.authority],
    profileLabel: raw.profileData,
    timeLimited: timeUnknown,
  };
}
