import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircleOutline, heartOutline, sparklesOutline, planetOutline, bulbOutline, gitNetworkOutline, handLeftOutline, pencilOutline, ellipsisVertical } from 'ionicons/icons';

import ProfilePage from './pages/ProfilePage';
import { LangProvider, useLang } from './lang';
import CompatPage from './pages/CompatPage';
import TarotPage from './pages/TarotPage';
import ChartsHub from './pages/ChartsHub';
import ToolPage from './pages/ToolPage';
import PsychologyPage from './pages/PsychologyPage';
import KabbalahPage from './pages/KabbalahPage';
import ZoharPage from './pages/ZoharPage';
import GraphologyPage from './pages/GraphologyPage';
import HumanDesignPage from './pages/HumanDesignPage';
import MorePage from './pages/MorePage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import './theme/variables.css';

setupIonicReact({ mode: 'ios' });

const Shell: React.FC = () => {
  const { S, lang } = useLang();

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/me" component={ProfilePage} />
          <Route exact path="/charts" component={ChartsHub} />
          <Route exact path="/charts/:tool(natal|karmic|forecast|synastry|horary|election|mundane)" component={ToolPage} />
          <Route exact path="/pair" component={CompatPage} />
          <Route exact path="/tarot" component={TarotPage} />
          <Route exact path="/kabbalah" component={KabbalahPage} />
          <Route exact path="/psychology" component={PsychologyPage} />
          <Route exact path="/zohar" component={ZoharPage} />
          <Route exact path="/graphology" component={GraphologyPage} />
          <Route exact path="/hd" component={HumanDesignPage} />
          <Route exact path="/more" component={MorePage} />
          <Route exact path="/"><Redirect to="/me" /></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="me" href="/me">
            <IonIcon aria-hidden="true" icon={personCircleOutline} />
            <IonLabel>{S.tabMe}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="charts" href="/charts">
            <IonIcon aria-hidden="true" icon={planetOutline} />
            <IonLabel>{S.tabCharts}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="pair" href="/pair">
            <IonIcon aria-hidden="true" icon={heartOutline} />
            <IonLabel>{S.tabPair}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tarot" href="/tarot">
            <IonIcon aria-hidden="true" icon={sparklesOutline} />
            <IonLabel>{S.tabTarot}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="kabbalah" href="/kabbalah">
            <IonIcon aria-hidden="true" icon={gitNetworkOutline} />
            <IonLabel>{S.tabKabbalah}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="more" href="/more">
            <IonIcon aria-hidden="true" icon={ellipsisVertical} />
            <IonLabel>{lang === 'he' ? 'עוד' : 'More'}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <LangProvider>
      <Shell />
    </LangProvider>
  </IonApp>
);

export default App;
