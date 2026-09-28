import { useEffect, useMemo, useState } from 'react';
import { IonButton, IonCheckbox, IonInput, IonNote } from '@ionic/react';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import { ZODIAC } from '../core';
import ZodiacWheel from '../components/ZodiacWheel';
import ProfileResult from '../components/ProfileResult';
import ShareBar from '../components/ShareBar';
import ProfileGuide from '../components/ProfileGuide';
import { profileShareText, profileShortText } from '../core/share-text';
import { readProfile } from '../validate';
import { loadJSON, saveJSON } from '../storage';
import { useLang } from '../lang';

interface Saved { name: string; birth: string; sunset: boolean }
const today = new Date().toISOString().slice(0, 10);

const ProfilePage: React.FC = () => {
  const { lang, S } = useLang();
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [sunset, setSunset] = useState(false);
  const [submitted, setSubmitted] = useState<Saved | null>(null);

  useEffect(() => {
    loadJSON<Saved>('astro:last').then((s) => {
      if (!s) return;
      setName(s.name); setBirth(s.birth); setSunset(s.sunset);
    });
  }, []);

  // מחושב מחדש בכל החלפת שפה, כך שגם השגיאה וגם התוצאה מתורגמות
  const { profile, error } = useMemo(() => {
    if (!submitted) return { profile: null, error: '' };
    try {
      return { profile: readProfile(S, submitted.name, submitted.birth, submitted.sunset), error: '' };
    } catch (err) {
      return { profile: null, error: (err as Error).message };
    }
  }, [submitted, S]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = { name, birth, sunset };
    setSubmitted(input);
    try {
      readProfile(S, name, birth, sunset);
      saveJSON('astro:last', input);
    } catch { /* השגיאה מוצגת מה-memo */ }
  };


  return (
    <Page title={S.appTitle}>
        <div className="hero">
          <ZodiacWheel index={profile ? ZODIAC.indexOf(profile.western) : null} />
          <PageIntro page="me" title={lang === 'he' ? 'המפה האישית שלך' : 'Your personal chart'} extra={<ProfileGuide />} />
        </div>

        <form onSubmit={submit} noValidate className="form-card">
          <IonInput mode="md" label={S.name} labelPlacement="stacked" fill="outline" placeholder={S.namePlaceholder}
            value={name} onIonInput={(e) => setName(String(e.detail.value ?? ''))} autocomplete="given-name" />
          <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1900-01-01" max={today}
            value={birth} onIonInput={(e) => setBirth(String(e.detail.value ?? ''))} />
          <div>
          <IonCheckbox checked={sunset} onIonChange={(e) => setSunset(e.detail.checked)} labelPlacement="end" justify="start">
            {S.afterSunset}
          </IonCheckbox>
          <IonNote style={{ display: 'block', margin: '6px 0 0', fontSize: 13, lineHeight: 1.45 }}>{S.afterSunsetHelp}</IonNote>
          </div>
          {error && <p role="alert" className="err">{error}</p>}
          <IonButton type="submit" expand="block" className="btn-main">{S.showChart}</IonButton>
          <button type="button" className="link-btn" onClick={() => { setName(lang === 'he' ? 'נועה לוי' : 'Noa Levi'); setBirth('1990-03-15'); setSunset(false); setSubmitted({ name: lang === 'he' ? 'נועה לוי' : 'Noa Levi', birth: '1990-03-15', sunset: false }); }}>
            {lang === 'he' ? 'רוצים לראות דוגמה? הצגת מפה לדוגמה' : 'Want to see an example? Show a sample chart'}
          </button>
        </form>

        {profile && (
          <>
            <ProfileResult p={profile} />
            <ShareBar title={S.shareTitle} text={profileShareText(profile, lang)} short={profileShortText(profile, lang)} />
          </>
        )}
    </Page>
  );
};

export default ProfilePage;
