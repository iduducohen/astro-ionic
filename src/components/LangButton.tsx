import { IonButton } from '@ionic/react';
import { useLang } from '../lang';

const LangButton: React.FC = () => {
  const { lang, S, toggle } = useLang();
  return (
    <IonButton className="lang-btn" fill="clear" onClick={toggle} lang={lang === 'he' ? 'en' : 'he'} aria-label={S.switchLabel}>
      {lang === 'he' ? 'EN' : 'עב'}
    </IonButton>
  );
};

export default LangButton;
