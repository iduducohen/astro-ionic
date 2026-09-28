import { HD_AUTHORITIES, HD_TYPES, type HumanDesignChart } from '../core/human-design';
import { useLang } from '../lang';
import { IonIcon } from '@ionic/react';
import { sparklesOutline } from 'ionicons/icons';

interface Props {
  chart: HumanDesignChart;
}

const HumanDesignChart: React.FC<Props> = ({ chart }) => {
  const { lang: L } = useLang();

  return (
    <div style={{ marginTop: '28px', padding: '20px', background: 'var(--ion-item-background)', border: '1px solid var(--astro-line)', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <IonIcon icon={sparklesOutline} style={{ color: 'var(--astro-moon)', fontSize: '24px' }} />
        <h2 style={{ margin: 0, font: '700 1.6rem var(--display-font)', color: 'var(--astro-moon)' }}>
          {L === 'he' ? 'עיצוב אנושי' : 'Human Design'}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
        {/* Type */}
        <div style={{ padding: '14px', background: 'var(--astro-moon-soft)', borderRadius: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--astro-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            {L === 'he' ? 'סוג אנרגיה' : 'Energy Type'}
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--astro-moon)', marginBottom: '8px' }}>
            {chart.type.name[L]}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--astro-muted)', lineHeight: '1.4' }}>
            {chart.type.role[L]} • {chart.type.percentage}%
          </div>
        </div>

        {/* Authority */}
        <div style={{ padding: '14px', background: 'var(--astro-moon-soft)', borderRadius: '8px' }}>
          <div style={{ fontSize: '11px', color: 'var(--astro-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            {L === 'he' ? 'רשות' : 'Authority'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--astro-moon)' }}>
            {HD_AUTHORITIES[chart.authority][L]}
          </div>
        </div>
      </div>

      {/* Strategy */}
      <div style={{ padding: '12px 14px', background: 'var(--astro-soft)', borderRadius: '8px', marginBottom: '14px' }}>
        <div style={{ fontSize: '11px', color: 'var(--astro-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
          {L === 'he' ? 'אסטרטגיה' : 'Strategy'}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--ion-text-color)' }}>
          {chart.type.strategy[L]}
        </div>
      </div>

      {/* Profile */}
      <div style={{ padding: '12px 14px', background: 'var(--astro-soft)', borderRadius: '8px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: 'var(--astro-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
          {L === 'he' ? 'פרופיל' : 'Profile'}
        </div>
        <div style={{ fontSize: '0.95rem', color: 'var(--ion-text-color)' }}>
          {chart.profileData[L]}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '14px', background: 'var(--astro-moon-soft)', borderRadius: '8px', borderLeft: '4px solid var(--astro-moon)' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--astro-muted)', lineHeight: '1.6' }}>
          {chart.type.description[L]}
        </div>
      </div>

      {/* Activation Status */}
      {chart.isActivated && (
        <div style={{ marginTop: '14px', padding: '10px 12px', background: 'rgba(47, 143, 122, 0.1)', border: '1px solid #2f8f7a', borderRadius: '6px', fontSize: '12px', color: '#2f8f7a', fontWeight: '600' }}>
          ✓ {L === 'he' ? 'מופעל - אתה בתוך הדעה שלך!' : 'Activated - You are in your strategy!'}
        </div>
      )}
    </div>
  );
};

export default HumanDesignChart;
