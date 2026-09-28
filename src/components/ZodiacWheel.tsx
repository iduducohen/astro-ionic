import { useRef } from 'react';
import { ZODIAC } from '../core';

interface Props {
  /** אינדקס המזל ב-ZODIAC, או null לפני חישוב */
  index: number | null;
}

/** גלגל המזלות. מסתובב קדימה תמיד, כך שהמזל שנבחר נעצר למעלה מתחת לסמן. */
const ZodiacWheel: React.FC<Props> = ({ index }) => {
  const rot = useRef(0);
  const last = useRef<number | null>(null);

  if (index !== null && index !== last.current) {
    const target = -index * 30;
    const delta = (((target - rot.current) % 360) + 360) % 360;
    rot.current += delta + 360;
    last.current = index;
  }

  const pt = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [110 + r * Math.cos(a), 110 + r * Math.sin(a)];
  };

  return (
    <svg className="wheel" viewBox="0 0 220 220" aria-hidden="true">
      <circle cx="110" cy="110" r="104" fill="var(--astro-wheel)" stroke="var(--astro-wheel-line)" strokeWidth="1" />
      <circle cx="110" cy="110" r="62" fill="none" stroke="var(--astro-wheel-line)" />
      <circle cx="110" cy="110" r="98" fill="none" stroke="var(--astro-wheel-line)" strokeWidth=".6" />
      <g className="rot" style={{ transform: `rotate(${rot.current}deg)` }}>
        {ZODIAC.map((s, i) => {
          const [x1, y1] = pt(i * 30 - 15, 62);
          const [x2, y2] = pt(i * 30 - 15, 104);
          const [tx, ty] = pt(i * 30, 83);
          return (
            <g key={s.id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--astro-wheel-line)" />
              <text
                x={tx} y={ty} textAnchor="middle" dominantBaseline="central"
                transform={`rotate(${i * 30} ${tx} ${ty})`}
                className={i === index ? 'on' : undefined}
              >
                {s.symbol + '\uFE0E'}
              </text>
            </g>
          );
        })}
      </g>
      <path d="M110 3 l-5 0 l5 9 l5 -9 z" fill="var(--astro-moon)" />
      <text x="110" y="110" textAnchor="middle" dominantBaseline="central"
        style={{ font: '500 26px var(--display-font)', fill: index === null ? 'var(--astro-moon)' : 'var(--ion-text-color)' }}>
        {index === null ? '✦' : ZODIAC[index].symbol + '\uFE0E'}
      </text>
    </svg>
  );
};

export default ZodiacWheel;
