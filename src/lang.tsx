import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { detectLang, dirOf, STRINGS, type Lang, type Strings } from './core';
import { loadJSON, saveJSON } from './storage';

interface LangCtx { lang: Lang; S: Strings; toggle: () => void }

const Ctx = createContext<LangCtx | null>(null);

/** שפה נוכחית + מחרוזות. מעדכן גם lang/dir על <html>, כך ש-Ionic הופך כיוון אוטומטית. */
export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(detectLang());

  useEffect(() => {
    loadJSON<Lang>('astro:lang').then((l) => l && setLang(l));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirOf(lang);
    document.title = STRINGS[lang].appTitle;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => {
      const next: Lang = l === 'he' ? 'en' : 'he';
      saveJSON('astro:lang', next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lang, S: STRINGS[lang], toggle }), [lang, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useLang must be used inside LangProvider');
  return c;
}
