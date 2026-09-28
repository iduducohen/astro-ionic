import { ELEMENTS, ELEMENT_DESCRIPTIONS, MODALITIES, MODALITY_DESCRIPTIONS, NUMBER_MEANINGS, type Profile } from '../core';
import { useLang } from '../lang';
import LifeAreasCard from './LifeAreasCard';
import { IonIcon } from '@ionic/react';
import { starOutline, pawOutline, calculatorOutline, textOutline, leafOutline, sparklesOutline, diamondOutline } from 'ionicons/icons';

const Sys: React.FC<{ icon: string; label: string; val: React.ReactNode; sub?: string; text?: string }> = ({ icon, label, val, sub, text }) => (
  <article className="sys">
    <h3><span className="sys-ic"><IonIcon icon={icon} aria-hidden="true" /></span>{label}</h3>
    <p className="val">{val}</p>
    {sub && <p className="sub">{sub}</p>}
    {text && <p>{text}</p>}
  </article>
);

const ProfileResult: React.FC<{ p: Profile }> = ({ p }) => {
  const { lang: L, S } = useLang();
  const { western: w, hebrew: h, chinese: c } = p;
  const lp = NUMBER_MEANINGS[p.lifePath];
  const nn = NUMBER_MEANINGS[p.nameNum.number];
  return (
    <div aria-live="polite" className="result">
      <p className="muted" style={{ margin: '0 0 4px', fontSize: 14 }}>{S.ageLine(p.name, p.age)}</p>
      <h2 className="headline">{S.signTitle(w.name[L])}<span className="sym">{w.symbol + '\uFE0E'}</span></h2>
      <p style={{ margin: 0, lineHeight: 1.6 }}>{w.text[L]}</p>
      <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
        <div style={{ padding: '10px 12px', background: 'var(--astro-moon-soft)', borderRadius: '8px', fontSize: '13px', color: 'var(--astro-muted)' }}>
          <strong style={{ color: 'var(--astro-moon)' }}>Decan {p.western_decan.decan.number}:</strong> {p.western_decan.decan.range.he}/{p.western_decan.decan.range.en} \u2014 {p.western_decan.decan.text[L]}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px 12px', background: 'var(--astro-soft)', borderRadius: '8px', fontSize: '13px' }}>
            <div style={{ color: 'var(--astro-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Element</div>
            <div style={{ color: 'var(--astro-moon)', fontWeight: '600' }}>{ELEMENTS[w.element][L]}</div>
            <div style={{ color: 'var(--astro-muted)', fontSize: '12px', marginTop: '6px', lineHeight: '1.4' }}>{ELEMENT_DESCRIPTIONS[w.element][L]}</div>
          </div>
          <div style={{ padding: '10px 12px', background: 'var(--astro-soft)', borderRadius: '8px', fontSize: '13px' }}>
            <div style={{ color: 'var(--astro-muted)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>Modality</div>
            <div style={{ color: 'var(--astro-moon)', fontWeight: '600' }}>{MODALITIES[p.western_modality][L]}</div>
            <div style={{ color: 'var(--astro-muted)', fontSize: '12px', marginTop: '6px', lineHeight: '1.4' }}>{MODALITY_DESCRIPTIONS[p.western_modality][L]}</div>
          </div>
        </div>
      </div>
      <ul className="chips">
        <li>{S.element(ELEMENTS[w.element][L])}</li>
        <li>{S.ruler(w.ruler[L])}</li>
        {w.traits.map((t) => <li key={t.en}>{t[L]}</li>)}
      </ul>

      <div className="systems">
        <Sys icon={starOutline}
          label={S.hebrewSign}
          val={`${h.sign.name[L]} ${h.sign.symbol}\uFE0E`}
          sub={S.hebrewBorn(h.formatted[L], h.month.tribe[L])}
          text={h.sign.id === w.id ? S.hebrewSame : `${S.hebrewDiff} ${h.sign.text[L]}`}
        />
        <Sys icon={pawOutline} label={S.chineseSign} val={c.animal.name[L]}
          sub={S.chineseSub(c.element[L], c.polarity[L], c.chineseYear)} text={c.animal.text[L]} />
        <Sys icon={calculatorOutline} label={S.lifePath} val={`${p.lifePath} — ${lp.title[L]}`} sub={S.lifePathSub} text={lp.text[L]} />
        <Sys icon={textOutline} label={S.nameNumber} val={`${p.nameNum.number} — ${nn.title[L]}`}
          sub={p.nameNum.gematria ? S.gematria(p.nameNum.gematria) : S.pythagorean} text={nn.text[L]} />
        <Sys icon={leafOutline} label={S.celtic} val={p.celtic.name[L]} text={p.celtic.text[L]} />
        <Sys icon={sparklesOutline} label={S.birthCard} val={`${p.tarot.roman} — ${p.tarot.name[L]}`} sub={S.birthCardSub} text={p.tarot.upright[L]} />
        <Sys icon={diamondOutline} label={S.stoneFlower}
          val={<><span className="swatch" style={{ background: p.birth.color }} />{p.birth.stone[L]}</>}
          sub={S.flowerOf(p.birth.flower[L])} />
      </div>
      <LifeAreasCard p={p} />
    </div>
  );
};

export default ProfileResult;
