import { IonIcon } from '@ionic/react';
import { pencilOutline, bulbOutline, gitNetworkOutline, handLeftOutline, sparklesOutline } from 'ionicons/icons';
import Page from '../components/Page';
import { useLang } from '../lang';

const MorePage: React.FC = () => {
  const { S, lang } = useLang();

  const tools = [
    { href: '/psychology', label: S.tabPsychology, icon: bulbOutline },
    { href: '/zohar', label: S.tabZohar, icon: handLeftOutline },
    { href: '/graphology', label: S.tabGraphology, icon: pencilOutline },
    { href: '/hd', label: S.tabHD, icon: sparklesOutline },
  ];

  return (
    <Page title={S.appTitle}>
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '700' }}>
          {lang === 'he' ? 'כלים נוספים' : 'More Tools'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {tools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 16px',
                backgroundColor: 'var(--ion-item-background)',
                border: '1px solid var(--astro-line)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--astro-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ion-item-background)';
              }}
            >
              <IonIcon
                icon={tool.icon}
                style={{
                  fontSize: '32px',
                  color: 'var(--astro-moon)',
                  marginBottom: '12px',
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                {tool.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default MorePage;
