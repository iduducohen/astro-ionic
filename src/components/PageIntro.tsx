import { useState, type ReactNode } from 'react';
import { IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, bookOutline } from 'ionicons/icons';
import { PAGE_INFO, type PageKey } from '../core/page-info';
import { useLang } from '../lang';
import Modal from './Modal';

/** כותרת המסך + תקציר קצר + "קרא עוד" שפותח הסבר מורחב */
const PageIntro: React.FC<{ page: PageKey; title: string; extra?: ReactNode }> = ({ page, title, extra }) => {
  const { lang: L } = useLang();
  const [open, setOpen] = useState(false);
  const info = PAGE_INFO[page];
  return (
    <header className="pintro">
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{info.summary[L]}</p>
      <ul className="pintro-facts">
        {info.facts.map((f, i) => <li key={i}><IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />{f[L]}</li>)}
      </ul>
      <button type="button" className="pintro-more" onClick={() => setOpen(true)}>
        <IonIcon icon={bookOutline} aria-hidden="true" />
        {L === 'he' ? 'קרא עוד על הנושא' : 'Read more about this'}
        <span aria-hidden="true">{L === 'he' ? ' ←' : ' →'}</span>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title} size={extra ? 'large' : 'medium'}>
        <div className="info-body">
          <p className="info-lead">{info.summary[L]}</p>
          {!extra && info.more.map((s, i) => (
            <section key={i}>
              <h3>{s.title[L]}</h3>
              <p>{s.text[L]}</p>
            </section>
          ))}
          {extra}
        </div>
      </Modal>
    </header>
  );
};

export default PageIntro;
