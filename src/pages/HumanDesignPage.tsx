import { useState } from 'react';
import { IonButton, IonInput, IonNote } from '@ionic/react';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import HumanDesignChart from '../components/HumanDesignChart';
import ShareBar from '../components/ShareBar';
import { calculateHumanDesign } from '../core/human-design';
import { useLang } from '../lang';

const HumanDesignPage: React.FC = () => {
  const { lang, S } = useLang();
  const [birthDate, setBirthDate] = useState('');
  const [hour, setHour] = useState('12');
  const [chart, setChart] = useState<ReturnType<typeof calculateHumanDesign> | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;

    const [y, m, d] = birthDate.split('-').map(Number);
    const h = parseInt(hour);

    try {
      const hd = calculateHumanDesign(y, m, d, h);
      setChart(hd);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <Page title={S.appTitle}>
      <PageIntro
        page="hd"
        title={lang === 'he' ? 'עיצוב אנושי' : 'Human Design'}
        extra={undefined}
      />

      <form onSubmit={submit} noValidate className="form-card">
        <IonInput
          mode="md"
          label={S.birthDate}
          labelPlacement="stacked"
          fill="outline"
          type="date"
          min="1900-01-01"
          max={new Date().toISOString().slice(0, 10)}
          value={birthDate}
          onIonInput={(e) => setBirthDate(String(e.detail.value ?? ''))}
        />
        <IonInput
          mode="md"
          label={lang === 'he' ? 'שעת לידה (בערך)' : 'Birth hour (approximate)'}
          labelPlacement="stacked"
          fill="outline"
          type="number"
          min="0"
          max="23"
          value={hour}
          onIonInput={(e) => setHour(String(e.detail.value ?? '12'))}
        />
        <IonNote style={{ display: 'block', margin: '6px 0 0', fontSize: 13, lineHeight: 1.45 }}>
          {lang === 'he'
            ? 'שעת הלידה חשובה מאוד עבור Human Design. אם אתה לא יודע בדיוק, נסה לקבל את זה מתעודת הלידה.'
            : 'Birth time is very important for Human Design. If you don\'t know exactly, try to get it from your birth certificate.'}
        </IonNote>
        <IonButton type="submit" expand="block" className="btn-main">
          {lang === 'he' ? 'תכנן את עיצובך' : 'Show my Human Design'}
        </IonButton>
      </form>

      {chart && (
        <>
          <HumanDesignChart chart={chart} />
          <ShareBar
            title={lang === 'he' ? 'עיצוב אנושי שלי' : 'My Human Design'}
            text={`${chart.type.name[lang]} - ${chart.type.role[lang]}`}
          />
        </>
      )}
    </Page>
  );
};

export default HumanDesignPage;
