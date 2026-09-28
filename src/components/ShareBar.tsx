import { useState } from 'react';
import { IonIcon, useIonToast } from '@ionic/react';
import { Share } from '@capacitor/share';
import {
  logoWhatsapp, logoFacebook, logoX, logoInstagram, paperPlaneOutline, mailOutline, chatbubbleOutline,
  copyOutline, shareSocialOutline,
} from 'ionicons/icons';
import { useLang } from '../lang';
import Modal from './Modal';

interface Props {
  title: string;
  text: string;
  short?: string;
}

const enc = encodeURIComponent;
const open = (url: string) => window.open(url, '_blank', 'noopener');

const ShareBar: React.FC<Props> = ({ title, text, short }) => {
  const { lang } = useLang();
  const he = lang === 'he';
  const [isOpen, setIsOpen] = useState(false);
  const [toast] = useIonToast();

  const copy = async (msg?: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* דפדפן ישן */ }
    toast({ message: msg ?? (he ? 'הסיכום הועתק' : 'Summary copied'), duration: 2200, position: 'bottom' });
  };
  const copyThen = async (url: string) => {
    await copy(he ? 'הסיכום הועתק — הדביקו אותו בפוסט' : 'Summary copied — paste it into your post');
    open(url);
    setIsOpen(false);
  };
  const more = async () => {
    try {
      if ((await Share.canShare()).value) await Share.share({ title, text });
      else if (navigator.share) await navigator.share({ title, text });
      else await copy();
    } catch { /* בוטל */ }
    setIsOpen(false);
  };

  const items = [
    { id: 'wa', label: 'WhatsApp', icon: logoWhatsapp, on: () => { open(`https://wa.me/?text=${enc(text)}`); setIsOpen(false); } },
    { id: 'tg', label: 'Telegram', icon: paperPlaneOutline, on: () => { open(`https://t.me/share/url?url=${enc(' ')}&text=${enc(text)}`); setIsOpen(false); } },
    { id: 'x', label: 'X', icon: logoX, on: () => { open(`https://x.com/intent/post?text=${enc((short ?? text).slice(0, 270))}`); setIsOpen(false); } },
    { id: 'fb', label: 'Facebook', icon: logoFacebook, on: () => copyThen('https://www.facebook.com/') },
    { id: 'ig', label: 'Instagram', icon: logoInstagram, on: () => copyThen('https://www.instagram.com/') },
    { id: 'mail', label: he ? 'מייל' : 'Email', icon: mailOutline, on: () => { open(`mailto:?subject=${enc(title)}&body=${enc(text)}`); setIsOpen(false); } },
    { id: 'sms', label: 'SMS', icon: chatbubbleOutline, on: () => { open(`sms:?&body=${enc(text)}`); setIsOpen(false); } },
    { id: 'copy', label: he ? 'העתקה' : 'Copy', icon: copyOutline, on: () => { copy(); setIsOpen(false); } },
    { id: 'more', label: he ? 'עוד…' : 'More…', icon: shareSocialOutline, on: more },
  ];

  return (
    <>
      <div className="share-bar-container">
        <button
          type="button"
          className="share-button-main"
          onClick={() => setIsOpen(true)}
          aria-label={he ? 'שיתוף' : 'Share'}
        >
          <IonIcon icon={shareSocialOutline} />
          <span>{he ? 'שיתוף' : 'Share'}</span>
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={he ? 'שיתוף הסיכום' : 'Share the summary'}
        size="large"
      >
        <div className="share-modal-content">
          <pre className="share-preview">{text}</pre>
          <div className="share-grid">
            {items.map((it) => (
              <button
                type="button"
                key={it.id}
                className={`share-btn s-${it.id}`}
                onClick={it.on}
              >
                <span className="share-ic"><IonIcon icon={it.icon} aria-hidden="true" /></span>
                <span className="share-lb">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShareBar;
