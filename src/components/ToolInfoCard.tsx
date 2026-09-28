import { useState } from 'react';
import { TOOL_INFO } from '../core/tool-info';
import { useLang } from '../lang';
import Modal from './Modal';
import { IonIcon } from '@ionic/react';
import { listOutline, giftOutline, bookOutline } from 'ionicons/icons';

/** כרטיס "מה זה / מה צריך / מה מקבלים" לכל מפה, עם הסבר מלא בחלון */
const ToolInfoCard: React.FC<{ tool: string; title: string }> = ({ tool, title }) => {
  const { lang: L } = useLang();
  const he = L === 'he';
  const [open, setOpen] = useState(false);
  const info = TOOL_INFO[tool];
  if (!info) return null;
  return (
    <section className="tinfo">
      <p className="tinfo-what">{info.what[L]}</p>
      <div className="tinfo-cols">
        <div>
          <h3><IonIcon icon={listOutline} aria-hidden="true" />{he ? 'מה צריך' : 'You need'}</h3>
          <ul>{info.needs.map((n, i) => <li key={i}>{n[L]}</li>)}</ul>
        </div>
        <div>
          <h3><IonIcon icon={giftOutline} aria-hidden="true" />{he ? 'מה תקבלו' : 'You get'}</h3>
          <ul>{info.get.map((n, i) => <li key={i}>{n[L]}</li>)}</ul>
        </div>
      </div>
      <button type="button" className="pintro-more" onClick={() => setOpen(true)}>
        <IonIcon icon={bookOutline} aria-hidden="true" />
        {he ? 'איך קוראים את המפה? הסבר מלא' : 'How to read it — full guide'}<span aria-hidden="true">{he ? ' ←' : ' →'}</span>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title}>
        <div className="info-body">
          <p className="info-lead">{info.what[L]}</p>
          <section><h3>{he ? 'איך לקרוא' : 'How to read it'}</h3><p>{info.read[L]}</p></section>
          {info.deep.map((d, i) => <section key={i}><h3>{d.title[L]}</h3><p>{d.text[L]}</p></section>)}
          <section><h3>{he ? 'טיפ' : 'Tip'}</h3><p>{info.tip[L]}</p></section>
        </div>
      </Modal>
    </section>
  );
};

export default ToolInfoCard;
