import { IonIcon, IonItem, IonLabel, useIonRouter } from '@ionic/react';
import {
  sunnyOutline, infiniteOutline, timeOutline, peopleOutline, helpCircleOutline, calendarOutline, globeOutline, chevronBackOutline, chevronForwardOutline,
} from 'ionicons/icons';
import { useLang } from '../lang';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import { TOOL_INFO, CHART_GUIDE } from '../core/tool-info';

export const TOOLS = ['natal', 'karmic', 'forecast', 'synastry', 'horary', 'election', 'mundane'] as const;
export type Tool = (typeof TOOLS)[number];
export const TOOL_ICON: Record<Tool, string> = {
  natal: sunnyOutline, karmic: infiniteOutline, forecast: timeOutline, synastry: peopleOutline,
  horary: helpCircleOutline, election: calendarOutline, mundane: globeOutline,
};

const ChartsHub: React.FC = () => {
  const { S, lang } = useLang();
  const router = useIonRouter();
  return (
    <Page title={S.tabCharts}>
      <PageIntro page="charts" title={lang === 'he' ? 'מפות אסטרולוגיות' : 'Astrology charts'} />
      <section className="chart-guide">
        <h2 className="section-label">{lang === 'he' ? 'איזו מפה מתאימה לי?' : 'Which chart is for me?'}</h2>
        <div className="cg-row">
          {CHART_GUIDE.map((g) => (
            <button type="button" key={g.tool} className="cg-card" onClick={() => router.push(`/charts/${g.tool}`)}>
              <span className="cg-ic"><IonIcon icon={TOOL_ICON[g.tool as Tool]} aria-hidden="true" /></span>
              <span className="cg-txt">
                <span className="cg-q">{g.q[lang]}</span>
                <span className="cg-a">{S.tools[g.tool]}</span>
              </span>
              <IonIcon className="cg-go" icon={lang === 'he' ? chevronBackOutline : chevronForwardOutline} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
      <div className="tool-list" role="list">
        {TOOLS.map((k) => (
          <IonItem key={k} routerLink={`/charts/${k}`} detail lines="full" role="listitem">
            <span className="tool-icon" slot="start" aria-hidden="true"><IonIcon icon={TOOL_ICON[k]} /></span>
            <IonLabel>
              <h2 className="tool-name">{S.tools[k]}</h2>
              <p className="tool-desc">{S.toolDesc[k]}</p>
              <p className="tool-fits">{lang === 'he' ? 'מתאים ל: ' : 'Good for: '}{TOOL_INFO[k].fits[lang]}</p>
            </IonLabel>
          </IonItem>
        ))}
      </div>
    </Page>
  );
};

export default ChartsHub;
