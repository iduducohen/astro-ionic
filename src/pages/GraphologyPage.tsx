import { useLang } from '../lang';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import GraphologyAnalysis from '../components/GraphologyAnalysis';

const GraphologyPage: React.FC = () => {
  const { S, lang } = useLang();
  return (
    <Page title={S.tabGraphology}>
      <PageIntro page="graphology" title={lang === 'he' ? 'גרפולוגיה' : 'Graphology'} />
      <GraphologyAnalysis />
    </Page>
  );
};

export default GraphologyPage;
