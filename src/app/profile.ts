import { buildProfile, parseDate, type Profile, type Strings } from '../core';

export function readProfile(S: Strings, name: string, birth: string, afterSunset = false): Profile {
  if (!birth) throw new Error(S.errNoDate);
  if (!parseDate(birth)) throw new Error(S.errBadDate);
  if (new Date(birth) > new Date()) throw new Error(S.errFuture);
  return buildProfile({ name: name.trim() || S.guest, birthDate: birth, afterSunset });
}
